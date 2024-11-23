import {View, Text, StyleSheet, Image, TouchableOpacity, Platform} from 'react-native';
import React, {useState} from 'react';
import {ThemeContext} from '../../contextes/themeContext';
import {useContext} from 'react';
import {colors} from '../../utils/colors';
import assets from '../../utils/assets/assets';
import responsive from '../../utils/styles/responsive';
import {
  senMedium,
  oneTwoFontPixel,
  senBold,
  nineFontPixel,
} from '../../utils/fontsSize';

const numberOfImages = 4;

const RecomendedView = props => {
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const {
    image,
    title,
    price,
    sale,
    per,
    perView,
    imageOnPress,
    onPress,
    available,
    children,
  } = props;
  const [selectedFav, setSelectedFav] = useState(false);

  const favPress = () => {
    setSelectedFav(!selectedFav);
  };

  return (
    <TouchableOpacity
      style={[
        styles.productRenderView,
        {backgroundColor: activeColors.DRAWER_COLOR},
      ]}
      onPress={onPress}>
      <TouchableOpacity style={styles.productImgView} onPress={imageOnPress}>
        <Image source={image} style={styles.img} />
        {perView === true && (
          <View style={styles.perView}>
            <Text style={styles.perText}>{per}</Text>
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.titleView}>
        <Text style={[styles.titleText, {color: activeColors.ICON_COLOR}]}>
          {title}
        </Text>
      </View>

      <View style={styles.flexView}>
        <View style={styles.priceView}>
          <Text style={styles.priceText}>{price}</Text>
        </View>
        <TouchableOpacity onPress={() => favPress()}>
          <Image source={selectedFav ? assets.favTwo : assets.favOne} />
        </TouchableOpacity>
      </View>

      <View style={styles.starView}>
        {Array.from({length: numberOfImages}).map((_, index) => (
          <Image
            key={index}
            source={assets.yellowStar}
            style={styles.yellowImg}
          />
        ))}
        <Image source={assets.star} />
        <View style={styles.saleView}>
          <Text style={styles.saleText}>{sale}</Text>
        </View>
      </View>

      {available === true && <View>{children}</View>}
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
  productRenderView: {
    paddingVertical: 15,
    width: responsive.widthPixel(155),
    marginVertical:  Platform.OS === 'android' ? 0 : 10,
    justifyContent: 'center',
    borderRadius: 15,
  },
  titleView: {
    paddingHorizontal: 15,
    paddingVertical: 4,
    paddingTop: 8,
    height: 45,
  },
  productImgView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontFamily: senMedium,
    fontSize: oneTwoFontPixel,
  },
  flexView: {
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  priceView: {
    flex: 1,
    justifyContent: 'center',
  },
  priceText: {
    color: colors.BUTTON_BACKGROUND_COLOR,
    fontFamily: senBold,
    fontWeight: 'bold',
    fontSize: oneTwoFontPixel,
  },
  priceText: {
    color: colors.BUTTON_BACKGROUND_COLOR,
    fontFamily: senBold,
    fontWeight: 'bold',
    fontSize: oneTwoFontPixel,
  },
  starView: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 6,
  },
  saleView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  saleText: {
    color: '#A9A9A9',
    fontFamily: senMedium,
    fontSize: nineFontPixel,
  },
  yellowImg: {
    marginHorizontal: 2,
  },
  perView: {
    backgroundColor: colors.BUTTON_BACKGROUND_COLOR,
    position: 'absolute',
    top: 0,
    left: 12,
    height: 23,
    width: 55,
    borderTopStartRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderEndEndRadius: 10,
  },
  perText: {
    color: colors.WHITE_COLOR,
    fontFamily: senBold,
    fontSize: nineFontPixel,
  },
  img: {
    borderRadius: 15,
    width: '85%',
    resizeMode: 'stretch',
  },
});

export default RecomendedView;
