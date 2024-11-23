/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Image, TouchableOpacity, Platform} from 'react-native';
import {styles} from './styles';
import {SafeAreaViewComponents} from '../../../components/safeAreaViewComponent';
import StatusBarComponents from '../../../components/statusBarComponent';
import assets from '../../../utils/assets/assets';
import {useContext} from 'react';
import {ThemeContext} from '../../../contextes/themeContext';
import {colors, MOGO_COLORS} from '../../../utils/colors';
import STRINGS from '../../../utils/constants/string';
import BoxArrow from '../../../components/arrowBox';
import {ONBOARDING_SCREEN} from '../../../navigation/stackNavigation';
import {senSemiBold} from '../../../utils/fontsSize';

const SubSplash = ({navigation}) => {
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const onBoardTappe = () => {
    navigation.navigate(ONBOARDING_SCREEN);
  };

  return (
    <>
      <SafeAreaViewComponents />
      <StatusBarComponents />
      <View
        style={[
          styles.viewContainer,
          {
            backgroundColor: 'white',
            position: 'relative',
          },
        ]}>
        <View style={[styles.conView, {marginTop: 100}]}>
          <Text
            style={[
              styles.conText,
              {color: MOGO_COLORS.primaryBlue, fontFamily: senSemiBold},
            ]}>
            {STRINGS.splash.con}
          </Text>
          <BoxArrow onPress={onBoardTappe} customHeight={40} />
        </View>

        {/* <View style={styles.imgView}>
          {theme.mode === 'dark' ? (
            <Image source={assets.splashImg1} style={styles.img} />
          ) : (
            <Shadow
              startColor={theme.mode === 'dark' ? '#6776fe' : '#ccd1ff'}
              offset={[100, 270]}
              distance={Platform.OS === 'android' ? 300 : 500}>
              <View style={{width: '100%', zIndex: 1}}>
                <Image source={assets.splashImg3} />
              </View>
            </Shadow>
          )}
        </View> */}

        <View style={styles.img2View}>
          <Image source={assets.splashImg2} style={styles.splashImg2Img} />
        </View>
      </View>
    </>
  );
};

export default SubSplash;
