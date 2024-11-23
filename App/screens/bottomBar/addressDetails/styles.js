import {StyleSheet} from 'react-native';
import {
  oneFourFontPixel,
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
    paddingVertical: 25,
  },
  flexView: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  deliveryAddText: {
    fontFamily: senBold,
    fontSize: oneFourFontPixel,
    flex: 1,
  },
  changeText: {
    color: colors.BUTTON_BACKGROUND_COLOR,
    fontFamily: senBold,
    fontSize: oneFourFontPixel,
  },
  addView: {
    marginVertical: 20,
    paddingRight: 50,
    paddingHorizontal: 20,
  },
  addText: {
    fontFamily: senMedium,
    lineHeight: 23,
  },
  img: {
    width: '100%',
  },
  payDetailView: {
    position: 'absolute',
    top: 10,
    paddingHorizontal: 15,
  },
  textFleView: {
    // backgroundColor: 'pink',
    position: 'absolute',
    top: 50,
    width: '100%',
    paddingHorizontal: 15,
    flexDirection: 'row',
  },
  totalView: {
    flex: 1,
    // backgroundColor: 'red',
    justifyContent: 'center',
  },
  totalText: {
    fontFamily: senRegular,
    fontSize: oneThreeFontPixel,
  },
  ruText: {
    justifyContent: 'center',
  },
  line : {
    borderWidth: 0.5,
    position: 'absolute',
    width: '90%',
    top : 120,
    borderStyle: 'dashed',
    alignSelf: 'center',
  },
  totalRuText : {
    fontFamily: senBold,
    fontSize: oneThreeFontPixel,

  }
});
