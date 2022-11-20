import {
  registerTaskAsync,
  BackgroundFetchResult,
} from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import { updateTruckLocation } from "../api/Home.Api";
import { useTruckStore } from "../store/truck.zustand";

export const LOCATION_TASK_NAME = "location-taskkkk";

function myTask() {
  try {
    // fetch data here...
    const backendData = "Simulated fetch " + Math.random();
    console.log("myTask() ", backendData);
    return backendData
      ? BackgroundFetchResult.NewData
      : BackgroundFetchResult.NoData;
  } catch (err) {
    return BackgroundFetchResult.Failed;
  }
}

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
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
  }
});

// export async function registerBackgroundFetchAsync() {
//   return registerTaskAsync(LOCATION_TASK_NAME, {
//     minimumInterval: 5, // 15 minutes
//     stopOnTerminate: false, // android only,
//     startOnBoot: true, // android only
//   });
// }
