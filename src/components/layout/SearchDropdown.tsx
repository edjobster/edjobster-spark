import React, { useState, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  InputBase,
  Popover,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from '@mui/material';
import {
  Search as SearchIcon,
  Description as DescriptionIcon,
  Build as BuildIcon,
  History as HistoryIcon,
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { tools, Tool } from '@/data/tools';
import { mockDocuments, Document } from '@/data/mockDocuments';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 24,
  backgroundColor: alpha(theme.palette.common.black, 0.04),
  border: `1px solid ${alpha(theme.palette.common.black, 0.08)}`,
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.06),
  },
  '&:focus-within': {
    backgroundColor: 'white',
    border: `1px solid ${theme.palette.primary.main}`,
    boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.1)}`,
  },
  width: 280,
  transition: 'all 0.2s ease',
  [theme.breakpoints.down('md')]: {
    width: 200,
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    fontSize: '0.875rem',
    width: '100%',
  },
}));

interface SearchSuggestion {
  type: 'tool' | 'document';
  id: string;
  title: string;
  subtitle?: string;
  route: string;
}

const SearchDropdown: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const suggestions = useMemo((): SearchSuggestion[] => {
    const query = searchValue.toLowerCase().trim();
    const results: SearchSuggestion[] = [];

    // Filter tools
    const filteredTools = tools.filter(
      (tool) =>
        tool.title.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.category.toLowerCase().includes(query)
    );

    filteredTools.slice(0, 5).forEach((tool) => {
      results.push({
        type: 'tool',
        id: tool.id,
        title: tool.title,
        subtitle: tool.category,
        route: tool.route,
      });
    });

    // Filter documents
    const filteredDocs = mockDocuments.filter(
      (doc) =>
        doc.title.toLowerCase().includes(query) ||
        doc.type.toLowerCase().includes(query) ||
        doc.category.toLowerCase().includes(query)
    );

    filteredDocs.slice(0, 3).forEach((doc) => {
      results.push({
        type: 'document',
        id: doc.id,
        title: doc.title,
        subtitle: doc.type,
        route: '/vault',
      });
    });

    return results;
  }, [searchValue]);

  const defaultSuggestions = useMemo((): SearchSuggestion[] => {
    const results: SearchSuggestion[] = [];

    // Popular tools
    const popularTools = tools.slice(0, 4);
    popularTools.forEach((tool) => {
      results.push({
        type: 'tool',
        id: tool.id,
        title: tool.title,
        subtitle: tool.category,
        route: tool.route,
      });
    });

    // Recent documents
    const recentDocs = mockDocuments.slice(0, 3);
    recentDocs.forEach((doc) => {
      results.push({
        type: 'document',
        id: doc.id,
        title: doc.title,
        subtitle: doc.type,
        route: '/vault',
      });
    });

    return results;
  }, []);

  const handleSelect = (suggestion: SearchSuggestion) => {
    navigate(suggestion.route);
    setIsOpen(false);
    setSearchValue('');
  };

  const handleFocus = () => {
    setIsOpen(true);
  };

  const handleBlur = () => {
    // Delay to allow click on suggestion
    setTimeout(() => setIsOpen(false), 150);
  };

  const displayedSuggestions = searchValue.trim() ? suggestions : defaultSuggestions;
  const hasTools = displayedSuggestions.some((s) => s.type === 'tool');
  const hasDocs = displayedSuggestions.some((s) => s.type === 'document');

  return (
    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
      <Search ref={anchorRef}>
        <SearchIconWrapper>
          <SearchIcon sx={{ fontSize: 20 }} />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search tools & documents…"
          inputProps={{ 'aria-label': 'search' }}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </Search>

      <Popover
        open={isOpen && displayedSuggestions.length > 0}
        anchorEl={anchorRef.current}
        onClose={() => setIsOpen(false)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        disableAutoFocus
        disableEnforceFocus
        slotProps={{
          paper: {
            sx: {
              width: 320,
              maxHeight: 400,
              mt: 1,
              borderRadius: 2,
              boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.12)',
              bgcolor: 'background.paper',
              overflow: 'hidden',
            },
          },
        }}
      >
        <List sx={{ py: 1 }}>
          {hasTools && (
            <>
              <Typography
                variant="caption"
                sx={{
                  px: 2,
                  py: 0.5,
                  display: 'block',
                  color: 'text.secondary',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  fontSize: '0.7rem',
                }}
              >
                {searchValue.trim() ? 'Matching Tools' : 'Popular Tools'}
              </Typography>
              {displayedSuggestions
                .filter((s) => s.type === 'tool')
                .map((suggestion) => (
                  <ListItem key={`tool-${suggestion.id}`} disablePadding>
                    <ListItemButton
                      onClick={() => handleSelect(suggestion)}
                      sx={{ py: 1, px: 2 }}
                    >
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <BuildIcon sx={{ fontSize: 18, color: 'primary.main' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={suggestion.title}
                        secondary={suggestion.subtitle}
                        primaryTypographyProps={{ fontSize: '0.875rem' }}
                        secondaryTypographyProps={{ fontSize: '0.75rem' }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
            </>
          )}

          {hasTools && hasDocs && <Divider sx={{ my: 1 }} />}

          {hasDocs && (
            <>
              <Typography
                variant="caption"
                sx={{
                  px: 2,
                  py: 0.5,
                  display: 'block',
                  color: 'text.secondary',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  fontSize: '0.7rem',
                }}
              >
                {searchValue.trim() ? 'Matching Documents' : 'Recent Documents'}
              </Typography>
              {displayedSuggestions
                .filter((s) => s.type === 'document')
                .map((suggestion) => (
                  <ListItem key={`doc-${suggestion.id}`} disablePadding>
                    <ListItemButton
                      onClick={() => handleSelect(suggestion)}
                      sx={{ py: 1, px: 2 }}
                    >
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <DescriptionIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={suggestion.title}
                        secondary={suggestion.subtitle}
                        primaryTypographyProps={{ fontSize: '0.875rem' }}
                        secondaryTypographyProps={{ fontSize: '0.75rem' }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
            </>
          )}
        </List>
      </Popover>
    </Box>
  );
};

export default SearchDropdown;
