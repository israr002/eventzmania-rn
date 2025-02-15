import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { RestaurantCardProps } from "./types";
import AddressSvg from "assets/images/icons/address.svg";
import DiningSvg from "assets/images/icons/dining.svg";
import BanquetSvg from "assets/images/icons/banquet.svg";
import AmenitiesSvg from "assets/images/icons/amenities.svg";
import EventSvg from "assets/images/icons/event.svg";
import { Colors } from "styles/colors";
import { useTranslation } from "react-i18next";

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  onPress,
}) => {
  const { t } = useTranslation();

  return (
    <TouchableOpacity onPress={() => onPress(restaurant)}>
      <Image source={{ uri: restaurant.profileImage }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.headingText}>{restaurant.name}</Text>
          <Text style={styles.text}>{restaurant.distance} KM</Text>
        </View>
        <View style={styles.detailRow}>
          <AddressSvg
            fill={Colors.Grey}
            height={12}
            width={12}
            style={styles.icon}
          />
          <Text style={styles.text}>{restaurant.address}</Text>
        </View>
        <View style={styles.detailRow}>
          <DiningSvg
            fill={Colors.Grey}
            height={12}
            width={12}
            style={styles.icon}
          />
          <Text style={styles.text}>
            {t("dining-capacity")} - {restaurant.diningCapacity}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <BanquetSvg
            fill={Colors.Grey}
            height={12}
            width={12}
            style={styles.icon}
          />
          <Text style={styles.text}>
            {t("banquet-capacity")} - {restaurant.banquetCapacity}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <AmenitiesSvg
            fill={Colors.Grey}
            height={12}
            width={12}
            style={styles.icon}
          />
          <Text style={styles.text} numberOfLines={2}>
            {restaurant?.amenities?.map((i) => i.name).join(", ")}
          </Text>
        </View>
        {restaurant.event !== null && (
          <View style={styles.detailSection}>
            <EventSvg
              fill={Colors.Grey}
              height={12}
              width={12}
              style={styles.icon}
            />
            <Text style={styles.eventText}>
              {t("todays-Event")} - {restaurant.event}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
