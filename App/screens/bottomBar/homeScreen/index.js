/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import StatusBarComponents from '../../../components/statusBarComponent';
import DrawerView from '../../../components/drawerView';
import {styles} from './styles';
import {useContext} from 'react';
import {ThemeContext} from '../../../contextes/themeContext';
import {colors, MOGO_COLORS} from '../../../utils/colors';
import STRINGS from '../../../utils/constants/string';
import {
  bannerData,
  menuData,
  promoData,
  categoryData,
  productData,
} from './data';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import responsive, {CENTER_FLEX_WRAP} from '../../../utils/styles/responsive';
import Icon, {Icons} from '../../../utils/icon';
import MyFlatList from '../../../components/myFlatlist';
import {
  FLASH_SALE,
  HOME_CATEGORY,
  MENU,
  NOTIFICATION,
  PRODUCT_DETAILS,
  SUB_CATEGORY_BRAND,
  SUB_MENU,
  SUB_RECOMENDED,
  VIEW_ALL,
  WEEK_PROMOTION,
} from '../../../navigation/stackNavigation';
import TabSafeAreaView from '../../../components/tabSafeAreaView';
import assets from '../../../utils/assets/assets';
import ViewAllContainer from '../../../components/viewAllContainer';
import RecomendedView from '../../../components/recomendedView';
import {subCategoryData} from '../homeScreenMenu/subCategory/data';
import ProductCard from '../../mogoscreen/ProductCard';
import GridCard from '../../mogoscreen/GridCard';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  collectMyWishList,
  getAllBanner,
  getAllCategory,
  getAllNewArivalProducts,
  getAllSpecialProducts,
  getAllTrendingProducts,
  getMyCartsProduct,
} from '../../../utils/apihelper';
import _ from 'lodash';
import Loader from '../../mogoscreen/Loader';
import {cardCount} from '../../mogoscreen/redux/cartSlice';
import {ListCount} from '../../mogoscreen/redux/favSlice';
import {useDispatch} from 'react-redux';

