import React, { useState, useEffect } from 'react';

// Material UI Imports
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import { LightModeTheme, DarkModeTheme } from "../theme";

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout/DashboardLayout';
import Login from './pages/Login/Login';
import Dashboard from './Pages/Dashboard/Dashboard';
import UpdateProfile from './Pages/UpdateProfile/UpdateProfile';
import Program from './Pages/Program/Program';
import Timetable from './pages/Timetable/Timetable';
import Fees from './pages/Fees/Fees';
import Enrollment from './pages/Enrollment/Enrollment';
import GradesPage from './pages/GradesPage/GradesPage';
import AdminPanel from './pages/AdminPanel/AdminPanel';
import StudentRecords from './pages/AdminPanel/StudentRecords';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import Forms from './pages/Forms/Forms';
import AdminFormsServices from './pages/AdminPanel/AdminFormsServices';
import AdminHolds from './pages/AdminPanel/AdminHolds';

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [semester, setSemester] = useState("Semester I 2025");
  const [mode, setMode] = useState("light");

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    console.log("App - Initializing user state from localStorage:", savedUser);
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Log user updates and sync with localStorage
  useEffect(() => {
    console.log("App - User state updated:", user);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const handleLogin = (userData) => {
    console.log("App - handleLogin called with:", userData);
    setUser(userData);
  };

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = mode === "light" ? LightModeTheme : DarkModeTheme;

  return (
    
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={<Login onLogin={handleLogin} />}
          />
           <Route
            path="/admin-dashboard"
            element={
              user && user.role === "admin" ? (
                <AdminDashboard
                  toggleTheme={toggleTheme}
                  mode={mode}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/admin-panel"
            element={
              user && user.role === "admin" ? (
                <AdminPanel
                  toggleTheme={toggleTheme}
                  mode={mode}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/student-records"
            element={
              user && user.role === "admin" ? (
                <StudentRecords
                  toggleTheme={toggleTheme}
                  mode={mode}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/admin-forms"
            element={
              user && user.role === "admin" ? (
                <AdminFormsServices
                  toggleTheme={toggleTheme}
                  mode={mode}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/admin-holds"
            element={
              user && user.role === "admin" ? (
                <AdminHolds
                  toggleTheme={toggleTheme}
                  mode={mode}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              user && user.role === "student" ? (
                <Dashboard
                  studentId={user.id}
                  semester={semester}
                  toggleTheme={toggleTheme}
                  mode={mode}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/profile"
            element={
              user && user.role === "student" ? (
                <UpdateProfile studentId={user.id} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/program"
            element={
              user && user.role === "student" ? (
                <Program studentId={user.id} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/enrollment"
            element={
              user && user.role === "student" ? (
                <Enrollment studentId={user.id} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/timetable"
            element={
              user && user.role === "student" ? (
                <Timetable studentId={user.id} semester={semester} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/grades-page"
            element={
              user && user.role === "student" ? (
                <GradesPage studentId={user.id} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/forms"
            element={
              user && user.role === "student" ? (
                <Forms studentId={user.id} semester={semester} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/fees"
            element={
              user && user.role === "student" ? (
                <Fees studentId={user.id} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;