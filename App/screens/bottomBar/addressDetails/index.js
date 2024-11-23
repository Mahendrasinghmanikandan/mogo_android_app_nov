/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-catch-shadow */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ScrollView,
  ImageBackground,
} from 'react-native';
import HomeSafeAreaView from '../../../components/homeSafeAreaView';
import StatusBarComponents from '../../../components/statusBarComponent';
import HomeArrowView from '../../../components/homeArrowView';
import HomeSafeAreaBottom from '../../../components/homeSafeAreaBottom';
import {styles} from './styles';
import {colors, MOGO_COLORS} from '../../../utils/colors';
import {ThemeContext} from '../../../contextes/themeContext';
import STRINGS from '../../../utils/constants/string';
import assets from '../../../utils/assets/assets';
import MyButton from '../../../components/myButton';
import {ADD_ADDRESS, CHOOSE_PAYMENT} from '../../../navigation/stackNavigation';
import _ from 'lodash';
import {collectMyDeliveryAddress, veriFyCoupon} from '../../../utils/apihelper';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Loader from '../../mogoscreen/Loader';

import BottomSheet from 'react-native-raw-bottom-sheet';
import {CENTER_FLEX_WRAP} from '../../../utils/styles/responsive';
import {oneThreeFontPixel, senBold, senMedium} from '../../../utils/fontsSize';
import AddressView from '../../../components/address';
import StyleTextInput from '../../../components/stylePasswordTextInput';
import {
  getDeliveryChargeTotal,
  getFinalPrice,
  getFinalSoloPrice,
} from '../../mogoscreen/helper/priceHelper';
import Icon, {Icons} from '../../../utils/icon';

