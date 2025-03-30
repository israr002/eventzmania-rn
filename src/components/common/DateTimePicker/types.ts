export interface DatePickerProps {
  date: Date | undefined;
  placeHolder: string;
  setDate: (date: Date | undefined) => void;
  min?: Date;
  max?: Date;
  mode: string;
}
