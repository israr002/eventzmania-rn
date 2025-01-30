import { StyleSheet } from "react-native";
import { Colors } from "styles/colors";
import { Metrics } from "styles/metrics";

export const styles = StyleSheet.create({
  checkbox: {
    alignItems: "center",
    borderColor: Colors.White,
    borderWidth: 1,
    height: Metrics.small,
    justifyContent: "center",
    marginRight: 10,
    width: Metrics.small
  },
  checkboxContainer: {
    alignItems: "center",
    flexDirection: "row"
  },
  container: {
    marginVertical: Metrics.margin.tiny
  },
  error: {
    color: Colors.Red,
    fontSize: Metrics.xxSmall,
    marginTop: Metrics.margin.xTiny
  },
  icon: {
    height: Metrics.xSmall,
    tintColor: Colors.White,
    width: Metrics.xSmall
  },
  label: {
    color: Colors.White,
    fontSize: Metrics.xxSmall
  }
});
