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

// Authentication Endpoints
export const login = (loginDto) => api.post('/auth/login', loginDto);
export const resetPassword = (resetDto) => api.post('/auth/ResetUserPassword', resetDto);
export const logout = () => api.post('/auth/logout');
export const extendSession = () => api.post('/auth/extend-session');