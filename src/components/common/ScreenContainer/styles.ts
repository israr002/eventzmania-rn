import {StyleSheet} from 'react-native';

import {Colors} from '../../../styles/colors';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.Black,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  childContainer: {
    flex: 1,
    //marginTop: StatusBar.currentHeight,
  },
});
