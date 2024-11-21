import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { sendMessageAPI } from "../../api/chat-api";
import { getChatIdFromChats } from "../../utils/getChatId";
import Loading from "../Loading";
import { appendMessage } from "../../slice/messageSlice";

const interviewee = process.env.REACT_APP_INTERVIEWEE_ID;

export default function InputChat() {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state: RootState) => state.user);
  const { chats } = useSelector((state: RootState) => state.chat);

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSend = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    if (!selectedUser) return;

    try {
      const chatId = await getChatIdFromChats({
        chats: chats,
        user1Id: Number(interviewee),
        user2Id: selectedUser?.userId,
      });

      if (!chatId) return;

      const messageId = await sendMessageAPI({
        chatId: chatId,
        sinkId: Number(interviewee),
        destinationId: selectedUser?.userId,
        body: message,
      });

      dispatch(
        appendMessage({
          messageId,
          chatId,
          sinkId: Number(interviewee),
          destinationId: selectedUser?.userId,
          body: message,
          createdDateTime: Date.now(),
        })
      );
      setMessage("");
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSend} className="flex justify-between mt-2 gap-4">
        <input
          value={message}
          type="text"
          onChange={handleInput}
          disabled={!selectedUser}
          placeholder={
            selectedUser
              ? `Message to ${selectedUser?.name}`
              : "Please choose a user"
          }
          className="border border-gray-400 w-full rounded-md focus:border-blue-400 outline-none px-2"
        />
        <button className="" type="submit" disabled={!selectedUser || !message}>
          {loading ? (
            <div className="w-10 h-10 flex items-center">
              <Loading />
            </div>
          ) : (
            <PaperAirplaneIcon
              className={`w-10 ${
                !selectedUser || !message ? "text-gray-400" : "text-blue-500"
              }`}
            />
          )}
        </button>
      </form>
    </div>
  );
}
