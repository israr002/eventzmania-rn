import { StyleSheet } from "react-native";
import { Colors } from "styles/colors";
import { Metrics } from "styles/metrics";

export const styles = StyleSheet.create({
  container: {
    marginVertical: Metrics.margin.tiny,
  },
  inputContainer: {
    flexDirection: "row",
    borderColor: Colors.White,
    borderWidth: 1,
    borderRadius: Metrics.radius.tiny,
    alignItems: "center",
    paddingHorizontal: Metrics.padding.small,
    paddingLeft: Metrics.padding.large,
  },
  icon: {
    height: Metrics.medium,
    width: Metrics.medium,
    tintColor: Colors.White,
    //marginRight: Metrics.margin.tiny,
  },
  input: {
    height: Metrics.xLarge,
    paddingVertical: 0,
    flex: 1,
    justifyContent: "center",
  },
  error: {
    color: Colors.Red,
    fontSize: Metrics.xxSmall,
    marginTop: Metrics.margin.xTiny,
  },
});
