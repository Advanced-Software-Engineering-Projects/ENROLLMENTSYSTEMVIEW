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

// Admin Dashboard
export const getDashboardMetrics = () => api.get('/admin/dashboard/metrics');
export const getPendingRequestsAdmin = () => api.get('/admin/dashboard/pending-requests');
export const getEnrollmentDataAdmin = () => api.get('/admin/dashboard/enrollment-data');
export const getCompletionRateDataAdmin = () => api.get('/admin/dashboard/completion-rate');
export const getRegisteredStudentsCount = () => api.get('/Dashboard/registered-students-count');
export const getActiveCoursesCount = () => api.get('/Dashboard/active-courses-count');
export const getPendingApprovalsCount = () => api.get('/Dashboard/pending-approvals-count');
export const getPendingRequests = () => api.get('/Dashboard/pending-requests');
export const getEnrollmentData = () => api.get('/Dashboard/enrollment-data');
export const getCompletionRateData = () => api.get('/Dashboard/completion-rate-data');

// Registration Management
export const openRegistration = (periodDto) => api.post('/admin/registration/open', periodDto);
export const closeRegistration = () => api.post('/admin/registration/close');
export const getRegistrationStatus = () => api.get('/admin/registration/status');
export const getRegistrationPeriods = () => api.get('/admin/registration/periods');
export const getCurrentRegistrationPeriod = () => api.get('/admin/registration/current');
export const openCourseRegistration = (courseRegistrationDto) => api.post('/admin/registration/open-courses', courseRegistrationDto);
export const closeCourseRegistration = (courseCloseDto) => api.post('/admin/registration/close-courses', courseCloseDto);
export const getRegistrationMetrics = () => api.get('/admin/registration/metrics');

// Course Management
export const getRegistrationStatusCourse = () => api.get('/course-management/status');
export const openCourseRegistrationManagement = (request) => api.post('/course-management/open', request);
export const closeCourseRegistrationManagement = (request) => api.post('/course-management/close', request);
export const addCourse = (courseDto) => api.post('/courses/add', courseDto);
export const updateCourse = (courseCode, updatedCourse) => api.put(`/courses/update/${courseCode}`, updatedCourse);
export const deleteCourse = (courseCode) => api.delete(`/courses/delete/${courseCode}`);

// Student Records
export const getStudentById = (id) => api.get(`/student-records/${id}`);
export const getAllStudents = (page = 1, pageSize = 5) => api.get(`/student-records?page=${page}&pageSize=${pageSize}`);

// Hold Management
export const getStudentsForHolds = () => api.get('/holds/students');
export const getHolds = (studentId) => api.get(`/holds?studentId=${studentId}`);
export const addHold = (holdDto) => api.post('/service-holds', holdDto);
export const removeHold = (id) => api.delete(`/holds/${id}`);
export const getServiceAccessRules = () => api.get('/admin/hold-management/service-access-rules');
export const updateServiceAccessRules = (allowedServices) => api.put('/admin/hold-management/service-access-rules', allowedServices);
export const getAllStudentsWithHolds = () => api.get('/service-holds/students');
export const getStudentWithHolds = (studentId) => api.get(`/service-holds/students/${studentId}`);

// AOP Logging and Authentication Endpoints
export const getUserActivityLogs = (params = {}) => api.get('/admin/logs/activity', { params });
export const getAuthenticationLogs = (params = {}) => api.get('/admin/logs/authentication', { params });
export const getSystemAuditLogs = (params = {}) => api.get('/admin/logs/audit', { params });
export const createActivityLog = (logData) => api.post('/admin/logs/activity', logData);
export const createAuthenticationLog = (logData) => api.post('/admin/logs/authentication', logData);
export const createAuditLog = (logData) => api.post('/admin/logs/audit', logData);
export const getLogStatistics = () => api.get('/admin/logs/statistics');
export const exportLogs = (type, params = {}) => api.get(`/admin/logs/export/${type}`, { params, responseType: 'blob' });

