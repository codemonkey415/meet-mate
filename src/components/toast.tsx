import { CheckIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

type IToast = {
  message: string;
  toastVisible: boolean;
};

export const SuccessToast = ({ message, toastVisible }: IToast) => (
  <div
    className={`
      data-testid-toast-success bg-brand-500 mb-2 flex h-auto items-center space-x-2 rounded-md bg-green-100 p-3 text-sm font-semibold text-black shadow-md rtl:space-x-reverse md:max-w-sm
      ${toastVisible ? "animate-fade-in-up" : ""}
    `}
  >
    <span>
      <CheckIcon />
    </span>
    <p>{message}</p>
  </div>
);

export const ErrorToast = ({ message, toastVisible }: IToast) => (
  <div
    className={`animate-fade-in-up mb-2 flex h-auto items-center space-x-2 rounded-md bg-red-100 p-3 text-sm font-semibold text-red-900 shadow-md rtl:space-x-reverse md:max-w-sm ${
      toastVisible ? "animate-fade-in-up" : ""
    }`}
  >
    <span>
      <InformationCircleIcon className="h-4 w-4" />
    </span>
    <p>{message}</p>
  </div>
);

export const WarningToast = ({ message, toastVisible }: IToast) => (
  <div
    className={`animate-fade-in-up bg-brand-500 mb-2 flex h-auto items-center space-x-2 rounded-md p-3 text-sm font-semibold bg-orange-100 text-orange-900 shadow-md rtl:space-x-reverse md:max-w-sm ${
      toastVisible ? "animate-fade-in-up" : ""
    }`}
  >
    <span>
      <InformationCircleIcon className="h-4 w-4" />
    </span>
    <p>{message}</p>
  </div>
);

export const DefaultToast = ({ message, toastVisible }: IToast) => (
  <div
    className={`animate-fade-in-up bg-brand-500 mb-2 flex h-auto items-center space-x-2 rounded-md p-3 text-sm font-semibold text-white shadow-md rtl:space-x-reverse md:max-w-sm ${
      toastVisible ? "animate-fade-in-up" : ""
    }`}
  >
    <span>
      <CheckIcon className="h-4 w-4" />
    </span>
    <p>{message}</p>
  </div>
);

const TOAST_VISIBLE_DURATION = 3000;

export function showToast(
  message: string,
  variant: "success" | "warning" | "error",
  duration = TOAST_VISIBLE_DURATION
) {
  switch (variant) {
    case "success":
      toast.custom(
        (t) => <SuccessToast message={message} toastVisible={t.visible} />,
        { duration }
      );
      break;
    case "error":
      toast.custom(
        (t) => <ErrorToast message={message} toastVisible={t.visible} />,
        { duration }
      );
      break;
    case "warning":
      toast.custom(
        (t) => <WarningToast message={message} toastVisible={t.visible} />,
        { duration }
      );
      break;
    default:
      toast.custom(
        (t) => <DefaultToast message={message} toastVisible={t.visible} />,
        { duration }
      );
      break;
  }
}
