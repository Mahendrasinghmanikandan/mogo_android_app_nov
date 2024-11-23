import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import {colors} from '../../utils/colors';
import {ThemeContext} from '../../contextes/themeContext';
import {useContext} from 'react';

const BottomSafeAreaView = () => {
  const {theme, UpdateTheme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  return (
    <SafeAreaView
      style={{backgroundColor: activeColors.SCREEN_BACKGROUND_COLOR}}
    />
  );
};

export default BottomSafeAreaView;
