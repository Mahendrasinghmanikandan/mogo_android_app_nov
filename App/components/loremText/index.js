/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import STRINGS from '../../utils/constants/string';
import {ThemeContext} from '../../contextes/themeContext';
import {colors} from '../../utils/colors';
import {
  oneFourFontPixel,
  oneOneFontPixel,
  oneThreeFontPixel,
  oneTwoFontPixel,
  senLight,
  senMedium,
  senRegular,
} from '../../utils/fontsSize';

const LoremText = ({text}) => {
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  return (
    <View>
      <Text
        style={[
          styles.loremText,
          {color: activeColors.DES_TEXT_COLOR, paddingVertical: 2},
        ]}>
        {text}
      </Text>
    </View>
  );
};

export const styles = StyleSheet.create({
  loremText: {
    fontFamily: senMedium,
    lineHeight: 22,
    fontWeight: '300',
    fontSize: oneOneFontPixel,
  },
});

export default LoremText;
