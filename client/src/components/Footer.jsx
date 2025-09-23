// src/components/Footer.jsx

import React from 'react';
import { Typography, Box, IconButton } from '@mui/material';
import {
  GitHub,
  YouTube,
  Instagram,
  Twitter
} from '@mui/icons-material';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 text-center">
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 1 }}>
        <IconButton
          component="a"
          href="https://github.com/your-username"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: 'white' }}
        >
          <GitHub />
        </IconButton>
        <IconButton
          component="a"
          href="https://youtube.com/@your-channel"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: 'white' }}
        >
          <YouTube />
        </IconButton>
        <IconButton
          component="a"
          href="https://instagram.com/your-handle"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: 'white' }}
        >
          <Instagram />
        </IconButton>
        <IconButton
          component="a"
          href="https://x.com/your-handle"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: 'white' }}
        >
          <Twitter />
        </IconButton>
      </Box>
      <Typography variant="body2" sx={{ color: 'white' }}>
        © 2025 CoderzHub. Built with ❤️ by Pankaj.
      </Typography>
    </footer>
  );
};

export default Footer;