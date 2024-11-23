import {colors} from '../../../utils/colors';
import {
  TwoZeroFontPixel,
  oneOneFontPixel,
  oneSixFontPixel,
  oneThreeFontPixel,
  oneTwoFontPixel,
  oneZeroFontPixel,
  senLight,
  senMedium,
  senSemiBold,
  twoOneFontPixel,
} from '../../../utils/fontsSize';
import responsive from '../../../utils/styles/responsive';

const {StyleSheet, Platform} = require('react-native');

export const styles = StyleSheet.create({
  viewContainer: {
    backgroundColor: 'red',
    flex: 1,
  },
  titleView: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  titleText: {
    fontFamily: senSemiBold,
    fontSize: twoOneFontPixel,
    color: colors.WHITE_COLOR,
    fontWeight: '700',
  },
  conView: {
    marginHorizontal: 20,
    marginTop: Platform.OS === 'android' ? 0 : 15,
  },
  codeText: {
    fontFamily: senLight,
    fontWeight: '500',
    fontSize: oneThreeFontPixel,
  },
  resetView: {
    marginHorizontal: 20,
    marginTop: 8,
    marginBottom: 15,
  },
  resetText: {
    // color: colors.BUTTON_BACKGROUND_COLOR,
    fontFamily: senMedium,
    fontSize: oneZeroFontPixel,
    fontFamily: '200',
  },
  termsContainer: {
    marginHorizontal: 20,
    flexDirection: 'row',
    marginVertical: 20,
  },
  roundView: {
    height: 30,
    width: 30,
    borderRadius: 50,
    alignSelf: 'center',
  },
  textContainer: {
    justifyContent: 'center',
    paddingLeft: 10,
    flex: 1,
  },
  text: {
    fontFamily: senMedium,
    fontSize: oneOneFontPixel,
    lineHeight: 20,
  },
  line: {
    borderWidth: 0.5,
    marginHorizontal: 20,
    marginTop: Platform.OS === 'android' ? 0 : 10,
    marginBottom: 20,
  },
  socialView: {
    flexDirection: 'row',
    marginHorizontal: 20,
    width: '55%',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  accContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  accText: {
    color: colors.BUTTON_BACKGROUND_COLOR,
    fontSize: oneThreeFontPixel,
    fontFamily: senMedium,
  },
  inText: {},
});
