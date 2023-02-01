import {createSlice, createAsyncThunk, current} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  isError: false,
  interns: null,
  selectedIntern: null,
};

export const getAllVerifiedInterns = createAsyncThunk(
  "/documentApproval/getAllVerifiedInterns",
  async (x, {rejectWithValue}) => {
    try {
      const url = "http://localhost:5000/intern/getAllInterns";
      const {data: res} = await axios.get(url);
      const newInterns = res.interns
        .map((item) => {
          const {
            verification: {isVerified},
            documentDetails,
          } = item;
          return isVerified && documentDetails.length !== 0 && item;
        })
        .filter((item) => item);
      return {res: newInterns};
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const documentApprovalReducer = createSlice({
  name: "documentApproval",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllVerifiedInterns.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllVerifiedInterns.fulfilled, (state, action) => {
        state.isLoading = false;
        state.interns = action.payload.res;
      })
      .addCase(getAllVerifiedInterns.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const {} = documentApprovalReducer.actions;

export default documentApprovalReducer.reducer;
