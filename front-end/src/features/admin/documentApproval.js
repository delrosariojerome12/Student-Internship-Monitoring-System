import {createSlice, createAsyncThunk, current} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  isError: false,
  interns: null,
  selectedIntern: null,
};

export const documentApprovalReducer = createSlice({
  name: "documentApproval",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const {} = documentApprovalReducer.actions;

export default documentApprovalReducer.reducer;
