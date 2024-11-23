import {Platform, StyleSheet} from 'react-native';
import responsive from '../../../utils/styles/responsive';
import {
  TwoFourFontPixel,
  oneFiveFontPixel,
  oneFourFontPixel,
  oneSixFontPixel,
  oneThreeFontPixel,
  senBold,
  senExtraBold,
  senMedium,
  senRegular,
} from '../../../utils/fontsSize';
import {colors} from '../../../utils/colors';

export const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
  oneViewContainer: {
    paddingBottom: 20,
  },
  SecondViewContainer: {
    borderStartEndRadius: 100,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  viewImg: {
    paddingLeft:
      Platform.OS === 'android'
        ? responsive.widthPixel(40)
        : responsive.widthPixel(70),
  },
  dropDownView: {
    position: 'absolute',
    right: 20,
    bottom: 0,
    paddingVertical: Platform.OS === 'android' ? 5 : 10,
    borderRadius: 10,
    paddingHorizontal: Platform.OS === 'android' ? 5 : 10,
  },
  flexView: {
    flexDirection: 'row',
  },
  iconView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    borderWidth: 0.6,
    marginTop: 10,
  },
  itemImg: {
    marginTop: 10,
  },
  maneText: {
    fontFamily: senBold,
    fontSize: responsive.fontPixel(22),
    paddingRight: 100,
    lineHeight:  Platform.OS === 'android' ? 30 : 40,
  },
  priceText: {
    color: colors.BUTTON_BACKGROUND_COLOR,
    fontFamily: senExtraBold,
    fontSize: responsive.fontPixel(22),
    lineHeight: 40,
  },
  PriceflexView: {
    flexDirection: 'row',
  },
  priceView: {
    flex: 1,
    justifyContent: 'center',
  },
  startView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rentView: {
    flex: 1,
    justifyContent: 'center',
  },
  rentText: {
    fontFamily: senBold,
    textAlign: 'right',
    fontSize: oneFiveFontPixel,
  },
  img: {
    height: 15,
    width: 15,
    resizeMode: 'stretch',
  },
  saleText: {
    fontFamily: senMedium,
  },
  FlexContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  flexOne: {
    flex: 1,
  },
  flexTwo: {
    flex: 1,
  },
  roundView: {
    backgroundColor: 'yellow',
    height: 20,
    width: 20,
    borderRadius: 20,
  },
  roundFlexView: {
    flexDirection: 'row',
  },
  roundBackView: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 10,
    marginTop: 5,
  },
  text: {
    fontFamily: senBold,
  },
  sizeFlexView: {
    flexDirection: 'row',
    marginVertical: 15,
  },
  sizeView: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  sizeText: {
    fontFamily: senMedium,
    fontSize: oneFiveFontPixel,
  },
  desText: {
    fontFamily: senBold,
    fontSize: oneFiveFontPixel,
    marginVertical: 10,
  },
  conText: {
    fontFamily: senRegular,
    lineHeight: 20,
  },
  viewMoreContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  viewMoreView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 2,
  },
  moreText: {
    color: colors.BUTTON_BACKGROUND_COLOR,
    fontSize: oneThreeFontPixel,
    fontFamily: senMedium,
  },
  moreIconView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  desBox: {
    borderRadius: 15,
    borderBottomWidth: 2.5,
  },
  nameText: {
    fontSize: oneSixFontPixel,
    marginHorizontal: -10,
  },
  starFlexView: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  starFlexContainer: {
    flexDirection: 'row',
    marginTop: -5,
  },
  startRowView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 5,
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
  },
  drawerView: {
    borderRadius: 15,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
  },
  buttonBackView: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  buttonView: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    position: 'absolute',
    width: '100%',
    bottom: 0,
    paddingBottom: 30,
  },
  flexSaveAddView: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  addNewAddText: {
    color: colors.BUTTON_BACKGROUND_COLOR,
    alignSelf: 'flex-end',
    fontFamily: senBold,
  },
  addNewAddView: {
    flex: 1,
  },
  addContainer: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
    marginVertical: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
  },
  homeFlexView: {
    flexDirection: 'row',
  },
  imgSourceView: {
    paddingRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameText: {
    fontFamily: senBold,
    fontSize: oneThreeFontPixel,
  },
  nameView: {
    justifyContent: 'center',
    flex: 1,
  },
  titleView: {
    // backgroundColor: 'red',
    marginTop: 10,
  },
  titleText: {
    fontFamily: senBold,
    fontSize: oneThreeFontPixel,
  },
  numberText: {
    fontFamily: senMedium,
    fontSize: oneThreeFontPixel,
  },
  addressText: {
    fontFamily: senMedium,
    fontSize: oneThreeFontPixel,
    lineHeight: 24,
  },
});
