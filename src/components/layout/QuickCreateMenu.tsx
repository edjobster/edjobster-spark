import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from '@mui/material';
import {
  Add as AddIcon,
  Description as DescriptionIcon,
  Assignment as AssignmentIcon,
  Security as SecurityIcon,
  BeachAccess as BeachAccessIcon,
  WorkHistory as WorkHistoryIcon,
} from '@mui/icons-material';

interface QuickCreateItem {
  id: string;
  label: string;
  route: string;
  icon: React.ReactNode;
}

const quickCreateItems: QuickCreateItem[] = [
  {
    id: 'offer-letter',
    label: 'Offer Letter',
    route: '/tools/offer-letter',
    icon: <DescriptionIcon sx={{ fontSize: 20 }} />,
  },
  {
    id: 'appointment-letter',
    label: 'Appointment Letter',
    route: '/tools/appointment-letter',
    icon: <AssignmentIcon sx={{ fontSize: 20 }} />,
  },
  {
    id: 'nda',
    label: 'NDA',
    route: '/tools/nda',
    icon: <SecurityIcon sx={{ fontSize: 20 }} />,
  },
  {
    id: 'leave-policy',
    label: 'Leave Policy',
    route: '/tools/leave-policy',
    icon: <BeachAccessIcon sx={{ fontSize: 20 }} />,
  },
  {
    id: 'experience-letter',
    label: 'Experience Letter',
    route: '/tools/experience-letter',
    icon: <WorkHistoryIcon sx={{ fontSize: 20 }} />,
  },
];

const QuickCreateMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = (route: string) => {
    navigate(route);
    handleClose();
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        sx={{
          width: 36,
          height: 36,
          bgcolor: 'primary.main',
          color: 'white',
          '&:hover': {
            bgcolor: 'primary.dark',
          },
          boxShadow: '0px 2px 8px rgba(25, 118, 210, 0.3)',
        }}
      >
        <AddIcon sx={{ fontSize: 22 }} />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            minWidth: 220,
            mt: 1.5,
            borderRadius: 2,
            boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.12)',
            bgcolor: 'background.paper',
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Typography
          variant="caption"
          sx={{
            px: 2,
            py: 1,
            display: 'block',
            color: 'text.secondary',
            fontWeight: 600,
            textTransform: 'uppercase',
            fontSize: '0.7rem',
          }}
        >
          Quick Create
        </Typography>
        <Divider sx={{ mb: 0.5 }} />
        {quickCreateItems.map((item) => (
          <MenuItem
            key={item.id}
            onClick={() => handleItemClick(item.route)}
            sx={{ py: 1.25, px: 2 }}
          >
            <ListItemIcon sx={{ minWidth: 32, color: 'primary.main' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{ fontSize: '0.875rem' }}
            />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default QuickCreateMenu;
