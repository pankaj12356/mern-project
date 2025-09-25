import { useState, useContext } from 'react';
import { TextField, Button, Typography, Box, Card, CardContent } from '@mui/material';
import { loginUser } from '../../services/authService';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await loginUser({ identifier: email.trim(), password: password.trim() });
      login(res.data.user);
      navigate(res.data.user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="min-h-screen flex items-center justify-center px-4 bg-gray-100">
      <Card className="max-w-md w-full shadow-lg">
        <CardContent className="p-6 space-y-4">
          <Typography variant="h5" className="text-center font-semibold">Sign In</Typography>
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth required />
            <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth required />
            {error && <Typography color="error">{error}</Typography>}
            <Button type="submit" variant="contained" fullWidth disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
            <Typography variant="body2" className="text-center">
              Don’t have an account? <Link to="/register">Register here</Link>
            </Typography>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Signin;