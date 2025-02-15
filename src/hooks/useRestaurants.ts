import { useMutation } from "@tanstack/react-query";
import { getNearestRestaurants, getRestaurants } from "api/restaurantsApi";

export const useRestaurants = () => {
  const getRestaurantsMutation = useMutation({
    mutationFn: getRestaurants,
  });

  const getNearestRestaurantsMutation = useMutation({
    mutationFn: getNearestRestaurants,
  });

  return {
    getRestaurantsMutation,
    getNearestRestaurantsMutation,
  };
};
