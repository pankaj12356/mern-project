import React, { useContext, useState, useEffect } from 'react';
import { Box, Divider, Button } from '@mui/material';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import Loader from '../../components/Loader';

import WelcomeSection from '../../components/DashBoard/WelcomeSection';
import ProfileCard from '../../components/DashBoard/ProfileCard';
import UpdateFields from '../../components/DashBoard/UpdateFields';
import ExtraPartsSection from '../../components/DashBoard/ExtraPartsSection';

const UserDashboard = () => {
  const { user, setUser, logout, loading } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [formReady, setFormReady] = useState(false);
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showImageForm, setShowImageForm] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        username: user.username || '',
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setFormReady(true); // ✅ mark form as ready
    }
  }, [user]);

  // ✅ Guard: Wait for session and formData to be ready
  if (loading || !user || !formReady) {
    console.log('⏳ Waiting for user and formData to sync...');
    return <Loader message="Preparing dashboard..." fullScreen />;
  }

  if (!user) return <Navigate to="/signin" replace />;

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout', {}, { withCredentials: true });
      logout();
    } catch (err) {
      console.error('❌ Logout failed:', err.message);
    }
  };

  const handleProfileUpdate = async () => {
    if (!user || !user.id) {
      setError('❌ User session not ready. Please try again.');
      return;
    }

    setIsUpdating(true);
    setError('');
    console.log('📦 Sending update:', formData);

    try {
      const res = await axios.put('/api/auth/update-profile', formData, {
        withCredentials: true,
      });

      if (res.data.user && typeof setUser === 'function') {
        setUser(res.data.user);
        alert('✅ Profile updated');
      } else {
        setError('⚠️ Unexpected response format');
      }
    } catch (err) {
      setError(err.response?.data?.message || '❌ Profile update failed');
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePasswordUpdate = async () => {
    setIsUpdating(true);
    setError('');

    if (formData.newPassword !== formData.confirmPassword) {
      setError('❌ New password and confirm password do not match');
      setIsUpdating(false);
      return;
    }

    try {
      await axios.put(
        '/api/auth/update-password',
        {
          oldPassword: formData.oldPassword.trim(),
          newPassword: formData.newPassword,
        },
        { withCredentials: true }
      );
      alert('🔐 Password updated');
      setFormData({
        ...formData,
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
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

      if (res.data.user && typeof setUser === 'function') {
        setUser(res.data.user);
        alert('🖼️ Image updated');
      }
    } catch (err) {
      setError('❌ Image upload failed');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Box className="min-h-screen bg-gray-50 p-6">
      <Box className="max-w-6xl mx-auto space-y-8">
        <WelcomeSection user={user} />
        <ProfileCard user={user} />

        <Box className="flex flex-wrap gap-4">
          <Button variant="contained" onClick={() => setShowProfileForm(!showProfileForm)}>
            Edit Profile
          </Button>
          <Button variant="contained" color="warning" onClick={() => setShowPasswordForm(!showPasswordForm)}>
            Change Password
          </Button>
          <Button variant="contained" color="secondary" onClick={() => setShowImageForm(!showImageForm)}>
            Update Image
          </Button>
          <Button variant="outlined" color="error" onClick={handleLogout}>
            Logout
          </Button>
        </Box>

        <UpdateFields
          formData={formData}
          setFormData={setFormData}
          image={image}
          setImage={setImage}
          error={error}
          showProfileForm={showProfileForm}
          showPasswordForm={showPasswordForm}
          showImageForm={showImageForm}
          handleProfileUpdate={handleProfileUpdate}
          handlePasswordUpdate={handlePasswordUpdate}
          handleImageUpload={handleImageUpload}
          isUpdating={isUpdating}
        />

        <Divider />
        <ExtraPartsSection />
      </Box>
    </Box>
  );
};

export default UserDashboard;