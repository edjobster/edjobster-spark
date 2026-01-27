import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { tools, ToolCategory } from '@/data/tools';
import ToolCard from './ToolCard';

const ToolGrid: React.FC = () => {
  const categories: ToolCategory[] = ['Letters', 'Policies', 'Contracts', 'Employer Branding'];
  
  return (
    <Box>
      {categories.map((category) => {
        const categoryTools = tools.filter((tool) => tool.category === category);
        if (categoryTools.length === 0) return null;
        
        return (
          <Box key={category} sx={{ mb: 4 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 2, 
                color: 'text.secondary',
                fontWeight: 600,
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {category}
            </Typography>
            <Box 
              sx={{ 
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                },
                gap: 3,
              }}
            >
              {categoryTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default ToolGrid;
