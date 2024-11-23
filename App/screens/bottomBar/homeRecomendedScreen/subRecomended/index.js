import {View, Text} from 'react-native';
import React, {useState} from 'react';
import HomeSafeAreaView from '../../../../components/homeSafeAreaView';
import HomeArrowView from '../../../../components/homeArrowView';
import StatusBarComponents from '../../../../components/statusBarComponent';
import {styles} from './styles';
import {ThemeContext} from '../../../../contextes/themeContext';
import {useContext} from 'react';
import {colors} from '../../../../utils/colors';
import HomeSafeAreaBottom from '../../../../components/homeSafeAreaBottom';
import STRINGS from '../../../../utils/constants/string';
import MyFlatList from '../../../../components/myFlatlist';
import {productData} from './data';
import RecomendedView from '../../../../components/recomendedView';
import MyModal from '../../../../components/myModal';

const SubRecomended = ({navigation}) => {
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const [product, setProduct] = useState(productData);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(!modalVisible);
  };

  const closeModal = () => {
    setModalVisible(!modalVisible);
  };

  const backPress = () => {
    navigation.goBack();
  };

  const _productRenderItem = ({item}) => {
    return (
      <RecomendedView
        image={item.image}
        title={item.title}
        price={item.price}
        sale={item.sale}
        per={item.per}
      />
    );
  };

  return (
    <>
      <HomeSafeAreaView />
      <StatusBarComponents />
      <HomeArrowView
        title={STRINGS.recomended.title}
        drag={true}
        dragPress={openModal}
        onPress={backPress}
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
            data={product}
            renderItem={_productRenderItem}
            numColumns={2}
            columnWrapperStyle={styles.row}
            scrollEnabled={true}
          />
        </View>

        <MyModal isVisible={modalVisible} closePress={closeModal} resetPress={backPress}/>
      </View>
      <HomeSafeAreaBottom />
    </>
  );
};

export default SubRecomended;
