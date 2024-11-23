import React, {useContext} from 'react';
import {View, Text, Image, SafeAreaViewBase} from 'react-native';
import HomeSafeAreaView from '../../../components/homeSafeAreaView';
import StatusBarComponents from '../../../components/statusBarComponent';
import HomeArrowView from '../../../components/homeArrowView';
import {ThemeContext} from '../../../contextes/themeContext';
import {colors} from '../../../utils/colors';
import {styles} from './styles';
import STRINGS from '../../../utils/constants/string';
import assets from '../../../utils/assets/assets';
import StyleTextInput from '../../../components/stylePasswordTextInput';
import HomeSafeAreaBottom from '../../../components/homeSafeAreaBottom';
import MyButton from '../../../components/myButton';

const AddCardPayment = ({navigation}) => {
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const backPress = () => {
    navigation.goBack();
  };

  return (
    <>
      <HomeSafeAreaView />
      <StatusBarComponents />
      <HomeArrowView title={STRINGS.payment.title} onPress={backPress} />
      {/* <View
        style={[
          styles.viewContainer,
          {backgroundColor: activeColors.HOME_SAFE_AREA_VIEW},
        ]}>
        <View
          style={[
            styles.sunViewContainer,
            {backgroundColor: activeColors.FLEX_VIEW_COLOR},
          ]}>
          <View style={styles.imgView}>
            <Image source={assets.card} style={styles.img} />
          </View>

          <StyleTextInput
            title={STRINGS.addCard.cardNo}
            placeholder={'g'}
            placeholderText={'1231 - 2312 - 3123 - 1231'}
            value={STRINGS.addCard.cardNo}
          />
          <View style={styles.flexView}>
            <View style={{flex: 1, marginRight: 5}}>
              <StyleTextInput
                title={STRINGS.addCard.exDate}
                placeholder={''}
                placeholderText={'12/12'}
                customView={{width: '100%'}}
                value={STRINGS.addCard.exDate}
              />
            </View>
            <View style={{flex: 1, marginLeft: 5}}>
              <StyleTextInput
                title={STRINGS.addCard.securityCode}
                placeholder={''}
                placeholderText={'1219'}
                customView={{width: '100%'}}
                value={STRINGS.addCard.securityCode}
              />
            </View>
          </View>

          <StyleTextInput
            title={STRINGS.addCard.cardHolder}
            value={STRINGS.addCard.cardHolder}
            placeholder={''}
            placeholderText={'John Doe'}
          />
        </View>
      </View> */}
      <View
        style={{
          backgroundColor: activeColors.FLEX_VIEW_COLOR,
          paddingBottom: 10,
        }}>
        <MyButton text={STRINGS.addCard.save} onPress={backPress} />
      </View>
      <HomeSafeAreaBottom />
    </>
  );
};

export default AddCardPayment;
