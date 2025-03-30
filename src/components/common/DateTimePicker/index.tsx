import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import moment from "moment";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { DatePickerProps } from "./types";
import { styles } from "./styles";
import CalendarSvg from "assets/images/icons/calendar.svg";
import ClockSvg from "assets/images/icons/clock.svg";
import { Colors } from "styles/colors";

const DateTimePicker: React.FC<DatePickerProps> = ({
  date,
  placeHolder,
  setDate,
  min = new Date(),
  max,
  mode,
}) => {
  const selectDate = () => {
    DateTimePickerAndroid.open({
      value: date ? date : new Date(),
      mode: mode,
      minimumDate: min,
      maximumDate: max,
      onChange: (event, selectedDate) => {
        if (selectedDate) {
          setDate(selectedDate);
        }
      },
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={selectDate} style={styles.inputContainer}>
        <View style={styles.input}>
          <Text style={{ color: date ? Colors.White : Colors.Grey }}>
            {date
              ? moment(date).format(mode === "date" ? "DD-MM-YYYY" : "hh:mm A")
              : placeHolder}
          </Text>
        </View>
        {mode === "date" ? (
          <CalendarSvg height={20} width={20} fill={Colors.White} />
        ) : (
          <ClockSvg height={20} width={20} fill={Colors.White} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default DateTimePicker;
