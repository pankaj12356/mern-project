import React, { useContext, useState, useEffect } from 'react';
import { Box, Typography, Divider, Paper } from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import Loader from '../../components/Loader';
import HeroBanner from '../../components/DashBoard/HeroBanner';
import ContributorCard from '../../components/DashBoard/ContributorCard';
import UpdateFields from '../../components/DashBoard/UpdateFields';
import QuickAccessGrid from '../../components/DashBoard/QuickAccessGrid';

const UserDashboard = () => {
  const { user, setUser, logout, loading } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', username: '',
    oldPassword: '', newPassword: '', confirmPassword: ''
  });

  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [avatarKey, setAvatarKey] = useState(Date.now()); // NEW

  useEffect(() => {
    if (user?.id) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        username: user.username || '',
        oldPassword: '', newPassword: '', confirmPassword: ''
      });
    }
  }, [user]);

  if (loading || !user?.id) {
    return <Loader message="Loading your dashboard..." fullScreen />;
  }

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout', {}, { withCredentials: true });
      logout();
    } catch (err) {
      console.error('❌ Logout failed:', err.message);
    }
  };

  const handleProfileUpdate = async () => {
    if (!formData.firstName || !formData.lastName || !formData.username)
      return setError('⚠️ All fields are required');

    setIsUpdating(true);
    setError('');
    try {
      const res = await axios.put('/api/auth/update-profile', formData, { withCredentials: true });
      const patched = { ...res.data.user, id: res.data.user.id || res.data.user._id };
      setUser(patched);
      alert('✅ Profile updated');
    } catch (err) {
      setError(err.response?.data?.message || 'Internal server error');
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePasswordUpdate = async () => {
    setIsUpdating(true);
    setError('');
    if (formData.newPassword !== formData.confirmPassword) {
      setError('❌ Passwords do not match');
      setIsUpdating(false);
      return;
    }
    try {
      await axios.put('/api/auth/update-password', {
        oldPassword: formData.oldPassword.trim(),
        newPassword: formData.newPassword
      }, { withCredentials: true });
      alert('🔐 Password updated');
      setFormData({ ...formData, oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setError(err.response?.data?.message || '❌ Password update failed');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleImageUpload = async () => {
    setIsUpdating(true);
    if (!image) {
      alert('Please select an image');
      setIsUpdating(false);
      return;
    }
    const form = new FormData();
    form.append('image', image);
    try {
      const res = await axios.put('/api/auth/update-profile-image', form, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const patched = {
        ...res.data.user,
        id: res.data.user.id || res.data.user._id
      };
      setUser(patched);
      setAvatarKey(Date.now()); // NEW: force avatar refresh
      alert('🖼️ Image updated');
    } catch (err) {
      setError('❌ Image upload failed');
    } finally {
      setIsUpdating(false);
    }
  };

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
          <HeroBanner user={user} />
        </Box>

        {/* ContributorCard + Manage Profile */}
        <Box sx={{
          display: 'flex',
          gap: 4,
          flexWrap: 'wrap',
          justifyContent: 'center',
          mb: 4
        }}>
          <Box sx={{ flex: 1, maxWidth: 600 }}>
            <Paper elevation={6} sx={{
              p: 4,
              borderRadius: 4,
              backgroundColor: '#A1C2BD',
              color: '#19183B',
            }}>
              <ContributorCard user={user} avatarKey={avatarKey} /> {/* UPDATED */}
            </Paper>
          </Box>

          <Box sx={{ flex: 1, maxWidth: 1300 }}>
            <Paper elevation={6} sx={{
              p: 4,
              borderRadius: 4,
              backgroundColor: '#A1C2BD',
              color: '#19183B',
              width: '650px'
            }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#708993' }}>
                ⚙️ Manage Your Profile
              </Typography>

              <UpdateFields
                formData={formData}
                setFormData={setFormData}
                image={image}
                setImage={setImage}
                error={error}
                handleProfileUpdate={handleProfileUpdate}
                handlePasswordUpdate={handlePasswordUpdate}
                handleImageUpload={handleImageUpload}
                isUpdating={isUpdating}
                user={user}
                logout={handleLogout}
              />

              {/* Contributor Tip Box */}
              <Box sx={{
                mt: 4,
                p: 2,
                borderRadius: 2,
                backgroundColor: '#DDEBE7',
                color: '#19183B',
                fontSize: '0.9rem',
              }}>
                <Typography fontWeight={500}>💡 Contributor Tip:</Typography>
                <Typography sx={{ mt: 0.5 }}>
                  Keep your profile updated to unlock personalized tools and insights.
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Box>

        {/* Quick Access */}
        <Divider sx={{ my: 4, borderColor: '#708993', backgroundColor: '#A1C2BD' }} />
        <QuickAccessGrid />
      </Box>
    </Box>
  );
};

export default UserDashboard;