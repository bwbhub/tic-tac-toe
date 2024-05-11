import { createSlice } from "@reduxjs/toolkit";

export const authModalslice = createSlice({
  name: "AuthModal",
  initialState: {
    authModalOpen: false,
  },
  reducers: {
    setAuthModalOpen: (state, action) => {
      state.authModalOpen = action.payload;
    },
  },
});

export const { setAuthModalOpen } = authModalslice.actions;

export default authModalslice.reducer;
