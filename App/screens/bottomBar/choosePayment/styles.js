import {Platform, StyleSheet} from 'react-native';
import {
  TwoZeroFontPixel,
  oneEightFontPixel,
  oneFiveFontPixel,
  oneThreeFontPixel,
  senBold,
  senMedium,
  senRegular,
} from '../../../utils/fontsSize';
import {colors} from '../../../utils/colors';

export const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
  sunViewContainer: {
    flex: 1,
    borderTopStartRadius: 35,
    borderTopEndRadius: 35,
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  chooseMethodText: {
    fontFamily: senBold,
    fontSize: TwoZeroFontPixel,
    lineHeight: 35,
  },
  renderView: {
    paddingVertical:  10,
    marginVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 13,
    flexDirection: 'row',
  },
  imgView: {
    backgroundColor: '#e9e9e9',
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  titleView: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  titleText: {
    fontFamily: senBold,
  },
  blankRoundView: {
    height: 28,
    width: 28,
    borderRadius: 50,
    borderColor: colors.BUTTON_BACKGROUND_COLOR,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  addCardView: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    borderColor: colors.BUTTON_BACKGROUND_COLOR,
    borderWidth: 1,
  },
  addCardText: {
    color: colors.BUTTON_BACKGROUND_COLOR,
    fontFamily: senRegular,
    fontSize: oneThreeFontPixel,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(24, 25, 27, 0.9)', // Adjust the opacity as needed
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    width: '70%',
    paddingVertical: 40,
  },
  yuppyText: {
    fontFamily: senBold,
    fontSize: TwoZeroFontPixel,
    color: colors.BLACK_COLOR,
  },
  textView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  animationImg: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  sellerText: {
    fontFamily: senBold,
  },
});
