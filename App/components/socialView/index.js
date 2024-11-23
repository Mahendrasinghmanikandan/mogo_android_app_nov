import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useContext} from 'react';
import {ThemeContext} from '../../contextes/themeContext';
import {colors} from '../../utils/colors';

const SocialView = props => {
  const {imageSource} = props;
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  return (
    <TouchableOpacity
      style={[
        styles.view,
        {backgroundColor: theme.mode === 'dark' ? '#383838' : null},
        {borderColor: theme.mode === 'dark' ? null : activeColors.BORDER_COLOR},
        {borderWidth: theme.mode === 'dark' ? null : 1},
      ]}>
      <Image source={imageSource} />
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
  view: {
    backgroundColor: 'pink',
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SocialView;
