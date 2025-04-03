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
  },
  input: {
    color: Colors.White,
    height: Metrics.xLarge,
    paddingVertical: 0,
    justifyContent: "center",
    paddingHorizontal: Metrics.margin.xxSmall,
    flex: 1,
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
    top: Metrics.xLarge,
    right: 0,
    left: 0,
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
  touchable: {
    flex: 1,
    flexDirection: "row",
  },
});
