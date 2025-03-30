import { API_ENDPOINTS } from "constants/apiEndpoints";
import { apiCallService } from "./apiService";

export const getTicketBookings = async () => {
  return apiCallService("GET", API_ENDPOINTS.GET_TICKET_BOOKINGS);
};

export const getRestaurantBookings = async () => {
  return apiCallService("GET", API_ENDPOINTS.GET_RESTAURANT_BOOKINGS);
};

export type BookTicketRequest = {
  eventId: number;
  noOfTickets: number;
};
export const bookTicket = async (data: BookTicketRequest) => {
  return apiCallService("POST", API_ENDPOINTS.BOOK_EVENT_TICKETS, data);
};

export type BookRestaurantBanquetRequest = {
  restaurantId: number;
  date: Date;
  fromTime: string;
  toTime: string;
  occasionId: Number;
  packageId: Number;
  noOfPeople: Number;
  totalAmount: Number;
  couponId?: Number;
  couponDiscount?: Number;
  restaurantDiscount: Number;
  finalAmount: Number;
};
export const bookRestaurantBanquet = async (
  data: BookRestaurantBanquetRequest
) => {
  return apiCallService("POST", API_ENDPOINTS.BOOK_RESTAURANT_BANQUET, data);
};

export type ApplyCouponRequest = {
  restaurantId: number;
  couponCode: string;
  amount: number;
};
export const applyCouponCode = async (data: ApplyCouponRequest) => {
  return apiCallService("POST", API_ENDPOINTS.APPLY_COUPON, data);
};
