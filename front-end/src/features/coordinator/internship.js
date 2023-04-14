import {createSlice, createAsyncThunk, current} from "@reduxjs/toolkit";
import axios from "axios";
import {updateIntern} from "../interns/internReducer";

const initialState = {
  internships: null,
  selectedInternship: null,
  isLoading: false,
  isError: false,
  isEditOpen: false,
  isViewOpen: false,
  isAddOpen: false,
  typeError: null,
  requestMessage: null,
  isMessageOpen: false,
  errorType: null,
  allInternshipsName: null,
};

export const getAllInternship = createAsyncThunk(
  "/internship/getAllInternship",
  async (x, {rejectWithValue}) => {
    try {
      const url = `https://sims-twqb.onrender.com/internship/getAllInternship`;
      const {data: res} = await axios.get(url);
      console.log(res);
      return {res};
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const createInternship = createAsyncThunk(
  "/internship/createInternship",
  async ({internship}, {rejectWithValue}) => {
    try {
      // const url = `http://localhost:5000/internship/createInternship`;
      const url = `https://sims-twqb.onrender.com/internship/createInternship`;
      const {data: res} = await axios.post(url, internship);
      return {res};
    } catch (error) {
      return rejectWithValue({
        error: error.response.data,
        status: error.response.status,
      });
    }
  }
);

export const updateInternship = createAsyncThunk(
  "/internship/updateInternship",
  async ({form, id}, {rejectWithValue}) => {
    try {
      // const url = `http://localhost:5000/internship/updateInternship/${id}`;
      const url = `https://sims-twqb.onrender.com/internship/updateInternship/${id}`;
      const {data: res} = await axios.patch(url, form);
      return {res};
    } catch (error) {
      return rejectWithValue({
        error: error.response.data,
        status: error.response.status,
      });
    }
  }
);
export const deleteInternship = createAsyncThunk(
  "/internship/deleteInternship",
  async ({id}, {rejectWithValue}) => {
    try {
      const url = `https://sims-twqb.onrender.com/internship/deleteInternship/${id}`;
      const {data: res} = await axios.delete(url);
      return {res};
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const enrollInternship = createAsyncThunk(
  "internship/enroll",
  async ({email, companyName}, {rejectWithValue}) => {
    try {
      const url = `https://sims-twqb.onrender.com/intern/enrollInternship/${email}`;
      // const url = `http://localhost:5000/intern/enrollInternship/${email}`;

      const {data: res} = await axios.patch(url, {
        params: {companyName},
      });
      console.log(res);
      return {res};
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const unEnrollInternship = createAsyncThunk(
  "internship/unEnroll",
  async ({email, companyName}, {rejectWithValue}) => {
    try {
      const url = `https://sims-twqb.onrender.com/intern/unEnrollInternship/${email}`;
      // const url = `http://localhost:5000/intern/unEnrollInternship/${email}`;
      const {data: res} = await axios.patch(url, {
        params: {companyName},
      });
      console.log(res);
      return {res};
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const internshipReducer = createSlice({
  name: "internship",
  initialState,
  reducers: {
    handleView: (state, {payload}) => {
      if (payload) {
        const internship = current(state.internships).filter(
          (item) => item._id === payload.id
        );
        state.selectedInternship = internship;
      }
      state.isViewOpen = !state.isViewOpen;
    },
    handleEdit: (state, {payload}) => {
      if (payload) {
        const internship = current(state.internships).filter(
          (item) => item._id === payload.id
        );
        state.selectedInternship = internship;
      }
      state.isEditOpen = !state.isEditOpen;
    },
    handleDelete: (state, action) => {
      console.log("delete");
    },
    handleAdd: (state, action) => {
      state.isAddOpen = !state.isAddOpen;
    },
    handleMessage: (state, action) => {
      state.isMessageOpen = !state.isMessageOpen;
    },
  },
  extraReducers: (build) => {
    // update in verification
    build
      .addCase(updateIntern.pending, (state, action) => {
        // state.isLoading = true;
      })
      .addCase(updateIntern.fulfilled, (state, {payload}) => {
        // const {allInternships} = res.data;
        // state.isLoading = false;

        if (payload.allInternships) {
          state.internships = [...payload.allInternships];
        }
      })
      .addCase(updateIntern.rejected, (state, action) => {
        // state.isLoading = false;
        // state.isError = true;
      });
    // enroll
    build
      .addCase(enrollInternship.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(enrollInternship.fulfilled, (state, {payload: {res}}) => {
        const {allInternships, enrolledIntern} = res.data;
        console.log(res);
        state.isLoading = false;
        state.internships = [...allInternships];
      })
      .addCase(enrollInternship.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
    // unenroll
    build
      .addCase(unEnrollInternship.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(unEnrollInternship.fulfilled, (state, {payload: {res}}) => {
        const {allInternships, enrolledIntern} = res.data;
        console.log(res);
        state.isLoading = false;
        state.internships = [...allInternships];
      })
      .addCase(unEnrollInternship.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
    build
      .addCase(getAllInternship.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllInternship.fulfilled, (state, {payload: {res}}) => {
        state.internships = res.data;

        state.isLoading = false;
        state.allInternshipsName = res.data.map((item, index) => {
          const {companyName} = item;
          return {value: companyName, label: companyName};
        });
      })
      .addCase(getAllInternship.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
    // create
    build
      .addCase(createInternship.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createInternship.fulfilled, (state, {payload: {res}}) => {
        state.internships = [...state.internships, res.data.internship];
        state.isLoading = false;
        state.isAddOpen = false;
        state.requestMessage = res.data.message;
        state.isMessageOpen = true;
      })
      .addCase(createInternship.rejected, (state, action) => {
        const {error, status} = action.payload;
        if (status === 400) {
          state.typeError = "Duplicate";
          state.isLoading = false;
          state.isMessageOpen = true;
          state.requestMessage = error.msg;
          state.isAddOpen = false;
        } else {
          state.isError = true;
        }
      });
    // update
    build
      .addCase(updateInternship.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateInternship.fulfilled, (state, {payload: {res}}) => {
        state.internships = [...res.data.allInternships];
        state.isLoading = false;
        state.isEditOpen = false;
        state.requestMessage = res.data.message;
        state.isMessageOpen = true;
      })
      .addCase(updateInternship.rejected, (state, action) => {
        const {error, status} = action.payload;

        console.log(status, error);

        if (status === 400) {
          state.typeError = "Duplicate";
          state.isLoading = false;
          state.isMessageOpen = true;
          state.requestMessage = error.msg;
          state.isAddOpen = false;
          state.isEditOpen = false;
        } else {
          state.isError = true;
        }
      });
    // delete
    build
      .addCase(deleteInternship.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteInternship.fulfilled, (state, {payload: {res}}) => {
        state.internships = [...res.data.allInternships];
        state.isLoading = false;
        state.isMessageOpen = true;
        state.requestMessage = res.data.message;
      })
      .addCase(deleteInternship.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const {handleEdit, handleView, handleDelete, handleAdd, handleMessage} =
  internshipReducer.actions;

export default internshipReducer.reducer;
