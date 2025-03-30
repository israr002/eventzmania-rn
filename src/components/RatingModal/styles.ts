import { StyleSheet } from "react-native";
import { Colors } from "styles/colors";
import { Metrics } from "styles/metrics";

export const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: Colors.Translucent,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: Colors.Black,
    width: "90%",
    padding: Metrics.padding.small,
    alignSelf: "center",
    borderRadius: Metrics.radius.small,
  },
  closeIcon: {
    height: Metrics.small,
    aspectRatio: 1,
    alignSelf: "flex-end",
    tintColor: Colors.Grey,
  },
  modalContent: {
    marginHorizontal: Metrics.margin.tiny,
  },
  modalHeadingText: {
    fontSize: Metrics.base,
    fontWeight: "500",
    color: Colors.White,
    marginTop: Metrics.margin.tiny,
    marginBottom: Metrics.margin.small,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: Metrics.margin.xLarge,
    marginHorizontal: Metrics.margin.small,
    justifyContent: "space-between",
  },
  modalText: {
    fontSize: Metrics.xSmall,
    color: Colors.White,
    marginBottom: Metrics.margin.xTiny,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.White,
    paddingVertical: Metrics.padding.xTiny,
    borderRadius: Metrics.radius.tiny,
    paddingHorizontal: Metrics.padding.xSmall,
    color: Colors.White,
  },
  button: {
    marginVertical: Metrics.margin.tiny,
  },
  starIcon: {
    width: Metrics.xLarge,
    height: Metrics.xLarge,
    tintColor: Colors.White,
  },
});
