import React, { useEffect, useState } from "react";
import { View, Alert, StyleSheet } from "react-native";
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useWatch,
} from "react-hook-form";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import {
  AppNavigationProp,
  AppStackParamList,
} from "navigation/AppNavigator/types";
import { ImageData, User } from "types";
import { useAuth } from "hooks/useAuth";
import { useDropdown } from "hooks/useDropdown";
import { useTranslation } from "react-i18next";
import { useZodSchema } from "hooks/useZodSchema";
import { Colors } from "styles/colors";
import { Metrics } from "styles/metrics";
import ImageSelector from "components/common/ImageSelector";
import Input from "components/common/Input";
import EmailSvg from "assets/images/icons/email.svg";
import LocationSvg from "assets/images/icons/location.svg";
import UserSvg from "assets/images/icons/user.svg";
import Button from "components/common/Button";
import Dropdown from "components/common/Dropdown";
import { zodResolver } from "@hookform/resolvers/zod";

type ProfileFormData = {
  firstName: string;
  lastName: string;
  email: string;
  state: { label: string; value: number };
  city: { label: string; value: number };
};

const EditProfile: React.FC = () => {
  const navigation = useNavigation<AppNavigationProp>();
  const route = useRoute<RouteProp<AppStackParamList, "EditProfile">>();
  const { user } = route.params;
  const [imageData, setImageData] = useState<ImageData>({
    uri: user.profileImage,
  });
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const { editProfileMutation } = useAuth();
  const { getStatesMutation, getCitiesMutation } = useDropdown();
  const { t } = useTranslation();
  const { signUpSchema } = useZodSchema();

  const defaultValues: ProfileFormData = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    state: user.state,
    city: user.city,
  };

  const methods = useForm<ProfileFormData>({
    defaultValues,
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
        console.log(res.data);
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

  const onSubmit: SubmitHandler<ProfileFormData> = async (data) => {
    const uploadData = new FormData();
    uploadData.append("firstName", data.firstName);
    uploadData.append("lastName", data.lastName);
    uploadData.append("email", data.email);
    uploadData.append("cityId", data.city.value);
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
    editProfileMutation.mutate(uploadData, {
      onSuccess: async (res) => {
        Alert.alert("Information", "Profile Updated Successfully", [
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
      },
      onError: (err) => {
        console.log("Request failed:", err);
      },
    });
  };

  return (
    <View style={styles.mainContainer}>
      <FormProvider {...methods}>
        <View>
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
          <Button
            title={t("update-profile")}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
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

export default EditProfile;
