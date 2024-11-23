import {Platform, StyleSheet} from 'react-native';
import {senBold} from '../../../utils/fontsSize';
import {colors} from '../../../utils/colors';

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
  renderView: {
    paddingVertical: Platform.OS === 'android' ? 10 : 13,
    marginVertical: Platform.OS === 'android' ? 8 : 10,
    paddingHorizontal: 15,
    borderRadius: 13,
    flexDirection: 'row',
  },
  imgView: {
    backgroundColor: '#e9e9e9',
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  titleView: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  titleText: {
    fontFamily: senBold,
  },
  blankRoundView: {
    height: 30,
    width: 30,
    borderRadius: 50,
    borderColor: colors.BUTTON_BACKGROUND_COLOR,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  iconView: {
    position: 'absolute',
    bottom: 15,
    width: '100%',
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
