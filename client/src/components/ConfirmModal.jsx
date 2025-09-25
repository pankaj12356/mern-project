import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const ConfirmModal = ({ user, onCancel, onConfirm }) => {
  return (
    <Modal open={!!user} onClose={onCancel}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 360,
        bgcolor: '#19183B',
        color: '#fff',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
      }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          🗑️ Confirm Deletion
        </Typography>
        {user && (
          <>
            <Typography sx={{ mb: 1 }}>Username: <strong>{user.username}</strong></Typography>
            <Typography sx={{ mb: 1 }}>Role: {user.role}</Typography>
            <Typography sx={{ mb: 1 }}>Status: {user.isActive ? 'Active' : 'Inactive'}</Typography>
            <Typography sx={{ mb: 3 }}>Are you sure you want to delete this user?</Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="contained" color="error" onClick={onConfirm}>DELETE</Button>
              <Button variant="contained" sx={{ backgroundColor: '#2196F3' }} onClick={onCancel}>CANCEL</Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default ConfirmModal;