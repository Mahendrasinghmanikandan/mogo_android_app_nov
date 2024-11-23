import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {colors} from '../../utils/colors';
import {ThemeContext} from '../../contextes/themeContext';
import {useContext} from 'react';

const HomeSafeAreaBottom = () => {
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];
  return <SafeAreaView style={{backgroundColor : activeColors.FLEX_VIEW_COLOR}} />;
};

export default HomeSafeAreaBottom;
