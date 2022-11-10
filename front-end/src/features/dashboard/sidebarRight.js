import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  isProfileOpen: false,
  isNotificationOpen: false,
  isChatOpen: false,
  isAboutSystemOpen: false,
  isFeedbackOpen: false,
  isDarkMode: true,
};

export const sidebarRightReducer = createSlice({
  name: "sidebarRight",
  initialState: initialState,
  reducers: {
    handleProfile: (state, action) => {
      state.isProfileOpen = !state.isProfileOpen;
    },
    handleNotification: (state, action) => {
      state.isNotificationOpen = !state.isNotificationOpen;
    },
    handleChat: (state, action) => {
      state.isChatOpen = !state.isChatOpen;
    },
  },
  extraReducers: {},
});

export const {handleProfile, handleChat, handleNotification} =
  sidebarRightReducer.actions;

export default sidebarRightReducer.reducer;
