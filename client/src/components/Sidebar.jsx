// src/components/Sidebar.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: '#f3f4f6',
        },
      }}
    >
      <List>
        <ListItem button component={Link} to="/user/dashboard">
          <ListItemText primary="User Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/admin/dashboard">
          <ListItemText primary="Admin Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/tools/uuid">
          <ListItemText primary="UUID Generator" />
        </ListItem>
        <ListItem button component={Link} to="/tools/json">
          <ListItemText primary="JSON Formatter" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;