// Admin Registration History Endpoints
export const getRegistrationHistory = (params = {}) => api.get('/admin/registration/history', { params });
export const createRegistrationHistoryEntry = (historyData) => api.post('/admin/registration/history', historyData);
export const getRegistrationHistoryByAdmin = (adminId) => api.get(`/admin/registration/history/admin/${adminId}`);
export const getRegistrationHistoryStats = () => api.get('/admin/registration/history/statistics');

// Enhanced Service Hold Endpoints
export const getServiceHoldTypes = () => api.get('/admin/service-holds/types');
export const createServiceHoldType = (holdTypeData) => api.post('/admin/service-holds/types', holdTypeData);
export const updateServiceHoldType = (typeId, holdTypeData) => api.put(`/admin/service-holds/types/${typeId}`, holdTypeData);
export const deleteServiceHoldType = (typeId) => api.delete(`/admin/service-holds/types/${typeId}`);
export const checkServiceAccess = (studentId, serviceType) => api.get(`/admin/service-holds/check-access/${studentId}/${serviceType}`);
export const bulkApplyHolds = (holdData) => api.post('/admin/service-holds/bulk-apply', holdData);
export const bulkRemoveHolds = (holdIds) => api.post('/admin/service-holds/bulk-remove', { holdIds });
export const getHoldImpactReport = (holdId) => api.get(`/admin/service-holds/impact-report/${holdId}`);

// Enhanced Registration Control Endpoints
export const scheduleRegistrationPeriod = (scheduleData) => api.post('/admin/registration/schedule', scheduleData);
export const updateRegistrationPeriod = (periodId, updateData) => api.put(`/admin/registration/periods/${periodId}`, updateData);
export const deleteRegistrationPeriod = (periodId) => api.delete(`/admin/registration/periods/${periodId}`);
export const getRegistrationPeriodDetails = (periodId) => api.get(`/admin/registration/periods/${periodId}`);
export const validateRegistrationPeriod = (periodData) => api.post('/admin/registration/validate-period', periodData);
export const getRegistrationConflicts = () => api.get('/admin/registration/conflicts');

// Microservice Access Control Endpoints
export const getServicePermissions = () => api.get('/admin/access-control/permissions');
export const updateServicePermissions = (permissionData) => api.put('/admin/access-control/permissions', permissionData);
export const getRolePermissions = (roleId) => api.get(`/admin/access-control/roles/${roleId}/permissions`);
export const updateRolePermissions = (roleId, permissions) => api.put(`/admin/access-control/roles/${roleId}/permissions`, permissions);
export const validateServiceAccess = (serviceId, userId) => api.post('/admin/access-control/validate', { serviceId, userId });
export const getAccessControlAudit = (params = {}) => api.get('/admin/access-control/audit', { params });

// Auto-fill Forms Endpoints
export const getStudentFormData = (studentId) => api.get(`/admin/forms/student-data/${studentId}`);
export const getFormTemplates = () => api.get('/admin/forms/templates');
export const createFormTemplate = (templateData) => api.post('/admin/forms/templates', templateData);
export const updateFormTemplate = (templateId, templateData) => api.put(`/admin/forms/templates/${templateId}`, templateData);
export const deleteFormTemplate = (templateId) => api.delete(`/admin/forms/templates/${templateId}`);
export const getFormSubmissionHistory = (studentId, formType) => api.get(`/admin/forms/history/${studentId}/${formType}`);
export const prePopulateForm = (formType, studentId) => api.get(`/admin/forms/pre-populate/${formType}/${studentId}`);

// Grade Recheck Management
export const getPendingGradeRecheckRequests = () => api.get('/grade-recheck/admin/pending');
export const updateGradeRecheckRequestStatus = (requestId, status) => api.put(`/grade-recheck/admin/request/${requestId}`, status);

// User Logs
export const getAllUserLogs = () => api.get('/user-logs');
export const getUserLogById = (id) => api.get(`/user-logs/${id}`);
export const getUserLogsByUserId = (userId) => api.get(`/user-logs/user/${userId}`);