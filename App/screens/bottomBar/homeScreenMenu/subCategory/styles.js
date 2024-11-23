import {Platform, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
  sunViewContainer: {
    flex: 1,
    borderTopStartRadius: 35,
    borderTopEndRadius: 35,
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
    marginVertical:  Platform.OS === 'android' ? 3 : 8,
  },
});
