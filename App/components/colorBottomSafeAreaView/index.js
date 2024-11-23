import {View, Text, SafeAreaView} from 'react-native';
import React, { useContext } from 'react';
import { ThemeContext } from '../../contextes/themeContext';
import { colors } from '../../utils/colors';

const ColorBottomSafeAreaView = () => {
    const {theme} = useContext(ThemeContext);
    const activeColors = colors[theme.mode];
  return (
    <SafeAreaView style={{backgroundColor: activeColors.COLOR_BOTTOM_SAFE_AREA_VIEW}}/>
  );
};

export default ColorBottomSafeAreaView;
