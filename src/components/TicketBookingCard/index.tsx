import React from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";
import moment from "moment";
import { BookingCardProps } from "./types";
import { useTranslation } from "react-i18next";

const TicketBookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.detailsContainer}>
      <Text style={styles.headingText}>{booking.name}</Text>
      <Text style={styles.text}>
        {t("date")}: {moment(booking.date).format("DD-MM-YYYY hh:mm A")}
      </Text>
      <Text style={styles.text}>
        {t("no-of-tickets")}: {booking.noOfTickets}
      </Text>
      <Text style={styles.text}>
        {t("price")}: &#8377;{booking.ticketPrice} /-
      </Text>
      <Text style={styles.text}>
        {t("total-amount")}: &#8377;{booking.totalAmount}
      </Text>
      <Text style={styles.text}>
        {t("booked-on")}:{" "}
        {moment(booking.bookedOn).format("DD-MM-YYYY hh:mm A")}
      </Text>
    </View>
  );
};

export default TicketBookingCard;
