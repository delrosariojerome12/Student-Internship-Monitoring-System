import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  isProfileOpen: false,
  isNotificationOpen: false,
  isChatOpen: false,
  isAboutSystemOpen: false,
};

export const sidebarRightReducer = createSlice({
  name: "sidebarRight",
  initialState: initialState,
  reducers: {
    handleProfile: (state, action) => {
      state.isProfileOpen = !state.isProfileOpen;
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
