import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppStackParamList } from "./types";
import TabNavigator from "navigation/TabNavigator";
import RestaurantDetailsScreen from "screens/RestaurantDetailsScreen";
import RestaurantCalendarScreen from "screens/RestaurantCalendarScreen";
import { Colors } from "styles/colors";
import RestaurantPackagesScreen from "screens/RestaurantPackagesScreen";
import BookingsScreen from "screens/BookingsScreen";
import BookTicket from "screens/BookTicket";
import EditProfile from "screens/EditProfile";
import OtpScreen from "screens/OtpScreen";
import LoginScreen from "screens/LoginScreen";
import OnboardingScreen from "screens/OnboardingScreen";
import SignUpScreen from "screens/SignUpScreen";
import { NavigationContainer } from "@react-navigation/native";
import { useAuthStore } from "hooks/useAuthStore";
import BookRestaurantBanquet from "screens/BookRestaurantBanquet";

const AppStack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator: React.FC = () => {
  let initialScreen: keyof AppStackParamList = "Onboarding";
  const { hasSeenOnboarding, isGuest, isLoggedIn } = useAuthStore();

  if (!hasSeenOnboarding) {
    initialScreen = "Onboarding";
  } else if (isGuest || isLoggedIn) {
    initialScreen = "Tabs";
  } else {
    initialScreen = "Login";
  }

  return (
    <NavigationContainer>
      <AppStack.Navigator
        initialRouteName={initialScreen}
        screenOptions={{
          headerTintColor: Colors.White,
          headerStyle: { backgroundColor: Colors.Black },
        }}
      >
        <AppStack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
        <AppStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerLeft: () => null }}
        />
        <AppStack.Screen
          name="Otp"
          component={OtpScreen}
          options={{ headerLeft: () => null }}
        />
        <AppStack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{
            title: "Register",
            headerLeft: () => null,
          }}
        />
        <AppStack.Screen
          name="Tabs"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <AppStack.Screen
          name="RestaurantDetails"
          component={RestaurantDetailsScreen}
        />
        <AppStack.Screen
          name="RestaurantCalendar"
          component={RestaurantCalendarScreen}
          options={{ title: "Calendar" }}
        />
        <AppStack.Screen
          name="RestaurantPackages"
          component={RestaurantPackagesScreen}
          options={{ title: "Packages" }}
        />
        <AppStack.Screen
          name="MyBookings"
          component={BookingsScreen}
          options={{ title: "My Bookings" }}
        />
        <AppStack.Screen
          name="BookTicket"
          component={BookTicket}
          options={{ title: "Buy Tickets" }}
        />
        <AppStack.Screen
          name="BookRestaurantBanquet"
          component={BookRestaurantBanquet}
          options={{ title: "Book Restaurant Banquet" }}
        />
        <AppStack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{ title: "Edit Profile" }}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
