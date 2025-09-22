// src/components/Navbar.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar className="flex justify-between">
        <Typography variant="h6" component="div">
          CoderzHub
        </Typography>

        <div className="space-x-4">
          {/* Demo links for navigation */}
          <Button color="inherit" component={Link} to="/user/dashboard">
            User
          </Button>
          <Button color="inherit" component={Link} to="/admin/dashboard">
            Admin
          </Button>
          <Button color="inherit" component={Link} to="/tools/uuid">
            Tools
          </Button>
          <Button color="inherit" component={Link} to="user/dashboard">
            dashboard
          </Button>
          <Button color="inherit" component={Link} to="signin">
            Sign In
          </Button>
          <Button color="inherit" component={Link} to="register">
            Register
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;