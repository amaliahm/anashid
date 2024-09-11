import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle',
  },
  reducers: {
    signupReducer: (state, action) => {
      state.user = action.payload;
    },
    loginReducer: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { signupReducer, loginReducer } = authSlice.actions;
export default authSlice.reducer;
