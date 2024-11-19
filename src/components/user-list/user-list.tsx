import React, { useEffect, useState } from "react";
import UserItem from "./user-item";
import { fetchUsers } from "../../api/user-api";
import { UserType } from "../../types/UserType";
import { useDispatch } from "react-redux";
import { getUsers } from "../../slice/userSlice";

export default function UserList() {
  const interviewee = process.env.REACT_APP_INTERVIEWEE_ID;
  const dispatch = useDispatch();
  const [userList, setUserList] = useState<UserType[]>([]);

  useEffect(() => {
    const fetchUserList = async () => {
      const users = await fetchUsers();
      dispatch(getUsers(users));
      setUserList(users);
    };

    fetchUserList();
  }, []);

  return (
    <div className="relative flex flex-col bg-white">
      <nav className="flex min-w-[240px] flex-col gap-1 p-3">
        {userList
          .filter((user) => user.userId !== Number(interviewee))
          .map((user, key) => (
            <UserItem user={user} key={key} />
          ))}
      </nav>
    </div>
  );
}
