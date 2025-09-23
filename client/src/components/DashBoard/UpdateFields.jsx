import React from 'react';
import {
  Collapse,
  Card,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';

const LoaderOverlay = () => (
  <Box
    sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      bgcolor: 'rgba(255,255,255,0.6)',
      zIndex: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <CircularProgress size={40} />
  </Box>
);

const UpdateFields = ({
  formData,
  setFormData,
  image,
  setImage,
  error,
  showProfileForm,
  showPasswordForm,
  showImageForm,
  handleProfileUpdate,
  handlePasswordUpdate,
  handleImageUpload,
  isUpdating,
  user, // ✅ passed from parent
}) => {
  const isFormReady = formData.firstName && formData.lastName && formData.username;
  const isSessionReady = user && user.id;

  return (
    <Box>
      {/* Profile Update Form */}
      <Collapse in={showProfileForm}>
        <Box sx={{ position: 'relative' }}>
          {isUpdating && <LoaderOverlay />}
          <Card className="shadow-sm p-6 mt-4">
            <Typography variant="h6" gutterBottom>Edit Profile</Typography>
            <TextField
              label="First Name"
              fullWidth
              margin="normal"
              value={formData.firstName}
              onChange={e => setFormData({ ...formData, firstName: e.target.value })}
            />
            <TextField
              label="Last Name"
              fullWidth
              margin="normal"
              value={formData.lastName}
              onChange={e => setFormData({ ...formData, lastName: e.target.value })}
            />
            <TextField
              label="Username"
              fullWidth
              margin="normal"
              value={formData.username}
              onChange={e => setFormData({ ...formData, username: e.target.value })}
            />
            {error && (
              <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={handleProfileUpdate}
              disabled={isUpdating || !isFormReady || !isSessionReady}
            >
              Save Changes
            </Button>
            {!isSessionReady && (
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                ⏳ Waiting for session to sync...
              </Typography>
            )}
          </Card>
        </Box>
      </Collapse>

      {/* Password Update Form */}
      <Collapse in={showPasswordForm}>
        <Box sx={{ position: 'relative' }}>
          {isUpdating && <LoaderOverlay />}
          <Card className="shadow-sm p-6 mt-4">
            <Typography variant="h6" gutterBottom>Change Password</Typography>
            <TextField
              label="Old Password"
              type="password"
              fullWidth
              margin="normal"
              value={formData.oldPassword}
              onChange={e => setFormData({ ...formData, oldPassword: e.target.value })}
            />
            <TextField
              label="New Password"
              type="password"
              fullWidth
              margin="normal"
              value={formData.newPassword}
              onChange={e => setFormData({ ...formData, newPassword: e.target.value })}
            />
            <TextField
              label="Confirm New Password"
              type="password"
              fullWidth
              margin="normal"
              value={formData.confirmPassword}
              onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
            />
            {error && (
              <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
            <Button
              variant="contained"
              color="warning"
              sx={{ mt: 2 }}
              onClick={handlePasswordUpdate}
              disabled={isUpdating}
            >
              Update Password
            </Button>
          </Card>
        </Box>
      </Collapse>

      {/* Image Upload Form */}
      <Collapse in={showImageForm}>
        <Box sx={{ position: 'relative' }}>
          {isUpdating && <LoaderOverlay />}
          <Card className="shadow-sm p-6 mt-4">
            <Typography variant="h6" gutterBottom>Update Profile Image</Typography>
            <Box sx={{ mb: 2 }}>
              <input
                type="file"
                accept="image/*"
                onChange={e => {
                  console.log('📁 Selected image:', e.target.files[0]);
                  setImage(e.target.files[0]);
                }}
                style={{ marginTop: '8px' }}
              />
            </Box>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleImageUpload}
              disabled={isUpdating}
            >
              Upload Image
            </Button>
          </Card>
        </Box>
      </Collapse>
    </Box>
  );
};

export default UpdateFields;