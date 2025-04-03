import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import RazorpayCheckout, { CheckoutOptions } from "react-native-razorpay";
import { useBookings } from "hooks/useBookings";
import {
  AppNavigationProp,
  AppStackParamList,
} from "navigation/AppNavigator/types";
import { useCheckAuth } from "hooks/useCheckAuth";
import { Colors } from "styles/colors";
import { Metrics } from "styles/metrics";
import Button from "components/common/Button";
import PriceSvg from "assets/images/icons/price.svg";
import TicketSvg from "assets/images/icons/ticket.svg";
import Loader from "components/common/Loader";
import { useTranslation } from "react-i18next";
import Config from "react-native-config";

const BookTicket: React.FC = () => {
  const navigation = useNavigation<AppNavigationProp>();
  const route = useRoute<RouteProp<AppStackParamList, "BookTicket">>();
  const { event } = route.params;
  const [noOfTickets, setNoOfTickets] = useState<number>(1);
  const { checkAuth } = useCheckAuth();
  const { bookTicketMutation, verifyTicketPaymentMutation } = useBookings();
  const { t } = useTranslation();

  const { mutate: bookTicket, isPending } = bookTicketMutation;

  const bookTickets = async () => {
    const data = {
      eventId: event.id,
      noOfTickets: noOfTickets,
    };
    checkAuth(() =>
      bookTicket(data, {
        onSuccess: (res) => {
          var options: CheckoutOptions = {
            name: event.restaurantName,
            image: event.image,
            description: `Payment for ${event.name}`,
            order_id: res?.data?.order.id,
            key: Config.RAZORPAY_KEY as string,
            amount: res.data.order.amount,
            currency: res.data.order.currency,
            prefill: {
              email: res.data.user.email,
              contact: res.data.user.mobileNo,
              name: res.data.user.name,
            },
            theme: { color: Colors.Primary },
          };
          RazorpayCheckout.open(options)
            .then(async (transaction) => {
              const transactionBody = {
                eventId: event.id,
                noOfTickets: noOfTickets,
                orderId: res?.data?.order?.id,
                totalAmount: res?.data.order?.amount,
                transaction,
              };
              verifyTicketPaymentMutation.mutate(transactionBody, {
                onSuccess: async (resp) => {
                  Alert.alert(
                    "Information",
                    "Your Ticket Booking is Successful",
                    [
                      {
                        text: "OK",
                        onPress: () =>
                          navigation.navigate("MyBookings", {
                            selectedType: "TICKET",
                          }),
                      },
                    ]
                  );
                },
                onError: (error) => {
                  console.log("Request failed:", error);
                },
              });
            })
            .catch(async (error) => {
              console.log({ error });
            });
        },
        onError: (err) => {
          console.log("Request Failed:", err);
        },
      })
    );
  };

  const onCancel = () => {
    navigation.goBack();
  };

  const onChangeNoOfTickets = (text: string) => {
    setNoOfTickets(Number(text));
  };

  return (
    <>
      {isPending ? (
        <Loader />
      ) : (
        <View style={styles.mainContainer}>
          <View style={styles.detailsMainContainer}>
            <View style={styles.detailsSubContainer}>
              <Text style={styles.headingText}>{event.name}</Text>
              <View style={styles.detailsContainer}>
                <View style={styles.row}>
                  <PriceSvg
                    fill={Colors.White}
                    height={20}
                    width={20}
                    style={styles.icon}
                  />
                  <Text style={styles.text}>&#8377; {event.ticketPrice}</Text>
                </View>
                <View style={styles.row}>
                  <TicketSvg
                    fill={Colors.White}
                    height={24}
                    width={20}
                    style={styles.icon}
                  />
                  <Text style={styles.text}>
                    {noOfTickets} {t("tickets")}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.priceDetailContainer}>
              <View style={styles.priceDetail}>
                <Text style={styles.headingText}>{t("total-price")}</Text>
                <Text style={styles.headingText}>
                  &#8377; {noOfTickets * event.ticketPrice}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.text}>{t("enter-no-of-tickets")}</Text>
            <View style={styles.row}>
              <TextInput
                style={styles.input}
                placeholder={t("no-of-tickets")}
                placeholderTextColor={Colors.Grey}
                value={noOfTickets.toString()}
                onChangeText={onChangeNoOfTickets}
                keyboardType="numeric"
              />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title={t("cancel")}
              onPress={onCancel}
              style={styles.leftButton}
              outline
            />
            <Button
              title={t("place-booking")}
              onPress={bookTickets}
              style={styles.rightButton}
            />
          </View>
        </View>
      )}
    </>
  );
};

export const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.Black,
    flex: 1,
  },
  detailsMainContainer: {
    backgroundColor: Colors.Primary,
    paddingHorizontal: Metrics.padding.base,
    paddingVertical: Metrics.padding.large,
  },
  detailsSubContainer: {
    backgroundColor: Colors.Black,
    borderTopLeftRadius: Metrics.radius.small,
    borderTopRightRadius: Metrics.radius.small,
    paddingHorizontal: Metrics.padding.medium,
    paddingVertical: Metrics.padding.small,
  },
  headingText: {
    fontSize: Metrics.medium,
    color: Colors.White,
    fontWeight: "700",
  },
  detailsContainer: {
    paddingTop: Metrics.padding.xSmall,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Metrics.margin.tiny,
  },
  text: {
    color: Colors.White,
  },
  subText: {
    color: Colors.Grey,
  },
  icon: {
    marginRight: Metrics.margin.tiny,
  },
  priceDetailContainer: {
    backgroundColor: Colors.Black,
    borderTopWidth: 1,
    borderColor: Colors.White,
    padding: Metrics.padding.medium,
  },
  priceDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputContainer: {
    padding: Metrics.padding.base,
    flex: 1,
  },
  input: {
    height: Metrics.xLarge,
    paddingVertical: 0,
    flex: 1,
    alignItems: "center",
    borderColor: Colors.White,
    borderWidth: 1,
    borderRadius: Metrics.radius.tiny,
    paddingHorizontal: Metrics.padding.small,
    color: Colors.White,
    marginVertical: Metrics.margin.xSmall,
  },
  mrTiny: {
    marginHorizontal: Metrics.margin.tiny,
  },
  buttonContainer: {
    flexDirection: "row",
    padding: Metrics.padding.medium,
    alignSelf: "flex-end",
  },
  leftButton: {
    marginRight: Metrics.margin.xTiny,
    flex: 1,
  },
  rightButton: {
    marginLeft: Metrics.margin.xTiny,
    flex: 1,
  },
});

export default BookTicket;
