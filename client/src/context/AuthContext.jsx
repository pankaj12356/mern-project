// src/context/AuthContext.jsx

import React, { createContext, useState, useEffect } from 'react';

// Create context
export const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { username, role, token }

  // Mock login function
  const login = (username, role = 'user') => {
    const mockToken = 'demo-token';
    setUser({ username, role, token: mockToken });
  };

  // Logout function
  const logout = () => {
    setUser(null);
  };

  // Persist user from localStorage (optional)
  useEffect(() => {
    const storedUser = localStorage.getItem('coderzhub-user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('coderzhub-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('coderzhub-user');
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};