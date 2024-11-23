import {Platform, StyleSheet} from 'react-native';
import {
  TwoZeroFontPixel,
  nineFontPixel,
  oneFourFontPixel,
  oneThreeFontPixel,
  oneZeroFontPixel,
  robotoMedium,
  senBold,
  senRegular,
} from '../../../utils/fontsSize';
import {colors, MOGO_COLORS} from '../../../utils/colors';

export const styles = StyleSheet.create({
  viewContainer: {},
  bannerView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  img: {
    borderRadius: 8,
    alignSelf: 'center',
    width: Platform.OS === 'android' ? '101%' : '101%',
    resizeMode: 'stretch',
  },
  container: {
    paddingHorizontal: 10,
  },
  renderView: {
    marginVertical: 10,
    width: Platform.OS === 'android' ? '100%' : '100%',
  },
  dot: {
    width: 20,
    height: 10,
    borderRadius: 10,
    marginLeft: -10,
    backgroundColor: MOGO_COLORS.secondaryGreen,
  },
  inActiveDot: {
    width: 15,
    height: 15,
    backgroundColor: '#ffffff',
  },
  containerDot: {
    paddingVertical: 5,
    marginTop: -40,
  },
  menuRenderView: {
    marginLeft: 20,
    height: Platform.OS === 'android' ? 100 : 120,
    width: Platform.OS === 'android' ? 80 : 95,
    borderRadius: 100,
    borderColor: colors.MENU_BORDER_COLOR,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subView: {
    backgroundColor: '#f0f3fd',
    justifyContent: 'center',
    height: Platform.OS === 'android' ? 80 : 100,
    width: Platform.OS === 'android' ? 65 : 75,
    borderRadius: 50,
  },
  imgView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  nameView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameText: {
    fontFamily: senRegular,
    fontSize: Platform.OS === 'android' ? nineFontPixel : oneZeroFontPixel,
    color: colors.BLACK_COLOR,
    fontWeight: '500',
  },
  promoView: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  promoText: {
    fontFamily: senBold,
    fontSize: TwoZeroFontPixel,
  },
  promoRenderView: {
    marginLeft: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  promoImgView: {
    height: 120,
  },
  promoTitleText: {
    color: colors.BUTTON_BACKGROUND_COLOR,
    fontFamily: senBold,
    fontSize: oneFourFontPixel,
  },
  banner2Img: {
    width: '90%',
    borderRadius: 10,
    resizeMode: 'stretch',
  },
  categoryRenderView: {
    marginLeft: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    color: colors.WHITE_COLOR,
    fontFamily: robotoMedium,
    fontWeight: 'bold',
    fontSize: oneThreeFontPixel,
  },
  categoryTextView: {
    position: 'absolute',
    bottom: 10,
  },
  flatListView: {
    marginHorizontal: 15,
    justifyContent: 'space-between',
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
    marginHorizontal: 15,
    paddingVertical: Platform.OS === 'android' ? 8 : 0,
  },
});
