import React, { useContext, useEffect, useState } from "react";
import { Alert, Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { ProfileNavigationProp } from "navigation/HomeStack/types";
import { User } from "types";
import { useAuth } from "hooks/useAuth";
import { Colors } from "styles/colors";
import { Metrics } from "styles/metrics";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "components/common/Button";
import { useTranslation } from "react-i18next";

const { height } = Dimensions.get("screen");

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<ProfileNavigationProp>();
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);
  //const { signOut } = useContext(AuthContext);
  const isFocused = useIsFocused();
  const { getProfileMutation } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    if (isFocused) {
      getUser();
    }
  }, [isFocused]);

  const getUser = async () => {
    const token = await AsyncStorage.getItem("accessToken");
    console.log({ token });
    getProfileMutation.mutate(undefined, {
      onSuccess: (res) => {
        console.log(res);
        setUser(res.data);
      },
      onError: (err) => {
        console.log("request failed:", err);
      },
    });
  };

  const logOut = () => {
    Alert.alert(t("logout"), t("are-you-sure-you-want-to-logout"), [
      { text: t("no"), style: "cancel" },
      // { text: t("yes"), onPress: () => signOut() },
    ]);
    return true;
  };

  const onEditProfile = () => {
    //navigation.navigate("EditProfile", { user: user });
  };

  return (
    <View style={styles.mainContainer}>
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1508042296193-afeb781b9667?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        }}
        style={styles.coverImage}
      />
      <View style={styles.flex1}>
        <View style={styles.detailsContainer}>
          <Image
            source={{ uri: user?.profileImage }}
            style={styles.profileImage}
          />
          <Text style={styles.headingText}>
            {user?.firstName} {user?.lastName}
          </Text>
          <Text style={styles.text}>{user?.email}</Text>
          <Text style={styles.text}>{user?.mobileNo}</Text>
          <Text style={styles.text}>{user?.city}</Text>
          <Button
            title={t("edit-profile")}
            onPress={onEditProfile}
            outline
            style={styles.editButton}
          />
        </View>
      </View>
      <Button
        title={t("logout")}
        onPress={logOut}
        style={styles.logoutButton}
      />
    </View>
  );
};

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.Black,
  },
  coverImage: {
    width: "100%",
    height: 200,
  },
  flex1: {
    flex: 1,
  },
  detailsContainer: {
    width: "75%",
    borderWidth: 1,
    borderColor: Colors.Grey,
    alignSelf: "center",
    borderRadius: Metrics.radius.medium,
    marginTop: -Metrics.margin.large,
    backgroundColor: Colors.Black,
    alignItems: "center",
    elevation: 5,
  },
  profileImage: {
    height: 120,
    width: 120,
    borderRadius: 60,
    marginTop: -60,
  },
  headingText: {
    color: Colors.White,
    fontWeight: "700",
    fontSize: Metrics.small,
    marginTop: Metrics.xSmall,
  },
  text: {
    color: Colors.Grey,
    fontSize: Metrics.xSmall,
    fontWeight: "500",
    marginVertical: Metrics.margin.xTiny,
  },
  editButton: {
    width: "70%",
    marginBottom: Metrics.margin.base,
  },
  logoutButton: {
    marginHorizontal: Metrics.padding.medium,
    marginBottom: 20,
  },
});

export default ProfileScreen;
