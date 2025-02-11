import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "styles/colors";
import { Metrics } from "styles/metrics";

const screenWidth = Dimensions.get("screen").width;

export const styles = StyleSheet.create({
  activeDot: {
    backgroundColor: Colors.Primary
  },
  container: {
    flex: 1
  },
  dot: {
    backgroundColor: Colors.Grey,
    borderRadius: Metrics.tiny,
    height: Metrics.tiny,
    margin: Metrics.margin.xTiny,
    width: Metrics.tiny
  },
  image: {
    resizeMode: "cover",
    width: screenWidth
  },
  pagination: {
    alignSelf: "center",
    bottom: 10,
    flexDirection: "row",
    position: "absolute"
  }
});
