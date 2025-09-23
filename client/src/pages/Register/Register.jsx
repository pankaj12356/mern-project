import { useState, useContext } from 'react';
import {
  TextField,
  Button,
  MenuItem,
  Typography,
  Avatar,
  Box,
  Card,
  CardContent
} from '@mui/material';
import { registerUser, getCurrentUser } from '../../services/authService';
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
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

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

    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) payload.append(key, value);
      });

      const res = await registerUser(payload);

      if (res.status === 201 && res.data?.user) {
        alert(`✅ Welcome ${res.data.user.firstName}! Your account has been created.`);

        const profileRes = await getCurrentUser();
        login(profileRes.data.user.username, profileRes.data.user.role);

        navigate('/user/dashboard');
      } else {
        setError('Unexpected response from server.');
      }
    } catch (err) {
      console.error('❌ Registration failed:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Box className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <Card className="w-full max-w-5xl shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Left Side: Branding */}
        <Box className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-8 flex flex-col justify-center">
          <Typography variant="h4" fontWeight="bold" className="mb-2">
            Join CoderzHub 🚀
          </Typography>
          <Typography variant="body1">
            Create your account to access tools, dashboards, and developer insights.
          </Typography>
          <Box className="mt-6">
            <img src="/assets/signup-illustration.svg" alt="Signup" className="w-full" />
          </Box>
        </Box>

        {/* Right Side: Form */}
        <CardContent className="p-8 space-y-4">
          <Typography variant="h5" className="text-center font-semibold text-gray-800">
            Create Your CoderzHub Account
          </Typography>

          <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
            <Box className="flex gap-4">
              <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                fullWidth
                required
              />
            </Box>

            <TextField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              fullWidth
              required
            />

            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
            />

            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
            />

            <TextField
              select
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              fullWidth
              required
            >
              {roles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </MenuItem>
              ))}
            </TextField>

            <Box className="flex items-center gap-4">
              <input
                type="file"
                name="profileImage"
                accept="image/*"
                onChange={handleChange}
                className="block w-full text-sm text-gray-600"
              />
              {preview && <Avatar src={preview} alt="Preview" sx={{ width: 48, height: 48 }} />}
            </Box>

            {error && (
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            )}

            <Button type="submit" variant="contained" color="primary" fullWidth>
              Register
            </Button>

            <Typography variant="body2" className="text-center mt-2">
              Already have an account?{' '}
              <Link to="/signin" className="text-blue-600 hover:underline">
                Sign in here
              </Link>
            </Typography>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Register;