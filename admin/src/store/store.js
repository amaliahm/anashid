// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer.js';

const anasheedStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,  
  }),
  devTools: process.env.NODE_ENV !== 'production', 
});

export default anasheedStore;