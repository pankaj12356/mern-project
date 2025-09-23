import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Stack,
  Alert,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';

const Base64Converter = () => {
  const [mode, setMode] = useState('encode');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    setError('');
    setCopied(false);
    try {
      if (mode === 'encode') {
        const encoded = btoa(input);
        setOutput(encoded);
      } else {
        const decoded = atob(input);
        setOutput(decoded);
      }
    } catch (err) {
      setOutput('');
      setError('❌ Conversion failed: ' + err.message);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('❌ Copy failed:', err.message);
    }
  };

  return (
    <Box className="min-h-screen bg-gray-100 p-6 flex justify-center items-start">
      <Card className="w-full max-w-4xl shadow-lg">
        <CardContent className="space-y-6">
          <Typography variant="h4" className="text-indigo-600 font-bold text-center">
            Base64 Converter 📦
          </Typography>

          <Typography variant="body2" color="textSecondary" className="text-center">
            Encode or decode Base64 strings for secure transmission, compact storage, or debugging.
          </Typography>

          <ToggleButtonGroup
            value={mode}
            exclusive
            onChange={(e, val) => val && setMode(val)}
            fullWidth
            color="primary"
          >
            <ToggleButton value="encode">Encode</ToggleButton>
            <ToggleButton value="decode">Decode</ToggleButton>
          </ToggleButtonGroup>

          <TextField
            label={mode === 'encode' ? 'Raw Input' : 'Base64 Input'}
            multiline
            rows={6}
            fullWidth
            variant="outlined"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <Button variant="contained" color="primary" onClick={handleConvert}>
            {mode === 'encode' ? 'Encode to Base64' : 'Decode from Base64'}
          </Button>

          {error && <Alert severity="error">{error}</Alert>}

          {output && (
            <Stack spacing={2}>
              <TextField
                label="Output"
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                value={output}
                InputProps={{ readOnly: true }}
              />
              <Button variant="outlined" color="success" onClick={handleCopy}>
                {copied ? '✅ Copied!' : 'Copy to Clipboard'}
              </Button>
            </Stack>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Base64Converter;