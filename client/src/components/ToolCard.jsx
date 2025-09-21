// src/components/ToolCard.jsx

import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

/**
 * ToolCard component
 * Displays a single tool with title, description, and link
 *
 * @param {string} title - Tool name
 * @param {string} description - Short description of the tool
 * @param {string} path - Route path to the tool page
 */
const ToolCard = ({ title, description, path }) => {
  return (
    <Card className="shadow-md hover:shadow-xl transition duration-300">
      <CardContent className="flex flex-col gap-4">
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={path}
          className="self-start"
        >
          Open Tool
        </Button>
      </CardContent>
    </Card>
  );
};

export default ToolCard;