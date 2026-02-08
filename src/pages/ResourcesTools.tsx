import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import ToolGrid from '@/components/tools/ToolGrid';
import { tools } from '@/data/tools';

const ResourcesTools: React.FC = () => {
  return (
    <Box>
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          sx={{ 
            fontWeight: 800, 
            mb: 1.5,
            fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
            color: 'text.primary',
          }}
        >
          Build HR Documents in Minutes
        </Typography>
        <Typography 
          variant="body1" 
          color="text.secondary" 
          sx={{ 
            mb: 3, 
            fontSize: { xs: '1rem', md: '1.125rem' },
            maxWidth: 600,
          }}
        >
          AI-powered tools to create professional letters, policies, and contracts for your growing team
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip 
            label={`Silver Offerings (${tools.length} tools)`}
            sx={{ 
              bgcolor: 'grey.200',
              color: 'grey.700',
              fontWeight: 600,
            }} 
          />
        </Box>
      </Box>

      {/* Tools Grid */}
      <ToolGrid />
    </Box>
  );
};

export default ResourcesTools;
