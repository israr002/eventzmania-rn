import { useMutation } from "@tanstack/react-query";
import { getRestaurantUpcomingEvents, getUpcomingEvents } from "api/eventsApi";

export const useEvents = () => {
  const getUpcomingEventsMutation = useMutation({
    mutationFn: getUpcomingEvents,
  });

  const getRestaurantEventsMutation = useMutation({
    mutationFn: getRestaurantUpcomingEvents,
  });

  return {
    getUpcomingEventsMutation,
    getRestaurantEventsMutation,
  };
};
