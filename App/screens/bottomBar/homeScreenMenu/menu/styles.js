const {StyleSheet, Platform} = require('react-native');
import {colors} from '../../../../utils/colors';
import {senRegular} from '../../../../utils/fontsSize';
import {oneZeroFontPixel} from '../../../../utils/fontsSize';
import responsive from '../../../../utils/styles/responsive';

export const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
  borderRadiusContainer: {
    flex: 1,
    borderTopStartRadius: 35,
    borderTopEndRadius: 35,
    paddingVertical: 20,
  },
  menuRenderView: {
    height:  Platform.OS === 'android' ? 100 : 120,
    width: responsive.widthPixel(71),
    borderRadius: 100,
    borderColor: colors.MENU_BORDER_COLOR,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: responsive.widthPixel(13),
    marginVertical: 10,
  },
  subView: {
    backgroundColor: '#f0f3fd',
    justifyContent: 'center',
    height: Platform.OS === 'android' ? 85 : 100,
    width: 60,
    borderRadius: 50,
  },
  imgView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  nameView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameText: {
    fontFamily: senRegular,
    fontSize: oneZeroFontPixel,
    color: colors.BLACK_COLOR,
    fontWeight: '500',
    textAlign: 'center',
  },
});
