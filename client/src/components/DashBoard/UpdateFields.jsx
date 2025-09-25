import {
  Collapse,
  Card,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress
} from '@mui/material';
import { useState } from 'react';

const LoaderOverlay = () => (
  <Box
    sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      bgcolor: 'rgba(0,0,0,0.4)',
      zIndex: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <CircularProgress size={40} color="secondary" />
  </Box>
);

const UpdateFields = ({
  formData,
  setFormData,
  image,
  setImage,
  error,
  handleProfileUpdate,
  handlePasswordUpdate,
  handleImageUpload,
  isUpdating,
  user,
  logout
}) => {
  const [visibleSection, setVisibleSection] = useState(null);
  const isFormReady = formData.firstName && formData.lastName && formData.username;
  const isSessionReady = user && user.id;

  const textFieldStyles = {
    input: { color: '#19183B' },
    label: { color: '#475569' },
    '& .MuiFilledInput-root': {
      backgroundColor: '#f1f5f9',
      '&:hover': { backgroundColor: '#e2e8f0' },
      '&.Mui-focused': { backgroundColor: '#e2e8f0' }
    }
  };

  const cardStyles = {
    p: 4,
    mt: 2,
    borderRadius: 3,
    backgroundColor: '#ffffff',
    color: '#19183B',
    boxShadow: 6,
    position: 'relative'
  };

  const toggleSection = (section) => {
    setVisibleSection(prev => (prev === section ? null : section));
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
      {/* Button Row */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, mt: 3, justifyContent: 'center' }}>
        <Button variant="contained" onClick={() => toggleSection('profile')}>EDIT INFO</Button>
        <Button variant="contained" color="warning" onClick={() => toggleSection('password')}>CHANGE PASSWORD</Button>
        <Button variant="contained" color="secondary" onClick={() => toggleSection('image')}>UPDATE IMAGE</Button>
        <Button variant="outlined" color="error" onClick={logout}>LOGOUT</Button>
      </Box>

      {/* Profile Update */}
      <Collapse in={visibleSection === 'profile'}>
        <Card sx={cardStyles}>
          {isUpdating && <LoaderOverlay />}
          <Typography variant="h6" gutterBottom sx={{
            background: 'linear-gradient(to right, #4f46e5, #7c3aed)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 600
          }}>
            ✏️ Edit Profile
          </Typography>

          <TextField
            label="First Name"
            variant="filled"
            fullWidth
            margin="normal"
            value={formData.firstName}
            onChange={e => setFormData({ ...formData, firstName: e.target.value })}
            helperText="Your given name"
            sx={textFieldStyles}
          />
          <TextField
            label="Last Name"
            variant="filled"
            fullWidth
            margin="normal"
            value={formData.lastName}
            onChange={e => setFormData({ ...formData, lastName: e.target.value })}
            helperText="Your family name"
            sx={textFieldStyles}
          />
          <TextField
            label="Username"
            variant="filled"
            fullWidth
            margin="normal"
            value={formData.username}
            onChange={e => setFormData({ ...formData, username: e.target.value })}
            helperText="Unique identifier"
            sx={textFieldStyles}
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
        </Card>
      </Collapse>

      {/* Password Update */}
      <Collapse in={visibleSection === 'password'}>
        <Card sx={cardStyles}>
          {isUpdating && <LoaderOverlay />}
          <Typography variant="h6" gutterBottom sx={{
            background: 'linear-gradient(to right, #f59e0b, #f97316)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 600
          }}>
            🔐 Change Password
          </Typography>

          <TextField
            label="Old Password"
            type="password"
            variant="filled"
            fullWidth
            margin="normal"
            value={formData.oldPassword}
            onChange={e => setFormData({ ...formData, oldPassword: e.target.value })}
            sx={textFieldStyles}
          />
          <TextField
            label="New Password"
            type="password"
            variant="filled"
            fullWidth
            margin="normal"
            value={formData.newPassword}
            onChange={e => setFormData({ ...formData, newPassword: e.target.value })}
            helperText="Minimum 6 characters"
            sx={textFieldStyles}
          />
          <TextField
            label="Confirm New Password"
            type="password"
            variant="filled"
            fullWidth
            margin="normal"
            value={formData.confirmPassword}
            onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
            sx={textFieldStyles}
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
      </Collapse>

      {/* Image Upload */}
      <Collapse in={visibleSection === 'image'}>
        <Card sx={cardStyles}>
          {isUpdating && <LoaderOverlay />}
          <Typography variant="h6" gutterBottom sx={{
            background: 'linear-gradient(to right, #ec4899, #f43f5e)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 600
          }}>
            🖼️ Update Profile Image
          </Typography>

          <Box sx={{ mb: 2 }}>
            <input
              type="file"
              accept="image/*"
              onChange={e => setImage(e.target.files[0])}
              style={{ marginTop: '8px', color: '#19183B' }}
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
      </Collapse>
    </Box>
  );
};

export default UpdateFields;