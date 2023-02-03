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
            documentDetails,
          } = item;
          if (isVerified && documentDetails.length !== 0) {
            const filteredDocumentDetails = documentDetails.filter((docs) => {
              const {completion} = docs;
              return completion.hasSent && {docs};
            });
            return {...item, documentDetails: filteredDocumentDetails};
          }
        })
        .filter((item) => {
          return item;
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
  async ({email, id, documentDetails}, {rejectWithValue}) => {
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
    const allDocuments = [...documentDetails];
    // const completeDocumentDetails = [...allDocuments, newDocumentDetails[0]];

    console.log(allDocuments);

    // try {
    // const url = `http://localhost:5000/intern/approveDocument/${email}`;
    // const {data: res} = await axios.patch(url, {
    // documentDetails: completeDocumentDetails,
    // });
    // console.log(res.documentDetails);
    // } catch (error) {
    // console.log(error);
    // return rejectWithValue(error.response.data);
    // }
  }
);

export const rejectDocumentRequest = createAsyncThunk(
  "/documentApproval/rejectDocument",
  async (x, {rejectWithValue}) => {
    console.log("reject");
    try {
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
