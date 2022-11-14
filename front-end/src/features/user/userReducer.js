import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  isLoading: false,
  isError: false,
  errorMessage: "",
};

const convertForm = (form) => {
  const newData = form.map((input) => {
    const {code, value} = input;
    return {
      code,
      value,
    };
  });

  const newObject = Object.assign(
    {},
    ...newData.map((item) => ({[item.code]: item.value}))
  );

  return newObject;
};

export const handleLogin = createAsyncThunk(
  "/user/logUser",
  async (form, {rejectWithValue}) => {
    try {
      const url = "http://localhost:5000/auth/login";
      const {data: res} = await axios.post(url, convertForm(form));
      return {res};
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const handleSignup = createAsyncThunk(
  "/user/signUser",
  async (form, {rejectWithValue}) => {
    try {
      const url = "http://localhost:5000/auth/signup";
      const {data: res} = await axios.post(url, convertForm(form));
      return {res};
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const userReducer = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    handleLogout: (state, action) => {
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(handleLogin.fulfilled, (state, action) => {
        const {res} = action.payload;
        console.log(res);
        state.isLoading = false;
        state.isError = false;
        state.user = res.user;
        localStorage.setItem("token", res.token);
      })
      .addCase(handleLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload.msg;
      });
    builder
      .addCase(handleSignup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(handleSignup.fulfilled, (state, action) => {
        const {res} = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.user = res.user;
        localStorage.setItem("token", res.token);
      })
      .addCase(handleSignup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload.msg;
      });
  },
});

export const {setUser, handleLogout} = userReducer.actions;

export default userReducer.reducer;
