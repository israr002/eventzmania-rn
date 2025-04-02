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

export const getUpcomingEvents = async (data?: number) => {
  return apiCallService(
    "GET",
    `${API_ENDPOINTS.GET_UPCOMING_EVENTS}${data ? "?restaurantId=" + data : ""}`
  );
};

export const getRestaurantDetails = async (data: number) => {
  return apiCallService(
    "GET",
    `${API_ENDPOINTS.GET_RESTAURANT_DETAILS}?restaurantId=${data}`
  );
};

export const getRestaurantImages = async (data: number) => {
  return apiCallService(
    "GET",
    `${API_ENDPOINTS.GET_RESTAURANT_IMAGES}?restaurantId=${data}`
  );
};

export const getRestaurantCalendar = async (data: number) => {
  return apiCallService(
    "GET",
    `${API_ENDPOINTS.GET_RESTAURANT_CALENDAR}?restaurantId=${data}`
  );
};

export const getRestaurantPackages = async (data: number) => {
  return apiCallService(
    "GET",
    `${API_ENDPOINTS.GET_RESTAURANT_PACKAGES}?restaurantId=${data}`
  );
};

export type RateRestaurantRequest = {
  restaurantId: number;
  rating: number;
};
export const rateRestaurant = async (data: RateRestaurantRequest) => {
  return apiCallService("POST", API_ENDPOINTS.RATE_RESTAURANT, data);
};
