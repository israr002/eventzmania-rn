import { useMutation } from "@tanstack/react-query";
import {
  applyCouponCode,
  bookRestaurantBanquet,
  bookTicket,
  getRestaurantBookings,
  getTicketBookings,
} from "api/bookingsApi";

export const useBookings = () => {
  const getRestaurantBookingsMutation = useMutation({
    mutationFn: getRestaurantBookings,
  });

  const getTicketBookingsMutation = useMutation({
    mutationFn: getTicketBookings,
  });

  const bookTicketMutation = useMutation({
    mutationFn: bookTicket,
  });

  const bookRestaurantBanquetMutation = useMutation({
    mutationFn: bookRestaurantBanquet,
  });

  const applyCodeMutation = useMutation({
    mutationFn: applyCouponCode,
  });

  return {
    getRestaurantBookingsMutation,
    getTicketBookingsMutation,
    bookTicketMutation,
    bookRestaurantBanquetMutation,
    applyCodeMutation,
  };
};
