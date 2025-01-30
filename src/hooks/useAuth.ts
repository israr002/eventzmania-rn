import { useMutation } from "@tanstack/react-query";
import { sendOtp, signUp, verifyOtp } from "api/authApi";

export const useAuth = () => {
  const sendOtpMutation = useMutation({
    mutationFn: sendOtp
  });

  const verifyOtpMutation = useMutation({
    mutationFn: verifyOtp
  });

  const signUpMutation = useMutation({
    mutationFn: signUp
  });

  return { sendOtpMutation, verifyOtpMutation, signUpMutation };
};
