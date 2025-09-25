import { Card, Typography, Box, Avatar } from '@mui/material';

const HeroBanner = ({ user }) => {
  const fullName = user.firstName && user.lastName
    ? `${user.firstName} ${user.lastName}`
    : user.username;

  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        p: 2.5,
        mb: 2,
        borderRadius: 4,
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        color: '#1e293b',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
        <Avatar
          src={user.profileImage}
          alt={user.username}
          sx={{
            width: 72,
            height: 72,
            fontSize: 28,
            bgcolor: '#cbd5e1',
            border: '2px solid #6366f1',
            color: '#1e293b',
          }}
        >
          {!user.profileImage && user.username?.[0]?.toUpperCase()}
        </Avatar>

        <Box>
          <Typography variant="h6" fontWeight={600}>
            Welcome, {fullName} 👋
          </Typography>
          <Typography variant="body2" sx={{ color: '#475569', mt: 0.3 }}>
            Your personalized dashboard is ready.
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748b', mt: 0.3 }}>
            Manage your account, explore tools, and stay productive.
          </Typography>
        </Box>
      </Box>

      <Box sx={{ textAlign: 'right', mt: { xs: 2, md: 0 } }}>
        <Typography variant="body2" sx={{ color: '#6366f1' }}>
          Role: <strong>{user.role || 'N/A'}</strong>
        </Typography>
        <Typography variant="body2" sx={{ color: '#6366f1' }}>
          Last login: <strong>23:49 IST</strong>
        </Typography>
      </Box>
    </Card>
  );
};

export default HeroBanner;