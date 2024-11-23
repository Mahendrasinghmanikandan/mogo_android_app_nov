/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, ScrollView, ImageBackground} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import HomeSafeAreaView from '../../components/homeSafeAreaView';
import StatusBarComponents from '../../components/statusBarComponent';
import HomeArrowView from '../../components/homeArrowView';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import _ from 'lodash';
import {ThemeContext} from '../../contextes/themeContext';
import {colors} from '../../utils/colors';
import {CENTER_FLEX_WRAP} from '../../utils/styles/responsive';
import {styles} from './styles';
import Icon, {Icons} from '../../utils/icon';
import {getPerticularStoreData} from '../../utils/apihelper';
import GridCard from './GridCard';
import Loader from './Loader';

const DisplayStore = ({route}) => {
  console.log(route.params.state.company_name, 'lkhk');

  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(false);

  const {params} = route;
  const navigation = useNavigation();

  const isFocus = useIsFocused();

  const backPress = () => {
    navigation.goBack();
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await getPerticularStoreData(
        _.get(params, 'state._id', ''),
      );

      setProductData(_.get(result, 'data.data', []));
    } catch (err) {
      console.log(err, 'jhk');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isFocus]);

  return (
    <View style={{flex: 1, backgroundColor: activeColors.HOME_SAFE_AREA_VIEW}}>
      <HomeSafeAreaView />
      <StatusBarComponents />

      <ScrollView>
        <ImageBackground
          style={{width: '100%', height: 200}}
          source={{
            uri: 'https://img.freepik.com/free-vector/people-standing-store-queue_23-2148594615.jpg?t=st=1715856042~exp=1715859642~hmac=2a91713c20373cbe209b5dc787ea348b5994184609ec8f6a2b2f83bfd702156f&w=900',
          }}>
          <HomeArrowView
            backgroundTrans={true}
            onPress={backPress}
            title={''}
          />
        </ImageBackground>
        <View
          style={
            ([CENTER_FLEX_WRAP],
            {
              paddingVertical: 10,
              flexWrap: 'nowrap',
              flexDirection: 'column',
              alignItems: 'flex-start',
              paddingHorizontal: 10,
              gap: 15,
            })
          }>
          <View style={[CENTER_FLEX_WRAP, {gap: 4}]}>
            <Icon
              type={Icons.Ionicons}
              name={'storefront-outline'}
              color={colors.BUTTON_BACKGROUND_COLOR}
              size={20}
            />
            <Text
              numberOfLines={1}
              style={[
                styles.text,
                {
                  color: activeColors.WHITE_TEXT_COLOR,
                  fontSize: 20,
                },
              ]}>
              {_.get(params, 'state.company_name', '')}
            </Text>
          </View>

          <View style={styles.textView}>
            <Text style={[styles.text, {color: activeColors.DES_TEXT_COLOR}]}>
              Store Address
            </Text>
            <Text
              style={[
                styles.text,
                {
                  color: activeColors.DES_TEXT_COLOR,
                },
              ]}>
              {_.get(params, 'state.address', [])}
            </Text>
          </View>
          <View style={styles.textView}>
            <Text style={[styles.text, {color: activeColors.DES_TEXT_COLOR}]}>
              Total Products
            </Text>
            <Text
              style={[
                styles.text,
                {
                  color: activeColors.DES_TEXT_COLOR,
                },
              ]}>
              {_.get(params, 'state.address', [])}
            </Text>
          </View>
          <View style={styles.textView}>
            <Text style={[styles.text, {color: activeColors.DES_TEXT_COLOR}]}>
              For Enquire
            </Text>
            <Text
              style={[
                styles.text,
                {
                  color: activeColors.DES_TEXT_COLOR,
                },
              ]}>
              {_.get(params, 'state.email', [])}
            </Text>
          </View>

          {/* products */}
          <Text
            numberOfLines={1}
            style={[
              styles.titleText,
              {color: activeColors.ICON_COLOR, paddingVertical: 5},
            ]}>
            Store Products
          </Text>
          <GridCard products={productData} />
        </View>
      </ScrollView>
      {loading && <Loader />}
    </View>
  );
};

export default DisplayStore;
