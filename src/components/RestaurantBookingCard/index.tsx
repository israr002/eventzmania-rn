import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import moment from "moment";
import { BookingCardProps } from "./types";
import { useTranslation } from "react-i18next";

const RestaurantBookingCard: React.FC<BookingCardProps> = ({
  booking,
  onRate,
}) => {
  const { t } = useTranslation();

  const rateVenue = () => {
    onRate(booking);
  };

  return (
    <View style={styles.detailsContainer}>
      <Text style={styles.headingText}>{booking.venueName}</Text>
      <Text style={styles.text}>
        {t("occasion")}: {booking.occasionName}
      </Text>
      <Text style={styles.text}>
        {t("date")}: {moment(booking.date).format("DD-MM-YYYY")}
      </Text>
      <Text style={styles.text}>
        {t("time")}: {booking.fromTime} - {booking.toTime}
      </Text>
      <Text style={styles.text}>
        {t("no-of-people")}: {booking.noOfPeople}
      </Text>
      <Text style={styles.text}>
        {t("package")}: {booking.packageName}
      </Text>
      <Text style={styles.text}>
        {t("total-amount")}: &#8377;{booking.totalAmount}
      </Text>
      <Text style={styles.text}>
        {t("booked-on")}:{" "}
        {moment(booking.bookedOn).format("DD-MM-YYYY hh:mm A")}
      </Text>
      {!booking.rated && (
        <TouchableOpacity style={styles.link} onPress={rateVenue}>
          <Text style={styles.linkText}>{t("rate")}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default RestaurantBookingCard;
