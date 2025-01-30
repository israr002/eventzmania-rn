import {StyleSheet} from "react-native";

import {Colors} from "../../../styles/colors";

export const styles = StyleSheet.create({
  childContainer: {
    flex: 1
    //marginTop: StatusBar.currentHeight,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center"
  },
  mainContainer: {
    backgroundColor: Colors.Black,
    flex: 1
  }
});
