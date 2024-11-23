import {Platform, StyleSheet} from 'react-native';
import {oneFourFontPixel, senBold} from '../../../utils/fontsSize';

export const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
  sunViewContainer: {
    flex: 1,
    borderTopStartRadius: 35,
    borderTopEndRadius: 35,
    paddingVertical: 25,
    paddingHorizontal: 18,
  },
  renderView: {
    backgroundColor: 'orange',
    marginVertical: Platform.OS === 'android' ? 8 : 10,
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 20,
  },
  titleView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 50,
  },
  imgView: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 10,
  },
  title: {
    fontFamily: senBold,
    fontSize: oneFourFontPixel,
  },
});
