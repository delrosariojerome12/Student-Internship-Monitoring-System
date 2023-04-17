import {createSlice, createAsyncThunk, current} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  isError: false,
  allNarrative: null,
  selected: null,
  isAddModalOpen: false,
  isEditModalOpen: false,
  isViewModalOpen: false,
  selectedDay: null,
  isGenerateOpen: false,
  generatingDocument: null,
  isNarrativeSampleOpen: false,
};

export const getAllNarrative = createAsyncThunk(
  "/narrative/getAllNarrative",
  async ({email}, {rejectWithValue}) => {
    try {
      const url = `https://sims-twqb.onrender.com/attendance/getAllNarrative/${email}`;
      // const url = `http://localhost:5000/attendance/getAllNarrative/${email}`;

      const {data: res} = await axios.get(url);
      console.log(res);
      return {res: res.data};
      // const
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        error: error.response.data,
        status: error.response.status,
      });
    }
  }
);

export const updateNarrative = createAsyncThunk(
  "/narrative/update",
  async ({date, content, email}, {rejectWithValue}) => {
    try {
      const url = `https://sims-twqb.onrender.com/attendance/updateNarrative/${email}`;
      const {data: res} = await axios.patch(url, {
        params: {date},
        data: {content},
      });
      console.log(res);
      return {res: res.allAttendance};
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        error: error.response.data,
        status: error.response.status,
      });
    }
  }
);

export const narrativeReducer = createSlice({
  name: "narrative",
  initialState,
  reducers: {
    handleNarrativeSample: (state, action) => {
      state.isNarrativeSampleOpen = !state.isNarrativeSampleOpen;
    },
    handleGenerate: (state, {payload}) => {
      if (payload) {
        state.generatingDocument = payload;
      }
      state.isGenerateOpen = !state.isGenerateOpen;
    },
    handleSelect: (state, action) => {
      state.selected = action.payload;
    },
    handleViewModal: (state, action) => {
      state.isViewModalOpen = !state.isViewModalOpen;
      state.selectedDay = null;
      if (action.payload) {
        console.log(action.payload);
        state.selectedDay = action.payload;
      }
    },
    handleEditModal: (state, action) => {
      state.isEditModalOpen = !state.isEditModalOpen;
      state.selectedDay = null;

      if (action.payload) {
        state.selectedDay = action.payload;
      }
    },
    handleAddModal: (state, action) => {
      state.isAddModalOpen = !state.isAddModalOpen;
      state.selectedDay = null;
      if (action.payload) {
        state.selectedDay = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllNarrative.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllNarrative.fulfilled, (state, {payload}) => {
        state.allNarrative = payload.res;
        state.isLoading = false;
      })
      .addCase(getAllNarrative.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
    // update narrative
    builder
      .addCase(updateNarrative.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateNarrative.fulfilled, (state, {payload}) => {
        state.isLoading = false;
        state.allNarrative = payload.res;
        state.isAddModalOpen = false;
        state.isEditModalOpen = false;
      })
      .addCase(updateNarrative.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const {
  handleSelect,
  handleAddModal,
  handleEditModal,
  handleViewModal,
  handleGenerate,
  handleNarrativeSample,
} = narrativeReducer.actions;

export default narrativeReducer.reducer;
