/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
} from 'react-native';

import Onboarding from 'screens/Onboarding';

function App(): React.JSX.Element {

  const backgroundStyle = {
    flex: 1,
  };


  return (
    <SafeAreaView style={backgroundStyle}>
      <Onboarding />
    </SafeAreaView>
  );
}

export default App;
