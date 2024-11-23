/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import HomeSafeAreaView from '../../../components/homeSafeAreaView';
import DrawerView from '../../../components/drawerView';
import HomeArrowView from '../../../components/homeArrowView';
import {ThemeContext} from '../../../contextes/themeContext';
import {colors, MOGO_COLORS} from '../../../utils/colors';
import StatusBarComponents from '../../../components/statusBarComponent';

import MyFlatList from '../../../components/myFlatlist';
import RecomendedView from '../../../components/recomendedView';
import {productData} from '../homeScreen/data';
import {
  PRODUCT_DETAILS,
  NOTIFICATION,
} from '../../../navigation/stackNavigation';
import {
  collectMyWishList,
  getMyCartsProduct,
  getMyWishList,
  updateMyWishList,
} from '../../../utils/apihelper';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import GridCard from '../../mogoscreen/GridCard';
import responsive, {
  CENTER_DIV,
  CENTER_FLEX_WRAP,
} from '../../../utils/styles/responsive';
import _ from 'lodash';
import Loader from '../../mogoscreen/Loader';
import {
  CartStatus,
  getCurrentVariant,
} from '../../mogoscreen/helper/priceHelper';
import {
  nineFontPixel,
  oneThreeFontPixel,
  oneTwoFontPixel,
  senBold,
  senExtraBold,
  senMedium,
  senRegular,
} from '../../../utils/fontsSize';
import assets from '../../../utils/assets/assets';
import {ListCount} from '../../mogoscreen/redux/favSlice';
import {useDispatch} from 'react-redux';
import EmptyScreen from '../../mogoscreen/EmptyScreen';

const FavoritesScreen = ({headerHide}) => {
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const [wishList, setWishlist] = useState([]);

  const [product, setProduct] = useState(productData);

  const [myCarProducts, setMyCartProducts] = useState([]);

  const navigation = useNavigation();

  const productDetailsPress = () => {
    navigation.navigate(PRODUCT_DETAILS);
  };

  const notificationPress = () => {
    navigation.navigate(NOTIFICATION);
  };

  const openDrawer = () => {
    navigation.openDrawer();
  };

  const [refresNow, setRefresh] = useState(false);

  const [wishlistData, setWishlistData] = useState([]);
  const [loading, setLoading] = useState(true);

  const focus = useIsFocused();
  const dispatch = useDispatch();

  const [searchResult, setSearchResult] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await getMyWishList();
      const carts = await collectMyWishList();
      setMyCartProducts(_.get(carts, 'data.data', []));
      dispatch(ListCount({count: _.get(carts, 'data.data', []).length}));
      setSearchResult(_.get(result, 'data.data', []));
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [focus]);

  const handleViewDetails = (values, variant_id) => {
    let product = {
      _id: values._id,
      product_sub_category_id: values.product_sub_category_name,
      variant_id: variant_id,
    };
    navigation.navigate('MogoProductDetails', {
      state: {product: product, variant: ''},
    });
  };

  const handleAddtoFavorite = async cart_id => {
    try {
      setLoading(true);
      await updateMyWishList({id: cart_id});

      fetchData();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: activeColors.HOME_SAFE_AREA_VIEW}}>
      <HomeSafeAreaView />
      <StatusBarComponents />
      {!headerHide && (
        <DrawerView
          customView={{backgroundColor: activeColors.HOME_SAFE_AREA_VIEW}}
          titleProp={true}
          onlyTitle={'Favorite'}
          notification={notificationPress}
          drawerOnPress={openDrawer}
        />
      )}

      {_.isEmpty(searchResult) && !loading ? (
        <EmptyScreen
          image={require('../../../assets/images/mogo/images/emptyfavlist.jpg')}
          name="Favorite List"
        />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[CENTER_FLEX_WRAP, {paddingBottom: 100}]}>
            {searchResult.map((res, index) => {
              let variant = getCurrentVariant(
                _.get(res, 'product_id.product_variants', []),
                _.get(res, 'variant_id', ''),
              );

              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.productRenderView,
                    {
                      backgroundColor: activeColors.DRAWER_COLOR,
                      elevation: 2,
                      borderColor: _.get(
                        variant,
                        '[0].product_variant_color',
                        '',
                      ),
                      borderBottomWidth: 1,
                    },
                  ]}
                  onPress={() => {
                    handleViewDetails(
                      _.get(res, 'product_id', []),
                      _.get(res, 'variant_id', ''),
                    );
                  }}>
                  <TouchableOpacity style={[styles.productImgView]}>
                    <Image
                      source={{
                        uri: _.get(res, 'product_id.product_images[0][0]', ''),
                      }}
                      style={{
                        width: responsive.widthPixel(155),
                        height: 100,
                        borderRadius: 6,
                        paddingTop: 10,
                      }}
                      resizeMethod="scale"
                      resizeMode="cover"
                    />
                  </TouchableOpacity>

                  <View style={{paddingHorizontal: 15, paddingVertical: 10}}>
                    <Text
                      numberOfLines={1}
                      style={[
                        styles.titleText,
                        {color: activeColors.ICON_COLOR},
                      ]}>
                      {_.get(res, 'product_id.product_name', '')}
                    </Text>
                    <View style={{height: 3}} />
                    <Text
                      numberOfLines={1}
                      style={[styles.titleText, {color: 'gray', fontSize: 12}]}>
                      {_.get(
                        res,
                        'product_id.product_sub_category_nameactual',
                        '',
                      )}
                    </Text>
                    <View style={{height: 3}} />
                    {/* <View style={styles.starView}>
                    {Array.from({length: 4}).map((_, index) => (
                      <Image
                        key={index}
                        source={assets.yellowStar}
                        style={styles.yellowImg}
                      />
                    ))}
                    <Image source={assets.star} />
                  </View> */}
                    <View style={{height: 3}} />
                    <Text style={styles.priceText}>
                      ₹
                      {Number(
                        _.get(variant, '[0].mogo_selling_price', ''),
                      ).toLocaleString()}
                    </Text>
                  </View>
                  <View style={styles.flexView}>
                    <TouchableOpacity
                      onPress={() => {
                        handleAddtoFavorite(_.get(res, 'variant_id', ''));
                      }}>
                      <Image
                        source={
                          CartStatus(
                            myCarProducts,
                            _.get(res, 'variant_id', ''),
                          )
                            ? assets.favTwo
                            : assets.favOne
                        }
                      />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      )}

      {loading && <Loader />}
    </View>
  );
};

