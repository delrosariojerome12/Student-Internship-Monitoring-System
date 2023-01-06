import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  interns: null,
  approvalInterns: null,
  selectedIntern: null,
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
      // change error
      // return rejectWithValue(error.response.data);
    }
  }
);

export const getIntern = createAsyncThunk(
  "/intern/getIntern",
  async (email) => {
    try {
      const url = `http://localhost:5000/intern/getIntern/${email}`;
      const {data: res} = await axios.get(url);
      return {user: res.user};
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateIntern = createAsyncThunk(
  "/intern/updateIntern",
  async (payload, {getState, rejectWithValue}) => {
    const state = getState();
    try {
      const {form, index} = payload;
      const {email} = form;
      const url = `http://localhost:5000/intern/updateIntern`;
      const {data: res} = await axios.patch(url, form);

      console.log(form);

      const newApprovalIntern = [...state.intern.approvalInterns].filter(
        (intern) => intern.email !== email
      );
      return {user: res.user, newApprovalIntern};
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const internReducer = createSlice({
  name: "intern",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // all interns
      .addCase(getAllInterns.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllInterns.fulfilled, (state, action) => {
        const {res} = action.payload;
        state.isLoading = false;
        state.interns = res;
        state.approvalInterns = res.filter(
          (intern) =>
            intern.verification.hasSentVerification &&
            intern.verification.isVerified === false &&
            intern
        );
      })
      .addCase(getAllInterns.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      // get intern
      .addCase(getIntern.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getIntern.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
      })
      .addCase(getIntern.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      // update intern
      .addCase(updateIntern.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateIntern.fulfilled, (state, action) => {
        const {newApprovalIntern} = action.payload;
        state.isLoading = false;
        state.approvalInterns = newApprovalIntern;
      })
      .addCase(updateIntern.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const {} = internReducer.actions;

export default internReducer.reducer;
