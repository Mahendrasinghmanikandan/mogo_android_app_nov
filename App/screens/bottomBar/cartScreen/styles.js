import {Platform, StyleSheet} from 'react-native';
import {colors} from '../../../utils/colors';
import {
  oneThreeFontPixel,
  oneTwoFontPixel,
  senBold,
  senExtraBold,
  senMedium,
  senRegular,
  senSemiBold,
} from '../../../utils/fontsSize';
import responsive from '../../../utils/styles/responsive';

export const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
  sunViewContainer: {
    flex: 1,
    borderTopStartRadius: 35,
    borderTopEndRadius: 35,
    paddingVertical: 10,
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
    marginHorizontal: 15,
  },
  renderView: {
    marginHorizontal: 15,
    marginVertical: 5,
    paddingVertical: Platform.OS === 'android' ? 10 : 15,
    flexDirection: 'row',
    borderRadius: 15,
    paddingHorizontal: 13,
  },
  imgView: {
    backgroundColor: '#f6f6f6',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  plusView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  backView: {
    backgroundColor: colors.BUTTON_BACKGROUND_COLOR,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 8,
  },
  titleText: {
    fontFamily: senMedium,
    fontSize: oneTwoFontPixel,
  },
  tbText: {
    fontFamily: senRegular,
    fontSize: responsive.fontPixel(9),
  },
  priceText: {
    fontFamily: senExtraBold,
    color: colors.BUTTON_BACKGROUND_COLOR,
  },
  totalContainer: {
    backgroundColor: 'pink',
    position: 'absolute',
    bottom: 55,
    width: '100%',
    paddingVertical: Platform.OS === 'android' ? 15 : 20,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    flexDirection: 'row',
  },
  ruText: {
    fontFamily: senExtraBold,
    fontSize: responsive.fontPixel(21),
  },
  buttonView: {
    width: '30%',
    borderRadius: 40,
    height: 40,
  },
  flexOne: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 15,
  },
  textFleView: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    width: '100%',
    marginVertical: 10,
  },
  totalView: {
    flex: 1,
    justifyContent: 'center',
  },
  totalText: {
    fontFamily: senBold,
    fontSize: oneThreeFontPixel,
  },
  ruView: {
    justifyContent: 'center',
  },
  text: {
    fontFamily: senRegular,
    fontSize: oneThreeFontPixel,
  },
  totalMainContainer: {
    backgroundColor: 'pink',
    flex: 0.3,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
  },
});
