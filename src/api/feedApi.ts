import { API_ENDPOINTS } from "constants/apiEndpoints";

import { apiCallService } from "./apiService";

export const getFeed = async () => {
  return apiCallService("GET", API_ENDPOINTS.GET_FEED);
};

export const likePost = async (data: number) => {
  return apiCallService("POST", `${API_ENDPOINTS.LIKE}?postId=${data}`);
};

export const getComments = async (data: number) => {
  return apiCallService("GET", `${API_ENDPOINTS.GET_COMMENTS}?postId=${data}`);
};

export const getCommentReplies = async (data: number) => {
  return apiCallService(
    "GET",
    `${API_ENDPOINTS.GET_COMMENT_REPLIES}?commentId=${data}`
  );
};

export const likeComment = async (data: number) => {
  return apiCallService(
    "POST",
    `${API_ENDPOINTS.LIKE_COMMENT}?commentId=${data}`
  );
};

export type AddCommentRequest = {
  postId: number;
  comment: string;
};

export const addComment = async (data: AddCommentRequest) => {
  return apiCallService("POST", API_ENDPOINTS.ADD_COMMENT, data);
};

export type AddCommentReplyRequest = {
  commentId: number;
  comment: string;
};

export const addCommentReply = async (data: AddCommentReplyRequest) => {
  return apiCallService("POST", API_ENDPOINTS.ADD_COMMENT_REPLY, data);
};
