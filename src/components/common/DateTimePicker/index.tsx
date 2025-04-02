import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import CalendarSvg from "assets/images/icons/calendar.svg";
import ClockSvg from "assets/images/icons/clock.svg";
import moment from "moment";
import React from "react";
import { Controller, FieldValues, useFormContext } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { Colors } from "styles/colors";

import { styles } from "./styles";
import { DatePickerProps } from "./types";

const DateTimePicker: React.FC<DatePickerProps> = ({
  name,
  placeholder,
  defaultValue,
  min,
  max,
  mode
}) => {
  const {
    formState: { errors }
  } = useFormContext<FieldValues>();

  const selectDate = (onChange: (value: any) => void, value: Date | null) => {
    DateTimePickerAndroid.open({
      value: value || new Date(),
      mode: mode,
      minimumDate: min,
      maximumDate: max,
      onChange: (event, selectedDate) => {
        if (selectedDate) {
          onChange(selectedDate);
        }
      }
    });
  };

  return (
    <View style={styles.container}>
      <Controller
        name={name}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <TouchableOpacity
            onPress={() => selectDate(onChange, value)}
            style={styles.inputContainer}
          >
            <View style={styles.input}>
              <Text style={{ color: value ? Colors.White : Colors.Grey }}>
                {value
                  ? moment(value).format(
                      mode === "date" ? "DD-MM-YYYY" : "hh:mm A"
                    )
                  : placeholder}
              </Text>
            </View>
            {mode === "date" ? (
              <CalendarSvg height={20} width={20} fill={Colors.White} />
            ) : (
              <ClockSvg height={20} width={20} fill={Colors.White} />
            )}
          </TouchableOpacity>
        )}
      />
      {errors[name] && (
        <Text style={styles.error}>{errors[name]?.message as string}</Text>
      )}
    </View>
  );
};

export default DateTimePicker;
