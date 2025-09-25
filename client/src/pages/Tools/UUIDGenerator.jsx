import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
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

const UuidTool = () => {
  const [uuid, setUuid] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const generateUuid = () => {
    const newUuid = uuidv4();
    setUuid(newUuid);
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#E7F2EF', py: 8, px: 4, display: 'flex', justifyContent: 'center' }}>
      <Card sx={{ width: '100%', maxWidth: 800, boxShadow: 4, borderRadius: 3 }}>
        <CardContent sx={{ px: 4, py: 6 }}>
          {/* 🔙 Back + Switch Tool */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => navigate('/tools')}
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

            <FormControl size="small" sx={{ minWidth: 220 }}>
              <InputLabel>Switch Tool</InputLabel>
              <Select
                value={location.pathname}
                label="Switch Tool"
                onChange={(e) => navigate(e.target.value)}
              >
                {toolOptions.map((tool) => (
                  <MenuItem key={tool.path} value={tool.path}>
                    {tool.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* 🧠 Title + Description */}
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#19183B', textAlign: 'center', mb: 2 }}>
            UUID Generator 🔧
          </Typography>
          <Typography variant="body2" sx={{ color: '#475569', textAlign: 'center', mb: 1 }}>
            Generate Universally Unique Identifiers for secure references, database keys, or session tokens.
          </Typography>
          <Typography variant="body2" sx={{ color: '#475569', textAlign: 'center', mb: 4 }}>
            UUIDs are 128-bit values used to ensure uniqueness across systems and time — no collisions, no duplicates.
          </Typography>

          {/* 🧪 Output + Action */}
          <Stack spacing={2}>
            <TextField
              label="Generated UUID"
              value={uuid}
              fullWidth
              InputProps={{ readOnly: true }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={generateUuid}
              sx={{ textTransform: 'none', fontWeight: 500 }}
            >
              Generate UUID
            </Button>
          </Stack>

          {/* 📘 Info Section */}
          <Box sx={{ mt: 6 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>What is a UUID?</Typography>
            <Typography variant="body2" sx={{ mb: 3 }}>
              A UUID (Universally Unique Identifier) is a 128-bit number used to uniquely identify information in computer systems. It looks like:
              <br />
              <code style={{ backgroundColor: '#F3F4F6', padding: '4px 8px', borderRadius: '4px', display: 'inline-block', marginTop: '8px' }}>
                550e8400-e29b-41d4-a716-446655440000
              </code>
            </Typography>

            <Typography variant="h5" sx={{ mb: 2 }}>Why Use UUIDs?</Typography>
            <Typography variant="body2" sx={{ mb: 3 }}>
              UUIDs are ideal for:
              <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                <li>🔐 Secure session tokens</li>
                <li>🗃️ Unique database keys</li>
                <li>📦 File or object identifiers</li>
                <li>🌐 Distributed systems with no central coordination</li>
              </ul>
            </Typography>

            <Typography variant="h5" sx={{ mb: 2 }}>Are UUIDs Truly Unique?</Typography>
            <Typography variant="body2">
              Yes. The probability of generating the same UUID twice is astronomically low. UUIDs combine timestamps, random bits, and hardware identifiers to ensure uniqueness across space and time.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UuidTool;