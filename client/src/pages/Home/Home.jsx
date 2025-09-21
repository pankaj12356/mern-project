// src/pages/Home/Home.jsx

import React from 'react';
import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
      <Typography variant="h4" className="mb-4 font-bold text-indigo-700">
        Welcome to CoderzHub 👋
      </Typography>
      <Typography variant="body1" className="mb-6 text-gray-600 max-w-xl">
        Explore developer tools, dashboards, and more—no login required.
      </Typography>
      <div className="flex gap-4">
        <Button variant="contained" color="primary" component={Link} to="/tools/uuid">
          Try a Tool
        </Button>
        <Button variant="outlined" color="secondary" component={Link} to="/user/dashboard">
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default Home;