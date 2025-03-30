export interface RatingModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (rating: number) => void;
}
