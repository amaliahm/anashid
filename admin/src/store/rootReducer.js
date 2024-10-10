import { combineReducers } from '@reduxjs/toolkit';

// REDUCERS
import authSlice from '../slices/authSlice.js';
import { userReducer } from '../slices/usersSlice.js';
import categoryReducer from '../slices/categoriesSlice.js';
import artistReducer from '../slices/artistsSlice.js';
import trashReducer from '../slices/trashSlice.js';
import profileReducer from '../slices/profileSlice.js';
import settingsReducer from '../slices/settingsSlice.js';
import anasheedSlice from '../slices/anasheedSlice.js';
import homeReducer from '../slices/homeSlice.js';

export const rootReducer = combineReducers({
  auth: authSlice,
  users: userReducer,
  categories: categoryReducer,
  artists: artistReducer,
  trash: trashReducer,
  profile: profileReducer,
  settings: settingsReducer,
  anasheed: anasheedSlice,
  home: homeReducer,
});