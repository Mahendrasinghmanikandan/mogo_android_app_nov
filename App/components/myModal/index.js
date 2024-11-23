import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import {colors} from '../../utils/colors';
import {
  senBold,
  oneFiveFontPixel,
  senMedium,
  oneFourFontPixel,
  oneTwoFontPixel,
  oneOneFontPixel,
  oneThreeFontPixel,
} from '../../utils/fontsSize';
import responsive from '../../utils/styles/responsive';
import {useContext} from 'react';
import {ThemeContext} from '../../contextes/themeContext';
import STRINGS from '../../utils/constants/string';
import Icon, {Icons} from '../../utils/icon';
import assets from '../../utils/assets/assets';
import RangeSlider from 'rn-range-slider';

const THUMB_RADIUS_LOW = 12;
const THUMB_RADIUS_HIGH = 16;

const ModalTitle = props => {
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];
  const {title} = props;
  return (
    <View style={styles.priceView}>
      <Text style={[styles.priceText, {color: activeColors.WHITE_TEXT_COLOR}]}>
        {title}
      </Text>
    </View>
  );
};

const TouchbleView = props => {
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];
  const {title} = props;
  const [select, setSelect] = useState(false);
  const activePress = () => {
    setSelect(!select);
  };
  return (
    <TouchableOpacity
      onPress={activePress}
      style={[
        styles.backView,
        {
          backgroundColor: activeColors.BRAND_BACK_COLOR,
          borderColor: select === true ? colors.BUTTON_BACKGROUND_COLOR : null,
          borderWidth: select === true ? 1 : null,
        },
      ]}>
      <Text
        style={[styles.touchbleText, {color: activeColors.WHITE_TEXT_COLOR}]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const StarView = props => {
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];
  const {title, numberOfImages} = props;
  const [select, setSelect] = useState(false);
  const activePress = () => {
    setSelect(!select);
  };
  return (
    <TouchableOpacity
      onPress={activePress}
      style={[
        styles.upContainer,
        {
          backgroundColor: activeColors.BRAND_BACK_COLOR,
          borderColor: select === true ? colors.BUTTON_BACKGROUND_COLOR : null,
          borderWidth: select === true ? 1 : null,
        },
      ]}>
      {Array.from({length: numberOfImages}).map((_, index) => (
        <Image
          key={index}
          source={assets.yellowStar}
          style={styles.yellowImg}
        />
      ))}
      <Text
        style={[styles.touchbleText, {color: activeColors.WHITE_TEXT_COLOR}]}>
        {STRINGS.subMenuAction.up}
      </Text>
    </TouchableOpacity>
  );
};

const MyModal = props => {
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];
  const {closePress, isVisible, onRequestClose, resetPress} = props;

  // slider
  const [lowValue, setLowValue] = useState(0);
  const [highValue, setHighValue] = useState(30);

  const onValueChanged = (low, high) => {
    setLowValue(low);
    setHighValue(high);
  };

  const Thumb = () => {
    return (
      <View style={styles.roundView}>
        <Image source={assets.sliderImg} style={styles.imgView} />
      </View>
    );
  };

  const renderThumb = useCallback(() => <Thumb />, []);

  const Rail = () => {
    return (
      <View
        style={[styles.root, {backgroundColor: activeColors.BORDER_COLOR}]}
      />
    );
  };

  const RailSelected = () => {
    return (
      <View
        style={[styles.root, {backgroundColor: colors.BUTTON_BACKGROUND_COLOR}]}
      />
    );
  };

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={isVisible}
      onRequestClose={onRequestClose}>
      <View style={styles.centeredView}>
        <View
          style={[
            styles.modalContainer,
            {backgroundColor: activeColors.SCREEN_BACKGROUND_COLOR},
          ]}>
          <View style={styles.flexView}>
            <View style={{flex: 1}}>
              <Text
                style={[
                  styles.modalTitleText,
                  {color: activeColors.WHITE_TEXT_COLOR},
                ]}>
                {STRINGS.subMenuAction.modalTitle}
              </Text>
            </View>

            <TouchableOpacity onPress={closePress}>
              <Icon
                type={Icons.AntDesign}
                name={'close'}
                color={
                  theme.mode === 'dark'
                    ? colors.WHITE_COLOR
                    : colors.BLACK_COLOR
                }
                size={20}
              />
            </TouchableOpacity>
          </View>

          <View
            style={[
              styles.line,
              {borderColor: activeColors.BORDER_COLOR},
            ]}></View>

          <ModalTitle title={STRINGS.subMenuAction.price} />

          <View style={{justifyContent: 'center'}}>
            <RangeSlider
              style={{paddingHorizontal: 10, marginVertical: 10}}
              min={0}
              max={100}
              step={1}
              low={lowValue}
              high={highValue}
              onValueChanged={onValueChanged}
              renderThumb={renderThumb}
              renderRail={Rail}
              renderRailSelected={RailSelected}
            />
          </View>

          <View style={styles.textFlexView}>
            <View style={styles.oneFlexView}>
              <Text
                style={[styles.text, {color: activeColors.WHITE_TEXT_COLOR}]}>
                {STRINGS.subMenuAction.priceOne}
              </Text>
            </View>
            <View>
              <Text
                style={[styles.text, {color: activeColors.WHITE_TEXT_COLOR}]}>
                {STRINGS.subMenuAction.priceTwo}
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.line,
              {borderColor: activeColors.BORDER_COLOR, width: '90%'},
            ]}></View>

          <ModalTitle title={STRINGS.subMenuAction.brand} />
          <View
            style={[
              styles.touchbleFlexVIew,
              {justifyContent: 'space-between'},
            ]}>
            <TouchbleView title={STRINGS.subMenuAction.brandOne} />
            <TouchbleView title={STRINGS.subMenuAction.brandTwo} />
            <TouchbleView title={STRINGS.subMenuAction.brandThree} />
            <TouchbleView title={STRINGS.subMenuAction.brandFour} />
            <TouchbleView title={STRINGS.subMenuAction.brandFour} />
          </View>
          <View style={{height: 15}}></View>
          <View style={styles.touchbleFlexVIew}>
            <TouchbleView title={STRINGS.subMenuAction.brandFive} />
            <TouchbleView title={STRINGS.subMenuAction.brandSix} />
            <TouchbleView title={STRINGS.subMenuAction.brandSeven} />
          </View>

          <View
            style={[
              styles.line,
              {borderColor: activeColors.BORDER_COLOR, width: '90%'},
            ]}></View>

          <ModalTitle title={STRINGS.subMenuAction.reviews} />

          <View style={{flexDirection: 'row'}}>
            <StarView numberOfImages={4} />
            <StarView numberOfImages={3} />
            <StarView numberOfImages={2} />
          </View>
          <View style={{height: 15}}></View>
          <View style={{flexDirection: 'row'}}>
            <StarView numberOfImages={1} />
          </View>

          <View
            style={[
              styles.line,
              {borderColor: activeColors.BORDER_COLOR, width: '90%'},
            ]}></View>

          <ModalTitle title={STRINGS.subMenuAction.sortBy} />
          <View style={styles.touchbleFlexVIew}>
            <TouchbleView title={STRINGS.subMenuAction.byOne} />
            <TouchbleView title={STRINGS.subMenuAction.byTwo} />
          </View>
          <View style={{height: 15}}></View>
          <View style={[styles.touchbleFlexVIew]}>
            <TouchbleView title={STRINGS.subMenuAction.byThree} />
            <TouchbleView title={STRINGS.subMenuAction.byFour} />
          </View>
          <View style={{height: 15}}></View>
          <View style={styles.touchbleFlexVIew}>
            <TouchbleView title={STRINGS.subMenuAction.byFive} />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={resetPress}
              style={[
                styles.buttonView,
                {
                  backgroundColor: activeColors.BRAND_BACK_COLOR,
                  marginRight: 10,
                },
              ]}>
              <Text
                style={[
                  styles.buttonText,
                  {color: activeColors.WHITE_TEXT_COLOR},
                ]}>
                {STRINGS.subMenuAction.reset}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.buttonView,
                {
                  backgroundColor: colors.BUTTON_BACKGROUND_COLOR,
                  marginLeft: 10,
                },
              ]}>
              <Text style={[styles.buttonText, {color: colors.WHITE_COLOR}]}>
                {STRINGS.subMenuAction.apply}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent:  Platform.OS === 'android' ? 'center' :  'center',
    alignItems:  Platform.OS === 'android' ? 'center' :  'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    marginHorizontal: 15,
    width: '90%',
    paddingVertical: 15,
    borderRadius: 10,
  },
  modalTitleText: {
    color: colors.BLACK_COLOR,
    fontFamily: senBold,
    fontSize: oneFiveFontPixel,
  },
  flexView: {
    flexDirection: 'row',
    paddingHorizontal: 13,
  },
  line: {
    borderWidth: 0.7,
    marginTop: 10,
    width: '100%',
    alignSelf: 'center',
  },
  priceView: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  priceText: {
    fontFamily: senMedium,
    fontSize: oneFourFontPixel,
    fontWeight: '700',
  },
  textFlexView: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  oneFlexView: {
    flex: 1,
  },
  text: {
    fontFamily: senMedium,
    fontSize: oneTwoFontPixel,
  },
  backView: {
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginRight: 3,
  },
  touchbleFlexVIew: {
    flexDirection: 'row',
    marginHorizontal: 15,
  },
  touchbleText: {
    fontFamily: senMedium,
    fontSize: oneOneFontPixel,
  },
  upContainer: {
    backgroundColor: 'lightblue',
    marginLeft: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  buttonContainer: {
    marginHorizontal: 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop:  Platform.OS === 'android' ? 10 : 50,
  },
  buttonView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: responsive.heightPixel(45),
    borderRadius: 10,
  },
  buttonText: {
    fontFamily: senMedium,
    fontSize: oneThreeFontPixel,
  },
  root: {
    height: 3,
    borderRadius: 2,
    width: '100%',
  },
  roundView: {
    backgroundColor: colors.BUTTON_BACKGROUND_COLOR,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgView: {
    alignSelf: 'center',
  },
});

export default MyModal;
