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

export const fetchUser = createAsyncThunk(
  "/user/getUser",
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

export const userReducer = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    // login
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        const {res} = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.user = res.user;
        localStorage.setItem("token", res.token);
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload.msg;
      });
  },
});

export const {setUser} = userReducer.actions;

export default userReducer.reducer;
