import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import theme from './utils/theme.component';
import { ThemeProvider } from '@mui/material';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
