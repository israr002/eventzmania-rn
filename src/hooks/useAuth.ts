import { useMutation } from "@tanstack/react-query";
import {
  editProfile,
  getProfile,
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

  const updateLocationMutation = useMutation({
    mutationFn: updateCurrentLocation,
  });

  const getProfileMutation = useMutation({
    mutationFn: getProfile,
  });

  const editProfileMutation = useMutation({
    mutationFn: editProfile,
  });

  return {
    sendOtpMutation,
    verifyOtpMutation,
    signUpMutation,
    updateLocationMutation,
    getProfileMutation,
    editProfileMutation,
  };
};
