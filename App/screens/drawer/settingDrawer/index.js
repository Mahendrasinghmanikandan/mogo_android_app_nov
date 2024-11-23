/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import HomeSafeAreaView from '../../../components/homeSafeAreaView';
import HomeSafeAreaBottom from '../../../components/homeSafeAreaBottom';
import HomeArrowView from '../../../components/homeArrowView';
import {styles} from './styles';
import {ThemeContext} from '../../../contextes/themeContext';
import {colors} from '../../../utils/colors';
import ToggleSwitchButton from '../../../components/toggleSwitch';
import STRINGS from '../../../utils/constants/string';
import Icon, {Icons} from '../../../utils/icon';
import {
  CARD_DETAILS,
  PRIVACY_POLICY,
  SAVE_ADDRESS,
  TERM_INFO,
  TERMS_CONDITION,
  THEME_SWITCH,
} from '../../../navigation/stackNavigation';
import _ from 'lodash';
import {useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {CENTER_DIV, CENTER_FLEX_WRAP} from '../../../utils/styles/responsive';
import {ORDER} from '../../../navigation/drawerNavigation';
import BulkRequest from './screens/BulkRequest';

const AccountView = props => {
  const {theme, UpdateTheme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const {title, onPress} = props;
  return (
    <TouchableOpacity
      style={[
        styles.accContainer,
        {backgroundColor: activeColors.DRAWER_COLOR},
      ]}
      onPress={onPress}>
      <View style={styles.titleContainer}>
        <Text style={[styles.accTitle, {color: activeColors.DES_TEXT_COLOR}]}>
          {title}
        </Text>
      </View>
      <View>
        <Icon
          type={Icons.Feather}
          name={'chevron-right'}
          color={
            theme.mode === 'dark' ? colors.WHITE_COLOR : colors.BLACK_COLOR
          }
          size={25}
        />
      </View>
    </TouchableOpacity>
  );
};

const Setting = ({navigation}) => {
  const userData = useSelector(data => data);
  const {theme, UpdateTheme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const backPress = () => {
    navigation.goBack();
  };

  const addressPress = () => {
    navigation.navigate(SAVE_ADDRESS);
  };

  const paymentMethodPress = () => {
    navigation.navigate(CARD_DETAILS);
  };

  const privacyPolicyPress = () => {
    navigation.navigate(PRIVACY_POLICY);
  };

  const termsConditionPress = () => {
    navigation.navigate(TERMS_CONDITION);
  };

  return (
    <>
      <HomeSafeAreaView />
      <HomeArrowView onPress={backPress} title={'Profile'} />
      <View
        style={[
          styles.viewContainer,
          {backgroundColor: activeColors.HOME_SAFE_AREA_VIEW},
        ]}>
        <View
          style={[
            styles.sunViewContainer,
            {backgroundColor: activeColors.FLEX_VIEW_COLOR},
          ]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableOpacity
              style={[
                {
                  width: '100%',
                  minHeight: 150,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 10,
                },
              ]}>
              {_.get(userData, 'product.value.user_profile') ? (
                <Image
                  source={{
                    uri: _.get(userData, 'product.value.user_profile'),
                  }}
                  style={{width: 100, height: 100, borderRadius: 50}}
                />
              ) : (
                <View
                  style={[
                    CENTER_DIV,
                    {
                      width: 100,
                      height: 100,
                      borderRadius: 50,

                      backgroundColor: _.get(
                        userData,
                        'product.value.profile_color',
                      ),
                    },
                  ]}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: 'white',
                      textTransform: 'uppercase',
                    }}>
                    {_.get(userData, 'product.value.name')?.split('')[0]}
                  </Text>
                </View>
              )}

              <Text
                numberOfLines={1}
                style={[styles.accTitle, {color: activeColors.DES_TEXT_COLOR}]}>
                {_.get(userData, 'product.value.name', '')}
              </Text>

              <Text
                numberOfLines={1}
                style={[styles.accTitle, {color: activeColors.DES_TEXT_COLOR}]}>
                {_.get(userData, 'product.value.email', '')}
              </Text>
            </TouchableOpacity>

            <View style={{height: 25}} />
            <AccountView
              title={STRINGS.setting.address}
              onPress={addressPress}
            />

            <AccountView
              title={'My Orders'}
              onPress={() => {
                navigation.navigate(ORDER);
              }}
            />
            <AccountView
              title={'My Cart'}
              onPress={() => {
                navigation.navigate('MyCartScreens');
              }}
            />
            <AccountView
              title={'My WishList'}
              onPress={() => {
                navigation.navigate('MyWishList');
              }}
            />
            <AccountView
              title={'Bulk Purchase Request'}
              onPress={() => {
                navigation.navigate('BulkRequest');
              }}
            />
            <AccountView
              title={'MOGO Terms & Policy'}
              onPress={() => {
                navigation.navigate(TERM_INFO);
              }}
            />
            <AccountView
              title={'Edit Profile'}
              onPress={() => {
                navigation.navigate('Profile');
              }}
            />
            {/* <AccountView
              title={'Theme'}
              onPress={() => {
                navigation.navigate(THEME_SWITCH);
              }}
            /> */}
          </ScrollView>
        </View>
      </View>
      <HomeSafeAreaBottom />
    </>
  );
};

export default Setting;

//  <View style={styles.settingView}>
//               <Text
//                 style={[
//                   styles.titleText,
//                   {color: activeColors.WHITE_TEXT_COLOR},
//                 ]}>
//                 {STRINGS.setting.title}
//               </Text>
//             </View>
//             <ToggleSwitchButton title={STRINGS.setting.orderNotification} />
//             <ToggleSwitchButton title={STRINGS.setting.discountNotification} />
//             <ToggleSwitchButton title={STRINGS.setting.promotionNotification} />
