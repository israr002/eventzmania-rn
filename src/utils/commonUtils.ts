import moment from "moment";

export const formatTime = (time: string) => {
  return moment(time, "HH:mm:ss").format("hh:mm A");
};
