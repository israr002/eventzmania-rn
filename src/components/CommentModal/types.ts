import { Comment } from "types";

export interface CommentModalProps {
  visible: boolean;
  comments: Comment[];
  onClose: () => void;
  getReplies: (id: number) => void;
  onLikeComment: (id: number) => void;
  addComment: (comment: string, commentId: number | undefined) => void;
}
