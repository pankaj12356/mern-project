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
import QuickToolSwitcher from '../../components/QuickToolsSwitcher'; // ✅ Integrated

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
      const result = mode === 'encode' ? btoa(input) : atob(input);
      setOutput(result);
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
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#E7F2EF',
        py: 8,
        px: 4,
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <Card sx={{ width: '100%', maxWidth: 800, boxShadow: 4, borderRadius: 3 }}>
        <CardContent sx={{ px: 4, py: 6 }}>
          <Typography
            variant="h4"
            sx={{
              color: '#19183B',
              fontWeight: 'bold',
              textAlign: 'center',
              mb: 2,
            }}
          >
            Base64 Converter 📦
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: '#475569',
              textAlign: 'center',
              mb: 4,
            }}
          >
            Encode or decode Base64 strings for secure transmission, compact storage, or debugging.
          </Typography>

          <ToggleButtonGroup
            value={mode}
            exclusive
            onChange={(e, val) => val && setMode(val)}
            fullWidth
            color="primary"
            sx={{ mb: 3 }}
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
            sx={{ mb: 3 }}
          />

          <Button
            variant="contained"
            onClick={handleConvert}
            sx={{
              backgroundColor: '#10B981',
              color: '#FFFFFF',
              textTransform: 'none',
              fontWeight: 500,
              '&:hover': { backgroundColor: '#059669' },
              mb: 3,
            }}
          >
            {mode === 'encode' ? 'Encode to Base64' : 'Decode from Base64'}
          </Button>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

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
              <Button
                variant="outlined"
                color="success"
                onClick={handleCopy}
                sx={{ textTransform: 'none', fontWeight: 500 }}
              >
                {copied ? '✅ Copied!' : 'Copy to Clipboard'}
              </Button>
            </Stack>
          )}
        </CardContent>
      </Card>

      {/* ✅ Floating tool switcher for seamless navigation */}
      <QuickToolSwitcher />
    </Box>
  );
};

export default Base64Converter;