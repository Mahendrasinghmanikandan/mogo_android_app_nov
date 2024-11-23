import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {ThemeContext} from '../../contextes/themeContext';
import {colors} from '../../utils/colors';
import {
  oneFiveFontPixel,
  oneFourFontPixel,
  oneSixFontPixel,
  oneThreeFontPixel,
  senBold,
  senExtraBold,
  senMedium,
  senRegular,
} from '../../utils/fontsSize';

const ToggleSwitchButton = props => {
  const {theme, UpdateTheme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];
  const [isToggled, setIsToggled] = useState(false);
  const [isActive, setIsActive] = useState(theme.mode !== 'dark');

  const {title, themeText} = props;

  const onPress = () => {
    setIsToggled(!isToggled);
    UpdateTheme();
  };

  return (
    <View
      style={[
        styles.viewContainer,
        {backgroundColor: activeColors.DRAWER_COLOR},
      ]}>
      <View style={styles.titleContainer}>
        {themeText === true ? (
          <Text
            style={[styles.titleText, {color: activeColors.WHITE_TEXT_COLOR}]}>
            {title}
          </Text>
        ) : (
          <Text
            style={[styles.settingText, {color: activeColors.DES_TEXT_COLOR}]}>
            {title}
          </Text>
        )}
      </View>
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[
            styles.container,
            isToggled && styles.activeContainer,
            {backgroundColor: isToggled === true ? '#5059aa' : '#c5c5c7'},
            {width: isToggled === true ? 35 : 35},
            {height: isToggled === true ? 16 : 14},
            {shadowColor: isToggled === true ? '#b1b1b4' : null},
          ]}
          onPress={onPress}>
          <View
            style={[
              styles.toggle,
              isToggled && styles.activeToggle,

              {
                backgroundColor:
                  isToggled === true
                    ? colors.BUTTON_BACKGROUND_COLOR
                    : '#ffffff',
              },
            ]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  viewContainer: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 15,
    borderRadius: 10,
    justifyContent: 'center',
    marginBottom: 10,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  activeContainer: {
    backgroundColor: 'orange',
  },
  container: {
    borderRadius: 15,
    backgroundColor: '#ccc',
    justifyContent: 'center',
  },
  toggle: {
    width: 18,
    height: 18,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 10,
  },
  activeToggle: {
    transform: [{translateX: 18}],
  },
  toggleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  titleText: {
    fontFamily: senBold,
    fontSize: oneFiveFontPixel,
  },
  settingText: {
    fontFamily: senRegular,
    fontSize: oneFourFontPixel,
  },
});

export default ToggleSwitchButton;
