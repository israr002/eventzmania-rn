import { StyleSheet } from "react-native";

import { Colors } from "../../styles/colors";
import { Metrics } from "../../styles/metrics";

export const styles = StyleSheet.create({
  detailsContainer: {
    backgroundColor: Colors.Black,
    borderColor: Colors.Grey,
    borderRadius: Metrics.radius.base,
    borderWidth: 1,
    marginHorizontal: Metrics.margin.medium,
    marginVertical: Metrics.margin.tiny,
    paddingHorizontal: Metrics.padding.base,
    paddingVertical: Metrics.padding.small
  },
  headingText: {
    color: Colors.White,
    flex: 1,
    fontSize: Metrics.medium,
    fontWeight: "700"
  },
  link: {
    alignSelf: "flex-end"
  },
  linkText: {
    color: Colors.Primary,
    fontSize: Metrics.xSmall
  },
  text: {
    color: Colors.Grey,
    fontSize: Metrics.xSmall
  }
});
