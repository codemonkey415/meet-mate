import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { receiveMessagesAPI } from "../../api/chat-api";
import { getChatIdFromChats } from "../../utils/getChatId";
import { fetchMessages } from "../../slice/messageSlice";
import dayjs from "dayjs";

const interviewee = process.env.REACT_APP_INTERVIEWEE_ID;

export default function ChatBox() {
  const dispatch = useDispatch();
  const { selectedUser, users } = useSelector((state: RootState) => state.user);
  const { chats } = useSelector((state: RootState) => state.chat);
  const { messages } = useSelector((state: RootState) => state.message);

  useEffect(() => {
    const getMessages = async () => {
      if (!selectedUser) return;
      const chatId = await getChatIdFromChats({
        chats,
        user1Id: Number(interviewee),
        user2Id: selectedUser?.userId,
      });

      if (!chatId) return;

      const messages = await receiveMessagesAPI({ chatId, sinceId: 0 });
      dispatch(fetchMessages(messages));
    };

    getMessages();
  }, [selectedUser]);

  return (
    <div className="h-[600px] overflow-auto px-4">
      <div className="flex flex-col gap-4">
        {messages.map((message, key) => (
          <div
            key={key}
            className={`w-2/3 border border-gray-200 rounded-lg ${
              message.sinkId === Number(interviewee)
                ? "self-end rounded-br-none"
                : "self-start rounded-bl-none"
            }`}
          >
            <div className="p-3 flex flex-col">
              <p>{message.body}</p>
              <span className="self-end text-xs mt-2 text-gray-600">
                {dayjs(message.createdDateTime).format("DD/MM/YYYY HH:mm:ss")}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
