import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../types/UserType";

const initialState: {
  users: UserType[];
  selectedUser: UserType | undefined;
} = {
  users: [],
  selectedUser: undefined,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    getUsers: (state, action: PayloadAction<UserType[]>) => {
      state.users = action.payload;
    },
    selectUser: (state, action: PayloadAction<UserType>) => {
      state.selectedUser = action.payload;
    },
  },
});

export const { getUsers, selectUser } = chatSlice.actions;
export default chatSlice.reducer;
