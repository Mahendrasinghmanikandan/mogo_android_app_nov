import {StyleSheet} from 'react-native';
import {
  oneFiveFontPixel,
  oneFourFontPixel,
  oneThreeFontPixel,
  senBold,
  senMedium,
} from '../../../utils/fontsSize';
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
  topTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: oneFourFontPixel,
  },
  bottomLine: {
    borderColor: colors.BUTTON_BACKGROUND_COLOR,
    borderBottomWidth: 3,
    marginTop: 10,
    width: 50,
    alignSelf: 'center',
  },
  mainContainer: {
    marginVertical: 10,
    paddingVertical: 20,
    borderRadius: 10,
  },
  orderIdView: {
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  orderIdText: {
    fontFamily: senBold,
    flex: 1,
    fontSize: oneThreeFontPixel,
  },
  timeText: {
    fontFamily: senMedium,
  },
  line: {
    borderWidth: 1,
    marginVertical: 10,
  },
  flexView: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  nameText: {
    fontFamily: senBold,
    fontSize: oneThreeFontPixel,
  },
  subNameText: {
    fontFamily: senBold,
    fontSize: oneThreeFontPixel,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 35,
  },
  detailView: {
    flex: 1,
    justifyContent: 'center',
  },
  typeView: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 15,
  },
  typeText: {
    alignSelf: 'flex-end',
    fontFamily: senBold,
    fontSize: oneThreeFontPixel,
  },
  detailText: {
    fontSize: oneThreeFontPixel,
    color: colors.WHITE_COLOR,
    fontFamily: senBold,
  },
  subDetailView: {
    backgroundColor: colors.BUTTON_BACKGROUND_COLOR,
    width: 120,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },
});
