/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import assets from '../../utils/assets/assets';
import {
  nineFontPixel,
  oneFourFontPixel,
  oneOneFontPixel,
  senBold,
  senMedium,
} from '../../utils/fontsSize';
import {colors, MOGO_COLORS} from '../../utils/colors';
import {ThemeContext} from '../../contextes/themeContext';

import moment from 'moment';
import Icon, {Icons} from '../../utils/icon';
import {useSelector} from 'react-redux';
import _ from 'lodash';
import {
  deleteVariantComments,
  deleteVariantReviews,
} from '../../utils/apihelper';
import AvatarScreen from '../../screens/mogoscreen/extra/AvatarScreen';
import AvatarScreen2 from '../../screens/mogoscreen/extra/AvatarScreen2';

const numberOfImages = 4;

const CommentView = props => {
  const {name, date, content, rating, color, email, fetchData, key, id, field, url} =
    props;
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const data = useSelector(data => data);

  const [loading, setLoading] = useState(false);

  const hanldeReadMore = data => {
    try {
      Alert.alert('', data);
    } catch (err) {}
  };

  const handleDelete = async value => {
    console.log(value);
    try {
      setLoading(true);
      if (field === 'review') {
        await deleteVariantReviews(value);
        fetchData();
      } else {
        await deleteVariantComments(value);
        fetchData();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <View
        style={[
          styles.viewContainer,
          {
            backgroundColor: activeColors.DRAWER_COLOR,
            elevation: 2,
            padding: 15,
          },
        ]}>
        {/* <View
          style={[
            styles.imgView,
            {
              width: 35,
              height: 35,
              backgroundColor: color,
              borderRadius: 50,
            },
          ]}>
          <Text style={{color: 'white'}}>
            {name?.split('')[0]?.toUpperCase()}
          </Text>
        </View> */}
        <AvatarScreen2  url={url} name={name} color={color} />
        <View style={styles.nameContainer}>
          <Text
            style={[styles.nameText, {color: activeColors.WHITE_TEXT_COLOR}]}>
            {name}
          </Text>

          {rating && (
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
          )}
          <Text style={[styles.dateText, {color: activeColors.DES_TEXT_COLOR}]}>
            {moment(date).format('DD.MM.YYYY')}
          </Text>
          <Text
            numberOfLines={3}
            style={[styles.contentText, {color: activeColors.DES_TEXT_COLOR}]}>
            {content}
          </Text>
          <TouchableOpacity
            onPress={() => {
              hanldeReadMore(content);
            }}>
            <Text style={{color: MOGO_COLORS.primaryBlue}}>Read More</Text>
          </TouchableOpacity>
          <View style={{height: 5}} />
        </View>
        {_.get(data, 'product.value.email', '') === email &&
          (loading ? (
            <ActivityIndicator color={MOGO_COLORS.secondaryGreen} />
          ) : (
            <TouchableOpacity
              style={styles.dateView}
              onPress={() => {
                handleDelete(id);
              }}>
              <Icon
                type={Icons.MaterialCommunityIcons}
                name={'delete'}
                color={theme.mode === 'dark' ? 'white' : '#acacac'}
                size={20}
              />
            </TouchableOpacity>
          ))}
      </View>

      {/* <View style={styles.contentView}>
        <Text
          style={[
            styles.contentText,
            {color: activeColors.DES_TEXT_COLOR, paddingHorizontal: 35},
          ]}>
          {content}
        </Text>
      </View> */}
    </View>
  );
};

export const styles = StyleSheet.create({
  starFlexContainer: {
    flexDirection: 'row',
    marginTop: -5,
  },
  startRowView: {
    flexDirection: 'row',
    paddingVertical: 6,
  },

  imgView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  // startRowView: {
  //   flexDirection: 'row',
  // },
  nameContainer: {
    justifyContent: 'center',
    flex: 1,
    paddingLeft: 14,
  },
  img: {
    height: 15,
    width: 15,
    resizeMode: 'stretch',
  },
  dateView: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  nameText: {
    fontFamily: senBold,
    fontSize: oneFourFontPixel,
  },
  dateText: {
    fontSize: nineFontPixel,
    fontFamily: senMedium,
  },
  contentText: {
    marginVertical: 10,
    fontFamily: senMedium,
    lineHeight: 25,
    fontSize: oneOneFontPixel,
  },
  yellowImg: {
    marginRight: 2,
  },
});

export default CommentView;
