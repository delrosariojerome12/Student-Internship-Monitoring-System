import {createSlice, createAsyncThunk, current} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  documents: null,
  selectedDocument: null,
  isLoading: false,
  isError: false,
};

export const handleGetDocuments = createAsyncThunk(
  "/documents/getDocuments",
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
export const handleCreateDocument = createAsyncThunk(
  "/documents/createDocument",
  async (form, {rejectWithValue}) => {
    try {
      const url = `http://localhost:5000/document/createDocument`;
      const {data: res} = await axios.post(url, form);
      return {res};
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const handleDeleteDocument = createAsyncThunk(
  "/documents/deleteDocument",
  async (id, {rejectWithValue}) => {
    try {
      const url = `http://localhost:5000/document/deleteDocument/${id}`;
      const {data} = await axios.delete(url);
      return {data};
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const handleUpdateDocument = createAsyncThunk(
  "/documents/updateDocument",
  async ({form, id}, {rejectWithValue}) => {
    try {
      const url = `http://localhost:5000/document/updateDocument/${id}`;
      const {data: res} = await axios.patch(url, form);
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
    handleSelect: (state, {payload}) => {
      const newDocuments = current(state.documents).filter(
        (item) => item._id === payload
      );
      state.selectedDocument = newDocuments[0];
    },
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
      })
      // create document
      .addCase(handleCreateDocument.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(handleCreateDocument.fulfilled, (state, {payload}) => {
        const {document} = payload.res;
        state.isLoading = false;
        state.documents = [...state.documents, document];
      })
      .addCase(handleCreateDocument.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
      })
      // delete
      .addCase(handleDeleteDocument.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(handleDeleteDocument.fulfilled, (state, {payload}) => {
        state.isLoading = false;
        const {
          data: {data},
        } = payload;
        state.documents = current(state.documents).filter(
          (item) => item._id !== data._id
        );
      })
      .addCase(handleDeleteDocument.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
      })
      // update
      .addCase(handleUpdateDocument.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(handleUpdateDocument.fulfilled, (state, {payload: {res}}) => {
        const {
          data: {allDocuments},
        } = res;
        state.isLoading = false;
        state.documents = allDocuments;
      })
      .addCase(handleUpdateDocument.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});

export const {handleSelect} = documentReducer.actions;

export default documentReducer.reducer;
