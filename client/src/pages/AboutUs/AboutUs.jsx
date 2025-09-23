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
    <Box sx={{ minHeight: '100vh', backgroundColor: '#F3F4F6', py: 8, px: 4 }}>
      <Box sx={{ maxWidth: '1000px', mx: 'auto' }}>
        <Typography variant="h4" sx={{ color: '#4F46E5', fontWeight: 'bold', textAlign: 'center', mb: 2 }}>
          About CoderzHub 👨‍💻
        </Typography>
        <Typography variant="body1" sx={{ color: '#1E293B', textAlign: 'center', mb: 4 }}>
          CoderzHub is a developer-first platform built by three passionate creators — Pankaj, Khush, and Manali — to simplify your workflow with instant tools, setup sheets, and role-based dashboards.
        </Typography>

        <Card sx={{ backgroundColor: '#FFFFFF', boxShadow: 3, borderRadius: 2, mb: 6 }}>
          <CardContent>
            <Typography variant="h6" sx={{ color: '#4F46E5', mb: 2 }}>
              🚀 Why We Built This
            </Typography>
            <Typography variant="body2" sx={{ color: '#1E293B', lineHeight: 1.8 }}>
              We were tired of bouncing between tabs, searching for reliable formatters, setup commands, and quick tools. So we built CoderzHub — a clean, fast, and developer-friendly suite that brings everything together. Whether you're bootstrapping a new project, debugging a backend flow, or just need a quick JSON formatter, CoderzHub is your launchpad.
            </Typography>
          </CardContent>
        </Card>

        <Typography variant="h6" sx={{ color: '#4F46E5', mb: 2 }}>
          👥 Meet the Team
        </Typography>
        <Grid container spacing={4}>
          {team.map((member) => (
            <Grid item xs={12} sm={4} key={member.name}>
              <Card sx={{ backgroundColor: '#FFFFFF', boxShadow: 2, borderRadius: 2 }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Avatar sx={{ bgcolor: '#4F46E5', mx: 'auto', mb: 1 }}>{member.emoji}</Avatar>
                  <Typography variant="h6" sx={{ color: '#1E293B' }}>{member.name}</Typography>
                  <Typography variant="body2" sx={{ color: '#475569', mb: 1 }}>{member.role}</Typography>
                  <Typography variant="body2" sx={{ color: '#64748B' }}>{member.bio}</Typography>
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