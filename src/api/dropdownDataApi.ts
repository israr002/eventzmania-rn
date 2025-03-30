import { API_ENDPOINTS } from "constants/apiEndpoints";
import { apiCallService } from "./apiService";

export const getStates = async () => {
  return apiCallService("GET", API_ENDPOINTS.GET_STATES);
};

export const getCities = async (data: number) => {
  return apiCallService("GET", `${API_ENDPOINTS.GET_CITIES}?stateId=${data}`);
};

export const getOccasions = async () => {
  return apiCallService("GET", API_ENDPOINTS.GET_OCCASIONS);
};
