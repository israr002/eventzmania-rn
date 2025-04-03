export interface DatePickerProps {
  name: string;
  mode: string;
  placeholder?: string;
  defaultValue?: Date;
  //date: Date | undefined;
  //placeHolder: string;
  //setDate: (date: Date | undefined) => void;
  min?: Date;
  max?: Date;
  disable?: boolean;
}
