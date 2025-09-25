import { Card, Typography, Grid, Box, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const QuickAccessGrid = () => {
  const navigate = useNavigate();

  const items = [
    { title: '📁 My Projects', desc: 'Manage your saved projects.', route: '/projects' },
    { title: '📊 Analytics', desc: 'Track usage and performance stats.', route: '/analytics' },
    { title: '🧩 Plugins', desc: 'Explore available tools and extensions.', route: '/plugins' },
    { title: '🛠️ Tools', desc: 'Access developer utilities and helpers.', route: '/tools' },
    { title: '💻 Code', desc: 'Browse and edit your code snippets.', route: '/code' },
    { title: '📚 About', desc: 'Learn more about CoderzHub.', route: '/about' },
  ];

  return (
    <Card sx={{
      p: 4,
      mt: 4,
      borderRadius: 3,
      backgroundColor: '#A1C2BD',
      boxShadow: '0 0 12px rgba(25, 24, 59, 0.3)',
      color: '#19183B',
    }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
        🔗 Quick Access
      </Typography>

      <Grid container spacing={3}>
        {items.map((item, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Box 
              onClick={() => navigate(item.route)}
              sx={{
                p: 3,
                borderRadius: 3,
                backgroundColor: 'white',
                color: 'gray.800',
                boxShadow: 3,
                cursor: 'pointer',
                transition: '0.3s',
                '&:hover': {
                  boxShadow: 6,
                  backgroundColor: '#374151',
                },
              }}
            >
              <Typography variant="subtitle1" fontWeight={600}>
                {item.title}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                {item.desc}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};

export default QuickAccessGrid;