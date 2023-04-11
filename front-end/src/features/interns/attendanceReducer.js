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
  todayAttendance: null,
  allAttendanceToday: null,
  timeObject: null,
};

export const getAllAttendance = createAsyncThunk(
  "/attendance/getAllAttendance",
  async ({email, scheduleDetails}, {rejectWithValue}) => {
    try {
      const apiKey = "YWPMVZTIXVDO";
      const apiUrl = `https://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=zone&zone=Asia/Manila`;
      const response = await axios.get(apiUrl);

      const dateTime = response.data.formatted;
      const date = new Date(dateTime);

      const day = date.getDay();
      const hours = date.getHours() % 12 || 12;
      const minutes = date.getMinutes();
      const amOrPm = date.getHours() >= 12 ? "PM" : "AM";

      const month =
        date.getMonth() + 1 < 10
          ? `0${date.getMonth() + 1}`
          : date.getMonth() + 1;
      const dayDate =
        date.getDate() + 1 < 10 ? `0${date.getDate()}` : date.getDate();
      const year = date.getFullYear();
      const todayDate = `${month}-${dayDate}-${year}`;

      const timeObject = {
        day,
        hours,
        minutes,
        amOrPm,
        todayDate,
        dateTime,
      };

      console.log(timeObject);

      // const url = `http://localhost:5000/attendance/getAllAttendance/${email}`;

      const url = `https://sims-twqb.onrender.com/attendance/getAllAttendance/${email}`;

      const {data: res} = await axios.get(url, {
        params: {scheduleDetails, timeObject},
      });
      console.log(res);
      return {res, timeObject};
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
    const {
      user: {user},
    } = getState();
    try {
      const url = `https://sims-twqb.onrender.com/attendance/checkStartingDate/${email}`;
      // const url = `http://localhost:5000/attendance/checkStartingDate/${email}`;

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
      const url = `https://sims-twqb.onrender.com/attendance/timeIn/${email}`;
      // const url = `http://localhost:5000/attendance/timeIn/${email}`;
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
  async ({email, form}, {rejectWithValue}) => {
    try {
      const url = `https://sims-twqb.onrender.com/attendance/timeOut/${email}`;
      // const url = `http://localhost:5000/attendance/timeOut/${email}`;

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
      state.isTimeInDisable = payload;
    },
    handleDisableTimeOut: (state, {payload}) => {
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
          doesExists: {status},
          todayAttendance,
        } = payload.res;
        state.isLoading = false;
        state.allAttendance = payload.res.data;
        state.timeObject = payload.timeObject;

        console.log(payload.res.doesExists);

        switch (status) {
          case "no-time-in":
            state.isTimeInDisable = false;
            state.isTimeOutDisable = true;
            break;
          case "already-time-in":
            state.isTimeInDisable = true;
            state.isTimeOutDisable = true;
            break;
          case "no-time-in-lunch":
            state.isTimeInDisable = true;
            state.isTimeOutDisable = true;
            break;
          case "already-timed-in-lunch":
            state.isTimeInDisable = true;
            state.isTimeOutDisable = false;
            break;
          case "complete":
            state.isTimeInDisable = true;
            state.isTimeOutDisable = true;
            break;
          case "no-time-in-afternoon":
            state.isTimeInDisable = true;
            state.isTimeOutDisable = true;
            break;
          case "time-out-standard":
            state.isTimeInDisable = true;
            state.isTimeOutDisable = false;
            break;
          case "time-out-overtime":
            state.isTimeInDisable = true;
            state.isTimeOutDisable = false;
            break;
          case "absent":
            state.isTimeInDisable = true;
            state.isTimeOutDisable = true;
            break;
          case "no-schedule":
            state.isTimeInDisable = true;
            state.isTimeOutDisable = true;
            break;
          case "too-late":
            state.isTimeInDisable = true;
            state.isTimeOutDisable = true;
            break;
          default:
            break;
        }

        if (todayAttendance) {
          state.todayAttendance = todayAttendance;
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
        console.log(payload.res);
        state.isLoading = false;
        state.allAttendance = payload.res.updatedAttendance;
        state.isTimeOutOpen = false;
        state.isTimeOutDisable = true;
        state.todayAttendance = payload.res.todayAttendance;
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
