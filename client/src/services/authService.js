import axios from 'axios';

// Ensure cookies (accessToken, refreshToken) are sent with every request
axios.defaults.withCredentials = true;

const API = '/api/auth'; // Vite proxy will forward this to your backend

// 🔐 Register new user (multipart/form-data)
export const registerUser = async (formData) => {
  try {
    const response = await axios.post(`${API}/register`, formData);
    return response;
  } catch (error) {
    throw error;
  }
};

// 🔐 Login user with credentials
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API}/login`, credentials);
    return response;
  } catch (error) {
    throw error;
  }
};

// 🔍 Get current authenticated user
export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${API}/profile`);
    return response;
  } catch (error) {
    throw error;
  }
};

// 🚪 Logout user
export const logoutUser = async () => {
  try {
    const response = await axios.post(`${API}/logout`);
    return response;
  } catch (error) {
    throw error;
  }
};

// 🔄 Update password
export const updatePassword = async (data) => {
  try {
    const response = await axios.put(`${API}/update-password`, data);
    return response;
  } catch (error) {
    throw error;
  }
};

// 🧾 Update profile details
export const updateProfile = async (data) => {
  try {
    const response = await axios.put(`${API}/update-profile`, data);
    return response;
  } catch (error) {
    throw error;
  }
};

// 🖼️ Update profile image (multipart/form-data)
export const updateProfileImage = async (formData) => {
  try {
    const response = await axios.put(`${API}/update-profile-image`, formData);
    return response;
  } catch (error) {
    throw error;
  }
};