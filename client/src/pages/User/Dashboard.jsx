import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Typography, Card, CardContent, Avatar, Button, TextField } from '@mui/material';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const UserDashboard = () => {
  const { user, logout, loading } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    firstname: user?.firstname || '',
    lastname: user?.lastname || '',
    username: user?.username || '',
    oldPassword: '',
    newPassword: '',
  });
  const [image, setImage] = useState(null);

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout', {}, { withCredentials: true });
      logout();
    } catch (err) {
      console.error('❌ Logout failed:', err.message);
    }
  };

  const handleProfileUpdate = async () => {
    try {
      await axios.put('/api/auth/update-profile', formData, { withCredentials: true });
      alert('✅ Profile updated');
    } catch (err) {
      console.error('❌ Profile update failed:', err.message);
    }
  };

  const handlePasswordUpdate = async () => {
    try {
      await axios.put('/api/auth/update-password', {
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      }, { withCredentials: true });
      alert('🔐 Password updated');
    } catch (err) {
      console.error('❌ Password update failed:', err.message);
    }
  };

  const handleImageUpload = async () => {
    if (!image) return alert('Please select an image');
    const form = new FormData();
    form.append('image', image);

    try {
      const res = await axios.put('/api/auth/update-profile-image', form, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('🖼️ Image updated');
    } catch (err) {
      console.error('❌ Image upload failed:', err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Typography variant="h6" color="textSecondary">Loading dashboard...</Typography>
      </div>
    );
  }

  if (!user) return <Navigate to="/signin" replace />;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Typography variant="h4" className="text-gray-800 font-semibold">
          Welcome, {user.firstname || user.username} 👋
        </Typography>

        <Card className="shadow-md">
          <CardContent className="flex items-center gap-6">
            <Avatar src={user.profileImage} alt={user.username} sx={{ width: 64, height: 64 }} />
            <div>
              <Typography variant="h6">{user.username}</Typography>
              <Typography variant="body2">{user.email}</Typography>
              <Typography variant="body2">Role: {user.role}</Typography>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm p-4 space-y-4">
          <Typography variant="h6">Update Profile</Typography>
          <TextField label="First Name" fullWidth value={formData.firstname} onChange={e => setFormData({ ...formData, firstname: e.target.value })} />
          <TextField label="Last Name" fullWidth value={formData.lastname} onChange={e => setFormData({ ...formData, lastname: e.target.value })} />
          <TextField label="Username" fullWidth value={formData.username} onChange={e => setFormData({ ...formData, username: e.target.value })} />
          <Button variant="contained" onClick={handleProfileUpdate}>Save Profile</Button>
        </Card>

        <Card className="shadow-sm p-4 space-y-4">
          <Typography variant="h6">Change Password</Typography>
          <TextField label="Old Password" type="password" fullWidth value={formData.oldPassword} onChange={e => setFormData({ ...formData, oldPassword: e.target.value })} />
          <TextField label="New Password" type="password" fullWidth value={formData.newPassword} onChange={e => setFormData({ ...formData, newPassword: e.target.value })} />
          <Button variant="contained" color="warning" onClick={handlePasswordUpdate}>Update Password</Button>
        </Card>

        <Card className="shadow-sm p-4 space-y-4">
          <Typography variant="h6">Update Profile Image</Typography>
          <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} />
          <Button variant="contained" color="secondary" onClick={handleImageUpload}>Upload Image</Button>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleLogout} color="error" variant="outlined">Logout</Button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;