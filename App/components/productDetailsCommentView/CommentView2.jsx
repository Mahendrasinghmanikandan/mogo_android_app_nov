import React, {useContext} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import assets from '../../utils/assets/assets';
import {
  nineFontPixel,
  oneFourFontPixel,
  oneOneFontPixel,
  senBold,
  senMedium,
  senExtraBold,
} from '../../utils/fontsSize';
import {colors} from '../../utils/colors';
import {ThemeContext} from '../../contextes/themeContext';
import {act} from 'react-test-renderer';
import STRINGS from '../../utils/constants/string';
import ViewAllContainer from '../viewAllContainer';

const numberOfImages = 4;

const CommentView2 = props => {
  const {imageSource, name, date, content} = props;
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  return (
    <>
      <View style={styles.viewContainer}>
        <View style={styles.imgView}>
          <Image source={imageSource} />
        </View>
        <View style={styles.nameContainer}>
          <Text
            style={[styles.nameText, {color: activeColors.WHITE_TEXT_COLOR}]}>
            {name}
          </Text>
          <View style={{height: 5}}></View>
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
        </View>
        <View style={styles.dateView}>
          <Text style={[styles.dateText, {color: activeColors.DES_TEXT_COLOR}]}>
            {date}
          </Text>
        </View>
      </View>

      <View style={styles.contentView}>
        <Text
          style={[styles.contentText, {color: activeColors.DES_TEXT_COLOR}]}>
          {/* {content} */}
        </Text>
      </View>
    </>
  );
};

export const styles = StyleSheet.create({
  starFlexContainer: {
    flexDirection: 'row',
    marginTop: -5,
  },
  startRowView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 5,
  },

  imgView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  startRowView: {
    flexDirection: 'row',
  },
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
    alignSelf: 'flex-end',
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

export default CommentView2;
