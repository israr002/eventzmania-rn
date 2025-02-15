import { StyleSheet } from "react-native";
import { Colors } from "styles/colors";
import { Metrics } from "styles/metrics";

export const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    paddingHorizontal: Metrics.padding.base,
    paddingVertical: Metrics.padding.xxSmall,
    alignItems: "center",
  },
  searchIcon: {
    marginRight: Metrics.margin.tiny,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 0,
    color: Colors.White,
  },
});
