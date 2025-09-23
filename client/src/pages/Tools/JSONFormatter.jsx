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

const JsonFormatter = () => {
  const [input, setInput] = useState('');
  const [formatted, setFormatted] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(input);
      const pretty = JSON.stringify(parsed, null, 2);
      setFormatted(pretty);
      setError('');
      setCopied(false);
    } catch (err) {
      setFormatted('');
      setError('❌ Invalid JSON: ' + err.message);
      setCopied(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formatted);
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
        backgroundColor: 'background.default',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        py: 6,
        px: 2,
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: '800px',
          boxShadow: 4,
          borderRadius: 2,
          backgroundColor: 'background.paper',
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h4"
            sx={{
              color: 'primary.main',
              fontWeight: 'bold',
              textAlign: 'center',
              mb: 3,
            }}
          >
            JSON Formatter 🧠
          </Typography>

          <TextField
            label="Paste your JSON here"
            multiline
            rows={10}
            fullWidth
            variant="outlined"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleFormat}
            sx={{ mb: 2 }}
          >
            Format JSON
          </Button>

          {error && <Alert severity="error">{error}</Alert>}

          {formatted && (
            <Stack spacing={2} sx={{ mt: 3 }}>
              <TextField
                label="Formatted JSON"
                multiline
                rows={10}
                fullWidth
                variant="outlined"
                value={formatted}
                InputProps={{ readOnly: true }}
              />
              <Button
                variant="contained"
                color="success"
                onClick={handleCopy}
              >
                {copied ? '✅ Copied!' : 'Copy to Clipboard'}
              </Button>
            </Stack>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default JsonFormatter;