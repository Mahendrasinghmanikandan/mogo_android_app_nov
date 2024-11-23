import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import {SafeAreaViewComponents} from '../../../components/safeAreaViewComponent';
import StatusBarComponents from '../../../components/statusBarComponent';
import ArrowRoundView from '../../../components/arrowRoundView';
import {useContext} from 'react';
import {ThemeContext} from '../../../contextes/themeContext';
import {colors} from '../../../utils/colors';
import {styles} from './styles';
import BottomSafeAreaView from '../../../components/bottomSafeAreaView';
import STRINGS from '../../../utils/constants/string';
import responsive from '../../../utils/styles/responsive';
import CountryPicker, {
  DARK_THEME,
  DEFAULT_THEME,
} from 'react-native-country-picker-modal';
import Icon, {Icons} from '../../../utils/icon';
import MyButton from '../../../components/myButton';
import {LOGIN, VERIFICATION} from '../../../navigation/stackNavigation';

const ForgotPassword = ({navigation}) => {
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [countryCode, setCountryCode] = useState('IN');
  const [countryCallingCode, setCountryCallingCode] = useState('91');

  const backPress = () => {
    navigation.navigate(LOGIN);
  };

  const verificationPress = () => {
    navigation.navigate(VERIFICATION);
  };

  return (
    <>
      <SafeAreaViewComponents />
      <StatusBarComponents />
      <View
        style={[
          styles.viewContainer,
          {backgroundColor: activeColors.SCREEN_BACKGROUND_COLOR},
        ]}>
        <ArrowRoundView onPress={backPress} />

        <View style={styles.forgetView}>
          <Text
            style={[styles.forgetText, {color: activeColors.WHITE_TEXT_COLOR}]}>
            {STRINGS.forgetPassword.title}
          </Text>
        </View>
        <View style={{height: responsive.heightPixel(8)}}></View>
        <View style={styles.conView}>
          <Text style={[styles.codeText, {color: activeColors.DES_TEXT_COLOR}]}>
            {STRINGS.forgetPassword.con}
          </Text>
        </View>

        <View
          style={[
            styles.countryCodeView,
            {borderColor: activeColors.BORDER_COLOR},
          ]}>
          <View style={styles.flgView}>
            <CountryPicker
              theme={theme.mode === 'dark' ? DARK_THEME : DEFAULT_THEME}
              style={{
                justifyContent: 'center',
              }}
              visible={isModalVisible}
              countryCode={countryCode}
              withFlag
              withCallingCode
              onSelect={country => {
                setCountryCode(country.cca2);
                setCountryCallingCode(country.callingCode);
              }}
              withAlphaFilter
              withFilter
              onClose={() => setIsModalVisible(false)}
            />
          </View>
          <View style={styles.iconView}>
            <Icon
              type={Icons.Entypo}
              name={'chevron-small-down'}
              color={theme.mode === 'dark' ? activeColors.ICON_COLOR : ''}
              size={25}
            />
          </View>
          <View style={styles.plusIconView}>
            <Icon
              type={Icons.Entypo}
              name={'plus'}
              color={theme.mode === 'dark' ? activeColors.ICON_COLOR : ''}
              size={20}
            />
          </View>
          <View style={styles.code}>
            <Text style={[styles.codeText, {color: activeColors.ICON_COLOR}]}>
              {countryCallingCode}
            </Text>
          </View>
          <View style={styles.lineView}>
            <View style={styles.verticalLine}></View>
          </View>
          <View style={styles.textInputView}>
            <TextInput
              placeholder={STRINGS.forgetPassword.search}
              style={styles.inputText}
              placeholderTextColor={colors.INPUT_COLOR}
            />
          </View>
        </View>
      </View>
      <View style={{backgroundColor: activeColors.SCREEN_BACKGROUND_COLOR , paddingBottom: 10}}>
        <MyButton
          text={STRINGS.forgetPassword.next}
          onPress={verificationPress}
        />
      </View>
      <BottomSafeAreaView />
    </>
  );
};

export default ForgotPassword;
