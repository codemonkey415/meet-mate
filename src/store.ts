import { configureStore } from "@reduxjs/toolkit";
import chatSlice from "./slice/chatSlice";
import userSlice from "./slice/userSlice";
import messageSlice from "./slice/messageSlice";
import appointmentSlice from "./slice/appointmentSlice";

const store = configureStore({
  reducer: {
    chat: chatSlice,
    user: userSlice,
    message: messageSlice,
    appt: appointmentSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
