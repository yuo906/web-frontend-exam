import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0f766e',
    },
    secondary: {
      main: '#ea580c',
    },
    success: {
      main: '#2563eb',
    },
    background: {
      default: '#f8fafc',
    },
  },
  shape: {
    borderRadius: 18,
  },
  typography: {
    fontFamily: ['"Noto Sans TC"', '"Segoe UI"', 'system-ui', 'sans-serif'].join(','),
    'regular-2': {
      fontWeight: 400,
      fontSize: 14,
      lineHeight: 1.25,
    },
    'regular-3': {
      fontWeight: 400,
      fontSize: 16,
      lineHeight: 1.25,
    },
    'bold-5': {
      fontWeight: 700,
      fontSize: 24,
      lineHeight: 1.25,
    },
  },
  components: {},
});

export default theme;
