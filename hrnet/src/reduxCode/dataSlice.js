import { createSlice } from '@reduxjs/toolkit';

export const dataSlice = createSlice({
  name: 'data',
  initialState: {
    items: [],
    error: null,
  },
  reducers: {
    setData: (state, action) => {
      state.items = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addItem: (state, action) => {
        state.items.push(action.payload);
    },
  },
});

export const { setData, setError, addItem } = dataSlice.actions;

export default dataSlice.reducer;