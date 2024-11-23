import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon, {Icons} from '../../utils/icon';
import {ThemeContext} from '../../contextes/themeContext';
import {colors} from '../../utils/colors';
import {
  senBold,
  oneFiveFontPixel,
  senRegular,
  oneThreeFontPixel,
  senMedium,
} from '../../utils/fontsSize';
import STRINGS from '../../utils/constants/string';

const ViewMoreComponent = () => {
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];
  const [textVisible, setTextVisible] = useState(false);

  const viewMorePress = () => {
    setTextVisible(!textVisible);
  };

  return (
    <>
      <View style={[styles.desBox, {borderColor: activeColors.BORDER_COLOR}]}>
        <Text style={[styles.desText, {color: activeColors.WHITE_TEXT_COLOR}]}>
          {STRINGS.productDetails.description}
        </Text>
        <Text style={[styles.conText, {color: activeColors.DES_TEXT_COLOR}]}>
          {STRINGS.productDetails.con}
        </Text>
        <View style={{height: 10}}></View>
        {textVisible === true && (
          <>
            <Text
              style={[styles.conText, {color: activeColors.DES_TEXT_COLOR}]}>
              {STRINGS.productDetails.con1}
            </Text>
            <View style={{height: 10}}></View>
            <Text
              style={[styles.conText, {color: activeColors.DES_TEXT_COLOR}]}>
              {STRINGS.productDetails.con2}
            </Text>
          </>
        )}

        <TouchableOpacity
          style={styles.viewMoreContainer}
          onPress={viewMorePress}>
          <View style={styles.viewMoreView}>
            <Text style={styles.moreText}>
              {STRINGS.productDetails.viewMore}
            </Text>
          </View>

          <View style={styles.moreIconView}>
            <Icon
              type={Icons.Entypo}
              name={'chevron-down'}
              color={colors.BUTTON_BACKGROUND_COLOR}
              size={20}
            />
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export const styles = StyleSheet.create({
  desText: {
    fontFamily: senBold,
    fontSize: oneFiveFontPixel,
    marginVertical: 10,
  },
  desBox: {
    borderRadius: 15,
    borderBottomWidth: 2.5,
    paddingHorizontal: 15,
  },
  conText: {
    fontFamily: senRegular,
    lineHeight: 18,
  },
  viewMoreContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  viewMoreView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 2,
  },
  moreText: {
    color: colors.BUTTON_BACKGROUND_COLOR,
    fontSize: oneThreeFontPixel,
    fontFamily: senMedium,
  },
  moreIconView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ViewMoreComponent;
