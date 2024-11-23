/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
import {View, Text, ScrollView} from 'react-native';
import React, {useContext} from 'react';
import HomeSafeAreaView from '../../../components/homeSafeAreaView';
import HomeArrowView from '../../../components/homeArrowView';
import HomeSafeAreaBottom from '../../../components/homeSafeAreaBottom';
import {styles} from './styles';
import {ThemeContext} from '../../../contextes/themeContext';
import {colors} from '../../../utils/colors';
import LoremText from '../../../components/loremText';
import STRINGS from '../../../utils/constants/string';
import StatusBarComponents from '../../../components/statusBarComponent';
import {Policy, Terms} from '../../mogoscreen/helper/policy_helper';

const PrivacyPolicyData = ({navigation}) => {
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const backPress = () => {
    navigation.goBack();
  };

  return (
    <>
      <HomeSafeAreaView />
      <StatusBarComponents />
      <HomeArrowView onPress={backPress} title={'Privacy Policy'} />
      <ScrollView>
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
            <ScrollView>
              <LoremText
                text={`We are appreciative of your faith in us and understand the  significance of safe online transactions and data privacy. This  Privacy Policy explains how your personal information is  collected, used, shared, and processed by Themogo Internet Private Limited and its affiliates (collectively, "themogo, we, our, us") via the Themogo website, mobile application, and m-site (collectively, the "Platform"). Although you are free to explore certain areas of the Platform without providing any information to us, please be aware that we do not ship any goods or services outside of India using this Platform. You explicitly agree to be bound by the terms and conditions of this Privacy Policy, the Terms of Use, and the applicable terms and conditions of any service or product by using this Platform, giving information about yourself, or using any product or service. You also agree to be governed by the laws of India, including but not limited to those that are relevant to data protection and privacy. Please do not use or access our platform if you disagree`}
              />
              {Policy.map((res, index) => {
                return (
                  <View key={index} style={{paddingVertical: 10}}>
                    <Text style={{fontWeight: 'bold', paddingVertical: 2}}>
                      {res.heading}
                    </Text>
                    <LoremText text={res.text} />
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
      <HomeSafeAreaBottom />
    </>
  );
};

export default PrivacyPolicyData;
