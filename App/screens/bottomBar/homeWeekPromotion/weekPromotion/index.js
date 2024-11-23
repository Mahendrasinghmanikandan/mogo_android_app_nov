import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import HomeSafeAreaView from '../../../../components/homeSafeAreaView';
import StatusBarComponents from '../../../../components/statusBarComponent';
import BottomSafeAreaView from '../../../../components/bottomSafeAreaView';
import {useContext} from 'react';
import {ThemeContext} from '../../../../contextes/themeContext';
import {colors} from '../../../../utils/colors';
import HomeArrowView from '../../../../components/homeArrowView';
import {styles} from './styles';
import STRINGS from '../../../../utils/constants/string';
import SearchBar from '../../../../components/searchBar';
import RecomendedView from '../../../../components/recomendedView';
import {itemPopularData, newItemData} from '../../homeScreenMenu/subMenu/data';
import MyFlatList from '../../../../components/myFlatlist';

const WeekPromotion = ({navigation}) => {
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];
  const [popular, setPopular] = useState(itemPopularData);
  const [newItem, setNewItem] = useState(newItemData);

  const backPress = () => {
    navigation.goBack();
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
      />
    );
  };

  return (
    <>
      <HomeSafeAreaView />
      <StatusBarComponents />
      <HomeArrowView title={STRINGS.weekPromotion.title} onPress={backPress} />
      <View
        style={[
          styles.viewContainer,
          {backgroundColor: activeColors.HOME_SAFE_AREA_VIEW},
        ]}>
        <View
          showsVerticalScrollIndicator={false}
          style={[
            styles.sunViewContainer,
            {backgroundColor: activeColors.FLEX_VIEW_COLOR},
          ]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <SearchBar />

            <View style={{height: 15}}></View>
            <MyFlatList
              data={popular}
              renderItem={_itemDiscountRenderItem}
              numColumns={2}
              scrollEnabled={false}
              columnWrapperStyle={styles.row}
            />

            <MyFlatList
              data={newItem}
              renderItem={_itemDiscountRenderItem}
              numColumns={2}
              scrollEnabled={false}
              columnWrapperStyle={styles.row}
            />
          </ScrollView>
        </View>
      </View>
      <BottomSafeAreaView />
    </>
  );
};

export default WeekPromotion;