const AddressDetails = ({route}) => {
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const backPress = () => {
    navigation.goBack();
  };

  const navigation = useNavigation();
  const isFocus = useIsFocused();

  const [deliveryAddress, setDeliveryAddress] = useState([]);
  const [currentAddress, setCurrentAddress] = useState([]);
  const [couponCode, setCouponCode] = useState('');

  const [finalPrice, setFinalPrice] = useState('');

  const [couponPrice, setCouponPrice] = useState('');
  const [couponDiscountData, setCouponDiscount] = useState([]);
  const [err, setError] = useState('');

  const [loading, setLoading] = useState(true);

  const sheetref = useRef();

  const fetchAddressData = async () => {
    try {
      setLoading(true);
      const result = await collectMyDeliveryAddress();
      setDeliveryAddress(_.get(result, 'data.data', []));
      setCurrentAddress(_.get(result, 'data.data[0]', []));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const currentAddressPress = data => {
    setCurrentAddress(data);
    sheetref.current.close();
  };

  useEffect(() => {
    fetchAddressData();
  }, [isFocus]);

  // console.log(route.params.state);

  const handleChange = (value, e) => {
    setCouponCode(e);
    setError('');
  };

  // coupon

  // console.log(route.params.state);

  const handleVerifyCoupon = async () => {
    try {
      setLoading(true);
      const result = await veriFyCoupon(couponCode);
      if (_.isEmpty(_.get(result, 'data.data', []))) {
        return setError('Invalid Coupon Code');
      }
      // let applyDiscount =
      //   (Number(_.get(result, 'data.data.coupon_discount', '')) *
      //     getFinalPrice(_.get(route, 'params.state', []))) /
      //   100;
      // console.log(
      //   getFinalSoloPrice(
      //     _.get(route, 'params.state', []),
      //     _.get(result, 'data.data.coupon_discount', ''),
      //   ),
      // );

      setCouponPrice(
        getFinalSoloPrice(
          _.get(route, 'params.state', []),
          _.get(result, 'data.data.coupon_discount', ''),
        ),
      );
      setCouponDiscount(_.get(result, 'data.data', ''));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setFinalPrice(Number(getFinalPrice(_.get(route, 'params.state', []))));
  }, [_.get(route, 'params.state', [])]);

  const handleRemoveCoupon = () => {
    if (couponPrice) {
      setCouponPrice('');
      setCouponCode('');
      setCouponDiscount('');
    }
  };

  const choosePaymentPress = () => {
    navigation.navigate(CHOOSE_PAYMENT, {
      state: {
        productDetails: _.get(route, 'params.state', []),
        deliveryAddress: currentAddress,
        paymentTotal: couponPrice
          ? couponPrice +
            Number(getDeliveryChargeTotal(_.get(route, 'params.state', [])))
          : finalPrice +
            Number(getDeliveryChargeTotal(_.get(route, 'params.state', []))),
        coupondiscountDetails: couponDiscountData,
      },
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: activeColors.HOME_SAFE_AREA_VIEW}}>
      <HomeSafeAreaView />
      <StatusBarComponents />
      <HomeArrowView
        title={STRINGS.details.title}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <ScrollView>
        <View
          style={[
            styles.viewContainer,
            {backgroundColor: activeColors.HOME_SAFE_AREA_VIEW},
          ]}>
          {/* Price Details */}
          <ImageBackground
            style={{
              width: '100%',
              minHeight: 100,
              display: 'flex',
              justifyContent: 'flex-start',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 15,
              paddingVertical: 15,
            }}
            source={assets.poster}>
            <Text
              style={[
                styles.totalText,
                {
                  color: activeColors.WHITE_TEXT_COLOR,
                  width: '90%',
                  fontWeight: 'bold',
                  paddingTop: 10,
                },
              ]}>
              {STRINGS.details.paymentDetails}
            </Text>
            {_.get(route, 'params.state', []).map((res, index) => {
              return (
                <View
                  style={[
                    CENTER_FLEX_WRAP,
                    {width: '90%', justifyContent: 'space-between'},
                  ]}>
                  <View
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      width: '50%',
                      flexDirection: 'row',
                    }}>
                    <Text
                      numberOfLines={1}
                      style={[
                        styles.totalText,
                        {color: activeColors.DES_TEXT_COLOR},
                      ]}>
                      {_.get(res, 'product_name', '')}
                    </Text>
                    <Icon
                      type={Icons.Entypo}
                      name={'cross'}
                      color={_.get(res, 'variant_color', '')}
                      size={10}
                    />
                    <Text
                      numberOfLines={1}
                      style={[
                        styles.totalText,
                        {color: activeColors.DES_TEXT_COLOR},
                      ]}>
                      {_.get(res, 'product_quantity', '')}
                    </Text>
                  </View>

                  <Text
                    numberOfLines={1}
                    style={[
                      styles.totalText,
                      {color: activeColors.DES_TEXT_COLOR},
                    ]}>
                    ₹{_.get(res, 'product_finalTotal', '')}
                  </Text>
                </View>
              );
            })}
            <View style={{height: 5}} />

            <View
              style={[
                CENTER_FLEX_WRAP,
                {width: '90%', justifyContent: 'space-between'},
              ]}>
              <Text
                style={[
                  styles.totalText,
                  {color: activeColors.DES_TEXT_COLOR},
                ]}>
                {STRINGS.details.subTotal}
              </Text>
              <Text
                style={[
                  styles.totalText,
                  {color: activeColors.WHITE_TEXT_COLOR},
                ]}>
                ₹{finalPrice.toLocaleString()}
              </Text>
            </View>
            {/* Delivery Charge */}
            <View
              style={[
                CENTER_FLEX_WRAP,
                {width: '90%', justifyContent: 'space-between'},
              ]}>
              <Text
                style={[
                  styles.totalText,
                  {color: activeColors.DES_TEXT_COLOR},
                ]}>
                {'Delivery Charge'}
              </Text>
              <Text
                style={[
                  styles.totalText,
                  {color: activeColors.WHITE_TEXT_COLOR},
                ]}>
                ₹{getDeliveryChargeTotal(_.get(route, 'params.state', []))}
              </Text>
            </View>
            {/* coupon */}
            {couponPrice && (
              <View
                style={[
                  CENTER_FLEX_WRAP,
                  {width: '90%', justifyContent: 'space-between'},
                ]}>
                <Text
                  style={[
                    styles.totalText,
                    {color: activeColors.DES_TEXT_COLOR},
                  ]}>
                  {'Coupon Discount'}
                </Text>
                <Text
                  style={[
                    styles.totalText,
                    {color: activeColors.WHITE_TEXT_COLOR},
                  ]}>
                  {_.get(couponDiscountData, 'coupon_discount', '')} %
                </Text>
              </View>
            )}
            <View
              style={[
                CENTER_FLEX_WRAP,
                {
                  width: '90%',
                  justifyContent: 'space-between',
                  paddingTop: 20,
                  paddingBottom: 15,
                },
              ]}>
              <Text
                style={[
                  styles.totalText,
                  {color: activeColors.DES_TEXT_COLOR, fontWeight: 'bold'},
                ]}>
                {STRINGS.details.total}
              </Text>
              <Text
                style={[
                  styles.totalText,
                  {color: activeColors.WHITE_TEXT_COLOR},
                ]}>
                ₹
                {couponPrice
                  ? Number(couponPrice) +
                    Number(
                      getDeliveryChargeTotal(_.get(route, 'params.state', [])),
                    )
                  : Number(finalPrice) +
                    Number(
                      getDeliveryChargeTotal(_.get(route, 'params.state', [])),
                    )}
              </Text>
            </View>
          </ImageBackground>
          {!_.isEmpty(deliveryAddress) ? (
            <View
              style={[
                styles.sunViewContainer,
                {backgroundColor: activeColors.FLEX_VIEW_COLOR},
              ]}>
              <TouchableOpacity
                style={styles.flexView}
                onPress={() => {
                  sheetref.current.open();
                }}>
                <Text
                  style={[
                    styles.deliveryAddText,
                    {color: activeColors.WHITE_TEXT_COLOR},
                  ]}>
                  {STRINGS.details.deliveryAdd}
                </Text>
                <Text style={styles.changeText}>{STRINGS.details.change}</Text>
              </TouchableOpacity>
              <View style={{height: 10}} />

              <AddressView data={currentAddress} />

              {/* coupon */}
              <View style={{height: 20}} />
              <View style={[styles.flexView, {flexDirection: 'column'}]}>
                {/* <Text style={styles.changeText}>{'Apply Coupon (Optional)'}</Text> */}
                <StyleTextInput
                  title={
                    <Text
                      style={[
                        styles.changeText,
                        {color: err ? 'red' : MOGO_COLORS.secondaryGreen},
                      ]}>
                      {err ? err : 'Apply Coupon (Optional)'}
                    </Text>
                  }
                  name={'coupon'}
                  placeholder={'coupon code'}
                  placeholderText={'enter coupon code here'}
                  handleChange={handleChange}
                  value={couponCode}
                />
                {couponCode && (
                  <View
                    style={{
                      backgroundColor: activeColors.FLEX_VIEW_COLOR,
                      paddingBottom: 10,
                    }}>
                    <MyButton
                      text={couponPrice ? 'Remove Coupon' : 'Verify Coupon'}
                      customColor={
                        couponPrice
                          ? MOGO_COLORS.primaryBlue
                          : MOGO_COLORS.secondaryGreen
                      }
                      onPress={
                        couponPrice ? handleRemoveCoupon : handleVerifyCoupon
                      }
                    />
                  </View>
                )}
                <View style={{height: 25}} />

                <View style={{height: 25}} />
                {!loading && (
                  <View
                    style={{
                      backgroundColor: activeColors.FLEX_VIEW_COLOR,
                      paddingBottom: 10,
                    }}>
                    <MyButton
                      text={STRINGS.details.continue}
                      onPress={choosePaymentPress}
                    />
                  </View>
                )}
              </View>

              <View style={{height: 10}} />
            </View>
          ) : (
            <View
              style={{
                backgroundColor: activeColors.FLEX_VIEW_COLOR,
                paddingTop: 20,
              }}>
              <MyButton
                text={'Add new Delivery Address'}
                onPress={() => {
                  navigation.navigate(ADD_ADDRESS);
                }}
              />
            </View>
          )}
        </View>
      </ScrollView>

      <HomeSafeAreaBottom />
      {loading && <Loader />}
      <BottomSheet ref={sheetref} height={500}>
        <View
          style={[
            {
              height: 50,
              backgroundColor: activeColors.MODAL_SAVE_ADD_VIEW,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              paddingHorizontal: 10,
            },
          ]}>
          <View style={styles.saveAddView}>
            <Text
              style={[
                styles.saveAddText,
                {color: activeColors.WHITE_TEXT_COLOR},
              ]}>
              Saved Address
            </Text>
          </View>

          <TouchableOpacity
            style={styles.addNewAddView}
            onPress={() => {
              navigation.navigate(ADD_ADDRESS);
            }}>
            <Text
              style={[
                styles.addNewAddText,
                {color: MOGO_COLORS.secondaryGreen},
              ]}>
              Add New Address
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={[
              CENTER_FLEX_WRAP,
              {minWidth: '100%', gap: 10, paddingTop: 20},
            ]}>
            {deliveryAddress.map((res, index) => {
              return (
                <AddressView
                  pressEnable={true}
                  data={res}
                  current={currentAddress}
                  currentAddressPress={currentAddressPress}
                  customSize={'90%'}
                />
              );
            })}
          </View>
        </ScrollView>
      </BottomSheet>
    </View>
  );
};

export const stylesAdded = StyleSheet.create({
  addContainer: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
    marginVertical: 8,
    paddingVertical: Platform.OS === 'android' ? 10 : 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
    width: '90%',
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

export default AddressDetails;
