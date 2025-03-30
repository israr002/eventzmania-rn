import { Booking } from "../../types";

export interface BookingCardProps {
  booking: Booking;
  onRate: (booking: Booking) => void;
}
