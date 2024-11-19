import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import UserList from "./components/user-list/user-list";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import InputChat from "./components/chat/input-chat";
import ChatBox from "./components/chat/chat-box";

export default function Chat() {
  return (
    <div className="border border-gray-200 rounded-2xl grid grid-cols-7 w-full overflow-hidden">
      <div className="col-span-2 border-r">
        <UserList />
      </div>
      <div className="col-span-5 p-3">
        <ChatBox />
        <InputChat />
      </div>
    </div>
  );
}
