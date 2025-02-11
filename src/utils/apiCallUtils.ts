import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const checkAuthAndExecute = async (callback: () => void) => {
  try {
    const token = await AsyncStorage.getItem("accessToken");
    if (token) {
      callback();
    } else {
      Alert.alert(
        "Login Required",
        "You need to log in to access this functionality."
      );
    }
  } catch (error) {
    console.error("Error accessing AsyncStorage:", error);
    Alert.alert("Error", "Something went wrong. Please try again.");
  }
};
