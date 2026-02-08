import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  LinearProgress, 
  TextField, 
  InputAdornment, 
  IconButton, 
  Menu, 
  MenuItem, 
  Chip, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { 
  Search as SearchIcon, 
  Folder as FolderIcon, 
  MoreVert as MoreVertIcon, 
  Description as DescriptionIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Download as DownloadIcon,
  Share as ShareIcon,
  Delete as DeleteIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { mockDocuments as initialMockDocuments, mockVaultStats, mockCategories, Document } from '@/data/mockDocuments';

const DocumentsVault: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [documents, setDocuments] = useState<Document[]>(initialMockDocuments);

  const filteredDocs = documents.filter(doc => doc.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, doc: Document) => {
    setAnchorEl(event.currentTarget);
    setSelectedDocument(doc);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleViewClick = () => {
    handleMenuClose();
    if (selectedDocument) {
      setViewDialogOpen(true);
    }
  };

  const handleEditClick = () => {
    handleMenuClose();
    if (selectedDocument) {
      setEditedTitle(selectedDocument.title);
      setEditedContent(selectedDocument.content);
      setEditDialogOpen(true);
    }
  };

  const handleEditFromView = () => {
    setViewDialogOpen(false);
    if (selectedDocument) {
      setEditedTitle(selectedDocument.title);
      setEditedContent(selectedDocument.content);
      setEditDialogOpen(true);
    }
  };

  const handleSaveChanges = () => {
    if (selectedDocument) {
      setDocuments(docs => 
        docs.map(doc => 
          doc.id === selectedDocument.id 
            ? { ...doc, title: editedTitle, content: editedContent }
            : doc
        )
      );
      setSelectedDocument({ ...selectedDocument, title: editedTitle, content: editedContent });
    }
    setEditDialogOpen(false);
  };

  const handleCancelEdit = () => {
    setEditDialogOpen(false);
  };

  const handleCloseView = () => {
    setViewDialogOpen(false);
  };

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
                <TableCell>
                  <IconButton size="small" onClick={(e) => handleMenuClick(e, doc)}>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Actions Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleViewClick}>
          <ListItemIcon><VisibilityIcon fontSize="small" /></ListItemIcon>
          <ListItemText>View</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleEditClick}>
          <ListItemIcon><EditIcon fontSize="small" /></ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon><DownloadIcon fontSize="small" /></ListItemIcon>
          <ListItemText>Download</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon><ShareIcon fontSize="small" /></ListItemIcon>
          <ListItemText>Share</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
          <ListItemIcon><DeleteIcon fontSize="small" color="error" /></ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>

      {/* View Document Dialog */}
      <Dialog 
        open={viewDialogOpen} 
        onClose={handleCloseView} 
        maxWidth="md" 
        fullWidth
        PaperProps={{ sx: { maxHeight: '80vh' } }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', pb: 1 }}>
          <Box>
            <Typography variant="h6" component="div" fontWeight={600}>
              {selectedDocument?.title}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mt: 1, flexWrap: 'wrap' }}>
              <Typography variant="body2" color="text.secondary">
                Type: {selectedDocument?.type}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Category: {selectedDocument?.category}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Created: {selectedDocument?.createdAt}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Size: {selectedDocument?.size}
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={handleCloseView} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ py: 3 }}>
          <Paper 
            variant="outlined" 
            sx={{ 
              p: 3, 
              bgcolor: 'grey.50', 
              minHeight: 300,
              whiteSpace: 'pre-wrap',
              fontFamily: 'inherit',
              lineHeight: 1.7
            }}
          >
            {selectedDocument?.content}
          </Paper>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button variant="outlined" startIcon={<EditIcon />} onClick={handleEditFromView}>
            Edit
          </Button>
          <Button variant="contained" onClick={handleCloseView}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Document Dialog */}
      <Dialog 
        open={editDialogOpen} 
        onClose={handleCancelEdit} 
        maxWidth="md" 
        fullWidth
        PaperProps={{ sx: { maxHeight: '80vh' } }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight={600}>Edit Document</Typography>
          <IconButton onClick={handleCancelEdit} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ py: 3 }}>
          <TextField
            fullWidth
            label="Title"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            label="Content"
            multiline
            rows={12}
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button variant="outlined" onClick={handleCancelEdit}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DocumentsVault;
