import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types/user.types";

interface AuthSliceState {
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: AuthSliceState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    userLoggedIn: (state, action: PayloadAction<{ user: User }>) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    userLoggedOut: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
