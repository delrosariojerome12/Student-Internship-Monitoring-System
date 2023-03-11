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
  canStart: false,
  todayAttendanceID: null,
  allAttendanceToday: null,
};

export const getAllAttendance = createAsyncThunk(
  "/attendance/getAllAttendance",
  async ({email, scheduleDetails}, {rejectWithValue}) => {
    try {
      const url = `http://localhost:5000/attendance/getAllAttendance/${email}`;
      const {data: res} = await axios.get(url, {
        params: {scheduleDetails},
      });
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
export const checkStartingDate = createAsyncThunk(
  "/attendance/checkStartingDate",
  async ({email}, {rejectWithValue, getState}) => {
    console.log("updated user");
    const {
      user: {user},
    } = getState();
    try {
      const url = `http://localhost:5000/attendance/checkStartingDate/${email}`;
      const {data: res} = await axios.patch(url, {...user, status: "Starting"});
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
  async ({email, form, id}, {rejectWithValue}) => {
    console.log(id);
    try {
      const url = `http://localhost:5000/attendance/timeOut/${email}/${id}`;
      const {data: res} = await axios.patch(url, form);
      console.log(res);
      return {res};
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const attendanceReducer = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    handleTest: (state, action) => {
      console.log("Test");
    },
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
      console.log("disableTimeIn");
      state.isTimeInDisable = payload;
    },
    handleDisableTimeOut: (state, {payload}) => {
      console.log("disableTimeOut");

      state.isTimeOutDisable = payload;
    },
    handleCheckDate: (state, {payload}) => {
      const date = new Date();
      const day =
        date.getDate() + 1 < 10 ? `0${date.getDate()}` : date.getDate();
      const month =
        date.getMonth() + 1 < 10
          ? `0${date.getMonth() + 1}`
          : date.getMonth() + 1;
      const year = date.getFullYear();

      const today = `${year}-${month}-${day}`;

      if (payload === today) {
        state.canStart = true;
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
        const {
          doesExists: {timeInExists, timeOutExists},
          todayAttendance,
        } = payload.res;
        state.isLoading = false;
        state.allAttendance = payload.res.data;
        state.isTimeInDisable = timeInExists;
        state.isTimeOutDisable = timeOutExists;
        if (todayAttendance) {
          state.todayAttendanceID = todayAttendance._id;
        }
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
        // state.isLoading = true;
      })
      .addCase(timeOutAttendance.fulfilled, (state, {payload}) => {
        state.isLoading = false;
        state.allAttendance = [...state.allAttendance];
        state.isTimeOutOpen = false;
        state.isTimeOutDisable = true;
        state.alreadyTimeOut = true;
      })
      .addCase(timeOutAttendance.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
    // check starting date
    builder
      .addCase(checkStartingDate.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(checkStartingDate.fulfilled, (state, {payload}) => {
        state.isLoading = false;
        state.canStart = true;
      })
      .addCase(checkStartingDate.rejected, (state, action) => {
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
  handleCheckDate,
  handleTest,
} = attendanceReducer.actions;

export default attendanceReducer.reducer;
