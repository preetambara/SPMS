/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
import Icon from "./Icon";
import { showToast } from "../utils/toast";

export { showToast };

export function ToastHost() {
  const [toasts, setToasts] = useState([]);
  useEffect(() => {
    const h = (e) => {
      const t = { ...e.detail, id: Date.now() + Math.random() };
      setToasts((p) => [...p, t]);
      setTimeout(() => setToasts((p) => p.filter((x) => x.id !== t.id)), 3200);
    };
    window.addEventListener("spms-toast", h);
    return () => window.removeEventListener("spms-toast", h);
  }, []);
  return (
    <div className="toast-host">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.type}`}>
          <Icon name={t.type === "info" ? "info" : "check-circle"} size={17} />
          {t.message}
        </div>
      ))}
    </div>
  );
}

export default ToastHost;