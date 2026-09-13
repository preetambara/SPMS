import { createContext, useContext, useState } from "react";
import { ADMIN } from "../data/mockData";

const NoticesContext = createContext(null);

export function NoticesProvider({ children }) {
  const [notices, setNotices] = useState(ADMIN.notices);

  const addNotice = (n) =>
    setNotices((l) => [{ ...n, date: "Just now" }, ...l]);

  const removeNotice = (i) =>
    setNotices((l) => l.filter((_, x) => x !== i));

  return (
    <NoticesContext.Provider value={{ notices, addNotice, removeNotice }}>
      {children}
    </NoticesContext.Provider>
  );
}

export const useNotices = () => useContext(NoticesContext);