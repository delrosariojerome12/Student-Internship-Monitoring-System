import {createSlice, createAsyncThunk, current} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  isError: false,
  isSentLoading: false,
  isSentError: false,
  isDocumentOpen: false,
  interns: null,
  selectedIntern: null,
  selectedDocument: null,
  totalDocuments: null,
};

export const getAllVerifiedInterns = createAsyncThunk(
  "/documentApproval/getAllVerifiedInterns",
  async (x, {rejectWithValue}) => {
    try {
      const url = "http://localhost:5000/intern/getAllVerifiedInterns";
      const {data: res} = await axios.get(url);

      const newInterns = res.interns
        .map((item) => {
          const {
            verification: {isVerified},
          } = item;
          if (isVerified) {
            return {...item};
          }
        })
        .filter((item) => {
          return item;
        })
        .sort((a, b) => {
          let fa = a.user.lastName.toLowerCase(),
            fb = b.user.lastName.toLowerCase();

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        });

      return {res: newInterns, totalDocuments: res.totalDocuments};
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const approveDocumentRequest = createAsyncThunk(
  "/documentApproval/approveDocument",
  async ({email, id, documentDetails}, {rejectWithValue, getState}) => {
    const {
      documentApproval: {interns},
    } = getState();

    const newDocumentDetails = [...documentDetails]
      .filter((item) => item._id === id)
      .map((item) => {
        const {document, completion} = item;
        return {
          completion: {
            ...completion,
            isApproved: true,
            isRejected: false,
          },
          document,
          _id: id,
        };
      });

    const allDocuments = [...documentDetails].filter((item) => item._id !== id);
    const completeDocumentDetails = [...allDocuments, newDocumentDetails[0]];

    const allInterns = [...interns].filter((item) => item.email !== email);

    try {
      const url = `http://localhost:5000/intern/approveDocument/${email}`;
      const {data: res} = await axios.patch(url, {
        documentDetails: completeDocumentDetails,
      });

      const completeInterns = [...allInterns, res].sort((a, b) => {
        let fa = a.user.lastName.toLowerCase(),
          fb = b.user.lastName.toLowerCase();

        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });

      return {res: completeInterns};
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const rejectDocumentRequest = createAsyncThunk(
  "/documentApproval/rejectDocument",
  async ({email, id, documentDetails}, {rejectWithValue, getState}) => {
    const {
      documentApproval: {interns},
    } = getState();

    const newDocumentDetails = [...documentDetails]
      .filter((item) => item._id === id)
      .map((item) => {
        const {document, completion} = item;
        return {
          completion: {
            ...completion,
            isApproved: false,
            isRejected: true,
          },
          document,
          _id: id,
        };
      });

    const allDocuments = [...documentDetails].filter((item) => item._id !== id);
    const completeDocumentDetails = [...allDocuments, newDocumentDetails[0]];

    const allInterns = [...interns].filter((item) => item.email !== email);
    try {
      const url = `http://localhost:5000/intern/approveDocument/${email}`;
      const {data: res} = await axios.patch(url, {
        documentDetails: completeDocumentDetails,
      });

      const completeInterns = [...allInterns, res].sort((a, b) => {
        let fa = a.user.lastName.toLowerCase(),
          fb = b.user.lastName.toLowerCase();

        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });

      return {res: completeInterns};
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const documentApprovalReducer = createSlice({
  name: "documentApproval",
  initialState,
  reducers: {
    handleOpenDocument: (state, action) => {
      state.isDocumentOpen = true;
      state.selectedDocument = action.payload;
    },
    handleCloseDocument: (state, action) => {
      state.isDocumentOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllVerifiedInterns.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllVerifiedInterns.fulfilled, (state, action) => {
        state.isLoading = false;
        state.interns = action.payload.res;
        state.totalDocuments = action.payload.totalDocuments;
      })
      .addCase(getAllVerifiedInterns.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
    builder
      .addCase(approveDocumentRequest.pending, (state, action) => {
        state.isSentLoading = true;
      })
      .addCase(approveDocumentRequest.fulfilled, (state, action) => {
        state.interns = action.payload.res;
        state.isSentLoading = false;
      })
      .addCase(approveDocumentRequest.rejected, (state, action) => {
        state.isSentLoading = false;
        state.isSentError = true;
      });
    builder
      .addCase(rejectDocumentRequest.pending, (state, action) => {
        state.isSentLoading = true;
      })
      .addCase(rejectDocumentRequest.fulfilled, (state, action) => {
        state.isSentLoading = false;
      })
      .addCase(rejectDocumentRequest.rejected, (state, action) => {
        state.isSentLoading = false;
        state.isSentError = true;
      });
  },
});

export const {handleOpenDocument, handleCloseDocument} =
  documentApprovalReducer.actions;

export default documentApprovalReducer.reducer;
