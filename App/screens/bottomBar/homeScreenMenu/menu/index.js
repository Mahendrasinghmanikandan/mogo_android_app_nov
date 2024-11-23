import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import HomeSafeAreaView from '../../../../components/homeSafeAreaView';
import HomeArrowView from '../../../../components/homeArrowView';
import STRINGS from '../../../../utils/constants/string';
import StatusBarComponents from '../../../../components/statusBarComponent';
import {styles} from './styles';
import {ThemeContext} from '../../../../contextes/themeContext';
import {useContext} from 'react';
import {colors} from '../../../../utils/colors';
import MyFlatList from '../../../../components/myFlatlist';
import {menuData} from './data';
import BottomSafeAreaView from '../../../../components/bottomSafeAreaView';
import ColorBottomSafeAreaView from '../../../../components/colorBottomSafeAreaView';
import { SUB_MENU } from '../../../../navigation/stackNavigation';

const MenuScreen = ({navigation}) => {
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];
  const [menu, setMenu] = useState(menuData);

  const backPress = () => {
    navigation.goBack();
  };

  const menuPress = () => {
    navigation.navigate(SUB_MENU);
  }



  const _menuRenderItem = ({item, index}) => {
    const isLastItem = index === menu.length - 1;

    return (
      <TouchableOpacity style={[styles.menuRenderView, {marginRight: isLastItem ? 20 : 0}]} onPress={menuPress}>
        <View
          style={[
            styles.subView,
            {backgroundColor: activeColors.MENU_BACK_COLOR},
          ]}>
          <View style={styles.imgView}>
            <Image source={item.image} />
          </View>
          <View style={styles.nameView}>
            <Text
              style={[styles.nameText, {color: activeColors.WHITE_TEXT_COLOR}]}>
              {item.name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <HomeSafeAreaView />
      <StatusBarComponents />
      <HomeArrowView title={STRINGS.menu.title} notification={true} onPress={backPress}/>
      <View
        style={[
          styles.viewContainer,
          {backgroundColor: activeColors.HOME_SAFE_AREA_VIEW},
        ]}>
        <View
          style={[
            styles.borderRadiusContainer,
            {backgroundColor: activeColors.FLEX_VIEW_COLOR},
          ]}>
          <MyFlatList
            data={menu}
            renderItem={_menuRenderItem}
            numColumns={4}
            scrollEnabled={false}
          />
        </View>
      </View>
      <ColorBottomSafeAreaView />
    </>
  );
};

export default MenuScreen;
