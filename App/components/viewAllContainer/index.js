import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  senBold,
  TwoZeroFontPixel,
  senLight,
  oneThreeFontPixel,
} from '../../utils/fontsSize';
import {colors} from '../../utils/colors';
import {useContext} from 'react';
import {ThemeContext} from '../../contextes/themeContext';
import STRINGS from '../../utils/constants/string';
import Icon, {Icons} from '../../utils/icon';
import responsive from '../../utils/styles/responsive';

const ViewAllContainer = props => {
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];
  const {name, viewAllPress, customText, customView, productData, viveAll} =
    props;

  return (
    <View style={[styles.menuView, {...customView}]}>
      <Text
        style={[
          styles.Text,
          {color: activeColors.WHITE_TEXT_COLOR, ...customText},
        ]}>
        {name}
      </Text>
      {!viveAll && (
        <TouchableOpacity
          style={styles.allView}
          onPress={() => {
            viewAllPress(name, productData);
          }}>
          <Text style={styles.viewAllText}>{STRINGS.home.all}</Text>
          <Icon
            type={Icons.Feather}
            name={'chevrons-right'}
            color={colors.BUTTON_BACKGROUND_COLOR}
            size={20}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export const styles = StyleSheet.create({
  menuView: {
    marginHorizontal: 18,
    marginVertical: 10,
    flexDirection: 'row',
  },
  Text: {
    fontFamily: senBold,
    fontSize: responsive.fontPixel(18),
    flex: 3.9,
  },
  viewAllText: {
    textAlign: 'right',
    fontFamily: senLight,
    fontSize: oneThreeFontPixel,
    color: colors.BUTTON_BACKGROUND_COLOR,
    fontWeight: '600',
  },
  iconView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  allView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
});

export default ViewAllContainer;
