/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import assets from '../../utils/assets/assets';
import {colors, MOGO_COLORS} from '../../utils/colors';
import {useContext} from 'react';
import {ThemeContext} from '../../contextes/themeContext';
import Icon, {Icons} from '../../utils/icon';
import {oneSixFontPixel, senBold, senMedium} from '../../utils/fontsSize';
import responsive, {CENTER_DIV} from '../../utils/styles/responsive';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';
import {useNavigation} from '@react-navigation/native';
import {NOTIFICATION} from '../../navigation/stackNavigation';
import moment from 'moment';
import {notificationCount} from '../../screens/mogoscreen/redux/notificationslice';
import {collectNotificationCount} from '../../utils/apihelper';

const DrawerView = props => {
  const {
    title,
    subTitle,
    notification,
    drawerOnPress,
    customView,
    onlyTitle,
    titleProp,
    search,
    searchOnPress,
  } = props;
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const userData = useSelector(data => data);

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const result = await Promise.all([collectNotificationCount()]);
      dispatch(notificationCount({count: _.get(result, '[0].data.data', [])}));
    } catch (err) {}
  };

  useEffect(() => {
    const intervalId = setInterval(fetchData, 7000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <View
      style={[
        styles.view,
        {backgroundColor: activeColors.PRIMARY_COLOR, ...customView},
      ]}>
      <TouchableOpacity
        style={[
          styles.drawerView,
          {backgroundColor: activeColors.DRAWER_COLOR},
        ]}
        onPress={drawerOnPress}>
        <Image
          source={assets.drawer}
          tintColor={theme.mode === 'dark' ? colors.WHITE_COLOR : null}
        />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        {titleProp === true ? (
          <View>
            <Text
              style={[
                styles.onlyTitleText,
                {color: activeColors.WHITE_TEXT_COLOR},
              ]}>
              {onlyTitle}
            </Text>
          </View>
        ) : (
          <>
            <View style={styles.flexView}>
              <View style={styles.titleView}>
                <Text
                  style={[
                    styles.title,
                    {color: activeColors.WHITE_TEXT_COLOR},
                  ]}>
                  {title}
                </Text>
              </View>
              <Icon
                type={Icons.Entypo}
                name={'chevron-small-down'}
                color={
                  theme.mode === 'dark'
                    ? colors.WHITE_COLOR
                    : colors.BLACK_COLOR
                }
                size={20}
              />
            </View>

            <View>
              <Text style={styles.subTitleText}>{subTitle}</Text>
            </View>
          </>
        )}
      </View>

      <View>
        {search === true && (
          <TouchableOpacity
            style={[
              styles.drawerView,
              {backgroundColor: activeColors.DRAWER_COLOR},
            ]}
            onPress={searchOnPress}>
            <Icon
              type={Icons.Feather}
              name={'search'}
              color={'#ababab'}
              size={25}
            />
          </TouchableOpacity>
        )}
        {notification && (
          <TouchableOpacity
            style={[
              styles.drawerView,
              {backgroundColor: activeColors.DRAWER_COLOR},
            ]}
            onPress={() => {
              navigation.navigate(NOTIFICATION);
            }}>
            <Image source={assets.notification} />
            <View
              style={[
                CENTER_DIV,
                {
                  backgroundColor: MOGO_COLORS.secondaryGreen,
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  width: 18,
                  height: 18,
                  borderRadius: 50,
                  display: _.get(userData, 'notification_slice.value.count', '')
                    ? 'flex'
                    : 'none',
                },
              ]}>
              <Text style={{color: 'white', fontSize: 12}}>
                {_.get(userData, 'notification_slice.value.count', '')}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  view: {
    backgroundColor: 'orange',
    paddingHorizontal: 5,
    paddingVertical: Platform.OS === 'ios' ? 5 : 8,
    flexDirection: 'row',
    paddingTop: 10,
  },
  drawerView: {
    borderRadius: 10,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexView: {
    flexDirection: 'row',
  },
  titleView: {
    textDecorationStyle: 'underline',
  },
  title: {
    fontFamily: senMedium,
    textDecorationLine: 'underline',
  },
  subTitleText: {
    fontFamily: senMedium,
    color: '#ee544b',
  },
  onlyTitleText: {
    fontFamily: senBold,
    fontSize: responsive.fontPixel(18.5),
  },
});

export default DrawerView;
