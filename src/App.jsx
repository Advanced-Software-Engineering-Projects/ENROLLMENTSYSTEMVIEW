import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { LightModeTheme, DarkModeTheme } from '../theme';
import { useAuth } from './hooks/useAuth';
import DashboardLayout from './components/DashboardLayout/DashboardLayout';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import UpdateProfile from './Pages/UpdateProfile/UpdateProfile';
import Program from './Pages/Program/Program';
import Timetable from './pages/Timetable/Timetable';
import Fees from './pages/Fees/Fees';
import Enrollment from './pages/Enrollment/Enrollment';
import GradesPage from './pages/GradesPage/GradesPage';
import CourseManagement from './pages/AdminPanel/CourseManagement';
import StudentRecords from './pages/AdminPanel/StudentRecords';
import FormsConfiguration from './pages/AdminPanel/FormsConfiguration';
import ServiceManagement from './pages/AdminPanel/ServiceManagement';
import Forms from './pages/Forms/Forms';
import ProtectedRoute from '../ProtectedRoute';

const App = () => {
  const [semester, setSemester] = useState("Semester I 2025");
  const [mode, setMode] = useState("light");

   const [user, setUser] = useState(() => {
    try {
      const userData = localStorage.getItem('user');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  });

  /// Load user from localStorage on mount (redundant with the initial state, can be removed)
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");
      console.log("App - Initializing user state from localStorage:", savedUser);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error("Error loading user from localStorage:", error);
    }
  }, []);

  // Log user updates and sync with localStorage
  useEffect(() => {
    console.log("App - User state updated:", user);
    try {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        localStorage.removeItem("user");
      }
    } catch (error) {
      console.error("Error updating localStorage:", error);
    }
  }, [user]);

  const handleLogin = (userData) => {
    console.log("App - handleLogin called with:", userData);
    setUser(userData);
  };

  const handleLogout = () => {
    // Clear user data and token
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // You might want to call your logout API endpoint here
    // await logout();
  };


  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = mode === 'light' ? LightModeTheme : DarkModeTheme;

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route
            path='/dashboard'
            element={
              <ProtectedRoute requiredRoles={['student', 'admin']}>
                <Dashboard
                  studentId={user?.id}
                  semester={semester}
                  toggleTheme={toggleTheme}
                  mode={mode}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRoute requiredRoles={['student']}>
                <UpdateProfile studentId={user?.id} toggleTheme={toggleTheme} mode={mode}/>
              </ProtectedRoute>
            }
          />
          <Route
            path='/program'
            element={
              <ProtectedRoute requiredRoles={['student']}>
                <Program studentId={user?.id} toggleTheme={toggleTheme} mode={mode}/>
              </ProtectedRoute>
            }
          />
          <Route
            path='/enrollment'
            element={
              <ProtectedRoute requiredRoles={['student']}>
                <Enrollment studentId={user?.id} toggleTheme={toggleTheme} mode={mode}/>
              </ProtectedRoute>
            }
          />
          <Route
            path='/timetable'
            element={
              <ProtectedRoute requiredRoles={['student']}>
                <Timetable studentId={user?.id} semester={semester} toggleTheme={toggleTheme} mode={mode}/>
              </ProtectedRoute>
            }
          />
          <Route
            path='/grades-page'
            element={
              <ProtectedRoute requiredRoles={['student']}>
                <GradesPage studentId={user?.id} toggleTheme={toggleTheme} mode={mode} />
              </ProtectedRoute>
            }
          />
          <Route
            path='/forms'
            element={
              <ProtectedRoute requiredRoles={['student']}>
                <Forms studentId={user?.id} semester={semester} toggleTheme={toggleTheme} mode={mode} />
              </ProtectedRoute>
            }
          />
          <Route
            path='/fees'
            element={
              <ProtectedRoute requiredRoles={['student']}>
                <Fees studentId={user?.id} toggleTheme={toggleTheme} mode={mode}/>
              </ProtectedRoute>
            }
          />
          <Route
            path='/course-management'
            element={
              <ProtectedRoute requiredRoles={['admin']}>
                <CourseManagement toggleTheme={toggleTheme} mode={mode} />
              </ProtectedRoute>
            }
          />
          <Route
            path='/student-records'
            element={
              <ProtectedRoute requiredRoles={['admin']}>
                <StudentRecords toggleTheme={toggleTheme} mode={mode} />
              </ProtectedRoute>
            }
          />
          <Route
            path='/forms-configuration'
            element={
              <ProtectedRoute requiredRoles={['admin']}>
                <FormsConfiguration toggleTheme={toggleTheme} mode={mode} />
              </ProtectedRoute>
            }
          />
          <Route
            path='/service-management'
            element={
              <ProtectedRoute requiredRoles={['admin']}>
                <ServiceManagement toggleTheme={toggleTheme} mode={mode} />
              </ProtectedRoute>
            }
          />
          <Route path='/' element={<Navigate to='/login' replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;