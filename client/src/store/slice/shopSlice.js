import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  shop: {},
};

export const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    getShop: (state, action) => {
      state.shop = { ...action.payload };
    },
  },
});

export const { getShop } = shopSlice.actions;

export default shopSlice.reducer;
