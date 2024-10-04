import { combineReducers } from '@reduxjs/toolkit';

//SLICES
import authReducer from '../slices/authSlice.js';

export const rootReducer = combineReducers({
    auth: authReducer,
});
