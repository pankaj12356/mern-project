import axios from 'axios';

// 🌐 Backend base URL from environment
const API = `${import.meta.env.VITE_BACKEND_URL}/admin`;
console.log('🌐 [AdminServices] API Base:', API);

// 📊 Fetch dashboard stats
export const fetchDashboardStats = async () => {
  try {
    const response = await axios.get(`${API}/dashboard`, {
      withCredentials: true,
    });
    console.log('📊 [AdminServices] Dashboard stats:', response.data.stats);
    return response.data.stats;
  } catch (err) {
    console.error(
      '❌ [AdminServices] Failed to fetch dashboard stats:',
      err.response?.status,
      err.message
    );
    throw err;
  }
};

// 👥 Fetch all users with optional role filter and pagination
export const fetchAllUsers = async ({ page = 1, limit = 20, role = '' }) => {
  try {
    const response = await axios.get(`${API}/users`, {
      params: { page, limit, role },
      withCredentials: true,
    });
    console.log('📦 [AdminServices] Users fetched:', response.data.users);
    return response.data;
  } catch (err) {
    console.error(
      '❌ [AdminServices] Failed to fetch users:',
      err.response?.status,
      err.message
    );
    throw err;
  }
};

// 📊 Fetch user count only (for dashboard)
export const fetchUserCount = async () => {
  try {
    const response = await axios.get(`${API}/users`, {
      params: { countOnly: true },
      withCredentials: true,
    });
    console.log('📊 [AdminServices] User count:', response.data.total);
    return response.data.total;
  } catch (err) {
    console.error(
      '❌ [AdminServices] Failed to fetch user count:',
      err.response?.status,
      err.message
    );
    throw err;
  }
};

// 🗑️ Soft delete user by ID
export const deleteUserById = async (userId) => {
  try {
    const response = await axios.delete(`${API}/users/${userId}`, {
      withCredentials: true,
    });
    console.log(`🗑️ [AdminServices] User ${userId} deleted`);
    return response.data;
  } catch (err) {
    console.error(
      `❌ [AdminServices] Failed to delete user ${userId}:`,
      err.response?.status,
      err.message
    );
    throw err;
  }
};