import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import { userReducer } from './reducer/usersReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
  },
});

export default store;