import React, {useContext, useEffect, useState} from 'react';
import {View, Tex, TouchableOpacity, ScrollView} from 'react-native';
import HomeSafeAreaView from '../../../components/homeSafeAreaView';
import HomeArrowView from '../../../components/homeArrowView';
import HomeSafeAreaBottom from '../../../components/homeSafeAreaBottom';
import {styles} from './styles';
import {colors} from '../../../utils/colors';
import {ThemeContext} from '../../../contextes/themeContext';
import AddressView from '../../../components/address';
import assets from '../../../utils/assets/assets';
import STRINGS from '../../../utils/constants/string';
import Icon, {Icons} from '../../../utils/icon';
import {ADD_ADDRESS} from '../../../navigation/stackNavigation';
import StatusBarComponents from '../../../components/statusBarComponent';
import {
  collectMyDeliveryAddress,
  deleteMydeliveryAddress,
} from '../../../utils/apihelper';
import _ from 'lodash';
import {useIsFocused, useNavigation} from '@react-navigation/native';

const SaveAddress = ({}) => {
  const {theme, UpdateTheme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const backPress = () => {
    navigation.goBack();
  };

  const addressEditPress = value => {
    navigation.navigate(ADD_ADDRESS, {
      data: value,
    });
  };

  const navigation = useNavigation();
  const isFocus = useIsFocused();

  const [deliveryAddress, setDeliveryAddress] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchAddressData = async () => {
    try {
      setLoading(true);
      const result = await collectMyDeliveryAddress();
      setDeliveryAddress(_.get(result, 'data.data', []));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddressData();
  }, [isFocus]);

  const handleDelete = async values => {
    try {
      setLoading(false);
      await deleteMydeliveryAddress(values._id);
      fetchAddressData();
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <HomeSafeAreaView />
      <StatusBarComponents />
      <HomeArrowView title={STRINGS.saveAddress.title} onPress={backPress} />
      <View
        style={[
          styles.viewContainer,
          {backgroundColor: activeColors.HOME_SAFE_AREA_VIEW},
        ]}>
        <View
          style={[
            styles.sunViewContainer,
            {backgroundColor: activeColors.FLEX_VIEW_COLOR},
          ]}>
          <View style={{height: 10}} />
          <ScrollView>
            {deliveryAddress.map((res, index) => {
              return (
                <AddressView
                  key={index}
                  data={res}
                  editAddress={addressEditPress}
                  deleteAddress={handleDelete}
                  editAddressImage={assets.addressEdit}
                  editShown={true}
                />
              );
            })}
          </ScrollView>

          <View style={styles.iconView}>
            <TouchableOpacity
              style={styles.iconTouchView}
              onPress={addressEditPress}>
              <Icon
                type={Icons.Feather}
                name={'plus'}
                color={colors.WHITE_COLOR}
                size={35}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <HomeSafeAreaBottom />
    </>
  );
};

export default SaveAddress;
