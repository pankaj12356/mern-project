// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      default: '#FFFFFF', // ✅ Global white background
    },
    text: {
      primary: '#000000', // Optional: ensure contrast
    },
  },
});

export default theme;