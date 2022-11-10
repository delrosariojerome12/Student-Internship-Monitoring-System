import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  isSidebarOpen: false,
};

export const dashboardReducer = createSlice({
  name: "dashboard",
  initialState: initialState,
  reducers: {
    handleSidebar: (state, action) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
  extraReducers: {},
});
export const {handleSidebar, closeSidbar} = dashboardReducer.actions;

export default dashboardReducer.reducer;
