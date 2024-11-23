import {View, Text, Image, ScrollView, Animated} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import HomeSafeAreaView from '../../../../components/homeSafeAreaView';
import StatusBarComponents from '../../../../components/statusBarComponent';
import HomeArrowView from '../../../../components/homeArrowView';
import HomeSafeAreaBottom from '../../../../components/homeSafeAreaBottom';
import {ThemeContext} from '../../../../contextes/themeContext';
import {colors} from '../../../../utils/colors';
import {styles} from './styles';
import STRINGS from '../../../../utils/constants/string';
import assets from '../../../../utils/assets/assets';
import {flashSaleData} from './data';
import RecomendedView from '../../../../components/recomendedView';
import MyFlatList from '../../../../components/myFlatlist';
import {SUB_FLASH_SALE} from '../../../../navigation/stackNavigation';

const FlashSaleScreen = ({navigation}) => {
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const [saleData, setSaleData] = useState(flashSaleData);
  const [progressOne, setProgressOne] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(progressOne, {
      toValue: 60,
      duration: 2000,
    }).start();
  }, []);

  const renderMenuPress = () => {
    navigation.navigate(SUB_FLASH_SALE);
  };

  const backPress = () => {
    navigation.goBack();
  };

  const _flashSaleRenderItem = ({item}) => {
    return (
      <RecomendedView
        image={item.image}
        title={item.title}
        price={item.price}
        sale={item.sale}
        available={true}
        onPress={renderMenuPress}
        children={
          <View style={styles.availableView}>
            <Text
              style={[
                styles.availableText,
                {color: activeColors.WHITE_TEXT_COLOR},
              ]}>
              24 Available
            </Text>
            <View
              style={[
                styles.progressLine,
                {backgroundColor: activeColors.BORDER_COLOR},
              ]}>
              <Animated.View style={[styles.bar, {width: progressOne}]} />
            </View>
          </View>
        }
      />
    );
  };

  return (
    <>
      <HomeSafeAreaView />
      <StatusBarComponents />
      <HomeArrowView title={STRINGS.flashSale.title} onPress={backPress} />
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
            <View style={styles.endSaleView}>
              <Text
                style={[
                  styles.endText,
                  {color: activeColors.WHITE_TEXT_COLOR},
                ]}>
                {STRINGS.flashSale.end}
              </Text>
              <Text style={styles.timeText}>{STRINGS.flashSale.time}</Text>
            </View>

            <View style={styles.imgView}>
              <Image source={assets.flashSale} style={styles.img} />
            </View>

            <MyFlatList
              data={saleData}
              renderItem={_flashSaleRenderItem}
              numColumns={2}
              scrollEnabled={false}
              columnWrapperStyle={styles.row}
            />

            <MyFlatList
              data={saleData}
              renderItem={_flashSaleRenderItem}
              numColumns={2}
              scrollEnabled={false}
              columnWrapperStyle={styles.row}
            />

            <MyFlatList
              data={saleData}
              renderItem={_flashSaleRenderItem}
              numColumns={2}
              scrollEnabled={false}
              columnWrapperStyle={styles.row}
            />
          </ScrollView>
        </View>
      </View>
      <HomeSafeAreaBottom />
    </>
  );
};

export default FlashSaleScreen;
