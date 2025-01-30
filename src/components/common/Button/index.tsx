import React from "react";
import {Text, TouchableOpacity} from "react-native";

import {styles} from "./styles";
import {ButtonProps} from "./types";

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  disabled,
  outline,
  style,
  ...buttonProps
}) => {
  return (
    <TouchableOpacity
      style={[
        outline ? styles.outLineButton : styles.button,
        disabled ? styles.buttonDisabled : {},
        style
      ]}
      onPress={onPress}
      disabled={disabled}
      {...buttonProps}>
      <Text style={outline ? styles.outlineButtonText : styles.buttonText}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
