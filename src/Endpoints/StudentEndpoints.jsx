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
export const getAcademicRecords = (studentId) => api.get(`/academic-records?studentId=${studentId}`);
export const getTranscript = (studentId) => api.get(`/academic-records/transcript?studentId=${studentId}`);
export const getGPA = (studentId) => api.get(`/academic-records/gpa?studentId=${studentId}`);
export const getProgramAuditAcademic = (studentId) => api.get(`/academic-records/audit?studentId=${studentId}`);
export const getEnrollmentStatus = (studentId) => api.get(`/academic-records/enrollment-status?studentId=${studentId}`);
export const checkGraduationEligibility = (studentId) => api.get(`/academic-records/graduation-eligibility?studentId=${studentId}`);
export const applyForGraduation = (studentId) => api.post(`/academic-records/graduation-application?studentId=${studentId}`);
export const getGraduationStatus = (studentId) => api.get(`/academic-records/graduation-status?studentId=${studentId}`);

// Course Registrations
export const getAvailableCoursesRegistration = (studentId) => api.get(`/course-registrations/available?studentId=${studentId}`);
export const registerCourseRegistration = (registrationDto) => api.post('/course-registrations/register-course', registrationDto);
export const getRegisteredCoursesRegistration = (studentId) => api.get(`/course-registrations/registered?studentId=${studentId}`);
export const unregisterCourse = (registrationDto) => api.delete('/course-registrations/unregister', { data: registrationDto });
export const getCourseHistory = (studentId) => api.get(`/course-registrations/history?studentId=${studentId}`);
export const getCoursePrerequisitesRegistration = (courseId) => api.get(`/course-registrations/prerequisites?courseId=${courseId}`);

// Courses (Student-specific)
export const getCourses = () => api.get('/courses');
export const getCourseDetails = (courseCode) => api.get(`/courses/${courseCode}`);
export const getRegisteredCourses = () => api.get('/courses/registered');
export const registerCourse = (courseCode) => api.post('/courses/register', courseCode);
export const dropCourse = (courseCode) => api.post('/courses/drop', courseCode);
export const getPrerequisites = (courseCode) => api.get(`/courses/${courseCode}/prerequisites`);

// Dashboard (Student-specific)
export const getEnrolledCoursesDashboard = () => api.get('/Dashboard/enrolled-courses');
export const getCompletedCoursesCurrentYear = () => api.get('/Dashboard/completed-courses-current-year');
export const getTotalCompletedCourses = () => api.get('/Dashboard/total-completed-courses');
export const getGpaData = () => api.get('/Dashboard/gpa-data');

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

// Forms
export const getForms = (studentId, formType) => api.get(`/forms?studentId=${studentId}&formType=${formType}`);
export const getAllForms = (studentId) => api.get(`/forms/all?studentId=${studentId}`);
export const submitForm = (formDto) => api.post('/forms', formDto, { headers: { 'Content-Type': 'multipart/form-data' } });
export const uploadAvatarForms = (request) => api.post('/forms/upload-avatar', request, { headers: { 'Content-Type': 'multipart/form-data' } });

// Grades
export const getAcademicRecordsGrades = (studentId) => api.get(`/grades/academic-records?studentId=${studentId}`);
export const getGpaTrend = (studentId) => api.get(`/grades/gpa-trend?studentId=${studentId}`);

// Programs
export const getProgramAudit = (studentId) => api.get(`/programs/audit?studentId=${studentId}`);

// Students
export const getStudent = async (studentId) => {
  return axios.get(`${API_URL}/students/${studentId}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
};

export const updateStudent = async (studentId, studentData) => {
  return axios.put(`${API_URL}/students/${studentId}`, studentData, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
};

export const uploadAvatar = async (studentId, formData) => {
  return axios.post(`${API_URL}/students/${studentId}/avatar`, formData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

// Timetables
export const getTimetables = (studentId, semester) => api.get(`/timetables?studentId=${studentId}&semester=${semester}`);
export const addTimetable = (timetableDto) => api.post('/timetables', timetableDto);