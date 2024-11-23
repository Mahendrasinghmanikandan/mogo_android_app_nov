import {StyleSheet} from 'react-native';
import responsive from '../../../utils/styles/responsive';
import {colors} from '../../../utils/colors';
import {senRegular} from '../../../utils/fontsSize';
import {oneZeroFontPixel} from '../../../utils/fontsSize';

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
    height: 120,
    width: responsive.widthPixel(74),
    borderRadius: 100,
    borderColor: colors.MENU_BORDER_COLOR,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  subView: {
    backgroundColor: '#f0f3fd',
    justifyContent: 'center',
    height: 100,
    width: 65,
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
  row: {
    flex: 1,
    justifyContent: 'space-between',
    marginHorizontal: 15,
  },
});
