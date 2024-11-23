/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useContext} from 'react';

import {colors, MOGO_COLORS} from '../../utils/colors';
import {ThemeContext} from '../../contextes/themeContext';
import {CENTER_DIV} from '../../utils/styles/responsive';
import {
  oneThreeFontPixel,
  senMedium,
  senRegular,
  twoOneFontPixel,
} from '../../utils/fontsSize';
import {ORDER} from '../../navigation/drawerNavigation';
import {useNavigation} from '@react-navigation/native';

const Success = ({setSuccessMessage, image, content, btnText, goto}) => {
  const {theme, UpdateTheme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const navigation = useNavigation();

  return (
    <View style={[style.container, {backgroundColor: '#ffffff86'}]}>
      <View
        style={[
          CENTER_DIV,
          {
            backgroundColor: activeColors.HOME_SAFE_AREA_VIEW,
            width: '100%',
            height: '100%',
            borderRadius: 20,
            flexDirection: 'column',
          },
        ]}>
        <Image
          source={image}
          style={{width: '90%', height: 280}}
          resizeMethod="resize"
          resizeMode="contain"
        />
        <Text
          style={{
            fontSize: oneThreeFontPixel,
            fontFamily: senMedium,
            color: 'black',
          }}>
          {content}
        </Text>
        <TouchableOpacity
          onPress={() => {
            setSuccessMessage(false);
            if (goto) {
              navigation.navigate(ORDER);
            }
          }}
          style={[
            CENTER_DIV,
            {
              width: 100,
              height: 30,
              backgroundColor: MOGO_COLORS.secondaryGreen,
              marginVertical: 20,
              borderRadius: 8,
            },
          ]}>
          <Text style={{color: 'white'}}>{btnText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
  },
});

export default Success;
