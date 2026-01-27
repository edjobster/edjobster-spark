import React, { useState } from 'react';
import { Box, Typography, Paper, LinearProgress, TextField, InputAdornment, IconButton, Menu, MenuItem, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Search as SearchIcon, Folder as FolderIcon, MoreVert as MoreVertIcon, Description as DescriptionIcon } from '@mui/icons-material';
import { mockDocuments, mockVaultStats, mockCategories } from '@/data/mockDocuments';

const DocumentsVault: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const filteredDocs = mockDocuments.filter(doc => doc.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>Documents Vault</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>Manage and organize your generated HR documents</Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Vault Status</Typography>
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="body2">Documents</Typography>
              <Typography variant="body2" color="text.secondary">{mockVaultStats.documentsUsed}/{mockVaultStats.documentsLimit}</Typography>
            </Box>
            <LinearProgress variant="determinate" value={(mockVaultStats.documentsUsed / mockVaultStats.documentsLimit) * 100} sx={{ height: 8, borderRadius: 1 }} />
          </Box>
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="body2">Downloads this month</Typography>
              <Typography variant="body2" color="text.secondary">{mockVaultStats.downloadsUsed}/{mockVaultStats.downloadsLimit}</Typography>
            </Box>
            <LinearProgress variant="determinate" value={(mockVaultStats.downloadsUsed / mockVaultStats.downloadsLimit) * 100} sx={{ height: 8, borderRadius: 1 }} />
          </Box>
        </Paper>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Vault Limits</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="body2">Storage: {mockVaultStats.storageUsedMB} MB / {mockVaultStats.storageLimitMB} MB</Typography>
            <Typography variant="body2">Document retention: {mockVaultStats.retentionDays} days</Typography>
            <Chip label="Silver Plan" size="small" sx={{ width: 'fit-content', mt: 1 }} />
          </Box>
        </Paper>
      </Box>

      <TextField fullWidth placeholder="Search documents..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} sx={{ mb: 3 }} InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }} />

      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Categories</Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 2, mb: 4 }}>
        {mockCategories.map((cat) => (
          <Paper key={cat.name} sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2, cursor: 'pointer', '&:hover': { bgcolor: 'grey.50' } }}>
            <FolderIcon color="primary" />
            <Box><Typography variant="body2" fontWeight={600}>{cat.name}</Typography><Typography variant="caption" color="text.secondary">{cat.count} documents</Typography></Box>
          </Paper>
        ))}
      </Box>

      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>All Documents</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead><TableRow><TableCell>Document</TableCell><TableCell>Type</TableCell><TableCell>Category</TableCell><TableCell>Created</TableCell><TableCell>Size</TableCell><TableCell></TableCell></TableRow></TableHead>
          <TableBody>
            {filteredDocs.map((doc) => (
              <TableRow key={doc.id} hover>
                <TableCell><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><DescriptionIcon color="action" fontSize="small" />{doc.title}</Box></TableCell>
                <TableCell>{doc.type}</TableCell>
                <TableCell><Chip label={doc.category} size="small" /></TableCell>
                <TableCell>{doc.createdAt}</TableCell>
                <TableCell>{doc.size}</TableCell>
                <TableCell><IconButton size="small" onClick={(e) => setAnchorEl(e.currentTarget)}><MoreVertIcon /></IconButton></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={() => setAnchorEl(null)}>Download</MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>Share</MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)} sx={{ color: 'error.main' }}>Delete</MenuItem>
      </Menu>
    </Box>
  );
};

export default DocumentsVault;
