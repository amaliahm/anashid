import { combineReducers } from '@reduxjs/toolkit';

// REDUCERS
import authReducer from '../redux/auth/authSlice';
import { userReducer } from '../redux/reducer/usersReducer';
import categoryReducer from '../redux/reducer/categoriesSlice';
import artistReducer from '../redux/reducer/artistsSlice';
import trashReducer from '../redux/reducer/trashReducer';
import profileReducer from '../redux/reducer/profileReducer';
import settingsReducer from '../redux/reducer/settingsReducer';
import anasheedSlice from '../redux/reducer/anasheedSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  users: userReducer,
  categories: categoryReducer,
  artists: artistReducer,
  trash: trashReducer,
  profile: profileReducer,
  settings: settingsReducer,
  anasheed: anasheedSlice
});

export default rootReducer;