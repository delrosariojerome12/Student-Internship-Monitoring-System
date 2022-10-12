import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  isError: false,
};

const globalReducer = createSlice({
  name: "global reducer",
  initialState,
  reducers: {
    handleLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    handleError: (state, action) => {
      state.isError = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export default globalReducer.reducer;
