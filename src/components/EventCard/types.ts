import { EventDetails, Restaurant } from "../../types";

export interface EventCardProps {
  event: EventDetails;
  onPress: (event: EventDetails) => void;
}
