import { Typography, Card, CardContent } from '@mui/material';

const WelcomeSection = ({ user }) => (
  <Card className="shadow-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
    <CardContent className="p-6">
      <Typography variant="h4" fontWeight="bold">
        Welcome, {user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.username} 👋
      </Typography>
      <Typography variant="body1">
        Here's your personalized dashboard. Manage your account, explore tools, and stay productive.
      </Typography>
    </CardContent>
  </Card>
);

export default WelcomeSection;