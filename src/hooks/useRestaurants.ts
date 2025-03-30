import { useMutation } from "@tanstack/react-query";
import {
  getNearestRestaurants,
  getRestaurantCalendar,
  getRestaurantDetails,
  getRestaurantImages,
  getRestaurantPackages,
  getRestaurants,
  getUpcomingEvents,
  rateRestaurant,
} from "api/restaurantsApi";

export const useRestaurants = () => {
  const getRestaurantsMutation = useMutation({
    mutationFn: getRestaurants,
  });

  const getNearestRestaurantsMutation = useMutation({
    mutationFn: getNearestRestaurants,
  });

  const getUpcomingEventsMutation = useMutation({
    mutationFn: getUpcomingEvents,
  });

  const getRestaurantDetailsMutation = useMutation({
    mutationFn: getRestaurantDetails,
  });

  const getRestaurantImagesMutation = useMutation({
    mutationFn: getRestaurantImages,
  });

  const getRestaurantCalendarMutation = useMutation({
    mutationFn: getRestaurantCalendar,
  });

  const getRestaurantPackagesMutation = useMutation({
    mutationFn: getRestaurantPackages,
  });

  const rateRestaurantMutation = useMutation({
    mutationFn: rateRestaurant,
  });

  return {
    getRestaurantsMutation,
    getNearestRestaurantsMutation,
    getUpcomingEventsMutation,
    getRestaurantDetailsMutation,
    getRestaurantImagesMutation,
    getRestaurantCalendarMutation,
    getRestaurantPackagesMutation,
    rateRestaurantMutation,
  };
};
