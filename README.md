# EventzMania

EventzMania is a mobile application designed to help users explore restaurants, book venues for special occasions, and purchase event tickets. Users can browse restaurant listings, view food packages, and check event schedules. Additionally, users can interact with social content by liking and commenting on posts shared by restaurants. Payments are handled via Razorpay for seamless transactions.

## Watch the Demo Video
[![Watch the video](https://img.youtube.com/vi/Zl-0lBTURWg/0.jpg)](https://www.youtube.com/watch?v=Zl-0lBTURWg)

## Important Libraries Used

###  State Management
- `zustand`: Lightweight state management.
- `@tanstack/react-query`: Handling API requests and caching data efficiently.

### Navigation
- `@react-navigation/native`, `@react-navigation/native-stack`, `@react-navigation/bottom-tabs`: For handling navigation between screens.

### Forms & Validation
- `react-hook-form`: Form handling.
- `@hookform/resolvers`: Resolver for schema validation.
- `zod`: Schema validation.

### Location & Maps
- `@react-native-community/geolocation`: Fetching user's location.
- `react-native-maps`: Displaying restaurants and event locations.

### Date & Calendar
- `react-native-calendars`: Displaying event dates.
- `react-native-calendar-strip`: Timeline view for events.
- `moment`: Date manipulation.

### Payments
- `react-native-razorpay`: Integrating Razorpay for seamless payments.

## Project Flow

### Guest Mode
- **Feed Screen** - Displays posts shared by restaurants.
- **Nearby Restaurants** - Shows restaurants near the user, including details like food packages and restaurant calendar.
- **Event List** - Displays all available events.

### Logged-In User Flow
#### Authentication
- User enters their phone number.
- OTP verification is required.
- Existing users are redirected to the Home screen.
- New users are redirected to the Signup screen to complete their profile.

#### Feed
- Users can like posts.
- Users can add and reply to comments.
- Users can like others' comments.

#### Restaurant and Event Exploration
- View restaurant details, food packages, and available events.

#### Booking a Restaurant for an Occasion
- Users can book a restaurant for weddings, birthdays, or other occasions.
- Users can select food packages.
- Payment is processed via Razorpay.

#### Event Ticket Booking
- Users can book tickets for events like stand-up comedy shows or music programs hosted in the Restaurant.
- Payment is processed via Razorpay.

#### Profile Section
- Users can edit their profile.
- View booking history.

## Running the Project

### Prerequisites
Make sure you have the following installed:
- **Node.js** (Latest LTS version recommended)
- **Yarn or npm**
- **React Native CLI**
- **Android Studio** (for Android development)
- **Xcode** (for iOS development, macOS only)

### Step 1: Clone the Repository
```bash
git clone https://github.com/israr002/EventzMania.git
cd EventzMania
```

### Step 2: Install Dependencies
```bash
# using npm
npm install

# OR using Yarn
yarn install
```

### Step 3: Start the Metro Server
```bash
# using npm
npm start

# OR using Yarn
yarn start
```

### Step 4: Run the Application
#### For Android
```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

#### For iOS (Mac Only)
```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

