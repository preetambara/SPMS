import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { NoticesProvider } from "./context/NoticesContext";
import { ToastHost } from "./components/Toast";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <AuthProvider>
      <NoticesProvider>
        <BrowserRouter>
          <AppRoutes />
          <ToastHost />
        </BrowserRouter>
      </NoticesProvider>
    </AuthProvider>
  );
}