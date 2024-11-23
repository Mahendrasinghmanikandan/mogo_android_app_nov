import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {SafeAreaViewComponents} from '../../../components/safeAreaViewComponent';
import StatusBarComponents from '../../../components/statusBarComponent';
import ArrowRoundView from '../../../components/arrowRoundView';
import {styles} from './styles';
import {ThemeContext} from '../../../contextes/themeContext';
import {useContext} from 'react';
import {colors} from '../../../utils/colors';
import STRINGS from '../../../utils/constants/string';
import OTPTextInput from 'react-native-otp-textinput';
import MyButton from '../../../components/myButton';
import BottomSafeAreaView from '../../../components/bottomSafeAreaView';
import {CHANGE_PASSWORD} from '../../../navigation/stackNavigation';

const Verification = ({navigation}) => {
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const backPress = () => {
    navigation.goBack();
  };

  const resetPassPress = () => {
    navigation.navigate(CHANGE_PASSWORD);
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
        <View style={styles.verificationView}>
          <Text
            style={[
              styles.verificationText,
              {color: activeColors.WHITE_TEXT_COLOR},
            ]}>
            {STRINGS.verification.title}
          </Text>
        </View>
        <View style={styles.conView}>
          <Text style={[styles.codeText, {color: activeColors.DES_TEXT_COLOR}]}>
            {STRINGS.verification.con}
          </Text>
        </View>
        <View style={styles.conView}>
          <Text style={[styles.numText, {color: activeColors.ICON_COLOR}]}>
            {STRINGS.verification.number}
          </Text>
        </View>
        <TouchableOpacity style={styles.conView}>
          <Text style={styles.resend}>{STRINGS.verification.resend}</Text>
        </TouchableOpacity>

        <View style={styles.otpContainerView}>
          <OTPTextInput
            containerStyle={styles.otpContainer}
            textInputStyle={[
              styles.roundedTextInput,
              {
                backgroundColor: activeColors.OTP_BACK_COLOR,
                color :  activeColors.WHITE_TEXT_COLOR,
              },
            ]}
            // value={otp}
            // handleTextChange={handleOTPChange}
            inputCellLength={1}
            inputCount={4}
            keyboardType="numeric"
            tintColor={activeColors.WHITE_TEXT_COLOR}
            offTintColor={activeColors.WHITE_TEXT_COLOR}
          />
        </View>
      </View>
      <View style={{backgroundColor: activeColors.SCREEN_BACKGROUND_COLOR , paddingBottom: 10}}>
        <MyButton text={STRINGS.verification.btn} onPress={resetPassPress} />
      </View>
      <BottomSafeAreaView />
    </>
  );
};

export default Verification;
