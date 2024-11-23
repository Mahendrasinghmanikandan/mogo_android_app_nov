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
import {Policy, Refunds, Terms} from '../../mogoscreen/helper/policy_helper';

const ReturnRefundDatas = ({navigation}) => {
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const backPress = () => {
    navigation.goBack();
  };

  return (
    <>
      <HomeSafeAreaView />
      <StatusBarComponents />
      <HomeArrowView onPress={backPress} title={'Order Return Policy'} />
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
              {Refunds.map((res, index) => {
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

export default ReturnRefundDatas;
