/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-shadow */
import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  Platform,
  Text,
} from 'react-native';
import HomeScreen from '../../screens/bottomBar/homeScreen';
import FavoritesScreen from '../../screens/bottomBar/favoriteScreen';
import SearchScreen from '../../screens/bottomBar/searchScreen';
import TabCategoryScreen from '../../screens/bottomBar/homeCategory/categoryScreen';
import CartScreen from '../../screens/bottomBar/cartScreen';
import assets from '../../utils/assets/assets';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {colors, MOGO_COLORS} from '../../utils/colors';
import {ThemeContext} from '../../contextes/themeContext';
import {useContext} from 'react';
import {useSelector} from 'react-redux';
import _ from 'lodash';

export const HOME_SCREEN = 'Home';
export const FAVORITE_SCREEN = 'Favorite';
export const SEARCH_SCREEN = 'Search';
export const TAB_CATEGORY = 'Category';
export const CART = 'Cart';

const TabArr = [
  {
    id: 1,
    route: HOME_SCREEN,
    component: HomeScreen,
    imgOne: assets.homeOne,
    imgTwo: assets.homeTwo,
  },
  {
    id: 2,
    route: FAVORITE_SCREEN,
    component: FavoritesScreen,
    imgOne: assets.favOne,
    imgTwo: assets.favTwo,
  },
  {
    id: 3,
    route: SEARCH_SCREEN,
    component: SearchScreen,
    imgOne: assets.search,
    imgTwo: assets.search,
  },
  {
    id: 4,
    route: TAB_CATEGORY,
    component: TabCategoryScreen,
    imgOne: assets.category,
    imgTwo: assets.cate2,
  },
  {
    id: 5,
    route: CART,
    component: CartScreen,
    imgOne: assets.catOne,
    imgTwo: assets.catTwo,
  },
];

const TabButton = props => {
  const {item, onPress, accessibilityState, index} = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const data = useSelector(data => data);

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          onPress(item.id);
        }}
        activeOpacity={1}
        style={[styles.container, {marginTop: 20, height: 30}]}>
        <View style={styles.container}>
          <View
            style={{
              backgroundColor: colors.BUTTON_BACKGROUND_COLOR,
              marginBottom: index === 2 ? 50 : 0,
              height: index === 2 ? 66 : 0,
              width: index === 2 ? 66 : 0,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 50,
              borderColor:
                index === 2
                  ? activeColors.HOME_SAFE_AREA_VIEW
                  : activeColors.HOME_SAFE_AREA_VIEW,
              borderWidth: index === 2 ? 5 : null,
            }}>
            <Image
              source={focused ? item.imgTwo : item.imgOne}
              style={styles.img}
            />

            {index === 4 && _.get(data, 'card_slice.value.count', 0) !== 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {_.get(data, 'card_slice.value.count', 0)}
                </Text>
              </View>
            )}
            {index === 1 && _.get(data, 'list_slice.value.count', 0) !== 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {_.get(data, 'list_slice.value.count', 0)}
                </Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

const Tab = createBottomTabNavigator();

export const MainTabNavigator = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: Platform.OS === 'android' ? 73 : 65,
            backgroundColor: activeColors.HOME_SAFE_AREA_VIEW,
            borderTopStartRadius: 40,
            borderTopEndRadius: 40,
            paddingHorizontal: 20,
            position: 'absolute',
            borderTopColor: activeColors.HOME_SAFE_AREA_VIEW,
          },
        }}>
        {TabArr.map((item, index) => {
          return (
            <Tab.Screen
              key={index}
              name={item.route}
              component={item.component}
              options={{
                tabBarButton: props => (
                  <>
                    <TabButton
                      {...props}
                      item={item}
                      index={index}
                      onPress={item => {
                        setSelectedTabIndex(item);
                        props.onPress();
                      }}
                    />
                  </>
                ),
              }}
            />
          );
        })}
      </Tab.Navigator>
      <SafeAreaView backgroundColor={activeColors.HOME_SAFE_AREA_VIEW} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: -15,
    right: -15,
    backgroundColor: MOGO_COLORS.secondaryGreen,
    borderRadius: 10,
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
  },
});
