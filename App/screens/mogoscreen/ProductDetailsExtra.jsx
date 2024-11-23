/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import ViewAllContainer from '../../components/viewAllContainer';
import {styles} from './styles';
import {colors, MOGO_COLORS} from '../../utils/colors';
import {ThemeContext} from '../../contextes/themeContext';
import STRINGS from '../../utils/constants/string';
import Icon, {Icons} from '../../utils/icon';

import CommentView from '../../components/productDetailsCommentView';
import {senExtraBold} from '../../utils/fontsSize';
import {MOGO_PRODUCT_DETAILS, REVIEWS} from '../../navigation/stackNavigation';
import {useNavigation} from '@react-navigation/native';
import _ from 'lodash';
import assets from '../../utils/assets/assets';

import {
  getDeliveryChargesPrice,
  getVariantPrice,
  mrpPriceHelper,
  offerDiscountHelper,
  sellingPriceHelper,
} from './helper/priceHelper';
import {CENTER_DIV, CENTER_FLEX_WRAP} from '../../utils/styles/responsive';
import MyTextInput from '../../components/myTextInput';
import {
  getDeliveryCharges,
  getVariantComments,
  getVariantReviews,
} from '../../utils/apihelper';
import CommentView2 from '../../components/productDetailsCommentView/CommentView2';
import StarRating from 'react-native-star-rating-widget';
import {useIsFocused} from '@react-navigation/native';

