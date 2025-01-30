import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { SendOtpRequest } from "api/authApi";
import Button from "components/common/Button";
import Input from "components/common/Input";
import { useAuth } from "hooks/useAuth";
import { useZodSchema } from "hooks/useZodSchema";
import { LoginNavigationProp } from "navigation/AuthStack/types";
import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Colors } from "styles/colors";
import { Metrics } from "styles/metrics";

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginNavigationProp>();
  const { sendOtpMutation } = useAuth();
  const { t } = useTranslation();
  const { loginSchema } = useZodSchema();

  const methods = useForm<SendOtpRequest>({
    resolver: zodResolver(loginSchema)
  });
  const { handleSubmit } = methods;

  const sendOtp: SubmitHandler<SendOtpRequest> = async data => {
    sendOtpMutation.mutate(data, {
      onSuccess: res => {
        console.log("Login successful:", res.data);
        const { resendTimeInSeconds } = res?.data;
    navigation.navigate("Otp", {
      resendTimeInSeconds: resendTimeInSeconds,
      mobileNo: data.mobileNo
    });
      },
      onError: err => {
        console.log("Login failed:", err);
      }
    });
  };

  return (
    <View style={styles.mainContainer}>
      <FormProvider {...methods}>
        <Input
          name="mobileNo"
          placeholder={t("mobile-no")}
          keyboardType="number-pad"
        />
        <Button title={t("send-otp")} onPress={handleSubmit(sendOtp)} />
      </FormProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.Black,
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: Metrics.padding.xLarge
  }
});

export default LoginScreen;
