import {StackNavigationProp} from "@react-navigation/stack";

export type HomeStackParamList = {
  Home: undefined;
};

//navigationParams
export type FeedNavigationProp = StackNavigationProp<
  HomeStackParamList,
  "Home"
>;
