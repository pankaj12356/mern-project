// src/pages/Auth/Register.jsx

import { useState, useContext, useEffect } from 'react';
import {
  TextField,
  Button,
  MenuItem,
  Typography,
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import { registerUser } from '../../services/authService';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const roles = ['student', 'employee', 'corporation'];

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    role: '',
    profileImage: null,
  });

  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profileImage') {
      const file = files[0];
      setFormData({ ...formData, profileImage: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.role || !formData.email.includes('@')) {
      setError('Please select a role and enter a valid email.');
      return;
    }

    setLoading(true);
    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) payload.append(key, value);
      });

      const res = await registerUser(payload);

      if (res.status === 201 && res.data?.user) {
        const patchedUser = {
          ...res.data.user,
          id: res.data.user.id || res.data.user._id,
        };
        login(patchedUser); // ✅ Set context immediately
        navigate('/user/dashboard'); // ✅ No reload needed
      } else {
        setError('Unexpected response from server.');
      }
    } catch (err) {
      console.error('❌ Registration failed:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#E7F2EF', display: 'flex', alignItems: 'center', justifyContent: 'center', px: 2 }}>
      <Card sx={{ maxWidth: 1000, width: '100%', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, overflow: 'hidden', boxShadow: 6 }}>
        {/* Left Side: Branding */}
        <Box sx={{ backgroundColor: '#A1C2BD', color: '#19183B', p: 4, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Join CoderzHub 🚀
          </Typography>
          <Typography variant="body1">
            Create your account to access ready-made tools, setup snippets, and contributor dashboards.
          </Typography>
          <Box sx={{ mt: 4 }}>
            <img src="/assets/signup-illustration.svg" alt="Signup" style={{ width: '100%' }} />
          </Box>
        </Box>

        {/* Right Side: Form */}
        <CardContent sx={{ flex: 1, p: 4 }}>
          <Typography variant="h5" fontWeight={600} align="center" gutterBottom>
            Create Your CoderzHub Account
          </Typography>

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>

              {/* Role Selection */}
              <Grid item xs={12}>
                <TextField
                  select
                  label="Select Your Role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  style={{ width: '180px' }}
                  required
                >
                  {roles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Profile Image Upload */}
              <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <input
                  type="file"
                  name="profileImage"
                  accept="image/*"
                  onChange={handleChange}
                  style={{ fontSize: '0.9rem' }}
                />
                {preview && <Avatar src={preview} alt="Preview" sx={{ width: 48, height: 48 }} />}
              </Grid>

              {/* Error Message */}
              {error && (
                <Grid item xs={12}>
                  <Typography variant="body2" color="error">
                    {error}
                  </Typography>
                </Grid>
              )}

              {/* Submit Button */}
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
                  {loading ? 'Registering...' : 'Register'}
                </Button>
              </Grid>

              {/* Sign-in Link */}
              <Grid item xs={12}>
                <Typography variant="body2" align="center">
                  Already have an account?{' '}
                  <Link to="/signin" style={{ color: '#6366f1', textDecoration: 'none' }}>
                    Sign in here
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Register;