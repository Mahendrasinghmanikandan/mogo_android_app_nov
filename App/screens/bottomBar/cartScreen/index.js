/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import HomeSafeAreaView from '../../../components/homeSafeAreaView';
import StatusBarComponents from '../../../components/statusBarComponent';
import DrawerView from '../../../components/drawerView';
import {
  ADDRESS_DETAILS,
  NOTIFICATION,
} from '../../../navigation/stackNavigation';
import {ThemeContext} from '../../../contextes/themeContext';
import {colors, MOGO_COLORS} from '../../../utils/colors';
import STRINGS from '../../../utils/constants/string';
import {styles} from './styles';
import MyFlatList from '../../../components/myFlatlist';
import {paymentData} from './data';
import Icon, {Icons} from '../../../utils/icon';
import MyButton from '../../../components/myButton';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getDeliveryCharges,
  getMyCarts,
  getMyCartsProduct,
  getSeachProducts,
  updateMyCart,
} from '../../../utils/apihelper';
import _ from 'lodash';
import {
  getDeliveryChargesPrice,
  getFinalPrice,
  getVariantPrice,
  mrpPriceHelper,
  offerDiscountHelper,
  sellingPriceHelper,
} from '../../mogoscreen/helper/priceHelper';
import Loader from '../../mogoscreen/Loader';
import {CENTER_FLEX_WRAP} from '../../../utils/styles/responsive';
import uuid from 'react-native-uuid';
import {getProductDetails} from '../../mogoscreen/helper/formvalidation';
import {ListCount} from '../../mogoscreen/redux/favSlice';
import {useDispatch} from 'react-redux';
import {cardCount} from '../../mogoscreen/redux/cartSlice';
import EmptyScreen from '../../mogoscreen/EmptyScreen';

