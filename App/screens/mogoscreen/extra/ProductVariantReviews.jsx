/* eslint-disable no-catch-shadow */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import CartSafeAreaView from '../../../components/cartSafeAreaView';
import StatusBarComponents from '../../../components/statusBarComponent';
import HomeArrowView from '../../../components/homeArrowView';
import {useNavigation} from '@react-navigation/native';
import {styles} from '../styles';
import {colors} from '../../../utils/colors';
import {ThemeContext} from '../../../contextes/themeContext';
import Icon, {Icons} from '../../../utils/icon';
import PostButton from './PostButton';
import _ from 'lodash';
import {
  getVariantComments,
  getVariantReviews,
  makeComment,
  makeReviews,
} from '../../../utils/apihelper';
import CommentView from '../../../components/productDetailsCommentView';
import STRINGS from '../../../utils/constants/string';
import assets from '../../../utils/assets/assets';
import Loader from '../Loader';
import StarRating from 'react-native-star-rating-widget';

const ProductVariantReviews = ({route}) => {
  const navigation = useNavigation();

  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const backPress = () => {
    navigation.goBack();
  };

  const [commentsData, setCommentsData] = useState('');
  const [err, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [allComments, setAllComments] = useState([]);

  const [ratings, setRatings] = useState(3);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await getVariantReviews(_.get(route, 'params.state', ''));

      setAllComments(_.get(result, 'data.data', []));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePostCommen = async () => {
    try {
      setLoading(true);
      if (!commentsData) {
        setLoading(false);
        return setError(true);
      }
      const formData = {
        variant_id: _.get(route, 'params.state', ''),
        review: commentsData,
        ratings: ratings,
      };
      const result = await makeReviews(formData);
      setCommentsData('');
      setRatings(3);
      fetchData();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: activeColors.HOME_SAFE_AREA_VIEW}}>
      <CartSafeAreaView />
      <StatusBarComponents />
      <HomeArrowView title={'Reviews'} onPress={backPress} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{paddingHorizontal: 15, paddingBottom: 100}}>
          {allComments.map((res, index) => {
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
                err={err}
                fetchData={fetchData}
                field={'review'}
                id={res._id}
              />
            );
          })}
        </View>
      </ScrollView>

      <PostButton
        placeholder="Review..."
        setCommentsData={setCommentsData}
        err={err}
        setError={setError}
        hanldeSubmit={handlePostCommen}
        loading={loading}
        commentsData={commentsData}
        ratings={ratings}
        setRatings={setRatings}
      />
      {loading && <Loader />}
    </View>
  );
};

export default ProductVariantReviews;
