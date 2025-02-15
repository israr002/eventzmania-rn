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
  icon: {
    //marginRight: Metrics.margin.tiny,
  },
  input: {
    color: Colors.White,
    flex: 1,
    height: Metrics.xLarge,
    paddingVertical: 0,
    paddingHorizontal: Metrics.margin.xxSmall,
  },
  inputContainer: {
    alignItems: "center",
    borderColor: Colors.White,
    borderRadius: Metrics.radius.tiny,
    borderWidth: 1,
    flexDirection: "row",
    paddingHorizontal: Metrics.padding.small,
  },
});
