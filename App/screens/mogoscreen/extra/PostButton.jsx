/* eslint-disable react-native/no-inline-styles */ /* eslint-disable prettier/prettier */
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useRef} from 'react';
import Icon, {Icons} from '../../../utils/icon';
import {colors, MOGO_COLORS} from '../../../utils/colors';
import {oneFourFontPixel, senMedium} from '../../../utils/fontsSize';
import {ThemeContext} from '../../../contextes/themeContext';
import StarRating from 'react-native-star-rating-widget';
import BottomSheet from 'react-native-raw-bottom-sheet';
import {CENTER_DIV} from '../../../utils/styles/responsive';

const PostButton = props => {
  const {theme} = useContext(ThemeContext);
  const activeColors = colors[theme.mode];
  const res_sheet = useRef();
  const {
    placeholder,
    setCommentsData,
    err,
    setError,
    hanldeSubmit,
    loading,
    commentsData,
    ratings,
    setRatings,
  } = props;
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          res_sheet.current.open();
        }}
        style={{
          position: 'absolute',
          bottom: 0,
          height: 35,
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: MOGO_COLORS.secondaryGreen,
          elevation: 2,
        }}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>
          Add {placeholder}
        </Text>
      </TouchableOpacity>
      <BottomSheet height={ratings ? 300 : 200} ref={res_sheet}>
        <View style={[CENTER_DIV, {paddingTop: 25, flexDirection: 'column'}]}>
          {ratings && (
            <>
              <StarRating
                rating={ratings}
                onChange={e => {
                  setRatings(e);
                }}
              />
              <View style={{height: 15}} />
            </>
          )}
          <TextInput
            style={{
              borderColor: err ? 'red' : 'gray',
              width: '85%',
              borderRadius: 4,
              fontFamily: senMedium,
              height: 100,
              backgroundColor: 'white',
              borderWidth: 1,
              padding: 2,
            }}
            multiline={true}
            numberOfLines={7}
            onChangeText={e => {
              setCommentsData(e);
              setError(false);
            }}
            placeholder={` Enter Your ${placeholder}`}
            value={commentsData}
          />
          <View style={{height: 10}} />
          <TouchableOpacity
            style={[
              CENTER_DIV,
              {
                backgroundColor: MOGO_COLORS.secondaryGreen,
                width: '85%',
                height: 30,
              },
            ]}
            onPress={() => {
              hanldeSubmit();
              res_sheet.current.close();
            }}>
            {loading ? (
              <ActivityIndicator
                style={{width: '10%', paddingHorizontal: 10}}
              />
            ) : (
              <Text style={{color: 'white', fontWeight: 'bold'}}>
                Add {placeholder}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </>
  );
};

export default PostButton;

{
  /* <View
        style={{
          width: '90%',
        }}>
        <StarRating
          rating={ratings}
          onChange={e => {
            setRatings(e);
          }}
        />
      </View> */
}
{
  /* <TextInput
        style={{
          borderColor: err ? 'red' : 'gray',
          width: '85%',
          padding: 1,
          borderRadius: 4,
          height: 50,
          fontFamily: senMedium,
          paddingHorizontal: 15,
          backgroundColor: 'white',
          borderWidth: 1,
        }}
        multiline={true}
        numberOfLines={4}
        onChangeText={e => {
          setCommentsData(e);
          setError(false);
        }}
        placeholder={` Enter Your ${placeholder}`}
        value={commentsData}
      />
      {loading ? (
        <ActivityIndicator style={{width: '10%', paddingHorizontal: 10}} />
      ) : (
        <TouchableOpacity
          style={{width: '10%', paddingHorizontal: 10}}
          onPress={hanldeSubmit}>
          <Icon
            type={Icons.Ionicons}
            name={'send-sharp'}
            color={MOGO_COLORS.secondaryGreen}
            size={25}
          />
        </TouchableOpacity>
      )} */
}
