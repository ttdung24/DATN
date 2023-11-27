import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: '',
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    login: (state, action) => {
      state.accessToken = action.payload;
    },

    logout: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});

export const { login, logout } = accountSlice.actions;

export default accountSlice.reducer;