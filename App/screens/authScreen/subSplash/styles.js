import {Platform, StyleSheet} from 'react-native';
import {
  oneEightFontPixel,
  senBold,
  senExtraBold,
  senSemiBold,
} from '../../../utils/fontsSize';
import responsive from '../../../utils/styles/responsive';

export const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
  imgView: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    width: '100%',
    paddingBottom: 10,
  },
  img: {
    width: '100%',
    resizeMode: 'stretch',
    height:
      Platform.OS === 'android'
        ? responsive.heightPixel(450)
        : responsive.heightPixel(400),
  },
  img2View: {
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  conText: {
    fontFamily: senExtraBold,
    fontSize: responsive.fontPixel(28),
  },
  conView: {
    marginLeft: 20,
    marginVertical: 10,
    width:
      Platform.OS === 'android'
        ? responsive.widthPixel(230)
        : responsive.widthPixel(250),
    zIndex: 999,
  },
  splashImg2Img: {
    height:
      Platform.OS === 'android'
        ? responsive.heightPixel(450)
        : responsive.heightPixel(400),
    resizeMode: 'contain',
  },
});
