import { StyleSheet } from "react-native";
import { Colors } from "styles/colors";
import { Metrics } from "styles/metrics";

export const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: Colors.Black,
    height: 100,
  },
  message: {
    color: Colors.White,
    fontSize: Metrics.xSmall,
  },
});
