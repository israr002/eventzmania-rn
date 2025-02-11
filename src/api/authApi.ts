import { API_ENDPOINTS } from "constants/apiEndpoints";

import { apiCallService } from "./apiService";

export type SendOtpRequest = {
  mobileNo: string;
};

export type VerifyOtpRequest = {
  mobileNo: string;
  otp: string;
};

export type SignUpRequest = {
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  acceptTerms: boolean;
};

export const sendOtp = async (data: SendOtpRequest) => {
  return apiCallService("POST", API_ENDPOINTS.SEND_OTP, data);
};

export const verifyOtp = async (data: VerifyOtpRequest) => {
  return apiCallService("POST", API_ENDPOINTS.VERIFY_OTP, data);
};

export const signUp = async (data: SignUpRequest) => {
  return apiCallService("POST", API_ENDPOINTS.SIGNUP, data);
};
