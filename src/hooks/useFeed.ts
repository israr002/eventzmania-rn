import { useMutation } from "@tanstack/react-query";
import {
  addComment,
  addCommentReply,
  getCommentReplies,
  getComments,
  getFeed,
  likeComment,
  likePost
} from "api/feedApi";

export const useFeed = () => {
  const getFeedMutation = useMutation({
    mutationFn: getFeed
  });

  const likePostMutation = useMutation({
    mutationFn: likePost
  });

  const getCommentsMutation = useMutation({
    mutationFn: getComments
  });

  const getCommentRepliesMutation = useMutation({
    mutationFn: getCommentReplies
  });

  const likeCommentMutation = useMutation({
    mutationFn: likeComment
  });

  const addCommentMutation = useMutation({
    mutationFn: addComment
  });

  const addCommentReplyMutation = useMutation({
    mutationFn: addCommentReply
  });

  return {
    getFeedMutation,
    likePostMutation,
    getCommentsMutation,
    getCommentRepliesMutation,
    likeCommentMutation,
    addCommentMutation,
    addCommentReplyMutation
  };
};
