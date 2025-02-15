import React from "react";
import { View, Text } from "react-native";
import { styles } from "./styles";
import { NoDataProps } from "./types";

const NoData: React.FC<NoDataProps> = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

export default NoData;
