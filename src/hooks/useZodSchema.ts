import { REGEX } from "constants/regex";
import { useTranslation } from "react-i18next";
import { z } from "zod";

export const useZodSchema = () => {
  const { t } = useTranslation();

  const loginSchema = z.object({
    mobileNo: z
      .string()
      .regex(REGEX.MOBILE_NO, {
        message: t("mobile-number-must-contain-only-digits"),
      })
      .length(10, { message: t("mobile-number-must-be-exactly-10-digits") })
      .nonempty({ message: t("mobile-number-is-required") }),
  });

  const verifyOtpSchema = z.object({
    otp: z
      .string()
      .regex(REGEX.OTP, {
        message: t("otp-must-contain-only-digits"),
      })
      .length(4, { message: t("otp-must-be-exactly-4-digits") })
      .nonempty({ message: t("otp-is-required") }),
  });

  const signUpSchema = z.object({
    firstName: z
      .string()
      .min(2, { message: t("first-name-must-be-at-least-2-characters-long") })
      .max(20, {
        message: t("first-name-must-be-less-than-20-characters-long"),
      })
      .nonempty({ message: t("first-name-is-required") }),
    lastName: z
      .string()
      .min(2, { message: t("last-name-must-be-at-least-2-characters-long") })
      .max(20, { message: t("last-name-must-be-less-than-20-characters-long") })
      .nonempty({ message: t("last-name-is-required") }),
    email: z
      .string()
      .email({ message: t("invalid-email-address") })
      .max(30, { message: t("email-must-be-less-than-30-characters-long") })
      .nonempty({ message: t("email-is-required") }),
    state: z
      .object({ label: z.string(), value: z.number() })
      .refine((data) => data.value !== undefined, {
        message: t("state-is-required"),
      }),
    city: z
      .object({ label: z.string(), value: z.number() })
      .refine((data) => data.value !== undefined, {
        message: t("city-is-required"),
      }),
    acceptTerms: z.literal(true).refine((value) => value === true, {
      message: t("you-must-accept-the-terms-and-conditions"),
    }),
  });

  return {
    loginSchema,
    verifyOtpSchema,
    signUpSchema,
  };
};
