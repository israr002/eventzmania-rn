import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Loader from "components/common/Loader";
import { useAuthStore } from "hooks/useAuthStore";
import AppNavigator from "navigation/AppNavigator";
import React, { useEffect, useState } from "react";

function App(): React.JSX.Element {
  const queryClient = new QueryClient();

  const [loading, setLoading] = useState<boolean>(true);
  const { initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    await initializeAuth();
    setLoading(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AppNavigator />
    </QueryClientProvider>
  );
}

export default App;
