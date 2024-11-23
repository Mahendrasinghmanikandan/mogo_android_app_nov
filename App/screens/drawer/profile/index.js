/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import HomeSafeAreaView from '../../../components/homeSafeAreaView';
import StatusBarComponents from '../../../components/statusBarComponent';
import HomeArrowView from '../../../components/homeArrowView';
import {styles} from './styles';
import {ThemeContext} from '../../../contextes/themeContext';
import {colors} from '../../../utils/colors';
import ColorBottomSafeAreaView from '../../../components/colorBottomSafeAreaView';
import STRINGS from '../../../utils/constants/string';
import StyleTextInput from '../../../components/stylePasswordTextInput';
import {CHANGE_PASSWORD} from '../../../navigation/stackNavigation';
import MyButton from '../../../components/myButton';
import {launchImageLibrary} from 'react-native-image-picker';
import assets from '../../../utils/assets/assets';
import {useSelector} from 'react-redux';

import MyTextInput from '../../../components/myTextInput';
import {
  convertUriToFile,
  validateEmail,
  validateRequiredField,
} from '../../mogoscreen/helper/formvalidation';
import _ from 'lodash';
import {
  baseUrl_sub,
  baseUrl_sub_upload,
  createUser,
  updateUser,
  uploadImages,
} from '../../../utils/apihelper';
import {CENTER_DIV} from '../../../utils/styles/responsive';
import {useDispatch} from 'react-redux';
import Loader from '../../mogoscreen/Loader';
import {useIsFocused} from '@react-navigation/native';

