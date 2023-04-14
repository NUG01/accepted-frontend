import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  test: null,
};

const generalTestSlice = createSlice({
  name: "general",
  initialState: initialState,
  reducers: {
    setTest(state, action) {
      state.user = action.payload;
    },
  },
});

export const generalTestActions = generalTestSlice.actions;

export default generalTestSlice.reducer;
