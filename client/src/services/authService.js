// src/services/authService.js

import axios from 'axios';

const API = 'http://localhost:4000/api/auth'; // Update when backend is ready

export const loginUser = async (credentials) => {
  // Replace with real API call later
  return {
    username: credentials.username,
    role: credentials.username === 'admin' ? 'admin' : 'user',
    token: 'demo-token',
  };
};

export const registerUser = async (data) => {
  // Replace with real API call later
  return {
    message: 'User registered successfully',
  };
};