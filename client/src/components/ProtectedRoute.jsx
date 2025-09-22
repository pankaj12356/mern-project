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
  const { user, loading } = useContext(AuthContext);

  // Wait for auth context to finish loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Checking access...</p>
      </div>
    );
  }

  // If no user is logged in, redirect to signin
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // If user's role is not allowed, redirect to home
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // If authorized, render the nested route
  return <Outlet />;
};

export default ProtectedRoute;