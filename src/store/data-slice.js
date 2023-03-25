import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    data: [],
  },
  reducers: {
    fetchItems(state, action) {
      state.data = action.payload;
    },
  },
});

export const { fetchItems } = dataSlice.actions;

export default dataSlice;
