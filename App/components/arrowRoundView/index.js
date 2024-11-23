import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React, {useContext} from 'react';
import {colors} from '../../utils/colors';
import assets from '../../utils/assets/assets';
import {Shadow} from 'react-native-shadow-2';
import { ThemeContext } from '../../contextes/themeContext';

const ArrowRoundView = props => {
  const {onPress} = props;
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  return (
    <>
      {Platform.OS === 'android' ? (
        <Shadow
          startColor={theme.mode === 'dark' ? '#6776fe' : '#ccd1ff'}
          offset={[15, 20]}
          distance={Platform.OS === 'android' ? 13 : 0}>
          <TouchableOpacity style={styles.iconView} onPress={onPress}>
            <Image source={assets.back} style={styles.img} />
          </TouchableOpacity>
        </Shadow>
      ) : (
        <View style={styles.view}>
          <TouchableOpacity style={styles.iconView} onPress={onPress}>
            <Image source={assets.back} style={styles.img} />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: Platform.OS === 'ios' ? 5 : 10,
  },
  iconView: {
    backgroundColor: colors.WHITE_COLOR,
    height: 45,
    width: 45,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8790de',
    shadowOffset: {
      width: Platform.OS === 'android' ? -10 : 0,
      height: Platform.OS === 'android' ? -10 : 5,
    },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 50,
    marginVertical: Platform.OS === 'ios' ? 0 : 20,
    marginHorizontal: Platform.OS === 'ios' ? 0 : 15,
  },
  img: {
    height: 12,
    width: 22,
    resizeMode: 'cover',
  },
});

export default ArrowRoundView;