const Profile = ({navigation}) => {
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const userData = useSelector(data => data);
  // console.log(userData);

  const dispatch = useDispatch();

  const changeOPasswordPress = () => {
    navigation.navigate(CHANGE_PASSWORD);
  };

  const backPress = () => {
    navigation.goBack();
  };

  const uploadImage = async (uri, type, fileName) => {
    const formData = new FormData();
    formData.append('images', {
      uri,
      type,
      name: fileName,
    });

    try {
      setLoading(true);
      const response = await fetch(
        `${baseUrl_sub_upload}/upload_images_single`,
        {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      const data = await response.json();
      console.log('Image upload response:', data);
      setFormData(pre => ({
        ...pre,
        user_profile: _.get(data, 'data', ''),
      }));
    } catch (error) {
      console.error('Image upload error:', error);
    } finally {
      setLoading(false);
    }
  };

  // const ediPress = async () => {
  //   try {
  //     let options = {
  //       selectionLimit: 1,
  //       mediaType: 'photo',
  //       includeBase64: true,
  //     };
  //     const result = await launchImageLibrary(options);
  //     // console.log(result.assets[0].base64);
  //     // console.log(result.assets);
  //     setFormData(pre => ({
  //       ...pre,
  //       user_profile: _.get(result, 'assets[0].uri', ''),
  //     }));
  //     // const url = await convertUriToFile(_.get(result, 'assets[0].uri', ''));
  //     // console.log(url);
  //     // const formData = new FormData();
  //     // formData.append('images', {
  //     //   uri: result.assets[0].uri,
  //     //   type: result.assets[0].type,
  //     //   name: result.assets[0].fileName,
  //     // });

  //     // const result1 = await uploadImages(formData);
  //     // console.log(result1, 'jhkj');
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const ediPress = async () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    try {
      const result = await launchImageLibrary(options);

      if (!result.didCancel) {
        const {uri, type, fileName} = result.assets[0];
        uploadImage(uri, type, fileName);
      } else {
        console.log('User cancelled image selection');
      }
    } catch (error) {
      console.error('Image picker error:', error);
    }
  };

  const isFocusd = useIsFocused();

  const [loading, setLoading] = useState(false);

  let initialValue = {
    user_name: '',
    user_profile: false,
    user_email: '',
    user_mobile: '',
  };

  const [formData, setFormData] = useState(initialValue);
  const [errors, setErrors] = useState(initialValue);

  const handleTextBoxChange = (field, value, validName) => {
    setFormData(pre => ({...pre, [field]: value}));
    if (field === 'user_email') {
      setErrors({...errors, [field]: validateEmail(value)});
    } else {
      setErrors({
        ...errors,
        [field]: validateRequiredField(value, validName),
      });
    }
  };

  const handleFinish = async () => {
    if (!_.isEmpty(_.pickBy(errors, value => !_.isNull(value)))) {
      setLoading(true);
      let errors = {
        user_name: formData.user_name === '' ? 'Name is Required' : null,
        user_email: formData.user_email === '' ? 'Email is Required' : null,
        user_mobile:
          formData.user_mobile === '' ? 'Phone Number is Required' : null,
      };
      setErrors(errors);
    } else {
      try {
        setLoading(true);
        await updateUser(formData);

        navigation.navigate('Splash');
      } catch (err) {
        console.log(err);
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

  const fetchData = () => {
    try {
      setLoading(true);
      setFormData({
        user_name: _.get(userData, 'product.value.name'),
        user_email: _.get(userData, 'product.value.email'),
        user_mobile: _.get(userData, 'product.value.mobile'),
        user_profile: _.get(userData, 'product.value.user_profile'),
      });
      setErrors({
        user_name: null,
        user_email: null,
        user_mobile: null,
        user_profile: null,
      });
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isFocusd]);

  return (
    <View style={{flex: 1}}>
      <HomeSafeAreaView />
      <StatusBarComponents />
      <HomeArrowView title={STRINGS.profile.title} onPress={backPress} />
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
            {formData.user_profile ? (
              <View style={styles.profileContainer}>
                <View style={styles.imgView}>
                  <Image
                    source={{
                      uri: formData.user_profile,
                    }}
                    style={styles.img}
                  />
                  <TouchableOpacity
                    style={styles.editContainer}
                    activeOpacity={2}
                    onPress={ediPress}>
                    <Image
                      source={assets.addressEdit}
                      style={styles.editImg}
                      tintColor={colors.WHITE_COLOR}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={styles.profileContainer}>
                <View style={styles.imgView}>
                  <View
                    style={[
                      styles.img,
                      CENTER_DIV,
                      {
                        backgroundColor: _.get(
                          userData,
                          'product.value.profile_color',
                        ),
                        borderRadius: 50,
                      },
                    ]}>
                    <Text
                      style={{
                        textTransform: 'uppercase',
                        fontSize: 30,
                        color: 'white',
                      }}>
                      {formData.user_name?.split('')[0]}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.editContainer}
                    activeOpacity={2}
                    onPress={ediPress}>
                    <Image
                      source={assets.addressEdit}
                      style={styles.editImg}
                      tintColor={colors.WHITE_COLOR}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}

            <View style={{height: 50}} />
            <StyleTextInput
              title={'Name'}
              handleChange={handleTextBoxChange}
              value={formData.user_name}
              imageSource={assets.email}
              placeholder={'Name'}
              currentField={'user_name'}
              validName="Name"
              errors={errors.user_name}
            />
            <View style={{height: 15}} />

            <StyleTextInput
              title={STRINGS.profile.email}
              handleChange={handleTextBoxChange}
              value={formData.user_email}
              imageSource={assets.email}
              placeholder={'Email'}
              currentField={'user_email'}
              validName="Email"
              errors={errors.user_email}
            />

            <View style={{height: 15}} />

            <StyleTextInput
              title={STRINGS.profile.number}
              handleChange={handleTextBoxChange}
              value={formData.user_mobile}
              imageSource={assets.email}
              placeholder={'Mobile Number'}
              currentField={'user_mobile'}
              validName="Mobile Number"
              errors={errors.user_mobile}
              maxLength={true}
              keyboard={true}
            />
          </ScrollView>
        </View>
      </View>
      <View
        style={{
          backgroundColor: activeColors.FLEX_VIEW_COLOR,
          paddingBottom: 10,
        }}>
        <MyButton text={STRINGS.profile.update} onPress={handleFinish} />
      </View>

      <ColorBottomSafeAreaView />
      {loading && <Loader />}
    </View>
  );
};

export default Profile;
