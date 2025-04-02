export interface DatePickerProps {
  name: string;
  mode: string;
  placeholder?: string;
  defaultValue?: Date;
  min?: Date;
  max?: Date;
  disable?: boolean;
}
