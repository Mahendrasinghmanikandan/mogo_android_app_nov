import React, {useContext} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import HomeSafeAreaView from '../../../components/homeSafeAreaView';
import StatusBarComponents from '../../../components/statusBarComponent';
import HomeArrowView from '../../../components/homeArrowView';
import {styles} from './styles';
import {colors} from '../../../utils/colors';
import {ThemeContext} from '../../../contextes/themeContext';
import HomeSafeAreaBottom from '../../../components/homeSafeAreaBottom';
import CommentView from '../../../components/productDetailsCommentView';
import assets from '../../../utils/assets/assets';
import {senExtraBold} from '../../../utils/fontsSize';
import STRINGS from '../../../utils/constants/string';
import {UPDATE_REVIEWS} from '../../../navigation/stackNavigation';

const numberOfImages = 4;

const Reviews = ({navigation}) => {
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const updateReviewsPress = () => {
    navigation.navigate(UPDATE_REVIEWS);
  };

  const backPress = () => {
    navigation.goBack();
  };

  return (
    <>
      <HomeSafeAreaView />
      <StatusBarComponents />
      <HomeArrowView title={STRINGS.review.title} onPress={backPress} />
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
            <Text style={[styles.text, {color: activeColors.WHITE_TEXT_COLOR}]}>
              {STRINGS.review.reviewProduct}
            </Text>
            <View style={styles.starFlexContainer}>
              <View style={styles.startRowView}>
                {Array.from({length: numberOfImages}).map((_, index) => (
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
            />
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
            />
          </ScrollView>

          <View style={styles.editContainer}>
            <TouchableOpacity
              style={styles.buttonView}
              onPress={updateReviewsPress}>
              <Image source={assets.edit} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <HomeSafeAreaBottom />
    </>
  );
};

export default Reviews;
