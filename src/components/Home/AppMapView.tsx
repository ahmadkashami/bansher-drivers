import { StyleSheet, Text, View, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";

import React, { FC, useEffect, useRef } from "react";
import { Region } from "../../interfaces/types";

export interface IAppMap {
  reagon: Region;
}
const AppMapView: FC<IAppMap> = ({ reagon }) => {
  console.log(reagon);

  const initalReagon: Region = {
    latitude: 29.244089898701375,
    longitude: 48.05216262264901,
    latitudeDelta: 0.09,
    longitudeDelta: 0.09,
  };
  const mapViewRef = useRef<MapView>();

  useEffect(() => {
    if (reagon) {
      mapViewRef.current?.animateToRegion(reagon);
    }
  }, [reagon]);
  return (
    <View style={styles.container}>
      <MapView
        initialRegion={initalReagon}
        ref={mapViewRef}
        provider="google"
        style={styles.map}
      >
        {reagon && (
          <Marker
            coordinate={{
              latitude: 29.248504413860545,
              longitude: 47.952698447993036,
            }}
          />
        )}
      </MapView>
    </View>
  );
};

export default AppMapView;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
