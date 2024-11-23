import React, {useContext} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {colors} from '../../utils/colors';
import {ThemeContext} from '../../contextes/themeContext';

const CartSafeAreaView = () => {
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  return (
    <SafeAreaView style={{backgroundColor: activeColors.CART_BACK_COLOR}} />
  );
};

export default CartSafeAreaView;
