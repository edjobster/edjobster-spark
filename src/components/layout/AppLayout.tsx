import React, { useState } from 'react';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import theme from '@/theme/muiTheme';

const DRAWER_WIDTH = 260;
const COLLAPSED_DRAWER_WIDTH = 72;

const AppLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar 
          open={sidebarOpen} 
          onToggle={handleToggleSidebar}
          drawerWidth={DRAWER_WIDTH}
          collapsedWidth={COLLAPSED_DRAWER_WIDTH}
        />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            ml: sidebarOpen ? `${DRAWER_WIDTH}px` : `${COLLAPSED_DRAWER_WIDTH}px`,
            transition: 'margin-left 0.3s ease',
            minHeight: '100vh',
            bgcolor: 'background.default',
          }}
        >
          <TopNav onToggleSidebar={handleToggleSidebar} sidebarOpen={sidebarOpen} />
          <Box sx={{ flexGrow: 1, p: 3 }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AppLayout;
