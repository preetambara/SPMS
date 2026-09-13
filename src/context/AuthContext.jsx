import { createContext, useContext, useState } from "react";

const CREDENTIALS = {
  student: { id: "STU2024001", password: "student123", name: "Aarav Sharma" },
  faculty: { id: "FAC2019002", password: "faculty123", name: "Dr. Rohan Mehta" },
  admin:   { id: "ADM2024001", password: "admin123",    name: "Kavita Rao" },
};

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("spms_user") || "null"); }
    catch { return null; }
  });

  const login = (role, id, password) => {
    const c = CREDENTIALS[role];
    if (!c) return { ok: false, error: "Please select a role." };
    if (id.trim().toUpperCase() === c.id && password === c.password) {
      const u = { role, id: c.id, name: c.name, loginAt: new Date().toISOString() };
      setUser(u);
      localStorage.setItem("spms_user", JSON.stringify(u));
      return { ok: true };
    }
    return { ok: false, error: "Invalid ID or password. Use the demo credentials shown below." };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("spms_user");
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);