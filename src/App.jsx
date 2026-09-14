import { HashRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { NoticesProvider } from "./context/NoticesContext";
import { ToastHost } from "./components/Toast";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <AuthProvider>
      <NoticesProvider>
        <HashRouter>
          <AppRoutes />
          <ToastHost />
        </HashRouter>
      </NoticesProvider>
    </AuthProvider>
  );
}