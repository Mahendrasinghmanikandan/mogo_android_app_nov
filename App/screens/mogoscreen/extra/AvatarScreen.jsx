/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image} from 'react-native';
import React from 'react';
import {CENTER_DIV} from '../../../utils/styles/responsive';
import {useSelector} from 'react-redux';
import _ from 'lodash';

const AvatarScreen = ({width, height, borderRadius}) => {
  const userData = useSelector(data => data);
  return (
    <View>
      {_.get(userData, 'product.value.user_profile') ? (
        <Image
          source={{
            uri: _.get(userData, 'product.value.user_profile'),
          }}
          style={{
            width: width,
            height: height,
            borderRadius: !borderRadius ? 50 : 20,
          }}
        />
      ) : (
        <View
          style={[
            CENTER_DIV,
            {
              width: width,
              height: height,
              borderRadius: !borderRadius ? 50 : 20,

              backgroundColor: _.get(userData, 'product.value.profile_color'),
            },
          ]}>
          <Text
            style={{
              fontSize: 20,
              color: 'white',
              textTransform: 'uppercase',
            }}>
            {_.get(userData, 'product.value.name')?.split('')[0]}
          </Text>
        </View>
      )}
    </View>
  );
};

export default AvatarScreen;
