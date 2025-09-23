import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      default: '#F3F4F6', // Light Slate
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1E293B',
    },
    primary: {
      main: '#4F46E5',
    },
    success: {
      main: '#10B981',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#F3F4F6', // This overrides white
        },
      },
    },
  },
});

export default theme;