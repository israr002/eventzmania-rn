import React from "react";
import { ActivityIndicator, View } from "react-native";
import { Colors } from "styles/colors";

import { styles } from "./styles";

const Loader: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" color={Colors.Primary} />
    </View>
  );
};

export default Loader;
