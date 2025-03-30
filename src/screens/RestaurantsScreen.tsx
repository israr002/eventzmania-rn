import React, { useEffect, useState } from "react";
import { Alert, FlatList, Platform, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PERMISSIONS } from "react-native-permissions";
import Geolocation from "@react-native-community/geolocation";
import { Restaurant } from "types";
import { requestPermission } from "utils/permissionUtils";
import { useAuth } from "hooks/useAuth";
import { useRestaurants } from "hooks/useRestaurants";
import { Colors } from "styles/colors";
import RestaurantCard from "components/RestaurantCard";
import NoData from "components/common/NoData";
import SearchBar from "components/common/SearchBar";
import { useTranslation } from "react-i18next";
import { AppNavigationProp } from "navigation/AppNavigator/types";
import Loader from "components/common/Loader";

const RestaurantsScreen: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [searchString, setSearchString] = useState<string>("");
  const [latitude, setLatitude] = useState<number>();
  const [longitude, setLongitude] = useState<number>();
  const navigation = useNavigation<AppNavigationProp>();
  const { updateLocationMutation } = useAuth();
  const { getNearestRestaurantsMutation } = useRestaurants();
  const { t } = useTranslation();

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    //if running on mobile phone, uncomment the following
    // if (latitude && longitude) {
    //   getRestaurants(latitude, longitude);
    // }

    // if running on emulator, uncomment the following
    getRestaurants(19.9975, 73.7898);
  }, [searchString]);

  const getLocation = async () => {
    const isPermitted = await requestPermission(
      Platform.OS === "ios"
        ? PERMISSIONS.IOS.LOCATION_ALWAYS
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    );
    if (isPermitted) {
      Geolocation.getCurrentPosition(
        async (position) => {
          var data = {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
          };
          updateLocationMutation.mutate(data, {
            onSuccess: (res) => {
              setLatitude(position.coords.latitude);
              setLongitude(position.coords.longitude);
              getRestaurants(
                position.coords.latitude,
                position.coords.longitude
              );
            },
            onError: (err) => {
              console.log("request failed:", err);
            },
          });
        },
        (error) => {
          Alert.alert("Error", error.message);
        }
      );
    }
  };

  const getRestaurants = async (lat: number, long: number) => {
    const data = {
      latitude: lat,
      longitude: long,
      searchString: searchString,
    };
    getNearestRestaurantsMutation.mutate(data, {
      onSuccess: (res) => {
        console.log(res);
        setRestaurants(res.data);
      },
      onError: (err) => {
        console.log("request failed:", err);
      },
    });
  };

  const navigateToDetails = (item: Restaurant) => {
    navigation.navigate("RestaurantDetails", { restaurantId: item.id });
  };

  return (
    <View style={styles.mainContainer}>
      <SearchBar value={searchString} onChangeText={setSearchString} />
      {getNearestRestaurantsMutation.isPending ? (
        <Loader />
      ) : (
        <FlatList
          data={restaurants}
          renderItem={({ item }) => (
            <RestaurantCard restaurant={item} onPress={navigateToDetails} />
          )}
          keyExtractor={(item) => `${item.id}`}
          ListEmptyComponent={
            <NoData message={t("no-restaurants-available")} />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.Black,
    flex: 1,
  },
});

export default RestaurantsScreen;
