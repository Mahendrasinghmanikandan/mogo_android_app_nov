/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  Image,
} from 'react-native';
import HomeSafeAreaView from '../../../components/homeSafeAreaView';
import HomeArrowView from '../../../components/homeArrowView';
import ColorBottomSafeAreaView from '../../../components/colorBottomSafeAreaView';
import {styles} from './styles';
import STRINGS from '../../../utils/constants/string';
import {ThemeContext} from '../../../contextes/themeContext';
import {colors} from '../../../utils/colors';
import {senBold, senMedium} from '../../../utils/fontsSize';
import {PROFILE, SETTING} from '../../../navigation/drawerNavigation';
import {ORDER_DETAILS} from '../../../navigation/stackNavigation';
import {getMyOrderDetails} from '../../../utils/apihelper';
import _ from 'lodash';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {
  checkCouponIncludedOrNot,
  getTotalQuantity,
} from '../../mogoscreen/helper/priceHelper';
import moment from 'moment';
import Loader from '../../mogoscreen/Loader';

const ProductInfoDetailsView = props => {
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];
  const {orderId, orderData, data, customText, image, onPress} = props;

  const navigation = useNavigation();

  const orderDetailsPress = () => {
    navigation.navigate(ORDER_DETAILS, {
      invoice_id: orderId,
      order_date: moment(_.get(orderData, 'createdAt', [])).format(
        'D MMM yyyy',
      ),
      total_amount: checkCouponIncludedOrNot(orderData, data),
      delivery_address: _.get(orderData, 'deliveryAddress', []),
    });
  };

  return (
    <TouchableOpacity
      onPress={orderDetailsPress}
      style={[
        styles.mainContainer,
        {backgroundColor: activeColors.DRAWER_COLOR, elevation: 3, padding: 10},
      ]}>
      <View style={styles.orderIdView}>
        <Text
          style={[styles.orderIdText, {color: activeColors.WHITE_TEXT_COLOR}]}>
          Invoice {orderId}
        </Text>
        <Text style={[styles.timeText, {color: activeColors.DES_TEXT_COLOR}]}>
          {moment(_.get(orderData, 'createdAt', [])).format('D MMM yyyy')}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.detailView}>
          <View
            style={[styles.subDetailView, {backgroundColor: 'transparent'}]}>
            <Image source={{uri: image}} style={{width: 50, height: 50}} />
          </View>
        </View>
        <View style={styles.typeView}>
          <Text
            style={[
              styles.typeText,
              {color: activeColors.WHITE_TEXT_COLOR, ...customText},
            ]}>
            {_.get(data, 'order_status', '')}
          </Text>
        </View>
      </View>
      <View style={[styles.line, {borderColor: activeColors.BORDER_COLOR}]} />
      <View style={styles.flexView}>
        <Text style={{flex: 1}}>
          <Text style={[styles.nameText, {color: activeColors.DES_TEXT_COLOR}]}>
            {STRINGS.order.qty}
          </Text>
          <Text
            style={[
              styles.subNameText,
              {color: activeColors.WHITE_TEXT_COLOR},
            ]}>
            {_.get(data, 'product_quantity', '')}
          </Text>
        </Text>
        <Text>
          <Text style={[styles.nameText, {color: activeColors.DES_TEXT_COLOR}]}>
            {STRINGS.order.totalAmount}
          </Text>
          <Text
            style={[
              styles.subNameText,
              {color: activeColors.WHITE_TEXT_COLOR},
            ]}>
            ₹ {checkCouponIncludedOrNot(orderData, data).toLocaleString()}
          </Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const Order = ({}) => {
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const [line, setLine] = useState(1);

  const backPress = () => {
    navigation.navigate(PROFILE);
  };

  const isFocus = useIsFocused();

  const titlePress = id => {
    setLine(id);
  };

  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const [refres, setRefresh] = useState(false);

  const navigation = useNavigation();

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await getMyOrderDetails();
      setOrderData(_.get(result, 'data.data', []));
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isFocus, refres]);

  return (
    <View style={{flex: 1, backgroundColor: activeColors.HOME_SAFE_AREA_VIEW}}>
      <HomeSafeAreaView />
      <HomeArrowView onPress={backPress} title={STRINGS.order.title} />
      <ScrollView
        refreshControl={
          <RefreshControl
            onRefresh={() => {
              setRefresh(!refres);
            }}
          />
        }>
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
            <View style={{height: 14}} />
            {orderData.map((result, index) => {
              return _.get(result, 'productDetails', []).map((res, index) => {
                return (
                  <ProductInfoDetailsView
                    key={index}
                    orderId={_.get(res, 'invoice_no', [])}
                    time={STRINGS.order.date}
                    image={_.get(res, 'product_image', [])}
                    productType={STRINGS.order.deliver}
                    data={res}
                    orderData={result}
                    customText={{
                      color:
                        line === 1
                          ? '#3d9e5a'
                          : line === 2
                          ? '#606de3'
                          : line === 3
                          ? '#a2150c'
                          : colors.WHITE_COLOR,
                    }}
                    orderTypeText={
                      line === 1
                        ? STRINGS.order.deliver
                        : line === 2
                        ? STRINGS.order.process
                        : line === 3
                        ? STRINGS.order.cancel
                        : ''
                    }
                  />
                );
              });
            })}

            {/* <ProductInfoDetailsView
            orderId={STRINGS.order.orderId}
            time={STRINGS.order.date}
            productType={STRINGS.order.deliver}
            onPress={orderDetailsPress}
            customText={{
              color:
                line === 1
                  ? '#3d9e5a'
                  : line === 2
                  ? '#606de3'
                  : line === 3
                  ? '#a2150c'
                  : colors.WHITE_COLOR,
            }}
            orderTypeText={
              line === 1
                ? STRINGS.order.deliver
                : line === 2
                ? STRINGS.order.process
                : line === 3
                ? STRINGS.order.cancel
                : ''
            }
          /> */}
          </View>
        </View>
      </ScrollView>
      <ColorBottomSafeAreaView />
      {loading && <Loader />}
    </View>
  );
};

