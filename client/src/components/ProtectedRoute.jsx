// src/components/ProtectedRoute.jsx

import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

/**
 * ProtectedRoute component
 * Wraps routes that require authentication and role-based access.
 *
 * @param {Array} allowedRoles - Array of roles allowed to access this route
 * @returns {JSX.Element} - Either the nested route or a redirect to login
 */
const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useContext(AuthContext);

  // If no user is logged in, redirect to login
  if (!user || !user.token) {
    return <Navigate to="/" replace />;
  }

  // If user's role is not allowed, redirect to login
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // If authorized, render the nested route
  return <Outlet />;
};

export default ProtectedRoute;