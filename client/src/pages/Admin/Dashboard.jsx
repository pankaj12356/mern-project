import { Typography, Card, CardContent, Grid } from '@mui/material';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <Typography variant="h4" className="text-gray-800 font-semibold">
          Admin Dashboard 🛠️
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card className="shadow-sm">
              <CardContent>
                <Typography variant="h6">Manage Users</Typography>
                <Typography variant="body2" color="textSecondary">
                  View, edit, or delete user accounts.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card className="shadow-sm">
              <CardContent>
                <Typography variant="h6">Featured Tools</Typography>
                <Typography variant="body2" color="textSecondary">
                  Highlight tools for homepage visibility.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card className="shadow-sm">
              <CardContent>
                <Typography variant="h6">Analytics</Typography>
                <Typography variant="body2" color="textSecondary">
                  Track usage stats and user engagement.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default AdminDashboard;