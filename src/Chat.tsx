import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserList from "./components/user-list/user-list";
import InputChat from "./components/chat/input-chat";
import ChatBox from "./components/chat/chat-box";
import { getChatsAPI } from "./api/chat-api";
import { fetchChats } from "./slice/chatSlice";

const interviewee = process.env.REACT_APP_INTERVIEWEE_ID;

export default function Chat() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getChats = async () => {
      const chats = await getChatsAPI({ userId: Number(interviewee) });
      dispatch(fetchChats(chats));
    };

    getChats();
  }, []);
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
