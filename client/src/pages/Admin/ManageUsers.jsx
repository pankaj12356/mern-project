import React, { useEffect, useState } from 'react';
import { Box, Typography, Card } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { fetchAllUsers, deleteUserById } from '../../services/adminService';
import AdminUserCard from '../../components/AdminUserCards';
import ConfirmModal from '../../components/ConfirmModal';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';

ChartJS.register(ArcElement, Tooltip, Legend);

const StatCard = ({ label, value, icon }) => (
  <Card sx={{ p: 2, borderRadius: 2, boxShadow: 2, minWidth: 150, textAlign: 'center', backgroundColor: '#F4F7F6' }}>
    <Typography variant="h5">{icon}</Typography>
    <Typography variant="h6" fontWeight={600} sx={{ color: '#19183B' }}>{value}</Typography>
    <Typography variant="body2" color="textSecondary">{label}</Typography>
  </Card>
);

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchAllUsers({ page: 1, limit: 50 })
      .then((data) => setUsers(data.users))
      .catch(() => toast.error('Failed to load users'))
      .finally(() => setLoading(false));
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUserById(userId);
      toast.success('🗑️ User deleted');
      setUsers((prev) => prev.filter((u) => u._id !== userId));
      setSelectedUser(null);
    } catch {
      toast.error('Failed to delete user');
    }
  };

  const visibleUsers = users.filter((u) => u.isActive !== false);
  const roleCounts = visibleUsers.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {});

  const roleColors = {
    student: '#2196F3',
    employee: '#9C27B0',
    corporation: '#FF9800',
    admin: '#4CAF50',
  };

  const activeRoles = Object.keys(roleCounts).filter((role) => roleCounts[role] > 0);
  const pieData = {
    labels: activeRoles,
    datasets: [
      {
        data: activeRoles.map((role) => roleCounts[role]),
        backgroundColor: activeRoles.map((role) => roleColors[role]),
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  if (loading) return <Loader message="Loading contributor profiles..." fullScreen />;

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#E7F2EF', p: 4 }}>
      <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
        <Typography variant="h4" fontWeight={600} sx={{ mb: 4, color: '#19183B', textAlign: 'center' }}>
          👥 Contributor Profiles
        </Typography>

        {/* 🎯 Role Distribution Chart */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant="h6" fontWeight={500} sx={{ mb: 2, color: '#333' }}>
            🎯 Role Distribution
          </Typography>
          <Box sx={{ maxWidth: 400, mx: 'auto' }}>
            <Pie data={pieData} />
          </Box>
        </Box>

        {/* 📊 Stats */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6, flexWrap: 'wrap', gap: 2 }}>
          <StatCard label="Total Contributors" value={visibleUsers.length} icon="👥" />
          <StatCard label="Students" value={roleCounts.student || 0} icon="🎓" />
          <StatCard label="Employees" value={roleCounts.employee || 0} icon="💼" />
          <StatCard label="Corporations" value={roleCounts.corporation || 0} icon="🏢" />
          {roleCounts.admin > 0 && <StatCard label="Admins" value={roleCounts.admin} icon="🛡️" />}
        </Box>

        {/* 👤 User Cards */}
        {visibleUsers.map((user) => (
          <AdminUserCard key={user._id} user={user} onRequestDelete={() => setSelectedUser(user)} />
        ))}

        {/* 🧾 Confirmation Modal */}
        <ConfirmModal
          user={selectedUser}
          onCancel={() => setSelectedUser(null)}
          onConfirm={() => handleDeleteUser(selectedUser._id)}
        />
      </Box>
    </Box>
  );
};

export default ManageUsers;