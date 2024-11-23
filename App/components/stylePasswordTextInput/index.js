import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  oneFiveFontPixel,
  oneFourFontPixel,
  oneSixFontPixel,
  oneThreeFontPixel,
  senBold,
  senMedium,
} from '../../utils/fontsSize';
import {ThemeContext} from '../../contextes/themeContext';
import {useContext} from 'react';
import {colors} from '../../utils/colors';
import responsive from '../../utils/styles/responsive';
import Icon, {Icons} from '../../utils/icon';

const StyleTextInput = props => {
  const {
    secureTextEntry,
    title,
    placeholderText,
    placeholder,
    dropDown,
    customView,
    change,
    keyboard,
    changePress,
    handleChange,
    name,
    value,
    handleTextBoxChange,
    maxLength,
    imageSource,

    currentField,
    validName,
    errors,
  } = props;
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  return (
    <View>
      <Text style={[styles.text, {color: activeColors.WHITE_TEXT_COLOR}]}>
        {title}
      </Text>
      {errors && (
        <View>
          <Text style={{color: 'red'}}>{errors}</Text>
        </View>
      )}
      <View
        style={[
          styles.flexView,
          {
            backgroundColor: activeColors.CHANGE_PASSWORD_INPUT,
            borderColor: activeColors.CHANGE_PASSWORD_BORED_COLOR,
            ...customView,
          },
        ]}>
        <View style={[styles.inputView]}>
          <TextInput
            onChangeText={e => {
              handleChange(currentField, e, validName);
            }}
            value={String(value)}
            placeholder={placeholder}
            style={[styles.inputText, {color: activeColors.DES_TEXT_COLOR}]}
            placeholderTextColor={'gray'}
            keyboardType={keyboard ? 'numeric' : 'default'}
            maxLength={maxLength ? 10 : 1000}
          />
        </View>
        {dropDown === true && (
          <TouchableOpacity style={styles.iconView}>
            <Icon
              type={Icons.Entypo}
              name={'chevron-small-down'}
              color={'#979797'}
              size={20}
            />
          </TouchableOpacity>
        )}
        {change === true && (
          <TouchableOpacity style={styles.changeView} onPress={changePress}>
            <Text style={styles.changeText}>Change</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontFamily: senMedium,
    fontSize: oneFourFontPixel,
    fontWeight: '600',
  },
  inputView: {
    flex: 1,
    justifyContent: 'center',
  },
  inputText: {
    fontFamily: senMedium,
    fontSize: oneFourFontPixel,
    justifyContent: 'center',
  },
  flexView: {
    flexDirection: 'row',
    height: responsive.heightPixel(40),
    borderColor: '#ebf0ff',
    borderWidth: 1,
    marginVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  iconView: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  changeView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeText: {
    color: colors.BUTTON_BACKGROUND_COLOR,
    fontFamily: senMedium,
    fontSize: oneThreeFontPixel,
  },
});

export default StyleTextInput;
