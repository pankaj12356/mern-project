import React from 'react';
import { CircularProgress, Typography, Box } from '@mui/material';

const Loader = ({ message = 'Loading...', fullScreen = false }) => {
  return (
    <Box
      className={fullScreen ? 'fixed inset-0 z-50 flex items-center justify-center bg-white/70' : 'flex items-center justify-center'}
    >
      <Box className="flex flex-col items-center space-y-2">
        <CircularProgress color="primary" />
        <Typography variant="body2" color="textSecondary">
          {message}
        </Typography>
      </Box>
    </Box>
  );
};

export default Loader;