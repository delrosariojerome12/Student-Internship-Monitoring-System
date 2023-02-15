import {createSlice, createAsyncThunk, current} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  internships: null,
  selectedInternship: null,
  isLoading: false,
  isError: false,
};

export const getAllInternship = createAsyncThunk(
  "/internship/getAllInternship",
  async (x, {rejectWithValue}) => {
    try {
      const url = `http://localhost:5000/internship/getAllInternship`;
      const {data: res} = await axios.get(url);
      console.log(res);
      return {res};
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const internshipReducer = createSlice({
  name: "internship",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(getAllInternship.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllInternship.fulfilled, (state, {payload: {res}}) => {
        state.internships = res.data;
        state.isLoading = false;
      })
      .addCase(getAllInternship.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const {} = internshipReducer.actions;

export default internshipReducer.reducer;
