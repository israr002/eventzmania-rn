import CloseSvg from "assets/images/icons/close.svg";
import SendSvg from "assets/images/icons/close.svg";
import LikeSvg from "assets/images/icons/like.svg";
import LikedSvg from "assets/images/icons/liked.svg";
import moment from "moment";
import React, { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { Colors } from "styles/colors";
import { Comment } from "types";

import { styles } from "./styles";
import { CommentModalProps } from "./types";

const CommentModal: React.FC<CommentModalProps> = ({
  visible,
  onClose,
  comments,
  onLikeComment,
  getReplies,
  addComment
}) => {
  const [comment, setComment] = useState<string>("");
  const [selectedCommentIdToViewReplies, setSelectedCommentIdToViewReplies] =
    useState<number>(0);
  const [selectedCommentToReply, setSelectedCommentToReply] = useState<
    Comment | undefined
  >();

  const closeModal = () => {
    onClose();
    setComment("");
    setSelectedCommentIdToViewReplies(0);
    setSelectedCommentToReply(undefined);
  };

  const onViewReplies = (id: number) => {
    setSelectedCommentIdToViewReplies(id);
    const index = comments.findIndex(i => i.id === id);
    if (!comments[index].replies) {
      getReplies(id);
    }
  };

  const onHideReplies = () => {
    setSelectedCommentIdToViewReplies(0);
  };

  const addNewComment = () => {
    addComment(comment, selectedCommentToReply?.id);
    setComment("");
    if (selectedCommentToReply) {
      onViewReplies(selectedCommentToReply.id);
      setSelectedCommentToReply(undefined);
    }
  };

  return (
    <Modal
      animationType="slide"
      visible={visible}
      transparent={true}
      onRequestClose={closeModal}
    >
      <Pressable style={styles.modalBackdrop} onPress={closeModal}>
        <View style={styles.modal}>
          <TouchableOpacity onPress={closeModal}>
            <View style={styles.horizontalLine} />
          </TouchableOpacity>
          <Text style={styles.modalHeadingText}>Comments</Text>
          <View style={styles.modalContent}>
            {comments.length > 0 ? (
              <>
                {comments?.map(i => (
                  <View>
                    <View style={styles.commentContainer}>
                      <Image
                        source={{ uri: i.profilePicture }}
                        style={styles.userImage}
                      />
                      <View style={styles.commentSubContainer}>
                        <View style={styles.usernameContainer}>
                          <Text style={styles.usernameText}>{i.username}</Text>
                          <Text style={styles.timeText}>
                            {moment(i.createdAt).fromNow()}
                          </Text>
                        </View>
                        <Text style={styles.commentText}>{i.comment}</Text>
                        <TouchableOpacity
                          onPress={() => setSelectedCommentToReply(i)}
                        >
                          <Text style={styles.timeText}>Reply</Text>
                        </TouchableOpacity>
                        <View style={styles.replyContainer}>
                          {i.replyCount && (
                            <>
                              {i.id === selectedCommentIdToViewReplies ? (
                                <View>
                                  {i.replies?.map(j => (
                                    <View style={styles.commentContainer}>
                                      <Image
                                        source={{ uri: j.profilePicture }}
                                        style={styles.userImage}
                                      />
                                      <View style={styles.commentSubContainer}>
                                        <View style={styles.usernameContainer}>
                                          <Text style={styles.usernameText}>
                                            {j.username}
                                          </Text>
                                          <Text style={styles.timeText}>
                                            {moment(j.createdAt).fromNow()}
                                          </Text>
                                        </View>
                                        <Text style={styles.commentText}>
                                          {j.comment}
                                        </Text>
                                      </View>
                                    </View>
                                  ))}
                                  <TouchableOpacity onPress={onHideReplies}>
                                    <Text style={styles.timeText}>
                                      Hide Replies
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                              ) : (
                                <TouchableOpacity
                                  onPress={() => onViewReplies(i.id)}
                                >
                                  <Text style={styles.timeText}>
                                    View Replies
                                  </Text>
                                </TouchableOpacity>
                              )}
                            </>
                          )}
                        </View>
                      </View>
                      <TouchableOpacity
                        style={styles.icon}
                        onPress={() => onLikeComment(i.id)}
                      >
                        {i.liked ? (
                          <LikedSvg
                            fill={Colors.Primary}
                            height={15}
                            width={15}
                          />
                        ) : (
                          <LikeSvg fill={Colors.White} height={15} width={15} />
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </>
            ) : (
              <Text style={styles.noCommentText}>No Comments yet</Text>
            )}
          </View>
          {selectedCommentToReply && (
            <View style={styles.replyBar}>
              <Text style={styles.timeText}>
                Replying to {selectedCommentToReply.username}
              </Text>
              <TouchableOpacity
                onPress={() => setSelectedCommentToReply(undefined)}
              >
                <CloseSvg fill={Colors.White} height={15} width={15} />
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Add a comment"
              placeholderTextColor={Colors.Grey}
              style={styles.input}
              value={comment}
              onChangeText={text => setComment(text)}
            />
            {comment.length > 0 && (
              <TouchableOpacity onPress={addNewComment} style={styles.sendIcon}>
                <SendSvg fill={Colors.White} height={15} width={15} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

export default CommentModal;
