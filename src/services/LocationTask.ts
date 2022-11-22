import { registerTaskAsync, unregisterTaskAsync } from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";

import { updateTruckLocation } from "../api/Home.Api";
import { useTruckStore } from "../store/truck.zustand";

export const LOCATION_TASK_NAME = "current-location-task";

// function myTask() {
//   try {
//     console.log("fetching ....");

//     return BackgroundFetchResult.NewData;
//   } catch (err) {
//     return BackgroundFetchResult.Failed;
//   }
// }
async function LocationUpdateFun({ data, error }) {
  console.log("hello pls");

  if (error) {
    // Error occurred - check `error.message` for more details.
    return;
  }
  if (data) {
    const { locations } = data;
    const truck = useTruckStore.getState().truck;

    const response = await updateTruckLocation(truck.id, {
      lat: locations[0].coords.latitude,
      lang: locations[0].coords.longitude,
    });
    console.log(response);
  }
}

export function defineTask() {
  TaskManager.defineTask(LOCATION_TASK_NAME, LocationUpdateFun);
}

// async ({ data, error }) => {
//   if (error) {
//     // Error occurred - check `error.message` for more details.
//     return;
//   }
//   if (data) {
//     const { locations } = data;
//     const truck = useTruckStore.getState().truck;

//     const response = await updateTruckLocation(truck.id, {
//       lat: locations[0].coords.latitude,
//       lang: locations[0].coords.longitude,
//     });
//   }
// }
export async function registerBackgroundFetchAsync(taskName: string) {
  return registerTaskAsync(taskName, {
    minimumInterval: 1 * 60,
  });
}

export async function unregisterBAckgroundFetchAsync(taskName: string) {
  return unregisterTaskAsync(taskName);
}

// export async function updateLocation() {
//   BackgroundService.isRunning()
//   TaskManager.
// }

// function myTask() {
//   try {
//     // fetch data here...
//     const backendData = "Simulated fetch " + Math.random();
//     console.log("myTask() ", backendData);
//     return backendData
//       ? BackgroundFetch.Result.NewData
//       : BackgroundFetch.Result.NoData;
//   } catch (err) {
//     return BackgroundFetch.Result.Failed;
//   }
// }

// async function initBackgroundFetch(taskName, taskFn, interval = 60 * 15) {
//   try {
//     if (!TaskManager.isTaskDefined(taskName)) {
//       TaskManager.defineTask(taskName, taskFn);
//     }
//     const options = {
//       minimumInterval: interval, // in seconds
//     };
//     await BackgroundFetch.registerTaskAsync(taskName, options);
//   } catch (err) {
//     console.log("registerTaskAsync() failed:", err);
//   }
// }
