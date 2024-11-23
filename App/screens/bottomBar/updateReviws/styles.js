import {
  oneFiveFontPixel,
  oneThreeFontPixel,
  senBold,
  senMedium,
} from '../../../utils/fontsSize';

const {StyleSheet} = require('react-native');

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
  text: {
    fontFamily: senMedium,
    fontSize: oneFiveFontPixel,
  },
  inputView: {
    backgroundColor: 'pink',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    height: 150,
    marginVertical: 10,
    borderWidth: 1,
  },
  inputText: {
    fontFamily: 'senmedium',
  },
  thinkText: {
    fontFamily: senMedium,
    fontSize: oneThreeFontPixel,
  },
  rateText: {
    fontFamily: senBold,
    fontSize: oneFiveFontPixel,
  },
  starView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  yellowImg: {
    marginLeft: 10,
  },
});
