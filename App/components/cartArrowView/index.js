/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {colors, MOGO_COLORS} from '../../utils/colors';
import assets from '../../utils/assets/assets';
import {senBold} from '../../utils/fontsSize';
import {ThemeContext} from '../../contextes/themeContext';
import {useContext} from 'react';
import responsive from '../../utils/styles/responsive';
import Icon, {Icons} from '../../utils/icon';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useNavigation} from '@react-navigation/native';

const CartArrowView = props => {
  const {title, onPress, notification, search, drag, dragPress, cartlength} =
    props;
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('MyCartScreens');
  };

  return (
    <>
      <View
        style={[styles.view, {backgroundColor: activeColors.PRIMARY_COLOR}]}>
        <TouchableOpacity style={styles.iconView} onPress={onPress}>
          <Image source={assets.back} style={styles.img} />
        </TouchableOpacity>
        <View style={styles.textView}>
          <Text style={[styles.text, {color: activeColors.WHITE_TEXT_COLOR}]}>
            {title}
          </Text>
        </View>
        <TouchableOpacity
          onPress={handlePress}
          style={[
            styles.drawerView,
            {backgroundColor: activeColors.DRAWER_COLOR},
          ]}>
          <Image
            source={assets.cart}
            tintColor={theme.mode === 'light' ? '#aaacae' : null}
          />
          {cartlength.length !== 0 && (
            <Text
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                color: MOGO_COLORS.secondaryGreen,
              }}>
              {cartlength.length}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </>
  );
};

export const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: Platform.OS === 'ios' ? 5 : 5,
    paddingBottom: 10,
    // backgroundColor: 'red',
  },
  iconView: {
    backgroundColor: colors.WHITE_COLOR,
    height: 45,
    width: 45,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8790de',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 20,
  },
  img: {
    height: 12,
    width: 22,
    resizeMode: 'cover',
  },
  textView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.WHITE_COLOR,
    fontFamily: senBold,
    fontSize: responsive.fontPixel(18.5),
  },
  drawerView: {
    borderRadius: 15,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
  },
});

export default CartArrowView;
