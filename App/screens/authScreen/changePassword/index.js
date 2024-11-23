import React from 'react';
import {View, Text} from 'react-native';
import HomeSafeAreaView from '../../../components/homeSafeAreaView';
import StatusBarComponents from '../../../components/statusBarComponent';
import HomeArrowView from '../../../components/homeArrowView';
import {styles} from './styles';
import {colors} from '../../../utils/colors';
import {ThemeContext} from '../../../contextes/themeContext';
import {useContext} from 'react';
import STRINGS from '../../../utils/constants/string';
import HomeSafeAreaBottom from '../../../components/homeSafeAreaBottom';
import StyleTextInput from '../../../components/stylePasswordTextInput';
import MyButton from '../../../components/myButton';
import {HOME, LOGIN} from '../../../navigation/stackNavigation';

const ChangePassword = ({navigation}) => {
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const backPress = () => {
    navigation.goBack();
  };

  const submitPress = () => {
    navigation.navigate(LOGIN);
  };

  return (
    <>
      <HomeSafeAreaView />
      <StatusBarComponents />
      <HomeArrowView title={STRINGS.changePass.title} onPress={backPress} />
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
          <StyleTextInput title={STRINGS.changePass.password} />
          <StyleTextInput title={STRINGS.changePass.newPassword} />
          <StyleTextInput title={STRINGS.changePass.confrimPass} />
        </View>
      </View>
      <View style={{backgroundColor: activeColors.FLEX_VIEW_COLOR , paddingBottom: 10}}>
        <MyButton text={STRINGS.changePass.submit} onPress={submitPress} />
      </View>
      <HomeSafeAreaBottom />
    </>
  );
};

export default ChangePassword;
