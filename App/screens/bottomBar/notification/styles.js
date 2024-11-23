import {Platform, StyleSheet} from 'react-native';
import {colors} from '../../../utils/colors';
import {
  nineFontPixel,
  oneThreeFontPixel,
  senMedium,
  senRegular,
} from '../../../utils/fontsSize';

export const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    paddingTop: 10,
  },
  sunViewContainer: {
    flex: 1,
    borderTopStartRadius: 35,
    borderTopEndRadius: 35,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  renderView: {
    width: '100%',
    marginLeft: 4,
    paddingTop: 10,
    marginVertical: 4,
    flexDirection: 'column',
    paddingHorizontal: 4,
    minHeight: 80,
    gap: 4,
    paddingVertical: 10,
  },
  titleView: {
    flex: 1,
    paddingRight: 10,
    paddingLeft: 10,
  },
  timeText: {
    color: colors.INPUT_COLOR,
  },
  titleText: {
    color: 'red',
    fontFamily: senMedium,
    lineHeight: 20,
    fontSize: oneThreeFontPixel,
    fontWeight: '100',
  },
  timeView: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
  },
  time: {
    fontSize: nineFontPixel,
    fontFamily: senRegular,
  },
});
