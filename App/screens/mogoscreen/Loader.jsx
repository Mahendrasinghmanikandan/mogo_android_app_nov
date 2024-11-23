/* eslint-disable react-native/no-inline-styles */
import {View, Text, StyleSheet, Image, ActivityIndicator} from 'react-native';
import React, {useContext} from 'react';
import {Window_Size_height} from '../../utils/styles/responsive';
import {colors, MOGO_COLORS} from '../../utils/colors';
import {ThemeContext} from '../../contextes/themeContext';

const Loader = () => {
  const {theme, UpdateTheme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  return (
    <View style={[style.container, {backgroundColor: '#ffffff86'}]}>
      <ActivityIndicator color={MOGO_COLORS.secondaryGreen} size={25} />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
  },
});

export default Loader;
