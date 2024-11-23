/* eslint-disable no-lone-blocks */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaViewComponents} from '../../../components/safeAreaViewComponent';
import StatusBarComponents from '../../../components/statusBarComponent';
import {styles} from './styles';
import BottomSafeAreaView from '../../../components/bottomSafeAreaView';
import {useContext} from 'react';
import {ThemeContext} from '../../../contextes/themeContext';
import {colors} from '../../../utils/colors';
import ArrowRoundView from '../../../components/arrowRoundView';
import STRINGS from '../../../utils/constants/string';
import MyTextInput from '../../../components/myTextInput';
import assets from '../../../utils/assets/assets';
import responsive from '../../../utils/styles/responsive';
import SocialView from '../../../components/socialView';
import MyButton from '../../../components/myButton';
import {oneFourFontPixel} from '../../../utils/fontsSize';
import {
  FORGOT_PASSWORD,
  MAIN_TAB_NAVIGATOR,
  SIGN_UP,
} from '../../../navigation/stackNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  authUser,
  collectMyWishList,
  getMyCartsProduct,
} from '../../../utils/apihelper';
import _ from 'lodash';
import Loader from '../../mogoscreen/Loader';
import {useSelector, useDispatch} from 'react-redux';
import {loadusers} from '../../mogoscreen/redux/userSlice';
import {
  validateEmail,
  validateRequiredField,
} from '../../mogoscreen/helper/formvalidation';
import {cardCount} from '../../mogoscreen/redux/cartSlice';
import {ListCount} from '../../mogoscreen/redux/favSlice';

const Login = ({navigation}) => {
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const userInfo = useSelector(data => data);

  const dispatch = useDispatch();

  const signUpPress = () => {
    navigation.navigate(SIGN_UP);
  };

  const backPress = () => {
    navigation.goBack();
  };

  let initialValue = {
    user_email: '',
    user_password: '',
  };

  const [formData, setFormData] = useState(initialValue);
  const [errors, setErrors] = useState(initialValue);
  const [loading, setLoading] = useState(false);

  const handleTextBoxChange = (field, value, validName) => {
    setFormData(pre => ({...pre, [field]: value}));
    if (field === 'user_email') {
      setErrors({...errors, [field]: validateEmail(value)});
    } else {
      setErrors({...errors, [field]: validateRequiredField(value, validName)});
    }
  };

  const handleFinish = async () => {
    if (!_.isEmpty(_.pickBy(errors, value => !_.isNull(value)))) {
      let errorvalue = {
        user_email: formData.user_email === '' ? 'Email is Required' : null,

        user_password:
          formData.user_password === '' ? 'Password is Required' : null,
      };
      setErrors(errorvalue);
    } else {
      try {
        setLoading(true);
        const result = await authUser(formData);

        dispatch(
          loadusers({
            name: _.get(result, 'data.data.name', ''),
            email: _.get(result, 'data.data.email', ''),
            mobile: _.get(result, 'data.data.user_mobile', ''),
            profile_color: _.get(result, 'data.data.profile_color', ''),
            user_profile: _.get(result, 'data.data.user_profile', ''),
          }),
        );

        await AsyncStorage.setItem(
          'tokens',
          _.get(result, 'data.data.token', ''),
        );

        navigation.navigate('Splash');
      } catch (err) {
        console.log(err);
        Alert.alert(_.get(err, 'response.data.message', ''));
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <View style={{flex: 1}}>
      <SafeAreaViewComponents />
      <StatusBarComponents />
      <View
        style={[
          styles.viewContainer,
          {backgroundColor: activeColors.SCREEN_BACKGROUND_COLOR},
        ]}>
        <ArrowRoundView onPress={backPress} />
        <View style={styles.titleView}>
          <Text
            style={[styles.titleText, {color: activeColors.WHITE_TEXT_COLOR}]}>
            {STRINGS.login.title}
          </Text>
        </View>
        <View style={styles.conView}>
          <Text style={[styles.codeText, {color: activeColors.DES_TEXT_COLOR}]}>
            {STRINGS.login.con}
          </Text>
        </View>

        <View style={{height: responsive.heightPixel(30)}} />
        <View>
          <View style={{height: 15}} />
          <MyTextInput
            errors={errors.user_email}
            validName="Email"
            handleTextBoxChange={handleTextBoxChange}
            value={formData.user_email}
            imageSource={assets.email}
            placeholder={STRINGS.login.email}
            currentField={'user_email'}
          />
          <View style={{height: 15}} />
          <MyTextInput
            errors={errors.user_password}
            validName="Password"
            handleTextBoxChange={handleTextBoxChange}
            value={formData.user_password}
            imageSource={assets.password}
            placeholder={STRINGS.login.password}
            currentField={'user_password'}
            secureTextEntry
          />
        </View>
      </View>
      <View style={{backgroundColor: activeColors.SCREEN_BACKGROUND_COLOR}}>
        <MyButton
          text={STRINGS.login.logIn}
          loading={loading}
          onPress={!loading && handleFinish}
        />
        <View style={{height: 10}} />
        <View style={styles.accContainer}>
          <Text>
            <Text
              style={[styles.accText, {color: activeColors.DES_TEXT_COLOR}]}>
              {STRINGS.login.haveAcc}
            </Text>
            <Text
              style={[styles.accText, {fontSize: oneFourFontPixel}]}
              onPress={signUpPress}>
              {STRINGS.login.in}
            </Text>
          </Text>
        </View>
      </View>
      <BottomSafeAreaView />
    </View>
  );
};

export default Login;

{
  /* <TouchableOpacity
          style={styles.resetView}
          onPress={forgotPasswordPress}>
          <Text style={styles.resetText}>{STRINGS.login.resetPass}</Text>
        </TouchableOpacity> */
}

{
  /* <View style={styles.termsContainer}>
          <View
            style={[styles.roundView, {backgroundColor: activeColors.PRIMARY}]}
          />
          <View style={styles.textContainer}>
            <Text>
              <Text style={[styles.text, {color: activeColors.DES_TEXT_COLOR}]}>
                {STRINGS.login.terms}
              </Text>
              <Text style={[styles.text, {color: activeColors.TERMS}]}>
                {STRINGS.login.services}
              </Text>
              <Text style={[styles.text, {color: activeColors.DES_TEXT_COLOR}]}>
                {STRINGS.login.and}
              </Text>
              <Text style={[styles.text, {color: activeColors.TERMS}]}>
                {STRINGS.login.policy}
              </Text>
            </Text>
          </View>
        </View>
        <View style={[styles.line, {borderColor: activeColors.BORDER_COLOR}]} />

        <View style={{height: responsive.heightPixel(20)}} />

        <View style={styles.socialView}>
          <SocialView imageSource={assets.twitter} />
          <SocialView imageSource={assets.facebook} />
          <SocialView
            imageSource={
              theme.mode === 'dark' ? assets.apple : assets.blackApple
            }
          />
        </View> */
}
