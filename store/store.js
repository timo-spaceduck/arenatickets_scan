import {configureStore} from '@reduxjs/toolkit';
import userReducer from './auth.store';
import eventReducer from './event.store';

const store = configureStore({
  reducer: {
    user: userReducer,
    event: eventReducer,
  },
});
export default store;
