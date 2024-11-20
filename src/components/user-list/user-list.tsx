import React, { useEffect, useState } from "react";
import UserItem from "./user-item";
import { fetchUsers } from "../../api/user-api";
import { UserType } from "../../types/UserType";
import { useDispatch } from "react-redux";
import { getUsers } from "../../slice/userSlice";
import { SkeletonText } from "../skeleton";

export default function UserList() {
  const interviewee = process.env.REACT_APP_INTERVIEWEE_ID;
  const dispatch = useDispatch();
  const [userList, setUserList] = useState<UserType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserList = async () => {
      setLoading(true);
      const users = await fetchUsers();
      dispatch(getUsers(users));
      setUserList(users);
      setLoading(false);
    };

    fetchUserList();
  }, []);

  return (
    <div className="relative flex flex-col bg-white">
      <nav className="flex min-w-[240px] flex-col gap-1 p-3">
        {!loading &&
          !!userList.length &&
          userList
            .filter((user) => user.userId !== Number(interviewee))
            .map((user, key) => <UserItem user={user} key={key} />)}
        {loading &&
          Array(12)
            .fill(null)
            .map((_, key) => <SkeletonText className="h-12" key={key} />)}
        {!loading && !userList.length && (
          <div className="flex justify-center h-full items-center p-3">
            There is no users
          </div>
        )}
      </nav>
    </div>
  );
}
