import {StyleSheet} from 'react-native';
import {oneThreeFontPixel, senBold} from '../../../utils/fontsSize';

export const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
  sunViewContainer: {
    flex: 1,
    borderTopStartRadius: 35,
    borderTopEndRadius: 35,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  flexView: {
    flexDirection: 'row',
    marginTop: 20,
  },
  flexTouchView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  imgView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: senBold,
    fontSize: oneThreeFontPixel,
  },
});
