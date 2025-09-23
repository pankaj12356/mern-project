import React, { createContext, useState, useEffect } from 'react';
import { getCurrentUser } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (userData) => {
    const patchedUser = {
      ...userData,
      id: userData.id || userData._id, // ✅ Ensure `id` is present
    };
    setUser(patchedUser);
    localStorage.setItem('coderzhub-user', JSON.stringify(patchedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('coderzhub-user');
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getCurrentUser();
        const patchedUser = {
          ...res.data.user,
          id: res.data.user.id || res.data.user._id, // ✅ Patch `id`
        };
        setUser(patchedUser);
        localStorage.setItem('coderzhub-user', JSON.stringify(patchedUser));
      } catch (err) {
        const cached = localStorage.getItem('coderzhub-user');
        if (cached) {
          try {
            const parsed = JSON.parse(cached);
            const patched = {
              ...parsed,
              id: parsed.id || parsed._id,
            };
            setUser(patched);
          } catch {
            localStorage.removeItem('coderzhub-user');
          }
        } else {
          setUser(null);
        }
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