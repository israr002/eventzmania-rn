import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import Button from "components/common/Button";
import DateTimePicker from "components/common/DateTimePicker";
import Dropdown from "components/common/Dropdown";
import Loader from "components/common/Loader";
import { useBookings } from "hooks/useBookings";
import { useCheckAuth } from "hooks/useCheckAuth";
import { useDropdown } from "hooks/useDropdown";
import { useRestaurants } from "hooks/useRestaurants";
import {
  AppNavigationProp,
  AppStackParamList
} from "navigation/AppNavigator/types";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import ReactNativeCalendarStrip from "react-native-calendar-strip";
import Config from "react-native-config";
import RazorpayCheckout, { CheckoutOptions } from "react-native-razorpay";
import { Colors } from "styles/colors";
import { Metrics } from "styles/metrics";
import { dropdownItem } from "types";

const BookRestaurantBanquet: React.FC = () => {
  const [existingBookings, setExistingBookings] = useState([]);
  const [packages, setPackages] = useState([]);
  const [occasions, setOccasions] = useState<dropdownItem[]>([]);
  const [date, setDate] = useState();
  const [noOfPeople, setNoOfPeople] = useState();
  const [selectedPackage, setSelectedPackage] = useState();
  const [couponCode, setCouponCode] = useState<string>("");
  const [coupon, setCoupon] = useState({});

  const navigation = useNavigation<AppNavigationProp>();
  const route =
    useRoute<RouteProp<AppStackParamList, "BookRestaurantBanquet">>();
  const { restaurant } = route.params;
  const { getRestaurantPackagesMutation, getRestaurantCalendarMutation } =
    useRestaurants();
  const { getOccasionsMutation } = useDropdown();
  const {
    applyCodeMutation,
    bookRestaurantBanquetMutation,
    verifyBanquetPaymentMutation
  } = useBookings();
  const { checkAuth } = useCheckAuth();
  const { t } = useTranslation();

  const { mutate: fetchCalendar, isPending: calendarPending } =
    getRestaurantCalendarMutation;
  const { mutate: fetchPackage, isPending: packagePending } =
    getRestaurantPackagesMutation;
  const { mutate: fetchOccasions, isPending: occasionPending } =
    getOccasionsMutation;
  const { mutate: applyCoupon, isPending: applyCouponPending } =
    applyCodeMutation;
  const { mutate: bookBanquet, isPending: bookBanquetPending } =
    bookRestaurantBanquetMutation;

  const methods = useForm();
  const { handleSubmit } = methods;

  useEffect(() => {
    getRequiredData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getRequiredData = async () => {
    fetchPackage(restaurant.id, {
      onSuccess: res => {
        setPackages(res.data);
      },
      onError: err => {
        console.log("request failed:", err);
      }
    });
    fetchCalendar(restaurant.id, {
      onSuccess: res => {
        const calenderData = res.data.map((i: any) => ({
          ...i,
          dots: [{ color: Colors.Primary }]
        }));
        setExistingBookings(calenderData);
      },
      onError: err => {
        console.log("request failed:", err);
      }
    });
    fetchOccasions(undefined, {
      onSuccess: res => {
        const occasionData = res.data.map((i: any) => ({
          label: i.name,
          value: i.id
        }));
        setOccasions(occasionData);
      },
      onError: err => {
        console.log("request failed:", err);
      }
    });
  };

  const applyCouponCode = async () => {
    const data = {
      restaurantId: restaurant.id,
      couponCode: couponCode,
      amount: (noOfPeople ?? 0) * (selectedPackage?.pricePerPlate ?? 0)
    };
    checkAuth(() =>
      applyCoupon(data, {
        onSuccess: res => {
          if (res && Object.keys(res.data.data).length > 0) {
            setCoupon(res.data);
          }
        },
        onError: err => {
          console.log("Request Failed:", err);
        }
      })
    );
  };

  const onSubmit = async data => {
    const amountData = {
      finalAmount:
        restaurant?.basePrice +
        (selectedPackage?.pricePerPlate ?? 0) * (noOfPeople ?? 0) -
        restaurant?.basePrice * (restaurant.discountPercent / 100) -
        (coupon.discount ?? 0)
    };
    checkAuth(() =>
      bookBanquet(amountData, {
        onSuccess: res => {
          const options: CheckoutOptions = {
            name: restaurant.name,
            image: restaurant.profileImage,
            description: `Payment for ${restaurant.name}`,
            order_id: res?.data?.order.id,
            key: Config.RAZORPAY_KEY as string,
            amount: res.data.order.amount,
            currency: res.data.order.currency,
            prefill: {
              email: res.data.user.email,
              contact: res.data.user.mobileNo,
              name: res.data.user.name
            },
            theme: { color: Colors.Primary }
          };

          RazorpayCheckout.open(options)
            .then(async transaction => {
              const transactionBody = {
                restaurantId: restaurant.id,
                date: new Date(date),
                fromTime: new Date(data.fromTime).toTimeString(),
                toTime: new Date(data.toTime).toTimeString(),
                occasionId: data.occasion?.value as number,
                packageId: selectedPackage?.packageId as number,
                noOfPeople: noOfPeople as unknown as number,
                totalAmount:
                  restaurant?.basePrice +
                  selectedPackage?.pricePerPlate * noOfPeople,
                couponId: coupon.couponId,
                couponDiscount: coupon.discount,
                restaurantDiscount:
                  restaurant?.basePrice * (restaurant.discountPercent / 100),
                finalAmount:
                  restaurant?.basePrice +
                  (selectedPackage?.pricePerPlate ?? 0) * (noOfPeople ?? 0) -
                  restaurant?.basePrice * (restaurant.discountPercent / 100) -
                  (coupon.discount ?? 0),
                orderId: res?.data?.order?.id,
                transaction
              };
              verifyBanquetPaymentMutation.mutate(transactionBody, {
                onSuccess: async resp => {
                  Alert.alert("Information", "Your Booking is Successful", [
                    {
                      text: "OK",
                      onPress: () => navigation.navigate("MyBookings")
                    }
                  ]);
                },
                onError: error => {
                  console.log("Request failed:", error);
                }
              });
            })
            .catch(async error => {
              console.log({ error });
            });
        },
        onError: err => {
          console.log("Request Failed:", err);
        }
      })
    );
  };

  const onCancel = () => {
    navigation.goBack();
  };

  const onSelectDate = date => {
    setDate(date);
  };

  const onChangeNoOfPeople = (text: string) => {
    if (Number(text) <= restaurant.banquetCapacity) {
      setNoOfPeople(text);
    } else {
      Alert.alert(
        "Information",
        `Banquet Capacity is ${restaurant.banquetCapacity}`
      );
    }
  };

  const selectPackage = item => {
    if (selectedPackage && selectedPackage?.packageId === item.packageId) {
      setSelectedPackage();
    } else {
      setSelectedPackage(item);
    }
  };

  const onChangeCouponCode = (text: string) => {
    setCouponCode(text);
  };

  const disabledDates = existingBookings?.map(i => i.date);

  return (
    <>
      {packagePending ||
      calendarPending ||
      occasionPending ||
      applyCouponPending ||
      bookBanquetPending ? (
        <Loader />
      ) : (
        <ScrollView style={styles.inputContainer}>
          <Text style={styles.label}>{t("select-date")}</Text>
          <ReactNativeCalendarStrip
            minDate={new Date()}
            style={{ height: 100, width: "100%" }}
            selectedDate={date}
            iconLeft={false}
            iconRight={false}
            datesBlacklist={disabledDates}
            //datesWhitelist={datesWhitelist}
            onDateSelected={onSelectDate}
            dateNameStyle={{ color: Colors.White }}
            highlightDateNameStyle={{ color: Colors.White }}
            disabledDateNameStyle={{ color: Colors.Grey }}
            dateNumberStyle={{ color: Colors.White }}
            highlightDateNumberStyle={{ color: Colors.White }}
            disabledDateNumberStyle={{ color: Colors.Grey }}
            calendarHeaderStyle={{ fontSize: 18, color: Colors.Primary }}
            highlightDateContainerStyle={{ backgroundColor: Colors.Primary }}
            scrollerPaging={true}
            scrollable={true}
            markedDates={existingBookings}
            dayContainerStyle={{
              borderRadius: 10,
              backgroundColor: Colors.Black,
              marginBottom: 10,
              borderWidth: 1,
              borderColor: Colors.Grey
            }}
          />
          <FormProvider {...methods}>
            <Dropdown
              name="occasion"
              placeholder={t("select-occasion")}
              items={occasions}
            />
            <DateTimePicker
              name="fromTime"
              mode="time"
              placeholder={t("select-from-time")}
              // date={fromTime}
              // setDate={(date: Date | undefined) => setFromTime(date)}
            />
            <DateTimePicker
              name="toTime"
              mode="time"
              placeholder={t("select-to-time")}
              // date={toTime}
              // setDate={(date: Date | undefined) => setToTime(date)}
            />
          </FormProvider>

          <TextInput
            placeholder={t("no-of-people")}
            placeholderTextColor={Colors.Grey}
            keyboardType="numeric"
            value={noOfPeople}
            onChangeText={onChangeNoOfPeople}
            style={styles.input}
          />

          <Text style={styles.label}>{t("select-package")}</Text>
          {packages?.map(i => {
            return (
              <View style={styles.radioContainer}>
                <TouchableOpacity
                  style={styles.outerCircle}
                  onPress={() => selectPackage(i)}
                >
                  {selectedPackage &&
                    selectedPackage?.packageId === i.packageId && (
                      <View style={styles.innerCircle} />
                    )}
                </TouchableOpacity>
                <Text style={styles.radioText}>
                  {i.packageName} - &#8377;{i.pricePerPlate} {t("per-plate")}
                </Text>
              </View>
            );
          })}

          <Text style={styles.label}>{t("coupon-code")}</Text>
          <View style={styles.couponTextInputContainer}>
            <TextInput
              style={styles.input}
              placeholder={t("coupon-code")}
              placeholderTextColor={Colors.Grey}
              value={couponCode}
              onChangeText={onChangeCouponCode}
            />
            <TouchableOpacity
              style={styles.applyButton}
              onPress={applyCouponCode}
              disabled={couponCode.length <= 0}
            >
              <Text style={styles.applyButtonText}>{t("apply")}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.priceContainer}>
            {restaurant.basePrice > 0 && (
              <View style={styles.priceDetailsRow}>
                <Text style={styles.text}>{t("base-price")}</Text>
                <Text style={styles.text}>&#8377;{restaurant?.basePrice}</Text>
              </View>
            )}
            {selectedPackage && noOfPeople && (
              <View style={styles.priceDetailsRow}>
                <Text style={styles.text}>{t("package-amount")}</Text>
                <Text style={styles.text}>
                  &#8377;{selectedPackage?.pricePerPlate * noOfPeople}
                </Text>
              </View>
            )}
            <View style={styles.priceDetailsRow}>
              <Text style={styles.text}>{t("total")}</Text>
              <Text style={styles.text}>
                &#8377;
                {restaurant?.basePrice +
                  (selectedPackage?.pricePerPlate ?? 0) * (noOfPeople ?? 0)}
              </Text>
            </View>
            <View style={styles.horizontalLine} />
            {restaurant.discountPercent > 0 && restaurant.basePrice > 0 && (
              <View style={styles.priceDetailsRow}>
                <Text style={styles.text}>
                  {t("restaurant-discount")} ({restaurant.discountPercent}%)
                </Text>
                <Text style={styles.text}>
                  - &#8377;
                  {restaurant?.basePrice * (restaurant.discountPercent / 100)}
                </Text>
              </View>
            )}
            {Object.keys(coupon).length > 0 && (
              <View style={styles.priceDetailsRow}>
                <Text style={styles.text}>{t("coupon-discount")}</Text>
                <Text style={styles.text}>- &#8377;{coupon.discount}</Text>
              </View>
            )}

            <View style={styles.priceDetailsRow}>
              <Text style={styles.priceText}>{t("final-price")}</Text>
              <Text style={styles.priceText}>
                &#8377;
                {restaurant?.basePrice +
                  (selectedPackage?.pricePerPlate ?? 0) * (noOfPeople ?? 0) -
                  restaurant?.basePrice * (restaurant.discountPercent / 100) -
                  (coupon.discount ?? 0)}
              </Text>
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
              //onPress={bookRestaurantBanquet}
              onPress={handleSubmit(onSubmit)}
              style={styles.rightButton}
              disabled={!date || !selectedPackage}
            />
          </View>
        </ScrollView>
      )}
    </>
  );
};

export const styles = StyleSheet.create({
  applyButton: {
    borderColor: Colors.Primary,
    borderRadius: Metrics.radius.small,
    borderWidth: 1,
    height: Metrics.xLarge,
    justifyContent: "center",
    marginLeft: Metrics.margin.small,
    marginTop: Metrics.margin.tiny,
    paddingHorizontal: Metrics.padding.xxSmall
  },
  applyButtonText: {
    color: Colors.Primary
  },
  buttonContainer: {
    flexDirection: "row",
    marginBottom: Metrics.margin.large
  },
  couponTextInputContainer: {
    flexDirection: "row"
  },
  detailsMainContainer: {
    backgroundColor: Colors.Primary,
    paddingHorizontal: Metrics.padding.base,
    paddingVertical: Metrics.padding.large
  },
  horizontalLine: {
    backgroundColor: Colors.White,
    height: 1,
    marginVertical: Metrics.margin.tiny
  },
  innerCircle: {
    backgroundColor: Colors.Primary,
    borderRadius: Metrics.radius.base,
    height: Metrics.xxSmall,
    width: Metrics.xxSmall
  },
  input: {
    alignItems: "center",
    borderColor: Colors.White,
    borderRadius: Metrics.radius.tiny,
    borderWidth: 1,
    color: Colors.White,
    flex: 1,
    height: Metrics.xLarge,
    marginTop: Metrics.margin.tiny,
    paddingHorizontal: Metrics.padding.small,
    paddingLeft: Metrics.padding.large,
    paddingVertical: 0
  },
  inputContainer: {
    backgroundColor: Colors.Black,
    padding: Metrics.padding.base
  },
  label: {
    color: Colors.White,
    marginTop: Metrics.margin.small
  },
  leftButton: {
    flex: 1,
    marginRight: Metrics.margin.xTiny
  },
  outerCircle: {
    alignItems: "center",
    borderColor: Colors.White,
    borderRadius: Metrics.radius.base,
    borderWidth: 1,
    height: Metrics.base,
    justifyContent: "center",
    marginRight: Metrics.margin.xxSmall,
    width: Metrics.base
  },
  priceContainer: {
    borderColor: Colors.Grey,
    borderWidth: 1,
    marginBottom: Metrics.margin.tiny,
    marginTop: Metrics.margin.base,
    padding: Metrics.padding.xxSmall
  },
  priceDetailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: Metrics.margin.xTiny
  },
  priceText: {
    color: Colors.White,
    fontSize: 16,
    fontWeight: "bold"
  },
  radioContainer: {
    alignItems: "center",
    flexDirection: "row",
    margin: Metrics.margin.xxSmall
  },
  radioText: {
    color: Colors.White
  },
  rightButton: {
    flex: 1,
    marginLeft: Metrics.margin.xTiny
  },
  text: {
    color: Colors.White
  }
});

export default BookRestaurantBanquet;
