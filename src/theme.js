import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#E6E6E6',
    },
    grey: {
      main: '#999999',
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
  components: {
    MuiChip: {
      styleOverrides: {
        sizeSmall: {
          height: '18px',
          fontSize: '10px',
          '& .MuiChip-label': {
            paddingLeft: 6,
            paddingRight: 6,
            lineHeight: '18px',
          },
        },
      },
    },
  },
});

export default theme;
