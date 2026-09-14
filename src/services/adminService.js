import { apiClient } from "./apiClient";
import { API_ENDPOINTS } from "../constants/apiEndpoints";
import { ADMIN } from "../data/mockData";

export const adminService = {
  async getDashboard() {
    try {
      return await apiClient.get(API_ENDPOINTS.ADMIN.DASHBOARD);
    } catch {
      return ADMIN;
    }
  },

  async getStudents() {
    try {
      return await apiClient.get(API_ENDPOINTS.ADMIN.STUDENTS);
    } catch {
      return ADMIN.students;
    }
  },

  async getFaculty() {
    try {
      return await apiClient.get(API_ENDPOINTS.ADMIN.FACULTY);
    } catch {
      return ADMIN.faculty;
    }
  },

  async getSubjects() {
    try {
      return await apiClient.get(API_ENDPOINTS.ADMIN.SUBJECTS);
    } catch {
      return ADMIN.subjects;
    }
  },
};
