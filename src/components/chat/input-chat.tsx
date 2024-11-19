import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function InputChat() {
  const { selectedUser } = useSelector((state: RootState) => state.user);

  const [message, setMessage] = useState<string>("");

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSend = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(message);
    setMessage("");
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
          <PaperAirplaneIcon
            className={`w-10 ${
              !selectedUser || !message ? "text-gray-400" : "text-blue-500"
            }`}
          />
        </button>
      </form>
    </div>
  );
}
