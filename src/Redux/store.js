import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  support: null,
  token: null,
  place: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.support = action.payload.support;
      state.token = action.payload.token;
      state.place = action.payload.place;
    },
    setLogout: (state) => {
      state.support = null;
      state.token = null;
      state.place = null;
    },
    setCord: (state, action) => {
      state.support = action.payload.support;
    },
  },
});

export const { setMode, setLogin, setLogout, setCord } = authSlice.actions;
export default authSlice.reducer;
