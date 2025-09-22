import { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { loginUser } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Signin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
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
      setUser(res.data.user); // assuming backend returns user object
      navigate(res.data.user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard');
    } catch (err) {
      console.error('❌ Login error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-md space-y-4"
      >
        <Typography variant="h5" className="text-center font-semibold text-gray-800">
          Sign In to CoderzHub
        </Typography>

        <TextField
          label="Username"
          name="username"
          value={credentials.username}
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
      </form>
    </div>
  );
};

export default Signin;