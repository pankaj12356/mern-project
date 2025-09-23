import { Card, CardContent, Avatar, Typography, Box } from '@mui/material';

const ProfileCard = ({ user }) => (
  <Card className="shadow-md">
    <CardContent className="flex items-center gap-6 p-6">
      <Avatar src={user.profileImage} alt={user.username} sx={{ width: 80, height: 80 }} />
      <Box>
        <Typography variant="h6">{user.username}</Typography>
        <Typography variant="body2">{user.email}</Typography>
        <Typography variant="body2" color="textSecondary">
          Role: {user.role}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

export default ProfileCard;