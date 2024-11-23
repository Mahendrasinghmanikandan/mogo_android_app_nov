import {StyleSheet} from 'react-native';
import {
  oneFourFontPixel,
  oneThreeFontPixel,
  senBold,
  senExtraBold,
  senMedium,
} from '../../../../utils/fontsSize';
import {colors} from '../../../../utils/colors';
import responsive from '../../../../utils/styles/responsive';

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
  endSaleView: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  endText: {
    fontFamily: senBold,
    fontSize: oneFourFontPixel,
  },
  timeText: {
    color: colors.BUTTON_BACKGROUND_COLOR,
    fontFamily: senExtraBold,
    fontSize: oneFourFontPixel,
  },
  imgView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  img: {
    width: '90%',
    resizeMode: 'stretch',
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
    marginHorizontal: 15,
    paddingVertical:  Platform.OS === 'android' ?  8 : 0,
  },
  availableView: {
    paddingHorizontal: 15,
    marginTop: 5,
  },
  availableText: {
    fontFamily: senMedium,
    fontSize: responsive.fontPixel(9.5),
  },
  progressLine: {
    height: 2.5,
    borderRadius: 5,
    marginTop: 8,
  },
  bar: {
    height: 2,
    backgroundColor: '#79c256',
    borderRadius: 10,
   
  },
});
