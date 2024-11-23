import {StyleSheet} from 'react-native';
import {colors} from '../../../utils/colors';

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
  profileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgView: {
    paddingHorizontal: 8,
    borderRadius: 50,
  },
  editImg: {
    height: 20,
    width: 20,
    resizeMode: 'stretch',
  },
  editContainer: {
    backgroundColor: colors.BUTTON_BACKGROUND_COLOR,
    paddingHorizontal: 7,
    paddingVertical: 7,
    borderRadius: 20,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  img: {
    height: 100,
    width: 100,
    resizeMode: 'stretch',
    borderRadius: 50,
  },
});
