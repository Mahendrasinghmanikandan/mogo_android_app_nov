import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
  sunViewContainer: {
    flex: 1,
    borderTopStartRadius: 35,
    borderTopEndRadius: 35,
    paddingHorizontal: 15,
    backgroundColor: 'orange',
  },
  imgView: {
    //
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: '110%',
    resizeMode: 'stretch',
  },
  flexView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
