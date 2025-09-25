import { useState, useContext } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import { loginUser } from '../../services/authService';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signin = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log("📤 Attempting login with:", {
      identifier: identifier.trim(),
      password: password.trim()
    });

    try {
      const res = await loginUser({
        identifier: identifier.trim(),
        password: password.trim(),
      });

      console.log("✅ Server response:", res.data);

      if (res.data?.user) {
        login(res.data.user);
        toast.success('✅ Login successful');

        console.log("🔐 Logged in user:", res.data.user);

        setTimeout(() => {
          const redirectPath = res.data.user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard';
          console.log("➡️ Redirecting to:", redirectPath);
          navigate(redirectPath);
        }, 1500);
      } else {
        console.warn("⚠️ Unexpected response format");
        toast.error('Unexpected response from server');
      }
    } catch (err) {
      console.error("❌ Login error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || '❌ Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#E7F2EF', display: 'flex', alignItems: 'center', justifyContent: 'center', px: 2 }}>
      <ToastContainer position="top-right" autoClose={3000} />
      <Card sx={{ maxWidth: 1000, width: '100%', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, overflow: 'hidden', boxShadow: 6, height: '500px' }}>
        {/* Left Side: Branding */}
        <Box sx={{ backgroundColor: '#A1C2BD', color: '#19183B', p: 4, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Welcome Back 👋
          </Typography>
          <Typography variant="body1">
            Sign in to access your contributor dashboard, tools, and personalized insights.
          </Typography>
          <Box sx={{ mt: 4 }}>
            <img src="/assets/signin-illustration.svg" alt="Signin" style={{ width: '100%' }} />
          </Box>
        </Box>

        {/* Right Side: Form */}
        <CardContent sx={{ flex: 1, p: 4, marginTop: '100px' }}>
          <Typography variant="h5" marginBottom={5} fontWeight={600} align="center" gutterBottom>
            Sign In to CoderzHub
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Email or Username"
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  fullWidth
                  required
                  helperText="You can use either your email or username to sign in."
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body2" align="center">
                  Don’t have an account?{' '}
                  <Link to="/register" style={{ color: '#6366f1', textDecoration: 'none' }}>
                    Register here
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

export default Signin;