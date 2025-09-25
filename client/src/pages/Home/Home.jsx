// src/pages/Home/Home.jsx

import React from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Chip,
  Paper,
  Stack,
  Container,
} from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Box sx={{ width: '100%', backgroundColor: '#E7F2EF', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box sx={{ width: '100%', py: 8, backgroundColor: '#A1C2BD' }}>
        <Container maxWidth="xl">
          <Paper
            elevation={6}
            sx={{
              p: { xs: 4, md: 6 },
              borderRadius: 4,
              backgroundColor: '#ffffff',
              color: '#19183B',
              textAlign: 'center',
            }}
          >
            <Typography
              variant="h2"
              fontWeight={700}
              sx={{ mb: 2, fontSize: { xs: '2rem', md: '3rem' } }}
            >
              Ready-Made Tools & Setup Snippets
            </Typography>

            <Typography variant="h6" sx={{ mb: 4, color: '#475569', maxWidth: 800, mx: 'auto' }}>
              CoderzHub gives you instant access to developer utilities, reusable snippets, and zero-config modules. No setup. No boilerplate. Just copy, paste, and build.
            </Typography>

            <Stack direction="row" spacing={2} flexWrap="wrap" justifyContent="center" sx={{ mb: 4 }}>
              <Chip label="No installation needed" sx={{ backgroundColor: '#DDEBE7', color: '#19183B' }} />
              <Chip label="Plug-and-play snippets" sx={{ backgroundColor: '#DDEBE7', color: '#19183B' }} />
              <Chip label="Contributor-ready tools" sx={{ backgroundColor: '#6366f1', color: '#fff' }} />
            </Stack>

            <Stack direction="row" spacing={2} justifyContent="center">
              <Button
                variant="contained"
                sx={{ backgroundColor: '#6366f1', '&:hover': { backgroundColor: '#4f46e5' } }}
                component={Link}
                to="/tools"
              >
                Browse Tools
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderColor: '#475569',
                  color: '#475569',
                  '&:hover': { borderColor: '#19183B', color: '#19183B' },
                }}
                component={Link}
                to="/snippets"
              >
                Explore Snippets
              </Button>
            </Stack>

            <Typography variant="caption" sx={{ mt: 3, display: 'block', color: '#708993' }}>
              Designed for speed, clarity, and contributor pride.
            </Typography>
          </Paper>
        </Container>
      </Box>

      {/* Featured Tools Section */}
      <Box sx={{ width: '100%', py: 6 }}>
        <Container maxWidth="xl">
          <Typography variant="h5" fontWeight={600} sx={{ mb: 3, color: '#19183B' }}>
            🧰 Featured Tools
          </Typography>
          <Grid container spacing={3}>
            {[
              { name: 'UUID Generator', icon: '🔑' },
              { name: 'Color Picker', icon: '🎨' },
              { name: 'JSON Formatter', icon: '🧾' },
            ].map((tool, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    backgroundColor: '#ffffff',
                    color: '#19183B',
                    textAlign: 'center',
                    transition: 'transform 0.2s ease',
                    '&:hover': { transform: 'scale(1.03)' },
                  }}
                >
                  <Typography variant="h4" sx={{ mb: 1 }}>{tool.icon}</Typography>
                  <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                    {tool.name}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2, color: '#475569' }}>
                    Fast, reliable, and contributor-friendly.
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    component={Link}
                    to={`/tools/${tool.name.toLowerCase().replace(/\s+/g, '-')}`}
                    sx={{ backgroundColor: '#6366f1' }}
                  >
                    Launch
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Vision & Roadmap Section */}
      <Box sx={{ width: '100%', py: 6, backgroundColor: '#E7F2EF' }}>
        <Container maxWidth="xl">
          <Typography variant="h5" fontWeight={600} sx={{ mb: 3, color: '#19183B' }}>
            🚀 Our Vision & Roadmap
          </Typography>
          <Grid container spacing={3}>
            {[
              {
                title: 'Empower Contributors',
                desc: 'We’re building tools that feel intuitive, modular, and emotionally impactful — designed for developers who care about clarity and speed.',
              },
              {
                title: 'Expand Snippet Library',
                desc: 'From backend setups to UI components, our goal is to offer plug-and-play snippets for every stack and every contributor.',
              },
              {
                title: 'Launch Code Playground',
                desc: 'Soon, you’ll be able to test, tweak, and share snippets live — with zero setup and instant feedback.',
              },
              {
                title: 'Track Contributor Streaks',
                desc: 'We’re designing a dashboard that celebrates your contributions, streaks, and favorite tools — because pride matters.',
              },
            ].map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    backgroundColor: '#ffffff',
                    color: '#19183B',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#475569' }}>
                    {item.desc}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Footer Tip Section */}
      <Box sx={{ width: '100%', py: 4, backgroundColor: '#DDEBE7' }}>
        <Container maxWidth="md">
          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 2,
              backgroundColor: '#ffffff',
              color: '#19183B',
              textAlign: 'center',
            }}
          >
            <Typography fontWeight={500}>💡 Contributor Tip:</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Every snippet you use is optimized for clarity, speed, and modularity. No clutter. Just clean code.
            </Typography>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;