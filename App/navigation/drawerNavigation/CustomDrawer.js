import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import responsive from '../../utils/styles/responsive';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {ThemeContext} from '../../contextes/themeContext';
import {colors} from '../../utils/colors';
import StatusBarComponents from '../../components/statusBarComponent';
import assets from '../../utils/assets/assets';
import Icon, {Icons} from '../../utils/icon';
import {useNavigation} from '@react-navigation/native';
import STRINGS from '../../utils/constants/string';
import {oneThreeFontPixel, senBold, senMedium} from '../../utils/fontsSize';
import {HOME_SCREEN} from '../bottomBarNavigation';
import {Shadow} from 'react-native-shadow-2';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import _ from 'lodash';
import AvatarScreen from '../../screens/mogoscreen/extra/AvatarScreen';

const CustomDrawer = props => {
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];
  const navigation = useNavigation();

  const data = useSelector(data => data);

  const backPress = () => {
    navigation.navigate(HOME_SCREEN);
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.navigate('Splash');
    } catch (err) {}
  };

  return (
    <>
      <SafeAreaView
        style={{backgroundColor: activeColors.CUSTOM_DRAWER_BACK_COLOR}}
      />
      <StatusBarComponents />
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
        contentContainerStyle={[
          styles.contentContainerStyle,
          {backgroundColor: activeColors.CUSTOM_DRAWER_BACK_COLOR},
        ]}>
        <View
          style={{
            paddingBottom: 10,
            marginHorizontal: 20,
            position: 'absolute',
            top: 10,
            width: '90%',
          }}>
          {Platform.OS === 'ios' ? (
            <TouchableOpacity style={styles.iconView} onPress={backPress}>
              <Icon
                type={Icons.AntDesign}
                name={'close'}
                color={colors.BLACK_COLOR}
                size={20}
              />
            </TouchableOpacity>
          ) : (
            <Shadow
              startColor={theme.mode === 'dark' ? '#6776fe' : '#ccd1ff'}
              offset={[-0, 0]}
              distance={Platform.OS === 'android' ? 10 : 7}>
              <TouchableOpacity style={styles.iconView} onPress={backPress}>
                <Icon
                  type={Icons.AntDesign}
                  name={'close'}
                  color={colors.BLACK_COLOR}
                  size={20}
                />
              </TouchableOpacity>
            </Shadow>
          )}

          <View style={styles.profileView}>
            <AvatarScreen width={50} height={50} borderRadius={true} />
          </View>
          <View>
            <Text
              style={[styles.nameText, {color: activeColors.WHITE_TEXT_COLOR}]}>
              {_.get(data, 'product.value.name', '')}
            </Text>
            <View style={{height: 3}}></View>
            <Text
              style={[
                styles.emailText,
                {color: activeColors.WHITE_TEXT_COLOR},
              ]}>
              {_.get(data, 'product.value.email', '')}
            </Text>
          </View>
        </View>

        <View style={styles.drawerItemListStyle}>
          <DrawerItemList {...props} />
        </View>

        <View style={styles.logOutContainer}>
          <TouchableOpacity style={styles.logOutView} onPress={handleLogout}>
            <Text style={styles.logOutText}>{STRINGS.drawer.logOut}</Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
      <SafeAreaView
        style={{backgroundColor: activeColors.CUSTOM_DRAWER_BACK_COLOR}}
      />
    </>
  );
};

export const styles = StyleSheet.create({
  contentContainerStyle: {
    flex: 1,
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
    elevation: 2,
  },
  profileView: {
    paddingTop: 25,
    paddingBottom: 10,
  },
  nameText: {
    fontFamily: senBold,
    fontSize: oneThreeFontPixel,
  },
  emailText: {
    fontFamily: senMedium,
  },
  logOutContainer: {
    paddingLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    position: 'absolute',
    bottom: 15,
  },
  logOutView: {
    backgroundColor: colors.BUTTON_BACKGROUND_COLOR,
    alignSelf: 'flex-start',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  logOutText: {
    fontFamily: senBold,
    fontSize: oneThreeFontPixel,
    color: colors.WHITE_COLOR,
  },
  drawerItemListStyle: {
    position: 'absolute',
    top:
      Platform.OS === 'android'
        ? responsive.heightPixel(200)
        : responsive.heightPixel(90),
    width: '100%',
    justifyContent: 'center',
  },
});

export default CustomDrawer;
