import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Box,
  Chip,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import {
  Person as PersonIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Build as BuildIcon,
  Folder as FolderIcon,
  Business as BusinessIcon,
  Tune as TuneIcon,
  CreditCard as CreditCardIcon,
  Lightbulb as LightbulbIcon,
  OpenInNew as OpenInNewIcon,
} from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";
import SearchDropdown from "./SearchDropdown";
import QuickCreateMenu from "./QuickCreateMenu";
import RequestToolDialog from "./RequestToolDialog";
import BuyCreditsDialog from "@/components/credits/BuyCreditsDialog";
import { useCredits } from "@/hooks/useCredits";

const NavButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active?: boolean }>(({ theme, active }) => ({
  borderRadius: 8,
  padding: "8px 16px",
  textTransform: "none",
  fontWeight: 500,
  fontSize: "0.875rem",
  color: active ? "white" : theme.palette.text.secondary,
  backgroundColor: active ? theme.palette.primary.main : "transparent",
  minWidth: "auto",
  "&:hover": {
    backgroundColor: active ? theme.palette.primary.dark : alpha(theme.palette.primary.main, 0.08),
    color: active ? "white" : theme.palette.primary.main,
  },
  "& .MuiButton-startIcon": {
    marginRight: 6,
  },
  [theme.breakpoints.down("md")]: {
    padding: "8px 12px",
    "& .nav-label": {
      display: "none",
    },
    "& .MuiButton-startIcon": {
      marginRight: 0,
    },
  },
}));

const menuItems = [
  {
    id: "tools",
    label: "AI Tools",
    icon: BuildIcon,
    path: "/",
  },
  {
    id: "vault",
    label: "Docs Vault",
    icon: FolderIcon,
    path: "/vault",
  },
  {
    id: "settings",
    label: "Settings",
    icon: TuneIcon,
    path: "/settings",
  },
  {
    id: "company",
    label: "Company",
    icon: BusinessIcon,
    path: "/company",
  },
];

const getCreditsColor = (remaining: number, total: number) => {
  const percentage = (remaining / total) * 100;
  if (percentage <= 10) return '#EF4444';
  if (percentage <= 30) return '#F59E0B';
  return '#10B981';
};

const TopNav: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [requestDialogOpen, setRequestDialogOpen] = useState(false);
  const [buyCreditsOpen, setBuyCreditsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { remaining } = useCredits();
  const creditsColor = getCreditsColor(remaining, 100);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/" || location.pathname.startsWith("/tools");
    }
    return location.pathname.startsWith(path);
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        color: "text.primary",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", minHeight: 64, px: { xs: 2, md: 3 } }}>
        {/* Left Section: Logo + Navigation */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* Logo */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mr: 3,
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: 1,
                bgcolor: "primary.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h6" sx={{ color: "white", fontWeight: 700 }}>
                E
              </Typography>
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "text.primary",
                display: { xs: "none", sm: "block" },
              }}
            >
              Edjobster
            </Typography>
          </Box>

          {/* Navigation Tabs */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavButton
                  key={item.id}
                  active={isActive(item.path)}
                  startIcon={<Icon sx={{ fontSize: 20 }} />}
                  onClick={() => navigate(item.path)}
                >
                  <span className="nav-label">{item.label}</span>
                </NavButton>
              );
            })}
          </Box>
        </Box>

        {/* Right Section: Search + Credits + Quick Create + Request Tool + Profile */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <SearchDropdown />

          <Chip
            icon={<CreditCardIcon sx={{ fontSize: 16 }} />}
            label={`${remaining} Credits`}
            size="small"
            onClick={() => setBuyCreditsOpen(true)}
            sx={{
              bgcolor: alpha(creditsColor, 0.1),
              color: creditsColor,
              fontWeight: 600,
              fontSize: "0.75rem",
              borderRadius: 2,
              cursor: 'pointer',
              display: { xs: "none", md: "flex" },
              '&:hover': {
                bgcolor: alpha(creditsColor, 0.2),
              },
            }}
          />
          <BuyCreditsDialog
            open={buyCreditsOpen}
            onClose={() => setBuyCreditsOpen(false)}
          />

          <QuickCreateMenu />

          <Button
            variant="outlined"
            size="small"
            startIcon={<LightbulbIcon />}
            onClick={() => setRequestDialogOpen(true)}
            sx={{
              display: { xs: "none", md: "flex" },
              textTransform: 'none',
              borderRadius: 2,
            }}
          >
            Request Tool
          </Button>
          <RequestToolDialog
            open={requestDialogOpen}
            onClose={() => setRequestDialogOpen(false)}
          />

          <IconButton onClick={handleProfileClick} sx={{ p: 0 }}>
            <Avatar
              sx={{
                width: 36,
                height: 36,
                bgcolor: "primary.main",
                fontSize: "0.875rem",
                fontWeight: 600,
              }}
            >
              PS
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 3,
              sx: {
                minWidth: 220,
                mt: 1.5,
                borderRadius: 2,
                overflow: "visible",
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 16,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                  borderLeft: "1px solid",
                  borderTop: "1px solid",
                  borderColor: "divider",
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <Box sx={{ px: 2, py: 1.5 }}>
              <Typography variant="subtitle2" fontWeight={600}>
                Priya Sharma
              </Typography>
              <Typography variant="caption" color="text.secondary">
                priya@acmetech.com
              </Typography>
            </Box>
            <Divider />
            <MenuItem sx={{ py: 1.5 }}>
              <PersonIcon sx={{ mr: 1.5, fontSize: 20, color: "text.secondary" }} />
              <Typography variant="body2">Profile</Typography>
            </MenuItem>
            <MenuItem sx={{ py: 1.5 }}>
              <SettingsIcon sx={{ mr: 1.5, fontSize: 20, color: "text.secondary" }} />
              <Typography variant="body2">Settings</Typography>
            </MenuItem>
            <Divider />
            <MenuItem
              sx={{ py: 1.5 }}
              onClick={() => window.open('https://www.edjobster.com', '_blank')}
            >
              <OpenInNewIcon sx={{ mr: 1.5, fontSize: 20, color: "text.secondary" }} />
              <Typography variant="body2">Go to Edjobster ATS</Typography>
            </MenuItem>
            <Divider />
            <MenuItem sx={{ py: 1.5, color: "error.main" }}>
              <LogoutIcon sx={{ mr: 1.5, fontSize: 20 }} />
              <Typography variant="body2">Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopNav;
