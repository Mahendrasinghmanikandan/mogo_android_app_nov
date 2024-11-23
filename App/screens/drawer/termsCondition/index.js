import React, {useContext} from 'react';
import {View, Text, ScrollView} from 'react-native';
import HomeSafeAreaView from '../../../components/homeSafeAreaView';
import StatusBarComponents from '../../../components/statusBarComponent';
import HomeSafeAreaBottom from '../../../components/homeSafeAreaBottom';
import HomeArrowView from '../../../components/homeArrowView';
import STRINGS from '../../../utils/constants/string';
import {styles} from './styles';
import {ThemeContext} from '../../../contextes/themeContext';
import {colors} from '../../../utils/colors';
import LoremText from '../../../components/loremText';

const TermsCondition = ({navigation}) => {
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const backPress = () => {
    navigation.goBack();
  };

  return (
    <>
      <HomeSafeAreaView />
      <StatusBarComponents />
      <HomeArrowView onPress={backPress} title={STRINGS.aboutUs.title} />
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
            <LoremText />
          </ScrollView>
        </View>
      </View>
      <HomeSafeAreaBottom />
    </>
  );
};

export default TermsCondition;
