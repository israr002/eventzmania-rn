import { StyleSheet } from "react-native";
import { Colors } from "styles/colors";
import { Metrics } from "styles/metrics";

export const styles = StyleSheet.create({
  buttonImage: {
    marginRight: Metrics.margin.tiny
  },
  buttonText: {
    color: Colors.White,
    fontSize: Metrics.medium
  },
  closeIcon: {
    alignSelf: "flex-end"
  },
  container: {
    marginBottom: Metrics.margin.xLarge,
    marginTop: Metrics.margin.xSmall
  },
  iconButton: {
    alignItems: "center",
    backgroundColor: Colors.Black,
    borderColor: Colors.Grey,
    borderRadius: Metrics.radius.small,
    borderWidth: 1,
    elevation: 3,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: Metrics.margin.tiny,
    paddingVertical: Metrics.padding.xSmall
  },
  imageSelector: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: Colors.White,
    borderColor: Colors.White,
    borderRadius: 60,
    borderWidth: 1,
    height: 120,
    justifyContent: "center",
    width: 120
  },
  modal: {
    alignSelf: "center",
    backgroundColor: Colors.Black,
    borderColor: Colors.Grey,
    borderRadius: Metrics.radius.small,
    borderWidth: 1,
    padding: Metrics.padding.small,
    width: "90%"
  },
  modalBackdrop: {
    alignItems: "center",
    backgroundColor: Colors.Translucent,
    flex: 1,
    justifyContent: "center"
  },
  modalHeadingText: {
    color: Colors.White,
    fontSize: Metrics.base,
    fontWeight: "500",
    marginBottom: Metrics.margin.small,
    marginTop: Metrics.margin.tiny,
    textAlign: "center"
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    marginVertical: Metrics.margin.small
  },
  selectedImage: {
    borderRadius: 60,
    height: 120,
    resizeMode: "cover",
    width: 120
  }
});
