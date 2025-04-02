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
  icon: {
    height: Metrics.medium,
    tintColor: Colors.White,
    width: Metrics.medium
    //marginRight: Metrics.margin.tiny,
  },
  input: {
    flex: 1,
    height: Metrics.xLarge,
    justifyContent: "center",
    paddingVertical: 0
  },
  inputContainer: {
    alignItems: "center",
    borderColor: Colors.White,
    borderRadius: Metrics.radius.tiny,
    borderWidth: 1,
    flexDirection: "row",
    paddingHorizontal: Metrics.padding.small,
    paddingLeft: Metrics.padding.large
  }
});
