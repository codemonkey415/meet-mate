import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MessageType } from "../types/MessageType";

const initialState: { messages: MessageType[] } = {
  messages: [],
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    fetchMessages: (state, action: PayloadAction<MessageType[]>) => {
      state.messages = action.payload;
    },
    appendMessage: (state, action: PayloadAction<MessageType>) => {
      state.messages.push(action.payload);
    },
  },
});

export const { fetchMessages, appendMessage } = messageSlice.actions;
export default messageSlice.reducer;
