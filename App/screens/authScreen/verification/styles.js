import {StyleSheet} from 'react-native';
import {
  TwoZeroFontPixel,
  oneEightFontPixel,
  oneThreeFontPixel,
  oneTwoFontPixel,
  senLight,
  senMedium,
  senRegular,
  twoTwoFontPixel,
} from '../../../utils/fontsSize';
import {colors} from '../../../utils/colors';
import responsive from '../../../utils/styles/responsive';

export const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
  verificationView: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  verificationText: {
    fontFamily: senMedium,
    fontSize: twoTwoFontPixel,
  },
  conView: {
    marginHorizontal: 20,
    marginTop: 6,
  },
  numText: {
    fontFamily: senMedium,
    fontSize: oneThreeFontPixel,
  },
  resend: {
    color: colors.BUTTON_BACKGROUND_COLOR,
    fontFamily: senRegular,
    fontSize: oneTwoFontPixel,
    marginTop: 20,
  },
  otpContainer: {
    justifyContent: 'space-around',
    marginHorizontal: 30,
    color: 'white',
    marginVertical: 50,
  },
  roundedTextInput: {
    borderRadius: 50,
    borderWidth: 0.3,
    borderBottomWidth: 0.3,
    height: 60,
    width: 60,
    borderColor: '#ddddde',
    fontSize: TwoZeroFontPixel,
  },
});
