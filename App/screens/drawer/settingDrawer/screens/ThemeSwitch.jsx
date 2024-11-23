import {View, Text} from 'react-native';
import React, {useContext} from 'react';
import ToggleSwitchButton from '../../../../components/toggleSwitch';
import STRINGS from '../../../../utils/constants/string';
import HomeSafeAreaView from '../../../../components/homeSafeAreaView';
import HomeArrowView from '../../../../components/homeArrowView';
import {useNavigation} from '@react-navigation/native';
import {ThemeContext} from '../../../../contextes/themeContext';
import {colors} from '../../../../utils/colors';

const ThemeSwitch = () => {
  const navigation = useNavigation();
  const {theme, UpdateTheme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const backPress = () => {
    navigation.goBack();
  };

  return (
    <View style={{flex: 1, backgroundColor: activeColors.HOME_SAFE_AREA_VIEW}}>
      <HomeSafeAreaView />
      <HomeArrowView onPress={backPress} title={'Theme'} />
      <ToggleSwitchButton title={STRINGS.setting.darkTheme} themeText={true} />
    </View>
  );
};

export default ThemeSwitch;
