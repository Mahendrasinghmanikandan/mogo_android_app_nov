import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {useContext} from 'react';
import {ThemeContext} from '../../contextes/themeContext';
import {colors} from '../../utils/colors';

export function SafeAreaViewComponents({}) {
  const {theme, UpdateTheme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];
  return (
    <SafeAreaView
      style={{
        backgroundColor: activeColors.SAFE_AREA_COLOR,
      }}
    />
  );
}
