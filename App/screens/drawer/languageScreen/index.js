import React, {useContext, useState} from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import HomeSafeAreaView from '../../../components/homeSafeAreaView';
import StatusBarComponents from '../../../components/statusBarComponent';
import HomeArrowView from '../../../components/homeArrowView';
import STRINGS from '../../../utils/constants/string';
import MyFlatList from '../../../components/myFlatlist';
import {styles} from './styles';
import {ThemeContext} from '../../../contextes/themeContext';
import {colors} from '../../../utils/colors';
import HomeSafeAreaBottom from '../../../components/homeSafeAreaBottom';
import {languageData} from './data';

const Language = ({navigation}) => {
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const [data, setData] = useState(languageData);

  const backPress = () => {
    navigation.goBack();
  };

  const _languageRenderItem = ({item}) => {
    return (
      <TouchableOpacity style={[styles.renderView , {backgroundColor: activeColors.DRAWER_COLOR}]}>
        <View
          style={[
            styles.imgView,
            {backgroundColor: activeColors.BRAND_BACK_COLOR},
          ]}>
          <Image source={item.image} />
        </View>
        <View style={styles.titleView}>
          <Text style={[styles.title, {color: activeColors.WHITE_TEXT_COLOR}]}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <HomeSafeAreaView />
      <StatusBarComponents />
      <HomeArrowView onPress={backPress} title={STRINGS.language.title} />
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
            <MyFlatList data={data} renderItem={_languageRenderItem} />
          </ScrollView>
        </View>
      </View>
      <HomeSafeAreaBottom />
    </>
  );
};

export default Language;
