import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const tools = [
  {
    name: 'UUID Generator',
    description: 'Generate universally unique identifiers (UUID v4).',
    path: '/tools/uuid',
    emoji: '🔑',
  },
  {
    name: 'JSON Formatter',
    description: 'Beautify and validate your JSON input.',
    path: '/tools/json',
    emoji: '🧠',
  },
  {
    name: 'JWT Decoder',
    description: 'Decode and inspect your JWT tokens.',
    path: '/tools/jwt',
    emoji: '🔐',
  },
  {
    name: 'Base64 Converter',
    description: 'Encode or decode Base64 strings.',
    path: '/tools/base64',
    emoji: '📦',
  },
  {
    name: 'Space Remover',
    description: 'Remove all whitespace from your input text.',
    path: '/tools/space',
    emoji: '✂️',
  },
  {
    name: 'Image Compressor',
    description: 'Compress JPEG, PNG, or WebP images to reduce file size.',
    path: '/tools/image-compressor',
    emoji: '📉',
  },
  {
    name: 'Image Type Converter',
    description: 'Convert images between JPEG, PNG, and WebP formats.',
    path: '/tools/image-type-converter',
    emoji: '🔄',
  },
];

const ToolsDashboard = () => {
  return (
    <Box className="min-h-screen bg-gray-50 p-6">
      <Box className="max-w-6xl mx-auto space-y-6">
        <Typography variant="h4" className="text-indigo-600 font-bold text-center">
          Developer Tools 🧰
        </Typography>
        <Typography variant="body1" className="text-center text-gray-600">
          Choose a tool below to get started.
        </Typography>

        <Grid container spacing={4}>
          {tools.map((tool) => (
            <Grid item xs={12} sm={6} md={4} key={tool.name}>
              <Card className="shadow-md hover:shadow-lg transition">
                <CardContent className="space-y-2">
                  <Typography variant="h6">
                    {tool.emoji} {tool.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {tool.description}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to={tool.path}
                    size="small"
                  >
                    Launch
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ToolsDashboard;