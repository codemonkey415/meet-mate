import React from "react";
import AppointmentList from "./components/appointment/appointment-list";

export default function Appointment() {
  return (
    <div className="border border-gray-200 p-3 rounded-2xl w-full min-w-min">
      <AppointmentList />
    </div>
  );
}
