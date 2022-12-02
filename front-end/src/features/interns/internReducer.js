import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  interns: [],
  isLoading: false,
  isError: false,
};

export const getAllInterns = createAsyncThunk(
  "/intern/getAllInterns",
  async () => {
    try {
      const url = "http://localhost:5000/intern/getAllInterns";
      const {data: res} = await axios.get(url);
      return {res: res.interns};
    } catch (error) {
      console.log(error);
      //   return rejectWithValue(error.response.data);
    }
  }
);

export const internReducer = createSlice({
  name: "intern",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllInterns.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllInterns.fulfilled, (state, action) => {
        const {res} = action.payload;
        console.log(res);
        state.isLoading = false;
        state.interns = res;
      })
      .addCase(getAllInterns.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const {} = internReducer.actions;

export default internReducer.reducer;
