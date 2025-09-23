import React, { useContext, useState, useEffect } from 'react';
import { Box, Divider, Button } from '@mui/material';
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

  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showImageForm, setShowImageForm] = useState(false);

  // ✅ Sync form data once user is ready
  useEffect(() => {
    if (user?.id) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        username: user.username || '',
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    }
  }, [user]);

  // ✅ Guard: Wait for session to hydrate
  if (loading || !user?.id) {
    console.log('⏳ Waiting for session to sync...');
    return <Loader message="Preparing dashboard..." fullScreen />;
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
    if (!user?.id) {
      setError('⏳ Session not ready. Please wait and try again.');
      return;
    }

    if (!formData.firstName || !formData.lastName || !formData.username) {
      setError('⚠️ All fields are required');
      return;
    }

    setIsUpdating(true);
    setError('');

    try {
      const res = await axios.put('/api/auth/update-profile', formData, {
        withCredentials: true,
      });

      const patched = {
        ...res.data.user,
        id: res.data.user.id || res.data.user._id,
      };
      setUser(patched);
      alert('✅ Profile updated');
    } catch (err) {
      console.error('❌ Update failed:', err.message);
      setError(err.response?.data?.message || 'Internal server error');
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

      const patched = {
        ...res.data.user,
        id: res.data.user.id || res.data.user._id,
      };
      setUser(patched);
      alert('🖼️ Image updated');
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
          user={user}
        />

        <Divider />
        <ExtraPartsSection />
      </Box>
    </Box>
  );
};

export default UserDashboard;