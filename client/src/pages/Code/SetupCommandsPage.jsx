import { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  Tooltip,
  Snackbar,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const setupCommands = [
  {
    title: 'React + Vite',
    emoji: '⚛️',
    commands: [
      'npm create vite@latest my-app -- --template react',
      'cd my-app',
      'npm install',
    ],
    extras: ['Tailwind Setup', 'TypeScript Optional'],
  },
  {
    title: 'Next.js',
    emoji: '🚀',
    commands: [
      'npx create-next-app@latest my-next-app',
      'cd my-next-app',
      'npm install',
    ],
    extras: ['TypeScript', 'MUI Integration'],
  },
  {
    title: 'Node.js + Express',
    emoji: '🛠️',
    commands: [
      'mkdir my-api && cd my-api',
      'npm init -y',
      'npm install express dotenv cors',
    ],
    extras: ['Folder Structure', 'MongoDB Setup'],
  },
  {
    title: 'Python + Flask',
    emoji: '🐍',
    commands: [
      'mkdir flask-app && cd flask-app',
      'python -m venv venv',
      'source venv/bin/activate',
      'pip install flask',
    ],
    extras: ['.env Setup', 'Debug Mode'],
  },
  {
    title: 'Vue.js',
    emoji: '🖖',
    commands: [
      'npm create vue@latest',
      'cd vue-project',
      'npm install',
    ],
    extras: ['Vue Router', 'Pinia Store'],
  },
];

const SetupCommandsPage = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setSnackbarOpen(true);
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#E7F2EF', py: 8, px: 4 }}>
      {/* Header Block */}
      <Box
        sx={{
          maxWidth: '1200px',
          mx: 'auto',
          mb: 6,
          textAlign: 'center',
          backgroundColor: '#A1C2BD',
          borderRadius: 2,
          py: 4,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#19183B' }}>
          💻 Project Setup Commands
        </Typography>
        <Typography variant="body1" sx={{ mt: 1, color: '#475569' }}>
          Bootstrap your favorite stacks with clean, copy-ready terminal commands.
        </Typography>
      </Box>

      {/* Command Cards */}
      <Grid container spacing={4}>
        {setupCommands.map((tool) => (
          <Grid item xs={12} sm={6} md={4} key={tool.title}>
            <Card
              sx={{
                backgroundColor: '#A1C2BD',
                color: '#19183B',
                boxShadow: 4,
                borderRadius: 3,
                transition: 'transform 0.2s ease',
                '&:hover': { transform: 'scale(1.02)' },
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {tool.emoji} {tool.title}
                </Typography>

                {tool.commands.map((cmd, index) => (
                  <Tooltip title="Click to copy" key={index}>
                    <Box
                      sx={{
                        backgroundColor: '#F0FDF4',
                        color: '#19183B',
                        p: 1,
                        borderRadius: 1,
                        fontFamily: 'monospace',
                        fontSize: '0.875rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 1,
                        border: '1px solid #D1FAE5',
                      }}
                    >
                      <span>{cmd}</span>
                      <Button
                        size="small"
                        variant="contained"
                        startIcon={<ContentCopyIcon />}
                        sx={{
                          backgroundColor: '#10B981',
                          color: '#FFFFFF',
                          textTransform: 'none',
                          fontSize: '0.75rem',
                          px: 1.5,
                          '&:hover': { backgroundColor: '#059669' },
                        }}
                        onClick={() => copyToClipboard(cmd)}
                      >
                        Copy
                      </Button>
                    </Box>
                  </Tooltip>
                ))}

                <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {tool.extras.map((extra, i) => (
                    <Chip
                      key={i}
                      label={extra}
                      size="small"
                      sx={{
                        backgroundColor: '#A5B4FC',
                        color: '#19183B',
                        fontWeight: 500,
                      }}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Snackbar Feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message="Command copied to clipboard"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
};

export default SetupCommandsPage;