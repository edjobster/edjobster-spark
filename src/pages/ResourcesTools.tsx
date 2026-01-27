import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import ToolGrid from '@/components/tools/ToolGrid';
import { tools } from '@/data/tools';

const ResourcesTools: React.FC = () => {
  return (
    <Box>
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
          Resources & Tools Library
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          HR tools, templates, and frameworks for SMB founders
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
