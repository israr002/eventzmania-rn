import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { EventDetails } from "types";
import { Colors } from "styles/colors";
import { RestaurantsNavigationProp } from "navigation/HomeStack/types";
import { useEvents } from "hooks/useEvents";
import EventCard from "components/EventCard";
import NoData from "components/common/NoData";
import { useTranslation } from "react-i18next";

const EventsScreen: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [events, setEvents] = useState<EventDetails[]>([]);
  const navigation = useNavigation<RestaurantsNavigationProp>();
  const { getUpcomingEventsMutation } = useEvents();
  const { t } = useTranslation();

  useEffect(() => {
    getUpcomingEvents();
  }, []);

  const getUpcomingEvents = async () => {
    getUpcomingEventsMutation.mutate(undefined, {
      onSuccess: (res) => {
        console.log(res);
        setEvents(res.data);
      },
      onError: (err) => {
        console.log("request failed:", err);
      },
    });
  };

  const navigateToDetails = (item: EventDetails) => {
    //navigation.navigate("RestaurantDetails", { venueId: item.id });
  };

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={events}
        renderItem={({ item }) => (
          <EventCard event={item} onPress={navigateToDetails} />
        )}
        keyExtractor={(item) => `${item.id}`}
        ListEmptyComponent={<NoData message={t("no-events-available")} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.Black,
    flex: 1,
  },
});

export default EventsScreen;
