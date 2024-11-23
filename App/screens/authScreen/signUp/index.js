/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  Image,
  Alert,
} from 'react-native';
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
import responsive, {CENTER_FLEX_WRAP} from '../../../utils/styles/responsive';
import SocialView from '../../../components/socialView';
import MyButton from '../../../components/myButton';
import {oneFourFontPixel} from '../../../utils/fontsSize';
import {
  FORGOT_PASSWORD,
  LOGIN,
  SIGN_UP,
} from '../../../navigation/stackNavigation';
import * as ImagePicker from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import {createUser} from '../../../utils/apihelper';
import _ from 'lodash';

import {
  getRandomColor,
  validateEmail,
  validateRequiredField,
} from '../../mogoscreen/helper/formvalidation';

const SignUp = ({navigation}) => {
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const [loading, setLoading] = useState(false);

  let initialValue = {
    user_name: '',
    user_email: '',
    user_mobile: '',
    user_password: '',
  };

  const [formData, setFormData] = useState(initialValue);
  const [errors, setErrors] = useState(initialValue);

  const signUpPress = () => {
    navigation.navigate(SIGN_UP);
  };

  const backPress = () => {
    navigation.goBack();
  };

  // const forgotPasswordPress = async () => {
  //   try {
  //     const result = await ImagePicker.launchImageLibrary({
  //       mediaType: 'photo',
  //       includeBase64: false,
  //       maxHeight: 200,
  //       maxWidth: 200,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

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
      let errors = {
        user_name: formData.user_name === '' ? 'Name is Required' : null,
        user_email: formData.user_email === '' ? 'Email is Required' : null,
        user_mobile:
          formData.user_mobile === '' ? 'Phone Number is Required' : null,
        user_password:
          formData.user_password === '' ? 'Password is Required' : null,
      };

      setErrors(errors);
    } else {
      try {
        setLoading(true);
        formData.profile_color = getRandomColor();
        await createUser(formData);
        navigation.navigate(LOGIN);
      } catch (err) {
        Alert.alert(
          _.get(err, 'response.data.message', '') === '11000'
            ? 'That email is already in use.'
            : 'Something went wrong',
          ` ${formData.user_email} `,
        );
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <SafeAreaViewComponents />
      <StatusBarComponents />
      <ScrollView
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

        {/* <TouchableOpacity
          onPress={forgotPasswordPress}
          style={[CENTER_FLEX_WRAP, {paddingTop: 40}]}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.freepik.com/256/1159/1159740.png?semt=ais_hybrid',
            }}
            style={{width: 100, height: 100}}
          />
        </TouchableOpacity> */}
        <View style={{height: responsive.heightPixel(10)}} />
        <View>
          <MyTextInput
            handleTextBoxChange={handleTextBoxChange}
            value={formData.user_name}
            imageSource={assets.user}
            placeholder={'Name'}
            currentField={'user_name'}
            errors={errors.user_name}
            validName="Name"
          />
          <View style={{height: 15}} />

          <MyTextInput
            handleTextBoxChange={handleTextBoxChange}
            value={formData.user_email}
            imageSource={assets.email}
            placeholder={'Email'}
            currentField={'user_email'}
            validName="Email"
            errors={errors.user_email}
          />
          <View style={{height: 15}} />

          <MyTextInput
            handleTextBoxChange={handleTextBoxChange}
            value={formData.user_mobile}
            imageSource={assets.phone}
            placeholder={'Phone'}
            keyboard={true}
            currentField={'user_mobile'}
            validName="Phone Number"
            maxLength={true}
            errors={errors.user_mobile}
          />
          <View style={{height: 15}} />

          <MyTextInput
            handleTextBoxChange={handleTextBoxChange}
            value={formData.user_password}
            imageSource={assets.password}
            placeholder={'Password'}
            currentField={'user_password'}
            errors={errors.user_password}
            validName="Password"
            secureTextEntry
          />
        </View>

        <View style={{height: 15}} />
      </ScrollView>
      <View
        style={{
          paddingBottom: 10,
          backgroundColor: activeColors.SCREEN_BACKGROUND_COLOR,
        }}>
        <MyButton text={STRINGS.signUp.signUp} onPress={handleFinish} />
        <View style={{height: 10}} />
        <View style={styles.accContainer}>
          <Text>
            <Text
              style={[styles.accText, {color: activeColors.DES_TEXT_COLOR}]}>
              {STRINGS.login.haveAcc}
            </Text>
            <Text
              style={[styles.accText, {fontSize: oneFourFontPixel}]}
              onPress={backPress}>
              {STRINGS.signUp.in}
            </Text>
          </Text>
        </View>
      </View>

      <BottomSafeAreaView />
    </>
  );
};

export default SignUp;
