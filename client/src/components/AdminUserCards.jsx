import React from 'react';
import { Typography, Paper, Avatar, Grid } from '@mui/material';

const AdminUserCard = ({ user, onRequestDelete }) => {
  return (
    <Paper elevation={3} sx={{ p: 4, mb: 3, backgroundColor: '#F4F7F6', borderRadius: 3 }}>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={3}>
          <Avatar
            src={user.profileImage || ''}
            alt={user.name || user.username}
            sx={{
              width: 160,
              height: 160,
              borderRadius: '50%',
              objectFit: 'cover',
              boxShadow: '0 0 10px rgba(0,0,0,0.2)',
              mx: 'auto',
            }}
          />
        </Grid>
        <Grid item xs={12} md={9}>
          <Typography variant="h5" fontWeight={600} sx={{ mb: 1, color: '#19183B' }}>
            {user.username}
          </Typography>
          <Typography variant="body1" sx={{ mb: 0.5 }}>👤 Name: {user.name || '—'}</Typography>
          <Typography variant="body1" sx={{ mb: 0.5 }}>📧 Email: {user.email || '—'}</Typography>
          <Typography variant="body1" sx={{ mb: 0.5 }}>🧑‍💼 Role: {user.role || '—'}</Typography>
          <Typography variant="body1" sx={{ mb: 0.5 }}>🟢 Status: {user.isActive ? 'Active' : 'Inactive'}</Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            📅 Created At: {new Date(user.createdAt).toLocaleString()}
          </Typography>
          <button
            onClick={onRequestDelete}
            style={{
              marginTop: '16px',
              padding: '8px 16px',
              backgroundColor: '#4CAF50',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            DELETE USER
          </button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AdminUserCard;