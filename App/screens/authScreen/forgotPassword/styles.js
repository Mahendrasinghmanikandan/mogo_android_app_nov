import {Platform, StyleSheet} from 'react-native';
import {senSemiBold, senLight, senMedium} from '../../../utils/fontsSize';
import {
  twoOneFontPixel,
  oneThreeFontPixel,
  oneFourFontPixel,
} from '../../../utils/fontsSize';
import {colors} from '../../../utils/colors';
import responsive from '../../../utils/styles/responsive';

export const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: 'red',
  },
  forgetView: {
    marginHorizontal: 20,
    marginTop: 30,
  },
  forgetText: {
    fontFamily: senSemiBold,
    fontSize: twoOneFontPixel,
    color: colors.WHITE_COLOR,
    fontWeight: '700',
  },
  codeText: {
    fontFamily: senLight,
    fontWeight: '500',
    fontSize: oneThreeFontPixel,
    lineHeight: 21,
  },
  conView: {
    marginHorizontal: 20,
  },
  countryCodeView: {
    marginHorizontal: 20,
    paddingVertical: Platform.OS === 'android' ? 0 : 10,
    marginVertical: 70,
    borderBottomWidth: 1,
    flexDirection: 'row',
    height: responsive.heightPixel(50),
  },
  flgView: {
    width: responsive.widthPixel(30),
    justifyContent: 'center',
  },
  iconView: {
    justifyContent: 'center',
  },
  code: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusIconView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 3,
  },
  lineView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  verticalLine: {
    height: Platform.OS === 'ios' ?  '90%' : '70%'  ,
    width: 1,
    backgroundColor: '#909090',
    marginHorizontal: 10,
    alignSelf: 'center',
  },
  textInputView: {
    justifyContent: 'center',
    flex: 1,
  },
  inputText: {
    fontFamily: senMedium,
    color: colors.INPUT_COLOR,
    fontSize: oneFourFontPixel,
  },
});
