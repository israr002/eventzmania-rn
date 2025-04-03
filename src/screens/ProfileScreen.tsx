import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { User } from "types";
import { useAuth } from "hooks/useAuth";
import { Colors } from "styles/colors";
import { Metrics } from "styles/metrics";
import Button from "components/common/Button";
import { useTranslation } from "react-i18next";
import { AuthContext } from "context/AuthContext";
import { useCheckAuth } from "hooks/useCheckAuth";
import Loader from "components/common/Loader";
import { useAuthStore } from "hooks/useAuthStore";
import EditSvg from "assets/images/icons/edit.svg";
import ListSvg from "assets/images/icons/list.svg";
import LogoutSvg from "assets/images/icons/logout.svg";
import { AppNavigationProp } from "navigation/AppNavigator/types";

const ProfileScreen: React.FC = () => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);
  //const { signOut } = useContext(AuthContext);
  const isFocused = useIsFocused();
  const { getProfileMutation } = useAuth();
  const { mutate: fetchProfile, isPending } = getProfileMutation;
  const logout = useAuthStore((state) => state.logout);
  const navigation = useNavigation<AppNavigationProp>();

  const { t } = useTranslation();
  const { checkAuth } = useCheckAuth();

  useEffect(() => {
    if (isFocused) {
      getUser();
    }
  }, [isFocused]);

  const getUser = async () => {
    checkAuth(() =>
      fetchProfile(undefined, {
        onSuccess: (res) => {
          console.log(res);
          setUser(res.data);
        },
        onError: (err) => {
          console.log("request failed:", err);
        },
      })
    );
  };

  const logOut = () => {
    Alert.alert(t("logout"), t("are-you-sure-you-want-to-logout"), [
      { text: t("no"), style: "cancel" },
      {
        text: t("yes"),
        onPress: () => {
          logout();
          navigation.navigate("Tabs", { screen: "Home" });
        },
      },
    ]);
    return true;
  };

  const onEditProfile = () => {
    navigation.navigate("EditProfile", { user: user });
  };

  const goToMyBookings = () => {
    navigation.navigate("MyBookings", { selectedType: "TICKET" });
  };

  return (
    <>
      {!isPending && user ? (
        <View style={styles.mainContainer}>
          {/* <Image
            source={{
              uri: "https://images.unsplash.com/photo-1508042296193-afeb781b9667?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
            }}
            style={styles.detailsContainer}
          /> */}
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
            {/* <Text style={styles.text}>{user?.city?.name}</Text> */}
            {/* <Button
              title={t("edit-profile")}
              onPress={onEditProfile}
              outline
              style={styles.editButton}
            /> */}
          </View>
          {/* <View style={{}}>
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
          </View> */}
          <View style={styles.flex1}>
            <ScrollView>
              <TouchableOpacity style={styles.menu} onPress={onEditProfile}>
                <EditSvg
                  fill={Colors.Primary}
                  height={25}
                  width={25}
                  style={styles.menuIcon}
                />
                <Text style={styles.menuText}>{t("edit-profile")}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menu} onPress={goToMyBookings}>
                <ListSvg
                  fill={Colors.Primary}
                  height={25}
                  width={25}
                  style={styles.menuIcon}
                />
                <Text style={styles.menuText}>{t("my-bookings")}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menu} onPress={logOut}>
                <LogoutSvg
                  fill={Colors.Primary}
                  height={25}
                  width={25}
                  style={styles.menuIcon}
                />
                <Text style={styles.menuText}>{t("logout")}</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
          {/* <Button
            title={t("logout")}
            onPress={logOut}
            style={styles.logoutButton}
          /> */}
        </View>
      ) : (
        <Loader />
      )}
    </>
  );
};

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.Black,
  },
  detailsContainer: {
    //width: "100%",
    //height: 250,
    backgroundColor: Colors.Primary,
    alignItems: "center",
    paddingVertical: Metrics.padding.medium,
  },
  flex1: {
    flex: 1,
  },
  // detailsContainer: {
  //   width: "75%",
  //   borderWidth: 1,
  //   borderColor: Colors.Grey,
  //   alignSelf: "center",
  //   borderRadius: Metrics.radius.medium,
  //   marginTop: -Metrics.margin.xLarge,
  //   backgroundColor: Colors.Black,
  //   alignItems: "center",
  //   elevation: 5,
  // },
  profileImage: {
    height: 120,
    width: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: Colors.White,
    //marginTop: -60,
  },
  headingText: {
    color: Colors.White,
    fontWeight: "700",
    fontSize: Metrics.medium,
    marginTop: Metrics.xSmall,
    textAlign: "center",
  },
  text: {
    color: Colors.Black,
    fontSize: Metrics.xSmall,
    fontWeight: "500",
    marginVertical: Metrics.margin.xTiny,
    textAlign: "center",
  },
  editButton: {
    width: "70%",
    //marginBottom: Metrics.margin.base,
  },
  logoutButton: {
    marginHorizontal: Metrics.padding.medium,
    marginBottom: 20,
  },
  menu: {
    padding: Metrics.padding.small,
    borderBottomWidth: 1,
    borderColor: Colors.Grey,
    flexDirection: "row",
  },
  menuText: {
    color: Colors.White,
    fontSize: Metrics.xSmall,
    fontWeight: "500",
  },
  menuIcon: {
    marginRight: Metrics.margin.xxSmall,
  },
});

export default ProfileScreen;
