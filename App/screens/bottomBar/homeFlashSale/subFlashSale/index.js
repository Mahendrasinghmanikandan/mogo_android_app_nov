import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import React, {useContext , useState} from 'react';
import StatusBarComponents from '../../../../components/statusBarComponent';
import {styles} from './styles';
import assets from '../../../../utils/assets/assets';
import STRINGS from '../../../../utils/constants/string';
import {ThemeContext} from '../../../../contextes/themeContext';
import {colors} from '../../../../utils/colors';
import ViewMore from '../../../../components/viewMoreComponents';
import ViewMoreComponent from '../../../../components/viewMoreComponents';
import HomeSafeAreaBottom from '../../../../components/homeSafeAreaBottom';
import ViewAllContainer from '../../../../components/viewAllContainer';
import MyFlatList from '../../../../components/myFlatlist';
import RecomendedView from '../../../../components/recomendedView';
import { screenProductData } from '../../searchScreen/data';
import { PRODUCT_DETAILS } from '../../../../navigation/stackNavigation';
import MyButton from '../../../../components/myButton';
import { CART } from '../../../../navigation/bottomBarNavigation';

const SubFlashSaleMenu = ({navigation}) => {
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const [screenData , setScreenData] = useState(screenProductData)

  const productDetailsPress = () => {
    navigation.navigate(PRODUCT_DETAILS);
  };

  const addCarPress = () => {
    navigation.navigate(CART)
  }

  const backPress = () => {
    navigation.goBack();
  }


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
      <StatusBarComponents />

      <View style={styles.viewContainer}>
        <View style={styles.imgView}>
          <Image source={assets.flashSale2} style={styles.img} />
          <View style={styles.flexView}>
            <TouchableOpacity style={styles.iconView} onPress={backPress}>
              <Image source={assets.back} style={styles.arrowImg} />
            </TouchableOpacity>
            <View style={styles.titleView}>
              <Text style={styles.titleText}>
                {STRINGS.flashProductDetail.title}
              </Text>
            </View>
            <TouchableOpacity onPress={addCarPress}
              style={[
                styles.drawerView,
                {backgroundColor: activeColors.DRAWER_COLOR},
              ]}>
              <Image source={assets.cart} tintColor={activeColors.ICON_COLOR}/>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={[
            styles.secondView,
            {backgroundColor: activeColors.FLEX_VIEW_COLOR},
          ]}>
          <View style={styles.flashSale}>
            <Image source={assets.flash} />
            <View style={styles.saleView}>
              <Text style={styles.saleText}>
                {STRINGS.flashProductDetail.sale}
              </Text>
            </View>
            <View style={styles.availableView}>
              <Text style={styles.availableText}>
                {STRINGS.flashProductDetail.available}
              </Text>
            </View>
          </View>

          <ScrollView>
            <View style={styles.cameraView}>
              <Text
                style={[
                  styles.cameraText,
                  {color: activeColors.WHITE_TEXT_COLOR},
                ]}>
                {STRINGS.flashProductDetail.camera}
              </Text>
            </View>

            <View style={styles.priceView}>
              <Text style={{flex:1,}}>
                <Text style={styles.priceText}>{STRINGS.flashProductDetail.price} </Text>
                <Text style={[styles.checkPriceText , {color : activeColors.DES_TEXT_COLOR}]}>{STRINGS.flashProductDetail.checkPrice}</Text>
              </Text>
              <View style={styles.flexImagView}>
              <Image source={assets.largeStarYellow} style={{height: 22,width: 22,alignSelf: 'center'}}/>
              <Text style={[styles.numberText ,  {color : activeColors.WHITE_TEXT_COLOR}]}>4.5</Text>
            </View>
            </View>

            <View style={[styles.line , {borderColor: activeColors.BORDER_COLOR}]}></View>

            <View style={[styles.detailProView , {borderColor: activeColors.BORDER_COLOR}]}>
              <Text style={[styles.detailProText , {color : activeColors.WHITE_TEXT_COLOR}]}>{STRINGS.flashProductDetail.detailPro}</Text>
              <View style={{height: 8}}></View>
              <Text style={[styles.nameText,  {color : activeColors.DES_TEXT_COLOR}]}>{STRINGS.flashProductDetail.name1}</Text>
              <Text style={[styles.nameText,  {color : activeColors.DES_TEXT_COLOR}]}>{STRINGS.flashProductDetail.name2}</Text>
              <Text style={[styles.nameText,  {color : activeColors.DES_TEXT_COLOR}]}>{STRINGS.flashProductDetail.name3}</Text>
              <Text style={[styles.nameText,  {color : activeColors.DES_TEXT_COLOR}]}>{STRINGS.flashProductDetail.name4}</Text>
            </View>

            <ViewMoreComponent />

            <ViewAllContainer name={STRINGS.flashProductDetail.top}/>

            <MyFlatList
            data={screenData}
            renderItem={_productRenderItem}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={styles.row}
          />
          </ScrollView>
        </View>
      </View>
      <View
        style={[
          styles.buttonBackView,
          {backgroundColor: activeColors.SCREEN_BACKGROUND_COLOR},
        ]}>
        <TouchableOpacity
          style={[
            styles.drawerView,
            {backgroundColor: activeColors.DRAWER_COLOR},
          ]}>
          <Image
            source={assets.cart}
            tintColor={theme.mode === 'light' ? colors.BLACK_COLOR : null}
          />
        </TouchableOpacity>
        <MyButton
          text={STRINGS.productDetails.pay}
          buttonView={styles.buttonView}
          // onPress={AddressPress}
        />
      </View>
      <HomeSafeAreaBottom />
    </>
  );
};

export default SubFlashSaleMenu;
