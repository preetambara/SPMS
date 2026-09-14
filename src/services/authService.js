import { apiClient } from "./apiClient";
import { API_ENDPOINTS } from "../constants/apiEndpoints";
import { STORAGE_KEYS } from "../constants/storageKeys";
import { storage } from "../utils/storage";

const DEMO_CREDENTIALS = {
  student: { id: "STU2024001", password: "student123", name: "Aarav Sharma" },
  faculty: { id: "FAC2019002", password: "faculty123", name: "Dr. Rohan Mehta" },
  admin:   { id: "ADM2024001", password: "admin123",    name: "Kavita Rao" },
};

export const authService = {
  /**
   * Log in user with role, ID, and password.
   * Connects to backend /api/auth/login with local mock fallback.
   */
  async login(role, id, password) {
    try {
      const res = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, { role, id, password });
      if (res && res.token) {
        storage.set(STORAGE_KEYS.AUTH_TOKEN, res.token);
        storage.set(STORAGE_KEYS.AUTH_USER, res.user);
        return { ok: true, user: res.user };
      }
    } catch {
      // Fallback for offline / development demo mode without live backend
      const c = DEMO_CREDENTIALS[role];
      if (!c) return { ok: false, error: "Please select a valid role." };

      if (id.trim().toUpperCase() === c.id && password === c.password) {
        const user = { role, id: c.id, name: c.name, loginAt: new Date().toISOString() };
        storage.set(STORAGE_KEYS.AUTH_USER, user);
        storage.set(STORAGE_KEYS.AUTH_TOKEN, `mock_jwt_token_${user.id}`);
        return { ok: true, user };
      }
      return { ok: false, error: "Invalid ID or password. Use the demo credentials shown below." };
    }

    return { ok: false, error: "Invalid credentials." };
  },

  logout() {
    storage.remove(STORAGE_KEYS.AUTH_USER);
    storage.remove(STORAGE_KEYS.AUTH_TOKEN);
  },

  getCurrentUser() {
    return storage.get(STORAGE_KEYS.AUTH_USER, null);
  },

  getToken() {
    return storage.get(STORAGE_KEYS.AUTH_TOKEN, null);
  },

  isAuthenticated() {
    return !!this.getCurrentUser();
  },
};
