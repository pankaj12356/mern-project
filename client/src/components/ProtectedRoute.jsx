import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CircularProgress, Box, Typography } from '@mui/material';

/**
 * ProtectedRoute component
 * Wraps routes that require authentication and role-based access.
 *
 * @param {Array} allowedRoles - Array of roles allowed to access this route
 * @returns {JSX.Element} - Either the nested route or a redirect to login/home
 */
const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);

  // Show loading spinner while auth is initializing
  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress color="primary" />
        <Typography sx={{ mt: 2, color: '#475569' }}>Checking access...</Typography>
      </Box>
    );
  }

  // If no user is logged in, redirect to signin
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // If user's role is missing or not allowed, redirect to home
  if (!user.role || !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // Authorized: render nested route
  return <Outlet />;
};

export default ProtectedRoute;