import React, {useEffect, useRef, useState} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import assets from '../../../utils/assets/assets';
import {onBoardData} from './data';
import {useContext} from 'react';
import {ThemeContext} from '../../../contextes/themeContext';
import {colors, MOGO_COLORS} from '../../../utils/colors';
import StatusBarComponents from '../../../components/statusBarComponent';
import {styles} from './styles';
import BottomSafeAreaView from '../../../components/bottomSafeAreaView';
import {LOGIN} from '../../../navigation/stackNavigation';

const Onboarding = ({navigation}) => {
  const [screen, setScreen] = useState(0);
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const onViewableItemsChanged = ({viewableItems}) => {
    setScreen(viewableItems[0].key);
  };

  const viewabilityConfigCallbackPairs = useRef([{onViewableItemsChanged}]);

  const skipButton = () => {
    navigation.navigate(LOGIN);
  };

  const onBoardingRenderItem = ({item}) => {
    return (
      <View style={styles.item}>
        <View>
          <Image
            source={theme.mode === 'dark' ? assets.topImg1 : assets.topImg2}
          />
        </View>
        <View style={styles.imgView}>
          <Image
            source={theme.mode === 'dark' ? item.image : item.lightImage}
          />
        </View>
        <View style={styles.titleView}>
          <Text
            style={[styles.titleText, {color: activeColors.WHITE_TEXT_COLOR}]}>
            {item.title}
          </Text>
        </View>
        <View style={styles.subTitleView}>
          <Text style={[styles.subText, {color: activeColors.DES_TEXT_COLOR}]}>
            {item.subtitle}
          </Text>
        </View>
        <View style={styles.btnDotContainer}>
          <View style={styles.dotContainer}>
            <View
              style={[
                styles.dot,
                {
                  backgroundColor: screen === 1 ? MOGO_COLORS.primaryBlue : '#8399a9',
                  width: screen === 1 ? 15 : 6,
                },
              ]}></View>
            <View
              style={[
                styles.dot,
                {
                  backgroundColor: screen === 2 ? MOGO_COLORS.primaryBlue: '#8399a9',
                  width: screen === 2 ? 15 : 6,
                },
              ]}></View>
            <View
              style={[
                styles.dot,
                {
                  backgroundColor: screen === 3 ? MOGO_COLORS.primaryBlue : '#8399a9',
                  width: screen === 3 ? 15 : 6,
                },
              ]}></View>
          </View>
          <TouchableOpacity style={styles.nextView} onPress={skipButton}>
            <Text style={styles.btnText}>{item.buttonTitle}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View
      style={[
        styles.viewContainer,
        {backgroundColor: activeColors.SCREEN_BACKGROUND_COLOR},
      ]}>
      <StatusBarComponents />
      <View>
        <FlatList
          data={onBoardData}
          pagingEnabled={true}
          key={({item}) => {
            item.id;
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          viewabilityConfigCallbackPairs={
            viewabilityConfigCallbackPairs.current
          }
          renderItem={onBoardingRenderItem}
        />
      </View>
      {/* <BottomSafeAreaView /> */}
    </View>
  );
};

export default Onboarding;
