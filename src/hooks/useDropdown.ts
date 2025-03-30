import { useMutation } from "@tanstack/react-query";
import { getCities, getOccasions, getStates } from "api/dropdownDataApi";

export const useDropdown = () => {
  const getStatesMutation = useMutation({
    mutationFn: getStates,
  });

  const getCitiesMutation = useMutation({
    mutationFn: getCities,
  });

  const getOccasionsMutation = useMutation({
    mutationFn: getOccasions,
  });

  return {
    getStatesMutation,
    getCitiesMutation,
    getOccasionsMutation,
  };
};
