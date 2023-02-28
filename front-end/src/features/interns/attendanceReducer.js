import {createSlice, createAsyncThunk, current} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  isError: false,
  selectedAttendance: null,
  allAttendance: null,
  isTimeInOpen: false,
  isTimeOutOpen: false,
  isTodayOpen: false,
  address: "",
  location: "",
};

export const getAllAttendance = createAsyncThunk(
  "/attendance/getAllAttendance",
  async ({email}, {rejectWithValue}) => {
    try {
      const url = `http://localhost:5000/attendance/getAllAttendance/${email}`;
      const {data: res} = await axios.get(url);
      return {res};
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        error: error.response.data,
        status: error.response.status,
      });
    }
  }
);

export const timeInAttendance = createAsyncThunk(
  "/attendance/timeIn",
  async ({email, form}, {rejectWithValue}) => {
    // console.log(form);
    try {
      const url = `http://localhost:5000/attendance/timeIn/${email}`;
      const {data: res} = await axios.post(url, form);
      console.log(res);
      return {res};
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const timeOutAttendance = createAsyncThunk(
  "/attendance/timeOut",
  async () => {
    try {
    } catch (error) {}
  }
);

export const attendanceReducer = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    handleTimeIn: (state, action) => {
      state.isTimeInOpen = !state.isTimeInOpen;
    },
    handleTimeOut: (state, action) => {
      state.isTimeOutOpen = !state.isTimeOutOpen;
    },
    handleViewToday: (state, {payload: {id}}) => {
      state.isTodayOpen = !state.isTodayOpen;
      if (id) {
        state.selectedAttendance = current(state.allAttendance).filter(
          (attendance) => attendance._id === id
        )[0];
      }
    },
  },
  extraReducers: (builder) => {
    //   get all  attendances
    builder
      .addCase(getAllAttendance.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllAttendance.fulfilled, (state, {payload}) => {
        state.isLoading = false;
        console.log(payload.res.data);
        state.allAttendance = payload.res.data;
      })
      .addCase(getAllAttendance.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
    //   time in
    builder
      .addCase(timeInAttendance.pending, (state, action) => {
        // state.isLoading = true;
      })
      .addCase(timeInAttendance.fulfilled, (state, {payload}) => {
        state.isLoading = false;
        state.allAttendance = [...state.allAttendance, payload.res.data];
        state.isTimeInOpen = false;
      })
      .addCase(timeInAttendance.rejected, (state, action) => {
        state.isError = true;
      });
    //   timeout
    builder
      .addCase(timeOutAttendance.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(timeOutAttendance.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(timeOutAttendance.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const {handleTimeIn, handleTimeOut, handleViewToday} =
  attendanceReducer.actions;

export default attendanceReducer.reducer;
