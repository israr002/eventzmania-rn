import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Feed from "screens/FeedScreen";
import { Colors } from "styles/colors";

import RestaurantsScreen from "screens/RestaurantsScreen";
import EventsScreen from "screens/EventsScreen";
import ProfileScreen from "screens/ProfileScreen";

import HomeSvg from "assets/images/icons/home.svg";
import RestaurantSvg from "assets/images/icons/restaurants.svg";
import EventsSvg from "assets/images/icons/events.svg";
import ProfileSvg from "assets/images/icons/profile.svg";
import { RouteProp, useRoute } from "@react-navigation/native";
import { TabBarParamList } from "./types";
import { AppStackParamList } from "navigation/AppNavigator/types";

const Tab = createBottomTabNavigator<TabBarParamList>();

const TabNavigator: React.FC = () => {
  const route = useRoute<RouteProp<AppStackParamList, "Tabs">>();

  return (
    <Tab.Navigator
      initialRouteName={route.params ? route.params.screen : "Home"}
      screenOptions={{
        headerTitleAlign: "center",
        headerTintColor: Colors.White,
        headerStyle: {
          backgroundColor: Colors.Black,
          borderBottomColor: Colors.Grey,
          borderBottomWidth: 1,
        },
        tabBarStyle: {
          backgroundColor: Colors.Black,
        },
        tabBarActiveTintColor: Colors.Primary,
        tabBarInactiveTintColor: Colors.Grey,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Feed}
        options={{
          tabBarIcon: ({ color, size }) => (
            <HomeSvg height={size} width={size} fill={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Restaurants"
        component={RestaurantsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <RestaurantSvg height={size} width={size} fill={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Events"
        component={EventsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <EventsSvg height={size} width={size} fill={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <ProfileSvg height={size} width={size} fill={color} />
          ),
        }}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
