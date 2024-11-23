import {StyleSheet} from 'react-native';
import {colors} from '../../../utils/colors';

export const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: colors.dark.SCREEN_BACKGROUND_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeContainer: {
    // backgroundColor: 'green',
  },
  container: {
    width: 45,
    height: 25,
    borderRadius: 15,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    paddingHorizontal: 2,
    marginBottom: 50,
    marginLeft: 100,
  },
  toggle: {
    width: 20,
    height: 20,
    borderRadius: 13,
    backgroundColor: '#fff',
  },
  activeToggle: {
    transform: [{translateX: 20}],
  },
});
