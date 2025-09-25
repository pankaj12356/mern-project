import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Alert,
  Stack,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
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

const JsonFormatter = () => {
  const [input, setInput] = useState('');
  const [formatted, setFormatted] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

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
    <Box sx={{ minHeight: '100vh', backgroundColor: '#E7F2EF', py: 8, px: 4 }}>
      <Box sx={{ maxWidth: 800, mx: 'auto' }}>
        <Card sx={{ boxShadow: 4, borderRadius: 3 }}>
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
              JSON Formatter 🧠
            </Typography>
            <Typography variant="body2" sx={{ color: '#475569', textAlign: 'center', mb: 1 }}>
              Paste raw JSON and format it for readability, debugging, or sharing.
            </Typography>
            <Typography variant="body2" sx={{ color: '#475569', textAlign: 'center', mb: 4 }}>
              This tool helps you visualize nested structures, arrays, and key-value pairs with clarity.
            </Typography>

            {/* ✏️ Input */}
            <TextField
              label="Paste your JSON here"
              multiline
              rows={10}
              fullWidth
              variant="outlined"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              sx={{ mb: 3 }}
            />

            {/* 🚀 Action */}
            <Button
              variant="contained"
              onClick={handleFormat}
              sx={{
                backgroundColor: '#10B981',
                color: '#FFFFFF',
                textTransform: 'none',
                fontWeight: 500,
                '&:hover': { backgroundColor: '#059669' },
                mb: 3,
              }}
            >
              Format JSON
            </Button>

            {/* ⚠️ Error */}
            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

            {/* 📤 Output */}
            {formatted && (
              <Stack spacing={2}>
                <TextField
                  label="Formatted JSON"
                  multiline
                  rows={10}
                  fullWidth
                  variant="outlined"
                  value={formatted}
                  InputProps={{ readOnly: true }}
                />
                <Button variant="outlined" color="success" onClick={handleCopy}>
                  {copied ? '✅ Copied!' : 'Copy to Clipboard'}
                </Button>
              </Stack>
            )}

            {/* 📘 Info Section */}
            <Box sx={{ mt: 6 }}>
              <Divider sx={{ mb: 3 }} />
              <Typography variant="h5" sx={{ mb: 2 }}>Demo JSON Example</Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Here's a sample JSON you can paste and format:
              </Typography>
              <code style={{
                backgroundColor: '#F3F4F6',
                padding: '10px 14px',
                borderRadius: '6px',
                display: 'block',
                fontSize: '0.9rem',
                marginBottom: '16px',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}>
{`{
  "name": "Jon Doe",
  "age": 30,
  "skills": ["React", "Node.js", "MongoDB"]
}`}
              </code>

              <Typography variant="body2">
                This JSON represents a simple user object:
                <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                  <li><strong>name</strong>: A string representing the user's name</li>
                  <li><strong>age</strong>: A number representing the user's age</li>
                  <li><strong>skills</strong>: An array of strings listing their technical skills</li>
                </ul>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default JsonFormatter;