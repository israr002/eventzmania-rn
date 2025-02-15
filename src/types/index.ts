export type Amenity = {
  name: string;
  id: number;
  value: string;
};
export type Restaurant = {
  id: number;
  profileImage: string;
  description: string;
  name: string;
  distance: number;
  address: string;
  amenities: Amenity[];
  latitude: string;
  longitude: string;
  event: string;
  eventDescription: string;
  eventStartTime: string;
  eventEndTime: string;
  totalCapacity: number;
  banquetCapacity: number;
  diningCapacity: number;
};

export type ImageData = {
  uri?: string;
  [key: string]: any;
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  mobileNo: string;
  email: string;
  profileImage: string;
  city: string;
};

export type Booking = {
  id: number;
  eventId: string;
  name: number;
  totalAmount: number;
  noOfTickets: number;
  ticketPrice: number;
  bookedOn: Date;
  date: Date;
};

export type VenueBooking = {
  id: number;
  venue: Venue;
  tickets: number;
  totalAmount: number;
  bookedOn: Date;
  date: Date;
};

export type Post = {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  restaurantName: string;
  profilePicture: string;
  media: string[];
  likeCount: number;
  commentCount: number;
  liked: boolean;
  restaurantId: number;
  eventsAvailable: boolean;
};

export type Comment = {
  id: number;
  comment: string;
  userId: number;
  username: string;
  profilePicture: string;
  createdAt: Date;
  liked: boolean;
  replyCount?: number;
  replies?: Comment[];
};

export type EventDetails = {
  id: number;
  date: Date;
  startTime: string;
  endTime: string;
  name: string;
  description: string;
  ticketPrice: number;
  maxLimit: number;
  image: string;
  restaurantId: number;
  restaurantName: string;
  restaurantAddress: string;
};

export type dropdownItem = {
  label: string;
  value: number;
};
