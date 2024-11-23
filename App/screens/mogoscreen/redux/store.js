import {configureStore} from '@reduxjs/toolkit';
import UserReducer from './userSlice';
import cardReducer from './cartSlice';
import ListReducer from './favSlice';
import NotificationReducer from './notificationslice';

const store = configureStore({
  reducer: {
    product: UserReducer,
    card_slice: cardReducer,
    list_slice: ListReducer,
    notification_slice: NotificationReducer,
    // refresh_slice: RefrshScreen,
  },
});

export default store;
