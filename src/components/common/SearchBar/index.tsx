import React from "react";
import { TextInput, View } from "react-native";

import { SearchBarProps } from "./types";
import { styles } from "./styles";
import { Colors } from "styles/colors";
import SearchSvg from "assets/images/icons/search.svg";

const SearchBar: React.FC<SearchBarProps> = ({ value, onChangeText }) => {
  return (
    <View style={styles.searchBar}>
      <SearchSvg
        fill={Colors.Grey}
        height={20}
        width={20}
        style={styles.searchIcon}
      />
      <TextInput
        style={styles.searchInput}
        value={value}
        onChangeText={onChangeText}
        placeholder="Search..."
        placeholderTextColor={Colors.Grey}
      />
    </View>
  );
};

export default SearchBar;
