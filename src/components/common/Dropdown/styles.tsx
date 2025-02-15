import { StyleSheet } from "react-native";
import { Colors } from "styles/colors";
import { Metrics } from "styles/metrics";

export const styles = StyleSheet.create({
  container: {
    marginVertical: Metrics.margin.tiny,
  },
  error: {
    color: Colors.Red,
    fontSize: Metrics.xxSmall,
    marginTop: Metrics.margin.xTiny,
  },
  inputContainer: {
    alignItems: "center",
    borderColor: Colors.White,
    borderRadius: Metrics.radius.tiny,
    borderWidth: 1,
    flexDirection: "row",
    paddingHorizontal: Metrics.padding.small,
    //zIndex: 9999,
  },
  input: {
    color: Colors.White,
    height: Metrics.xLarge,
    paddingVertical: 0,
    justifyContent: "center",
    paddingHorizontal: Metrics.margin.xxSmall,
  },
  inputText: {
    color: Colors.White,
  },
  listContainer: {
    backgroundColor: Colors.Black,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: Colors.White,
    maxHeight: 120,
    position: "absolute",
    zIndex: 9999,
    width: 325,
    top: Metrics.xLarge,
  },
  listItem: {
    paddingHorizontal: Metrics.padding.small,
    paddingVertical: Metrics.padding.xTiny,
  },
  listItemText: {
    color: Colors.White,
  },
  flex1: {
    flex: 1,
  },
  // container: {
  //   ...commonStyles.container,
  //   flex: 1,
  // },
  // input: {
  //   ...commonStyles.input,
  //   ...commonStyles.inputText,
  //   padding: 0,
  // },
  // itemContainerStyle: {
  //   maxHeight: 120,
  //   zIndex: 10000,
  //   position: "absolute",
  //   top: -7,
  //   width: "100%",
  //   borderBottomLeftRadius: BORDER_RADIUS.SMALL,
  //   borderBottomRightRadius: BORDER_RADIUS.SMALL,
  //   borderColor: COLOR.BORDER,
  //   backgroundColor: COLOR.WHITE,
  //   borderWidth: 1,
  // },
  // itemStyle: {
  //   paddingVertical: 5,
  //   paddingHorizontal: 10,
  // },
  // itemTextStyle: {
  //   color: COLOR.TEXT,
  // },
});
