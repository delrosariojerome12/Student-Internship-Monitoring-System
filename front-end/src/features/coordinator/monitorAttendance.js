import {createSlice, createAsyncThunk, current} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {attendanceToday: null, isLoading: false, isError: false};

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

export const monitorAttendance = createSlice({
  name: "monitorAttendance",
  initialState,
  reducers: {},
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
  },
});

export const {} = monitorAttendance.actions;

export default monitorAttendance.reducer;
