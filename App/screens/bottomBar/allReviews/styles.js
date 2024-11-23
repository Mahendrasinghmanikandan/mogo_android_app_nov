import {StyleSheet} from 'react-native';
import {oneFourFontPixel, senBold, senMedium} from '../../../utils/fontsSize';
import {colors} from '../../../utils/colors';

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
  starFlexContainer: {
    flexDirection: 'row',
    marginTop: -5,
  },
  startRowView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 5,
  },
  text: {
    fontSize: oneFourFontPixel,
    fontFamily: senBold,
    marginBottom: 10,
  },
  buttonView: {
    backgroundColor: colors.BUTTON_BACKGROUND_COLOR,
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  img: {
    height: 15,
    width: 15,
    resizeMode: 'stretch',
  },
  editContainer: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    alignSelf: 'center',
  },
});
