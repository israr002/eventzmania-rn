import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { VerifyOtpRequest } from "api/authApi";
import Button from "components/common/Button";
import { useAuth } from "hooks/useAuth";
import React, { useEffect, useRef, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuthStore } from "hooks/useAuthStore";
import {
  AppNavigationProp,
  AppStackParamList,
} from "navigation/AppNavigator/types";

type OtpFormData = {
  otp: string;
};

const OtpScreen: React.FC = () => {
  const navigation = useNavigation<AppNavigationProp>();
  const route = useRoute<RouteProp<AppStackParamList, "Otp">>();
  const { mobileNo, resendTimeInSeconds, isRegistered } = route?.params;
  const { verifyOtpMutation, sendOtpMutation } = useAuth();
  const { setLoggedIn } = useAuthStore();
  //const setLoggedIn = useAuthStore((state) => state.setLoggedIn);

  const methods = useForm<OtpFormData>();
  const { handleSubmit } = methods;

  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const otpInputs = useRef<Array<TextInput | null>>([null, null, null, null]);
  const [resendButtonDisabledTime, setResendButtonDisabledTime] =
    useState<number>(resendTimeInSeconds);
  const resendOtpTimerInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    startResendOtpTimer();
    return () => {
      if (resendOtpTimerInterval.current) {
        clearInterval(resendOtpTimerInterval.current);
      }
    };
  }, [resendButtonDisabledTime]);

  const startResendOtpTimer = () => {
    if (resendOtpTimerInterval.current) {
      clearInterval(resendOtpTimerInterval.current);
    }
    resendOtpTimerInterval.current = setInterval(() => {
      setResendButtonDisabledTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
  };

  const handleOtpChange = (value: string, index: number) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 3) {
        otpInputs.current[index + 1]?.focus();
      }
    }
  };

  const handleBackspace = (index: number) => {
    if (index > 0 && !otp[index]) {
      otpInputs.current[index - 1]?.focus();
    }
  };

  const verifyOtp: SubmitHandler<OtpFormData> = async () => {
    const requestData: VerifyOtpRequest = {
      mobileNo: mobileNo,
      otp: otp.join(""),
    };
    verifyOtpMutation.mutate(requestData, {
      onSuccess: async (res) => {
        console.log("verification successful:", res);
        if (res) {
          if (!isRegistered) {
            navigation.navigate("SignUp", { mobileNo: mobileNo });
          } else {
            setLoggedIn(true, res?.data?.accessToken, res?.data?.refreshToken);
            navigation.navigate("Tabs", { screen: "Home" });
          }
        }
      },
      onError: (err) => {
        console.log("Login failed:", err);
      },
    });
  };

  const resendOtp = async () => {
    sendOtpMutation.mutate(
      { mobileNo },
      {
        onSuccess: (res) => {
          setResendButtonDisabledTime(res?.data?.resendTimeInSeconds);
          startResendOtpTimer();
        },
        onError: (err) => {
          console.log("request failed:", err);
        },
      }
    );
  };

  return (
    <View style={styles.mainContainer}>
      <FormProvider {...methods}>
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (otpInputs.current[index] = ref)}
              style={styles.otpBox}
              value={digit}
              maxLength={1}
              keyboardType="number-pad"
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === "Backspace") {
                  handleBackspace(index);
                }
              }}
            />
          ))}
        </View>

        <Button title="Verify OTP" onPress={handleSubmit(verifyOtp)} />

        {resendButtonDisabledTime > 0 ? (
          <View style={styles.resend}>
            <View style={styles.resendTextContainer}>
              <Text style={styles.resendSubText}>Resend OTP in&nbsp;</Text>
              <Text style={styles.resendText}>{resendButtonDisabledTime}</Text>
              <Text style={styles.resendSubText}>&nbsp;seconds</Text>
            </View>
          </View>
        ) : (
          <TouchableOpacity style={styles.resend} onPress={resendOtp}>
            <Text style={styles.resendText}>Resend OTP</Text>
          </TouchableOpacity>
        )}
      </FormProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#20232A",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 50,
  },
  otpBox: {
    borderColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    color: "white",
    fontSize: 20,
    height: 50,
    textAlign: "center",
    width: 50,
  },
  otpContainer: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    width: "100%",
  },
  resend: {
    alignItems: "center",
    marginTop: 20,
  },
  resendSubText: {
    color: "white",
    fontSize: 14,
  },
  resendText: {
    color: "#ED3269",
    fontSize: 16,
    fontWeight: "bold",
  },
  resendTextContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
});

export default OtpScreen;
