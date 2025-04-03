import { useNavigation } from "@react-navigation/native";
import { AppNavigationProp } from "navigation/AppNavigator/types";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
import { useAuthStore } from "./useAuthStore";

export const useCheckAuth = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<AppNavigationProp>();
  const { isLoggedIn } = useAuthStore();

  const checkAuth = async (callback: () => void) => {
    try {
      if (isLoggedIn) {
        callback();
      } else {
        Alert.alert(
          t("login-required"),
          t("you-need-to-log-in-to-access-this-functionality"),
          [
            { text: t("skip-for-now"), onPress: () => navigation.goBack() },
            {
              text: t("login"),
              onPress: () => navigation.navigate("Login"),
            },
          ]
        );
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return { checkAuth };
};
