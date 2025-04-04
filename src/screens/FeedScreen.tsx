import { useNavigation } from "@react-navigation/native";
import CommentModal from "components/CommentModal";
import Loader from "components/common/Loader";
import FeedCard from "components/FeedCard";
import { useCheckAuth } from "hooks/useCheckAuth";
import { useFeed } from "hooks/useFeed";
import { AppNavigationProp } from "navigation/AppNavigator/types";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Colors } from "styles/colors";
import { Comment, Post } from "types";

const FeedScreen: React.FC = () => {
  const [postList, setPostList] = useState<Post[]>([]);
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post>();
  const {
    getFeedMutation,
    likePostMutation,
    getCommentsMutation,
    getCommentRepliesMutation,
    likeCommentMutation,
    addCommentMutation,
    addCommentReplyMutation,
  } = useFeed();
  const { mutate: fetchFeed, isPending: feedPending } = getFeedMutation;
  const { mutate: fetchComments, isPending: commentsPending } =
    getCommentsMutation;
  const { mutate: fetchReplies, isPending: repliesPending } =
    getCommentRepliesMutation;

  const { checkAuth } = useCheckAuth();
  const appNavigation = useNavigation<AppNavigationProp>();

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    fetchFeed(undefined, {
      onSuccess: (res) => {
        setPostList(res.data.data);
      },
      onError: (err) => {
        console.log("request failed:", err);
      },
    });
  };

  const onLike = async (item: Post) => {
    const previousPostList = [...postList];
    const updatedData = postList.map((i) =>
      item.id === i.id ? { ...i, liked: !i.liked } : i
    );
    setPostList(updatedData);
    checkAuth(() =>
      likePostMutation.mutate(item.id, {
        onSuccess: (res) => {
          if (res?.status === 400) {
            setPostList(previousPostList);
          }
        },
        onError: (err) => {
          console.log("Error occurred:", err);
        },
      })
    );
  };

  const getComments = async (item: Post) => {
    setCommentModalOpen(true);
    fetchComments(item.id, {
      onSuccess: (res) => {
        setComments(res.data.data);
        setSelectedPost(item);
      },
      onError: (err) => {
        console.log("request failed:", err);
      },
    });
  };

  const getCommentReplies = async (id: number) => {
    fetchReplies(id, {
      onSuccess: (res) => {
        const index = comments.findIndex((i) => i.id === id);
        comments[index].replies = res.data.data;
        setComments([...comments]);
      },
      onError: (err) => {
        console.log("request failed:", err);
      },
    });
  };

  const onLikeComment = async (id: number) => {
    const previousList = [...comments];
    const index = comments.findIndex((i) => i.id === id);
    comments[index].liked = !comments[index].liked;
    setComments([...comments]);
    checkAuth(() =>
      likeCommentMutation.mutate(id, {
        onSuccess: (res) => {
          if (res?.status === 400) {
            setComments(previousList);
          }
        },
        onError: (err) => {
          console.log("Error occurred:", err);
        },
      })
    );
  };

  const addComment = async (comment: string, commentId: number | undefined) => {
    try {
      if (commentId) {
        const commentData = {
          commentId: commentId,
          comment: comment,
        };
        checkAuth(() =>
          addCommentReplyMutation.mutate(commentData, {
            onSuccess: (res) => {
              getCommentReplies(commentId);
            },
            onError: (err) => {
              console.log("Error occurred:", err);
            },
          })
        );
      } else {
        const commentData = {
          postId: selectedPost?.id as number,
          comment: comment,
        };
        checkAuth(() =>
          addCommentMutation.mutate(commentData, {
            onSuccess: (res) => {
              getComments(selectedPost as Post);
            },
            onError: (err) => {
              console.log("Error occurred:", err);
            },
          })
        );
      }
    } catch (err) {
      console.log({ err });
    }
  };

  const goToRestaurant = (id: number) => {
    // navigation.navigate("Restaurant", {
    //   screen: "VenueDetails",
    //   params: { venueId: id },
    // });
    appNavigation.navigate("RestaurantDetails", { restaurantId: id });
  };

  const goToEvents = (id: number) => {
    // navigation.navigate("VenueStack", {
    //   screen: "Events",
    //   params: { venueId: id },
    // });
  };

  return (
    <>
      {feedPending ? (
        <Loader />
      ) : (
        <View style={styles.mainContainer}>
          <FlatList
            data={postList}
            renderItem={({ item }) => (
              <FeedCard
                post={item}
                onLike={() => onLike(item)}
                onComment={() => getComments(item)}
                goToRestaurant={() => goToRestaurant(item.restaurantId)}
                goToEvents={() => goToEvents(item.restaurantId)}
              />
            )}
            keyExtractor={(item) => `${item.id}`}
            // ListEmptyComponent={<NoData message="No Posts available." />}
          />
        </View>
      )}
      {commentModalOpen && (
        <CommentModal
          visible={commentModalOpen}
          onClose={() => setCommentModalOpen(false)}
          comments={comments}
          getReplies={getCommentReplies}
          onLikeComment={onLikeComment}
          addComment={addComment}
          commentsLoading={commentsPending}
          repliesLoading={repliesPending}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.Black,
    flex: 1,
  },
});

export default FeedScreen;
