import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import { userReducer } from './reducer/usersReducer';
import categoryReducer from './reducer/categoriesSlice';
import artistReducer from './reducer/artistsSlice';
import trashReducer from './reducer/trashReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    categories: categoryReducer,
    artists: artistReducer,
    trash: trashReducer
  },
});

export default store;