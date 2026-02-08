import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  InputBase,
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
  Search as SearchIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Build as BuildIcon,
  Folder as FolderIcon,
  Business as BusinessIcon,
  Tune as TuneIcon,
} from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 24,
  backgroundColor: alpha(theme.palette.common.black, 0.04),
  border: `1px solid ${alpha(theme.palette.common.black, 0.08)}`,
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.06),
  },
  "&:focus-within": {
    backgroundColor: "white",
    border: `1px solid ${theme.palette.primary.main}`,
    boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.1)}`,
  },
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  width: 280,
  transition: "all 0.2s ease",
  [theme.breakpoints.down("md")]: {
    width: 200,
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.text.secondary,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    fontSize: "0.875rem",
    width: "100%",
  },
}));

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

const TopNav: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

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

        {/* Right Section: Search + Badge + Profile */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Search sx={{ display: { xs: "none", sm: "block" } }}>
            <SearchIconWrapper>
              <SearchIcon sx={{ fontSize: 20 }} />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search tools & documents…" inputProps={{ "aria-label": "search" }} />
          </Search>

          <Chip
            label="Silver"
            size="small"
            sx={{
              bgcolor: "grey.100",
              color: "grey.700",
              fontWeight: 600,
              fontSize: "0.75rem",
              borderRadius: 2,
              display: { xs: "none", md: "flex" },
            }}
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
