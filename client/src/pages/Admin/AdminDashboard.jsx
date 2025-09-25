import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper, Button, CircularProgress } from '@mui/material';
import { fetchAllUsers } from '../../services/adminService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loader from '../../components/Loader';
import HeroBanner from '../../components/DashBoard/HeroBanner';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllUsers({ page: 1, limit: 100 })
      .then((data) => setUsers(data.users))
      .catch(() => toast.error('Failed to load contributors'))
      .finally(() => setLoadingUsers(false));
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout', {}, { withCredentials: true });
      navigate('/signin');
    } catch (err) {
      toast.error('Logout failed');
    }
  };

  const visibleUsers = users.filter((u) => u.isActive !== false);

  if (loadingUsers) {
    return <Loader message="Loading admin dashboard..." fullScreen />;
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#E7F2EF', p: 4 }}>
      <Box sx={{ maxWidth: '1600px', mx: 'auto' }}>
        {/* Hero Banner */}
        <Box sx={{
          mb: 3,
          p: 3,
          borderRadius: 4,
          background: '#A1C2BD',
          boxShadow: '0 0 20px rgba(0,0,0,0.4)',
          color: '#fff'
        }}>
          <HeroBanner user={{ username: 'CoderzHubAdmin' }} />
        </Box>

        {/* Header */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4
        }}>
          <Typography variant="h4" fontWeight={600} sx={{ color: '#19183B' }}>
            Admin Dashboard 🛠️
          </Typography>
          <Button variant="outlined" sx={{
            borderColor: '#708993',
            color: '#708993',
            '&:hover': { backgroundColor: '#DDEBE7' }
          }} onClick={handleLogout}>
            Logout
          </Button>
        </Box>

        {/* 📊 Total Contributors */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, backgroundColor: '#A1C2BD', color: '#19183B' }}>
              <Typography variant="h6">👥 Total Contributors</Typography>
              <Typography variant="h4" sx={{ color: '#708993', mt: 2 }}>
                {visibleUsers.length}
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* 🚀 Quick Access */}
        <Typography variant="h6" sx={{ mb: 2, color: '#19183B' }}>
          🚀 Quick Access
        </Typography>
        <Grid container spacing={3}>
          {[
            { label: 'Manage Users', path: '/admin/users', desc: 'Create, edit, or delete contributor accounts.' },
            { label: 'Manage Tools', path: '/admin/tools', desc: 'Access tools and resources.' },
            { label: 'Code & Config', path: '/admin/code', desc: 'Access backend settings and platform logic.' }
          ].map(({ label, path, desc }) => (
            <Grid item xs={12} md={4} key={label}>
              <Paper elevation={2} sx={{
                p: 3,
                backgroundColor: '#DDEBE7',
                color: '#19183B',
                cursor: 'pointer',
                '&:hover': { backgroundColor: '#A1C2BD' }
              }} onClick={() => navigate(path)}>
                <Typography variant="subtitle1">{label}</Typography>
                <Typography variant="body2" sx={{ color: '#708993' }}>
                  {desc}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminDashboard;