import { apiClient } from "./apiClient";
import { API_ENDPOINTS } from "../constants/apiEndpoints";
import { ADMIN } from "../data/mockData";
import { STORAGE_KEYS } from "../constants/storageKeys";
import { storage } from "../utils/storage";

export const noticeService = {
  async getNotices() {
    try {
      return await apiClient.get(API_ENDPOINTS.NOTICES.BASE);
    } catch {
      return storage.get(STORAGE_KEYS.NOTICES, ADMIN.notices);
    }
  },

  async createNotice(notice) {
    try {
      return await apiClient.post(API_ENDPOINTS.NOTICES.BASE, notice);
    } catch {
      const current = storage.get(STORAGE_KEYS.NOTICES, ADMIN.notices);
      const newNotice = { id: Date.now(), ...notice };
      const updated = [newNotice, ...current];
      storage.set(STORAGE_KEYS.NOTICES, updated);
      return newNotice;
    }
  },

  async deleteNotice(id) {
    try {
      return await apiClient.delete(API_ENDPOINTS.NOTICES.BY_ID(id));
    } catch {
      const current = storage.get(STORAGE_KEYS.NOTICES, ADMIN.notices);
      const updated = current.filter((n) => n.id !== id);
      storage.set(STORAGE_KEYS.NOTICES, updated);
      return { success: true };
    }
  },
};
