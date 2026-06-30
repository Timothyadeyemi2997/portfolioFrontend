import { createContext } from "react";
import toast from "react-hot-toast";

export const NotificationContext =
  createContext();

export default function NotificationProvider({
  children,
}) {
  const success = (message) =>
    toast.success(message);

  const error = (message) =>
    toast.error(message);

  return (
    <NotificationContext.Provider
      value={{
        success,
        error,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}