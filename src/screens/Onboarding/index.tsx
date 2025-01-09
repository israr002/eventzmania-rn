import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  Text,
  Dimensions,
  Animated,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
} from 'react-native';
import { styles } from './styles';
import RightArrow from 'assets/images/icons/arrow-right.svg';
import { Colors } from 'styles/colors';

const { width } = Dimensions.get('window');

const Onboarding = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const { t } = useTranslation();

  const slides = [
    {
      title: t('find-the-perfect-venue-for-every-occasion'),
      text: t('discover-beautiful-venues-to-host-your-events'),
      image: require('assets/images/background/1.jpg'),
    },
    {
      title: t('experience-live-entertainment'),
      text: t('stay-updated-with-the-latest-shows'),
      image: require('assets/images/background/2.jpg'),
    },
    {
      title: t('explore-events-and-updates'),
      text: t('browse-photos-and-videos-of-events-and-shows'),
      image: require('assets//images/background/3.jpg'),
    },
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
                  source={require('../../assets/images/eventz-mania-logo.png')}
                  style={styles.logo}
                />
                {isFirst && (
                  <TouchableOpacity onPress={() => scrollViewRef?.current?.scrollToEnd({ animated: true })}>
                    <Text style={styles.link}>{t('skip')}</Text>
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
                      {t('try-as-a-guest')}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.primaryButton}>
                    <Text style={styles.primaryButtonText}>{t('sign-in')}</Text>
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

export default Onboarding;
