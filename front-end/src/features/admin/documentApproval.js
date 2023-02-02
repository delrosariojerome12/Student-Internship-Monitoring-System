import {createSlice, createAsyncThunk, current} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  isError: false,
  interns: null,
  selectedIntern: null,
  totalDocuments: null,
};

export const getAllVerifiedInterns = createAsyncThunk(
  "/documentApproval/getAllVerifiedInterns",
  async (x, {rejectWithValue}) => {
    try {
      const url = "http://localhost:5000/intern/getAllVerifiedInterns";
      const {data: res} = await axios.get(url);

      console.log(res);
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

// export const approve = createAsyncThunk(
//   "/documentApproval/getAllVerifiedInterns",
//   async (x, {rejectWithValue}) => {
//     try {
//       const url = "http://localhost:5000/intern/getAllVerifiedInterns";
//       const {data: res} = await axios.get(url);

//       console.log(res);
//       const newInterns = res.interns
//         .map((item) => {
//           const {
//             verification: {isVerified},
//             documentDetails,
//           } = item;
//           if (isVerified && documentDetails.length !== 0) {
//             const filteredDocumentDetails = documentDetails.filter((docs) => {
//               const {completion} = docs;
//               return completion.hasSent && {docs};
//             });
//             return {...item, documentDetails: filteredDocumentDetails};
//           }
//         })
//         .filter((item) => {
//           return item;
//         });

//       return {res: newInterns, totalDocuments: res.totalDocuments};
//     } catch (error) {
//       console.log(error);
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

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
        state.totalDocuments = action.payload.totalDocuments;
      })
      .addCase(getAllVerifiedInterns.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const {} = documentApprovalReducer.actions;

export default documentApprovalReducer.reducer;
