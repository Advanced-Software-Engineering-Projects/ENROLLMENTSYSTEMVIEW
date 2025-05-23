import axios from 'axios';
 
// Define the base URL for your API
const API_URL = 'https://Localhost:7283/api';
 
 
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
 
api.interceptors.request.use(
  (config) => {
const token = localStorage.getItem('token'); // Ensure token is retrieved correctly
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
 
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('student');
        window.location.href = '/login';
      }
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error.message);
  }
);
 
// Student API Endpoints
export const login = async (studentId, password) => {
  const response = await api.post('/student/login', { studentId, password });
  localStorage.setItem('token', response.data.token);
  return response.data.student;
};
 
export const ForgotPassword = async (studnetId) => {
  const response = await api.post('/student/forgotpassword',{studentOd});
  return response.data;
}
 
export const register = async (studentData) => {
  const response = await api.post('/student/register', studentData);
  return response.data;
};
 
export const logout = async () => {
  const response = await api.post('/student/logout');
  localStorage.removeItem('token');
  window.location.href = '/login';
  return response.data;
};
 
export const updateProfile = async (studentId, studentData) => {
  const response = await api.put(`/student/${studentId}/profile`, studentData);
  return response.data;
};
 
export const getActivities = async (studentId) => {
  const response = await api.get(`/student/${studentId}/activities`);
  return response.data;
};
 
export const getAvailableCourses = async (studentId, semester) => {
  const response = await api.get(`/student/${studentId}/courses/${semester}`);
  return response.data;
};
 
export const searchCourses = async (studentId, params = {}) => {
  const query = new URLSearchParams();
  if (params.keyword) query.append('keyword', params.keyword);
  if (params.semester) query.append('semester', params.semester);
  if (params.creditsMin) query.append('creditsMin', params.creditsMin);
  if (params.creditsMax) query.append('creditsMax', params.creditsMax);
  const response = await api.get(`/student/${studentId}/courses/search?${query.toString()}`);
  return response.data;
};
 
export const registerCourse = async (studentId, courseId, semester) => {
  const response = await api.post(`/student/${studentId}/courses/register`, { courseId, semester });
  return response.data;
};
 
export const dropCourse = async (studentId, enrollmentId) => {
  const response = await api.delete(`/student/${studentId}/courses/${enrollmentId}`);
  return response.data;
};
 
export const getTimetable = async (studentId, semester) => {
  const response = await api.get(`/student/${studentId}/timetable/${semester}`);
  return response.data;
};
 
export const getAcademicRecords = async (studentId) => {
  const response = await api.get(`/student/${studentId}/grades`);
  return response.data;
};
 
export const getFeeInformation = async (studentId) => {
  const response = await api.get(`/student/${studentId}/fees`);
  return response.data;
};
 
export const checkFeeHolds = async (studentId) => {
  const response = await api.get(`/student/${studentId}/fee-holds`);
  return response.data;
};
 
export const markFeeAsPaid = async (studentId, feeId) => {
  const response = await api.post(`/student/${studentId}/fees/${feeId}/pay`);
  return response.data;
};
 
export const getDashboardData = async (studentId, semester) => {
  const response = await api.get(`/student/${studentId}/dashboard?semester=${semester}`);
  return response.data;
};
 
export const getCurrentlyEnrolledCourses = async (studentId, semester) => {
  const response = await api.get(`/student/${studentId}/dashboard/currently-enrolled/${semester}`);
  return response.data;
};
 
export const getCoursesCompletedInCurrentYear = async (studentId) => {
  const response = await api.get(`/student/${studentId}/dashboard/completed-this-year`);
  return response.data;
};
 
export const getTotalCoursesCompleted = async (studentId) => {
  const response = await api.get(`/student/${studentId}/dashboard/total-completed`);
  return response.data;
};
 
export const getEnrollmentProgress = async (studentId) => {
  const response = await api.get(`/student/${studentId}/dashboard/enrollment-progress`);
  return response.data;
};
 
export const getGpaBySemester = async (studentId) => {
  const response = await api.get(`/student/${studentId}/dashboard/gpa-by-semester`);
  return response.data;
};
 
export const getPrerequisiteGraph = async (studentId, courseId) => {
  const response = await api.get(`/student/${studentId}/courses/${courseId}/prerequisites-graph`);
  return response.data;
};
 
export const getStudentProgram = async (studentId) => {
  const response = await api.get(`/student/${studentId}/program`);
  return response.data;
};
 
export const getDegreeProgress = async (studentId) => {
  const response = await api.get(`/student/${studentId}/degree-progress`);
  return response.data;
};
 
// Admin API Endpoints
export const adminLogin = async (username, password) => {
  const response = await api.post('/admin/login', { username, password });
  localStorage.setItem('token', response.data.token);
  return response.data.admin;
};
 
export const adminRegister = async (adminData) => {
  const response = await api.post('/admin/register', adminData);
  return response.data;
};
 
export const adminLogout = async () => {
  const response = await api.post('/admin/logout');
  localStorage.removeItem('token');
  window.location.href = '/admin/login';
  return response.data;
};
 
export const toggleRegistration = async (isOpen) => {
  const response = await api.post('/admin/registration/toggle', isOpen);
  return response.data;
};
 
export const getConfigs = async () => {
  const response = await api.get('/admin/configs');
  return response.data;
};
 
export const addConfig = async (configData) => {
  const response = await api.post('/admin/configs', configData);
  return response.data;
};
 
export const updateConfig = async (configId, configData) => {
  const response = await api.put(`/admin/configs/${configId}`, configData);
  return response.data;
};
 
export const deleteConfig = async (configId) => {
  const response = await api.delete(`/admin/configs/${configId}`);
  return response.data;
};
 
export const getUserActivities = async (userId) => {
  const response = await api.get(`/admin/activities/${userId}`);
  return response.data;
};
 
export const getAuditLogs = async (params = {}) => {
  const query = new URLSearchParams();
  if (params.userId) query.append('userId', params.userId);
  if (params.startDate) query.append('startDate', params.startDate);
  if (params.endDate) query.append('endDate', params.endDate);
  const response = await api.get(`/admin/audit-logs?${query.toString()}`);
  return response.data;
};
 
export const addProgram = async (programData) => {
  const response = await api.post('/admin/programs', programData);
  return response.data;
};
 
export const updateProgram = async (programId, programData) => {
  const response = await api.put(`/admin/programs/${programId}`, programData);
  return response.data;
};
 
export const deleteProgram = async (programId) => {
  const response = await api.delete(`/admin/programs/${programId}`);
  return response.data;
};
 
export const addCourseToProgram = async (programId, courseData) => {
  const response = await api.post(`/admin/programs/${programId}/courses`, courseData);
  return response.data;
};
 
export const removeCourseFromProgram = async (programId, courseId) => {
  const response = await api.delete(`/admin/programs/${programId}/courses/${courseId}`);
  return response.data;
};
 
export const submitGrade = async (enrollmentId, grade) => {
  const response = await api.post(`/admin/enrollments/${enrollmentId}/grade`, grade);
  return response.data;
};