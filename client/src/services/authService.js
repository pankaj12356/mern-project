import axios from 'axios';

// ✅ Ensure cookies (accessToken, refreshToken) are sent with every request
axios.defaults.withCredentials = true;

// ✅ Use environment variable for backend URL
const API = import.meta.env.VITE_BACKEND_URL + '/auth';

// 🔐 Register new user (multipart/form-data)
export const registerUser = async (formData) => {
  try {
    const response = await axios.post(`${API}/register`, formData);
    return response;
  } catch (error) {
    console.error('❌ Register error:', error.response?.data || error.message);
    throw error;
  }
};

// 🔐 Login user with credentials
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API}/login`, credentials);
    return response;
  } catch (error) {
    console.error('❌ Login error:', error.response?.data || error.message);
    throw error;
  }
};

// 🔍 Get current authenticated user
export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${API}/profile`);
    return response;
  } catch (error) {
    console.error('❌ Get user error:', error.response?.data || error.message);
    throw error;
  }
};

// 🚪 Logout user
export const logoutUser = async () => {
  try {
    const response = await axios.post(`${API}/logout`);
    return response;
  } catch (error) {
    console.error('❌ Logout error:', error.response?.data || error.message);
    throw error;
  }
};

// 🔄 Update password
export const updatePassword = async (data) => {
  try {
    const response = await axios.put(`${API}/update-password`, data);
    return response;
  } catch (error) {
    console.error('❌ Update password error:', error.response?.data || error.message);
    throw error;
  }
};

// 🧾 Update profile details
export const updateProfile = async (data) => {
  try {
    const response = await axios.put(`${API}/update-profile`, data);
    return response;
  } catch (error) {
    console.error('❌ Update profile error:', error.response?.data || error.message);
    throw error;
  }
};

// 🖼️ Update profile image (multipart/form-data)
export const updateProfileImage = async (formData) => {
  try {
    const response = await axios.put(`${API}/update-profile-image`, formData);
    return response;
  } catch (error) {
    console.error('❌ Update image error:', error.response?.data || error.message);
    throw error;
  }
};