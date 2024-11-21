import React, { FormEvent, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Field,
  Input,
  Label,
  Select,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { getChatIdFromChats } from "../../utils/getChatId";
import { createApptParams } from "../../api/params";
import { createApptAPI } from "../../api/appointment-api";
import { appendAppt } from "../../slice/appointmentSlice";
import Loading from "../Loading";
import { showToast } from "../toast";

const interviewee = process.env.REACT_APP_INTERVIEWEE_ID;

interface DialogBaseProps {
  open: boolean;
  handler: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppointmentDialog: React.FC<DialogBaseProps> = ({ open, handler }) => {
  const dispatch = useDispatch();

  const { users } = useSelector((state: RootState) => state.user);
  const { chats } = useSelector((state: RootState) => state.chat);

  const [user, setUser] = useState<number>(2);
  const [date, setDate] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    try {
      const chatId = await getChatIdFromChats({
        chats,
        user1Id: Number(interviewee),
        user2Id: user,
      });

      if (!chatId) return;

      const body: createApptParams = {
        chatId,
        initiatorUserId: Number(interviewee),
        acceptorUserId: user,
        appointmentDateTime: date,
      };

      const apptRes = await createApptAPI(body);
      console.log(apptRes);

      dispatch(appendAppt({ ...body, appointmentId: apptRes.appointmentId }));
      handler(false);
      showToast(apptRes.message, "success");
      setLoading(false);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };
  return (
    <Dialog open={open} onClose={handler} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <form
          className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
          onSubmit={handleSubmit}
        >
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h2"
                    className="text-lg font-semibold text-gray-900 mb-5 border-b pb-2"
                  >
                    Schedule Appointment
                  </DialogTitle>
                  <div className="space-y-4">
                    <Field className="grid grid-cols-2 gap-4 items-center">
                      <Label className="">User: </Label>
                      <Select
                        value={user}
                        className="block w-full rounded-lg bg-white/5 py-1.5 px-3  border border-gray-200"
                        onChange={(e) => {
                          const selectedUserId = Number(e.target.value);
                          setUser(selectedUserId);
                        }}
                      >
                        {users
                          .filter((user) => user.userId !== Number(interviewee))
                          .map((user, key) => (
                            <option value={user.userId} key={key}>
                              {user.name}
                            </option>
                          ))}
                      </Select>
                    </Field>
                    <Field className="grid grid-cols-2 gap-4 items-center">
                      <Label className="">Interview Date: </Label>
                      <Input
                        type="datetime-local"
                        onChange={(e) => {
                          const dateTime = e.target.value;
                          setDate(dateTime);
                        }}
                        className="block w-full rounded-lg bg-white/5 py-1.5 px-3  border border-gray-200"
                      />
                    </Field>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 border-t mt-5">
              <button
                type="submit"
                disabled={date === ""}
                className="disabled:bg-gray-500 inline-flex w-full min-w-16 justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                {loading ? <Loading /> : "Ok"}
              </button>
              <button
                type="button"
                data-autofocus
                onClick={() => handler(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </form>
      </div>
    </Dialog>
  );
};

export default AppointmentDialog;