export const styles = StyleSheet.create({
  productRenderView: {
    paddingBottom: 4,
    width: responsive.widthPixel(155),
    marginVertical: Platform.OS === 'android' ? 2 : 2,
    justifyContent: 'center',
    borderRadius: 6,
    minHeight: 50,
  },
  titleView: {
    paddingHorizontal: 15,
    paddingVertical: 2,
    paddingTop: 8,
    height: 45,
    gap: 3,
  },
  productImgView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontFamily: senMedium,
    fontSize: oneTwoFontPixel,
  },
  flexView: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    right: 5,
  },
  priceView: {
    flex: 1,
    justifyContent: 'center',
  },
  priceText: {
    color: colors.BUTTON_BACKGROUND_COLOR,
    fontFamily: senBold,
    fontWeight: 'bold',
    fontSize: oneTwoFontPixel,
  },
  // priceText: {
  //   color: colors.BUTTON_BACKGROUND_COLOR,
  //   fontFamily: senBold,
  //   fontWeight: 'bold',
  //   fontSize: oneTwoFontPixel,
  // },
  starView: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingVertical: 6,
  },
  saleView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  saleText: {
    color: '#A9A9A9',
    fontFamily: senMedium,
    fontSize: nineFontPixel,
  },
  yellowImg: {
    marginHorizontal: 2,
  },
  perView: {
    backgroundColor: colors.BUTTON_BACKGROUND_COLOR,
    position: 'absolute',
    top: 0,
    left: 12,
    height: 23,
    width: 55,
    borderTopStartRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderEndEndRadius: 10,
  },
  perText: {
    color: colors.WHITE_COLOR,
    fontFamily: senBold,
    fontSize: nineFontPixel,
  },
  img: {
    borderRadius: 15,
    width: '85%',
    resizeMode: 'stretch',
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
    marginHorizontal: 15,
    paddingVertical: Platform.OS === 'android' ? 8 : 0,
  },
  availableView: {
    paddingHorizontal: 15,
    marginTop: 5,
  },
  availableText: {
    fontFamily: senMedium,
    fontSize: responsive.fontPixel(9.5),
  },
  progressLine: {
    height: 2.5,
    borderRadius: 5,
    marginTop: 8,
  },
  bar: {
    height: 2,
    backgroundColor: '#79c256',
    borderRadius: 10,
  },
});

export default FavoritesScreen;
