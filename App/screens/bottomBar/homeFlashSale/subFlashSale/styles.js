import {Platform, StyleSheet} from 'react-native';
import {colors} from '../../../../utils/colors';
import {
  TwoZeroFontPixel,
  oneEightFontPixel,
  oneFiveFontPixel,
  oneThreeFontPixel,
  oneTwoFontPixel,
  senBold,
  senExtraBold,
  senMedium,
  twoTwoFontPixel,
} from '../../../../utils/fontsSize';
import responsive from '../../../../utils/styles/responsive';

export const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
  imgView: {
    backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: '100%',
    resizeMode: 'stretch',
  },
  iconView: {
    backgroundColor: colors.WHITE_COLOR,
    height: 45,
    width: 45,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8790de',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 20,
  },
  arrowImg: {
    height: 12,
    width: 22,
    resizeMode: 'cover',
  },
  flexView: {
    width: '100%',
    paddingHorizontal: 15,
    flexDirection: 'row',
    position: 'absolute',
    top: Platform.OS === 'android' ? 20 :  50,
  },
  titleView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  titleText: {
    color: colors.WHITE_COLOR,
    fontFamily: senBold,
    fontSize: responsive.fontPixel(18),
  },
  drawerView: {
    borderRadius: 14,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
  },
  secondView: {
    flex: 1,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    marginTop: -20,
  },
  flashSale: {
    backgroundColor: '#f07373',
    paddingHorizontal: 10,
    flexDirection: 'row',
    paddingVertical: Platform.OS === 'android' ? 10 : 14,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
  saleView: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  saleText: {
    color: colors.WHITE_COLOR,
    fontFamily: senExtraBold,
    fontSize: oneEightFontPixel,
  },
  availableView: {
    justifyContent: 'center',
  },
  availableText: {
    color: colors.WHITE_COLOR,
    fontFamily: senBold,
  },
  cameraView: {
    paddingHorizontal: 15,
    marginVertical: 10,
    paddingRight: 100,
  },
  cameraText: {
    fontFamily: senBold,
    fontSize: twoTwoFontPixel,
    lineHeight: Platform.OS === 'android' ? 28 : 35,
  },
  priceView: {
    paddingHorizontal: 15,
    flexDirection: 'row',
  },
  priceText: {
    color: colors.BUTTON_BACKGROUND_COLOR,
    fontFamily: senExtraBold,
    fontSize: twoTwoFontPixel,
  },
  checkPriceText: {
    fontFamily: senMedium,
    fontSize: oneThreeFontPixel,
    textDecorationLine: 'line-through',
  },
  flexImagView: {
    flexDirection: 'row',
  },
  numberText: {
    alignSelf: 'center',
    paddingLeft: 8,
    fontFamily: senBold,
    fontSize: oneFiveFontPixel,
  },
  line: {
    borderWidth: 0.6,
    width: '90%',
    alignSelf: 'center',
    marginVertical: 15,
  },
  detailProView: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomStartRadius: 15,
    borderBottomEndRadius: 15,
  },
  detailProText: {
    fontFamily: senBold,
    fontSize: oneFiveFontPixel,
  },
  nameText: {
    fontFamily: senMedium,
    lineHeight: 25,
    fontSize: oneTwoFontPixel,
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
    marginHorizontal: 15,
  },
  buttonBackView: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingBottom: 10,
    paddingTop: 10,
  },
  buttonView: {
    flex: 1,
  },
});
