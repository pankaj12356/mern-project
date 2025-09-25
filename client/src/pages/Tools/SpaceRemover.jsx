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
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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

const SpaceRemover = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleRemoveSpaces = () => {
    const cleaned = input.replace(/\s+/g, '');
    setOutput(cleaned);
    setCopied(false);
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
            Space Remover ✂️
          </Typography>
          <Typography variant="body2" sx={{ color: '#475569', textAlign: 'center', mb: 1 }}>
            Remove all whitespace from your text for compact transmission, token cleanup, or AI prompt optimization.
          </Typography>
          <Typography variant="body2" sx={{ color: '#475569', textAlign: 'center', mb: 4 }}>
            Ideal for JWTs, JSON strings, URLs, and character-limited fields where every byte counts.
          </Typography>

          {/* ⚡ Use Case */}
          <Box sx={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 2, p: 3, mb: 4 }}>
            <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
              ⚡ Use Case:
            </Typography>
            <Typography variant="body2" sx={{ color: '#475569' }}>
              When working with AI platforms, APIs, or form fields that have strict character limits, extra spaces can push your input over the edge. This tool helps you compact your instructions, tokens, or JSON strings by removing all whitespace—without changing the actual meaning.
            </Typography>
            <ul style={{ marginTop: '8px', paddingLeft: '20px', color: '#475569', fontSize: '0.9rem' }}>
              <li>🧠 AI prompt optimization</li>
              <li>🔐 JWT or token cleanup</li>
              <li>📦 Compacting JSON for transmission</li>
              <li>📋 Preparing data for URLs or query strings</li>
            </ul>
          </Box>

          {/* ✏️ Input */}
          <TextField
            label="Paste your text here"
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
            color="primary"
            onClick={handleRemoveSpaces}
            sx={{ textTransform: 'none', fontWeight: 500, mb: 3 }}
          >
            Remove All Spaces
          </Button>

          {/* 📤 Output + Copy */}
          {output && (
            <Stack spacing={2}>
              <TextField
                label="Cleaned Output"
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
    </Box>
  );
};

export default SpaceRemover;