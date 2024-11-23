/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image} from 'react-native';
import React from 'react';
import {CENTER_DIV} from '../../../utils/styles/responsive';
import {useSelector} from 'react-redux';
import _ from 'lodash';

const AvatarScreen2 = ({url, name, color}) => {
  return (
    <View>
      {url ? (
        <Image
          source={{
            uri: url,
          }}
          style={{
            width: 50,
            height: 50,
            borderRadius: 50,
          }}
        />
      ) : (
        <View
          style={[
            CENTER_DIV,
            {
              width: 50,
              height: 50,
              borderRadius: 50,

              backgroundColor: color,
            },
          ]}>
          <Text
            style={{
              fontSize: 20,
              color: 'white',
              textTransform: 'uppercase',
            }}>
            {name?.split('')[0]}
          </Text>
        </View>
      )}
    </View>
  );
};

export default AvatarScreen2;
