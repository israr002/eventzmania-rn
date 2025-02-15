import { StyleSheet } from "react-native";

import { Colors } from "../../styles/colors";
import { Metrics } from "../../styles/metrics";

export const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  detailsContainer: {
    backgroundColor: Colors.Black,
    borderWidth: 1,
    borderColor: Colors.Grey,
    borderRadius: Metrics.radius.base,
    marginHorizontal: Metrics.margin.small,
    marginTop: -Metrics.margin.xLarge,
    marginBottom: Metrics.margin.medium,
    paddingVertical: Metrics.padding.small,
    paddingHorizontal: Metrics.padding.base,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Metrics.padding.xTiny,
  },
  detailSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  headingText: {
    color: Colors.White,
    fontSize: Metrics.small,
    fontWeight: "700",
    flex: 1,
  },
  text: {
    color: Colors.Grey,
    fontSize: Metrics.xxSmall,
    fontWeight: "500",
  },
  icon: {
    marginRight: Metrics.margin.xTiny,
  },
  eventIcon: {
    height: Metrics.small,
    width: Metrics.small,
    tintColor: Colors.Primary,
    marginRight: Metrics.margin.tiny,
  },
  eventText: {
    color: Colors.Primary,
    fontSize: Metrics.xSmall,
    fontWeight: "500",
  },
});
