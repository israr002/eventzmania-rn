import { StyleSheet } from "react-native";
import { Colors } from "styles/colors";
import { Metrics } from "styles/metrics";

export const styles = StyleSheet.create({
  closeIcon: {
    height: Metrics.xSmall,
    tintColor: Colors.Grey,
    width: Metrics.xSmall
  },
  commentContainer: {
    flexDirection: "row",
    marginVertical: Metrics.margin.tiny
  },
  commentSubContainer: {
    flex: 1
  },
  commentText: {
    color: Colors.White,
    fontSize: Metrics.xSmall,
    marginBottom: Metrics.margin.xTiny
  },
  horizontalLine: {
    alignSelf: "center",
    backgroundColor: Colors.Grey,
    borderRadius: Metrics.radius.tiny,
    height: 3,
    marginVertical: Metrics.margin.small,
    width: "25%"
  },
  icon: {
    marginHorizontal: Metrics.margin.tiny
  },
  input: {
    paddingVertical: Metrics.padding.xxSmall,
    //borderRadius: Metrics.radius.tiny,
    paddingHorizontal: Metrics.padding.xSmall,
    color: Colors.White,
    fontSize: Metrics.xSmall,
    flex: 1
  },
  inputContainer: {
    alignItems: "center",
    borderColor: Colors.White,
    borderTopWidth: 1,
    flexDirection: "row"
  },
  modal: {
    backgroundColor: Colors.Black,
    borderTopLeftRadius: Metrics.radius.medium,
    borderTopRightRadius: Metrics.radius.medium,
    bottom: 0,
    maxHeight: "100%",
    minHeight: "60%",
    position: "absolute",
    width: "100%",
    zIndex: 1
  },
  modalBackdrop: {
    backgroundColor: Colors.Translucent,
    flex: 1
    
  },
  modalContent: {
    flex: 1,
    marginHorizontal: Metrics.margin.small
  },
  modalHeadingText: {
    color: Colors.White,
    fontSize: Metrics.medium,
    fontWeight: "500",
    marginBottom: Metrics.margin.base,
    textAlign: "center"
  },
  noCommentText: {
    color: Colors.White,
    fontSize: Metrics.small,
    marginVertical: Metrics.margin.xLarge,
    textAlign: "center"
  },
  replyBar: {
    backgroundColor: Colors.Translucent,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: Metrics.padding.xSmall
  },
  replyContainer: {
    marginTop: Metrics.margin.xxSmall
  },
  sendIcon: {
    marginHorizontal: Metrics.margin.tiny
  },
  timeText: {
    color: Colors.Grey,
    fontSize: Metrics.xxSmall
  },
  userImage: {
    borderColor: Colors.White,
    borderRadius: Metrics.radius.large,
    borderWidth: 1,
    height: Metrics.xLarge,
    marginRight: Metrics.margin.xSmall,
    width: Metrics.xLarge
  },
  usernameContainer: {
    alignItems: "center",
    flexDirection: "row"
  },
  usernameText: {
    color: Colors.White,
    fontSize: Metrics.xSmall,
    fontWeight: "400",
    marginBottom: Metrics.margin.xTiny,
    marginRight: Metrics.margin.tiny
  }
});
