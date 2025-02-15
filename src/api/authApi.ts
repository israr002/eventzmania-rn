import { API_ENDPOINTS } from "constants/apiEndpoints";

import { apiCallService } from "./apiService";

export type SendOtpRequest = {
  mobileNo: string;
};
export const sendOtp = async (data: SendOtpRequest) => {
  return apiCallService("POST", API_ENDPOINTS.SEND_OTP, data);
};

export type VerifyOtpRequest = {
  mobileNo: string;
  otp: string;
};
export const verifyOtp = async (data: VerifyOtpRequest) => {
  return apiCallService("POST", API_ENDPOINTS.VERIFY_OTP, data);
};

export const signUp = async (data: FormData) => {
  return apiCallService("POST", API_ENDPOINTS.SIGNUP, data);
};

export const getStates = async () => {
  return apiCallService("GET", API_ENDPOINTS.GET_STATES);
};

export const getCities = async (data: number) => {
  return apiCallService("GET", `${API_ENDPOINTS.GET_CITIES}?stateId=${data}`);
};

export type UpdateLocationRequest = {
  latitude: number;
  longitude: number;
};
export const updateCurrentLocation = async (data: UpdateLocationRequest) => {
  return apiCallService("GET", API_ENDPOINTS.UPDATE_CURRENT_LOCATION, data);
};

export const getProfile = async () => {
  return apiCallService("GET", `${API_ENDPOINTS.GET_PROFILE}`);
};
