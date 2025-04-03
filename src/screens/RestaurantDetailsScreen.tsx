import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

import moment from "moment";
import MapView, { Marker } from "react-native-maps";
import {
  AppNavigationProp,
  AppStackParamList,
} from "navigation/AppNavigator/types";
import { ImageData, Restaurant } from "types";
import { useRestaurants } from "hooks/useRestaurants";
import ImageSlider from "components/ImageSlider";
import Button from "components/common/Button";
import { Metrics } from "styles/metrics";
import { Colors } from "styles/colors";
import EventCalendarSvg from "assets/images/icons/event-calendar.svg";
import EventSvg from "assets/images/icons/event.svg";
import FoodSvg from "assets/images/icons/food.svg";
import Loader from "components/common/Loader";
import { TabBarNavigationProp } from "navigation/TabNavigator/types";
import { useTranslation } from "react-i18next";

const RestaurantDetailsScreen: React.FC = () => {
  const navigation = useNavigation<AppNavigationProp>();
  const route = useRoute<RouteProp<AppStackParamList, "RestaurantDetails">>();
  const { restaurantId } = route.params;
  const [restaurant, setRestaurant] = useState<Restaurant>();
  const [images, setImages] = useState<ImageData[]>([]);
  const { getRestaurantDetailsMutation, getRestaurantImagesMutation } =
    useRestaurants();
  const { mutate: fetchDetails, isPending: detailsPending } =
    getRestaurantDetailsMutation;
  const { mutate: fetchImages, isPending: imagesPending } =
    getRestaurantImagesMutation;
  const { t } = useTranslation();

  useEffect(() => {
    navigation.setOptions({
      title: restaurant?.name,
    });
  }, [navigation, restaurant]);

  useEffect(() => {
    getRestaurantDetails();
  }, []);

  const getRestaurantDetails = async () => {
    fetchDetails(restaurantId, {
      onSuccess: (res) => {
        console.log(res);
        setRestaurant(res.data);
      },
      onError: (err) => {
        console.log("request failed:", err);
      },
    });
    fetchImages(restaurantId, {
      onSuccess: (res) => {
        console.log(res);
        setImages(res.data);
      },
      onError: (err) => {
        console.log("request failed:", err);
      },
    });
  };

  const goToEvents = () => {
    navigation.navigate("Tabs", {
      screen: "Events",
      params: { restaurantId },
    });
    //tabNavigation.navigate("Events", { restaurantId });
  };

  const goToPackages = () => {
    navigation.navigate("RestaurantPackages", { restaurantId });
  };

  const goToCalendar = () => {
    navigation.navigate("RestaurantCalendar", { restaurantId });
  };

  const goToBookRestaurant = () => {
    navigation.navigate("BookRestaurantBanquet", { restaurant: restaurant });
  };

  return (
    <>
      {detailsPending || imagesPending ? (
        <Loader />
      ) : (
        <ScrollView style={styles.mainContainer}>
          {images.length > 0 ? (
            <ImageSlider images={images.map((i) => i.imgSrc) as string[]} />
          ) : (
            <Image
              source={{ uri: restaurant?.profileImage }}
              style={styles.pubImage}
            />
          )}

          <View style={styles.linkContainer}>
            <View style={styles.flex1}>
              <TouchableOpacity
                onPress={goToEvents}
                disabled={!restaurant?.eventsAvailable}
                style={[
                  styles.link,
                  {
                    backgroundColor: restaurant?.eventsAvailable
                      ? Colors.Primary
                      : Colors.Grey,
                  },
                ]}
              >
                <EventSvg fill={Colors.White} width={25} height={25} />
              </TouchableOpacity>
              <Text style={styles.linkText}>{t("events")}</Text>
            </View>
            <View style={styles.flex1}>
              <TouchableOpacity
                onPress={goToPackages}
                disabled={!restaurant?.packagesAvailable}
                style={[
                  styles.link,
                  {
                    backgroundColor: restaurant?.packagesAvailable
                      ? Colors.Primary
                      : Colors.Grey,
                  },
                ]}
              >
                <FoodSvg fill={Colors.White} width={25} height={25} />
              </TouchableOpacity>
              <Text style={styles.linkText}>{t("packages")}</Text>
            </View>
            <View style={styles.flex1}>
              <TouchableOpacity onPress={goToCalendar} style={styles.link}>
                <EventCalendarSvg fill={Colors.White} width={25} height={25} />
              </TouchableOpacity>
              <Text style={styles.linkText}>{t("calendar")}</Text>
            </View>
          </View>

          <View style={styles.detailsContainer}>
            <Text style={styles.headingText}>{t("about")}</Text>

            <Text style={styles.text}>{restaurant?.description}</Text>

            {restaurant?.amenities?.length && (
              <>
                <Text style={styles.headingText}>{t("amenities")}</Text>
                {restaurant?.amenities?.map((i) => {
                  return (
                    <Text style={styles.text} key={i.name}>
                      {i.name}: {i.value}
                    </Text>
                  );
                })}
              </>
            )}

            {restaurant?.event !== null && (
              <>
                <Text style={styles.headingText}>{t("todays-event")}</Text>
                <Text style={styles.text}>
                  {restaurant?.event} - {restaurant?.eventDescription}
                </Text>
                <Text style={styles.text}>
                  {t("time")} -{" "}
                  {moment(restaurant?.eventStartTime, "HH:mm").format(
                    "hh:mm A"
                  )}{" "}
                  -{" "}
                  {moment(restaurant?.eventEndTime, "HH:mm").format("hh:mm A")}
                </Text>
              </>
            )}

            <Text style={styles.headingText}>{t("location")}</Text>
            <Text style={styles.text}>{restaurant?.address}</Text>
            <View style={styles.mapView}>
              {restaurant && restaurant.latitude && (
                <MapView
                  style={styles.flex1}
                  initialRegion={{
                    latitude: parseFloat(restaurant.latitude),
                    longitude: parseFloat(restaurant.longitude),
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                >
                  <Marker
                    draggable
                    coordinate={{
                      latitude: parseFloat(restaurant.latitude),
                      longitude: parseFloat(restaurant.longitude),
                    }}
                    onDragEnd={(e) => {
                      this.mergePrevScreenParams(
                        "deliverAddress",
                        e.nativeEvent.coordinate
                      );
                    }}
                  />
                </MapView>
              )}
            </View>
            <Button
              title={t("book-this-restaurant")}
              onPress={goToBookRestaurant}
            />
          </View>
        </ScrollView>
      )}
    </>
  );
};

export const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.Black,
  },
  pubImage: {
    width: "100%",
    height: 200,
  },
  linkContainer: {
    marginTop: Metrics.margin.small,
    flexDirection: "row",
  },
  link: {
    borderRadius: Metrics.radius.xLarge,
    height: Metrics.xLarge,
    width: Metrics.xLarge,
    backgroundColor: Colors.Primary,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  linkIcon: {
    width: Metrics.base,
    height: Metrics.base,
    tintColor: Colors.White,
  },
  linkText: {
    color: Colors.White,
    marginTop: Metrics.margin.xTiny,
    textAlign: "center",
  },
  detailsContainer: {
    padding: Metrics.padding.medium,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headingText: {
    color: Colors.White,
    fontSize: Metrics.xSmall,
    textTransform: "uppercase",
    marginTop: Metrics.tiny,
  },
  text: {
    color: Colors.Grey,
    fontSize: Metrics.xxSmall,
    fontWeight: "500",
  },
  mapView: {
    width: "100%",
    height: 200,
    marginVertical: Metrics.margin.tiny,
  },
  flex1: {
    flex: 1,
  },
});

export default RestaurantDetailsScreen;
