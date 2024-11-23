import {StyleSheet} from 'react-native';
import {
  oneFiveFontPixel,
  oneFourFontPixel,
  oneSixFontPixel,
  oneThreeFontPixel,
  oneTwoFontPixel,
  senBold,
  senExtraBold,
  senMedium,
  senRegular,
} from '../../../utils/fontsSize';
import {colors} from '../../../utils/colors';
import responsive from '../../../utils/styles/responsive';

export const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
  sunViewContainer: {
    flex: 1,
    borderTopStartRadius: 35,
    borderTopEndRadius: 35,
    paddingTop: 15,
    paddingHorizontal: 15,
  },
  flexDateView: {
    flexDirection: 'row',
  },
  orderView: {
    flex: 1,
  },
  dateText: {
    fontFamily: senMedium,
    fontSize: oneThreeFontPixel,
  },
  amtText: {
    fontFamily: senBold,
    fontSize: oneThreeFontPixel,
  },
  amtView: {
    justifyContent: 'flex-end',
  },
  amtRuText: {
    fontFamily: senExtraBold,
    fontSize: oneFiveFontPixel,
  },
  line: {
    borderWidth: 1,
    marginVertical: 15,
  },
  eatText: {
    fontFamily: senBold,
    fontSize: oneSixFontPixel,
  },
  orderConfirmContainer: {
    flexDirection: 'row',
  },
  round: {
    backgroundColor: colors.BUTTON_BACKGROUND_COLOR,
    height: 29,
    width: 29,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  verticalLine: {
    height: responsive.heightPixel(60),
    width: 1,
    backgroundColor: colors.BUTTON_BACKGROUND_COLOR,
    alignSelf: 'center',
  },                                
  roundContainer: {},
  imgView: {
    paddingHorizontal: 18,
  },
  textView: {
    flex: 1,
  },
  orderText: {
    fontFamily: senBold,
    fontSize: oneFourFontPixel,
  },
  desText: {
    fontFamily: senMedium,
    fontSize: oneTwoFontPixel,
  },
  timeText: {
    fontFamily: senExtraBold,
    fontSize: oneThreeFontPixel,
  },
  timeView: {
    paddingTop: 24,
  },
  homeContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: responsive.heightPixel(40),
    borderRadius: 20,
    flexDirection: 'row',
  },
  homeView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 15,
  },
  addContainer : {
    flex:1,
  },
  addText : {
    fontFamily: senBold,
    fontSize: oneFiveFontPixel
  }, 
  otherText : {
    fontFamily: senRegular,
    fontSize: oneFourFontPixel,
  }, 
  add : {
    fontFamily: senRegular,
    fontSize: oneThreeFontPixel
  }
});
