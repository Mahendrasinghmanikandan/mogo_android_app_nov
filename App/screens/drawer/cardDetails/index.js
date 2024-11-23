import React, {useContext, useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import HomeSafeAreaView from '../../../components/homeSafeAreaView';
import HomeArrowView from '../../../components/homeArrowView';
import {styles} from './styles';
import {ThemeContext} from '../../../contextes/themeContext';
import {colors} from '../../../utils/colors';
import {cardDetails} from './data';
import MyFlatList from '../../../components/myFlatlist';
import STRINGS from '../../../utils/constants/string';
import StatusBarComponents from '../../../components/statusBarComponent';
import Icon, {Icons} from '../../../utils/icon';
import {ADD_CARD_PAYMENT} from '../../../navigation/stackNavigation';
import HomeSafeAreaBottom from '../../../components/homeSafeAreaBottom';

const CardDetails = ({navigation}) => {
  const {theme, UpdateTheme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const [detailsData, setDetailsData] = useState(cardDetails);
  const [selectMethod, setSelectedMethod] = useState(false);

  const backPress = () => {
    navigation.goBack();
  };

  const methodSelectPress = item => {
    setSelectedMethod(item.id);
  };

  const addCardPress = () => {
    navigation.navigate(ADD_CARD_PAYMENT);
  };

  const _paymentRenderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={[
          styles.renderView,
          {
            backgroundColor: activeColors.HOME_SAFE_AREA_VIEW,
            borderColor:
              selectMethod === item.id ? colors.BUTTON_BACKGROUND_COLOR : null,
            borderWidth: selectMethod === item.id ? 1 : null,
          },
        ]}
        onPress={() => methodSelectPress(item)}>
        <View style={styles.imgView}>
          <Image source={item.image} />
        </View>
        <View style={styles.titleView}>
          <Text
            style={[styles.titleText, {color: activeColors.WHITE_TEXT_COLOR}]}>
            {item.title}
          </Text>
        </View>

        {selectMethod === item.id ? (
          <View
            style={[
              styles.blankRoundView,
              {backgroundColor: colors.BUTTON_BACKGROUND_COLOR},
            ]}>
            <Icon
              type={Icons.Feather}
              name={'check'}
              color={colors.WHITE_COLOR}
              size={20}
            />
          </View>
        ) : (
          <View
            style={[
              styles.blankRoundView,
              {backgroundColor: theme.mode === 'light' ? '#f6f7ff' : null},
            ]}></View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <>
      <HomeSafeAreaView />
      <StatusBarComponents />
      <HomeArrowView onPress={backPress} title={STRINGS.cardDetails.title} />
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
          <ScrollView>
            <MyFlatList data={detailsData} renderItem={_paymentRenderItem} />
          </ScrollView>
          <View style={styles.iconView}>
            <TouchableOpacity
              style={styles.iconTouchView}
              onPress={addCardPress}>
              <Icon
                type={Icons.Feather}
                name={'plus'}
                color={colors.WHITE_COLOR}
                size={35}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <HomeSafeAreaBottom />
    </>
  );
};

export default CardDetails;
