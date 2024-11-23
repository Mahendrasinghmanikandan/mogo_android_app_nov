import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {useContext} from 'react';
import {ThemeContext} from '../../contextes/themeContext';
import {colors} from '../../utils/colors';

const HomeSafeAreaView = () => {
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];
  return (
    <SafeAreaView style={{backgroundColor: activeColors.HOME_SAFE_AREA_VIEW}} />
  );
};

export default HomeSafeAreaView;
