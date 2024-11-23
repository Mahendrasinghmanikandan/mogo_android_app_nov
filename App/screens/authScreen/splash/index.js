/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, Animated} from 'react-native';
import {SafeAreaViewComponents} from '../../../components/safeAreaViewComponent';
import StatusBarComponents from '../../../components/statusBarComponent';
import {styles} from './styles';
import assets from '../../../utils/assets/assets';
import {useContext} from 'react';
import {ThemeContext} from '../../../contextes/themeContext';
import {colors} from '../../../utils/colors';
import {
  LOGIN,
  MAIN_TAB_NAVIGATOR,
  ONBOARDING_SCREEN,
  SUB_SPLASH,
} from '../../../navigation/stackNavigation';
import {loadusers} from '../../mogoscreen/redux/userSlice';
import {useDispatch} from 'react-redux';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  collectMyWishList,
  collectNotificationCount,
  getMyCartsProduct,
  loginStaus,
} from '../../../utils/apihelper';
import _ from 'lodash';
import {cardCount} from '../../mogoscreen/redux/cartSlice';
import {ListCount} from '../../mogoscreen/redux/favSlice';
import {notificationCount} from '../../mogoscreen/redux/notificationslice';

const SplashScreen = ({navigation}) => {
  const {theme, UpdateTheme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];
  const [isToggled, setIsToggled] = useState(false);
  const [isActive, setIsActive] = useState(theme.mode !== 'dark');
  const fadeAnimation = new Animated.Value(0);

  const fadeIn = () => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnimation, {
      toValue: 0,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  };

  const dispatch = useDispatch();

  const isFocus = useIsFocused();

  const fetchData = async () => {
    try {
      if (await AsyncStorage.getItem('tokens')) {
        const result = await Promise.all([
          loginStaus(),
          getMyCartsProduct(),
          collectMyWishList(),
          collectNotificationCount(),
        ]);
        dispatch(
          loadusers({
            name: _.get(result, '[0]data.data.user_name', ''),
            email: _.get(result, '[0]data.data.user_email', ''),
            mobile: _.get(result, '[0]data.data.user_mobile', ''),
            profile_color: _.get(result, '[0]data.data.profile_color', ''),
            user_profile: _.get(result, '[0]data.data.user_profile', ''),
          }),
        );
        dispatch(cardCount({count: _.get(result, '[1]data.data', []).length}));
        dispatch(ListCount({count: _.get(result, '[2]data.data', []).length}));
        dispatch(notificationCount({count: _.get(result, '[3]data.data', [])}));
        navigation.navigate(MAIN_TAB_NAVIGATOR);
      } else {
        dispatch(
          loadusers({
            name: '',
            email: '',
            mobile: '',
            profile_color: '',
            user_profile: '',
          }),
        );
        // dispatch(cardCount({count: 0}));
        // dispatch(ListCount({count: 0}));
        navigation.navigate(ONBOARDING_SCREEN);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fadeIn();
    fetchData();

    return () => {
      fadeOut();
    };
  }, [isFocus]);

  return (
    <>
      <SafeAreaViewComponents />
      <StatusBarComponents />
      <View
        style={[
          styles.viewContainer,
          {backgroundColor: activeColors.SCREEN_BACKGROUND_COLOR},
        ]}>
        <Animated.View style={{opacity: fadeAnimation}}>
          <Image
            source={assets.applogo}
            style={{width: 200, height: 200}}
            resizeMethod="resize"
            resizeMode="contain"
          />
        </Animated.View>

        {/* <TouchableOpacity
          style={[styles.container, isToggled && styles.activeContainer]}
          onPress={handleToggle}>
          <View style={[styles.toggle, isToggled && styles.activeToggle]} />
        </TouchableOpacity> */}
      </View>
    </>
  );
};

export default SplashScreen;
