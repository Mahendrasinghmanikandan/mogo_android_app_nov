import {StyleSheet, Dimensions} from 'react-native';
import responsive from '../../../utils/styles/responsive';
import {
  TwoSevenFontPixel,
  oneThreeFontPixel,
  senBold,
  senMedium,
} from '../../../utils/fontsSize';
import {colors} from '../../../utils/colors';

export const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
  },
  item: {
    width: Dimensions.get('window').width,
  },
  imgView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: responsive.heightPixel(250),
  },
  dotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  dot: {
    height: 6,
    borderRadius: 15,
    backgroundColor: 'white',
    marginHorizontal: 5,
  },
  titleView: {
    marginLeft: 20,
    marginTop: responsive.heightPixel(30),
    width: responsive.widthPixel(300),
  },
  titleText: {
    marginVertical: 10,
    fontFamily: senBold,
    fontSize: TwoSevenFontPixel,
    lineHeight: 50,
  },
  subTitleView: {
    marginHorizontal: 20,
    marginTop: responsive.heightPixel(10),
  },
  subText: {
    fontFamily: senMedium,
    fontSize: responsive.fontPixel(14.6),
    lineHeight: 25,
  },
  btnDotContainer: {
    paddingLeft: 20,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextView: {
    backgroundColor: colors.BUTTON_BACKGROUND_COLOR,
    height: responsive.heightPixel(45),
    width: responsive.widthPixel(150),
    justifyContent: 'center',
    alignItems: 'center',
    borderTopStartRadius: 35,
  },
  btnText: {
    color: 'white',
    fontFamily: senMedium,
    fontSize: oneThreeFontPixel,
  },
});
