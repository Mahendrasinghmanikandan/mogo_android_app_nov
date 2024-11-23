import React, {useContext} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from './CustomDrawer';
import {MainTabNavigator} from '../bottomBarNavigation';
import {oneTwoFontPixel, senMedium} from '../../utils/fontsSize';
import {Dimensions, Image, View} from 'react-native';
import assets from '../../utils/assets/assets';
import Language from '../../screens/drawer/languageScreen';
import CategoryDrawer from '../../screens/drawer/drawerCategory';
import Order from '../../screens/drawer/order';
import Setting from '../../screens/drawer/settingDrawer';
import AboutUs from '../../screens/drawer/aboutUs';
import {ThemeContext} from '../../contextes/themeContext';
import {colors} from '../../utils/colors';
import Profile from '../../screens/drawer/profile';
import TabCategoryScreen from '../../screens/bottomBar/homeCategory/categoryScreen';

export const DRAWER_HOME = 'Home';
export const PROFILE = 'My profile';
export const LANGUAGE = 'Language';
export const DRAWER_CATEGORY = 'All Categories';
export const ORDER = 'My Order';
export const SETTING = 'Settings ';
export const ABOUT_US = 'About Us';

const Drawer = createDrawerNavigator();

const MainDrawerNavigator = () => {
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: activeColors.CUSTOM_DRAWER_BACK_COLOR,
        drawerActiveTintColor: activeColors.WHITE_TEXT_COLOR,
        drawerInactiveTintColor: activeColors.WHITE_TEXT_COLOR,
        drawerLabelStyle: {
          fontSize: oneTwoFontPixel,
          fontFamily: senMedium,
        },
      }}>
      <Drawer.Screen
        name={DRAWER_HOME}
        component={MainTabNavigator}
        options={{
          drawerIcon: ({color}) => (
            <Image
              source={assets.homeOne}
              tintColor={colors.BUTTON_BACKGROUND_COLOR}
            />
          ),
        }}
      />
      <Drawer.Screen
        name={PROFILE}
        component={Setting}
        options={{
          drawerIcon: ({color}) => <Image source={assets.profile} />,
        }}
      />
      {/* <Drawer.Screen
        name={LANGUAGE}
        component={Language}
        options={{
          drawerIcon: ({color}) => <Image source={assets.language} />,
        }}
      /> */}
      <Drawer.Screen
        name={DRAWER_CATEGORY}
        component={TabCategoryScreen}
        options={{
          drawerIcon: ({color}) => <Image source={assets.drawerCategory} />,
        }}
      />
      <Drawer.Screen
        name={ORDER}
        component={Order}
        options={{
          drawerIcon: ({color}) => <Image source={assets.delivery} />,
        }}
      />
      {/* <Drawer.Screen
        name={SETTING}
        component={Setting}
        options={{
          drawerIcon: ({color}) => <Image source={assets.setting} />,
        }}
      /> */}
      <Drawer.Screen
        name={ABOUT_US}
        component={AboutUs}
        options={{
          drawerIcon: () => <Image source={assets.aboutUs} />,
        }}
      />
    </Drawer.Navigator>
  );
};

export default MainDrawerNavigator;
