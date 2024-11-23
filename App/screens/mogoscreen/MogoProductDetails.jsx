/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {REVIEWS} from '../../navigation/stackNavigation';
import CartSafeAreaView from '../../components/cartSafeAreaView';
import StatusBarComponents from '../../components/statusBarComponent';
import {ThemeContext} from '../../contextes/themeContext';
import {colors, MOGO_COLORS} from '../../utils/colors';
import CartArrowView from '../../components/cartArrowView';
import STRINGS from '../../utils/constants/string';
import {styles} from './styles';

import Icon, {Icons} from '../../utils/icon';
import ViewAllContainer from '../../components/viewAllContainer';

import MyButton from '../../components/myButton';

import HomeSafeAreaBottom from '../../components/homeSafeAreaBottom';

import BottomSheet from 'react-native-raw-bottom-sheet';

import _ from 'lodash';
import {
  addToCart,
  addToWishList,
  collectMyWishList,
  getDeliveryCharges,
  getMyCartsProduct,
  getRelatedProducts,
  getVariantComments,
  getVariantReviews,
  makeBulkRequest,
  masterProductSearch,
  updateMyWishList,
} from '../../utils/apihelper';
import {
  CartStatus,
  getVariantPrice,
  sellingPriceHelper,
} from './helper/priceHelper';
import assets from '../../utils/assets/assets';

import GridCard from './GridCard';

import Loader from './Loader';
import {useIsFocused} from '@react-navigation/native';
import ProductDetailsExtra from './ProductDetailsExtra';
import {CENTER_DIV, CENTER_FLEX_WRAP} from '../../utils/styles/responsive';
import ProductCard from './ProductCard';
import {TextInput} from 'react-native-gesture-handler';
import Success from './Success';
import {ListCount} from './redux/favSlice';
import {useDispatch} from 'react-redux';
import {cardCount} from './redux/cartSlice';

