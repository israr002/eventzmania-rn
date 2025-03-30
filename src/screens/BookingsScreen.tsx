import Loader from "components/common/Loader";
import RatingModal from "components/RatingModal";
import RestaurantBookingCard from "components/RestaurantBookingCard";
import TicketBookingCard from "components/TicketBookingCard";
import { useBookings } from "hooks/useBookings";
import { useCheckAuth } from "hooks/useCheckAuth";
import { useRestaurants } from "hooks/useRestaurants";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "styles/colors";
import { Metrics } from "styles/metrics";

const BookingsScreen: React.FC = () => {
  const [restaurantBookings, setRestaurantBookings] = useState([]);
  const [ticketBookings, setTicketBookings] = useState([]);
  const [selectedTab, setSelectedTab] = useState<number>(1);
  const [selectedBooking, setSelectedBooking] = useState<VenueBooking>();
  const [showRatingModal, setShowRatingModal] = useState<boolean>(false);

  const { getRestaurantBookingsMutation, getTicketBookingsMutation } =
    useBookings();
  const { rateRestaurantMutation } = useRestaurants();

  const { mutate: fetchTicketBookings, isPending: ticketBookingsPending } =
    getTicketBookingsMutation;
  const {
    mutate: fetchRestaurantBookings,
    isPending: restaurantBookingsPending,
  } = getRestaurantBookingsMutation;
  const { mutate: rateRestaurant, isPending: ratePending } =
    rateRestaurantMutation;

  const { checkAuth } = useCheckAuth();
  const { t } = useTranslation();

  useEffect(() => {
    if (selectedTab === 1) {
      getTicketBookings();
    } else {
      getRestaurantBookings();
    }
  }, [selectedTab]);

  const getTicketBookings = async () => {
    checkAuth(() =>
      fetchTicketBookings(undefined, {
        onSuccess: (res) => {
          console.log(res);
          setTicketBookings(res.data);
        },
        onError: (err) => {
          console.log("request failed:", err);
        },
      })
    );
  };

  const getRestaurantBookings = async () => {
    if (restaurantBookings.length === 0) {
      checkAuth(() =>
        fetchRestaurantBookings(undefined, {
          onSuccess: (res) => {
            console.log(res);
            setRestaurantBookings(res.data);
          },
          onError: (err) => {
            console.log("request failed:", err);
          },
        })
      );
    }
  };

  const renderItem = ({ item }) => {
    return (
      <>
        {selectedTab === 1 ? (
          <TicketBookingCard booking={item} />
        ) : (
          <RestaurantBookingCard booking={item} onRate={openRatingsModal} />
        )}
      </>
    );
  };

  const openRatingsModal = (booking) => {
    setSelectedBooking(booking);
    setShowRatingModal(true);
  };

  const closeModal = () => {
    setShowRatingModal(false);
  };

  const onConfirmModal = async (rating: number) => {
    const data = {
      restaurantId: selectedBooking?.id,
      rating: rating,
    };
    checkAuth(() =>
      rateRestaurant(data, {
        onSuccess: (res) => {
          Alert.alert("Information", "Thank you for rating us", [
            {
              text: "OK",
              onPress: () => {
                setShowRatingModal(false);
                getRestaurantBookings();
              },
            },
          ]);
        },
        onError: (err) => {
          console.log("Request Failed:", err);
        },
      })
    );
  };

  return (
    <>
      <RatingModal
        visible={showRatingModal}
        onClose={closeModal}
        onConfirm={onConfirmModal}
      />
      {ticketBookingsPending || restaurantBookingsPending || ratePending ? (
        <Loader />
      ) : (
        <View style={styles.mainContainer}>
          <View style={styles.tabBarContainer}>
            <TouchableOpacity
              style={[
                styles.tab,
                {
                  borderColor: selectedTab === 1 ? Colors.Primary : Colors.Grey,
                },
              ]}
              onPress={() => setSelectedTab(1)}
            >
              <Text
                style={[
                  styles.tabText,
                  { color: selectedTab === 1 ? Colors.Primary : Colors.Grey },
                ]}
              >
                {t("tickets")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                {
                  borderColor: selectedTab === 2 ? Colors.Primary : Colors.Grey,
                },
              ]}
              onPress={() => setSelectedTab(2)}
            >
              <Text
                style={[
                  styles.tabText,
                  { color: selectedTab === 2 ? Colors.Primary : Colors.Grey },
                ]}
              >
                {t("restaurants")}
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={selectedTab === 1 ? ticketBookings : restaurantBookings}
            renderItem={renderItem}
            keyExtractor={(item) => `${item.id}`}
            // ListEmptyComponent={<NoData message="No bookings available." />}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.Black,
    flex: 1,
  },
  tabBarContainer: {
    flexDirection: "row",
    marginBottom: Metrics.margin.xSmall,
  },
  tab: {
    flex: 1,
    paddingVertical: Metrics.padding.xxSmall,
    borderBottomWidth: 1,
  },
  tabText: {
    textAlign: "center",
    fontSize: Metrics.xSmall,
    fontWeight: "500",
  },
});

export default BookingsScreen;
