import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "admin",
  initialState: {
    authUser: null,
  },
  reducers: {
    setAdmin: (state, action) => {
      state.authUser = action.payload;
    },
  },
});

export const { setAdmin } = authSlice.actions;
export default authSlice.reducer;
