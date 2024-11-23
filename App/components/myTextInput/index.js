/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../utils/colors';
import {oneFourFontPixel, senMedium} from '../../utils/fontsSize';
import {useContext} from 'react';
import {ThemeContext} from '../../contextes/themeContext';
import Icon, {Icons} from '../../utils/icon';

const MyTextInput = props => {
  const {
    imageSource,
    placeholder,
    secureTextEntry,
    value,
    handleTextBoxChange,
    currentField,
    keyboard,
    errors,
    maxLength,
    validName,
  } = props;
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];
  const [isPasswordVisible, setPasswordVisible] = useState(secureTextEntry);

  const toggleVisible = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <>
      <View style={[styles.view, {borderColor: activeColors.BORDER_COLOR}]}>
        <View style={styles.imgView}>
          <Image source={imageSource} />
        </View>

        <View style={styles.inputView}>
          <TextInput
            value={value}
            placeholder={placeholder}
            placeholderTextColor={colors.INPUT_COLOR}
            style={styles.inputText}
            secureTextEntry={isPasswordVisible}
            keyboardType={keyboard ? 'numeric' : 'default'}
            onChangeText={e => {
              handleTextBoxChange(currentField, e, validName);
            }}
            maxLength={maxLength ? 10 : 1000}
          />
        </View>
        {secureTextEntry === true && (
          <TouchableOpacity style={styles.imgView} onPress={toggleVisible}>
            <Icon
              type={Icons.Entypo}
              name={isPasswordVisible ? 'eye-with-line' : 'eye'}
              color={'#979797'}
              size={20}
            />
          </TouchableOpacity>
        )}
      </View>
      {errors && (
        <View style={{paddingHorizontal: 20}}>
          <Text style={{color: 'red'}}>{errors}</Text>
        </View>
      )}
    </>
  );
};

export const styles = StyleSheet.create({
  view: {
    marginVertical: Platform.OS === 'ios' ? 10 : 0,
    marginHorizontal: 20,
    flexDirection: 'row',
    paddingVertical: Platform.OS === 'ios' ? 10 : 0,
    borderColor: colors.BORDER_COLOR,
    borderBottomWidth: 0.9,
    paddingBottom: Platform.OS === 'ios' ? 10 : 0,
  },
  imgView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 15,
  },
  inputView: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 10,
  },
  inputText: {
    fontFamily: senMedium,
    color: colors.INPUT_COLOR,
    fontSize: oneFourFontPixel,
  },
});

export default MyTextInput;
