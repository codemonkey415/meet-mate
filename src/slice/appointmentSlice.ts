import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppointmentType } from "../types/AppointmentType";
import { acceptApptParams, deleteApptParams } from "../api/params";

const initialState: {
  appts: AppointmentType[];
  selectedAppt: AppointmentType | undefined;
} = {
  appts: [],
  selectedAppt: undefined,
};

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    fetchAppointments: (state, action: PayloadAction<AppointmentType[]>) => {
      state.appts = action.payload;
    },
    appendAppt: (state, action: PayloadAction<AppointmentType>) => {
      state.appts.push(action.payload);
    },
    selectAppt: (state, action: PayloadAction<AppointmentType>) => {
      state.selectedAppt = action.payload;
    },
    acceptAppt: (state, action: PayloadAction<acceptApptParams>) => {
      let index = state.appts.findIndex(
        (appt) => appt.appointmentId === action.payload.appointmentId
      );
      state.appts[index].acceptDateTime = Date.now();
    },
    deleteAppt: (state, action: PayloadAction<deleteApptParams>) => {
      let index = state.appts.findIndex(
        (appt) => appt.appointmentId === action.payload.appointmentId
      );
      state.appts[index].deleteDateTime = Date.now();
      state.appts[index].deleteMessage = action.payload.deleteMessage;
    },
  },
});

export const {
  fetchAppointments,
  selectAppt,
  acceptAppt,
  appendAppt,
  deleteAppt,
} = appointmentSlice.actions;
export default appointmentSlice.reducer;
