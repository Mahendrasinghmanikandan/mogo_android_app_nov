/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ThemeContext} from '../../contextes/themeContext';
import {useContext} from 'react';
import {MOGO_COLORS, colors} from '../../utils/colors';
import assets from '../../utils/assets/assets';
import responsive, {CENTER_FLEX_WRAP} from '../../utils/styles/responsive';
import {
  senMedium,
  oneTwoFontPixel,
  senBold,
  nineFontPixel,
} from '../../utils/fontsSize';
import _ from 'lodash';
import {CartStatus, sellingPriceHelper} from './helper/priceHelper';
import {
  addToWishList,
  collectMyWishList,
  updateMyWishList,
} from '../../utils/apihelper';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {ListCount} from './redux/favSlice';
import {useDispatch} from 'react-redux';

const numberOfImages = 4;

const GridCard = props => {
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const {
    customWidth,
    sale,
    per,
    perView,
    imageOnPress,
    onPress,
    available,
    children,
    products,

    makecardtoadd,
    wishList,
  } = props;
  const [selectedFav, setSelectedFav] = useState(false);
  const [wishlistData, setWishlistData] = useState([]);

  const favPress = () => {
    setSelectedFav(!selectedFav);
  };
  const navigation = useNavigation();

  const handleViewDetails = (values, variant_id) => {
    let product = {
      _id: values._id,
      product_sub_category_id: values.product_sub_category_name,
      variant_id: '',
    };
    navigation.navigate('MogoProductDetails', {
      state: {product: product, variant: ''},
    });
  };
  const dispatch = useDispatch();

  const [loading, setLoading] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const carts = await collectMyWishList();
      setWishlistData(_.get(carts, 'data.data', []));
      dispatch(ListCount({count: _.get(carts, 'data.data', []).length}));
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [products]);

  const handleAddtoFavorite = async (product_id, variant_id) => {
    try {
      setLoading(true);
      if (CartStatus(wishlistData, variant_id)) {
        await updateMyWishList({id: variant_id});
        setLoading(false);
        return fetchData();
      }
      let formData = {
        variant_id: variant_id,
        product_id: product_id,
      };
      await addToWishList(formData);
      fetchData();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[CENTER_FLEX_WRAP, {paddingVertical: 10}]}>
      {products.map((res, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={[
              styles.productRenderView,
              {
                backgroundColor: activeColors.DRAWER_COLOR,
                elevation: 2,
              },
            ]}
            onPress={() => {
              handleViewDetails(res);
            }}>
            <TouchableOpacity style={[styles.productImgView]}>
              <Image
                source={{
                  uri: _.get(res, 'product_images[0][0]'),
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
                style={[styles.titleText, {color: activeColors.ICON_COLOR}]}>
                {_.get(res, 'product_name', '')}
              </Text>
              <View style={{height: 3}} />
              <Text
                numberOfLines={1}
                style={[styles.titleText, {color: 'gray', fontSize: 12}]}>
                {_.get(res, 'product_sub_category_nameactual', '')}
              </Text>
              <View style={{height: 3}} />
              <View style={styles.starView}>
                {Array.from({length: numberOfImages}).map((_, index) => (
                  <Image
                    key={index}
                    source={assets.yellowStar}
                    style={styles.yellowImg}
                  />
                ))}
                <Image source={assets.star} />
                <View style={styles.saleView}>
                  <Text style={styles.saleText}>{sale}</Text>
                </View>
              </View>
              <View style={{height: 3}} />
              <Text style={styles.priceText}>
                ₹
                {_.get(
                  res,
                  'product_variants[0].mogo_mrp_price',
                  '',
                ).toLocaleString()}
              </Text>
            </View>
            <View style={styles.flexView}>
              {loading ? (
                <ActivityIndicator color={MOGO_COLORS.secondaryGreen} />
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    handleAddtoFavorite(
                      _.get(res, '_id', ''),
                      _.get(res, 'product_variants[0].varient_unique_id', ''),
                    );
                  }}>
                  <Image
                    source={
                      CartStatus(
                        wishlistData,
                        _.get(res, 'product_variants[0].varient_unique_id', ''),
                      )
                        ? assets.favTwo
                        : assets.favOne
                    }
                  />
                </TouchableOpacity>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
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
    // paddingHorizontal: 15,
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

export default GridCard;
