import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserList from "./components/user-list/user-list";
import InputChat from "./components/chat/input-chat";
import ChatBox from "./components/chat/chat-box";
import { getChatsAPI } from "./api/chat-api";
import { fetchChats } from "./slice/chatSlice";
import { Button, Dialog, DialogPanel } from "@headlessui/react";
import { ArrowLeftIcon, CalendarIcon } from "@heroicons/react/24/outline";
import AppointmentDialog from "./components/appointment/appointment-dialog";
import { RootState } from "./store";

const interviewee = process.env.REACT_APP_INTERVIEWEE_ID;

export default function Chat() {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state: RootState) => state.user);

  const [apptDlgOpen, setApptDlgOpen] = useState<boolean>(false);
  const [openUserList, setOpenUserList] = useState<boolean>(false);

  useEffect(() => {
    const getChats = async () => {
      try {
        const chats = await getChatsAPI({ userId: Number(interviewee) });
        dispatch(fetchChats(chats));
      } catch (err) {
        console.log(err);
      }
    };

    getChats();
  }, []);

  useEffect(() => {
    setOpenUserList(false);
  }, [selectedUser]);

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

      <div className="flex justify-start items-center gap-4 md:hidden">
        <ArrowLeftIcon
          className="w-8 border p-2 rounded-full"
          onClick={() => setOpenUserList(true)}
        />
        <span>{selectedUser?.name}</span>
      </div>
      <div className="border border-gray-200 rounded-2xl grid grid-cols-7 w-full overflow-hidden">
        <div className="md:col-span-2 border-r hidden md:block">
          <UserList />
        </div>
        <div className="md:col-span-5 col-span-7 p-3">
          <ChatBox />
          <InputChat />
        </div>
      </div>

      <AppointmentDialog open={apptDlgOpen} handler={setApptDlgOpen} />

      <Dialog
        open={openUserList}
        onClose={setOpenUserList}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 left-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <UserList />
          </div>
        </DialogPanel>
      </Dialog>
    </div>
  );
}
