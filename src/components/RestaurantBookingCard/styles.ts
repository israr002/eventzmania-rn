import {StyleSheet} from 'react-native';

import {Colors} from '../../styles/colors';
import {Metrics} from '../../styles/metrics';

export const styles = StyleSheet.create({
  detailsContainer: {
    backgroundColor: Colors.Black,
    borderWidth: 1,
    borderColor: Colors.Grey,
    borderRadius: Metrics.radius.base,
    marginVertical: Metrics.margin.tiny,
    marginHorizontal: Metrics.margin.medium,
    paddingVertical: Metrics.padding.small,
    paddingHorizontal: Metrics.padding.base,
  },
  headingText: {
    color: Colors.White,
    fontSize: Metrics.medium,
    fontWeight: '700',
    flex: 1,
  },
  text: {
    color: Colors.Grey,
    fontSize: Metrics.xSmall,
  },
  linkText: {
    color: Colors.Pink,
    fontSize: Metrics.xSmall,
  },
  link: {
    alignSelf: 'flex-end',
  },
});
