import { Post } from "types";

export interface FeedCardProps {
  post: Post;
  onLike: () => void;
  onComment: () => void;
  goToRestaurant: () => void;
  goToEvents?: () => void;
}
