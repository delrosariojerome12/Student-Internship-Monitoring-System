import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  isProfileOpen: false,
  isNotificationOpen: false,
  isChatOpen: false,
  isAboutSystemOpen: false,
};

export const sidebarRightReducer = createSlice({
  name: "sidebarRight",
  initialState,
  reducers: {
    handleProfile: (state, action) => {
      console.log("Test");
      state.isProfileOpen = !state.isProfileOpen;
      // state.isProfileOpen = action.payload;
      state.isNotificationOpen = false;
      state.isChatOpen = false;
    },
    handleNotification: (state, action) => {
      state.isNotificationOpen = !state.isNotificationOpen;
      state.isProfileOpen = false;
      state.isChatOpen = false;
    },
    handleChat: (state, action) => {
      state.isChatOpen = !state.isChatOpen;
      state.isProfileOpen = false;
      state.isNotificationOpen = false;
    },
  },
  extraReducers: (builder) => {},
});

export const {handleProfile, handleChat, handleNotification} =
  sidebarRightReducer.actions;

export default sidebarRightReducer.reducer;
