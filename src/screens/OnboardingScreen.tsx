import { useNavigation } from "@react-navigation/native";
import RightArrow from "assets/images/icons/arrow-right.svg";
import { OnboardingNavigationProp } from "navigation/AuthStack/types";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Colors } from "styles/colors";
import { Metrics } from "styles/metrics";

const { width } = Dimensions.get("window");

const OnboardingScreen: React.FC = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const { t } = useTranslation();
  const navigation = useNavigation<OnboardingNavigationProp>();

  const slides = [
    {
      title: t("find-the-perfect-venue-for-every-occasion"),
      text: t("discover-beautiful-venues-to-host-your-events"),
      image: require("assets/images/background/1.jpg")
    },
    {
      title: t("experience-live-entertainment"),
      text: t("stay-updated-with-the-latest-shows"),
      image: require("assets/images/background/2.jpg")
    },
    {
      title: t("explore-events-and-updates"),
      text: t("browse-photos-and-videos-of-events-and-shows"),
      image: require("assets//images/background/3.jpg")
    }
  ];

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    setCurrentIndex(index);
  };

  const renderDots = () => {
    return slides.map((_, index) => {
      const isActive = index === currentIndex;
      return (
        <View key={index} style={[styles.dot, isActive && styles.activeDot]} />
      );
    });
  };

  const goToNext = () => {
    const nextIndex = currentIndex + 1;
    scrollViewRef?.current?.scrollTo({ x: nextIndex * width, animated: true });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false, listener: handleScroll }
        )}
        scrollEventThrottle={16}
      >
        {slides.map((slide, index) => {
          const isFirst = index === 0;
          const isLast = index === slides.length - 1;
          return (
            <ImageBackground
              source={slide.image}
              key={index}
              style={styles.slide}
            >
              <View style={styles.headerRow}>
                <Image
                  source={require("assets/images/eventz-mania-logo.png")}
                  style={styles.logo}
                />
                {isFirst && (
                  <TouchableOpacity
                    onPress={() =>
                      scrollViewRef?.current?.scrollToEnd({ animated: true })
                    }
                  >
                    <Text style={styles.link}>{t("skip")}</Text>
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.flex1} />
              <Text style={styles.titleText}>{slide.title}</Text>
              <Text style={styles.descriptionText}>{slide.text}</Text>
              <View style={styles.pagination}>{renderDots()}</View>
              {isLast ? (
                <View style={styles.buttonRow}>
                  <TouchableOpacity style={styles.secondaryButton}>
                    <Text style={styles.secondaryButtonText}>
                      {t("try-as-a-guest")}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={() => navigation.navigate("Login")}
                  >
                    <Text style={styles.primaryButtonText}>{t("sign-in")}</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity style={styles.nextButton} onPress={goToNext}>
                  <RightArrow fill={Colors.White} width={24} height={24} />
                </TouchableOpacity>
              )}
            </ImageBackground>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  activeDot: {
    backgroundColor: Colors.White
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  container: {
    backgroundColor: Colors.Black,
    flex: 1
  },
  descriptionText: {
    color: Colors.White,
    fontSize: Metrics.xSmall,
    fontWeight: "500"
  },
  dot: {
    backgroundColor: Colors.Grey,
    borderRadius: Metrics.radius.tiny,
    height: Metrics.tiny,
    marginHorizontal: Metrics.margin.xTiny,
    width: Metrics.tiny
  },
  flex1: {
    flex: 1
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  link: {
    color: Colors.Primary,
    fontSize: Metrics.medium,
    fontWeight: "500"
  },
  logo: {
    height: 90,
    width: 100
  },
  nextButton: {
    alignItems: "center",
    alignSelf: "flex-end",
    backgroundColor: Colors.Primary,
    height: 60,
    justifyContent: "center",
    width: 60
  },
  nextButtonText: {
    color: Colors.White,
    fontSize: Metrics.small,
    textAlign: "center"
  },
  pagination: {
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: Metrics.margin.small
  },
  primaryButton: {
    alignItems: "center",
    backgroundColor: Colors.Primary,
    borderColor: Colors.White,
    borderWidth: 2,
    paddingVertical: Metrics.padding.xxSmall,
    width: "45%"
  },
  primaryButtonText: {
    color: Colors.White,
    fontSize: Metrics.xSmall,
    fontWeight: "700"
  },
  secondaryButton: {
    alignItems: "center",
    borderColor: Colors.Primary,
    borderWidth: 2,
    padding: 15,
    width: "45%"
  },
  secondaryButtonText: {
    color: Colors.White,
    fontSize: Metrics.xSmall,
    fontWeight: "700"
  },
  slide: {
    padding: Metrics.padding.base,
    width: width
  },
  titleText: {
    color: Colors.White,
    fontSize: Metrics.base,
    fontWeight: "bold",
    marginBottom: Metrics.margin.small
  }
});

export default OnboardingScreen;
