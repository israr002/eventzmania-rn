import { StyleSheet } from "react-native";
import { Colors } from "styles/colors";
import { Metrics } from "styles/metrics";

export const styles = StyleSheet.create({
  container: {
    marginVertical: Metrics.margin.tiny
  },
  error: {
    color: Colors.Red,
    fontSize: Metrics.xxSmall,
    marginTop: Metrics.margin.xTiny
  },
  flex1: {
    flex: 1
  },
  input: {
    color: Colors.White,
    flex: 1,
    height: Metrics.xLarge,
    justifyContent: "center",
    paddingHorizontal: Metrics.margin.xxSmall,
    paddingVertical: 0
  },
  inputContainer: {
    alignItems: "center",
    borderColor: Colors.White,
    borderRadius: Metrics.radius.tiny,
    borderWidth: 1,
    flexDirection: "row",
    paddingHorizontal: Metrics.padding.small
  },
  inputText: {
    color: Colors.White
  },
  listContainer: {
    backgroundColor: Colors.Black,
    borderColor: Colors.White,
    borderTopWidth: 0,
    borderWidth: 1,
    left: 0,
    maxHeight: 120,
    position: "absolute",
    right: 0,
    top: Metrics.xLarge,
    zIndex: 9999
  },
  listItem: {
    paddingHorizontal: Metrics.padding.small,
    paddingVertical: Metrics.padding.xTiny
  },
  listItemText: {
    color: Colors.White
  },
  touchable: {
    flex: 1,
    flexDirection: "row"
  }
});
