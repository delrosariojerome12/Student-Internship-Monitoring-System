import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const userReducer = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const {setUser} = userReducer.actions;

export default userReducer.reducer;
