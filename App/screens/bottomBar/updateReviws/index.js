import React, {useContext} from 'react';
import {View, Text, TextInput, Image} from 'react-native';
import {styles} from './styles';
import HomeSafeAreaView from '../../../components/homeSafeAreaView';
import StatusBarComponents from '../../../components/statusBarComponent';
import HomeArrowView from '../../../components/homeArrowView';
import STRINGS from '../../../utils/constants/string';
import {ThemeContext} from '../../../contextes/themeContext';
import {colors} from '../../../utils/colors';
import assets from '../../../utils/assets/assets';
import BottomSafeAreaView from '../../../components/bottomSafeAreaView';
import HomeSafeAreaBottom from '../../../components/homeSafeAreaBottom';
import MyButton from '../../../components/myButton';
import { CONFIRM_ADDRESS } from '../../../navigation/stackNavigation';

const numberOfImages = 4;

const UpdateReviews = ({navigation}) => {
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];


  const backPress = () => {
    navigation.goBack()
  }

  return (
    <>
      <HomeSafeAreaView />
      <StatusBarComponents />
      <HomeArrowView title={STRINGS.review.title} onPress={backPress}/>
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
          <Text style={[styles.text, {color: activeColors.WHITE_TEXT_COLOR}]}>
            {STRINGS.updateReview.title}
          </Text>

          <View
            style={[
              styles.inputView,
              {
                borderColor: activeColors.BORDER_COLOR,
                backgroundColor: activeColors.HOME_SAFE_AREA_VIEW,
              },
            ]}>
            <TextInput
              placeholderTextColor={activeColors.DES_TEXT_COLOR}
              style={[styles.inputText, {color: activeColors.DES_TEXT_COLOR}]}
              multiline
            />
          </View>

          <View>
            <Text
              style={[styles.thinkText, {color: activeColors.DES_TEXT_COLOR}]}>
              {STRINGS.updateReview.think}
            </Text>
          </View>
          <View style={{height: 30}}></View>
          <View>
            <Text
              style={[styles.rateText, {color: activeColors.WHITE_TEXT_COLOR}]}>
              {STRINGS.updateReview.rateProduct}
            </Text>
          </View>

          <View style={styles.starView}>
            {Array.from({length: numberOfImages}).map((_, index) => (
              <Image
                key={index}
                source={assets.largeStarYellow}
                style={styles.yellowImg}
              />
            ))}
            <Image source={assets.largeStar} style={styles.yellowImg} />
          </View>
        </View>
      </View>
      <View style={{backgroundColor: activeColors.FLEX_VIEW_COLOR , paddingBottom: 10}}>
        <MyButton text={STRINGS.updateReview.submit} onPress={backPress}/>
      </View>
      <HomeSafeAreaBottom />
    </>
  );
};

export default UpdateReviews;
