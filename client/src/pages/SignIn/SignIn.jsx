import { useState, useContext } from 'react';
import { TextField, Button, Typography, Box, Card, CardContent } from '@mui/material';
import { loginUser } from '../../services/authService';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Signin = () => {
  const [credentials, setCredentials] = useState({ identifier: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await loginUser(credentials);
      setUser(res.data.user);
      navigate(res.data.user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard');
    } catch (err) {
      console.error('❌ Login error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Box className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <Card className="w-full max-w-5xl shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Left Side: Branding or Illustration */}
        <Box className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-8 flex flex-col justify-center">
          <Typography variant="h4" fontWeight="bold" className="mb-2">
            Welcome Back 👋
          </Typography>
          <Typography variant="body1">
            Sign in to access your dashboard, tools, and developer insights.
          </Typography>
          <Box className="mt-6">
            <img src="/assets/login-illustration.svg" alt="Login" className="w-full" />
          </Box>
        </Box>

        {/* Right Side: Login Form */}
        <CardContent className="p-8 space-y-4">
          <Typography variant="h5" className="text-center font-semibold text-gray-800">
            Sign In to CoderzHub
          </Typography>

          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField
              label="Email or Username"
              name="identifier"
              value={credentials.identifier}
              onChange={handleChange}
              fullWidth
              required
            />

            <TextField
              label="Password"
              name="password"
              type="password"
              value={credentials.password}
              onChange={handleChange}
              fullWidth
              required
            />

            {error && (
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            )}

            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>

            <Typography variant="body2" className="text-center mt-2">
              Don’t have an account?{' '}
              <Link to="/register" className="text-blue-600 hover:underline">
                Register here
              </Link>
            </Typography>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Signin;