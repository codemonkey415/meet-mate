import React, { memo } from "react";
import { AppointmentType } from "../../types/AppointmentType";
import { UserType } from "../../types/UserType";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { acceptApptAPI, deleteApptAPI } from "../../api/appointment-api";
import { acceptAppt, deleteAppt } from "../../slice/appointmentSlice";
import { showToast } from "../toast";
const AppointmentItem = memo(
  ({ appt, users }: { appt: AppointmentType; users: UserType[] }) => {
    const dispatch = useDispatch();

    const handleAccept = async () => {
      try {
        const res = await acceptApptAPI({ appointmentId: appt.appointmentId });

        dispatch(acceptAppt({ appointmentId: appt.appointmentId }));
        showToast(res.message, "success");
      } catch (err: any) {
        if (err.response) {
          showToast(err.response.data, "error");
        } else {
          showToast(err.message, "error");
        }
      }
    };

    const handleDelete = async () => {
      const res = await deleteApptAPI({
        appointmentId: appt.appointmentId,
        deleteMessage: "Removed",
      });

      dispatch(
        deleteAppt({
          appointmentId: appt.appointmentId,
          deleteMessage: "Removed",
        })
      );

      showToast(res.message, "success");
    };

    return (
      <div
        role="button"
        className={`text-slate-800 grid grid-cols-4 w-full items-center shadow-sm p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 border border-gray-200 rounded-lg`}
      >
        <span>
          {users.find((user) => user.userId === appt.initiatorUserId)?.name}
        </span>
        <span>
          {users.find((user) => user.userId === appt.acceptorUserId)?.name}
        </span>
        <div>
          <p>{dayjs(appt.appointmentDateTime).format("DD/MM/YYYY")}</p>
          <p className="text-sm">
            {dayjs(appt.appointmentDateTime).format("hh:mm:ss A")}
          </p>
        </div>
        <div className="flex gap-2 items-center justify-end w-44 ml-auto">
          <button
            className="bg-white hover:bg-green-500 text-green-500 hover:text-white transition-all border border-green-200 hover:border-green-600 rounded-lg px-3 py-1"
            disabled={!!appt.acceptDateTime}
            onClick={handleAccept}
          >
            {appt.acceptDateTime ? "Accepted" : "Accept"}
          </button>
          <button
            className="bg-white hover:bg-red-500 text-red-500 hover:text-white transition-all border border-red-200 hover:border-red-600 rounded-lg px-3 py-1"
            onClick={handleDelete}
          >
            Remove
          </button>
        </div>
      </div>
    );
  }
);

export default AppointmentItem;
