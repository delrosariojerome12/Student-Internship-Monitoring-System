import {createSlice, createAsyncThunk, current} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  interns: null,
  approvalInterns: null,
  selectedIntern: null,
  isLoading: false,
  isError: false,
  isLoginError: false,
};

export const getAllInterns = createAsyncThunk(
  "/intern/getAllInterns",
  async () => {
    try {
      const url = "https://sims-twqb.onrender.com/intern/getAllInterns";
      const {data: res} = await axios.get(url);

      const interns = [...res.interns].sort((a, b) => {
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

      return {res: interns};
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
      const url = `https://sims-twqb.onrender.com/intern/getIntern/${email}`;
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
      const {form} = payload;
      const {email} = form;
      const url = `https://sims-twqb.onrender.com/intern/updateIntern`;
      const {data: res} = await axios.patch(url, form);

      const newApprovalIntern = [...state.intern.approvalInterns].filter(
        (intern) => intern.email !== email
      );
      const interns = [...res.interns].sort((a, b) => {
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

      return {user: res.user, interns, newApprovalIntern};
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const internReducer = createSlice({
  name: "intern",
  initialState,
  reducers: {
    handleSelectedIntern: (state, action) => {
      state.selectedIntern = action.payload;
      console.log(state.selectedIntern);
    },
    handleSort: (state, action) => {
      console.log("sort");
    },
  },
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
      });
    // update intern
    builder
      .addCase(updateIntern.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateIntern.fulfilled, (state, action) => {
        state.isLoading = false;
        state.interns = action.payload.interns;
        state.approvalInterns = action.payload.newApprovalIntern;
      })
      .addCase(updateIntern.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const {handleSelectedIntern, handleSort} = internReducer.actions;

export default internReducer.reducer;
