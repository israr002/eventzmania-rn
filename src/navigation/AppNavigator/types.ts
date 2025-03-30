import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TabBarParamList } from "navigation/TabNavigator/types";
import { EventDetails, Restaurant, User } from "types";

export type AppStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Otp: { mobileNo: string; resendTimeInSeconds: number; isRegistered: boolean };
  SignUp: undefined;
  Tabs: { screen?: keyof TabBarParamList; params?: any };
  RestaurantDetails: { restaurantId: number };
  RestaurantCalendar: { restaurantId: number };
  RestaurantPackages: { restaurantId: number };
  MyBookings: undefined;
  BookTicket: { event: EventDetails };
  BookRestaurantBanquet: { restaurant: Restaurant };
  EditProfile: { user: User };
};

export type AppNavigationProp = NativeStackNavigationProp<AppStackParamList>;
