import { useState } from 'react';
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Tooltip,
  Fade,
} from '@mui/material';
import { Build } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const toolsList = [
  { name: '🔑 UUID Generator', path: '/tools/uuid' },
  { name: '🧠 JSON Formatter', path: '/tools/json' },
  { name: '🔐 JWT Decoder', path: '/tools/jwt' },
  { name: '📦 Base64 Converter', path: '/tools/base64' },
  { name: '✂️ Space Remover', path: '/tools/space' },
  { name: '📉 Image Compressor', path: '/tools/image-compressor' },
  { name: '🔄 Image Type Converter', path: '/tools/image-type-converter' },
];

const QuickToolSwitcher = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const open = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path) => {
    navigate(path);
    handleClose();
  };

  return (
    <Box sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1300 }}>
      <Tooltip title="Switch tools instantly" arrow>
        <Button
          variant="contained"
          startIcon={<Build />}
          onClick={handleOpen}
          sx={{
            backgroundColor: '#10B981',
            color: '#FFFFFF',
            textTransform: 'none',
            borderRadius: '50px',
            boxShadow: 3,
            '&:hover': { backgroundColor: '#059669' },
          }}
        >
          Tools
        </Button>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slots={{ transition: Fade }} // ✅ Updated transition usage
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: 4,
            backgroundColor: '#FFFFFF',
            minWidth: 220,
            mt: 1,
            zIndex: 1301,
          },
        }}
      >
        {toolsList.map((tool) => (
          <MenuItem
            key={tool.name}
            onClick={() => handleNavigate(tool.path)}
            sx={{
              fontWeight: 500,
              color: '#19183B',
              '&:hover': {
                backgroundColor: '#E7F2EF',
              },
            }}
          >
            {tool.name}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default QuickToolSwitcher;