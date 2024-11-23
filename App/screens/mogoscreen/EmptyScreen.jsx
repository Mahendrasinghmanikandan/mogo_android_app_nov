/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image} from 'react-native';
import React from 'react';
import {CENTER_DIV} from '../../utils/styles/responsive';
import {senBold, senMedium, twoOneFontPixel} from '../../utils/fontsSize';

const EmptyScreen = ({image, name}) => {
  return (
    <View
      style={[
        CENTER_DIV,
        {flex: 1, backgroundColor: 'white', flexDirection: 'column'},
      ]}>
      <Image source={image} style={{width: 300, height: 300}} />
      <Text style={{fontFamily: senBold, fontSize: twoOneFontPixel}}>
        Your {name} is empty
      </Text>
    </View>
  );
};

export default EmptyScreen;
