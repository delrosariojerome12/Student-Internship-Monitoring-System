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
  documentDetails: null,
};

export const updateDocumentsOnLoad = createAsyncThunk(
  "/intern/loadDocuments",
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
  "intern/sendDocument",
  async ({id, sentDocument, filePath}, {rejectWithValue, getState}) => {
    const {
      user: {
        user: {email, documentDetails},
      },
    } = getState();

    const newDocument = [...documentDetails]
      .filter((item) => item._id === id)
      .map((item) => {
        const {document} = item;
        return {
          completion: {
            sentDocument,
            filePath,
            hasSent: true,
            isApproved: false,
            isRejected: false,
          },
          document,
          _id: id,
        };
      });

    const allDocuments = [...documentDetails].filter((item) => item._id !== id);
    const completeDocumentDetails = [...allDocuments, newDocument[0]];

    try {
      const url = `http://localhost:5000/intern/sendDocument/${email}`;
      const {data: res} = await axios.patch(url, {
        documentDetails: completeDocumentDetails,
      });
      return {res: res.documentDetails};
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
    handleDocumentDetails: (state, {payload}) => {
      console.log(payload);
      state.documentDetails = payload;
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
        state.documentDetails = action.payload.res;
      })
      .addCase(sendDocument.rejected, (state, action) => {
        state.sendLoading = false;
      });
  },
});

export const {
  handleSelectedDocument,
  handleDocumentOpen,
  handleSampleViewed,
  handleDocumentDetails,
} = internDocumentReducer.actions;

export default internDocumentReducer.reducer;