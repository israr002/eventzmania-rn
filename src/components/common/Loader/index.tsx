import React from "react";
import {ActivityIndicator,View} from "react-native";
import {Colors} from "styles/colors";

import {styles} from "./styles";

const Loader: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.Pink} />
    </View>
  );
};

export default Loader;
