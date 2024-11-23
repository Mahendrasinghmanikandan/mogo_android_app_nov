import {Platform, StyleSheet} from 'react-native';
import {colors} from '../../../../utils/colors';
import {oneFiveFontPixel, senBold, senExtraBold} from '../../../../utils/fontsSize';

export const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
  sunViewContainer: {
    flex: 1,
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    paddingVertical: 15,
  },
  sliderView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: Platform.OS === 'android' ?  null : '#6f6f6f',
    opacity: Platform.OS === 'android' ? 0.8 : 0.7,
  },
  bannerView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: '105%',
    resizeMode: 'stretch',
    borderRadius: 10,
  },
  titleView: {
    position: 'absolute',
    bottom: 10,
  },
  titleText: {
    color: colors.WHITE_COLOR,
    fontFamily: senExtraBold,
    fontSize: oneFiveFontPixel,
  },
  imgView: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  subImg: {
    width: '31%',
    resizeMode: 'stretch',
  },
  catRenderView: {
    marginVertical:  Platform.OS === 'android' ? 5 : 10,
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
    marginHorizontal: 15,
  },
});
