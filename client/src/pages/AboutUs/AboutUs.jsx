import { Box, Typography, Card, CardContent, Grid, Avatar } from '@mui/material';

const team = [
  {
    name: 'Pankaj',
    role: 'Full-stack Architect',
    bio: 'Backend debugger, UI/UX perfectionist, and the mind behind modular architecture and developer-first design.',
    emoji: '🧠',
  },
  {
    name: 'Khush',
    role: 'Frontend Strategist',
    bio: 'Design enthusiast, dashboard wizard, and the creative force behind clean layouts and intuitive flows.',
    emoji: '🎨',
  },
  {
    name: 'Manali',
    role: 'API Integrator & Docs Lead',
    bio: 'Contributor onboarding expert, documentation queen, and the glue that keeps our tools and flows connected.',
    emoji: '📚',
  },
];

const AboutUs = () => {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#E7F2EF', py: 10, px: 4 }}>
      <Box sx={{ maxWidth: '1100px', mx: 'auto' }}>
        {/* 🧭 Header Block */}
        <Box
          sx={{
            backgroundColor: '#A1C2BD',
            borderRadius: 3,
            py: 5,
            px: 4,
            mb: 8,
            boxShadow: 4,
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" sx={{ color: '#19183B', fontWeight: 'bold', mb: 2 }}>
            About CoderzHub 👨‍💻
          </Typography>
          <Typography variant="body1" sx={{ color: '#475569', maxWidth: 700, mx: 'auto' }}>
            CoderzHub is a developer-first platform built by three passionate creators — Pankaj, Khush, and Manali — to simplify your workflow with instant tools, setup sheets, and role-based dashboards.
          </Typography>
        </Box>

        {/* 🚀 Why We Built This */}
        <Card sx={{ backgroundColor: '#FFFFFF', boxShadow: 3, borderRadius: 3, mb: 8 }}>
          <CardContent>
            <Typography variant="h6" sx={{ color: '#10B981', mb: 2 }}>
              🚀 Why We Built This
            </Typography>
            <Typography variant="body2" sx={{ color: '#19183B', lineHeight: 1.8 }}>
              We were tired of bouncing between tabs, searching for reliable formatters, setup commands, and quick tools. So we built CoderzHub — a clean, fast, and developer-friendly suite that brings everything together. Whether you're bootstrapping a new project, debugging a backend flow, or just need a quick JSON formatter, CoderzHub is your launchpad.
            </Typography>
          </CardContent>
        </Card>

        {/* 👥 Meet the Team */}
        <Typography variant="h6" sx={{ color: '#10B981', mb: 3 }}>
          👥 Meet the Team
        </Typography>
        <Grid container spacing={4}>
          {team.map((member) => (
            <Grid item xs={12} sm={6} md={4} key={member.name}>
              <Card
                sx={{
                  backgroundColor: '#FFFFFF',
                  boxShadow: 2,
                  borderRadius: 3,
                  textAlign: 'center',
                  py: 4,
                  px: 2,
                  transition: 'transform 0.2s ease',
                  '&:hover': { transform: 'scale(1.02)', boxShadow: 4 },
                }}
              >
                <CardContent>
                  <Avatar
                    sx={{
                      bgcolor: '#D1FAE5',
                      color: '#065F46',
                      mx: 'auto',
                      mb: 2,
                      width: 64,
                      height: 64,
                      fontSize: '1.75rem',
                      border: '2px solid #10B981',
                    }}
                  >
                    {member.emoji}
                  </Avatar>
                  <Typography variant="h6" sx={{ color: '#19183B', fontWeight: 600 }}>
                    {member.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#475569', mb: 1 }}>
                    {member.role}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748B', fontSize: '0.875rem' }}>
                    {member.bio}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default AboutUs;