import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "styles/colors";
import { Metrics } from "styles/metrics";

const screenWidth = Dimensions.get("screen").width;

export const styles = StyleSheet.create({
  bookingLink: {
    alignItems: "center",
    backgroundColor: Colors.Primary,
    flexDirection: "row",
    paddingVertical: Metrics.padding.xTiny
  },
  bookingLinkIcon: {
    height: Metrics.xxSmall,
    marginHorizontal: Metrics.margin.tiny,
    tintColor: Colors.White,
    width: Metrics.xxSmall
  },
  bookingLinkText: {
    color: Colors.White,
    flex: 1,
    marginLeft: Metrics.margin.tiny
  },
  descriptionContainer: {
    flex: 1,
    marginHorizontal: Metrics.margin.tiny
  },
  detailsRow: {
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: Metrics.margin.tiny,
    marginVertical: Metrics.margin.tiny
  },
  headingText: {
    color: Colors.White,
    flex: 1,
    fontSize: Metrics.small,
    fontWeight: "700"
  },
  icon: {
    marginHorizontal: Metrics.margin.tiny
  },
  image: {
    height: screenWidth,
    width: "100%"
  },
  linkText: {
    color: Colors.Primary,
    fontSize: Metrics.xSmall
  },
  mainContainer: {
    marginVertical: Metrics.margin.tiny
  },
  subText: {
    color: Colors.Grey,
    fontSize: Metrics.xSmall
  },
  text: {
    color: Colors.White,
    fontSize: Metrics.xSmall,
    fontWeight: "400"
  },
  venueProfileImage: {
    borderRadius: Metrics.radius.large,
    height: Metrics.large,
    marginRight: Metrics.margin.xSmall,
    width: Metrics.large
  }
});
