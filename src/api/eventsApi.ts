import { API_ENDPOINTS } from "constants/apiEndpoints";

import { apiCallService } from "./apiService";

export const getUpcomingEvents = async () => {
  return apiCallService("GET", API_ENDPOINTS.GET_UPCOMING_EVENTS);
};

export const getRestaurantUpcomingEvents = async (data: number) => {
  return apiCallService(
    "GET",
    `${API_ENDPOINTS.GET_UPCOMING_RESTAURANT_EVENTS}?restaurantId=${data}`
  );
};
