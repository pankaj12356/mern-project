import { Box, Typography, Grid, Card, CardContent, Button, Avatar } from '@mui/material';
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
    <Box sx={{ minHeight: '100vh', backgroundColor: '#E7F2EF', py: 8, px: 4 }}>
      {/* Header Block */}
      <Box
        sx={{
          maxWidth: '1200px',
          mx: 'auto',
          mb: 6,
          textAlign: 'center',
          background: 'linear-gradient(to right, #A1C2BD, #CDEAE1)',
          borderRadius: 3,
          py: 4,
          px: 3,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#19183B' }}>
          Developer Tools 🧰
        </Typography>
        <Typography variant="body1" sx={{ mt: 1, color: '#475569' }}>
          Choose a tool below to get started. Each one is built for speed, clarity, and contributor pride.
        </Typography>
      </Box>

      {/* Tool Cards */}
      <Grid container spacing={4}>
        {tools.map((tool) => (
          <Grid item xs={12} sm={6} md={4} key={tool.name}>
            <Card
              sx={{
                backgroundColor: '#FFFFFF',
                borderRadius: 3,
                boxShadow: 3,
                transition: 'transform 0.2s ease',
                '&:hover': { transform: 'scale(1.02)', boxShadow: 6 },
              }}
            >
              <CardContent sx={{ textAlign: 'center', py: 3 }}>
                <Avatar
                  sx={{
                    bgcolor: '#A5B4FC',
                    color: '#19183B',
                    mx: 'auto',
                    mb: 2,
                    width: 56,
                    height: 56,
                    fontSize: '1.5rem',
                  }}
                >
                  {tool.emoji}
                </Avatar>
                <Typography variant="h6" sx={{ color: '#19183B', mb: 1 }}>
                  {tool.name}
                </Typography>
                <Typography variant="body2" sx={{ color: '#475569', mb: 2 }}>
                  {tool.description}
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  component={Link}
                  to={tool.path}
                  sx={{
                    backgroundColor: '#10B981',
                    color: '#FFFFFF',
                    textTransform: 'none',
                    fontWeight: 500,
                    '&:hover': { backgroundColor: '#059669' },
                  }}
                >
                  Launch
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ToolsDashboard;