import {View, Text, Image, Platform} from 'react-native';
import React, {useState} from 'react';
import HomeSafeAreaView from '../../../../components/homeSafeAreaView';
import StatusBarComponents from '../../../../components/statusBarComponent';
import HomeArrowView from '../../../../components/homeArrowView';
import {styles} from './styles';
import {useContext} from 'react';
import {ThemeContext} from '../../../../contextes/themeContext';
import {colors} from '../../../../utils/colors';
import {subCategoryData} from './data';
import MyFlatList from '../../../../components/myFlatlist';
import STRINGS from '../../../../utils/constants/string';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { SUB_MENU_ACTION} from '../../../../navigation/stackNavigation';

const SubCategory = ({navigation}) => {
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const [data, setData] = useState(subCategoryData);

  const backPress = () => {
    navigation.goBack();
  };

  const actionPress = () => {
    navigation.navigate(SUB_MENU_ACTION);
  };

  const _categoryRenderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={actionPress} >
        <Image source={item.image} />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <HomeSafeAreaView />
      <StatusBarComponents />
      <HomeArrowView title={STRINGS.subCategory.title} onPress={backPress} />
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
            renderItem={_categoryRenderItem}
            numColumns={3}
            columnWrapperStyle={styles.row}
          />
        </View>
      </View>
    </>
  );
};

export default SubCategory;
