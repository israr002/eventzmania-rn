import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type HomeStackParamList = {
  Home: undefined;
  Restaurants: undefined;
  Events: undefined;
  Profile: undefined;
};

//navigationParams
export type FeedNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  "Home"
>;
export type RestaurantsNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  "Restaurants"
>;
export type EventsNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  "Events"
>;
export type ProfileNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  "Profile"
>;
