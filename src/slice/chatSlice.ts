import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatType } from "../types/ChatType";

const initialState: { chats: ChatType[] } = {
  chats: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    fetchChats: (state, action: PayloadAction<ChatType[]>) => {
      state.chats = action.payload;
    },
  },
});

export const { fetchChats } = chatSlice.actions;
export default chatSlice.reducer;
