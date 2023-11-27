import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: {},
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    getCart: (state, action) => {
        state.cart = { ...state.cart, ...action.payload };
    },
  },
});

export const { getCart } = cartSlice.actions;

export default cartSlice.reducer;
