/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Image, ScrollView, ActivityIndicator} from 'react-native';
import HomeSafeAreaView from '../../../components/homeSafeAreaView';
import HomeArrowView from '../../../components/homeArrowView';
import ColorBottomSafeAreaView from '../../../components/colorBottomSafeAreaView';
import {styles} from './styles';
import {ThemeContext} from '../../../contextes/themeContext';
import {colors, MOGO_COLORS} from '../../../utils/colors';
import STRINGS from '../../../utils/constants/string';
import Icon, {Icons} from '../../../utils/icon';
import assets from '../../../utils/assets/assets';
import _ from 'lodash';
import {trackMyOrder} from '../../../utils/apihelper';
import AddressView from '../../../components/address';
import moment from 'moment';
import {CENTER_FLEX_WRAP} from '../../../utils/styles/responsive';

const MyOrderDetails = ({route, navigation}) => {
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const {params} = route;

  const [orderDetails, setDetails] = useState([]);

  const [loading, setLoading] = useState(false);

  const backPress = () => {
    navigation.goBack();
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await trackMyOrder(_.get(route, 'params.invoice_id', ''));
      setDetails(_.get(result, 'data.data', []));
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [_.get(route, 'params.invoice_id', '')]);

  const getTime = pick => {
    try {
      let filterStatus = orderDetails.filter(res => {
        return res.order_status === pick;
      });
      if (!_.isEmpty(filterStatus)) {
        return {
          date: moment(_.get(filterStatus, '[0].createdAt', '')).format(
            'MMM Do YY',
          ),
          time: moment(_.get(filterStatus, '[0].createdAt', '')).format(
            'hh:MM A',
          ),
          status: true,
        };
      } else {
        return {
          date: '',
          time: '',
          status: false,
        };
      }
    } catch (err) {}
  };

  let statusItem = [
    {
      id: 1,
      name: 'Order Placed',
      subText: 'we have received your order',
      date: getTime('confirmed').date,
      time: getTime('confirmed').time,
      status: getTime('confirmed').status,
    },
    {
      id: 2,
      name: 'Item Packed',
      subText: 'Seller has processed your Order',
      date: getTime('Item Packed').date,
      time: getTime('Item Packed').time,
      status: getTime('Item Packed').status,
    },
    {
      id: 3,
      name: 'Shipped',
      subText: 'your item has been picked up by courier partner',
      date: getTime('Item Picked Up By Delivery Partner').date,
      time: getTime('Item Picked Up By Delivery Partner').time,
      status: getTime('Item Picked Up By Delivery Partner').status,
    },
    {
      id: 4,
      name: 'Out For Delivery',
      subText: 'your item is out for delivery',
      date: getTime('Out For Delivery').date,
      time: getTime('Out For Delivery').time,
      status: getTime('Out For Delivery').status,
    },
    {
      id: 5,
      name: 'Delivered',
      subText: 'your item has been delivered',
      date: getTime('Delivered').date,
      time: getTime('Delivered').time,
      status: getTime('Delivered').status,
    },
  ];

  return (
    <>
      <HomeSafeAreaView />
      <HomeArrowView title={STRINGS.trackOrder.title} onPress={backPress} />
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
            <View style={styles.flexDateView}>
              <View style={styles.orderView}>
                <Text
                  style={[
                    styles.dateText,
                    {color: activeColors.DES_TEXT_COLOR},
                  ]}>
                  {_.get(params, 'order_date', '')}
                </Text>
                <View style={{height: 3}} />
                <Text
                  style={[
                    styles.dateText,
                    {color: activeColors.DES_TEXT_COLOR},
                  ]}>
                  Invoice No : {_.get(params, 'invoice_id', '')}
                </Text>
              </View>
              <View style={styles.amtView}>
                <Text>
                  <Text
                    style={[
                      styles.amtText,
                      {color: activeColors.WHITE_TEXT_COLOR},
                    ]}>
                    {STRINGS.trackOrder.amt}
                  </Text>
                  <Text
                    style={[
                      styles.amtRuText,
                      {
                        color: activeColors.WHITE_TEXT_COLOR,
                        alignItems: 'center',
                      },
                    ]}>
                    {' '}
                    ₹ {_.get(params, 'total_amount', '')}
                  </Text>
                </Text>
              </View>
            </View>
            <View style={{height: 10}} />
            <View
              style={[styles.line, {borderColor: activeColors.BORDER_COLOR}]}
            />

            <View style={{height: 20}} />
            {loading ? (
              <View style={[CENTER_FLEX_WRAP, {height: 500}]}>
                <ActivityIndicator color={MOGO_COLORS.secondaryGreen} />
              </View>
            ) : (
              <>
                {statusItem.map((res, index) => {
                  console.log(res.status);
                  return (
                    <View key={index} style={styles.orderConfirmContainer}>
                      <View style={styles.roundContainer}>
                        <View style={styles.round}>
                          {res.status && (
                            <Icon
                              type={Icons.Octicons}
                              name={'check'}
                              color={colors.WHITE_COLOR}
                              size={18}
                            />
                          )}
                        </View>
                        {index !== 4 && (
                          <View
                            style={[
                              styles.verticalLine,
                              {
                                backgroundColor: res.status
                                  ? colors.BUTTON_BACKGROUND_COLOR
                                  : activeColors.BORDER_COLOR,
                              },
                            ]}
                          />
                        )}
                      </View>
                      <View style={styles.imgView}>
                        <Image
                          source={
                            theme.mode === 'light'
                              ? assets.trackOrder5
                              : assets.trackOrder1
                          }
                        />
                      </View>
                      <View style={styles.textView}>
                        <Text
                          style={[
                            styles.orderText,
                            {color: activeColors.WHITE_TEXT_COLOR},
                          ]}>
                          {res.name}
                        </Text>
                        <View style={{height: 3}} />
                        <Text
                          style={[
                            styles.desText,
                            {color: activeColors.DES_TEXT_COLOR},
                          ]}>
                          {res.subText}
                        </Text>
                      </View>
                      <View style={styles.timeView}>
                        <Text
                          style={[
                            styles.timeText,
                            {color: activeColors.DES_TEXT_COLOR},
                          ]}>
                          {res.time}
                        </Text>
                        <Text
                          style={[
                            styles.timeText,
                            {color: activeColors.DES_TEXT_COLOR},
                          ]}>
                          {res.date}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </>
            )}

            {/* <View style={styles.orderConfirmContainer}>
              <View style={styles.roundContainer}>
                <View style={styles.round}>
                  <Icon
                    type={Icons.Octicons}
                    name={'check'}
                    color={colors.WHITE_COLOR}
                    size={18}
                  />
                </View>
                <View style={styles.verticalLine} />
              </View>
              <View style={styles.imgView}>
                <Image
                  source={
                    theme.mode === 'light'
                      ? assets.trackOrder5
                      : assets.trackOrder1
                  }
                />
              </View>
              <View style={styles.textView}>
                <Text
                  style={[
                    styles.orderText,
                    {color: activeColors.WHITE_TEXT_COLOR},
                  ]}>
                  {STRINGS.trackOrder.orderPlaced}
                </Text>
                <View style={{height: 3}} />
                <Text
                  style={[
                    styles.desText,
                    {color: activeColors.DES_TEXT_COLOR},
                  ]}>
                  {STRINGS.trackOrder.receiveOrder}
                </Text>
              </View>
              <View style={styles.timeView}>
                <Text
                  style={[
                    styles.timeText,
                    {color: activeColors.DES_TEXT_COLOR},
                  ]}>
                  {STRINGS.trackOrder.timeOne}
                </Text>
              </View>
            </View> */}
            {/* <View style={styles.orderConfirmContainer}>
              <View style={styles.roundContainer}>
                <View style={styles.round}>
                  <Icon
                    type={Icons.Octicons}
                    name={'check'}
                    color={colors.WHITE_COLOR}
                    size={18}
                  />
                </View>
                <View style={styles.verticalLine} />
              </View>
              <View style={styles.imgView}>
                <Image
                  source={
                    theme.mode === 'light'
                      ? assets.trackOrder6
                      : assets.trackOrder2
                  }
                />
              </View>
              <View style={styles.textView}>
                <Text
                  style={[
                    styles.orderText,
                    {color: activeColors.WHITE_TEXT_COLOR},
                  ]}>
                  {STRINGS.trackOrder.paymentCon}
                </Text>
                <View style={{height: 3}} />
                <Text
                  style={[
                    styles.desText,
                    {color: activeColors.DES_TEXT_COLOR},
                  ]}>
                  {STRINGS.trackOrder.waiting}
                </Text>
              </View>
              <View style={styles.timeView}>
                <Text
                  style={[
                    styles.timeText,
                    {color: activeColors.DES_TEXT_COLOR},
                  ]}>
                  {STRINGS.trackOrder.timeTwo}
                </Text>
              </View>
            </View>
            <View style={styles.orderConfirmContainer}>
              <View style={styles.roundContainer}>
                <View style={styles.round}>
                  <Icon
                    type={Icons.Octicons}
                    name={'check'}
                    color={colors.WHITE_COLOR}
                    size={18}
                  />
                </View>
                <View
                  style={[
                    styles.verticalLine,
                    {backgroundColor: activeColors.BORDER_COLOR},
                  ]}
                />
              </View>
              <View style={styles.imgView}>
                <Image
                  source={
                    theme.mode === 'light'
                      ? assets.trackOrder7
                      : assets.trackOrder3
                  }
                />
              </View>
              <View style={styles.textView}>
                <Text
                  style={[
                    styles.orderText,
                    {color: activeColors.WHITE_TEXT_COLOR},
                  ]}>
                  {STRINGS.trackOrder.orderProcess}
                </Text>
                <View style={{height: 3}} />
                <Text
                  style={[
                    styles.desText,
                    {color: activeColors.DES_TEXT_COLOR},
                  ]}>
                  {STRINGS.trackOrder.prepare}
                </Text>
              </View>
              <View style={styles.timeView}>
                <Text
                  style={[
                    styles.timeText,
                    {color: activeColors.DES_TEXT_COLOR},
                  ]}>
                  {STRINGS.trackOrder.timeThree}
                </Text>
              </View>
            </View>
            <View style={styles.orderConfirmContainer}>
              <View style={styles.roundContainer}>
                <View style={styles.round} />
              </View>
              <View style={styles.imgView}>
                <Image
                  source={
                    theme.mode === 'light'
                      ? assets.trackOrder8
                      : assets.trackOrder4
                  }
                />
              </View>
              <View style={styles.textView}>
                <Text
                  style={[
                    styles.orderText,
                    {color: activeColors.WHITE_TEXT_COLOR},
                  ]}>
                  {STRINGS.trackOrder.pickUp}
                </Text>
                <View style={{height: 3}} />
                <Text
                  style={[
                    styles.desText,
                    {color: activeColors.DES_TEXT_COLOR},
                  ]}>
                  {STRINGS.trackOrder.shop}
                </Text>
              </View>
              <View style={styles.timeView}>
                <Text
                  style={[
                    styles.timeText,
                    {color: activeColors.DES_TEXT_COLOR},
                  ]}>
                  {STRINGS.trackOrder.timeFour}
                </Text>
              </View>
            </View> */}
            <Text
              style={[styles.addText, {color: activeColors.WHITE_TEXT_COLOR}]}>
              {STRINGS.trackOrder.deliveryAdd}
            </Text>
            <AddressView
              customSize={'90%'}
              data={_.get(params, 'delivery_address[0]', '')}
            />
            <View style={{height: 20}} />
          </ScrollView>
        </View>
      </View>
      <ColorBottomSafeAreaView />
    </>
  );
};

export default MyOrderDetails;
