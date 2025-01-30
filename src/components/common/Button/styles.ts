import {StyleSheet} from "react-native";
import {Colors} from "styles/colors";
import {Metrics} from "styles/metrics";

export const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: Colors.Primary,
    borderRadius: Metrics.radius.tiny,
    elevation: 3,
    height: Metrics.xLarge,
    justifyContent: "center",
    marginVertical: Metrics.margin.small
  },
  buttonDisabled: {
    backgroundColor: Colors.Grey
  },
  buttonText: {
    color: Colors.White,
    fontSize: Metrics.xSmall,
    fontWeight: "600",
    textTransform: "uppercase"
  },
  outLineButton: {
    alignItems: "center",
    backgroundColor: Colors.Black,
    borderColor: Colors.Primary,
    borderRadius: Metrics.radius.tiny,
    borderWidth: 1,
    elevation: 3,
    height: Metrics.xLarge,
    justifyContent: "center",
    marginVertical: Metrics.margin.small
  },
  outlineButtonText: {
    color: Colors.Primary,
    fontSize: Metrics.xSmall,
    fontWeight: "600",
    textTransform: "uppercase"
  }
});
