import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { API_ENDPOINTS } from "constants/apiEndpoints";
import { Alert } from "react-native";
import Config from "react-native-config";

const api = axios.create({
  baseURL: Config.BASEURL,
  //baseURL: "http://192.168.1.99:4000/",
});

// Request Interceptor
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig<any>) => {
    //const token = await AsyncStorage.getItem("accessToken");
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTczOTQ1Mzk1NywiZXhwIjoxNzQ0NjM3OTU3LCJpc3MiOiJ1bmtub3duIn0.ogfzeBzokFLtwmyZ5ccLw1QjZA4xHvXBQuBuuG5ltF4";
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    if (error?.response?.status === 401) {
      const refreshToken = await AsyncStorage.getItem("partyRefreshToken");
      if (!refreshToken) {
        Alert.alert("Session Expired", "Please log in again.");
        await AsyncStorage.clear();
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(API_ENDPOINTS.REFRESH_TOKEN, {
          token: refreshToken,
        });
        await AsyncStorage.setItem(
          "partyAccessToken",
          response.data.data.token
        );
        error.config.headers.Authorization = `Bearer ${response.data.data.token}`;
        return api(error.config); // Retry the original request
      } catch (refreshError) {
        Alert.alert("Session Expired", "Please log in again.");
        await AsyncStorage.clear();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
