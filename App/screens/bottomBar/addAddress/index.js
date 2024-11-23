/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import HomeSafeAreaView from '../../../components/homeSafeAreaView';
import StatusBarComponents from '../../../components/statusBarComponent';
import HomeArrowView from '../../../components/homeArrowView';
import HomeSafeAreaBottom from '../../../components/homeSafeAreaBottom';
import {styles} from './styles';
import {ThemeContext} from '../../../contextes/themeContext';
import {colors, MOGO_COLORS} from '../../../utils/colors';
import StyleTextInput from '../../../components/stylePasswordTextInput';
import STRINGS from '../../../utils/constants/string';
import assets from '../../../utils/assets/assets';
import MyButton from '../../../components/myButton';
import MyTextInput from '../../../components/myTextInput';
import {CENTER_FLEX_WRAP} from '../../../utils/styles/responsive';
import {
  addDeliveryAddress,
  updateDeliveryAddress,
} from '../../../utils/apihelper';
import _ from 'lodash';

const AddAddress = ({route, navigation}) => {
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const [selected, setSelected] = useState(false);

  let initialValue = {
    address_name: '',
    full_name: '',
    phone_number: '',
    alternate_phone_number: '',
    pincode: '',
    district: '',
    address: '',
    default: false,
  };

  const addressPress = id => {
    setSelected(id);
  };

  const backPress = () => {
    navigation.goBack();
  };

  const [formData, setFormData] = useState(initialValue);

  const handleChange = (field, value) => {
    setFormData(pre => ({...pre, [field]: value}));
  };

  const handleFinish = async () => {
    try {
      if (_.get(route, 'params.data._id', '')) {
        await updateDeliveryAddress(
          formData,
          _.get(route, 'params.data._id', ''),
        );
      } else {
        await addDeliveryAddress(formData);
      }
      navigation.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (_.get(route, 'params.data._id', '')) {
      setFormData(_.get(route, 'params.data', ''));
      setSelected(
        _.get(route, 'params.data.address_name', '') === 'home' ? 1 : 2,
      );
    } else {
      setFormData(initialValue);
    }
  }, [_.get(route, 'params.data._id', '')]);

  return (
    <>
      <HomeSafeAreaView />
      <StatusBarComponents />
      <HomeArrowView title={STRINGS.addAddress.title} onPress={backPress} />
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
          <ScrollView showsVerticalScrollIndicator={false}>
            <StyleTextInput
              title={STRINGS.addAddress.fullName}
              placeholder={'name'}
              placeholderText={'name'}
              currentField="full_name"
              handleChange={handleChange}
              value={formData.full_name}
            />
            <StyleTextInput
              keyboard={true}
              title={'Phone Number'}
              placeholder={'phone number'}
              placeholderText={'phone Number'}
              currentField="phone_number"
              handleChange={handleChange}
              value={String(formData.phone_number)}
              maxLength={true}
            />
            <StyleTextInput
              keyboard={true}
              title={'Alternate Phone Number'}
              placeholder={'alternate phone number'}
              placeholderText={'Alternate phone Number'}
              currentField="alternate_phone_number"
              handleChange={handleChange}
              maxLength={true}
              value={String(formData.alternate_phone_number)}
            />
            <StyleTextInput
              title={STRINGS.addAddress.address}
              placeholder={'address'}
              placeholderText={'delivery address'}
              currentField="address"
              handleChange={handleChange}
              value={formData.address}
            />
            <StyleTextInput
              title={STRINGS.addAddress.district}
              placeholder={'district'}
              placeholderText={'District'}
              currentField="district"
              value={formData.district}
              handleChange={handleChange}
            />
            <StyleTextInput
              title={STRINGS.addAddress.zipCode}
              placeholder={'pincode'}
              placeholderText={'pincode'}
              currentField="pincode"
              keyboard={true}
              value={String(formData.pincode)}
              handleChange={handleChange}
            />

            {/* <StyleTextInput
              title={STRINGS.addAddress.country}
              placeholder={true}
              placeholderText={'Select Country'}
              dropDown={true}
            />
            <StyleTextInput
              title={STRINGS.addAddress.city}
              placeholder={true}
              placeholderText={'Select City'}
              dropDown={true}
            />
            */}

            <View style={styles.flexView}>
              <TouchableOpacity
                onPress={() => {
                  setSelected(1);

                  handleChange('address_name', 'home');
                }}
                style={[
                  styles.flexTouchView,
                  {
                    marginRight: 10,
                    backgroundColor: activeColors.CHANGE_PASSWORD_INPUT,
                    borderColor:
                      selected === 1
                        ? colors.BUTTON_BACKGROUND_COLOR
                        : activeColors.BORDER_COLOR,
                  },
                ]}>
                <View style={styles.imgView}>
                  <Image
                    source={assets.address}
                    tintColor={
                      selected === 1
                        ? colors.BUTTON_BACKGROUND_COLOR
                        : activeColors.WHITE_TEXT_COLOR
                    }
                  />
                </View>
                <View style={{width: 10}} />
                <Text
                  style={[
                    styles.text,
                    {
                      color:
                        selected === 1
                          ? colors.BUTTON_BACKGROUND_COLOR
                          : activeColors.WHITE_TEXT_COLOR,
                    },
                  ]}>
                  {STRINGS.addAddress.homeAddress}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSelected(2);
                  handleChange('address_name', 'office');
                }}
                style={[
                  styles.flexTouchView,
                  {
                    marginLeft: 10,
                    backgroundColor: activeColors.CHANGE_PASSWORD_INPUT,
                    borderColor:
                      selected === 2
                        ? colors.BUTTON_BACKGROUND_COLOR
                        : activeColors.BORDER_COLOR,
                  },
                ]}>
                <View style={styles.imgView}>
                  <Image
                    source={assets.officeAddress}
                    tintColor={
                      selected === 2
                        ? colors.BUTTON_BACKGROUND_COLOR
                        : activeColors.WHITE_TEXT_COLOR
                    }
                  />
                </View>
                <View style={{width: 10}} />
                <Text
                  style={[
                    styles.text,
                    {
                      color:
                        selected === 2
                          ? colors.BUTTON_BACKGROUND_COLOR
                          : activeColors.WHITE_TEXT_COLOR,
                    },
                  ]}>
                  {STRINGS.addAddress.ofcAddress}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>

      <View
        style={{
          backgroundColor: activeColors.FLEX_VIEW_COLOR,
          paddingBottom: 10,
        }}>
        <MyButton text={STRINGS.addAddress.save} onPress={handleFinish} />
      </View>
      <HomeSafeAreaBottom />
    </>
  );
};

export default AddAddress;

//  <View
//    style={[
//      CENTER_FLEX_WRAP,
//      {justifyContent: 'space-between', paddingHorizontal: 5},
//    ]}>
//    {/* <Checkbox
//                 onPress={() => {
//                   handleChange('default', !formData.default);
//                 }}
//                 color={MOGO_COLORS.secondaryGreen}
//                 status={formData.default ? 'checked' : 'unchecked'}
//               /> */}
//    <Text>Make it default delivery address</Text>
//    <Text>No</Text>
//  </View>;
