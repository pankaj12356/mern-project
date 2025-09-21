// src/layout/RootLayout.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Container } from '@mui/material';

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Shared top navigation */}
      <Navbar />

      {/* Main content area */}
      <Container maxWidth="lg" className="flex-grow py-6">
        <Outlet /> {/* This renders the nested route content */}
      </Container>

      {/* Shared footer */}
      <Footer />
    </div>
  );
};

export default RootLayout;