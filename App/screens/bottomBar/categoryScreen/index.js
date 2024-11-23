import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import React, {useState} from 'react';
import StatusBarComponents from '../../../components/statusBarComponent';
import HomeSafeAreaView from '../../../components/homeSafeAreaView';
import {styles} from './styles';
import {useContext} from 'react';
import {ThemeContext} from '../../../contextes/themeContext';
import {colors} from '../../../utils/colors';
import HomeSafeAreaBottom from '../../../components/homeSafeAreaBottom';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import STRINGS from '../../../utils/constants/string';
import responsive from '../../../utils/styles/responsive';
import ViewAllContainer from '../../../components/viewAllContainer';
import RecomendedView from '../../../components/recomendedView';
import {
  PRODUCT_DETAILS,
  SUB_CATEGORY,
} from '../../../navigation/stackNavigation';
import MyFlatList from '../../../components/myFlatlist';
import {
  subMenuData,
  subDataData,
  itemDiscountData,
  itemPopularData,
  newItemData,
} from './data';
import HomeArrowView from '../../../components/homeArrowView';

const CategoryScreen = ({navigation}) => {
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const [categoryData, setCategoryData] = useState(subDataData);
  const [discount, setDiscount] = useState(itemDiscountData);
  const [popular, setPopular] = useState(itemPopularData);
  const [newItem, setNewItem] = useState(newItemData);

  const backPress = () => {
    navigation.goBack();
  };

  const subCategoryPress = () => {
    navigation.navigate(SUB_CATEGORY);
  };

  const productDetailsPress = () => {
    navigation.navigate(PRODUCT_DETAILS);
  };

  const _renderItem = ({item}) => {
    return (
      <View style={styles.sliderView}>
        <Image source={item.image} style={styles.img} />
        <View style={styles.titleView}>
          <Text style={styles.titleText}>{item.title}</Text>
        </View>
      </View>
    );
  };

  const _catRenderItem = ({item}) => {
    return (
      <TouchableOpacity style={styles.catRenderView}>
        <Image source={item.image} />
      </TouchableOpacity>
    );
  };

  const _itemDiscountRenderItem = ({item}) => {
    return (
      <RecomendedView
        image={item.image}
        title={item.title}
        price={item.price}
        sale={item.sale}
        per={item.per}
        perView={true}
        imageOnPress={productDetailsPress}
      />
    );
  };

  return (
    <>
      <HomeSafeAreaView />
      <StatusBarComponents />
      <HomeArrowView
        title={STRINGS.homeCategory.title}
        search={true}
        onPress={backPress}
      />
      <View
        style={[
          styles.viewContainer,
          {backgroundColor: activeColors.HOME_SAFE_AREA_VIEW},
        ]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={[
            styles.sunViewContainer,
            {backgroundColor: activeColors.FLEX_VIEW_COLOR},
          ]}>
          <View style={styles.bannerView}>
            <Carousel
              data={subMenuData}
              renderItem={_renderItem}
              sliderWidth={responsive.widthPixel(500)}
              itemWidth={responsive.widthPixel(300)}
              useScrollView={true}
            />
          </View>

          <ViewAllContainer
            name={STRINGS.subMenu.sub}
            viewAllPress={subCategoryPress}
          />

          <MyFlatList
            data={categoryData}
            renderItem={_catRenderItem}
            numColumns={3}
            scrollEnabled={false}
            columnWrapperStyle={styles.row}
          />

          <ViewAllContainer name={STRINGS.subMenu.dis} />

          <MyFlatList
            data={discount}
            renderItem={_itemDiscountRenderItem}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={styles.row}
          />

          <ViewAllContainer name={STRINGS.subMenu.popular} />

          <MyFlatList
            data={popular}
            renderItem={_itemDiscountRenderItem}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={styles.row}
          />

          <ViewAllContainer name={STRINGS.subMenu.newItem} />

          <MyFlatList
            data={newItem}
            renderItem={_itemDiscountRenderItem}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={styles.row}
          />
          <View style={{height: 20}}></View>
        </ScrollView>
      </View>
      <HomeSafeAreaBottom />
    </>
  );
};

export default CategoryScreen;
