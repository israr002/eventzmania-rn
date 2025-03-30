import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Package } from "types";
import { useRestaurants } from "hooks/useRestaurants";
import { Colors } from "styles/colors";
import { Metrics } from "styles/metrics";
import ChevronUpSvg from "assets/images/icons/chevron-up.svg";
import ChevronDownSvg from "assets/images/icons/chevron-down.svg";
import { AppStackParamList } from "navigation/AppNavigator/types";
import Loader from "components/common/Loader";

const RestaurantPackagesScreen: React.FC = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>();
  const { getRestaurantPackagesMutation } = useRestaurants();
  const { mutate: fetchPackages, isPending } = getRestaurantPackagesMutation;
  const route = useRoute<RouteProp<AppStackParamList, "RestaurantPackages">>();
  const restaurantId = route.params.restaurantId;

  useEffect(() => {
    getPackages();
  }, []);

  const getPackages = async () => {
    fetchPackages(restaurantId, {
      onSuccess: (res) => {
        console.log(res);
        setPackages(res.data);
      },
      onError: (err) => {
        console.log("request failed:", err);
      },
    });
  };

  const selectPackageIndex = (index: number) => {
    if (selectedIndex === index) {
      setSelectedIndex(undefined);
    } else {
      setSelectedIndex(index);
    }
  };

  return (
    <>
      {isPending ? (
        <Loader />
      ) : (
        <ScrollView style={styles.mainContainer}>
          {packages?.map((item, index) => {
            return (
              <TouchableOpacity
                style={styles.container}
                onPress={() => selectPackageIndex(index)}
              >
                <View style={styles.detailRowContainer}>
                  <Text style={styles.headingText}>{item.packageName}</Text>
                  <TouchableOpacity onPress={() => selectPackageIndex(index)}>
                    {selectedIndex === index ? (
                      <ChevronUpSvg
                        fill={Colors.White}
                        height={25}
                        width={25}
                      />
                    ) : (
                      <ChevronDownSvg
                        fill={Colors.White}
                        height={25}
                        width={25}
                      />
                    )}
                  </TouchableOpacity>
                </View>
                {selectedIndex === index && (
                  <View>
                    <Text style={styles.text}>{item.description}</Text>
                    <View style={styles.table}>
                      {item.packageItems?.map((i) => {
                        return (
                          <View style={styles.tableRow}>
                            <View style={styles.tableCell}>
                              <Text style={styles.text}>{i.menuType}</Text>
                            </View>
                            <View style={styles.tableCell}>
                              <Text style={styles.text}>
                                {i.menuOptions.map((j) => j.name).join(",")}
                              </Text>
                            </View>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
    </>
  );
};

export const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.Black,
  },
  container: {
    borderWidth: 1,
    borderColor: Colors.Grey,
    borderRadius: Metrics.radius.base,
    marginHorizontal: Metrics.margin.small,
    marginVertical: Metrics.margin.xxSmall,
    paddingVertical: Metrics.padding.small,
    paddingHorizontal: Metrics.padding.base,
  },
  detailRowContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  detailsContainer: {
    flex: 1,
  },
  headingText: {
    color: Colors.White,
    fontSize: Metrics.small,
    fontWeight: "700",
    flex: 1,
    marginBottom: Metrics.margin.xTiny,
  },
  text: {
    color: Colors.Grey,
    fontSize: Metrics.xSmall,
    fontWeight: "500",
  },
  table: {
    marginTop: Metrics.margin.small,
  },
  tableRow: {
    flexDirection: "row",
    marginVertical: Metrics.margin.xTiny,
  },
  tableCell: {
    flex: 1,
  },
});

export default RestaurantPackagesScreen;
