import React, {useState, useContext} from 'react';
import {View, Text} from 'react-native';
import HomeSafeAreaView from '../../../../components/homeSafeAreaView';
import StatusBarComponents from '../../../../components/statusBarComponent';
import HomeArrowView from '../../../../components/homeArrowView';
import STRINGS from '../../../../utils/constants/string';
import {shoesData} from '../subCategotyBrand/data';
import MyFlatList from '../../../../components/myFlatlist';
import {styles} from './styles';
import RecomendedView from '../../../../components/recomendedView';
import {ThemeContext} from '../../../../contextes/themeContext';
import {colors} from '../../../../utils/colors';
import MyModal from '../../../../components/myModal';
import HomeSafeAreaBottom from '../../../../components/homeSafeAreaBottom';

const ModalCategory = ({navigation}) => {
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const [data, setData] = useState(shoesData);
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
    navigation.navigate(HOME_SCREEN);
  };

  const _shoesRenderItem = ({item}) => {
    return (
      <RecomendedView
        image={item.image}
        title={item.title}
        price={item.price}
        sale={item.sale}
      />
    );
  };

  return (
    <>
      <HomeSafeAreaView />
      <StatusBarComponents />
      <HomeArrowView
        drag={true}
        title={STRINGS.catBrand.name}
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
            data={data}
            renderItem={_shoesRenderItem}
            numColumns={2}
            // scrollEnabled={false}
            columnWrapperStyle={styles.row}
          />
          <MyModal
            isVisible={modalVisible}
            closePress={closeModal}
            resetPress={resetBackPress}
          />
        </View>
      </View>
      <HomeSafeAreaBottom />
    </>
  );
};

export default ModalCategory;
