import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type AuthStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Otp: { mobileNo: string; resendTimeInSeconds: number };
  SignUp: undefined;
};

export type AuthStackProps = {
  initialScreen: keyof AuthStackParamList;
};

export type OnboardingNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "Onboarding"
>;
export type LoginNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "Login"
>;
export type OtpNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "Otp"
>;
export type SignUpNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "SignUp"
>;

export type OtpRouteProp = RouteProp<AuthStackParamList, "Otp">;