const MogoProductDetails = ({route, navigation}) => {
  const {params} = route;

  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const [visible, setVisible] = useState(true);
  const [selectedRound, setSelectedRound] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);

  // mogo
  const [allProducts, setAllProducts] = useState([]);
  const [ProductResult, setProductResult] = useState([]);
  const [currentImage, setCurrentImage] = useState('');
  const [deliveryCharges, setDeliveryCharges] = useState([]);

  const [loading, setLoading] = useState(false);

  const [myCarProducts, setMyCartProducts] = useState([]);
  const [myFavoriteProducts, setMyFavoriteProducts] = useState([]);
  const [currentVariant, setCurrentVariant] = useState('');

  const [btnLoading, setBtnLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const isFocus = useIsFocused();

  const [requiredCount, setRequiredCount] = useState('');

  const dropDownPress = () => {
    setVisible(!visible);
  };

  const backPress = () => {
    navigation.goBack();
  };

  const res_sheet = useRef();
  const dispatch = useDispatch();

  // Mogo
  const fetchProductData = async () => {
    try {
      setLoading(true);

      const productsResult = await getRelatedProducts(
        _.get(params, 'state.product.product_sub_category_id', ''),
      );

      let filter = _.get(productsResult, 'data.data', []).filter(res => {
        return res._id === _.get(params, 'state.product._id', '');
      });

      setAllProducts(_.get(productsResult, 'data.data', []));

      setCurrentImage(_.get(filter, '[0].product_images[0][0]', ''));
      setProductResult(filter);
      setCurrentVariant(
        _.get(params, 'state.product.variant_id', '') ||
          _.get(filter, '[0].product_variants[0].varient_unique_id', ''),
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [_.get(params, 'state.product._id', ''), refresh, isFocus]);

  const fetchCardData = async () => {
    try {
      setLoading(true);
      const result = await Promise.all([
        getMyCartsProduct(),
        getDeliveryCharges(),
        collectMyWishList(),
      ]);
      setMyCartProducts(_.get(result, '[0].data.data', []));
      dispatch(cardCount({count: _.get(result, '[0].data.data', []).length}));

      setDeliveryCharges(_.get(result, '[1].data.data', []));
      setMyFavoriteProducts(_.get(result, '[2].data.data', []));
      dispatch(ListCount({count: _.get(result, '[2].data.data', []).length}));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCardData();
  }, [_.get(params, 'state.product._id', ''), isFocus, refresh]);

  const handleAddtocard = async cart_id => {
    try {
      setLoading(true);
      if (CartStatus(myCarProducts, currentVariant)) {
        setLoading(false);
        return navigation.navigate('MyCartScreens');
      }
      let formData = {
        variant_id: currentVariant,
        product_id: cart_id,
      };
      await addToCart(formData);
      fetchCardData();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddtoFavorite = async cart_id => {
    try {
      setLoading(true);
      if (CartStatus(myFavoriteProducts, currentVariant)) {
        await updateMyWishList({id: currentVariant});
        setLoading(false);
        return fetchCardData();
      }
      let formData = {
        variant_id: currentVariant,
        product_id: cart_id,
      };
      await addToWishList(formData);
      fetchCardData();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendBulkRequest = async () => {
    try {
      if (!btnLoading) {
        setBtnLoading(true);

        if (!requiredCount) {
          setBtnLoading(false);
          return Alert.alert('Please Enter Required Product Count');
        }

        let formData = {
          product_id: _.get(ProductResult, '[0]._id'),
          product_variant_id: currentVariant,
          count: requiredCount,
        };
        await makeBulkRequest(formData);
        setRequiredCount('');
        res_sheet.current.close();
        setSuccessMessage(true);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <View style={{flex: 1}}>
      <CartSafeAreaView />
      <StatusBarComponents />
      <CartArrowView
        title={STRINGS.productDetails.title}
        cartlength={myCarProducts}
        onPress={backPress}
      />
      <View
        style={[
          styles.viewContainer,
          {backgroundColor: activeColors.CART_BACK_COLOR},
        ]}>
        <ScrollView
          style={{flex: 1}}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              onRefresh={() => {
                setRefresh(!refresh);
              }}
            />
          }>
          <View
            style={[
              styles.oneViewContainer,
              {backgroundColor: activeColors.PRIMARY_COLOR},
            ]}>
            <View style={styles.flexView}>
              {/* <View style={styles.viewImg}> */}
              <Image
                source={{
                  uri:
                    currentImage ||
                    _.get(ProductResult, '[0].product_images[0][0]'),
                }}
                style={{width: '100%', height: 400}}
              />
              {/* image </View> */}
              <View
                style={[
                  styles.dropDownView,
                  {backgroundColor: activeColors.SCREEN_BACKGROUND_COLOR},
                ]}>
                <TouchableOpacity
                  style={styles.iconView}
                  onPress={dropDownPress}>
                  <Icon
                    type={Icons.Entypo}
                    name={visible ? 'chevron-down' : 'chevron-up'}
                    color={theme.mode === 'dark' ? 'white' : '#acacac'}
                    size={20}
                  />
                </TouchableOpacity>

                <View
                  style={[
                    styles.line,
                    {borderColor: activeColors.BORDER_COLOR},
                  ]}
                />
                {visible === true ? (
                  <View style={styles.itemImg}>
                    {_.get(ProductResult, '[0].product_images', []).map(
                      (res, index) => {
                        return (
                          <TouchableOpacity
                            key={index}
                            onPress={() => {
                              setCurrentImage(_.get(res, '[0]'));
                            }}>
                            <Image
                              source={{
                                uri: _.get(res, '[0]', ''),
                              }}
                              style={{width: 50, height: 50}}
                            />
                          </TouchableOpacity>
                        );
                      },
                    )}
                  </View>
                ) : null}
              </View>
            </View>
          </View>
          {/* DETAILS VIEW */}
          <View
            style={[
              styles.SecondViewContainer,
              {backgroundColor: activeColors.SCREEN_BACKGROUND_COLOR},
            ]}>
            <View style={styles.PriceflexView}>
              <View style={styles.priceView}>
                <Text
                  numberOfLines={1}
                  style={[
                    styles.maneText,
                    {color: activeColors.WHITE_TEXT_COLOR},
                  ]}>
                  {_.get(ProductResult, '[0].product_name', [])}
                </Text>
              </View>
            </View>
            <View style={styles.PriceflexView}>
              <View style={styles.priceView}>
                <Text
                  style={[
                    styles.saleText,
                    {color: activeColors.DES_TEXT_COLOR},
                  ]}>
                  By {_.get(ProductResult, '[0].user_id.company_name', [])}
                </Text>
              </View>
              <View>
                <View style={styles.starFlexView}>
                  <View style={styles.startView}>
                    <Image source={assets.bigStar} />
                  </View>

                  <Text
                    style={[
                      styles.rentText,
                      {color: activeColors.WHITE_TEXT_COLOR},
                    ]}>
                    {STRINGS.productDetails.rent}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{height: 6}} />
            {/* price */}
            <View style={[CENTER_DIV, {justifyContent: 'space-between'}]}>
              <View style={styles.PriceflexView}>
                <View>
                  <Text style={[styles.priceText, {fontWeight: 'normal'}]}>
                    ₹
                    {
                      getVariantPrice(currentVariant, ProductResult)
                        ?.mogo_selling_price
                    }
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  padding: 5,
                  borderWidth: 1,
                  borderColor: MOGO_COLORS.secondaryGreen,
                  borderRadius: 6,
                }}
                onPress={() => {
                  res_sheet.current.open();
                  setRequiredCount('');
                }}>
                <Text
                  style={[
                    styles.saleText,
                    {color: MOGO_COLORS.secondaryGreen},
                  ]}>
                  {/* <Image
                      source={require('../../assets/images/bulk.png')}
                      style={{width: 25, height: 25}}
                    />{' '} */}
                  Bulk Purchase
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={[styles.line, {borderColor: activeColors.BORDER_COLOR}]}
            />
            <View style={{height: 10}} />

            <View style={{height: 10}} />
            {/* stocks */}
            <View
              style={[
                styles.PriceflexView,
                {
                  justifyContent: 'flex-start',
                  width: '100vw',
                  gap: 10,
                  display: 'flex',
                },
              ]}>
              <Text
                style={[
                  styles.saleText,
                  {color: activeColors.DES_TEXT_COLOR, width: '15%'},
                ]}>
                Status
              </Text>
              <Text
                style={[
                  styles.saleText,
                  {
                    color:
                      getVariantPrice(currentVariant, ProductResult)
                        ?.stock_status === 'IN-STOCK'
                        ? MOGO_COLORS.secondaryGreen
                        : 'red',
                  },
                ]}>
                {getVariantPrice(currentVariant, ProductResult)
                  ?.stock_status === 'IN-STOCK'
                  ? `In Stock (${
                      getVariantPrice(currentVariant, ProductResult)
                        ?.stock_count
                    })`
                  : 'Out of Stock'}
              </Text>
            </View>
            <View style={{height: 10}} />
            {/* SkU */}
            <View
              style={[
                styles.PriceflexView,
                {
                  justifyContent: 'flex-start',
                  width: '100vw',
                  gap: 10,
                  display: 'flex',
                },
              ]}>
              <Text
                style={[
                  styles.saleText,
                  {color: activeColors.DES_TEXT_COLOR, width: '15%'},
                ]}>
                SKU
              </Text>
              <Text
                style={[styles.saleText, {color: activeColors.DES_TEXT_COLOR}]}>
                {getVariantPrice(
                  currentVariant,
                  ProductResult,
                )?.varient_unique_id?.slice(0, 8)}
              </Text>
            </View>
            <View style={{height: 10}} />
            {/* VARIANTS */}
            <View style={{paddingVertical: 10, gap: 15}}>
              {/* color */}
              <View style={[styles.flexOne, {gap: 15}]}>
                <Text
                  style={[styles.text, {color: activeColors.DES_TEXT_COLOR}]}>
                  {STRINGS.productDetails.color}
                </Text>
                <View
                  style={[CENTER_FLEX_WRAP, {justifyContent: 'flex-start'}]}>
                  {_.get(ProductResult, '[0].product_variants', []).map(
                    (res, index) => {
                      return (
                        <View style={[styles.roundFlexView]} key={index}>
                          <TouchableOpacity
                            style={[
                              styles.roundBackView,
                              {
                                backgroundColor:
                                  currentVariant === res.varient_unique_id
                                    ? '#ececec'
                                    : null,
                              },
                            ]}
                            onPress={() =>
                              setCurrentVariant(res.varient_unique_id)
                            }>
                            <View
                              style={[
                                styles.roundView,
                                {backgroundColor: res.product_variant_color},
                              ]}
                            />
                          </TouchableOpacity>
                        </View>
                      );
                    },
                  )}
                </View>
              </View>
              {/* size */}
              {/* <View style={[styles.flexTwo, {gap: 15}]}>
                <Text
                  style={[styles.text, {color: activeColors.DES_TEXT_COLOR}]}>
                  {STRINGS.productDetails.size}
                </Text>
                <View
                  style={{
                    display: 'flex',
                    gap: 5,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                  }}>
                  {_.get(ProductResult, '[0].product_variants', []).map(
                    (res, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          style={[
                            [
                              styles.sizeView,
                              {
                                backgroundColor:
                                  currentVariant === res.varient_unique_id
                                    ? colors.BUTTON_BACKGROUND_COLOR
                                    : null,
                                borderColor:
                                  currentVariant === res.varient_unique_id
                                    ? null
                                    : activeColors.BORDER_COLOR,
                              },
                            ],
                          ]}
                          onPress={() =>
                            setCurrentVariant(res.varient_unique_id)
                          }>
                          <Text
                            style={[
                              styles.sizeText,
                              {
                                color:
                                  currentVariant === res.varient_unique_id
                                    ? colors.WHITE_COLOR
                                    : colors.BUTTON_BACKGROUND_COLOR,
                                fontSize: 14,
                              },
                            ]}>
                            {res.stock_variant_size}
                          </Text>
                        </TouchableOpacity>
                      );
                    },
                  )}
                </View>
              </View> */}
            </View>

            {/* DESCRIPTION */}
            <ProductDetailsExtra
              currentVariant={currentVariant}
              ProductResult={ProductResult}
              deliveryCharges={deliveryCharges}
            />
            <ViewAllContainer
              name={'Related Products'}
              customText={styles.nameText}
              customView={{marginHorizontal: 9}}
              viveAll={true}
            />
            <View style={{width: '100%'}}>
              <ProductCard
                fetchDatas={fetchProductData}
                products={_.shuffle(allProducts)}
                customWidth={true}
                customHorizontalpadding={true}
                variantAlter={true}
                setCurrentVariant={setCurrentVariant}
              />
            </View>
          </View>
        </ScrollView>
      </View>

      {!loading && (
        <View
          style={[
            styles.buttonBackView,
            {
              backgroundColor: activeColors.SCREEN_BACKGROUND_COLOR,
              paddingVertical: 4,
            },
          ]}>
          <TouchableOpacity
            onPress={() => {
              handleAddtoFavorite(_.get(ProductResult, '[0]._id', ''));
            }}
            style={[
              styles.drawerView,
              {backgroundColor: activeColors.DRAWER_COLOR},
            ]}>
            {CartStatus(myFavoriteProducts, currentVariant) ? (
              <Image source={assets.favTwo} />
            ) : (
              <Image source={assets.favOne} />
            )}
          </TouchableOpacity>
          <MyButton
            text={`${
              CartStatus(myCarProducts, currentVariant)
                ? 'Continue to Shopping Cart'
                : 'Add to Cart Shopping Cart'
            }`}
            buttonView={styles.buttonView}
            // onPress={AddressPress}
            onPress={() => {
              handleAddtocard(_.get(ProductResult, '[0]._id', ''));
            }}
          />
        </View>
      )}

      <HomeSafeAreaBottom />
      {loading && <Loader />}
      {successMessage && (
        <Success
          setSuccessMessage={setSuccessMessage}
          image={require('../../assets/images/mogo/images/requestsuccess.png')}
          content={'Request sent successfully'}
          btnText={'close'}
        />
      )}

      <BottomSheet ref={res_sheet} height={150}>
        <View
          style={[
            CENTER_DIV,
            {
              flexDirection: 'column',
              width: '100%',
              height: 150,
              paddingHorizontal: 10,
            },
          ]}>
          <TextInput
            placeholder="Enter Your Required Count"
            keyboardType="numeric"
            onChangeText={e => {
              setRequiredCount(e);
            }}
            style={{
              borderBottomWidth: 1,
              width: '100%',
              borderBottomColor: 'lightgrey',
            }}
          />
          <View style={{height: 10}} />
          <TouchableOpacity
            onPress={handleSendBulkRequest}
            style={[
              CENTER_DIV,
              {
                backgroundColor: MOGO_COLORS.secondaryGreen,
                height: 40,
                alignItems: 'center',
                borderRadius: 4,
                width: '100%',
              },
            ]}>
            {btnLoading ? (
              <ActivityIndicator color={'#fff'} />
            ) : (
              <Text style={{color: 'white'}}>Send Request</Text>
            )}
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
};

export default MogoProductDetails;

//  <Modal animationType="none" transparent={true} visible={modalVisible}>
//    <View style={styles.modalContainer}>
//      <View
//        style={[
//          styles.modalContent,
//          {backgroundColor: activeColors.HOME_SAFE_AREA_VIEW},
//        ]}>
//        <View
//          style={[
//            styles.flexSaveAddView,
//            {backgroundColor: activeColors.MODAL_SAVE_ADD_VIEW},
//          ]}>
//          <View style={styles.saveAddView}>
//            <Text
//              style={[
//                styles.saveAddText,
//                {color: activeColors.WHITE_TEXT_COLOR},
//              ]}>
//              {STRINGS.productDetailModal.saveAdd}
//            </Text>
//          </View>
//          <TouchableOpacity style={styles.addNewAddView} onPress={addAddress}>
//            <Text style={styles.addNewAddText}>
//              {STRINGS.productDetailModal.addNewAdd}
//            </Text>
//          </TouchableOpacity>
//        </View>

//        <View style={{height: 10}} />

//        <AddressView
//          imageSource={assets.address}
//          name={STRINGS.productDetailModal.homeAddress}
//          title={STRINGS.productDetailModal.name}
//          number={STRINGS.productDetailModal.number}
//          address={STRINGS.productDetailModal.address}
//        />
//        <AddressView
//          imageSource={assets.officeAddress}
//          name={STRINGS.productDetailModal.ofcAddress}
//          title={STRINGS.productDetailModal.name}
//          number={STRINGS.productDetailModal.number}
//          address={STRINGS.productDetailModal.address}
//        />

//        <View style={{height: 20}} />
//        <MyButton
//          text={STRINGS.productDetailModal.confirmAddress}
//          onPress={confirmPress}
//        />
//      </View>
//    </View>
//  </Modal>;
