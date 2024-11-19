import React, { memo } from "react";
import { UserType } from "../../types/UserType";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../slice/userSlice";
import { RootState } from "../../store";

// Use memo to prevent unnecessary re-renders if the user prop doesn't change.
const UserItem = memo(({ user }: { user: UserType }) => {
  const dispatch = useDispatch();

  const { selectedUser } = useSelector((state: RootState) => state.user);

  const selectUserToSendMessage = () => dispatch(selectUser(user));

  return (
    <div
      role="button"
      className={`text-slate-800 flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 ${
        selectedUser?.userId === user.userId ? "bg-slate-100" : ""
      }`}
      onClick={selectUserToSendMessage}
    >
      {user.name}
    </div>
  );
});

export default UserItem;
