// src/components/Navbar.jsx

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';
import {
  Code,
  Build,
  Login,
  PersonAdd,
  Dashboard,
  AccountCircle,
  Psychology,
} from '@mui/icons-material';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, loading } = useContext(AuthContext);

  return (
    <AppBar
      position="sticky"
      elevation={3}
      sx={{
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderBottom: '1px solid #e0e0e0',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: 4 }}>
        {/* Left: Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            style={{
              textDecoration: 'none',
              color: '#3f51b5',
              fontWeight: 'bold',
            }}
          >
            CoderzHub
          </Typography>
        </Box>

        {/* Center: Navigation */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button component={Link} to="/tools" startIcon={<Build />} sx={{ color: '#333' }}>
            Tools
          </Button>
          <Button component={Link} to="/code" startIcon={<Code />} sx={{ color: '#333' }}>
            Code
          </Button>
          <Button component={Link} to="/about" startIcon={<Psychology />} sx={{ color: '#333' }}>
            About
          </Button>

          {!loading && !user && (
            <>
              <Button component={Link} to="/signin" startIcon={<Login />} sx={{ color: '#333' }}>
                Sign In
              </Button>
              <Button component={Link} to="/register" startIcon={<PersonAdd />} sx={{ color: '#333' }}>
                Register
              </Button>
            </>
          )}
        </Box>

        {/* Right: Greeting + Dashboard */}
        {!loading && user && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AccountCircle sx={{ color: '#333' }} />
              <Typography sx={{ color: '#333', fontWeight: 500 }}>
                Hey {user.firstName || user.username} 👋
              </Typography>
            </Box>
            <Button
              variant="contained"
              size="small"
              component={Link}
              to={user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard'}
              startIcon={<Dashboard />}
              sx={{ textTransform: 'none' }}
            >
              Dashboard
            </Button>
          </Box>
        )}

        {/* Optional: Loading Spinner */}
        {loading && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CircularProgress size={20} color="inherit" />
            <Typography variant="body2" sx={{ color: '#333' }}>
              Loading...
            </Typography>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;