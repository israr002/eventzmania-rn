/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  SafeAreaView,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const { t } = useTranslation();
  

  return (
    <SafeAreaView style={backgroundStyle}>
      <View>
        <Text>{t('welcome-to-eventz-mania')}</Text>
      </View>
    </SafeAreaView>
  );
}

export default App;
