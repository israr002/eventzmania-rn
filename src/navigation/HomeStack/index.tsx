import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Feed from "screens/FeedScreen";
import { Colors } from "styles/colors";

import { HomeStackParamList } from "./types";

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStack: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        //cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerTitleAlign: "center",
        headerTintColor: Colors.White,
        headerStyle: {
          backgroundColor: Colors.Black
        }
      }}
    >
      <Stack.Screen name="Home" component={Feed} />
    </Stack.Navigator>
  );
};

export default HomeStack;
