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
} from '@mui/material';

const JwtDecoder = () => {
  const [token, setToken] = useState('');
  const [header, setHeader] = useState('');
  const [payload, setPayload] = useState('');
  const [error, setError] = useState('');

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
    <Box className="min-h-screen bg-gray-100 p-6 flex justify-center items-start">
      <Card className="w-full max-w-4xl shadow-lg">
        <CardContent className="space-y-4">
          <Typography variant="h4" className="text-indigo-600 font-semibold text-center">
            JWT Decoder 🔐
          </Typography>

          <TextField
            label="Paste JWT token here"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />

          <Button variant="contained" color="primary" onClick={handleDecode}>
            Decode Token
          </Button>

          {error && <Alert severity="error">{error}</Alert>}

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
        </CardContent>
      </Card>
    </Box>
  );
};

export default JwtDecoder;