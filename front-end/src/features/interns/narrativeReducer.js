import {createSlice, createAsyncThunk, current} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  isError: false,
  allNarrative: null,
};

export const getAllNarrative = createAsyncThunk(
  "/narrative/getAllNarrative",
  async ({email}, {rejectWithValue}) => {
    try {
      const url = `http://localhost:5000/attendance/getAllNarrative/${email}`;
      const {data: res} = await axios.get(url);
      console.log(res);
      return {res: res.data};
      // const
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        error: error.response.data,
        status: error.response.status,
      });
    }
  }
);

export const narrativeReducer = createSlice({
  name: "narrative",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllNarrative.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllNarrative.fulfilled, (state, {payload}) => {
        console.log(payload.res);
        state.allNarrative = payload.res;
        state.isLoading = false;
      })
      .addCase(getAllNarrative.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const {} = narrativeReducer.actions;

export default narrativeReducer.reducer;
