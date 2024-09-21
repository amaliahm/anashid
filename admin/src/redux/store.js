import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import { userReducer } from './reducer/usersReducer';
import categoryReducer from './reducer/categoriesSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    categories: categoryReducer,
  },
});

export default store;