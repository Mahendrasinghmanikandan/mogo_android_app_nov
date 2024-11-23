/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Platform,
} from 'react-native';
import {paymentData} from './data';
import HomeSafeAreaView from '../../../components/homeSafeAreaView';
import StatusBarComponents from '../../../components/statusBarComponent';
import HomeArrowView from '../../../components/homeArrowView';
import {ThemeContext} from '../../../contextes/themeContext';
import {colors} from '../../../utils/colors';
import {styles} from './styles';
import STRINGS from '../../../utils/constants/string';
import MyFlatList from '../../../components/myFlatlist';
import Icon, {Icons} from '../../../utils/icon';
import HomeSafeAreaBottom from '../../../components/homeSafeAreaBottom';
import MyButton from '../../../components/myButton';
import {
  ADD_CARD_PAYMENT,
  ORDER_DETAILS,
} from '../../../navigation/stackNavigation';
import assets from '../../../utils/assets/assets';
import LottieView from 'lottie-react-native';
import {MakeOrder} from '../../../utils/apihelper';
import _ from 'lodash';
import {ORDER} from '../../../navigation/drawerNavigation';
import Success from '../../mogoscreen/Success';

const ChoosePayment = ({route, navigation}) => {
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const [choosePaymentData, setChoosePaymentData] = useState(paymentData);
  const [paymentType, setPaymentType] = useState('Cash On Delivery');
  const [selectMethod, setSelectedMethod] = useState(2);
  const [visible, setVisible] = useState(false);

  const [loading, setLoading] = useState(false);

  const [successMessage, setSuccessMessage] = useState();

  const backPress = () => {
    navigation.goBack();
  };

  // console.log(route);

  const methodSelectPress = item => {
    setPaymentType(item.title);
    setSelectedMethod(item.id);
  };

  const addCardPress = () => {
    navigation.navigate(ADD_CARD_PAYMENT);
  };

  const openModal = () => {
    setVisible(!visible);
  };

  const closeModal = () => {
    setVisible(false);
  };

  const _paymentRenderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={[
          styles.renderView,
          {
            backgroundColor: activeColors.HOME_SAFE_AREA_VIEW,
            borderColor:
              selectMethod === item.id ? colors.BUTTON_BACKGROUND_COLOR : null,
            borderWidth: selectMethod === item.id ? 1 : null,
          },
        ]}
        onPress={() => methodSelectPress(item)}>
        <View style={styles.imgView}>
          <Image source={item.image} />
        </View>
        <View style={styles.titleView}>
          <Text
            style={[styles.titleText, {color: activeColors.WHITE_TEXT_COLOR}]}>
            {item.title}
          </Text>
        </View>

        {selectMethod === item.id ? (
          <View
            style={[
              styles.blankRoundView,
              {backgroundColor: colors.BUTTON_BACKGROUND_COLOR},
            ]}>
            <Icon
              type={Icons.Feather}
              name={'check'}
              color={colors.WHITE_COLOR}
              size={20}
            />
          </View>
        ) : (
          <View
            style={[
              styles.blankRoundView,
              {backgroundColor: theme.mode === 'light' ? '#f6f7ff' : null},
            ]}></View>
        )}
      </TouchableOpacity>
    );
  };

  const handlePlaceOrder = async () => {
    try {
      setLoading(true);
      const formData = {
        productDetails: _.get(route.params.state, 'productDetails', []),
        deliveryAddress: _.get(route.params.state, 'deliveryAddress', []),
        paymentTotal: _.get(route.params.state, 'paymentTotal', []),
        paymentType: paymentType,
        coupondiscountDetails: _.get(
          route.params.state,
          'coupondiscountDetails',
          [],
        ),
      };

      await MakeOrder(formData);
      setSuccessMessage(true);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <HomeSafeAreaView />
      <StatusBarComponents />
      <HomeArrowView title={STRINGS.payment.title} onPress={backPress} />
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
          <View>
            <Text
              style={[
                styles.chooseMethodText,
                {color: activeColors.WHITE_TEXT_COLOR},
              ]}>
              {STRINGS.payment.chooseMethod}
            </Text>
          </View>

          <View style={{height: Platform.OS === 'android' ? 5 : 15}}></View>
          <MyFlatList
            data={choosePaymentData}
            renderItem={_paymentRenderItem}
          />
          <View style={{height: 15}}></View>

          {/* <TouchableOpacity style={styles.addCardView} onPress={addCardPress}>
            <Text style={styles.addCardText}>{STRINGS.payment.addCard}</Text>
          </TouchableOpacity> */}
        </View>
      </View>
      <View style={{backgroundColor: activeColors.FLEX_VIEW_COLOR}}>
        <MyButton text={'Place Order'} onPress={handlePlaceOrder} />
        <View style={{height: 10}}></View>
      </View>
      <Modal animationType="none" transparent={true} visible={visible}>
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPress={closeModal}>
          <View style={styles.modalContent}>
            <View style={styles.animationImg}>
              <Image source={assets.largeStarYellow} />
            </View>

            <View style={styles.textView}>
              <Text style={[styles.yuppyText]}>{STRINGS.payment.yuppy}</Text>
            </View>
            <View style={{height: 15}}></View>
            <View style={styles.textView}>
              <Text
                style={[
                  styles.sellerText,
                  {color: activeColors.DES_TEXT_COLOR},
                ]}>
                {STRINGS.payment.seller}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
      <HomeSafeAreaBottom />
      {successMessage && (
        <Success
          setSuccessMessage={setSuccessMessage}
          image={require('../../../assets/images/mogo/images/ordersuccess.jpg')}
          content={'Your order has been created successfully'}
          btnText={'Track Order'}
          goto={true}
        />
      )}
    </>
  );
};

export default ChoosePayment;
