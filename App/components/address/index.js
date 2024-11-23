/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import {ThemeContext} from '../../contextes/themeContext';
import {colors, MOGO_COLORS} from '../../utils/colors';
import {senBold, oneThreeFontPixel, senMedium} from '../../utils/fontsSize';
import assets from '../../utils/assets/assets';
import _ from 'lodash';
import Icon, {Icons} from '../../utils/icon';

const AddressView = props => {
  const {
    editAddress,
    data,
    deleteAddress,
    editShown,
    current,
    currentAddressPress,
    pressEnable,
    customSize,
  } = props;
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const [onPressSelected, setOnPressSelected] = useState(false);

  const addressPress = () => {
    setOnPressSelected(!onPressSelected);
  };

  return (
    <TouchableOpacity
      style={[
        styles.addContainer,
        {
          backgroundColor:
            _.get(data, '_id', '') === _.get(current, '_id', '')
              ? activeColors.ADDRESS_BACK_COLOR
              : activeColors.DRAWER_COLOR,
          borderColor:
            _.get(data, '_id', '') === _.get(current, '_id', '')
              ? activeColors.ADDRESS_COLOR
              : activeColors.BORDER_COLOR,
          width: customSize || '',
        },
      ]}
      onPress={() => {
        pressEnable && currentAddressPress(data);
      }}>
      <View style={styles.homeFlexView}>
        <View style={styles.imgSourceView}>
          <Image
            source={
              _.get(data, 'address_name', '') === 'office'
                ? assets.officeAddress
                : assets.address
            }
            tintColor={
              onPressSelected === true
                ? activeColors.IMAGE_TINT_COLOR
                : activeColors.WHITE_TEXT_COLOR
            }
          />
        </View>

        <View style={styles.nameView}>
          <Text
            style={[
              styles.nameText,
              {
                color:
                  onPressSelected === true
                    ? activeColors.ADDRESS_COLOR
                    : activeColors.WHITE_TEXT_COLOR,
              },
            ]}>
            {_.get(data, 'address_name', '') === 'office'
              ? 'Office Address'
              : 'Home Address'}
          </Text>
        </View>
        {editShown && (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={styles.imgSourceView}
              onPress={() => {
                editAddress(data);
              }}>
              <Icon
                type={Icons.MaterialIcons}
                name={'edit-note'}
                color={MOGO_COLORS.secondaryGreen}
                size={25}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                deleteAddress(data);
              }}>
              <Icon
                type={Icons.MaterialCommunityIcons}
                name={'delete-outline'}
                color={activeColors.WHITE_TEXT_COLOR}
                size={25}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.titleView}>
        <Text
          style={[styles.titleText, {color: activeColors.WHITE_TEXT_COLOR}]}>
          {_.get(data, 'full_name', '')}
        </Text>
      </View>
      <View style={styles.titleView}>
        <Text
          style={[styles.numberText, {color: activeColors.WHITE_TEXT_COLOR}]}>
          {_.get(data, 'phone_number', '')},{' '}
          {_.get(data, 'alternate_phone_number', '')}
        </Text>
      </View>
      <View style={styles.titleView}>
        <Text
          style={[styles.addressText, {color: activeColors.DES_TEXT_COLOR}]}>
          {_.get(data, 'address', '')}, {_.get(data, 'district', '')},{' '}
          {_.get(data, 'pincode', '')}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
  addContainer: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
    marginVertical: 8,
    paddingVertical: Platform.OS === 'android' ? 10 : 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
  },
  homeFlexView: {
    flexDirection: 'row',
  },
  imgSourceView: {
    paddingRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameText: {
    fontFamily: senBold,
    fontSize: oneThreeFontPixel,
  },
  nameView: {
    justifyContent: 'center',
    flex: 1,
  },
  titleView: {
    marginTop: 10,
  },
  titleText: {
    fontFamily: senBold,
    fontSize: oneThreeFontPixel,
  },
  numberText: {
    fontFamily: senMedium,
    fontSize: oneThreeFontPixel,
  },
  addressText: {
    fontFamily: senMedium,
    fontSize: oneThreeFontPixel,
    lineHeight: 24,
  },
});

export default AddressView;
