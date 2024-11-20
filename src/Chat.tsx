import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserList from "./components/user-list/user-list";
import InputChat from "./components/chat/input-chat";
import ChatBox from "./components/chat/chat-box";
import { getChatsAPI } from "./api/chat-api";
import { fetchChats } from "./slice/chatSlice";
import { Button } from "@headlessui/react";
import { CalendarIcon } from "@heroicons/react/24/outline";
import AppointmentDialog from "./components/appointment/appointment-dialog";

const interviewee = process.env.REACT_APP_INTERVIEWEE_ID;

export default function Chat() {
  const dispatch = useDispatch();
  const [apptDlgOpen, setApptDlgOpen] = useState<boolean>(false);

  useEffect(() => {
    const getChats = async () => {
      const chats = await getChatsAPI({ userId: Number(interviewee) });
      dispatch(fetchChats(chats));
    };

    getChats();
  }, []);

  return (
    <div className="w-full space-y-4">
      <Button
        className="px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2 font-semibold"
        onClick={() => {
          setApptDlgOpen(true);
        }}
      >
        <CalendarIcon className="w-5" />
        Schedule Appointment
      </Button>

      <div className="border border-gray-200 rounded-2xl grid grid-cols-7 w-full overflow-hidden">
        <div className="col-span-2 border-r">
          <UserList />
        </div>
        <div className="col-span-5 p-3">
          <ChatBox />
          <InputChat />
        </div>
      </div>

      <AppointmentDialog open={apptDlgOpen} handler={setApptDlgOpen} />
    </div>
  );
}
