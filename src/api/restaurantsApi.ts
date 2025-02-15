import { API_ENDPOINTS } from "constants/apiEndpoints";

import { apiCallService } from "./apiService";

export const getRestaurants = async () => {
  return apiCallService("GET", API_ENDPOINTS.GET_RESTAURANTS);
};

export type GetNearestRestaurantsRequest = {
  latitude: number;
  longitude: number;
  searchString?: string;
};
export const getNearestRestaurants = async (
  data: GetNearestRestaurantsRequest
) => {
  return apiCallService(
    "GET",
    `${API_ENDPOINTS.GET_NEAREST_RESTAURANTS}?latitude=${data.latitude}&longitude=${data.longitude}&q=${data.searchString}`
  );
};
