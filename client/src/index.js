// src/index.js
import React, { useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { getTheme } from './theme'; // this is from the previous step

const Root = () => {
  const [mode, setMode] = useState('light');
  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App toggleTheme={() => setMode(prev => (prev === 'light' ? 'dark' : 'light'))} />
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
