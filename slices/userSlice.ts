import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface User {
  name: string;
  email: string;
  avatar: {
    public_id: string;
    secure_url: string;
  };
  isLoggedInWithGoogle: Boolean;
  role: string;
  _id: string;
  createdAt: string;
}

const initialState: { user: User | null; isLoggedIn: Boolean } = {
  user: null,
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.user;
export const selectIsLoggedIn = (state: RootState) => state.user.isLoggedIn;

export default userSlice.reducer;