const ProductDetailsExtra = ({
  ProductResult,
  currentVariant,
  deliveryCharges,
}) => {
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const [textVisible, setTextVisible] = useState(false);
  const [currentid, setCurrentid] = useState(1);

  const [deliveryDuration, setDeliveryDuration] = useState('');

  const viewMorePress = () => {
    setTextVisible(!textVisible);
  };

  const navigation = useNavigation();

  const isFocus = useIsFocused();

  const reviewsPress = () => {
    navigation.navigate(REVIEWS);
  };
  const [comments, setAllComments] = useState([]);
  const [reviews, setAllReviews] = useState([]);
  const [loading, setLoading] = useState([]);
  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await getVariantComments(currentVariant);
      setAllComments(_.get(result, 'data.data', []));
      const variantReviews = await getVariantReviews(currentVariant);
      setAllReviews(_.get(variantReviews, 'data.data', []));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentVariant, isFocus]);

  let items = [
    {
      id: 1,
      name: 'Description',
    },
    {
      id: 2,
      name: 'Additional Information',
    },
    // {
    //   id: 3,
    //   name: 'Shipping & Location',
    // },
    {
      id: 4,
      name: 'Reviews',
    },
    {
      id: 5,
      name: 'Comments',
    },
  ];

  const DescriptionDetails = () => {
    return (
      <View
        style={[
          styles.desBox,
          {borderColor: activeColors.BORDER_COLOR, marginVertical: 10},
        ]}>
        <View style={{height: 10}} />
        {!textVisible === true ? (
          <Text style={[styles.conText, {color: activeColors.DES_TEXT_COLOR}]}>
            {_.get(ProductResult, '[0].product_descriptions', '').slice(0, 150)}
          </Text>
        ) : (
          <>
            <Text
              style={[styles.conText, {color: activeColors.DES_TEXT_COLOR}]}>
              {_.get(ProductResult, '[0].product_descriptions')}
            </Text>
            <View style={{height: 10}} />
          </>
        )}

        <TouchableOpacity
          style={styles.viewMoreContainer}
          onPress={viewMorePress}>
          <View style={styles.viewMoreView}>
            <Text style={styles.moreText}>
              {textVisible ? 'View Less' : 'View More'}
            </Text>
          </View>

          <View style={styles.moreIconView}>
            <Icon
              type={Icons.Entypo}
              name={'chevron-down'}
              color={colors.BUTTON_BACKGROUND_COLOR}
              size={20}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const PriceDetails = () => {
    return (
      <View
        style={{
          width: '100%',
          minHeight: 100,
          display: 'flex',
          justifyContent: 'flex-start',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 20,
          paddingVertical: 15,
          paddingHorizontal: 15,
          marginVertical: 10,
        }}>
        <View style={styles.textView}>
          <Text style={[styles.conText, {color: activeColors.DES_TEXT_COLOR}]}>
            MRP Price
          </Text>
          <Text
            style={[
              styles.text,
              {
                color: activeColors.DES_TEXT_COLOR,
                textDecorationLine: 'line-through',
                textDecorationStyle: 'solid',
                textDecorationColor: MOGO_COLORS.redColor,
              },
            ]}>
            ₹ {getVariantPrice(currentVariant, ProductResult)?.mogo_mrp_price}
          </Text>
        </View>
        <View style={styles.textView}>
          <Text style={[styles.conText, {color: activeColors.DES_TEXT_COLOR}]}>
            Selling Price
          </Text>
          <Text style={[styles.text, {color: MOGO_COLORS.primaryBlue}]}>
            ₹
            {getVariantPrice(currentVariant, ProductResult)?.mogo_selling_price}
          </Text>
        </View>

        <View style={styles.textView}>
          <Text style={[styles.conText, {color: activeColors.DES_TEXT_COLOR}]}>
            Weight
          </Text>
          <Text style={[styles.text, {color: MOGO_COLORS.offerYellow}]}>
            {getVariantPrice(currentVariant, ProductResult)?.product_weight} KG
          </Text>
        </View>
        <View style={styles.textView}>
          <Text style={[styles.conText, {color: activeColors.DES_TEXT_COLOR}]}>
            Brand
          </Text>
          <Text style={[styles.text, {color: MOGO_COLORS.primaryBlue}]}>
            {_.get(ProductResult, '[0].product_brand_id', [])}
          </Text>
        </View>
        <View style={styles.textView}>
          <Text style={[styles.conText, {color: activeColors.DES_TEXT_COLOR}]}>
            Fabric
          </Text>
          <Text style={[styles.text, {color: MOGO_COLORS.primaryBlue}]}>
            {_.get(ProductResult, '[0].product_fabric_id', [])}
          </Text>
        </View>
        {/* <View style={styles.textView}>
          <Text style={[styles.conText, {color: activeColors.DES_TEXT_COLOR}]}>
            You Save
          </Text>
          <Text style={[styles.text, {color: MOGO_COLORS.secondaryGreen}]}>
            ₹
            {Math.abs(
              getVariantPrice(currentVariant, ProductResult)?.mogo_mrp_price -
                getVariantPrice(currentVariant, ProductResult)
                  ?.mogo_selling_price,
            )}
          </Text>
        </View> */}
      </View>
    );
  };

  const handleCheck = () => {
    try {
      if (deliveryDuration.length !== 6) {
        return Alert.alert('Please Enter Valid picode');
      } else {
      }
    } catch (err) {}
  };

  const VendorInfo = () => {
    return (
      <View
        style={{
          width: '100%',
          minHeight: 100,
          display: 'flex',
          justifyContent: 'flex-start',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 20,
          paddingVertical: 15,
          paddingHorizontal: 15,
          marginVertical: 10,
        }}>
        <View style={styles.textView}>
          <Text
            numberOfLines={1}
            style={[styles.conText, {color: activeColors.DES_TEXT_COLOR}]}>
            Store Name
          </Text>
          <Text
            style={[
              styles.text,
              {
                color: activeColors.DES_TEXT_COLOR,
                width: '50%',
              },
            ]}>
            {_.get(ProductResult, '[0].user_id.company_name', [])}
          </Text>
        </View>
        <View style={styles.textView}>
          <Text style={[styles.conText, {color: activeColors.DES_TEXT_COLOR}]}>
            Shipping Address
          </Text>
          <Text
            style={[
              styles.text,
              {
                color: activeColors.DES_TEXT_COLOR,
                width: '50%',
              },
            ]}
            numberOfLines={4}>
            {_.get(ProductResult, '[0].user_id.address', [])}
          </Text>
        </View>
        {/* <View style={styles.textView}>
          <Text style={[styles.conText, {color: activeColors.DES_TEXT_COLOR}]}>
            Delivery Charge
          </Text>
          <Text
            style={[
              styles.text,
              {
                color: activeColors.DES_TEXT_COLOR,
                width: '50%',
              },
            ]}
            numberOfLines={4}>
            ₹
            {getDeliveryChargesPrice(
              deliveryCharges,
              getVariantPrice(currentVariant, ProductResult)?.product_weight,
            )}
          </Text>
        </View>
        <View style={[styles.textView, {gap: 0, alignItems: 'flex-end'}]}>
          <Text
            style={[
              styles.conText,
              {color: activeColors.DES_TEXT_COLOR, width: '50%'},
            ]}>
            Delivery Time
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '50%',
              alignItems: 'flex-end',
              gap: 15,
            }}>
            <TextInput
              placeholder=" Enter pincode"
              keyboardType="numeric"
              maxLength={6}
              value={deliveryDuration}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: 'lightgrey',
                padding: 0,
                margin: 0,
              }}
              onChangeText={e => {
                setDeliveryDuration(e);
              }}
            />
            <TouchableOpacity onPress={handleCheck}>
              <Text
                style={{color: MOGO_COLORS.secondaryGreen, fontWeight: '500'}}>
                Check
              </Text>
            </TouchableOpacity>
          </View>
        </View> */}
      </View>
    );
  };

  const ReviewInfo = () => {
    return loading ? (
      <View style={[CENTER_DIV, {width: '100%', height: 100}]}>
        <ActivityIndicator color={MOGO_COLORS.secondaryGreen} />
      </View>
    ) : (
      <>
        {(reviews.length > 1 ? reviews?.slice(0, 3) : reviews).map(
          (res, index) => {
            return (
              <CommentView
                key={res._id}
                imageSource={assets.profilePicture}
                name={_.get(res, 'user_id.user_name', '')}
                email={_.get(res, 'user_id.user_email', '')}
                url={_.get(res, 'user_id.user_profile', '')}
                date={_.get(res, 'createdAt', '')}
                content={_.get(res, 'review', '')}
                color={_.get(res, 'user_id.profile_color', 'df')}
                rating={_.get(res, 'ratings', '')}
                field={'review'}
                fetchData={fetchData}
                id={res._id}
              />
            );
          },
        )}
        <View style={{height: 20}} />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ProductVariantReviews', {
              state: currentVariant,
            });
          }}
          style={[
            CENTER_FLEX_WRAP,
            {
              width: '100%',
              height: 40,
              borderRadius: 4,
              backgroundColor: MOGO_COLORS.secondaryGreen,
              flexWrap: 'nowrap',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>
            View All or Add Review
          </Text>
        </TouchableOpacity>
      </>
    );
  };

  const CommentsInfo = () => {
    return loading ? (
      <View style={[CENTER_DIV, {width: '100%', height: 100}]}>
        <ActivityIndicator color={MOGO_COLORS.secondaryGreen} />
      </View>
    ) : (
      <>
        {(comments.length > 1 ? comments?.slice(0, 3) : comments).map(
          (res, index) => {
            return (
              <CommentView
                key={res._id}
                imageSource={assets.profilePicture}
                name={_.get(res, 'user_id.user_name', 'g')}
                url={_.get(res, 'user_id.user_profile', '')}
                email={_.get(res, 'user_id.user_email', 'g')}
                date={_.get(res, 'createdAt', 'f')}
                content={_.get(res, 'message', 'df')}
                color={_.get(res, 'user_id.profile_color', 'df')}
                rating={false}
                field={'comments'}
                fetchData={fetchData}
                id={res._id}
              />
            );
          },
        )}
        <View style={{height: 20}} />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ProductVariantComments', {
              state: currentVariant,
            });
          }}
          style={[
            CENTER_FLEX_WRAP,
            {
              width: '100%',
              height: 40,
              borderRadius: 4,
              backgroundColor: MOGO_COLORS.secondaryGreen,
              flexWrap: 'nowrap',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>
            View All or Add Comment
          </Text>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            flexDirection: 'row',
          }}>
          {items.map((res, index) => {
            return (
              <TouchableOpacity
                onPress={() => setCurrentid(res.id)}
                style={{
                  minWidth: 10,
                  paddingHorizontal: 2,
                  alignItems: 'start',
                  flexDirection: 'column',
                  display: 'flex',
                }}>
                <Text
                  style={[
                    styles.viewAllText,
                    {
                      color: activeColors.WHITE_TEXT_COLOR,
                      marginVertical: 8,
                    },
                  ]}>
                  {res.name}
                </Text>

                <View
                  style={{
                    height: 4,
                    backgroundColor:
                      currentid === res.id
                        ? MOGO_COLORS.secondaryGreen
                        : 'transparent',
                    width: '70%',
                  }}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      {currentid === 1 && <DescriptionDetails />}
      {currentid === 2 && <PriceDetails />}
      {currentid === 3 && <VendorInfo />}
      {currentid === 4 && <ReviewInfo />}
      {currentid === 5 && <CommentsInfo />}
      {/* <ViewAllContainer
        name={STRINGS.productDetails.reviewProduct}
        customText={styles.nameText}
        customView={{marginHorizontal: 9}}
        viewAllPress={reviewsPress}
      />
      <View style={styles.starFlexContainer}>
        <View style={styles.startRowView}>
          {Array.from({length: 4}).map((_, index) => (
            <Image
              key={index}
              source={assets.bigStar}
              style={styles.yellowImg}
            />
          ))}
          <Image source={assets.star} style={styles.img} />
        </View>

        <Text
          style={[
            styles.rentText,
            {
              color: '#787878',
              fontFamily: senExtraBold,
              paddingRight: 6,
            },
          ]}>
          {STRINGS.productDetails.rent}
        </Text>
        <Text
          style={[
            styles.saleText,
            {color: activeColors.DES_TEXT_COLOR, alignSelf: 'center'},
          ]}>
          {STRINGS.productDetails.review}
        </Text>
      </View>
      <CommentView
        imageSource={assets.profilePicture}
        name={STRINGS.productDetails.personName}
        date={STRINGS.productDetails.date}
        content={STRINGS.productDetails.reviewCon}
      />
      <CommentView
        imageSource={assets.profilePicture}
        name={STRINGS.productDetails.personName}
        date={STRINGS.productDetails.date}
        content={STRINGS.productDetails.reviewCon}
      /> */}
    </>
  );
};

export default ProductDetailsExtra;

//  {
//    /* <TouchableOpacity
//           onPress={() => {
//             navigation.navigate('DisplayStore', {
//               state: _.get(ProductResult, '[0].user_id', []),
//             });
//           }}
//           style={[
//             CENTER_FLEX_WRAP,
//             {
//               width: '100%',
//               height: 40,
//               borderRadius: 4,
//               borderColor: MOGO_COLORS.secondaryGreen,
//               borderWidth: 1,
//               flexWrap: 'nowrap',
//               alignItems: 'center',
//               justifyContent: 'center',
//             },
//           ]}>
//           <Text style={{color: MOGO_COLORS.secondaryGreen}}>View Store</Text>
//         </TouchableOpacity> */
//  }
