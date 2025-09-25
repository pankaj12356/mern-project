import { useState, useEffect } from 'react';
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

const Base64Converter = () => {
  const [mode, setMode] = useState('encode');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

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
              Base64 Converter 📦
            </Typography>
            <Typography variant="body2" sx={{ color: '#475569', textAlign: 'center', mb: 1 }}>
              Encode or decode Base64 strings for secure transmission, compact storage, or debugging.
            </Typography>
            <Typography variant="body2" sx={{ color: '#475569', textAlign: 'center', mb: 4 }}>
              Useful for embedding data, inspecting tokens, or converting binary to text.
            </Typography>

            {/* 🔄 Mode Toggle */}
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

            {/* ✏️ Input */}
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

            {/* 🚀 Action */}
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

            {/* ⚠️ Error */}
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            {/* 📤 Output */}
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

            {/* 📘 Use Case + Demo */}
            <Box sx={{ mt: 6 }}>
              <Typography variant="h5" sx={{ mb: 2 }}>Use Cases for Base64</Typography>
              <Typography variant="body2" sx={{ mb: 3 }}>
                Base64 encoding is commonly used to:
                <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                  <li>📤 Transmit binary data (like images or files) over text-based protocols like HTTP or email</li>
                  <li>🔐 Embed credentials or tokens in URLs or headers</li>
                  <li>🧪 Debug encoded payloads in JWTs or API responses</li>
                  <li>🖼️ Embed images directly into HTML or CSS as data URIs</li>
                </ul>
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h5" sx={{ mb: 2 }}>Demo Example</Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Try encoding this string:
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
                Hello, CoderzHub!
              </code>

              <Typography variant="body2">
                When encoded to Base64, it becomes:
                <br />
                <code style={{
                  backgroundColor: '#F3F4F6',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  display: 'inline-block',
                  marginTop: '8px',
                }}>
                  SGVsbG8sIENvZGVyelh1YiE=
                </code>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Base64Converter;