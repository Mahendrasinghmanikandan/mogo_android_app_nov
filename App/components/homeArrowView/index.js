/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {colors} from '../../utils/colors';
import assets from '../../utils/assets/assets';
import {senBold} from '../../utils/fontsSize';
import {ThemeContext} from '../../contextes/themeContext';
import {useContext} from 'react';
import responsive from '../../utils/styles/responsive';
import Icon, {Icons} from '../../utils/icon';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Shadow} from 'react-native-shadow-2';

const HomeArrowView = props => {
  const {
    title,
    onPress,
    notification,
    search,
    drag,
    dragPress,
    notificationPress,
    searchOnPress,
    backgroundTrans,
  } = props;
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];
  return (
    <>
      <View
        style={[
          styles.view,
          {
            backgroundColor: backgroundTrans
              ? 'transparent'
              : activeColors.HOME_SAFE_AREA_VIEW,
          },
        ]}>
        {Platform.OS === 'android' ? (
          <Shadow
            startColor={theme.mode === 'dark' ? '#6776fe' : '#ccd1ff'}
            offset={[-0, 0]}
            distance={Platform.OS === 'android' ? 10 : 7}>
            <TouchableOpacity style={styles.iconView} onPress={onPress}>
              <Image source={assets.back} style={styles.img} />
            </TouchableOpacity>
          </Shadow>
        ) : (
          <TouchableOpacity style={styles.iconView} onPress={onPress}>
            <Image source={assets.back} style={styles.img} />
          </TouchableOpacity>
        )}

        <View style={styles.textView}>
          <Text style={[styles.text, {color: activeColors.WHITE_TEXT_COLOR}]}>
            {title}
          </Text>
        </View>
        {notification === true && (
          <TouchableOpacity
            style={[
              styles.drawerView,
              {backgroundColor: activeColors.DRAWER_COLOR},
            ]}
            onPress={notificationPress}>
            <Image source={assets.notification} />
          </TouchableOpacity>
        )}
        {search === true && (
          <TouchableOpacity
            style={[
              styles.drawerView,
              {backgroundColor: activeColors.DRAWER_COLOR},
            ]}
            onPress={searchOnPress}>
            <Icon
              type={Icons.Feather}
              name={'search'}
              color={'#ababab'}
              size={23}
            />
          </TouchableOpacity>
        )}
        {drag === true && (
          <TouchableOpacity
            onPress={dragPress}
            style={[
              styles.drawerView,
              {backgroundColor: activeColors.DRAWER_COLOR},
            ]}>
            <Image
              source={assets.drag}
              tintColor={theme.mode === 'light' ? colors.BLACK_COLOR : null}
            />
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

export const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 7 : 8,
    paddingBottom: Platform.OS === 'ios' ? 10 : 15,
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
    // paddingRight: 30,
  },
  text: {
    color: colors.WHITE_COLOR,
    fontFamily: senBold,
    fontSize:
      Platform.OS === 'android'
        ? responsive.fontPixel(20)
        : responsive.fontPixel(18.5),
  },
  drawerView: {
    borderRadius: 10,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
  },
});

export default HomeArrowView;
