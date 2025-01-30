import React from "react";
import { SafeAreaView, StatusBar, View } from "react-native";

import Loader from "../Loader";
import { styles } from "./styles";
import { ScreenContainerProps } from "./types";
// import Footer from "../Footer";

const ScreenContainer: React.FC<ScreenContainerProps> = ({
  isLoading,
  children
}) => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar
        translucent
        backgroundColor={"transparent"}
        barStyle="light-content"
      />
      {isLoading ? (
        <Loader />
      ) : (
        <View style={styles.childContainer}>{children}</View>
      )}
    </SafeAreaView>
  );
};

export default ScreenContainer;