const HomeScreen = ({navigation}) => {
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];
  const [activeSlide, setActiveSlide] = useState(0);
  const [menu, setMenu] = useState(menuData);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(productData);
  const [selectedFav, setSelectedFav] = useState(false);

  const [categoryData, setCategoryData] = useState([]);
  const [specialProduct, setSpecialProduct] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [newArivalProducts, setNewArivalProducts] = useState([]);
  const [banners, SetBanners] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const notificationPress = () => {
    navigation.navigate(NOTIFICATION);
  };

  const viewAllProducts = (name, data) => {
    navigation.navigate(VIEW_ALL, {
      state: {
        name: name,
        productData: data,
      },
    });
  };

  const drawerPress = () => {
    navigation.openDrawer();
  };

  const _renderItem = ({item}) => {
    return <Image source={item.banner} style={[styles.img, {height: 180}]} />;
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await Promise.all([
        getAllSpecialProducts(),
        getAllCategory(),
        getAllTrendingProducts(),
        getAllNewArivalProducts(),
        getAllBanner(),
        // collectMyWishList(),
        // getMyCartsProduct(),
      ]);
      setCategoryData(_.get(result, '[1]data.data', []));
      setSpecialProduct(_.get(result, '[0]data.data', []));
      setTrendingProducts(_.get(result, '[2]data.data', []));
      setNewArivalProducts(_.get(result, '[3]data.data', []));
      SetBanners(_.get(result, '[4]data.data', []));
      // setWishlist(_.get(result, '[5]data.data', []));
      // dispatch(cardCount({count: _.get(result, '[6]data.data', []).length}));
      // dispatch(ListCount({count: _.get(result, '[5]data.data', []).length}));
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  const subCategoryPress = datas => {
    navigation.navigate(SUB_CATEGORY_BRAND, {state: datas});
  };

  return (
    <>
      <View style={{flex: 1, position: 'relative'}}>
        <TabSafeAreaView />
        <DrawerView
          title={STRINGS.home.title}
          onlyTitle={'Home'}
          notification={notificationPress}
          drawerOnPress={drawerPress}
          titleProp={true}
        />
        <StatusBarComponents />
        <ScrollView
          refreshControl={
            <RefreshControl
              onRefresh={() => {
                setRefresh(!refresh);
              }}
            />
          }
          showsVerticalScrollIndicator={false}
          style={[
            styles.viewContainer,
            {backgroundColor: activeColors.PRIMARY_COLOR},
          ]}>
          <>
            {/* CAROSAL */}
            <View style={styles.bannerView}>
              <Carousel
                data={bannerData}
                renderItem={_renderItem}
                sliderWidth={responsive.widthPixel(700)}
                itemWidth={responsive.widthPixel(312)}
                useScrollView={true}
                onSnapToItem={index => setActiveSlide(index)}
              />
              <Pagination
                dotsLength={bannerData.length}
                activeDotIndex={activeSlide}
                containerStyle={styles.containerDot}
                dotStyle={styles.dot}
                inactiveDotStyle={styles.inActiveDot}
                inactiveDotOpacity={0.9}
                inactiveDotScale={0.6}
              />
            </View>
            <View style={{height: 15}} />
            {/* CATEGORY */}

            <ViewAllContainer
              name={STRINGS.home.category}
              viewAllPress={viewAllProducts}
              productData={specialProduct}
              viveAll={true}
            />
            <View style={CENTER_FLEX_WRAP}>
              <View
                style={[
                  CENTER_FLEX_WRAP,
                  {
                    width: '90%',
                    justifyContent: 'space-between',
                    gap: 20,
                  },
                ]}>
                {categoryData.map((res, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        subCategoryPress(res);
                      }}
                      style={{
                        width: responsive.widthPixel(90),
                        height: 40,
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',

                        backgroundColor:
                          index % 2 !== 0
                            ? MOGO_COLORS.secondaryGreen
                            : MOGO_COLORS.primaryBlue,
                      }}>
                      <Text
                        style={{
                          color: 'white',
                          fontWeight: 'bold',
                          textTransform: 'capitalize',
                          fontSize: 12,
                        }}>
                        {res.category_name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* SPECIAL PRODUCTS */}
            <View style={{height: 10}} />
            <ViewAllContainer
              name={'Special Products'}
              viewAllPress={viewAllProducts}
              productData={specialProduct}
            />
            <View style={[CENTER_FLEX_WRAP]}>
              <ProductCard products={specialProduct} />
            </View>

            {/* TRENDING PRODUCTS */}
            <View style={{height: 5}} />
            <ViewAllContainer
              name={'Trending Products'}
              viewAllPress={viewAllProducts}
              productData={trendingProducts}
            />
            <View style={[CENTER_FLEX_WRAP]}>
              <GridCard
                fetchDatas={fetchData}
                products={trendingProducts.slice(0, 6)}
              />
            </View>
            {/* BANNERS PRODUCTS */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View
                style={[
                  {
                    width: '90%',
                    flexWrap: 'nowrap',
                    display: 'flex',
                    flexDirection: 'row',
                    paddingHorizontal: 20,
                    gap: 10,
                    elevation: 2,
                  },
                ]}>
                {banners.map((res, index) => {
                  return (
                    <TouchableOpacity
                      // onPress={() => {
                      //   handleViewDetails(res);
                      // }}
                      key={index}
                      style={{width: 300, height: 200}}>
                      <Image
                        source={{uri: res.banner_image}}
                        style={{width: '100%', height: 200, borderRadius: 4}}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
            {/* NEWARIVAL PRODUCTS */}
            <View style={{height: 5}} />

            <ViewAllContainer
              name={'New Arivals'}
              viewAllPress={viewAllProducts}
              productData={newArivalProducts}
            />

            <View style={[CENTER_FLEX_WRAP]}>
              <ProductCard products={newArivalProducts} fetchData={fetchData} />
            </View>

            <View style={{height: 10, paddingBottom: 100}} />
          </>
        </ScrollView>

        {loading && <Loader />}
      </View>
    </>
  );
};

export default HomeScreen;

// <View style={{height: 10}}></View>
// <ViewAllContainer
//   name={STRINGS.home.menu}
//   viewAllPress={menuScreenPress}
// />
// <View>
//   <MyFlatList
//     data={menu}
//     renderItem={_menuRenderItem}
//     horizontal={true}
//   />
// </View>
// <View style={styles.promoView}>
//   <Text
//     style={[
//       styles.promoText,
//       {color: activeColors.WHITE_TEXT_COLOR},
//     ]}>
//     {STRINGS.home.promo}
//   </Text>
// </View>

// RECOMENTED

{
  /* <MyFlatList
            data={promo}
            renderItem={_setPromoRenderItem}
            horizontal={true}
          /> */
}

//           <TouchableOpacity
//             style={[styles.bannerView, {marginTop: 20}]}
//             onPress={flashSalePress}>
//             <Image source={assets.banner2} style={styles.banner2Img} />
//           </TouchableOpacity>

// <MyFlatList
//   data={product}
//   renderItem={_productRenderItem}
//   numColumns={2}
//   scrollEnabled={false}
//   columnWrapperStyle={styles.row}
// />
//           <View style={{height: responsive.heightPixel(150)}}></View>
