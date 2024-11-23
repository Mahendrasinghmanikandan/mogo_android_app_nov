import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
  sunViewContainer: {
    flex: 1,
    borderTopStartRadius: 35,
    borderTopEndRadius: 35,
    paddingVertical: 20,
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
    marginHorizontal: 15,
    paddingVertical:  Platform.OS === 'android' ?  8 : 0,
  },
});
