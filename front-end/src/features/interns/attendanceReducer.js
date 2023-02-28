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

// const key = "UjTu7V2EcFJBTyd0zjudhuFrRNP4iWXJ";
//  const res = await axios.get("https://geolocation-db.com/json/");

// export const getLocation = createAsyncThunk(
//   "attendace/getLocation",
//   async ({latitude, longitude}, {rejectWithValue}) => {
//     try {
//       const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
//       const response = await axios.get(url);
//       console.log(response.data);
//       return {address: response.data};
//     } catch (error) {
//       console.log(error);
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

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
  async () => {
    try {
    } catch (error) {}
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
    handleViewToday: (state, action) => {},
  },
  extraReducers: (builder) => {
    //   get all  attendances
    builder
      .addCase(getAllAttendance.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllAttendance.fulfilled, (state, {payload}) => {
        state.isLoading = false;
        state.allAttendance = payload.res.data;
      })
      .addCase(getAllAttendance.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
    //   time in
    builder
      .addCase(timeInAttendance.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(timeInAttendance.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(timeInAttendance.rejected, (state, action) => {
        state.isLoading = false;
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
