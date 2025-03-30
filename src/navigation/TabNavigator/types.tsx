import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

export type TabBarParamList = {
  Home: undefined;
  Restaurants: undefined;
  Events: { restaurantId?: number };
  Profile: undefined;
};

export type TabBarNavigationProp = BottomTabNavigationProp<TabBarParamList>;
