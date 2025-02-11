import { Post } from "types";

export type FeedCardProps = {
  post: Post;
  onLike: () => void;
  onComment: () => void;
  goToVenue: () => void;
  goToEvents?: () => void;
}
