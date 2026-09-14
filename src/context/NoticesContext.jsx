/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import { noticeService } from "../services/noticeService";

const NoticesContext = createContext(null);

export function NoticesProvider({ children }) {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    noticeService.getNotices().then((data) => {
      if (Array.isArray(data)) setNotices(data);
    });
  }, []);

  const addNotice = async (n) => {
    const created = await noticeService.createNotice({ ...n, date: "Just now" });
    setNotices((prev) => [created, ...prev]);
  };

  const removeNotice = async (i) => {
    const target = notices[i];
    if (target && target.id) {
      await noticeService.deleteNotice(target.id);
    }
    setNotices((prev) => prev.filter((_, idx) => idx !== i));
  };

  return (
    <NoticesContext.Provider value={{ notices, addNotice, removeNotice }}>
      {children}
    </NoticesContext.Provider>
  );
}

export const useNotices = () => useContext(NoticesContext);
export default NoticesContext;