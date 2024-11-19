import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function ChatBox() {
  const { selectedUser, users } = useSelector((state: RootState) => state.user);
  return <div className="bg-slate-200 min-h-[500px] overflow-auto"></div>;
}
