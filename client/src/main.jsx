// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Main app component with routes
import './index.css';    // Tailwind CSS directives
import { AuthProvider } from './context/AuthContext'; // Global auth context
import { CssBaseline } from '@mui/material'; // MUI baseline styles

// Create root element using React 18's createRoot API
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app inside the root element
root.render(
  <React.StrictMode>
    {/* MUI baseline resets default browser styles */}
    <CssBaseline />

    {/* AuthProvider wraps the app to provide user/token context */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);