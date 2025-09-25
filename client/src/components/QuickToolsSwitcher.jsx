import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const toolOptions = [
  { path: '/tools/uuid', label: '🔑 UUID Generator' },
  { path: '/tools/json', label: '🧠 JSON Formatter' },
  { path: '/tools/jwt', label: '🔐 JWT Decoder' },
  { path: '/tools/base64', label: '📦 Base64 Converter' },
  { path: '/tools/space', label: '✂️ Space Remover' },
  { path: '/tools/image-compressor', label: '📉 Image Compressor' },
  { path: '/tools/image-type-converter', label: '🔄 Image Type Converter' },
];

const QuickToolSwitcher = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTool, setSelectedTool] = useState('');

  useEffect(() => {
    setSelectedTool(location.pathname);
  }, [location.pathname]);

  const handleToolChange = (event) => {
    const selected = event.target.value;
    setSelectedTool(selected);
    navigate(selected);
  };

  const handleBackToTools = () => {
    navigate('/tools');
  };

  return (
    <>
      {/* 🔙 Back Button */}
      <Box
        sx={{
          position: 'absolute',
          top: 16,
          left: 16,
          zIndex: 10,
        }}
      >
        <Button
          variant="outlined"
          size="small"
          onClick={handleBackToTools}
          sx={{
            textTransform: 'none',
            fontWeight: 500,
            borderRadius: '20px',
            backgroundColor: '#F0FDF4',
            color: '#059669',
            '&:hover': { backgroundColor: '#D1FAE5' },
          }}
        >
          ← Back to Tools
        </Button>
      </Box>

      {/* 🔄 Tool Selector */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          zIndex: 10,
        }}
      >
        <FormControl size="small" sx={{ minWidth: 220 }}>
          <InputLabel>Switch Tool</InputLabel>
          <Select
            value={selectedTool}
            label="Switch Tool"
            onChange={handleToolChange}
          >
            {toolOptions.map((tool) => (
              <MenuItem key={tool.path} value={tool.path}>
                {tool.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </>
  );
};

export default QuickToolSwitcher;