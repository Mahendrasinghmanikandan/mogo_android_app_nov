import React, {useContext, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import HomeSafeAreaView from '../../../components/homeSafeAreaView';
import StatusBarComponents from '../../../components/statusBarComponent';
import DrawerView from '../../../components/drawerView';
import {ThemeContext} from '../../../contextes/themeContext';
import {colors} from '../../../utils/colors';
import RecomendedView from '../../../components/recomendedView';
import MyFlatList from '../../../components/myFlatlist';
import {
  NOTIFICATION,
  PRODUCT_DETAILS,
} from '../../../navigation/stackNavigation';
import {styles} from './styles';
import SearchBar from '../../../components/searchBar';
import STRINGS from '../../../utils/constants/string';
import Icon, {Icons} from '../../../utils/icon';
import ViewAllContainer from '../../../components/viewAllContainer';
import {screenProductData} from './data';
import {getSeachProducts, masterProductSearch} from '../../../utils/apihelper';
import _ from 'lodash';
import {CENTER_FLEX_WRAP} from '../../../utils/styles/responsive';
import ProductCard from '../../mogoscreen/ProductCard';

const SearchScreen = ({navigation}) => {
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const [screenData, setScreenData] = useState(screenProductData);
  const [searchData, setSearchData] = useState('');
  const [productNames, setProductNames] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  // mix
  const [extraData, setExtraData] = useState([]);

  const fetchData = async () => {
    try {
      const result = await masterProductSearch(searchData);
      setProductNames(_.get(result, 'data.data', []));
      setSearchResult(_.get(result, 'data.data', []));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchData]);

  const productDetailsPress = () => {
    navigation.navigate(PRODUCT_DETAILS);
  };

  const notificationPress = () => {
    navigation.navigate(NOTIFICATION);
  };

  const openDrawer = () => {
    navigation.openDrawer();
  };

  const _productRenderItem = ({item}) => {
    return (
      <RecomendedView
        image={item.image}
        title={item.title}
        price={item.price}
        sale={item.sale}
        per={item.per}
        onPress={productDetailsPress}
      />
    );
  };

  return (
    <>
      <HomeSafeAreaView />
      <StatusBarComponents />
      <DrawerView
        customView={{backgroundColor: activeColors.HOME_SAFE_AREA_VIEW}}
        titleProp={true}
        onlyTitle={'Search'}
        notification={notificationPress}
        drawerOnPress={openDrawer}
      />
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
            <SearchBar setSearchData={setSearchData} searchData={searchData} />
            {/* <View style={styles.recentView}>
              <Text
                style={[
                  styles.recentText,
                  {color: activeColors.DES_TEXT_COLOR},
                ]}>
                {STRINGS.search.recent}
              </Text>
            </View> */}
            <View style={{height: 10}}></View>
            <View
              style={[
                CENTER_FLEX_WRAP,
                {flexDirection: 'column', paddingHorizontal: 10},
              ]}>
              {!_.isEmpty(productNames) && searchData && (
                <>
                  {productNames
                    ?.filter(res => {
                      return res.product_name
                        .toLowerCase()
                        .includes(searchData.toLocaleLowerCase());
                    })
                    .map((res, index) => {
                      return (
                        <View
                          style={[
                            styles.searchContainer,
                            {alignItems: 'center'},
                          ]}
                          key={index}>
                          <Image
                            source={{uri: _.get(res, 'product_images[0][0]')}}
                            style={{width: 25, height: 25, borderRadius: 4}}
                          />
                          <View style={styles.titleView}>
                            <Text
                              numberOfLines={1}
                              style={[
                                styles.titleText,
                                {color: activeColors.WHITE_TEXT_COLOR},
                              ]}>
                              {_.get(res, 'product_name')}
                            </Text>
                          </View>
                          <TouchableOpacity
                            onPress={() => {
                              setSearchData(_.get(res, 'product_name'));
                              setProductNames([]);
                            }}>
                            <Icon
                              type={Icons.MaterialCommunityIcons}
                              name={'arrow-top-left'}
                              color={'gray'}
                              size={25}
                              style={{alignSelf: 'center'}}
                            />
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                  <View
                    style={[
                      styles.line,
                      {borderColor: activeColors.BORDER_COLOR},
                    ]}></View>
                </>
              )}
            </View>

            <View style={{height: 10}}></View>
            {searchData && (
              <View style={[CENTER_FLEX_WRAP]}>
                <ProductCard products={searchResult} />
              </View>
            )}

            <View style={{height: 15}}></View>

            {/* <ViewAllContainer name={'Visited Products'} />

            <MyFlatList
              data={screenData}
              renderItem={_productRenderItem}
              numColumns={2}
              scrollEnabled={false}
              columnWrapperStyle={styles.row}
            /> */}
            <View style={{height: 100}}></View>
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default SearchScreen;
