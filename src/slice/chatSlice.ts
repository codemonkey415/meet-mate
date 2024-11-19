import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatType } from "../types/ChatType";

const initialState = {
  chats: [
    {
      chatId: 0,
      sinkId: 0,
      destinationId: 0,
      body: "Hello World!",
    },
  ] as ChatType[],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addChat: (state, action: PayloadAction<ChatType>) => {
      state.chats.push(action.payload);
    },
  },
});

export const { addChat } = chatSlice.actions;
export default chatSlice.reducer;
