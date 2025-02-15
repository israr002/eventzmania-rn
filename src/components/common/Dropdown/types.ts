import { ReactNode } from "react";

export type DropdownProps = {
  name: string;
  items: { label: string; value: number }[];
  selected?: { label: string; value: number };
  rules?: Record<string, any>;
  placeholder?: string;
  defaultValue?: string;
  icon?: ReactNode;
  onChangeItem?: (item: { label: string; value: number }) => void;
  searchable?: boolean;
  disable?: boolean;
};
