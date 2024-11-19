import { configureStore } from "@reduxjs/toolkit";
import chatSlice from "./slice/chatSlice";
import userSlice from "./slice/userSlice";

const store = configureStore({
  reducer: {
    chat: chatSlice,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
