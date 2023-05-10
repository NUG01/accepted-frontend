import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notificationData: [],
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState: initialState,
  reducers: {
    setNotificationData(state, action) {
      state.notificationData = action.payload;
    },
  },
});

export const notificationActions = notificationSlice.actions;

export default notificationSlice.reducer;
