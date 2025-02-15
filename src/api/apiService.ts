import NetInfo from "@react-native-community/netinfo";
import { Alert } from "react-native";

import api from "./index";

export type MethodType = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export const apiCallService = async (
  methodType: MethodType,
  url: string,
  body?: any
) => {
  const netInfo = await NetInfo.fetch();
  if (!netInfo.isConnected) {
    Alert.alert("No Internet", "You are not connected to the internet.");
    return;
  }

  try {
    const config = {
      method: methodType,
      url,
      data: body
    };
    const response = await api.request(config);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
