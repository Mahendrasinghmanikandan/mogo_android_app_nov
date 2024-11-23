import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import StatusBarComponents from '../../../components/statusBarComponent';
import CartArrowView from '../../../components/cartArrowView';
import CartSafeAreaView from '../../../components/cartSafeAreaView';
import {styles} from './styles';
import {ThemeContext} from '../../../contextes/themeContext';
import {colors} from '../../../utils/colors';
import assets from '../../../utils/assets/assets';
import STRINGS from '../../../utils/constants/string';
import Icon, {Icons} from '../../../utils/icon';
import HomeSafeAreaBottom from '../../../components/homeSafeAreaBottom';
import ViewAllContainer from '../../../components/viewAllContainer';
import {senExtraBold} from '../../../utils/fontsSize';
import CommentView from '../../../components/productDetailsCommentView';
import MyFlatList from '../../../components/myFlatlist';
import RecomendedView from '../../../components/recomendedView';
import {productDetailsData} from './data';
import MyButton from '../../../components/myButton';
import {
  REVIEWS,
  CONFIRM_ADDRESS,
  ADD_ADDRESS,
  ADDRESS_DETAILS,
} from '../../../navigation/stackNavigation';
import AddressView from '../../../components/address';

const numberOfImages = 4;

const ProductDetails = ({navigation}) => {
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const [visible, setVisible] = useState(false);
  const [selectedRound, setSelectedRound] = useState(false);
  const [selectedSize, setSelectedSize] = useState(false);
  const [product, setProduct] = useState(productDetailsData);
  const [modalVisible, setModalVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);

  const dropDownPress = () => {
    setVisible(!visible);
  };

  const roundPress = id => {
    setSelectedRound(id);
  };

  const sizePress = id => {
    setSelectedSize(id);
  };

  const backPress = () => {
    navigation.goBack();
  };

  const reviewsPress = () => {
    navigation.navigate(REVIEWS);
  };

  const AddressPress = () => {
    navigation.navigate(CONFIRM_ADDRESS);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const addAddress = () => {
    setModalVisible(false);
    navigation.navigate(ADD_ADDRESS);
  };

  const confirmPress = () => {
    setModalVisible(false);
    navigation.navigate(ADDRESS_DETAILS);
  };

  const viewMorePress = () => {
    setTextVisible(!textVisible);
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
      <CartSafeAreaView />
      <StatusBarComponents />
      <CartArrowView title={STRINGS.productDetails.title} onPress={backPress} />
      <View
        style={[
          styles.viewContainer,
          {backgroundColor: activeColors.CART_BACK_COLOR},
        ]}>
        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
          <View
            style={[
              styles.oneViewContainer,
              {backgroundColor: activeColors.CART_BACK_COLOR},
            ]}>
            <View style={styles.flexView}>
              <View style={styles.viewImg}>
                <Image source={assets.productImg1} />
              </View>
              <View
                style={[
                  styles.dropDownView,
                  {backgroundColor: activeColors.SCREEN_BACKGROUND_COLOR},
                ]}>
                <TouchableOpacity
                  style={styles.iconView}
                  onPress={dropDownPress}>
                  <Icon
                    type={Icons.Entypo}
                    name={visible ? 'chevron-down' : 'chevron-up'}
                    color={theme.mode === 'dark' ? 'white' : '#acacac'}
                    size={20}
                  />
                </TouchableOpacity>

                <View
                  style={[
                    styles.line,
                    {borderColor: activeColors.BORDER_COLOR},
                  ]}></View>
                {visible === true ? (
                  <View style={styles.itemImg}>
                    <Image source={assets.dropDownImg1} />
                  </View>
                ) : null}
                {visible === true ? (
                  <View style={styles.itemImg}>
                    <Image source={assets.dropDownImg1} />
                  </View>
                ) : null}
                <View style={styles.itemImg}>
                  <Image source={assets.dropDownImg1} />
                </View>
              </View>
            </View>
          </View>

          <View
            style={[
              styles.SecondViewContainer,
              {backgroundColor: activeColors.SCREEN_BACKGROUND_COLOR},
            ]}>
            <Text
              style={[styles.maneText, {color: activeColors.WHITE_TEXT_COLOR}]}>
              {STRINGS.productDetails.name}
            </Text>
            <View style={styles.PriceflexView}>
              <View style={styles.priceView}>
                <Text style={styles.priceText}>$50,00</Text>
              </View>

              <View>
                <View style={styles.starFlexView}>
                  <View style={styles.startView}>
                    <Image source={assets.bigStar} />
                  </View>
                  <View style={styles.rentView}>
                    <Text
                      style={[
                        styles.rentText,
                        {color: activeColors.WHITE_TEXT_COLOR},
                      ]}>
                      {STRINGS.productDetails.rent}
                    </Text>
                  </View>
                </View>
                <View style={{height: 3}}></View>
                <Text
                  style={[
                    styles.saleText,
                    {color: activeColors.DES_TEXT_COLOR},
                  ]}>
                  (932 Sale)
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.line,
                {borderColor: activeColors.BORDER_COLOR},
              ]}></View>

            <View style={styles.FlexContainer}>
              <View style={[styles.flexOne, {}]}>
                <Text
                  style={[styles.text, {color: activeColors.DES_TEXT_COLOR}]}>
                  {STRINGS.productDetails.color}
                </Text>

                <View style={styles.roundFlexView}>
                  <TouchableOpacity
                    style={[
                      styles.roundBackView,
                      {
                        backgroundColor: selectedRound === 1 ? '#ececec' : null,
                      },
                    ]}
                    onPress={() => roundPress(1)}>
                    <View
                      style={[
                        styles.roundView,
                        {backgroundColor: '#445e8f'},
                      ]}></View>
                  </TouchableOpacity>
                  <View style={{width: 10}}></View>
                  <TouchableOpacity
                    style={[
                      styles.roundBackView,
                      {
                        backgroundColor: selectedRound === 2 ? '#ececec' : null,
                      },
                    ]}
                    onPress={() => roundPress(2)}>
                    <View
                      style={[
                        styles.roundView,
                        {backgroundColor: '#bbbcc1'},
                      ]}></View>
                  </TouchableOpacity>
                  <View style={{width: 10}}></View>
                  <TouchableOpacity
                    style={[
                      styles.roundBackView,
                      {
                        backgroundColor: selectedRound === 3 ? '#ececec' : null,
                      },
                    ]}
                    onPress={() => roundPress(3)}>
                    <View
                      style={[
                        styles.roundView,
                        {backgroundColor: '#b1814d'},
                      ]}></View>
                  </TouchableOpacity>
                </View>
                <View style={styles.roundFlexView}>
                  <TouchableOpacity
                    style={[
                      styles.roundBackView,
                      {
                        backgroundColor: selectedRound === 4 ? '#ececec' : null,
                      },
                    ]}
                    onPress={() => roundPress(4)}>
                    <View
                      style={[
                        styles.roundView,
                        {backgroundColor: '#bc3b1f'},
                      ]}></View>
                  </TouchableOpacity>
                  <View style={{width: 10}}></View>
                  <TouchableOpacity
                    style={[
                      styles.roundBackView,
                      {
                        backgroundColor: selectedRound === 5 ? '#ececec' : null,
                      },
                    ]}
                    onPress={() => roundPress(5)}>
                    <View
                      style={[
                        styles.roundView,
                        {backgroundColor: '#f5bc7f'},
                      ]}></View>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.flexTwo}>
                <Text
                  style={[styles.text, {color: activeColors.DES_TEXT_COLOR}]}>
                  {STRINGS.productDetails.size}
                </Text>
                <View style={styles.sizeFlexView}>
                  <TouchableOpacity
                    style={[
                      [
                        styles.sizeView,
                        {
                          backgroundColor:
                            selectedSize === 1
                              ? colors.BUTTON_BACKGROUND_COLOR
                              : null,
                          borderColor:
                            selectedSize === 1
                              ? null
                              : activeColors.BORDER_COLOR,
                        },
                      ],
                    ]}
                    onPress={() => sizePress(1)}>
                    <Text
                      style={[
                        styles.sizeText,
                        {
                          color:
                            selectedSize === 1
                              ? colors.WHITE_COLOR
                              : colors.BUTTON_BACKGROUND_COLOR,
                        },
                      ]}>
                      S
                    </Text>
                  </TouchableOpacity>
                  <View style={{width: 10}}></View>
                  <TouchableOpacity
                    style={[
                      [
                        styles.sizeView,
                        {
                          backgroundColor:
                            selectedSize === 2
                              ? colors.BUTTON_BACKGROUND_COLOR
                              : null,
                          borderColor:
                            selectedSize === 2
                              ? null
                              : activeColors.BORDER_COLOR,
                        },
                      ],
                    ]}
                    onPress={() => sizePress(2)}>
                    <Text
                      style={[
                        styles.sizeText,
                        {
                          color:
                            selectedSize === 2
                              ? colors.WHITE_COLOR
                              : colors.BUTTON_BACKGROUND_COLOR,
                        },
                      ]}>
                      M
                    </Text>
                  </TouchableOpacity>
                  <View style={{width: 10}}></View>
                  <TouchableOpacity
                    style={[
                      [
                        styles.sizeView,
                        {
                          backgroundColor:
                            selectedSize === 3
                              ? colors.BUTTON_BACKGROUND_COLOR
                              : null,
                          borderColor:
                            selectedSize === 3
                              ? null
                              : activeColors.BORDER_COLOR,
                        },
                      ],
                    ]}
                    onPress={() => sizePress(3)}>
                    <Text
                      style={[
                        styles.sizeText,
                        {
                          color:
                            selectedSize === 3
                              ? colors.WHITE_COLOR
                              : colors.BUTTON_BACKGROUND_COLOR,
                        },
                      ]}>
                      L
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View
              style={[styles.desBox, {borderColor: activeColors.BORDER_COLOR}]}>
              <Text
                style={[
                  styles.desText,
                  {color: activeColors.WHITE_TEXT_COLOR},
                ]}>
                {STRINGS.productDetails.description}
              </Text>
              <Text
                style={[styles.conText, {color: activeColors.DES_TEXT_COLOR}]}>
                {STRINGS.productDetails.con}
              </Text>
              <View style={{height: 10}}></View>
              {textVisible === true && (
                <>
                  <Text
                    style={[
                      styles.conText,
                      {color: activeColors.DES_TEXT_COLOR},
                    ]}>
                    {STRINGS.productDetails.con1}
                  </Text>
                  <View style={{height: 10}}></View>
                  <Text
                    style={[
                      styles.conText,
                      {color: activeColors.DES_TEXT_COLOR},
                    ]}>
                    {STRINGS.productDetails.con2}
                  </Text>
                </>
              )}

              <TouchableOpacity
                style={styles.viewMoreContainer}
                onPress={viewMorePress}>
                <View style={styles.viewMoreView}>
                  <Text style={styles.moreText}>
                    {STRINGS.productDetails.viewMore}
                  </Text>
                </View>

                <View style={styles.moreIconView}>
                  <Icon
                    type={Icons.Entypo}
                    name={'chevron-down'}
                    color={colors.BUTTON_BACKGROUND_COLOR}
                    size={20}
                  />
                </View>
              </TouchableOpacity>
            </View>

            <ViewAllContainer
              name={STRINGS.productDetails.reviewProduct}
              customText={styles.nameText}
              customView={{marginHorizontal: 9}}
              viewAllPress={reviewsPress}
            />
            <View style={styles.starFlexContainer}>
              <View style={styles.startRowView}>
                {Array.from({length: numberOfImages}).map((_, index) => (
                  <Image
                    key={index}
                    source={assets.bigStar}
                    style={styles.yellowImg}
                  />
                ))}
                <Image source={assets.star} style={styles.img} />
              </View>

              <Text
                style={[
                  styles.rentText,
                  {
                    color: '#787878',
                    fontFamily: senExtraBold,
                    paddingRight: 6,
                  },
                ]}>
                {STRINGS.productDetails.rent}
              </Text>
              <Text
                style={[
                  styles.saleText,
                  {color: activeColors.DES_TEXT_COLOR, alignSelf: 'center'},
                ]}>
                {STRINGS.productDetails.review}
              </Text>
            </View>

            <CommentView
              imageSource={assets.profilePicture}
              name={STRINGS.productDetails.personName}
              date={STRINGS.productDetails.date}
              content={STRINGS.productDetails.reviewCon}
            />
            <CommentView
              imageSource={assets.profilePicture}
              name={STRINGS.productDetails.personName}
              date={STRINGS.productDetails.date}
              content={STRINGS.productDetails.reviewCon}
            />

            <ViewAllContainer
              name={STRINGS.productDetails.reachedPro}
              customText={styles.nameText}
              customView={{marginHorizontal: 9}}
            />

            <MyFlatList
              data={product}
              renderItem={_productRenderItem}
              numColumns={2}
              scrollEnabled={false}
              columnWrapperStyle={styles.row}
            />
          </View>
        </ScrollView>
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
          onPress={openModal}
        />
      </View>
      <Modal animationType="none" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View
            style={[
              styles.modalContent,
              {backgroundColor: activeColors.HOME_SAFE_AREA_VIEW},
            ]}>
            <View
              style={[
                styles.flexSaveAddView,
                {backgroundColor: activeColors.MODAL_SAVE_ADD_VIEW},
              ]}>
              <View style={styles.saveAddView}>
                <Text
                  style={[
                    styles.saveAddText,
                    {color: activeColors.WHITE_TEXT_COLOR},
                  ]}>
                  {STRINGS.productDetailModal.saveAdd}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.addNewAddView}
                onPress={addAddress}>
                <Text style={styles.addNewAddText}>
                  {STRINGS.productDetailModal.addNewAdd}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{height: 10}}></View>

            <AddressView
              imageSource={assets.address}
              name={STRINGS.productDetailModal.homeAddress}
              title={STRINGS.productDetailModal.name}
              number={STRINGS.productDetailModal.number}
              address={STRINGS.productDetailModal.address}
            />
            <AddressView
              imageSource={assets.officeAddress}
              name={STRINGS.productDetailModal.ofcAddress}
              title={STRINGS.productDetailModal.name}
              number={STRINGS.productDetailModal.number}
              address={STRINGS.productDetailModal.address}
            />

            <View style={{height: 20}}></View>
            <MyButton
              text={STRINGS.productDetailModal.confirmAddress}
              onPress={confirmPress}
            />
          </View>
        </View>
      </Modal>
      <HomeSafeAreaBottom />
    </>
  );
};

export default ProductDetails;
