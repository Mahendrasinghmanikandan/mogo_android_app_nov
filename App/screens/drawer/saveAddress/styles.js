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
  },
  iconView: {
    position: 'absolute',
    bottom: 15,
    width: '90%',
    alignSelf: 'center',
  },
  iconTouchView: {
    backgroundColor: colors.BUTTON_BACKGROUND_COLOR,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    height: 60,
    width: 60,
  },
});
