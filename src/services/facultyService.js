import { apiClient } from "./apiClient";
import { API_ENDPOINTS } from "../constants/apiEndpoints";
import {
  FACULTY,
  FACULTY_CLASSES,
  FACULTY_SUBJECTS,
  FACULTY_ACTIVITY,
  FACULTY_DEADLINES,
  FACULTY_STUDENTS,
  FACULTY_ASSIGNMENTS,
  FACULTY_EXAMS,
  FACULTY_PAST_EXAMS,
  CLASS_PERF,
} from "../data/mockData";

export const facultyService = {
  async getProfile() {
    try {
      return await apiClient.get(API_ENDPOINTS.FACULTY.PROFILE);
    } catch {
      return FACULTY;
    }
  },

  async getDashboard() {
    try {
      return await apiClient.get(API_ENDPOINTS.FACULTY.DASHBOARD);
    } catch {
      return {
        classes: FACULTY_CLASSES,
        subjects: FACULTY_SUBJECTS,
        activity: FACULTY_ACTIVITY,
        deadlines: FACULTY_DEADLINES,
        performance: CLASS_PERF,
      };
    }
  },

  async getSubjects() {
    try {
      return await apiClient.get(API_ENDPOINTS.FACULTY.SUBJECTS);
    } catch {
      return FACULTY_SUBJECTS;
    }
  },

  async getStudents() {
    try {
      return await apiClient.get(API_ENDPOINTS.FACULTY.STUDENTS);
    } catch {
      return FACULTY_STUDENTS;
    }
  },

  async getAssignments() {
    try {
      return await apiClient.get(API_ENDPOINTS.FACULTY.ASSIGNMENTS);
    } catch {
      return FACULTY_ASSIGNMENTS;
    }
  },

  async getExaminations() {
    try {
      return await apiClient.get(API_ENDPOINTS.FACULTY.EXAMINATIONS);
    } catch {
      return { current: FACULTY_EXAMS, past: FACULTY_PAST_EXAMS };
    }
  },

  async getPerformance() {
    try {
      return await apiClient.get(API_ENDPOINTS.FACULTY.PERFORMANCE);
    } catch {
      return CLASS_PERF;
    }
  },
};
