import { Box, Typography, Card, CardContent, Grid, Button } from '@mui/material';

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
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#F8FAFC', py: 10, px: 4 }}>
      <Box sx={{ maxWidth: '1200px', mx: 'auto', mb: 6 }}>
        <Typography variant="h4" sx={{ color: '#4F46E5', fontWeight: 'bold', textAlign: 'center' }}>
          Project Setup Commands 💻
        </Typography>
        <Typography variant="body1" sx={{ color: '#475569', textAlign: 'center', mt: 1 }}>
          Quickly bootstrap your favorite frameworks with ready-to-copy terminal commands.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {setupCommands.map((tool) => (
          <Grid item xs={12} sm={6} md={4} key={tool.title}>
            <Card sx={{ backgroundColor: '#1E293B', color: '#FFFFFF', boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {tool.emoji} {tool.title}
                </Typography>
                {tool.commands.map((cmd, index) => (
                  <Box
                    key={index}
                    sx={{
                      backgroundColor: '#CBD5E1',
                      color: '#1E293B',
                      p: 1,
                      borderRadius: 1,
                      fontFamily: 'monospace',
                      fontSize: '0.875rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 1,
                    }}
                  >
                    <span>{cmd}</span>
                    <Button
                      size="small"
                      variant="contained"
                      sx={{ backgroundColor: '#10B981', color: '#FFFFFF', textTransform: 'none' }}
                      onClick={() => copyToClipboard(cmd)}
                    >
                      Copy
                    </Button>
                  </Box>
                ))}
                <Typography variant="body2" sx={{ mt: 2, color: '#A5B4FC' }}>
                  Extras: {tool.extras.join(', ')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SetupCommandsPage;