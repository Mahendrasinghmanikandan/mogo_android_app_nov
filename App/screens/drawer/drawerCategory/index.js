import React, {useState, useContext} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import HomeSafeAreaView from '../../../components/homeSafeAreaView';
import StatusBarComponents from '../../../components/statusBarComponent';
import HomeArrowView from '../../../components/homeArrowView';
import {styles} from './styles';
import MyFlatList from '../../../components/myFlatlist';
import HomeSafeAreaBottom from '../../../components/homeSafeAreaBottom';
import STRINGS from '../../../utils/constants/string';
import {ThemeContext} from '../../../contextes/themeContext';
import {colors} from '../../../utils/colors';
import ColorBottomSafeAreaView from '../../../components/colorBottomSafeAreaView';
import {NOTIFICATION, SUB_MENU} from '../../../navigation/stackNavigation';
import {menuData} from '../../bottomBar/homeScreenMenu/menu/data';

const CategoryDrawer = ({navigation}) => {
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];
  const [menu, setMenu] = useState(menuData);

  const backPress = () => {
    navigation.goBack();
  };

  const menuPress = () => {
    navigation.navigate(SUB_MENU);
  };

  const notificationPress = () => {
    navigation.navigate(NOTIFICATION);
  };

  const _menuRenderItem = ({item, index}) => {
    return (
      <TouchableOpacity style={[styles.menuRenderView]} onPress={menuPress}>
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
      <HomeArrowView
        onPress={backPress}
        title={STRINGS.aboutUs.title}
        notification={true}
        notificationPress={notificationPress}
      />
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
            columnWrapperStyle={styles.row}
          />
        </View>
      </View>
      <ColorBottomSafeAreaView />
    </>
  );
};

export default CategoryDrawer;
