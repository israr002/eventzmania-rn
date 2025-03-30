import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import Button from "components/common/Button";
import Input from "components/common/Input";
import { useAuth } from "hooks/useAuth";
import { useZodSchema } from "hooks/useZodSchema";
import { AppNavigationProp } from "navigation/AppNavigator/types";
import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Colors } from "styles/colors";
import { Metrics } from "styles/metrics";

type LoginFormData = {
  mobileNo: string;
};

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<AppNavigationProp>();
  const { sendOtpMutation } = useAuth();
  const { t } = useTranslation();
  const { loginSchema } = useZodSchema();

  const methods = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const { handleSubmit } = methods;

  const sendOtp: SubmitHandler<LoginFormData> = async (data) => {
    console.log({ data });
    sendOtpMutation.mutate(data, {
      onSuccess: (res) => {
        const { resendTimeInSeconds, isRegistered } = res.data;
        console.log("LoginResponse", res.data);
        navigation.navigate("Otp", {
          resendTimeInSeconds,
          mobileNo: data.mobileNo,
          isRegistered,
        });
      },
      onError: (err) => {
        console.log("Login failed:", err);
      },
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
    paddingHorizontal: Metrics.padding.xLarge,
  },
});

export default LoginScreen;
