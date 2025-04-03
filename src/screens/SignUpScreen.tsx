import { zodResolver } from "@hookform/resolvers/zod";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import EmailSvg from "assets/images/icons/email.svg";
import LocationSvg from "assets/images/icons/location.svg";
import UserSvg from "assets/images/icons/user.svg";
import Button from "components/common/Button";
import Checkbox from "components/common/Checkbox";
import Dropdown from "components/common/Dropdown";
import ImageSelector from "components/common/ImageSelector";
import Input from "components/common/Input";
import { useAuth } from "hooks/useAuth";
import { useAuthStore } from "hooks/useAuthStore";
import { useDropdown } from "hooks/useDropdown";
import { useZodSchema } from "hooks/useZodSchema";
import {
  AppNavigationProp,
  AppStackParamList,
} from "navigation/AppNavigator/types";
import React, { useEffect, useState } from "react";
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useWatch,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Colors } from "styles/colors";
import { Metrics } from "styles/metrics";
import { ImageData } from "types";

type SignUpFormData = {
  firstName: string;
  lastName: string;
  email: string;
  state: { label: string; value: number };
  city: { label: string; value: number };
  acceptTerms: boolean;
};

const SignUpScreen: React.FC = () => {
  const [imageData, setImageData] = useState<ImageData>(null);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const { signUpMutation } = useAuth();
  const { getStatesMutation, getCitiesMutation } = useDropdown();
  const { t } = useTranslation();
  const { signUpSchema } = useZodSchema();
  const { setLoggedIn } = useAuthStore();
  const navigation = useNavigation<AppNavigationProp>();
  const route = useRoute<RouteProp<AppStackParamList, "SignUp">>();

  //const setLoggedIn = useAuthStore((state) => state.setLoggedIn);

  const methods = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });
  const { handleSubmit, control } = methods;

  const selectedState = useWatch({
    control,
    name: "state",
  });

  useEffect(() => {
    getStates();
  }, []);

  useEffect(() => {
    if (selectedState) {
      getCities(selectedState.value);
    }
  }, [selectedState]);

  const getStates = async () => {
    getStatesMutation.mutate(undefined, {
      onSuccess: (res) => {
        setStates(res.data.map((i) => ({ label: i.name, value: i.id })));
      },
      onError: (err) => {
        console.log("request failed:", err);
      },
    });
  };

  const getCities = async (id: number) => {
    getCitiesMutation.mutate(id, {
      onSuccess: (res) => {
        setCities(res.data.map((i) => ({ label: i.name, value: i.id })));
      },
      onError: (err) => {
        console.log("request failed:", err);
      },
    });
  };

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    const uploadData = new FormData();
    uploadData.append("firstName", data.firstName);
    uploadData.append("lastName", data.lastName);
    uploadData.append("email", data.email);
    uploadData.append("mobileNo", route.params.mobileNo);
    uploadData.append("cityId", data.city.value);
    if (imageData) {
      uploadData.append(
        "profileImage",
        imageData.fileName
          ? {
              type: imageData.type,
              uri: imageData.uri,
              name: imageData.fileName,
            }
          : ""
      );
    }

    signUpMutation.mutate(uploadData, {
      onSuccess: async (res) => {
        setLoggedIn(true, res?.data?.accessToken, res?.data?.refreshToken);
        navigation.navigate("Tabs", { screen: "Home" });
      },
      onError: (err) => {
        console.log("Registration failed:", err);
      },
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

        <Dropdown
          name="state"
          placeholder={t("state")}
          icon={<LocationSvg fill={Colors.White} width={20} height={20} />}
          items={states}
        />

        <Dropdown
          name="city"
          placeholder={t("city")}
          icon={<LocationSvg fill={Colors.White} width={20} height={20} />}
          items={cities}
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
    paddingHorizontal: Metrics.padding.xLarge,
  },
});

export default SignUpScreen;
