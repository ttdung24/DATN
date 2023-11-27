import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: [],
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    getCategories: (state, action) => {
      state.category = [...action.payload];
    },
  },
});

export const { getCategories } = categorySlice.actions;

export default categorySlice.reducer;