const CartScreen = ({headerHide}) => {
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const [data, setData] = useState(paymentData);
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkoutDetails, setCheckoutDetails] = useState([]);
  const [refreshData, setRefresh] = useState(false);

  const [productData, setProductData] = useState([]);

  const isFocus = useIsFocused();
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const notificationPress = () => {
    navigation.navigate(NOTIFICATION);
  };

  const drawerPress = () => {
    navigation.openDrawer();
  };

  const payPress = () => {
    navigation.navigate(ADDRESS_DETAILS, {
      state: checkoutDetails,
    });
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await getMyCarts();
      const result2 = await getDeliveryCharges();
      const result3 = await getMyCartsProduct();

      setCartData(_.get(result, 'data.data', []));
      dispatch(cardCount({count: _.get(result3, 'data.data', []).length}));

      setCheckoutDetails(
        _.get(result, 'data.data.carts', []).map(res => {
          let relese = getProductDetails(
            _.get(res, 'varient_unique_id', ''),
            _.get(result, 'data.data.product', []),
          );

          return {
            variant_id: _.get(res, 'varient_unique_id', ''),
            product_name: _.get(relese, '[0].product_name', ''),
            product_selling_price: _.get(res, 'mogo_selling_price', ''),
            product_mrp_price: _.get(res, 'mogo_mrp_price', ''),

            vendor_product_selling_price: _.get(
              res,
              'product_selling_price',
              '',
            ),
            vendor_product_mrp_price: _.get(res, 'product_original_price', ''),

            product_image: _.get(relese, '[0].product_images[0][0]', ''),
            subcategory_id: _.get(relese, '[0].product_sub_category_name', ''),
            product_quantity: 1,
            product_finalTotal: _.get(res, 'mogo_selling_price', ''),
            vendor_product_finalTotal: _.get(res, 'product_selling_price', ''),

            vendor_id: _.get(relese, '[0].user_id._id', ''),
            vendor_store: _.get(relese, '[0].user_id.company_name', ''),
            order_status: 'confirmed',
            invoice_no: `MOGO${uuid.v4().slice(0, 6)}`,
            variant_color: _.get(res, 'product_variant_color', ''),
            product_id: _.get(relese, '[0]._id', ''),
            deliveryCharge: getDeliveryChargesPrice(
              _.get(result2, 'data.data', []),
              _.get(res, 'product_weight', ''),
            ),
          };
        }),
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isFocus, refreshData]);

  const handleRemove = async id => {
    try {
      setLoading(true);
      await updateMyCart({id: id});
      fetchData();
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const handleIncreaseQuantity = (value, flag, final_count, id) => {
    try {
      let operation = flag === 'increase' ? 1 : -1;

      if (final_count + operation === 0) {
        handleRemove(id);
      }

      setCheckoutDetails(pre => {
        return pre.map(res => {
          if (res.variant_id === value.variant_id) {
            return {
              ...res,
              ['product_finalTotal']:
                Number(res.product_selling_price) *
                Number(res.product_quantity + operation),
              ['product_quantity']: res.product_quantity + operation,
              ['vendor_product_finalTotal']:
                Number(res.vendor_product_selling_price) *
                Number(res.product_quantity + operation),
            };
          }
          return res;
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleViewDetails = values => {
    let product = {
      _id: values.product_id,
      product_sub_category_id: values.subcategory_id,
      variant_id: values.variant_id,
    };
    navigation.navigate('MogoProductDetails', {
      state: {product: product},
    });
  };

  const _renderItem = ({item}) => {
    // console.log(item);
    return (
      <View
        style={[
          styles.renderView,
          {
            marginTop: 10,
            height: 120,
            elevation: 1,
            backgroundColor: 'white',
            paddingVertical: 25,
            borderColor: _.get(item, 'variant_color', ''),
            borderLeftWidth: 2,
          },
        ]}>
        <TouchableOpacity
          onPress={() => {
            handleViewDetails(item);
          }}>
          <Image
            source={{
              uri: _.get(item, 'product_image', ''),
            }}
            style={{width: 80, height: 80, borderRadius: 10}}
          />
        </TouchableOpacity>

        <View style={[styles.titleContainer, {justifyContent: 'flex-start'}]}>
          <Text
            numberOfLines={2}
            style={[styles.titleText, {color: activeColors.WHITE_TEXT_COLOR}]}>
            {_.get(item, 'product_name', '')}
          </Text>
          <View style={{height: 3}} />
          <View
            style={[
              CENTER_FLEX_WRAP,
              {alignItems: 'center', justifyContent: 'flex-start', gap: 1},
            ]}>
            <Text style={[styles.tbText, {color: 'black', fontWeight: 'bold'}]}>
              {Number(_.get(item, 'product_quantity', '')).toLocaleString()}
            </Text>
            <Icon
              type={Icons.Entypo}
              name={'cross'}
              color={MOGO_COLORS.secondaryGreen}
              size={10}
            />
            <Text style={[styles.tbText, {color: 'black', fontWeight: 'bold'}]}>
              ₹
              {Number(
                _.get(item, 'product_selling_price', ''),
              ).toLocaleString()}
            </Text>
          </View>
          <View style={{height: 5}} />
          <Text style={styles.priceText}>
            ₹ {Number(_.get(item, 'product_finalTotal', '')).toLocaleString()}
          </Text>
          <View style={{height: 5}} />
          {/* <Text
            style={[
              styles.priceText,
              // {position: 'absolute', left: 0, bottom: 0},
            ]}>
            <View
              style={{
                width: 15,
                height: 15,

                ,
              }}
            />
          </Text> */}
        </View>

        <View
          style={{
            position: 'absolute',
            bottom: 15,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            gap: 10,
            paddingHorizontal: 10,
          }}>
          <TouchableOpacity
            style={[styles.plusView]}
            onPress={() => {
              handleIncreaseQuantity(
                item,
                'decrease',
                _.get(item, 'product_quantity', ''),
                _.get(item, 'variant_id', ''),
              );
            }}>
            <View
              style={[
                styles.backView,
                {backgroundColor: MOGO_COLORS.primaryBlue},
              ]}>
              {_.get(item, 'product_quantity', '') === 1 ? (
                <Icon
                  type={Icons.MaterialCommunityIcons}
                  name={'delete-outline'}
                  color={colors.WHITE_COLOR}
                  size={15}
                />
              ) : (
                <Icon
                  type={Icons.MaterialCommunityIcons}
                  name={'minus'}
                  color={colors.WHITE_COLOR}
                  size={15}
                />
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.plusView]}>
            <Text style={{color: MOGO_COLORS.primaryBlue}}>
              {_.get(item, 'product_quantity', '')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.plusView]}
            onPress={() => {
              handleIncreaseQuantity(
                item,
                'increase',
                _.get(item, 'product_quantity', ''),
              );
            }}>
            <View style={styles.backView}>
              <Icon
                type={Icons.MaterialCommunityIcons}
                name={'plus'}
                color={colors.WHITE_COLOR}
                size={15}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: activeColors.HOME_SAFE_AREA_VIEW}}>
      <HomeSafeAreaView />
      <StatusBarComponents />
      {!headerHide && (
        <DrawerView
          customView={{backgroundColor: activeColors.HOME_SAFE_AREA_VIEW}}
          titleProp={true}
          onlyTitle={'Shopping Cart'}
          notification={notificationPress}
          drawerOnPress={drawerPress}
        />
      )}
      {_.isEmpty(checkoutDetails) && !loading ? (
        <EmptyScreen
          image={require('../../../assets/images/mogo/images/emptycart.jpg')}
          name="Cart"
        />
      ) : (
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
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{flex: 1}}
              refreshControl={
                <RefreshControl
                  onRefresh={() => {
                    setRefresh(!refreshData);
                  }}
                />
              }>
              <MyFlatList
                data={checkoutDetails}
                renderItem={_renderItem}
                scrollEnabled={false}
              />
              <View style={styles.textFleView}>
                <View style={styles.totalView}>
                  <Text
                    style={[styles.text, {color: activeColors.DES_TEXT_COLOR}]}>
                    Subtotal:
                  </Text>
                </View>
                <View style={styles.ruView}>
                  <Text
                    style={[
                      styles.totalText,
                      {color: activeColors.WHITE_TEXT_COLOR},
                    ]}>
                    ₹ {Number(getFinalPrice(checkoutDetails)).toLocaleString()}
                  </Text>
                </View>
              </View>
              {/* <View style={styles.textFleView}>
              <View style={styles.totalView}>
                <Text
                  style={[styles.text, {color: activeColors.DES_TEXT_COLOR}]}>
                  Taxes:
                </Text>
              </View>
              <View style={styles.ruView}>
                <Text
                  style={[
                    styles.totalText,
                    {color: activeColors.WHITE_TEXT_COLOR},
                  ]}>
                  $40
                </Text>
              </View>
            </View> */}
            </ScrollView>
            {!loading && (
              <View
                style={[
                  styles.totalMainContainer,
                  {
                    backgroundColor:
                      theme.mode === 'dark'
                        ? '#222222'
                        : activeColors.DRAWER_COLOR,
                  },
                ]}>
                <View
                  style={[
                    styles.totalContainer,
                    {
                      backgroundColor:
                        theme.mode === 'dark'
                          ? '#222222'
                          : activeColors.DRAWER_COLOR,
                    },
                  ]}>
                  <View style={styles.flexOne}>
                    <Text
                      style={[
                        styles.ruText,
                        {color: activeColors.WHITE_TEXT_COLOR},
                      ]}>
                      ₹{' '}
                      {Number(getFinalPrice(checkoutDetails)).toLocaleString()}
                    </Text>
                  </View>
                  <MyButton
                    buttonView={styles.buttonView}
                    text={STRINGS.cart.pay}
                    onPress={payPress}
                  />
                </View>
              </View>
            )}
          </View>
        </View>
      )}

      {loading && <Loader />}
    </View>
  );
};

export default CartScreen;
