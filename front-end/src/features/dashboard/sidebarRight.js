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
  },
  extraReducers: {},
});

export const {handleProfile} = sidebarRightReducer.actions;

export default sidebarRightReducer.reducer;
