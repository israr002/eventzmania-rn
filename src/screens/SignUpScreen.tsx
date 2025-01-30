import { zodResolver } from "@hookform/resolvers/zod";
import EmailSvg from "assets/images/icons/email.svg";
import LocationSvg from "assets/images/icons/location.svg";
import UserSvg from "assets/images/icons/user.svg";
import Button from "components/common/Button";
import Checkbox from "components/common/Checkbox";
import ImageSelector from "components/common/ImageSelector";
import Input from "components/common/Input";
import { useAuth } from "hooks/useAuth";
import { useZodSchema } from "hooks/useZodSchema";
import React, { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Colors } from "styles/colors";
import { Metrics } from "styles/metrics";
import { ImageData } from "types";

type SignUpFormData = {
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  acceptTerms: boolean;
};

const SignUpScreen: React.FC = () => {
  const [imageData, setImageData] = useState<ImageData>(null);

  const { signUpMutation } = useAuth();
  const { t } = useTranslation();
  const { signUpSchema } = useZodSchema();

  const methods = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema)
  });
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<SignUpFormData> = async data => {
    const uploadData = new FormData();
    uploadData.append("firstName", data.firstName);
    uploadData.append("lastName", data.lastName);
    uploadData.append("email", data.email);
    uploadData.append("city", data.city);
    uploadData.append(
      "profileImage",
      imageData.fileName
        ? {
            type: imageData.type,
            uri: imageData.uri,
            name: imageData.fileName
          }
        : ""
    );
    signUpMutation.mutate(uploadData, {
      onSuccess: res => {
        console.log("Registration successful:", res);
        //navigation.navigate("SignUp");
      },
      onError: err => {
        console.log("Login failed:", err);
      }
    });
  };

  return (
    <View style={styles.mainContainer}>
      <FormProvider {...methods}>
        <ImageSelector imageData={imageData} setImageData={setImageData} />

        <Input
          name="firstName"
          placeholder={t("first-name")}
          icon={<UserSvg fill={Colors.White} width={20} height={20} />}
        />
        <Input
          name="lastName"
          placeholder={t("last-name")}
          icon={<UserSvg fill={Colors.White} width={20} height={20} />}
        />
        <Input
          name="email"
          placeholder={t("email-id")}
          icon={<EmailSvg fill={Colors.White} width={20} height={20} />}
        />
        <Input
          name="city"
          placeholder={t("city")}
          icon={<LocationSvg fill={Colors.White} width={20} height={20} />}
        />
        <Checkbox
          name="acceptTerms"
          label={t("i-accept-the-terms-and-conditions")}
        />
        <Button title={t("register")} onPress={handleSubmit(onSubmit)} />
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

export default SignUpScreen;
