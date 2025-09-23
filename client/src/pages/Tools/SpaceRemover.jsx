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
} from '@mui/material';

const SpaceRemover = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

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
    <Box className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6 flex justify-center items-start">
      <Card className="w-full max-w-4xl shadow-xl border border-gray-300">
        <CardContent className="space-y-6">
          {/* Title */}
          <Typography variant="h4" className="text-indigo-600 font-bold text-center">
            Space Remover ✂️
          </Typography>

          {/* Use Case */}
          <Box className="bg-white p-4 rounded-md border border-gray-200">
            <Typography variant="body1" className="text-gray-800 font-medium">
              ⚡ <strong>Use Case:</strong>
            </Typography>
            <Typography variant="body2" color="textSecondary" className="mt-1">
              When working with AI platforms, APIs, or form fields that have strict character limits, extra spaces can push your input over the edge. This tool helps you compact your instructions, tokens, or JSON strings by removing all whitespace—without changing the actual meaning.
            </Typography>
            <ul className="list-disc list-inside mt-2 text-sm text-gray-600">
              <li>🧠 AI prompt optimization</li>
              <li>🔐 JWT or token cleanup</li>
              <li>📦 Compacting JSON for transmission</li>
              <li>📋 Preparing data for URLs or query strings</li>
            </ul>
          </Box>

          <Divider />

          {/* Input */}
          <TextField
            label="Paste your text here"
            multiline
            rows={6}
            fullWidth
            variant="outlined"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          {/* Action Button */}
          <Button variant="contained" color="primary" onClick={handleRemoveSpaces}>
            Remove All Spaces
          </Button>

          {/* Output + Copy */}
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

export default SpaceRemover;