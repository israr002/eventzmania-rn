import React from "react";
import { Image, Text, TextInput, View } from "react-native";
import { useFormContext, Controller, FieldValues } from "react-hook-form";

import { Colors } from "styles/colors";
import { styles } from "./styles";
import { InputProps } from "./types";

const Input: React.FC<InputProps> = ({
  name,
  rules,
  defaultValue,
  icon,
  ...inputProps
}) => {
  const {
    //control,
    formState: { errors },
  } = useFormContext<FieldValues>();

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {icon && <View style={styles.icon}>{icon}</View>}
        <Controller
          //control={control}
          name={name}
          rules={rules}
          defaultValue={defaultValue}
          render={({ field }) => (
            <TextInput
              placeholderTextColor={Colors.Grey}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              value={field.value}
              style={styles.input}
              {...inputProps}
            />
          )}
        />
      </View>
      {errors[name] && (
        <Text style={styles.error}>{errors[name]?.message as string}</Text>
      )}
    </View>
  );
};
export default Input;
