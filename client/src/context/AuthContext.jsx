import React, { createContext, useState, useEffect } from 'react';
import { getCurrentUser } from '../services/authService';

// Create context
export const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Full user object
  const [loading, setLoading] = useState(true); // For initial fetch

  // Login: set full user object
  const login = (userData) => {
    console.log('🔐 login() called with:', userData);
    setUser(userData);
    localStorage.setItem('coderzhub-user', JSON.stringify(userData));
  };

  // Logout: clear user and localStorage
  const logout = () => {
    console.log('🚪 logout() called');
    setUser(null);
    localStorage.removeItem('coderzhub-user');
  };

  // Auto-fetch user from backend on mount
  useEffect(() => {
    const fetchUser = async () => {
      console.log('🔄 Attempting to fetch user from /profile...');
      try {
        const res = await getCurrentUser(); // GET /api/auth/profile
        console.log('✅ User fetched from backend:', res.data.user);
        setUser(res.data.user);
        localStorage.setItem('coderzhub-user', JSON.stringify(res.data.user));
      } catch (err) {
        console.warn('⚠️ No active session or fetch failed:', err.message);
        setUser(null);
        localStorage.removeItem('coderzhub-user');
      } finally {
        setLoading(false);
        console.log('⏱️ Auth loading complete');
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};