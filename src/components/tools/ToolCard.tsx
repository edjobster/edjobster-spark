import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  Button,
  Box,
  Stack,
} from '@mui/material';
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import { Tool, getCategoryColor } from '@/data/tools';

interface ToolCardProps {
  tool: Tool;
}

const getCtaText = (title: string): string => {
  if (title.includes('Builder')) return 'Create';
  return 'Generate';
};

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const navigate = useNavigate();

  const handleOpen = () => {
    navigate(tool.route);
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Chip
            label={tool.category}
            size="small"
            sx={{
              bgcolor: getCategoryColor(tool.category),
              color: 'white',
              fontSize: '0.7rem',
              height: 24,
            }}
          />
          <Chip
            label={tool.plan}
            size="small"
            variant="outlined"
            sx={{
              fontSize: '0.7rem',
              height: 24,
              borderColor: 'grey.300',
              color: 'grey.600',
            }}
          />
        </Stack>
        <Typography
          variant="h6"
          component="h3"
          sx={{
            mb: 1,
            fontWeight: 600,
            fontSize: '1rem',
            lineHeight: 1.3,
          }}
        >
          {tool.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            lineHeight: 1.5,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {tool.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
        <Button
          variant="text"
          color="primary"
          endIcon={<ArrowForwardIcon />}
          onClick={handleOpen}
          sx={{ fontWeight: 600 }}
        >
          {getCtaText(tool.title)}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ToolCard;
