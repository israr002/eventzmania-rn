import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute
} from "@react-navigation/native";
import Loader from "components/common/Loader";
import NoData from "components/common/NoData";
import EventCard from "components/EventCard";
import { useRestaurants } from "hooks/useRestaurants";
import { AppNavigationProp } from "navigation/AppNavigator/types";
import {
  TabBarNavigationProp,
  TabBarParamList
} from "navigation/TabNavigator/types";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, StyleSheet, View } from "react-native";
import { Colors } from "styles/colors";
import { EventDetails } from "types";

const EventsScreen: React.FC = () => {
  const [events, setEvents] = useState<EventDetails[]>([]);
  const { getUpcomingEventsMutation } = useRestaurants();
  const { mutate: fetchEvents, isPending } = getUpcomingEventsMutation;
  const { t } = useTranslation();
  const navigation = useNavigation<AppNavigationProp>();
  const route = useRoute<RouteProp<TabBarParamList, "Events">>();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getUpcomingEvents();
    }
  }, [isFocused]);

  const getUpcomingEvents = async () => {
    fetchEvents(
      route.params?.restaurantId ? route.params.restaurantId : undefined,
      {
        onSuccess: res => {
          console.log(res);
          setEvents(res.data);
        },
        onError: err => {
          console.log("request failed:", err);
        }
      }
    );
  };

  const navigateToDetails = (item: EventDetails) => {
    navigation.navigate("RestaurantDetails", { restaurantId: item.id });
  };

  return (
    <>
      {isPending ? (
        <Loader />
      ) : (
        <View style={styles.mainContainer}>
          <FlatList
            data={events}
            renderItem={({ item }) => (
              <EventCard event={item} onPress={navigateToDetails} />
            )}
            keyExtractor={item => `${item.id}`}
            ListEmptyComponent={<NoData message={t("no-events-available")} />}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.Black,
    flex: 1
  }
});

export default EventsScreen;
