import {createSlice, createAsyncThunk, current} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  attendanceToday: null,
  isLoading: false,
  isError: false,
  isFilterOpen: false,
  isSortOpen: false,
  allInternship: null,
  isFiltering: false,
  filteredValues: null,
  selectedIntern: null,
  isViewMoreDetailsOpen: false,
};

export const getAllAttendanceToday = createAsyncThunk(
  "/monitor/getAllAttendanceToday",
  async ({}, {rejectWithValue}) => {
    try {
      const url = `http://localhost:5000/attendance/getAllAttendanceToday`;
      const {data: res} = await axios.get(url);
      console.log(res);
      return {res};
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllAttendanceByDate = createAsyncThunk(
  "/monitor/getAllAttendanceByDate",
  async ({date, renderedHours}, {rejectWithValue}) => {
    try {
      const params = {date};

      if (renderedHours) {
        params.renderedHours = renderedHours;
      }
      const {data: res} = await axios.get(
        "http://localhost:5000/attendance/getAllAttendanceByDate",
        {params}
      );
      return {res};
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const checkAbsents = createAsyncThunk(
  "/monitor/checkAbsents",
  async ({x}, {rejectWithValue}) => {
    console.log("Test");
    try {
      const url = `http://localhost:5000/attendance/checkAbsents`;
      const {data: res} = await axios.post(url);
      console.log(res);
      return {res};
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const monitorAttendance = createSlice({
  name: "monitorAttendance",
  initialState,
  reducers: {
    handleFilter: (state, action) => {
      state.isFilterOpen = !state.isFilterOpen;
    },
    handleSort: (state, action) => {
      state.isSortOpen = !state.isSortOpen;
    },
    handleSelectIntern: (state, {payload}) => {
      if (payload) {
        state.selectedIntern = payload;
      }
      state.isViewMoreDetailsOpen = true;
    },
    handleCloseModal: (state, action) => {
      state.isViewMoreDetailsOpen = !state.isViewMoreDetailsOpen;
    },
  },
  extraReducers: (builder) => {
    // get all  attendances today
    builder
      .addCase(getAllAttendanceToday.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllAttendanceToday.fulfilled, (state, {payload}) => {
        state.isLoading = false;
        state.attendanceToday = payload.res.data;
      })
      .addCase(getAllAttendanceToday.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
    // get all  attendances by search
    builder
      .addCase(getAllAttendanceByDate.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllAttendanceByDate.fulfilled, (state, {payload}) => {
        state.isLoading = false;
        state.attendanceToday = payload.res.data;
        state.isFilterOpen = false;
        state.isFiltering = true;
        state.filteredValues = payload.res.searched.filter((item) => item);
      })
      .addCase(getAllAttendanceByDate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
    // check abesent
    builder
      .addCase(checkAbsents.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(checkAbsents.fulfilled, (state, {payload}) => {
        state.isLoading = false;
        console.log(payload.res.data);
        state.attendanceToday = payload.res.data;
      })
      .addCase(checkAbsents.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const {handleFilter, handleSort, handleSelectIntern, handleCloseModal} =
  monitorAttendance.actions;

export default monitorAttendance.reducer;
