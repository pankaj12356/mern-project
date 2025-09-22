import { useState } from 'react';
import { TextField, Button, MenuItem, Typography, Avatar } from '@mui/material';
import { registerUser } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const roles = ['user', 'admin'];

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    role: 'user',
    profileImage: null,
  });

  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError('');

  //   try {
  //     const payload = new FormData();
  //     Object.entries(formData).forEach(([key, value]) => {
  //       if (value) payload.append(key, value);
  //     });

  //     const res = await registerUser(payload);
  //     console.log('✅ Registered:', res.data);
  //     navigate('/user/dashboard');
  //   } catch (err) {
  //     console.error('❌ Registration failed:', err.response?.data || err.message);
  //     setError(err.response?.data?.message || 'Registration failed');
  //   }
  // };
  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  try {
    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) payload.append(key, value);
    });

    const res = await registerUser(payload);
    console.log('✅ Response from backend:', res);

    if (res.status === 201 && res.data?.user) {
      alert(`✅ Welcome ${res.data.user.firstName}! Your account has been created.`);
      navigate('/signin');
    } else {
      setError('Unexpected response from server.');
    }
    console.log('📤 Sending registration request...');
console.log('Payload:', formData);
  } catch (err) {
    console.error('❌ Registration failed:', err.response?.data || err.message);
    setError(err.response?.data?.message || 'Registration failed');
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-xl space-y-4"
        encType="multipart/form-data"
      >
        <Typography variant="h5" className="text-center font-semibold text-gray-800">
          Create Your CoderzHub Account
        </Typography>

        <div className="flex gap-4">
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
        </div>

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
        >
          {roles.map((role) => (
            <MenuItem key={role} value={role}>
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </MenuItem>
          ))}
        </TextField>

        <div className="flex items-center gap-4">
          <input
            type="file"
            name="profileImage"
            accept="image/*"
            onChange={handleChange}
            className="block w-full text-sm text-gray-600"
          />
          {preview && <Avatar src={preview} alt="Preview" sx={{ width: 48, height: 48 }} />}
        </div>

        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </form>
    </div>
  );
};

export default Register;