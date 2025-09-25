import React, { createContext, useState, useEffect } from 'react';
import { getCurrentUser } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const patchUser = (raw) => ({
    ...raw,
    id: raw?.id || raw?._id || null,
  });

  const login = (userData) => {
    const patched = patchUser(userData);
    setUser(patched);
    localStorage.setItem('coderzhub-user', JSON.stringify(patched));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('coderzhub-user');
  };

  const restoreFromCache = () => {
    const cached = localStorage.getItem('coderzhub-user');
    if (!cached) return null;
    try {
      const parsed = JSON.parse(cached);
      return patchUser(parsed);
    } catch {
      localStorage.removeItem('coderzhub-user');
      return null;
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getCurrentUser(); // ✅ Validates token
        const patched = patchUser(res.data.user);
        setUser(patched);
        localStorage.setItem('coderzhub-user', JSON.stringify(patched));
      } catch {
        logout(); // ✅ Clear stale session if token fails
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};