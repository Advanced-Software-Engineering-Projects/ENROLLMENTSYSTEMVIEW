import { useState } from 'react';
 
export function useAuth() {
  // Retrieve user and token from sessionStorage
  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem('currentUser');
    const token = sessionStorage.getItem('jwtToken');
    return storedUser && token ? JSON.parse(storedUser) : null;
  });
 
  // Function to log in and store JWT
  const login = (userData, token) => {
    sessionStorage.setItem('currentUser', JSON.stringify(userData)); // Store user
    sessionStorage.setItem('jwtToken', token); // Store JWT token
    setUser(userData);
  };
 
  // Function to log out
  const logout = () => {
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('jwtToken');
    setUser(null);
  };
 
  // Check if user is authenticated (must have both user & token)
  const isAuthenticated = Boolean(user && sessionStorage.getItem('jwtToken'));
 
  return { user, login, logout, isAuthenticated };
}
 