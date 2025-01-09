import { Dimensions, StyleSheet } from 'react-native';
import { Colors } from 'styles/colors';
import { Metrics } from 'styles/metrics';


const { width } = Dimensions.get('screen');
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Black,
  },
  slide: {
    width: width,
    padding: Metrics.padding.base,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    height: 90,
    width: 100,
  },
  link: {
    fontSize: Metrics.medium,
    color: Colors.Primary,
    fontWeight: '500',
  },
  nextButton: {
    backgroundColor: Colors.Primary,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  nextButtonText: {
    fontSize: Metrics.small,
    color: Colors.White,
    textAlign: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: Metrics.margin.small,
  },
  dot: {
    width: Metrics.tiny,
    height: Metrics.tiny,
    borderRadius: Metrics.radius.tiny,
    backgroundColor: Colors.Grey,
    marginHorizontal: Metrics.margin.xTiny,
  },
  activeDot: {
    backgroundColor: Colors.White,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  primaryButton: {
    backgroundColor: Colors.Primary,
    paddingVertical: Metrics.padding.xxSmall,
    width: '45%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.White,
  },
  secondaryButton: {
    padding: 15,
    width: '45%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.Primary,
  },
  primaryButtonText: {
    fontSize: Metrics.xSmall,
    color: Colors.White,
    fontWeight: '700',
  },
  secondaryButtonText: {
    fontSize: Metrics.xSmall,
    color: Colors.White,
    fontWeight: '700',
  },
  titleText: {
    color: Colors.White,
    fontWeight: 'bold',
    fontSize: Metrics.base,
    marginBottom: Metrics.margin.small,
  },
  descriptionText: {
    color: Colors.White,
    fontWeight: '500',
    fontSize: Metrics.xSmall,
  },
  flex1: {
    flex: 1,
  },
});

