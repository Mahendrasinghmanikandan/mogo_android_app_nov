/* eslint-disable react-native/no-inline-styles */
import {View, Text, ScrollView} from 'react-native';
import React, {useContext} from 'react';
import HomeSafeAreaView from '../../components/homeSafeAreaView';
import StatusBarComponents from '../../components/statusBarComponent';
import HomeArrowView from '../../components/homeArrowView';
import STRINGS from '../../utils/constants/string';
import _ from 'lodash';
import {CENTER_FLEX_WRAP} from '../../utils/styles/responsive';
import ProductCard from './ProductCard';
import GridCard from './GridCard';
import {ThemeContext} from '../../contextes/themeContext';
import {colors} from '../../utils/colors';
import {useNavigation} from '@react-navigation/native';

const ViewAll = ({route}) => {
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];
  const {params} = route;

  const navigation = useNavigation();

  const backPress = () => {
    navigation.goBack();
  };

  return (
    <>
      <HomeSafeAreaView />
      <StatusBarComponents />
      <HomeArrowView
        title={_.get(params, 'state.name', '')}
        onPress={backPress}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: activeColors.PRIMARY_COLOR, flex: 1}}>
        <View
          style={[
            CENTER_FLEX_WRAP,
            {
              backgroundColor: activeColors.PRIMARY_COLOR,
              flex: 1,
              paddingVertical: 10,
            },
          ]}>
          <GridCard products={_.get(params, 'state.productData', [])} />
        </View>
      </ScrollView>
    </>
  );
};

export default ViewAll;