export default Order;

// <View style={styles.topTitleContainer}>
//   <TouchableOpacity onPress={() => titlePress(1)}>
//     <Text
//       style={[
//         styles.text,
//         {
//           color:
//             line === 1
//               ? activeColors.WHITE_TEXT_COLOR
//               : activeColors.DES_TEXT_COLOR,
//           fontFamily: line === 1 ? senBold : senMedium,
//         },
//       ]}>
//       {STRINGS.order.deliver}
//     </Text>
//     {line === 1 && <Animated.View style={styles.bottomLine} />}
//   </TouchableOpacity>
//   <TouchableOpacity onPress={() => titlePress(2)}>
//     <Text
//       style={[
//         styles.text,
//         {
//           color:
//             line === 2
//               ? activeColors.WHITE_TEXT_COLOR
//               : activeColors.DES_TEXT_COLOR,
//           fontFamily: line === 2 ? senBold : senMedium,
//         },
//       ]}>
//       {STRINGS.order.process}
//     </Text>
//     {line === 2 && <Animated.View style={styles.bottomLine} />}
//   </TouchableOpacity>
//   <TouchableOpacity onPress={() => titlePress(3)}>
//     <Text
//       style={[
//         styles.text,
//         {
//           color:
//             line === 3
//               ? activeColors.WHITE_TEXT_COLOR
//               : activeColors.DES_TEXT_COLOR,
//           fontFamily: line === 3 ? senBold : senMedium,
//         },
//       ]}>
//       {STRINGS.order.cancel}
//     </Text>
//     {line === 3 && <Animated.View style={styles.bottomLine} />}
//   </TouchableOpacity>
// </View>;
