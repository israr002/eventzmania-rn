import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import LoginScreen from "screens/LoginScreen";
import OnboardingScreen from "screens/OnboardingScreen";
import OtpScreen from "screens/OtpScreen";
import SignUpScreen from "screens/SignUpScreen";
import { Colors } from "styles/colors";

import { AuthStackParamList, AuthStackProps } from "./types";

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack: React.FC<AuthStackProps> = ({ initialScreen }) => {
  
  return (
    <Stack.Navigator
      initialRouteName={initialScreen}
      screenOptions={{
        headerTitleAlign: "center",
        headerTintColor: Colors.White,
        headerStyle: {
          backgroundColor: Colors.Black
        }
      }}
    >
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen
        name="Otp"
        component={OtpScreen}
        options={{
          title: "Otp",
          headerLeft: () => null
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          title: "Register",
          headerLeft: () => null
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
