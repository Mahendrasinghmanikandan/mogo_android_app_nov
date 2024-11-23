import {View, Text, StatusBar} from 'react-native';
import React from 'react';
import {ThemeContext} from '../../contextes/themeContext';
import {colors} from '../../utils/colors';
import {useContext} from 'react';

const StatusBarComponents = () => {
  const {theme, UpdateTheme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const barStyle = theme.mode === 'dark' ? 'light-content' : 'dark-content';

  return <StatusBar barStyle={barStyle} />;
};

export default StatusBarComponents;
