import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Typography, Card, CardContent, Avatar } from '@mui/material';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Typography variant="h4" className="text-gray-800 font-semibold">
          Welcome back, {user?.firstName || 'Developer'} 👋
        </Typography>

        <Card className="shadow-md">
          <CardContent className="flex items-center gap-6">
            <Avatar
              src={user?.profileImage}
              alt={user?.username}
              sx={{ width: 64, height: 64 }}
            />
            <div>
              <Typography variant="h6">{user?.username}</Typography>
              <Typography variant="body2" color="textSecondary">
                {user?.email}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Role: {user?.role}
              </Typography>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Tool preview cards or quick actions */}
          <Card className="shadow-sm">
            <CardContent>
              <Typography variant="h6">My Tools</Typography>
              <Typography variant="body2" color="textSecondary">
                View and manage your tool history.
              </Typography>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent>
              <Typography variant="h6">Profile Settings</Typography>
              <Typography variant="body2" color="textSecondary">
                Update your name, password, or profile image.
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;