// src/hooks/useRole.js

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

/**
 * Custom hook to get current user's role
 * @returns {string|null} role
 */
const useRole = () => {
  const { user } = useContext(AuthContext);
  return user?.role || null;
};

export default useRole;