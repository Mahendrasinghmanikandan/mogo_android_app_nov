import {StyleSheet} from 'react-native';
import {
  oneFourFontPixel,
  oneSixFontPixel,
  senBold,
  senRegular
} from '../../../utils/fontsSize';

export const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
  sunViewContainer: {
    flex: 1,
    borderTopStartRadius: 35,
    borderTopEndRadius: 35,
    paddingTop: 15,
    paddingHorizontal: 18,
  },
  settingView: {
    marginTop: 10,
    marginBottom: 15,
  },
  titleText: {
    fontFamily: senBold,
    fontSize: oneSixFontPixel,
  },
  accContainer: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    justifyContent: 'center',
    marginBottom: 10,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  accTitle : {
    fontFamily: senRegular,
    fontSize: oneFourFontPixel,
  }
});
