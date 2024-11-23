import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import HomeSafeAreaView from '../../../../components/homeSafeAreaView';
import StatusBarComponents from '../../../../components/statusBarComponent';
import HomeArrowView from '../../../../components/homeArrowView';
import STRINGS from '../../../../utils/constants/string';
import {useContext} from 'react';
import {ThemeContext} from '../../../../contextes/themeContext';
import {colors} from '../../../../utils/colors';
import {styles} from './styles';
import MyFlatList from '../../../../components/myFlatlist';
import {itemDiscountData, itemPopularData} from '../subMenu/data';
import RecomendedView from '../../../../components/recomendedView';
import assets from '../../../../utils/assets/assets';
import MyModal from '../../../../components/myModal';
import {HOME_SCREEN} from '../../../../navigation/bottomBarNavigation';

const SubMenuAction = ({navigation}) => {
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const [discount, setDiscount] = useState(itemDiscountData);
  const [popular, setPopular] = useState(itemPopularData);
  const [modalVisible, setModalVisible] = useState(false);

  const backPress = () => {
    navigation.goBack();
  };

  const openModal = () => {
    setModalVisible(!modalVisible);
  };

  const closeModal = () => {
    setModalVisible(!modalVisible);
  };

  const resetBackPress = () => {
    setModalVisible(!modalVisible);
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
      <HomeArrowView
        drag={true}
        title={STRINGS.subMenuAction.title}
        onPress={backPress}
        dragPress={openModal}
      />
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
          <MyFlatList
            data={discount}
            renderItem={_itemDiscountRenderItem}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={styles.row}
          />

          <MyFlatList
            data={popular}
            renderItem={_itemDiscountRenderItem}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={styles.row}
          />

          <MyModal
            isVisible={modalVisible}
            closePress={closeModal}
            resetPress={resetBackPress}
          />
        </View>
      </View>
    </>
  );
};

export default SubMenuAction;
