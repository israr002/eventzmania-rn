import CheckSvg from "assets/images/icons/check.svg";
import React from "react";
import { Controller, FieldValues, useFormContext } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { Colors } from "styles/colors";

import { styles } from "./styles";
import { CheckboxProps } from "./types";

const Checkbox: React.FC<CheckboxProps> = ({
  name,
  rules,
  defaultValue = false,
  label,
}) => {
  const {
    formState: { errors },
  } = useFormContext<FieldValues>();

  return (
    <View style={styles.container}>
      <Controller
        name={name}
        rules={rules}
        defaultValue={defaultValue}
        render={({ field }) => (
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => field.onChange(!field.value)}
          >
            {field.value ? (
              <View style={styles.checkbox}>
                <CheckSvg fill={Colors.White} height={10} width={10} />
              </View>
            ) : (
              <View style={styles.checkbox} />
            )}
            {label && <Text style={styles.label}>{label}</Text>}
          </TouchableOpacity>
        )}
      />
      {errors[name] && (
        <Text style={styles.error}>{errors[name]?.message as string}</Text>
      )}
    </View>
  );
};
export default Checkbox;
