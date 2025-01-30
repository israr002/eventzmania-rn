import {Control, FieldValues, RegisterOptions} from "react-hook-form";

export interface CheckboxProps {
  control?: Control<FieldValues>;
  name: string;
  label: string;
  disabled?: boolean;
  rules?: RegisterOptions;
  defaultValue?: boolean;
}
