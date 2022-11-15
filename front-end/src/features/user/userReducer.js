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

export const getUserOnLoad = createAsyncThunk(
  "/user/getUserOnLoad",
  async (email, {rejectWithValue}) => {
    try {
      const url = `http://localhost:5000/interns/getIntern/${email}`;
      const {data: res} = await axios.get(url);
      return {res: res.user};
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

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
    // login
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
    // signup
    builder
      .addCase(handleSignup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(handleSignup.fulfilled, (state, action) => {
        const {res} = action.payload;
        console.log(res);
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
    // get user onload
    builder
      .addCase(getUserOnLoad.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getUserOnLoad.fulfilled, (state, action) => {
        const {res} = action.payload;
        state.isLoading = true;
        state.user = res;
      })
      .addCase(getUserOnLoad.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload.msg;
      });
  },
});

export const {setUser, handleLogout} = userReducer.actions;

export default userReducer.reducer;
