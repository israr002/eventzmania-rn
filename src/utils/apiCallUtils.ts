import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from "axios";
import { API_ENDPOINTS } from "constants/apiEndpoints";
import { Alert } from "react-native";
import Config from "react-native-config"

type MethodType = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface ExtendedAxiosRequestConfig extends AxiosRequestConfig {
  data?: any;
}

const jwtAxios = axios.create({
  baseURL: Config.BASEURL
});

jwtAxios.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig<any>
  ): Promise<InternalAxiosRequestConfig<any>> => {
    const token = await AsyncStorage.getItem("ydfAccessToken");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = "Bearer " + token;
    }
    config.headers = config.headers || {};
    config.headers["Access-Control-Allow-Origin"] = "*";
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

jwtAxios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config as InternalAxiosRequestConfig<any>;
    if (error?.response?.status === 401) {
      const refreshToken = await AsyncStorage.getItem("partyRefreshToken");
      return axios
        .post(API_ENDPOINTS.REFRESH_TOKEN, {
          token: refreshToken
        })
        .then(async (response: AxiosResponse) => {
          if (response?.status === 200) {
            await AsyncStorage.setItem(
              "accessToken",
              response.data.data.token
            );
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers.Authorization =
              "Bearer " + response.data.data.token;
            return axios(originalRequest);
          } else {
            Alert.alert(
              "Information",
              "Your session is expired. Please Login again",
              [
                {
                  text: "OK",
                  onPress: async () => {
                    await emptyAsyncStorage();
                  }
                }
              ]
            );
          }
        })
        .catch(async err => {
          if (err.response.status === 403) {
            Alert.alert(
              "Information",
              "Your session is expired. Please Login again",
              [
                {
                  text: "OK",
                  onPress: async () => {
                    await emptyAsyncStorage();
                  }
                }
              ]
            );
          }
          return Promise.reject(err);
        });
    } else if (error?.response?.status === 301) {
      return error;
    } else {
      Alert.alert(
        "Information",
        error.response ? error.response?.data?.message : error.message
      );
      return error;
    }
  }
);

export const apiCallService = async (
  methodType: MethodType,
  url: string,
  body?: any
): Promise<any> => {
  if (NetInfo != null) {
    const netInfoState = await NetInfo.fetch();
    if (netInfoState.isConnected === true) {
      const headers: Record<string, string> = {};
      if (body instanceof FormData) {
        headers["Content-Type"] = "multipart/form-data";
      }
      try {
        const token = await AsyncStorage.getItem("partyAccessToken");
        console.log({ token });
        if (token) {
          headers["Authorization"] = "Bearer " + token;
        }
        headers["Access-Control-Allow-Origin"] = "*";
        const config: ExtendedAxiosRequestConfig = {
          method: methodType,
          url,
          headers,
          data: body
        };
        const response = await jwtAxios.request(config);
        if (response?.status === 200) {
          return response?.data;
        }
      } catch (error) {
        console.log("error", error);
      }
    } else {
      Alert.alert("Information", "You are not connected to internet");
    }
  }
};

export const emptyAsyncStorage = async (): Promise<void> => {
  await AsyncStorage.removeItem("partyAccessToken");
  await AsyncStorage.removeItem("partyRefreshToken");
  await AsyncStorage.removeItem("partyIsRegistered");
};
