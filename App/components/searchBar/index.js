import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon, {Icons} from '../../utils/icon';
import {useContext} from 'react';
import {ThemeContext} from '../../contextes/themeContext';
import {colors} from '../../utils/colors';
import {oneThreeFontPixel, senMedium} from '../../utils/fontsSize';
import responsive from '../../utils/styles/responsive';

const SearchBar = ({setSearchData, searchData}) => {
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  return (
    <View
      style={[
        styles.view,
        {
          borderColor: activeColors.BORDER_COLOR,
          backgroundColor: activeColors.DRAWER_COLOR,
        },
      ]}>
      <View style={styles.inputView}>
        <TextInput
          onChangeText={e => setSearchData(e)}
          // onSubmitEditing={e => {
          //   console.log(searchData);
          // }}
          value={searchData}
          
          placeholder={'Search Product Name'}
          placeholderTextColor={activeColors.SEARCH_INPUT_COLOR}
          style={[styles.inputText, {color: searchData ? "black" : activeColors.SEARCH_INPUT_COLOR}]}
        />
      </View>
      <View style={styles.iconView}>
        {searchData ? (
          <TouchableOpacity
            onPress={() => {
              setSearchData('');
            }}>
            <Icon
              type={Icons.Entypo}
              name={'cross'}
              color={
                theme.mode === 'dark' ? colors.WHITE_COLOR : colors.BLACK_COLOR
              }
              size={25}
            />
          </TouchableOpacity>
        ) : (
          <Icon
            type={Icons.Ionicons}
            name={'search-outline'}
            color={
              theme.mode === 'dark' ? colors.WHITE_COLOR : colors.BLACK_COLOR
            }
            size={25}
          />
        )}
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  view: {
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 15,
    height: responsive.heightPixel(40),
    marginHorizontal: 15,
  },
  inputView: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 10,
  },
  inputText: {
    fontFamily: senMedium,
    fontSize: oneThreeFontPixel,
  },
  iconView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchBar;
