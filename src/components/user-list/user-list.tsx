import React from "react";
import UserItem from "./user-item";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function UserList() {
  const interviewee = process.env.REACT_APP_INTERVIEWEE_ID;
  const { users } = useSelector((state: RootState) => state.user);

  return (
    <div className="relative flex flex-col bg-white">
      <nav className="flex min-w-[240px] flex-col gap-1 p-3">
        {users
          .filter((user) => user.userId !== Number(interviewee))
          .map((user, key) => (
            <UserItem user={user} key={key} />
          ))}
        {!users.length && (
          <div className="flex justify-center h-full items-center p-3">
            There is no users
          </div>
        )}
      </nav>
    </div>
  );
}
