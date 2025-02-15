import React, { useState } from "react";
import {
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useFormContext, Controller, FieldValues } from "react-hook-form";

import { Colors } from "styles/colors";
import { styles } from "./styles";
import { DropdownProps } from "./types";
import DropdownSvg from "assets/images/icons/down.svg";

const Dropdown: React.FC<DropdownProps> = ({
  name,
  rules,
  defaultValue = { label: "", value: -1 },
  icon,
  searchable,
  placeholder,
  items,
  disable,
}) => {
  const {
    formState: { errors },
  } = useFormContext<FieldValues>();

  const [listItems, setListItems] = useState(items);
  const [focus, setFocus] = useState(false);

  const onBlur = () => {
    setFocus(false);
  };

  console.log("items", items);

  const onFocus = () => {
    setFocus(true);
    setListItems(items);
  };

  const onChangeText = (text: string, fieldOnChange: (value: any) => void) => {
    let filteredItems = items.filter((item) =>
      item.label.toLowerCase().includes(text.toLowerCase())
    );
    setListItems(filteredItems);
    fieldOnChange({ label: text, value: -1 });
  };

  const onSelect = (
    item: { label: string; value: number },
    fieldOnChange: (value: any) => void
  ) => {
    console.log("selectedItem", item);
    Keyboard.dismiss();
    setFocus(false);
    fieldOnChange(item);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {icon && <View>{icon}</View>}
        <Controller
          name={name}
          rules={rules}
          defaultValue={defaultValue}
          render={({ field: { onChange, value } }) => (
            <>
              <View style={styles.flex1}>
                {searchable ? (
                  <TextInput
                    style={styles.input}
                    value={value?.label || ""}
                    placeholder={placeholder}
                    placeholderTextColor={Colors.Grey}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onChangeText={(text) => onChangeText(text, onChange)}
                    editable={!disable}
                  />
                ) : (
                  <TouchableOpacity style={styles.input} onPress={onFocus}>
                    <Text
                      style={[
                        styles.inputText,
                        {
                          color: value?.value > 0 ? Colors.White : Colors.Grey,
                        },
                      ]}
                    >
                      {value?.value > 0 ? value?.label : placeholder}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              {focus && (
                <ScrollView
                  nestedScrollEnabled={true}
                  keyboardShouldPersistTaps={"handled"}
                  style={styles.listContainer}
                >
                  {listItems?.map((item, index) => {
                    return (
                      <TouchableOpacity
                        key={index.toString()}
                        style={styles.listItem}
                        onPress={() => onSelect(item, onChange)}
                      >
                        <Text style={styles.listItemText}>{item.label}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              )}
            </>
          )}
        />
        <DropdownSvg
          fill={Colors.White}
          height={20}
          width={20}
          style={{ transform: [{ rotate: focus ? "180deg" : "0deg" }] }}
        />
      </View>
      {errors[name] && (
        <Text style={styles.error}>{errors[name]?.message as string}</Text>
      )}
    </View>
  );
};
export default Dropdown;
