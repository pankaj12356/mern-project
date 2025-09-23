import { useState } from 'react';
import { Box, Typography, Button, TextField, Card, CardContent } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

const UuidTool = () => {
  const [uuid, setUuid] = useState('');

  const generateUuid = () => {
    const newUuid = uuidv4();
    setUuid(newUuid);
  };

  return (
    <Box className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <Card className="w-full max-w-xl shadow-lg p-6">
        <CardContent className="space-y-4">
          <Typography variant="h4" className="text-center font-semibold text-indigo-600">
            UUID Generator 🔧
          </Typography>

          <Typography variant="body1" className="text-center text-gray-700">
            Click the button below to generate a new UUID (Universally Unique Identifier).
          </Typography>

          <TextField
            label="Generated UUID"
            value={uuid}
            fullWidth
            InputProps={{ readOnly: true }}
          />

          <Button variant="contained" color="primary" fullWidth onClick={generateUuid}>
            Generate UUID
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UuidTool;