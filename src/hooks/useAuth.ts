import { useMutation } from "@tanstack/react-query";
import {
  getCities,
  getProfile,
  getStates,
  sendOtp,
  signUp,
  updateCurrentLocation,
  verifyOtp,
} from "api/authApi";

export const useAuth = () => {
  const sendOtpMutation = useMutation({
    mutationFn: sendOtp,
  });

  const verifyOtpMutation = useMutation({
    mutationFn: verifyOtp,
  });

  const signUpMutation = useMutation({
    mutationFn: signUp,
  });

  const getStatesMutation = useMutation({
    mutationFn: getStates,
  });

  const getCitiesMutation = useMutation({
    mutationFn: getCities,
  });

  const updateLocationMutation = useMutation({
    mutationFn: updateCurrentLocation,
  });

  const getProfileMutation = useMutation({
    mutationFn: getProfile,
  });

  return {
    sendOtpMutation,
    verifyOtpMutation,
    signUpMutation,
    getStatesMutation,
    getCitiesMutation,
    updateLocationMutation,
    getProfileMutation,
  };
};
