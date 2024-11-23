/* eslint-disable react-native/no-inline-styles */
import {View} from 'react-native';
import React, {useContext} from 'react';
import HomeSafeAreaView from '../../../../components/homeSafeAreaView';
import HomeArrowView from '../../../../components/homeArrowView';
import {useNavigation} from '@react-navigation/native';
import {ThemeContext} from '../../../../contextes/themeContext';
import {colors} from '../../../../utils/colors';
import CartScreen from '../../../bottomBar/cartScreen';

const MyCartScreens = () => {
  const navigation = useNavigation();
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const backPress = () => {
    navigation.goBack();
  };

  return (
    <View style={{flex: 1, backgroundColor: activeColors.HOME_SAFE_AREA_VIEW}}>
      <HomeSafeAreaView />
      <HomeArrowView onPress={backPress} title={'Shoping Cart'} />
      <CartScreen headerHide={true} />
    </View>
  );
};

export default MyCartScreens;
