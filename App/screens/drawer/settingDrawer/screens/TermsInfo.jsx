/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useContext} from 'react';
import ToggleSwitchButton from '../../../../components/toggleSwitch';
import STRINGS from '../../../../utils/constants/string';
import HomeSafeAreaView from '../../../../components/homeSafeAreaView';
import HomeArrowView from '../../../../components/homeArrowView';
import {useNavigation} from '@react-navigation/native';
import {ThemeContext} from '../../../../contextes/themeContext';
import {colors} from '../../../../utils/colors';
import {CENTER_FLEX_WRAP} from '../../../../utils/styles/responsive';
import {TERM_INFO} from '../../../../navigation/stackNavigation';
import Icon, {Icons} from '../../../../utils/icon';
import {styles} from '../styles';

const TermsInfo = ({}) => {
  const navigation = useNavigation();
  const {theme, UpdateTheme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const backPress = () => {
    navigation.goBack();
  };

  let Items = [
    {
      id: 2,
      name: 'Terms & Conditions',
      onClick: () => {
        navigation.navigate('TermsConditionDatas');
      },
    },
    {
      id: 3,
      name: 'Privacy',
      onClick: () => {
        navigation.navigate('PrivacyPolicyData');
      },
    },
    {
      id: 4,
      name: 'Return & Refund Policy',
      onClick: () => {
        navigation.navigate('ReturnRefundDatas');
      },
    },
    {
      id: 5,
      name: 'Shoping Policy',
      onClick: () => {
        navigation.navigate('ShopingPolicy');
      },
    },
    {
      id: 6,
      name: 'Cancellation Policy',
      onClick: () => {
        navigation.navigate('CancelPolicy');
      },
    },
  ];

  return (
    <View style={{flex: 1, backgroundColor: activeColors.HOME_SAFE_AREA_VIEW}}>
      <HomeSafeAreaView />
      <HomeArrowView onPress={backPress} title={'Information'} />
      <View style={[CENTER_FLEX_WRAP]}>
        <ScrollView>
          <ImageBackground
            source={{
              uri: 'https://img.freepik.com/free-vector/consent-concept-illustration_114360-9164.jpg?t=st=1714560805~exp=1714564405~hmac=abce7612518212bb5aae760a975ad0165639c2f624a5e73c3cacd8eed24d1d1f&w=740',
            }}
            style={{width: '90%', height: 200}}
            resizeMethod="resize"
            resizeMode="cover"
          />
          <View
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 50,
              gap: 30,
            }}>
            {Items.map((res, index) => {
              return (
                <TouchableOpacity
                  onPress={res.onClick}
                  key={index}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '90%',
                  }}>
                  <View style={styles.titleContainer}>
                    <Text
                      style={[
                        styles.accTitle,
                        {color: activeColors.DES_TEXT_COLOR},
                      ]}>
                      {res.name}
                    </Text>
                  </View>

                  <Icon
                    type={Icons.MaterialIcons}
                    name={'keyboard-arrow-right'}
                    color={
                      theme.mode === 'dark'
                        ? colors.WHITE_COLOR
                        : colors.BLACK_COLOR
                    }
                    size={25}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default TermsInfo;
