import { ReactNode } from "react";
import { TextInputProps } from "react-native";

export interface InputProps extends TextInputProps {
  name: string;
  rules?: Record<string, any>;
  placeholder?: string;
  defaultValue?: string;
  icon?: ReactNode;
}
