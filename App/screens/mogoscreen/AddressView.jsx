import {View, Text} from 'react-native';
import React from 'react';
import _ from 'lodash';

const AddressView = ({data}) => {
  return (
    <View>
      <Text>{_.get(data, '[0].full_name', '')}</Text>
      <Text>
        {_.get(data, '[0].phone_number', '')}{' '}
        {_.get(data, '[0].alternate_phone_number', '')}
      </Text>
      <Text>
        {_.get(data, '[0].houseNo', '')},{' '}
        {_.get(data, '[0].street_address', '')},{' '}
        {_.get(data, '[0].district', '')}, {_.get(data, '[0].pincode', '')},{' '}
        {_.get(data, '[0].state', '')}
      </Text>
    </View>
  );
};

export default AddressView;
