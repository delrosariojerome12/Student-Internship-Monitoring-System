import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  documents: null,
  isLoading: false,
  isError: false,
};

export const handleGetDocuments = createAsyncThunk(
  "/documents,getDocuments",
  async (x, {rejectWithValue}) => {
    try {
      const url = `http://localhost:5000/document/getAllDocuments`;
      const {data: res} = await axios.get(url);
      return {res};
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const documentReducer = createSlice({
  name: "document",
  initialState,
  reducers: {
    handleDelete: (state) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleGetDocuments.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(handleGetDocuments.fulfilled, (state, action) => {
        const {
          res: {documents},
        } = action.payload;
        state.isLoading = false;
        state.documents = documents;
      })
      .addCase(handleGetDocuments.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});

export const {handleDelete} = documentReducer.actions;

export default documentReducer.reducer;
