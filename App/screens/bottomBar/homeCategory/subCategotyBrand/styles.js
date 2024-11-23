import {Platform, StyleSheet} from 'react-native';
import {colors} from '../../../../utils/colors';
import {
  oneEightFontPixel,
  senBold,
  senMedium,
  twoTwoFontPixel,
} from '../../../../utils/fontsSize';

export const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
  img: {
    width: '100%',
    resizeMode: 'stretch',
  },
  iconView: {
    backgroundColor: colors.WHITE_COLOR,
    height: 45,
    width: 45,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8790de',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 20,
    position: 'absolute',
    top: Platform.OS === 'android' ?  10 :  50,
    left: 15,
  },
  arrowImg: {
    height: 12,
    width: 22,
    resizeMode: 'cover',
  },
  nameView: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  nameText: {
    color: colors.BLACK_COLOR,
    fontFamily: senBold,
    fontSize: twoTwoFontPixel,
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginVertical: 7,
  },
});
