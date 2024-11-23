import {StyleSheet} from 'react-native';
import {colors} from '../../../../utils/colors';
import {
  sansOne,
  twoOneFontPixel,
  twoTwoFontPixel,
} from '../../../../utils/fontsSize';

export const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
  sunViewContainer: {
    flex: 1,
    borderTopStartRadius: 35,
    borderTopEndRadius: 35,
    paddingVertical: 20,
    paddingBottom: 80,
  },
  renderView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 6,
  },
  titleView: {
    position: 'absolute',
    alignSelf: 'center',
  },
  titleText: {
    color: colors.WHITE_COLOR,
    fontSize: twoTwoFontPixel,
    fontFamily: sansOne,
  },
  img: {
    width: '93%',
    resizeMode: 'stretch',
  },
});
