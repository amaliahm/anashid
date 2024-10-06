import { combineReducers } from '@reduxjs/toolkit';

//SLICES
import authReducer from '../slices/authSlice.js';
import publicitiesSlice from '../slices/publicitiesSlice.js';

export const rootReducer = combineReducers({
    auth: authReducer,
    publicities: publicitiesSlice,
});
