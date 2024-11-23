/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View, Text, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {LogBox} from 'react-native';
import {ThemeContext} from '../contextes/themeContext';
import {storeData, getData} from '../contextes/asyncstorage';
import {MainStackNavigator} from './stackNavigation';
import {Provider} from 'react-redux';
import store from '../screens/mogoscreen/redux/store';

const App = () => {
  LogBox.ignoreLogs(['Warning: ...']);
  LogBox.ignoreAllLogs();
  const [theme, setTheme] = useState({mode: 'light'});
  const UpdateTheme = newTheme => {
    let mode;
    if (!newTheme) {
      mode = theme.mode === 'dark' ? 'light' : 'dark';
      newTheme = {mode};
    }
    setTheme(newTheme);
    storeData('newsFeedTheme', newTheme);
  };
  const fetchStoreTheme = async () => {
    try {
      const themeData = await getData('newsFeedTheme');
      if (themeData) {
        UpdateTheme(themeData);
      }
    } catch ({error}) {
      Alert.alert('==>', error);
    }
  };
  useEffect(() => {
    fetchStoreTheme();
  }, []);

  return (
    <ThemeContext.Provider value={{theme, UpdateTheme}}>
      <Provider store={store}>
        <MainStackNavigator />
      </Provider>
    </ThemeContext.Provider>
  );
};

export default App;
