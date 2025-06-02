import axios from 'axios';

const API_URL = 'https://localhost:5230/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
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
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('student');
      window.location.href = '/login';
    }
    return Promise.reject(error.response ? error.response.data : error.message);
  }
);

// Admin Controller
export const openRegistration = (periodDto) => api.post('/admin/registration/open', periodDto);
export const closeRegistration = () => api.post('/admin/registration/close');
export const getRegistrationStatus = () => api.get('/admin/registration/status');
export const getRegistrationPeriods = () => api.get('/admin/registration/periods');
export const getCurrentRegistrationPeriod = () => api.get('/admin/registration/current');
export const getDashboardMetrics = () => api.get('/admin/dashboard/metrics');
export const getPendingRequestsAdmin = () => api.get('/admin/dashboard/pending-requests');
export const getEnrollmentDataAdmin = () => api.get('/admin/dashboard/enrollment-data');
export const getCompletionRateDataAdmin = () => api.get('/admin/dashboard/completion-rate');
export const openCourseRegistration = (courseRegistrationDto) => api.post('/admin/registration/open-courses', courseRegistrationDto);
export const closeCourseRegistration = (courseCloseDto) => api.post('/admin/registration/close-courses', courseCloseDto);
export const getRegistrationMetrics = () => api.get('/admin/registration/metrics');

// Admin Forms Services
export const getAllFormsAdmin = (studentId, formType) => api.get(`/admin-forms-services?studentId=${studentId}&formType=${formType}`);
export const updateGrade = (updateGradeDto) => api.put('/admin-forms-services/update-grade', updateGradeDto);
export const updateStatus = (updateStatusDto) => api.put('/admin-forms-services/update-status', updateStatusDto);
export const getGrades = (studentId) => api.get(`/admin-forms-services/grades?studentId=${studentId}`);
export const getFormById = (formId) => api.get(`/admin-forms-services/forms/${formId}`);
export const createForm = (createFormDto) => api.post('/admin-forms-services/forms', createFormDto);
export const resendEmail = (resendEmailDto) => api.post('/admin-forms-services/resend-email', resendEmailDto);

// Admin Holds
export const getStudentsForHolds = () => api.get('/holds/students');
export const getHolds = (studentId) => api.get(`/holds?studentId=${studentId}`);
export const addHold = (holdDto) => api.post('/holds', holdDto);
export const removeHold = (id) => api.delete(`/holds/${id}`);

// Courses (Admin-specific)
export const addCourse = (courseDto) => api.post('/courses/add', courseDto);
export const updateCourse = (courseCode, updatedCourse) => api.put(`/courses/update/${courseCode}`, updatedCourse);
export const deleteCourse = (courseCode) => api.delete(`/courses/delete/${courseCode}`);

// Dashboard (Admin-specific)
export const getRegisteredStudentsCount = () => api.get('/Dashboard/registered-students-count');
export const getActiveCoursesCount = () => api.get('/Dashboard/active-courses-count');
export const getPendingApprovalsCount = () => api.get('/Dashboard/pending-approvals-count');
export const getPendingRequests = () => api.get('/Dashboard/pending-requests');
export const getEnrollmentData = () => api.get('/Dashboard/enrollment-data');
export const getCompletionRateData = () => api.get('/Dashboard/completion-rate-data');

// Student Records
export const getStudentById = (id) => api.get(`/student-records/${id}`);
export const getAllStudents = (page = 1, pageSize = 5) => api.get(`/student-records?page=${page}&pageSize=${pageSize}`);