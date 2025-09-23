

import { Card, Typography, Grid } from '@mui/material';

const ExtraPartsSection = () => (
  <Card className="shadow-md p-6 mt-8">
    <Typography variant="h6" gutterBottom>Quick Access</Typography>
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Card className="p-4 shadow-sm hover:shadow-md transition">
          <Typography variant="subtitle1">📁 My Projects</Typography>
          <Typography variant="body2" color="textSecondary">View and manage your saved projects.</Typography>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card className="p-4 shadow-sm hover:shadow-md transition">
          <Typography variant="subtitle1">📊 Analytics</Typography>
          <Typography variant="body2" color="textSecondary">Track usage and performance stats.</Typography>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card className="p-4 shadow-sm hover:shadow-md transition">
          <Typography variant="subtitle1">🧩 Plugins</Typography>
          <Typography variant="body2" color="textSecondary">Explore available tools and extensions.</Typography>
        </Card>
      </Grid>
    </Grid>
  </Card>
);

export default ExtraPartsSection;