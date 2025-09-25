import { Card, CardContent, Avatar, Typography, Box, Chip } from '@mui/material';

const ContributorCard = ({ user, avatarKey }) => {
  const initials = user.firstName && user.lastName
    ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
    : user.username?.slice(0, 2).toUpperCase();

  const avatarSrc = user.profileImage
    ? `${user.profileImage}?t=${avatarKey}` // ✅ cache-busting
    : undefined;

  return (
    <Card
      sx={{
        borderRadius: 4,
        maxWidth: 400,
        backgroundColor: '#f9fafb',
        color: '#1e293b',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        p: 4,
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <Avatar
            key={avatarKey} // ✅ forces React to re-render the Avatar
            src={avatarSrc}
            alt={user.username}
            sx={{
              width: 120,
              height: 120,
              fontSize: 36,
              bgcolor: user.profileImage ? 'transparent' : '#cbd5e1',
              border: '4px solid #6366f1',
              color: '#6366f1',
              mb: 2,
              transition: 'opacity 0.3s ease-in-out',
            }}
          >
            {!user.profileImage && initials}
          </Avatar>
        </Box>

        <Box sx={{ textAlign: 'left', px: 2 }}>
          <Typography variant="subtitle1" fontWeight={600} sx={{ color: '#1e293b', mb: 1 }}>
            👤 Name: <span style={{ fontWeight: 400 }}>{user.firstName} {user.lastName}</span>
          </Typography>
          <Typography variant="subtitle1" fontWeight={600} sx={{ color: '#1e293b', mb: 1 }}>
            🧑 Username: <span style={{ fontWeight: 400 }}>{user.username}</span>
          </Typography>
          <Typography variant="subtitle1" fontWeight={600} sx={{ color: '#1e293b', mb: 1 }}>
            📧 Email: <span style={{ fontWeight: 400 }}>{user.email}</span>
          </Typography>
          <Typography variant="subtitle1" fontWeight={600} sx={{ color: '#1e293b', mb: 2 }}>
            🛡️ Role:
            <Chip
              label={user.role || 'N/A'}
              size="medium"
              sx={{
                ml: 1,
                backgroundColor: '#6366f1',
                color: '#ffffff',
                fontWeight: 600,
                px: 2,
                py: 0.5,
                fontSize: '0.9rem',
                borderRadius: 1,
              }}
            />
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ContributorCard;