import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import {ThemeContext} from '../../contextes/themeContext';
import {useContext} from 'react';
import { colors } from '../../utils/colors';

const TabSafeAreaView = () => {
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];
  return <SafeAreaView style={{backgroundColor: activeColors.PRIMARY_COLOR}} />;
};

export default TabSafeAreaView;
