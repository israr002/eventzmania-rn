import { RouteProp, useRoute } from "@react-navigation/native";
import ForwardSvg from "assets/images/icons/forward.svg";
import Loader from "components/common/Loader";
import { useRestaurants } from "hooks/useRestaurants";
import moment from "moment";
import { AppStackParamList } from "navigation/AppNavigator/types";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Calendar } from "react-native-calendars";
import { Colors } from "styles/colors";
import { Metrics } from "styles/metrics";

const RestaurantCalendarScreen: React.FC = () => {
  const [dates, setDates] = useState([]);
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState();
  const [eventDetails, setEventDetails] = useState([]);
  const { getRestaurantCalendarMutation } = useRestaurants();
  const { mutate: fetchCalendar, isPending } = getRestaurantCalendarMutation;
  const route = useRoute<RouteProp<AppStackParamList, "RestaurantCalendar">>();
  const restaurantId = route.params.restaurantId;
  const { t } = useTranslation();

  useEffect(() => {
    getCalendar();
  }, []);

  const getCalendar = async () => {
    fetchCalendar(restaurantId, {
      onSuccess: res => {
        console.log(res);
        setDates(res.data);
        const result = {};
        res.data.forEach(i => {
          const formattedDate = moment(i.date).format("YYYY-MM-DD");
          result[formattedDate] = {
            marked: true,
            dotColor: Colors.Primary
          };
        });
        setMarkedDates(result);
      },
      onError: err => {
        console.log("request failed:", err);
      }
    });
  };

  const onSelectDate = date => {
    if (selectedDate === date.dateString) {
      setSelectedDate(undefined);
      setEventDetails([]);
    } else {
      setSelectedDate(date.dateString);
      const event =
        dates.find(
          i => moment(i.date).format("YYYY-MM-DD") === date.dateString
        )?.timeSlots || [];
      setEventDetails(event);
    }
  };

  return (
    <>
      {isPending ? (
        <Loader />
      ) : (
        <View style={styles.mainContainer}>
          <Calendar
            onDayPress={onSelectDate}
            selectedDates={[selectedDate]}
            markedDates={{ ...markedDates, [selectedDate]: { selected: true } }}
            theme={{
              calendarBackground: Colors.Black,
              textSectionTitleColor: Colors.Primary,
              selectedDayBackgroundColor: Colors.Primary,
              selectedDayTextColor: Colors.White,
              todayTextColor: Colors.Primary,
              dayTextColor: Colors.White,
              textDisabledColor: Colors.Grey,
              monthTextColor: Colors.White,
              arrowColor: Colors.Primary,
              disabledArrowColor: Colors.Grey
            }}
          />
          {eventDetails.length > 0 ? (
            <ScrollView>
              {eventDetails?.map(i => {
                return (
                  <View style={styles.detailRowContainer}>
                    <View>
                      <Text style={styles.headingText}>{i.occasion}</Text>
                      <Text style={styles.text}>
                        {t("starts-at")}: {i.startTime}
                      </Text>
                      <Text style={styles.text}>
                        {t("ends-at")}: {i.endTime}
                      </Text>
                    </View>
                    <TouchableOpacity style={styles.arrowContainer}>
                      <ForwardSvg fill={Colors.White} width={25} height={25} />
                      {/* <Image
                source={require('../../assets/images/right-arrow.png')}
                style={styles.arrow}
              /> */}
                    </TouchableOpacity>
                  </View>
                );
              })}
            </ScrollView>
          ) : (
            <View style={styles.emptyTextContainer}>
              <Text style={styles.emptyText}>No events Available</Text>
            </View>
          )}
        </View>
      )}
    </>
  );
};

export const styles = StyleSheet.create({
  arrow: {
    height: Metrics.medium,
    tintColor: Colors.White,
    width: Metrics.medium
  },
  arrowContainer: {
    backgroundColor: Colors.Primary,
    borderRadius: Metrics.radius.large,
    padding: Metrics.padding.tiny
  },
  detailRowContainer: {
    alignItems: "center",
    borderColor: Colors.Grey,
    borderRadius: Metrics.radius.small,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: Metrics.margin.small,
    marginVertical: Metrics.margin.xSmall,
    padding: Metrics.padding.xSmall
  },
  emptyText: {
    color: Colors.White,
    fontSize: Metrics.xSmall,
    fontWeight: "500",
    textAlign: "center"
  },
  emptyTextContainer: {
    marginVertical: Metrics.margin.large
  },
  headingText: {
    color: Colors.White,
    fontSize: Metrics.small,
    fontWeight: "500",
    marginBottom: Metrics.margin.xTiny
  },
  mainContainer: {
    backgroundColor: Colors.Black,
    flex: 1
  },
  text: {
    color: Colors.Grey,
    fontSize: Metrics.xxSmall,
    fontWeight: "500"
  }
});

export default RestaurantCalendarScreen;
