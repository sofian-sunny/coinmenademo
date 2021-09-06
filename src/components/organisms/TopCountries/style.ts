import {StyleSheet} from 'react-native';
import {scale, verticalScale} from '../../../utils/scaling';
import colors from '../..//../theme/colors';

const {turquoise} = colors;

export default StyleSheet.create({
  containerMain: {
    flex: 1,
    marginVertical: verticalScale(10),
    flexDirection: 'row',
  },
  gridStyle: {
    flex: 1,
  },
  titleStyle: {
    color: turquoise,
  },
  cardSpacing: {
    marginHorizontal: scale(10),
  },
  subContainer: {
    height: 370,
  },
  spacingHorizontal: {
    width: scale(10),
  },
  spacingVertical: {
    height: scale(10),
  },
  gridSpacing: {
    marginTop: verticalScale(20),
  },
});
