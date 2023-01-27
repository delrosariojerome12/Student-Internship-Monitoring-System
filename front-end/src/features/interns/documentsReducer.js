import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  selectedDocument: null,
  isDocumentOpen: false,
  isSampleViewed: false,
  isLoading: false,
  isError: false,
  sendLoading: false,
  sendError: false,
};

export const updateDocumentsOnLoad = createAsyncThunk(
  "/uer/internDocuments",
  async (email, {rejectWithValue}) => {
    try {
      const url = `http://localhost:5000/intern/updateDocuments/${email}`;
      const {data: res} = await axios.patch(url);
      //   console.log(res);
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const sendDocument = createAsyncThunk(
  "",
  async ({form, email}, {rejectWithValue, getState}) => {
    // console.log(form);
    // console.log(getState);
    try {
      // const url = `http://localhost:5000/intern/sendDocument/${email}`;
      // const {data: res} = await axios.patch(url);
      // console.log(res);
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const internDocumentReducer = createSlice({
  name: "intern-document",
  initialState,
  reducers: {
    handleSelectedDocument: (state, {payload}) => {
      state.selectedDocument = payload;
    },
    handleDocumentOpen: (state, {payload}) => {
      state.isDocumentOpen = !state.isDocumentOpen;
    },
    handleSampleViewed: (state, {payload}) => {
      state.isSampleViewed = !state.isSampleViewed;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateDocumentsOnLoad.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateDocumentsOnLoad.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateDocumentsOnLoad.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
    builder
      .addCase(sendDocument.pending, (state, action) => {
        state.sendLoading = true;
      })
      .addCase(sendDocument.fulfilled, (state, action) => {
        state.sendLoading = false;
      })
      .addCase(sendDocument.rejected, (state, action) => {
        state.sendLoading = false;
      });
  },
});

export const {handleSelectedDocument, handleDocumentOpen, handleSampleViewed} =
  internDocumentReducer.actions;

export default internDocumentReducer.reducer;
