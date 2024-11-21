import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { getApptsAPI } from "../../api/appointment-api";
import { fetchAppointments } from "../../slice/appointmentSlice";
import AppointmentItem from "./appointment-item";
import Loading from "../Loading";

const interviewee = process.env.REACT_APP_INTERVIEWEE_ID;

export default function AppointmentList() {
  const dispatch = useDispatch();
  const { appts } = useSelector((state: RootState) => state.appt);
  const { users } = useSelector((state: RootState) => state.user);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getAppts = async () => {
      setLoading(true);
      try {
        const apptsRes = await getApptsAPI({ userId: Number(interviewee) });
        dispatch(fetchAppointments(apptsRes));
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    getAppts();
  }, []);

  return (
    <div className="relative flex flex-col bg-white">
      {!!appts.filter((appt) => !appt.deleteDateTime).length && (
        <div className="p-3">
          <div className="grid grid-cols-4 p-3">
            <span>Initiator</span>
            <span>Acceptor</span>
            <span>Appointment Date</span>
            <span className="text-left w-44 ml-auto">Action</span>
          </div>
          <nav className="flex w-full flex-col gap-1">
            {!loading &&
              appts
                .filter((appt) => !appt.deleteDateTime)
                .map((appt, key) => (
                  <AppointmentItem appt={appt} users={users} key={key} />
                ))}
            {loading && (
              <div className="w-full flex justify-center py-5">
                <Loading />
              </div>
            )}
          </nav>
        </div>
      )}
      {!loading && !appts.filter((appt) => !appt.deleteDateTime).length && (
        <div className="flex justify-center h-full items-center p-3">
          There is no appointments for you.
        </div>
      )}
    </div>
  );
}
