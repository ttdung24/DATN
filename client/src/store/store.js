import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './slice/accountSlice';
import shopReducer from './slice/shopSlice';
import categoryReducer from './slice/categorySlice';
import cartReducer from './slice/cartSlice';

export const store = configureStore({
  reducer: {
    account: accountReducer,
    shop: shopReducer,
    category: categoryReducer,
    cart: cartReducer,
  },
});
