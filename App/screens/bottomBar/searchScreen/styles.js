import {StyleSheet} from 'react-native';
import {
  oneThreeFontPixel,
  oneTwoFontPixel,
  senMedium,
  senRegular,
} from '../../../utils/fontsSize';

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
  recentView: {
    paddingHorizontal: 15,
    marginVertical: 15,
  },
  recentText: {
    fontSize: oneThreeFontPixel,
    fontFamily: senRegular,
  },
  searchContainer: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    marginBottom: 15,
  },
  titleView: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  titleText: {
    fontFamily: senRegular,
    fontSize: oneTwoFontPixel,
  },
  line: {
    width: '90%',
    borderWidth: 0.5,
    alignSelf: 'center',
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
    marginHorizontal: 15,
  },
});
