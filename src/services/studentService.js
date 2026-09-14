import { apiClient } from "./apiClient";
import { API_ENDPOINTS } from "../constants/apiEndpoints";
import {
  STUDENT,
  STUDENT_SUBJECTS,
  ATTENDANCE,
  STUDENT_ASSIGNMENTS,
  UPCOMING_EXAMS,
  PAST_EXAMS,
  RESULTS,
  PERF_TREND,
  TODAY_CLASSES,
  DEADLINES,
} from "../data/mockData";

export const studentService = {
  async getProfile() {
    try {
      return await apiClient.get(API_ENDPOINTS.STUDENT.PROFILE);
    } catch {
      return STUDENT;
    }
  },

  async getDashboard() {
    try {
      return await apiClient.get(API_ENDPOINTS.STUDENT.DASHBOARD);
    } catch {
      return {
        todayClasses: TODAY_CLASSES,
        deadlines: DEADLINES,
        subjects: STUDENT_SUBJECTS,
        attendance: ATTENDANCE,
        perfTrend: PERF_TREND,
      };
    }
  },

  async getCourses() {
    try {
      return await apiClient.get(API_ENDPOINTS.STUDENT.COURSES);
    } catch {
      return STUDENT_SUBJECTS;
    }
  },

  async getAttendance() {
    try {
      return await apiClient.get(API_ENDPOINTS.STUDENT.ATTENDANCE);
    } catch {
      return ATTENDANCE;
    }
  },

  async getAssignments() {
    try {
      return await apiClient.get(API_ENDPOINTS.STUDENT.ASSIGNMENTS);
    } catch {
      return STUDENT_ASSIGNMENTS;
    }
  },

  async getExaminations() {
    try {
      return await apiClient.get(API_ENDPOINTS.STUDENT.EXAMINATIONS);
    } catch {
      return { upcoming: UPCOMING_EXAMS, past: PAST_EXAMS };
    }
  },

  async getResults() {
    try {
      return await apiClient.get(API_ENDPOINTS.STUDENT.RESULTS);
    } catch {
      return RESULTS;
    }
  },

  async getPerformance() {
    try {
      return await apiClient.get(API_ENDPOINTS.STUDENT.PERFORMANCE);
    } catch {
      return { trend: PERF_TREND, results: RESULTS, subjects: STUDENT_SUBJECTS };
    }
  },
};
