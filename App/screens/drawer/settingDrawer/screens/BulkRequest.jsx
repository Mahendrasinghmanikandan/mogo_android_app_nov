/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  ScrollView,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import HomeSafeAreaView from '../../../../components/homeSafeAreaView';
import HomeArrowView from '../../../../components/homeArrowView';
import {ThemeContext} from '../../../../contextes/themeContext';
import {colors, MOGO_COLORS} from '../../../../utils/colors';

import {getMyBulkUploadRequest} from '../../../../utils/apihelper';
import _ from 'lodash';
import responsive, {
  CENTER_DIV,
  CENTER_FLEX_WRAP,
} from '../../../../utils/styles/responsive';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  nineFontPixel,
  oneThreeFontPixel,
  oneTwoFontPixel,
  senBold,
  senExtraBold,
  senMedium,
  senRegular,
} from '../../../../utils/fontsSize';
import moment from 'moment';
import Icon, {Icons} from '../../../../utils/icon';
import {getCurrentVariant} from '../../../mogoscreen/helper/priceHelper';

const BulkRequest = ({navigation}) => {
  const {theme, UpdateTheme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const [request, setAllRequest] = useState([]);

  const backPress = () => {
    navigation.goBack();
  };

  const fetchData = async () => {
    try {
      const result = await getMyBulkUploadRequest();
      setAllRequest(_.get(result, 'data.data', []));
    } catch (err) {}
  };
  const handleViewDetails = (values, variant_id) => {
    let product = {
      _id: values._id,
      product_sub_category_id: values.product_sub_category_name,
      variant_id: variant_id,
    };
    navigation.navigate('MogoProductDetails', {
      state: {product: product, variant: ''},
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: activeColors.HOME_SAFE_AREA_VIEW}}>
      <HomeSafeAreaView />
      <HomeArrowView onPress={backPress} title={'Bulk Product Request'} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          {request.map((res, index) => {
            let variant = getCurrentVariant(
              _.get(res, 'product_id.product_variants', []),
              _.get(res, 'product_variant_id', ''),
            );
            return (
              <TouchableOpacity
                style={[
                  styles.renderView,
                  {
                    marginTop: 10,
                    minHeight: 120,
                    elevation: 1,
                    backgroundColor: 'white',
                    paddingVertical: 25,
                    borderColor: _.get(
                      variant,
                      '[0].product_variant_color',
                      '',
                    ),
                    borderLeftWidth: 2,
                  },
                ]}
                onPress={() => {
                  handleViewDetails(
                    _.get(res, 'product_id', []),
                    _.get(res, 'product_variant_id', ''),
                  );
                }}>
                <View>
                  <Image
                    source={{
                      uri: _.get(res, 'product_id.product_images[0][0]', ''),
                    }}
                    style={{width: 80, height: 80, borderRadius: 10}}
                  />
                </View>

                <View
                  style={[
                    styles.titleContainer,
                    {justifyContent: 'flex-start'},
                  ]}>
                  <Text
                    numberOfLines={2}
                    style={[
                      styles.titleText,
                      {color: activeColors.WHITE_TEXT_COLOR},
                    ]}>
                    {_.get(res, 'product_id.product_name', '')}
                  </Text>
                  <View style={{height: 5}} />
                  <Text
                    style={[
                      styles.tbText,
                      {color: 'black', fontWeight: 'bold'},
                    ]}>
                    Count : {_.get(res, 'count', '')}
                  </Text>

                  <View style={{height: 5}} />
                  <Text
                    style={[
                      styles.tbText,
                      {color: 'black', fontWeight: 'bold'},
                    ]}>
                    Requested Date :{' '}
                    {moment(_.get(res, 'createdAt', '')).format('MMM d, yyyy')}
                  </Text>
                  <View style={{height: 3}} />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
  sunViewContainer: {
    flex: 1,
    borderTopStartRadius: 35,
    borderTopEndRadius: 35,
    paddingVertical: 10,
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
    marginHorizontal: 15,
  },
  renderView: {
    marginHorizontal: 15,
    marginVertical: 5,
    paddingVertical: Platform.OS === 'android' ? 10 : 15,
    flexDirection: 'row',
    borderRadius: 15,
    paddingHorizontal: 13,
  },
  imgView: {
    backgroundColor: '#f6f6f6',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 15,
    justifyContent: 'center',
    alignress: 'center',
  },
  titleContainer: {
    flex: 1,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  plusView: {
    justifyContent: 'center',
    alignress: 'center',
  },
  backView: {
    backgroundColor: colors.BUTTON_BACKGROUND_COLOR,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 8,
  },
  titleText: {
    fontFamily: senMedium,
    fontSize: oneTwoFontPixel,
  },
  tbText: {
    fontFamily: senRegular,
    fontSize: responsive.fontPixel(9),
  },
  priceText: {
    fontFamily: senExtraBold,
    color: colors.BUTTON_BACKGROUND_COLOR,
  },
  totalContainer: {
    backgroundColor: 'pink',
    position: 'absolute',
    bottom: 55,
    width: '100%',
    paddingVertical: Platform.OS === 'android' ? 15 : 20,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    flexDirection: 'row',
  },
  ruText: {
    fontFamily: senExtraBold,
    fontSize: responsive.fontPixel(21),
  },
  buttonView: {
    width: '30%',
    borderRadius: 40,
    height: 40,
  },
  flexOne: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 15,
  },
  textFleView: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    width: '100%',
    marginVertical: 10,
  },
  totalView: {
    flex: 1,
    justifyContent: 'center',
  },
  totalText: {
    fontFamily: senBold,
    fontSize: oneThreeFontPixel,
  },
  ruView: {
    justifyContent: 'center',
  },
  text: {
    fontFamily: senRegular,
    fontSize: oneThreeFontPixel,
  },
  totalMainContainer: {
    backgroundColor: 'pink',
    flex: 0.3,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
  },
});

export default BulkRequest;
