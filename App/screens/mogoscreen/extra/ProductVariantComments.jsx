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
import {getVariantComments, makeComment} from '../../../utils/apihelper';
import CommentView from '../../../components/productDetailsCommentView';
import STRINGS from '../../../utils/constants/string';
import assets from '../../../utils/assets/assets';
import Loader from '../Loader';

const ProductVariantComments = ({route}) => {
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

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await getVariantComments(_.get(route, 'params.state', ''));
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
        message: commentsData,
      };
      const result = await makeComment(formData);
      setCommentsData('');
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
      <HomeArrowView title={'Comments'} onPress={backPress} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{paddingHorizontal: 15, paddingBottom: 100}}>
          {allComments.map((res, index) => {
            return (
              <CommentView
                key={res._id}
                imageSource={assets.profilePicture}
                name={_.get(res, 'user_id.user_name', 'g')}
                email={_.get(res, 'user_id.user_email', 'g')}
                url={_.get(res, 'user_id.user_profile', '')}
                date={_.get(res, 'createdAt', 'f')}
                content={_.get(res, 'message', 'df')}
                color={_.get(res, 'user_id.profile_color', 'df')}
                rating={false}
                field={'comments'}
                fetchData={fetchData}
                id={res._id}
              />
            );
          })}
        </View>
      </ScrollView>
      <PostButton
        placeholder="comments"
        setCommentsData={setCommentsData}
        err={err}
        setError={setError}
        hanldeSubmit={handlePostCommen}
        loading={loading}
        commentsData={commentsData}
      />
      {loading && <Loader />}
    </View>
  );
};

export default ProductVariantComments;
