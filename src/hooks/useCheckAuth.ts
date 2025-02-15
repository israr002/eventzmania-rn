import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";

export const useCheckAuth = () => {
  const { t } = useTranslation();

  const checkAuth = async (callback: () => void) => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      if (token) {
        callback();
      } else {
        Alert.alert(
          t('login-required"'),
          t("you-need-to-log-in-to-access-this-functionality")
        );
      }
    } catch (error) {
      console.error("Error accessing AsyncStorage:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return { checkAuth };
};
