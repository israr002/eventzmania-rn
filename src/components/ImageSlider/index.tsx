import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  View
} from "react-native";

import { styles } from "./styles";
import { ImageSliderProps } from "./types";

const screenWidth = Dimensions.get("screen").width;

const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  autoSlide = true,
  imageHeight = 200
}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const interval: number = 2000;

  useEffect(() => {
    let autoSlideInterval: NodeJS.Timeout;
    if (autoSlide) {
      autoSlideInterval = setInterval(() => {
        setActiveIndex(prevIndex => {
          const nextIndex = (prevIndex + 1) % images.length;
          scrollViewRef.current?.scrollTo({
            x: nextIndex * screenWidth,
            animated: true
          });
          return nextIndex;
        });
      }, interval);
    }

    return () => clearInterval(autoSlideInterval);
  }, [images.length, interval, autoSlide]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / screenWidth);
    setActiveIndex(index);
  };

  const renderImages = () => {
    return images.map((image, index) => (
      <Image
        key={index}
        source={{ uri: image }}
        style={[styles.image, { height: imageHeight }]}
      />
    ));
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {renderImages()}
      </ScrollView>
      {images.length > 1 && (
        <View style={styles.pagination}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                activeIndex === index ? styles.activeDot : null
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default ImageSlider;
