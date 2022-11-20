import { StyleSheet, Text, View } from "react-native";
import * as TaskManager from "expo-task-manager";
const LOCATION_TASK_NAME = "background-location-task";

import React from "react";

const MapPreview = () => {
  return (
    <View>
      <Text>MapPreview</Text>
    </View>
  );
};
TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  if (error) {
    // Error occurred - check `error.message` for more details.
    return;
  }
  if (data) {
    console.log(data);

    const { locations } = data;
    // do something with the locations captured in the background
  }
});
export default MapPreview;

const styles = StyleSheet.create({});
