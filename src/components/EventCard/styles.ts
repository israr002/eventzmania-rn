import { StyleSheet } from "react-native";

import { Colors } from "../../styles/colors";
import { Metrics } from "../../styles/metrics";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Black,
    borderWidth: 1,
    borderColor: Colors.Grey,
    borderRadius: Metrics.radius.base,
    marginHorizontal: Metrics.margin.small,
    marginVertical: Metrics.margin.tiny,
    paddingVertical: Metrics.padding.xSmall,
    paddingHorizontal: Metrics.padding.xSmall,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: Metrics.radius.small,
  },
  detailsContainer: {
    paddingHorizontal: Metrics.xSmall,
    flex: 1,
  },
  dateContainer: {
    borderColor: Colors.White,
    justifyContent: "center",
    width: 40,
  },
  dateText: {
    color: Colors.Primary,
    fontSize: Metrics.large,
    textAlign: "center",
    fontWeight: "700",
  },
  monthAndYearText: {
    color: Colors.White,
    fontSize: Metrics.xxSmall,
    textAlign: "center",
  },
  detailsSection: {
    marginVertical: Metrics.xTiny,
  },
  headingText: {
    color: Colors.White,
    fontSize: Metrics.small,
    fontWeight: "700",
  },
  text: {
    color: Colors.Grey,
    fontSize: Metrics.xxSmall,
  },
  linkText: {
    color: Colors.Primary,
    fontSize: Metrics.small,
    fontWeight: "700",
    marginVertical: Metrics.margin.xTiny,
    textDecorationLine: "underline",
  },
});
