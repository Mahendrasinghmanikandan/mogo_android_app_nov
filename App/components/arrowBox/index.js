import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '../../utils/colors';
import Icon, {Icons} from '../../utils/icon';

const BoxArrow = props => {
  const {onPress, customHeight} = props;
  return (
    <TouchableOpacity
      style={[styles.view, {height: customHeight || '6.5%', width:100}]}
      onPress={onPress}>
      <Text style={{color:colors.WHITE_COLOR, fontWeight:"bold"}}>Start</Text>
      <Icon
        type={Icons.Octicons}
        name={'arrow-right'}
        color={colors.WHITE_COLOR}
        size={25}
      />
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
  view: {
    backgroundColor: colors.BUTTON_BACKGROUND_COLOR,
    // marginHorizontal: 20,
    minWidth: '14%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginVertical: 15,
    zIndex: 999,
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal:20
  },
});

export default BoxArrow;
