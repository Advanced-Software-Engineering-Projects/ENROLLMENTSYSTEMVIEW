import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './src/hooks/useAuth';

const ProtectedRoute = ({ children, requiredRoles = [] }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If requiredRoles is provided and not empty, check if the user's role is included
  if (requiredRoles.length > 0 && !requiredRoles.includes(user?.role)) {
    // Redirect to login or an unauthorized page
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;