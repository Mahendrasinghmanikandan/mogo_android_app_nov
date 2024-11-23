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
import {Terms} from '../../mogoscreen/helper/policy_helper';

const TermsConditionDatas = ({navigation}) => {
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const backPress = () => {
    navigation.goBack();
  };

  return (
    <>
      <HomeSafeAreaView />
      <StatusBarComponents />
      <HomeArrowView onPress={backPress} title={'Terms & Conditions'} />
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
                text={`Welcome to Mogo! These terms and conditions (the “Agreement”) govern your use of the Mogo website (the “Site”) and the services offered by Mogo (the “Services”). Please read these terms carefully before using the Site or the Services. By using the Site   or the Services, you agree to be bound by these terms and conditions.`}
              />
              {Terms.map((res, index) => {
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

export default TermsConditionDatas;
