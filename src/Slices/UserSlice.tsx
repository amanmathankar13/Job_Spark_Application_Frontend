import { createSlice } from "@reduxjs/toolkit";
import { getItem, removeItem, setItem } from "../services/LocalStorageService";

const initialState = getItem("user") || null;

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const user = action.payload;
      setItem("user", user);
      localStorage.setItem("accountType", user.accountType);
      return user;
    },
    removeUser: () => {
      removeItem("user");
      localStorage.removeItem("accountType");
      return null;
    },
  },
});

export const { setUser, removeUser } = UserSlice.actions;
export default UserSlice.reducer;
