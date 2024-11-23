/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import HomeSafeAreaView from '../../../../components/homeSafeAreaView';
import StatusBarComponents from '../../../../components/statusBarComponent';
import DrawerView from '../../../../components/drawerView';
import {ThemeContext} from '../../../../contextes/themeContext';
import {colors, MOGO_COLORS} from '../../../../utils/colors';
import {
  COMMING_SOON,
  NOTIFICATION,
  SUB_CATEGORY_BRAND,
} from '../../../../navigation/stackNavigation';
import STRINGS from '../../../../utils/constants/string';
import {styles} from './styles';
import {brandData} from './data';
import MyFlatList from '../../../../components/myFlatlist';
import {SEARCH_SCREEN} from '../../../../navigation/bottomBarNavigation';
import {
  getAllCategory,
  getAllProductCategories,
  getAllSubCategories,
} from '../../../../utils/apihelper';
import {useIsFocused} from '@react-navigation/native';
import _ from 'lodash';
import Loader from '../../../mogoscreen/Loader';

const TabCategoryScreen = ({navigation}) => {
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const [data, setData] = useState(brandData);

  const notificationPress = () => {
    navigation.navigate(NOTIFICATION);
  };

  const searchPress = () => {
    navigation.navigate(SEARCH_SCREEN);
  };

  const subCategoryPress = datas => {
    navigation.navigate(SUB_CATEGORY_BRAND, {state: datas});
  };

  const openDrawer = () => {
    navigation.openDrawer();
  };

  const [loading, setLoading] = useState();
  const [categoryData, setCategoryData] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [productcategory, setProductCategory] = useState([]);

  const [refresh, setRefresh] = useState(false);

  const [searchResult, setSearchResult] = useState('');

  const focus = useIsFocused();

  const fetchData = async () => {
    try {
      setLoading(true);

      const result = await Promise.all([
        getAllCategory(searchResult),
        getAllSubCategories(searchResult),
        getAllProductCategories(searchResult),
      ]);

      setCategoryData(_.get(result, '[0].data.data', []));
      setSubCategoryData(_.get(result, '[1].data.data', []));
      setProductCategory(_.get(result, '[2].data.data', []));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refresh, searchResult, focus]);

  const _brandRenderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.renderView}
        onPress={() => {
          subCategoryPress(item);
        }}>
        <View
          style={{
            width: '96%',
            height: 150,
            borderRadius: 10,
            backgroundColor:
              (index + 1) % 2 != 0
                ? MOGO_COLORS.primaryBlue
                : MOGO_COLORS.secondaryGreen,
          }}
        />
        <View style={styles.titleView}>
          <Text style={styles.titleText}>{item.category_name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      <HomeSafeAreaView />
      <StatusBarComponents />
      <DrawerView
        customView={{backgroundColor: activeColors.HOME_SAFE_AREA_VIEW}}
        titleProp={true}
        onlyTitle={'Category'}
        // notification={notificationPress}
        // search={true}
        // searchOnPress={searchPress}
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
            <MyFlatList
              data={categoryData}
              renderItem={_brandRenderItem}
              scrollEnabled={false}
            />
          </ScrollView>
        </View>
      </View>
      {loading && <Loader />}
    </View>
  );
};

export default TabCategoryScreen;
