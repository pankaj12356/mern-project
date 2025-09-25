import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Alert,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
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

const JwtDecoder = () => {
  const [token, setToken] = useState('');
  const [header, setHeader] = useState('');
  const [payload, setPayload] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const decodeBase64 = (str) => {
    try {
      return JSON.stringify(JSON.parse(atob(str)), null, 2);
    } catch {
      return 'Invalid segment';
    }
  };

  const handleDecode = () => {
    setError('');
    const parts = token.split('.');
    if (parts.length !== 3) {
      setError('❌ Invalid JWT format. Must contain 3 segments.');
      setHeader('');
      setPayload('');
      return;
    }

    setHeader(decodeBase64(parts[0]));
    setPayload(decodeBase64(parts[1]));
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
            JWT Decoder 🔐
          </Typography>
          <Typography variant="body2" sx={{ color: '#475569', textAlign: 'center', mb: 1 }}>
            Decode JSON Web Tokens to inspect their header and payload segments.
          </Typography>
          <Typography variant="body2" sx={{ color: '#475569', textAlign: 'center', mb: 4 }}>
            Useful for debugging authentication flows, verifying claims, or inspecting token metadata.
          </Typography>

          {/* 🔢 Input */}
          <TextField
            label="Paste JWT token here"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            sx={{ mb: 3 }}
          />

          {/* 🚀 Action */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleDecode}
            sx={{ textTransform: 'none', fontWeight: 500, mb: 3 }}
          >
            Decode Token
          </Button>

          {/* ⚠️ Error */}
          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

          {/* 📤 Output */}
          {header && (
            <Stack spacing={2}>
              <TextField
                label="Header"
                multiline
                rows={6}
                fullWidth
                variant="outlined"
                value={header}
                InputProps={{ readOnly: true }}
              />
              <TextField
                label="Payload"
                multiline
                rows={10}
                fullWidth
                variant="outlined"
                value={payload}
                InputProps={{ readOnly: true }}
              />
            </Stack>
          )}

          {/* 📘 Info Section */}
          <Box sx={{ mt: 6 }}>
            <Divider sx={{ mb: 3 }} />
            <Typography variant="h5" sx={{ mb: 2 }}>Demo Token Example</Typography>
            <Typography variant="body2" sx={{ mb: 3 }}>
              Here's a sample JWT you can try:
              <br />
              <code style={{ backgroundColor: '#F3F4F6', padding: '6px 10px', borderRadius: '6px', display: 'block', marginTop: '8px' }}>
                eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.<br />
                eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvbiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.<br />
                SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
              </code>
            </Typography>

            <Typography variant="body2" sx={{ mb: 3 }}>
              When decoded:
              <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                <li><strong>Header:</strong> <code>{`{ "alg": "HS256", "typ": "JWT" }`}</code></li>
                <li><strong>Payload:</strong> <code>{`{ "sub": "1234567890", "name": "Jon Doe", "iat": 1516239022 }`}</code></li>
              </ul>
              These values represent the algorithm used, the token type, and claims like subject ID, name, and issued-at timestamp.
            </Typography>

            <Typography variant="h5" sx={{ mb: 2 }}>Why Decode JWTs?</Typography>
            <Typography variant="body2">
              Decoding helps you:
              <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                <li>🔍 Inspect token contents</li>
                <li>🛠️ Debug authentication issues</li>
                <li>🔐 Verify claims and expiration</li>
                <li>📦 Understand token structure</li>
              </ul>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default JwtDecoder;