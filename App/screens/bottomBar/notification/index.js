/* eslint-disable react-hooks/exhaustive-deps */
import {View, Text, Image, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import HomeSafeAreaView from '../../../components/homeSafeAreaView';
import StatusBarComponents from '../../../components/statusBarComponent';
import HomeArrowView from '../../../components/homeArrowView';
import {styles} from './styles';
import HomeSafeAreaBottom from '../../../components/homeSafeAreaBottom';
import {ThemeContext} from '../../../contextes/themeContext';
import {useContext} from 'react';
import {colors} from '../../../utils/colors';
import {notificationData} from './data';
import MyFlatList from '../../../components/myFlatlist';
import STRINGS from '../../../utils/constants/string';
import {useIsFocused} from '@react-navigation/native';
import {
  collectMyNotification,
  collectNotificationCount,
} from '../../../utils/apihelper';
import _ from 'lodash';
import moment from 'moment';
import assets from '../../../utils/assets/assets';
import {CENTER_DIV} from '../../../utils/styles/responsive';
import {useDispatch} from 'react-redux';
import {notificationCount} from '../../mogoscreen/redux/notificationslice';

const Notification = ({navigation}) => {
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const [notification, setNotification] = useState([]);

  const backPress = () => {
    navigation.goBack();
  };

  const isfocus = useIsFocused();

  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      if (isfocus) {
        const result = await Promise.all([collectMyNotification()]);
        setNotification(_.get(result, '[0].data.data', []));
        const count = _.get(result, '[0].data.data', []).filter(res => {
          return res.status === false;
        })?.length;
        dispatch(notificationCount({count: count}));
      }
    } catch (err) {}
  };

  useEffect(() => {
    fetchData();
  }, [isfocus]);

  const _notificationRenderItem = ({item}) => {
    return (
      <View
        style={[
          styles.renderView,
          {backgroundColor: activeColors.FLEX_VIEW_COLOR},
        ]}>
        {/* <Image source={assets.catOne} /> */}

        <View style={styles.titleView}>
          <Text
            style={[styles.titleText, {color: activeColors.WHITE_TEXT_COLOR}]}>
            {`Your order  ${item?.order_status}, check a your order status. Invoice No : ${item?.invoice_no}`}
          </Text>
        </View>
        <View style={[styles.titleView, {paddingTop: 2}]}>
          <Text
            style={[styles.titleText, {color: activeColors.WHITE_TEXT_COLOR}]}>
            {`invoice ${item?.invoice_no}`}
          </Text>
        </View>
        <View style={styles.timeView}>
          <Text style={[styles.time, {color: activeColors.DES_TEXT_COLOR}]}>
            {moment(item.createdAt).format('HH:mm A')}
          </Text>
        </View>
      </View>
    );
  };
  // Your order is confirm, check a your order status.
  return (
    <View style={{flex: 1, backgroundColor: '#f5f6f7'}}>
      <HomeSafeAreaView />
      <StatusBarComponents />
      <HomeArrowView onPress={backPress} title={STRINGS.notification.title} />
      <ScrollView>
        <MyFlatList
          data={notification}
          renderItem={_notificationRenderItem}
          scrollEnabled={false}
        />
      </ScrollView>
      <HomeSafeAreaBottom />
    </View>
  );
};

export default Notification;
