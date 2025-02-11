import CommentSvg from "assets/images/icons/comment.svg";
import LikeSvg from "assets/images/icons/like.svg";
import LikedSvg from "assets/images/icons/liked.svg";
import ImageSlider from "components/ImageSlider";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useSharedValue,
  withDelay,
  withTiming
} from "react-native-reanimated";
import { Colors } from "styles/colors";

import { styles } from "./styles";
import { PostItemProps } from "./types";

export const screenWidth = Dimensions.get("screen").width;

const FeedCard: React.FC<FeedCardProps> = ({
  post,
  onLike,
  onComment,
  goToVenue,
  goToEvents
}) => {
  const [seeMore, setSeeMore] = useState<boolean>(false);
  const opacity = useSharedValue<number>(0);
  const { t } = useTranslation();

  const doubleTap = Gesture.Tap()
    .maxDuration(250)
    .numberOfTaps(2)
    .onStart(() => {
      opacity.value = 1;
      opacity.value = withDelay(
        500,
        withTiming(0, { duration: 500 }, isFinished => {
          if (isFinished) {
            runOnJS(onLike)();
          }
        })
      );
    });

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity style={styles.detailsRow} onPress={goToVenue}>
        <Image
          source={{ uri: post.profilePicture }}
          style={styles.venueProfileImage}
        />
        <Text style={styles.headingText}>{post.venueName}</Text>
      </TouchableOpacity>

      <GestureHandlerRootView>
        <GestureDetector gesture={Gesture.Exclusive(doubleTap)}>
          <View>
            <ImageSlider
              images={post.media}
              autoSlide={false}
              imageHeight={screenWidth}
            />
          </View>
        </GestureDetector>
      </GestureHandlerRootView>

      {/* {post.eventsAvailable && (
        <TouchableOpacity style={styles.bookingLink} onPress={goToEvents}>
          <Text style={styles.bookingLinkText}>Book Tickets</Text>
          <Image
            style={styles.bookingLinkIcon}
            source={require('../../assets/images/right-arrow.png')}
          />
        </TouchableOpacity>
      )} */}

      <View style={styles.detailsRow}>
        <TouchableOpacity onPress={onLike} style={styles.icon}>
          {post.liked ? (
            <LikedSvg fill={Colors.Primary} height={25} width={25} />
          ) : (
            <LikeSvg fill={Colors.White} height={25} width={25} />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={onComment} style={styles.icon}>
          <CommentSvg fill={Colors.White} height={25} width={25} />
        </TouchableOpacity>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.text}>{post.title}</Text>

        <Text
          style={styles.subText}
          numberOfLines={seeMore ? undefined : 2}
          ellipsizeMode="tail"
        >
          {post.description}
        </Text>
        <TouchableOpacity onPress={() => setSeeMore(!seeMore)}>
          <Text style={styles.linkText}>{seeMore ? t("less") : t("more")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FeedCard;
