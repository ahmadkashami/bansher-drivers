import { StyleSheet, View } from "react-native";
import Lottie from "lottie-react-native";

import React, { useEffect, useRef } from "react";

const LottieFile = () => {
  const animationRef = useRef<Lottie>(null);

  useEffect(() => {
    animationRef.current?.play();
  }, []);

  return (
    <Lottie
      style={{ flex: 1, position: "absolute", zIndex: 99 }}
      ref={animationRef}
      source={require("../../contants/lotties/lf30_editor_uso3yyxs.json")}
    />
  );
};

export default LottieFile;

const styles = StyleSheet.create({});
