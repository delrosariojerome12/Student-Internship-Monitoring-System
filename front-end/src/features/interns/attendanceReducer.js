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
  isTimeInDisable: true,
  isTimeOutDisable: true,
  alreadyTimeIn: false,
  alreadyTimeOut: false,
};

export const getAllAttendance = createAsyncThunk(
  "/attendance/getAllAttendance",
  async ({email, scheduleDetails}, {rejectWithValue}) => {
    try {
      const url = `http://localhost:5000/attendance/getAllAttendance/${email}`;
      const {data: res} = await axios.get(url, {params: scheduleDetails});
      console.log(res);
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
    handleViewToday: (state, {payload}) => {
      state.isTodayOpen = !state.isTodayOpen;
      if (payload) {
        const {id} = payload;
        state.selectedAttendance = current(state.allAttendance).filter(
          (attendance) => attendance._id === id
        )[0];
      }
    },
    handleDisableTimeIn: (state, {payload}) => {
      state.isTimeInDisable = payload;
    },
    handleDisableTimeOut: (state, {payload}) => {
      state.isTimeOutDisable = payload;
    },
  },
  extraReducers: (builder) => {
    //   get all  attendances
    builder
      .addCase(getAllAttendance.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllAttendance.fulfilled, (state, {payload}) => {
        const {
          doesExists: {timeInExists, timeOutExists},
        } = payload.res;
        state.isLoading = false;
        state.allAttendance = payload.res.data;
        state.isTimeInDisable = timeInExists;
        state.isTimeOutDisable = timeOutExists;
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
        state.isTimeInDisable = true;
        state.alreadyTimeIn = true;
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
        state.isTimeOutDisable = true;
        state.alreadyTimeOut = true;
      })
      .addCase(timeOutAttendance.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const {
  handleTimeIn,
  handleTimeOut,
  handleViewToday,
  handleDisableTimeIn,
  handleDisableTimeOut,
} = attendanceReducer.actions;

export default attendanceReducer.reducer;
