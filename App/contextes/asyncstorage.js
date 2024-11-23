import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    // console.log('storeData', jsonValue);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    Alert.alert(e);
  }
};

export const getData = async (key, value) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    // console.log('getData', jsonValue);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    Alert.alert(e);
  }
};
