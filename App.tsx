/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthStack from "navigation/AuthStack";
import React from "react";

function App(): React.JSX.Element {
  const [queryClient] = React.useState(() => new QueryClient());



  return (

    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <AuthStack initialScreen="Onboarding" />
      </NavigationContainer>
    </QueryClientProvider>

  );
}

export default App;
