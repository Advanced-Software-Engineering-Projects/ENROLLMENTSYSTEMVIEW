import { useState, useEffect } from 'react';

export function useAuth() {
  // Retrieve user and token from localStorage
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return storedUser && token ? JSON.parse(storedUser) : null;
  });

  // Sync user state with localStorage changes
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, []);

  // Function to log in and store JWT
  const login = (userData, token) => {
    localStorage.setItem('user', JSON.stringify(userData)); // Store user
    localStorage.setItem('token', token); // Store JWT token
    setUser(userData);
  };

  // Function to log out
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  // Check if user is authenticated (must have both user & token)
  const isAuthenticated = Boolean(user && localStorage.getItem('token'));

  return { user, login, logout, isAuthenticated };
}