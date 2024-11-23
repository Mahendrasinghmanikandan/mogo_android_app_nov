import {View, Text} from 'react-native';
import React, {useContext} from 'react';
import ToggleSwitchButton from '../../../../components/toggleSwitch';
import STRINGS from '../../../../utils/constants/string';
import HomeSafeAreaView from '../../../../components/homeSafeAreaView';
import HomeArrowView from '../../../../components/homeArrowView';
import {useNavigation} from '@react-navigation/native';
import {ThemeContext} from '../../../../contextes/themeContext';
import {colors} from '../../../../utils/colors';
import FavoritesScreen from '../../../bottomBar/favoriteScreen';

const MyWishList = () => {
  const navigation = useNavigation();
  const {theme, UpdateTheme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const backPress = () => {
    navigation.goBack();
  };

  return (
    <View style={{flex: 1, backgroundColor: activeColors.HOME_SAFE_AREA_VIEW}}>
      <HomeSafeAreaView />
      <HomeArrowView onPress={backPress} title={'Favorite'} />
      <FavoritesScreen headerHide={true} />
    </View>
  );
};

export default MyWishList;
