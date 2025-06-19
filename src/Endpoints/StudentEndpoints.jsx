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

// Academic Records
// Academic Records
export const getAcademicRecords = (studentId) => api.get(`/academic-records?studentId=${studentId}`);
export const getTranscript = (studentId) => api.get(`/academic-records/transcript?studentId=${studentId}`);
export const getGPA = (studentId) => api.get(`/academic-records/gpa?studentId=${studentId}`);
export const getProgramAuditAcademic = (studentId) => api.get(`/academic-records/audit?studentId=${studentId}`);
export const getEnrollmentStatus = (studentId) => api.get(`/academic-records/enrollment-status?studentId=${studentId}`);
export const checkGraduationEligibility = (studentId) => api.get(`/academic-records/graduation-eligibility?studentId=${studentId}`);
export const applyForGraduation = (studentId) => api.post(`/academic-records/graduation-application?studentId=${studentId}`);
export const getGraduationStatus = (studentId) => api.get(`/academic-records/graduation-status?studentId=${studentId}`);
export const getGpaTrend = (studentId) => api.get(`/grades/gpa-trend?studentId=${studentId}`);

// Course Registrations
export const getAvailableCoursesRegistration = (studentId) => api.get(`/course-registrations/available?studentId=${studentId}`);
export const registerCourseRegistration = (registrationDto) => api.post('/course-registrations/register-course', registrationDto);
export const getRegisteredCoursesRegistration = (studentId) => api.get(`/course-registrations/registered?studentId=${studentId}`);
export const unregisterCourse = (registrationDto) => api.delete('/course-registrations/unregister', { data: registrationDto });
export const getCourseHistory = (studentId) => api.get(`/course-registrations/history?studentId=${studentId}`);
export const getCoursePrerequisitesRegistration = (courseId) => api.get(`/course-registrations/prerequisites?courseId=${courseId}`);

// Enrollments
export const getEnrolledCourses = (studentId) => api.get(`/enrollments/enrolled?studentId=${studentId}`);
export const getDroppedCourses = (studentId) => api.get(`/enrollments/dropped?studentId=${studentId}`);
export const getAvailableCoursesEnrollment = (studentId, program) => api.get(`/enrollments/available?studentId=${studentId}&program=${program}`);
export const getPrerequisiteGraph = (courseCode) => api.get(`/enrollments/prerequisites/${courseCode}`);
export const enrollInCourse = (enrollmentDto) => api.post('/enrollments/enroll', enrollmentDto);
export const dropEnrolledCourse = (studentId, courseCode) => api.delete(`/enrollments/drop?studentId=${studentId}&courseCode=${courseCode}`);

// Fees
export const getCurrentFees = (studentId) => api.get(`/fees/current?studentId=${studentId}`);
export const getPaymentRecords = (studentId) => api.get(`/fees/payment-records?studentId=${studentId}`);
export const getFeeHolds = (studentId) => api.get(`/fees/holds?studentId=${studentId}`);
export const markFeeAsPaid = (studentId, feeId) => api.post(`/fees/mark-paid?studentId=${studentId}&feeId=${feeId}`);

// Grade Recheck
export const createGradeRecheckRequest = (request) => api.post('/grade-recheck/request', request);
export const getStudentGradeRecheckRequests = () => api.get('/grade-recheck/student/requests');
export const getStudentGradeNotifications = () => api.get('/grade-recheck/student/notifications');
export const markNotificationAsRead = (notificationId) => api.post(`/grade-recheck/notifications/${notificationId}/read`);

// Student Profile
export const getStudent = (studentId) => {
  const cleanId = studentId.includes('@') ? studentId.split('@')[0] : studentId;
  return api.get(`/students/${cleanId}`);
};

export const updateStudent = (studentId, studentData) => {
  const cleanId = studentId.includes('@') ? studentId.split('@')[0] : studentId;
  return api.put(`/students/${cleanId}`, studentData);
};

export const uploadAvatar = (studentId, formData) => {
  const cleanId = studentId.includes('@') ? studentId.split('@')[0] : studentId;
  return api.post(`/students/${cleanId}/avatar`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

// Dashboard (Student-specific)
export const getEnrolledCoursesDashboard = () => api.get('/Dashboard/enrolled-courses');
export const getCompletedCoursesCurrentYear = () => api.get('/Dashboard/completed-courses-current-year');
export const getTotalCompletedCourses = () => api.get('/Dashboard/total-completed-courses');
export const getGpaData = () => api.get('/Dashboard/gpa-data');

// Transcript
export const downloadTranscript = () => api.get('/transcript/download', { responseType: 'blob' });
export const getTranscriptGpa = () => api.get('/transcript/gpa');

// Timetable
export const getTimetables = (studentId, semester) => api.get(`/timetables?studentId=${studentId}&semester=${semester}`);
export const addTimetable = (timetableDto) => api.post('/timetables', timetableDto);
export const updateTimetable = (timetableId, timetableDto) => api.put(`/timetables/${timetableId}`, timetableDto);
export const deleteTimetable = (timetableId) => api.delete(`/timetables/${timetableId}`);
export const getTimetableById = (timetableId) => api.get(`/timetables/${timetableId}`);