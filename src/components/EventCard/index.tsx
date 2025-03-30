import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import ClockSvg from "assets/images/icons/clock.svg";
import AddressSvg from "assets/images/icons/address.svg";
import { Colors } from "styles/colors";
import { EventCardProps } from "./types";
import moment from "moment";
import { formatTime } from "utils/commonUtils";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationProp } from "navigation/AppNavigator/types";

const EventCard: React.FC<EventCardProps> = ({ event, onPress }) => {
  const { t } = useTranslation();
  const navigation = useNavigation<AppNavigationProp>();

  const bookTicket = () => {
    navigation.navigate("BookTicket", { event });
  };

  return (
    <TouchableOpacity onPress={() => onPress(event)} style={styles.container}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{moment(event.date).format("DD")}</Text>
        <Text style={styles.monthAndYearText}>
          {moment(event.date).format("MMMM")}
        </Text>
        <Text style={styles.monthAndYearText}>
          {moment(event.date).format("YYYY")}
        </Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.headingText}>{event.name}</Text>
        <View style={styles.detailsSection}>
          <Text style={styles.text}>
            <ClockSvg fill={Colors.Grey} height={12} width={12} />
            &nbsp;&nbsp;{formatTime(event.startTime)} -{" "}
            {formatTime(event.endTime)}
          </Text>
        </View>
        <Text style={styles.text} numberOfLines={1}>
          <AddressSvg fill={Colors.Grey} height={12} width={12} />
          &nbsp;&nbsp;{event.restaurantName}
        </Text>
        <Text style={styles.text} numberOfLines={2}>
          {event.description}
        </Text>
        <TouchableOpacity onPress={bookTicket}>
          <Text style={styles.linkText}>{t("buy-tickets")}</Text>
        </TouchableOpacity>
      </View>
      <Image source={{ uri: event.image }} style={styles.image} />
    </TouchableOpacity>
  );
};

export default EventCard;
