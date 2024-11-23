import {Dimensions, PixelRatio} from 'react-native';
import {senBold, TwoZeroFontPixel} from '../fontsSize';
const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const widthBaseScale = SCREEN_WIDTH / 350;
const heightBaseScale = SCREEN_HEIGHT / 680;

function normalize(size, based = 'width') {
  const newSize =
    based === 'height' ? size * heightBaseScale : size * widthBaseScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

export const Window_Size = Dimensions.get('window').width;
export const Window_Size_height = Dimensions.get('window').height;

export const CENTER_FLEX_WRAP = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 10,
  justifyContent: 'center',
};

export const CENTER_DIV = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
};

export const promoView = {
  marginHorizontal: 20,
  marginVertical: 20,
};

export const promoText = {
  fontFamily: senBold,
  fontSize: TwoZeroFontPixel,
};

//for width  pixel
const widthPixel = size => {
  return normalize(size, 'width');
};
//for height  pixel
const heightPixel = size => {
  return normalize(size, 'height');
};
//for font  pixel
const fontPixel = size => {
  return heightPixel(size);
};
//for Margin and Padding vertical pixel
const pixelSizeVertical = size => {
  return heightPixel(size);
};
//for Margin and Padding horizontal pixel
const pixelSizeHorizontal = size => {
  return widthPixel(size);
};

export default {
  heightPixel,
  fontPixel,
  pixelSizeVertical,
  pixelSizeHorizontal,
  widthPixel,
};
