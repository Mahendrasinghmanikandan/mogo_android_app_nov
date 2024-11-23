/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {colors, MOGO_COLORS} from '../../utils/colors';
import responsive from '../../utils/styles/responsive';
import {
  oneFourFontPixel,
  oneThreeFontPixel,
  senMedium,
} from '../../utils/fontsSize';

const MyButton = props => {
  const {text, onPress, buttonView, loading, customColor} = props;
  return (
    <TouchableOpacity
      style={[
        styles.view,
        {
          ...buttonView,
          backgroundColor: customColor || colors.BUTTON_BACKGROUND_COLOR,
          marginHorizontal: customColor ? 0 : 20,
        },
      ]}
      onPress={onPress}>
      {loading ? (
        <ActivityIndicator color={'white'} />
      ) : (
        <Text style={styles.text}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
  view: {
    height: 50,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.WHITE_COLOR,
    fontFamily: senMedium,
    fontSize: oneFourFontPixel,
    fontWeight: '600',
  },
});

export default MyButton;
