import DropdownSvg from "assets/images/icons/down.svg";
import React, { useState } from "react";
import { Controller, FieldValues,useFormContext } from "react-hook-form";
import {
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { Colors } from "styles/colors";

import { styles } from "./styles";
import { DropdownProps } from "./types";

const Dropdown: React.FC<DropdownProps> = ({
  name,
  rules,
  defaultValue = { label: "", value: -1 },
  icon,
  searchable,
  placeholder,
  items,
  disable
}) => {
  const {
    formState: { errors }
  } = useFormContext<FieldValues>();

  const [listItems, setListItems] = useState(items);
  const [focus, setFocus] = useState(false);

  const onBlur = () => {
    setFocus(false);
  };

  const onFocus = () => {
    setFocus(true);
    setListItems(items);
  };

  const onChangeText = (text: string, fieldOnChange: (value: any) => void) => {
    const filteredItems = items.filter(item =>
      item.label.toLowerCase().includes(text.toLowerCase())
    );
    setListItems(filteredItems);
    fieldOnChange({ label: text, value: -1 });
  };

  const onSelect = (
    item: { label: string; value: number },
    fieldOnChange: (value: any) => void
  ) => {
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
              <TouchableOpacity onPress={onFocus} style={styles.touchable}>
                {searchable ? (
                  <TextInput
                    style={styles.input}
                    value={value?.label || ""}
                    placeholder={placeholder}
                    placeholderTextColor={Colors.Grey}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onChangeText={text => onChangeText(text, onChange)}
                    editable={!disable}
                  />
                ) : (
                  <View style={styles.input}>
                    <Text
                      style={[
                        styles.inputText,
                        {
                          color: value?.value > 0 ? Colors.White : Colors.Grey
                        }
                      ]}
                    >
                      {value?.value > 0 ? value?.label : placeholder}
                    </Text>
                  </View>
                )}
                <DropdownSvg
                  fill={Colors.White}
                  height={20}
                  width={20}
                  style={{
                    transform: [{ rotate: focus ? "180deg" : "0deg" }],
                    alignSelf: "center"
                  }}
                />
              </TouchableOpacity>
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
      </View>
      {errors[name] && (
        <Text style={styles.error}>{errors[name]?.message as string}</Text>
      )}
    </View>
  );
};
export default Dropdown;
