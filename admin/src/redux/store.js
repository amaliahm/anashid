import { configureStore } from '@reduxjs/toolkit';

// REDUCERS
import authReducer from './auth/authSlice';
import { userReducer } from './reducer/usersReducer';
import categoryReducer from './reducer/categoriesSlice';
import artistReducer from './reducer/artistsSlice';
import trashReducer from './reducer/trashReducer';
import profileReducer from './reducer/profileReducer';
import settingsReducer from './reducer/settingsReducer';
import anasheedSlice from './reducer/anasheedSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    categories: categoryReducer,
    artists: artistReducer,
    trash: trashReducer,
    profile: profileReducer,
    settings: settingsReducer,
    anasheed: anasheedSlice
  },
});

export default store;