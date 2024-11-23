import {View, Text, ScrollView} from 'react-native';
import React, {useContext} from 'react';
import HomeSafeAreaView from '../../../components/homeSafeAreaView';
import HomeArrowView from '../../../components/homeArrowView';
import HomeSafeAreaBottom from '../../../components/homeSafeAreaBottom';
import {styles} from './styles';
import {ThemeContext} from '../../../contextes/themeContext';
import {colors} from '../../../utils/colors';
import LoremText from '../../../components/loremText';
import STRINGS from '../../../utils/constants/string';
import StatusBarComponents from '../../../components/statusBarComponent';

const AboutUs = ({navigation}) => {
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const backPress = () => {
    navigation.goBack();
  };

  return (
    <>
      <HomeSafeAreaView />
      <StatusBarComponents />
      <HomeArrowView onPress={backPress} title={STRINGS.aboutUs.title} />
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
          <ScrollView>
            <LoremText
              text={`Welcome to Mogo! The Founder is Mr. Mohan Kumar. We are a dynamic and innovative e-commerce platform that connects buyers and sellers from all over the world. At Mogo, we are committed to providing our users with a seamless and enjoyable shopping experience.

Our platform is designed to make buying and selling easy and hassle-free. Whether you are looking to purchase the latest fashion trends or sell your handmade crafts, Mogo is the perfect place to do it. With a wide range of categories to choose from, including fashion, beauty, home and garden, electronics, and more, there is something for everyone on Mogo.

Our team of experts is dedicated to ensuring that our users have access to the best products and services. We work hard to maintain the highest standards of quality, safety, and reliability on our platform. We constantly monitor our site to ensure that all listings meet our guidelines and are free from fraud and scams.

At Mogo, we believe in the power of community. We strive to create a platform where buyers and sellers can connect and build long-lasting relationships. Our community is made up of individuals from all walks of life who share a passion for great products and exceptional service.

We are committed to providing our users with the best possible experience. That’s why we offer a range of tools and features that make it easy to buy and sell on our platform. Our user-friendly interface is designed to be intuitive and easy to navigate, so you can find what you are looking for quickly and easily.`}
            />
          </ScrollView>
        </View>
      </View>
      <HomeSafeAreaBottom />
    </>
  );
};

export default AboutUs;
