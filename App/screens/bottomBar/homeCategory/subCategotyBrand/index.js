/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Modal,
} from 'react-native';
import {styles} from './styles';
import assets from '../../../../utils/assets/assets';
import StatusBarComponents from '../../../../components/statusBarComponent';
import STRINGS from '../../../../utils/constants/string';
import {ThemeContext} from '../../../../contextes/themeContext';
import {colors, MOGO_COLORS} from '../../../../utils/colors';
import {shoesData} from './data';
import MyFlatList from '../../../../components/myFlatlist';
import RecomendedView from '../../../../components/recomendedView';
import {MODAL_CATEGORY} from '../../../../navigation/stackNavigation';
import _ from 'lodash';
import DrawerView from '../../../../components/drawerView';
import {CENTER_FLEX_WRAP} from '../../../../utils/styles/responsive';
import {useIsFocused} from '@react-navigation/native';
import {
  getAllProductCategories,
  getAllSubCategories,
  masterProductSearch,
} from '../../../../utils/apihelper';
import GridCard from '../../../mogoscreen/GridCard';
import Loader from '../../../mogoscreen/Loader';

const SubCategoryBrand = ({route, navigation}) => {
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const [data, setData] = useState(shoesData);

  const backPress = () => {
    navigation.goBack();
  };

  const modalCategoryPress = () => {
    navigation.navigate(MODAL_CATEGORY);
  };

  const _shoesRenderItem = ({item}) => {
    return (
      <RecomendedView
        image={item.image}
        title={item.title}
        price={item.price}
        sale={item.sale}
        per={item.per}
        onPress={modalCategoryPress}
      />
    );
  };

  const [loading, setLoading] = useState();

  const [subCategoryData, setSubCategoryData] = useState([]);
  const [productcategory, setProductCategory] = useState([]);
  const [products, setProducts] = useState([]);

  const [filterData, setFilterData] = useState([]);

  const [searchResult, setSearchResult] = useState('');

  const [currentId, setCurrentId] = useState('');

  const focus = useIsFocused();

  const fetchData = async () => {
    try {
      setLoading(true);

      const result = await Promise.all([
        masterProductSearch(),
        getAllSubCategories(searchResult),
        getAllProductCategories(searchResult),
      ]);

      setProducts(_.get(result, '[0].data.data', []));
      setFilterData(_.get(result, '[0].data.data', []));
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
  }, [focus]);

  const filterProduct = () => {
    try {
      if (currentId) {
        let result = products.filter(res => {
          return res.product_sub_category_name === currentId;
        });
        setFilterData(result);
      } else {
        setFilterData(products);
      }
    } catch (err) {}
  };

  useEffect(() => {
    filterProduct();
  }, [currentId]);

  return (
    <View style={{flex: 1}}>
      <StatusBarComponents />
      <DrawerView
        titleProp={true}
        onlyTitle={_.get(route, 'params.state.category_name', '')}
        notification={false}
      />
      <TouchableOpacity style={styles.iconView} onPress={backPress}>
        <Image source={assets.back} style={styles.arrowImg} />
      </TouchableOpacity>
      {/* <View style={{height: 10}} /> */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{flex: 1, backgroundColor: activeColors.HOME_SAFE_AREA_VIEW}}>
        {_.get(route, 'params.state.category_name', '') === 'Home textiles' ? (
          <>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  paddingHorizontal: 21,
                  paddingTop: 10,
                }}>
                {subCategoryData.map((res, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setCurrentId(
                          currentId === _.get(res, '_id', '')
                            ? ''
                            : _.get(res, '_id', ''),
                        );
                      }}
                      key={index}
                      style={{
                        minWidth: 100,
                        height: 30,
                        borderWidth: 1,
                        borderColor: MOGO_COLORS.secondaryGreen,
                        paddingHorizontal: 10,
                        backgroundColor:
                          res._id === currentId
                            ? MOGO_COLORS.secondaryGreen
                            : activeColors.HOME_SAFE_AREA_VIEW,
                        borderRadius: 4,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          color:
                            res._id === currentId
                              ? 'white'
                              : MOGO_COLORS.secondaryGreen,
                        }}>
                        {_.get(res, 'sub_category_name', '')}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
            <View style={[CENTER_FLEX_WRAP, {paddingTop: 10}]}>
              <GridCard fetchDatas={fetchData} products={filterData} />
            </View>
          </>
        ) : (
          <View style={[CENTER_FLEX_WRAP, {marginTop: 25}]}>
            <Image
              source={{
                uri: 'https://img.freepik.com/free-vector/coming-soon-background-memphis-style_1017-39370.jpg?t=st=1715661031~exp=1715664631~hmac=78716c7c11cb49525e27bc9de7469ef8047880ffcb7c701637b49152d57a3ad7&w=740',
              }}
              style={{width: 300, height: 300}}
            />
          </View>
        )}
      </ScrollView>

      <SafeAreaView style={{backgroundColor: activeColors.FLEX_VIEW_COLOR}} />
      {loading && <Loader />}
    </View>
  );
};

export default SubCategoryBrand;
