import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { useEffect } from "react";
import Config from "react-native-config";
import { useAuthStore } from "./useAuthStore";
import { Alert } from "react-native";
import { API_ENDPOINTS } from "constants/apiEndpoints";

const api = axios.create({
  baseURL: Config.BASEURL,
  //baseURL: "http://192.168.1.99:4000/",
});

export const useAxios = () => {
  const { accessToken, refreshToken, logout, refresh } = useAuthStore();
  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      async (config: InternalAxiosRequestConfig<any>) => {
        if (accessToken) {
          config.headers = config.headers || {};
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = api.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error) => {
        if (error?.response?.status === 401) {
          if (!refreshToken) {
            Alert.alert("Session Expired", "Please log in again.");
            await logout();
            return Promise.reject(error);
          }

          try {
            const response = await axios.post(API_ENDPOINTS.REFRESH_TOKEN, {
              token: refreshToken,
            });
            await refresh(true, response.data.data.token);
            error.config.headers.Authorization = `Bearer ${response.data.data.token}`;
            return api(error.config); // Retry the original request
          } catch (refreshError) {
            Alert.alert("Session Expired", "Please log in again.");
            await logout();
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return api;
};
