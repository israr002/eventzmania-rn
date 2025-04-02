import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

interface AuthState {
  hasSeenOnboarding: boolean;
  isGuest: boolean;
  isLoggedIn: boolean;
  accessToken: string | null;
  refreshToken: string | null;

  initializeAuth: () => Promise<void>;
  setSeenOnBoarding: () => Promise<void>;
  setGuestLoggedIn: () => Promise<void>;
  setLoggedIn: (
    status: boolean,
    accessToken: string,
    refreshToken: string
  ) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>(set => ({
  hasSeenOnboarding: false,
  isGuest: false,
  isLoggedIn: false,
  accessToken: null,
  refreshToken: null,

  initializeAuth: async () => {
    const [
      seenOnboarding,
      guestStatus,
      loggedInStatus,
      accessToken,
      refreshToken
    ] = await Promise.all([
      AsyncStorage.getItem("hasSeenOnboarding"),
      AsyncStorage.getItem("isGuestLoggedIn"),
      AsyncStorage.getItem("isLoggedIn"),
      AsyncStorage.getItem("eventAccessToken"),
      AsyncStorage.getItem("eventRefreshToken")
    ]);

    set({
      hasSeenOnboarding: seenOnboarding === "true",
      isGuest: guestStatus === "true",
      isLoggedIn: loggedInStatus === "true",
      accessToken,
      refreshToken
    });
  },

  setSeenOnBoarding: async () => {
    await AsyncStorage.setItem("hasSeenOnboarding", "true");
    set({ hasSeenOnboarding: true });
  },

  setGuestLoggedIn: async () => {
    await AsyncStorage.setItem("isGuestLoggedIn", "true");
    set({ isGuest: true });
  },

  setLoggedIn: async (status, accessToken, refreshToken) => {
    await AsyncStorage.setItem("isLoggedIn", status ? "true" : "false");
    await AsyncStorage.setItem("eventAccessToken", accessToken);
    await AsyncStorage.setItem("eventRefreshToken", refreshToken);
    set({ isLoggedIn: status, accessToken, refreshToken });
  },

  logout: async () => {
    await AsyncStorage.removeItem("isLoggedIn");
    await AsyncStorage.removeItem("eventAccessToken");
    await AsyncStorage.removeItem("eventRefreshToken");
    set({ isLoggedIn: false, accessToken: null, refreshToken: null });
  }
}));
