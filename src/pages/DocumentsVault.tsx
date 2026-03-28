import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Divider,
  ListItemIcon,
  ListItemText,
  Snackbar,
  Alert,
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
} from '@mui/icons-material';
import { mockDocuments as initialMockDocuments, mockVaultStats, mockCategories, Document } from '@/data/mockDocuments';
import ViewDocumentDialog from '@/components/vault/ViewDocumentDialog';
import DownloadDocumentDialog from '@/components/vault/DownloadDocumentDialog';
import ShareDocumentDialog from '@/components/vault/ShareDocumentDialog';
import DeleteDocumentDialog from '@/components/vault/DeleteDocumentDialog';

const documentTypeToRoute: Record<string, string> = {
  'Offer Letter': '/tools/offer-letter',
  'Appointment Letter': '/tools/appointment-letter',
  'Confirmation Letter': '/tools/confirmation-letter',
  'Increment Letter': '/tools/increment-letter',
  'Experience Letter': '/tools/experience-letter',
  'Relieving Letter': '/tools/relieving-letter',
  'Leave Policy': '/tools/leave-policy',
  'WFH Policy': '/tools/wfh-policy',
  'Freelancer Contract': '/tools/freelancer-contract',
  'NDA': '/tools/nda',
  'EVP': '/tools/evp-builder',
  'Branding Post': '/tools/branding-post',
};

const DocumentsVault: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [documents, setDocuments] = useState<Document[]>(initialMockDocuments);

  // Dialog states
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [downloadDialogOpen, setDownloadDialogOpen] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({ open: false, message: '' });

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
    setViewDialogOpen(true);
  };

  const handleEditClick = () => {
    handleMenuClose();
    if (selectedDocument) {
      const route = documentTypeToRoute[selectedDocument.type];
      if (route) {
        navigate(route, { state: { editDocument: selectedDocument } });
      } else {
        setSnackbar({ open: true, message: 'No editor available for this document type.' });
      }
    }
  };

  const handleEditFromView = () => {
    setViewDialogOpen(false);
    if (selectedDocument) {
      const route = documentTypeToRoute[selectedDocument.type];
      if (route) {
        navigate(route, { state: { editDocument: selectedDocument } });
      }
    }
  };

  const handleDownloadClick = () => {
    handleMenuClose();
    setDownloadDialogOpen(true);
  };

  const handleShareClick = () => {
    handleMenuClose();
    setShareDialogOpen(true);
  };

  const handleDeleteClick = () => {
    handleMenuClose();
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedDocument) {
      setDocuments(docs => docs.filter(doc => doc.id !== selectedDocument.id));
      setSnackbar({ open: true, message: `"${selectedDocument.title}" deleted successfully.` });
      setSelectedDocument(null);
    }
    setDeleteDialogOpen(false);
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
              <Typography variant="body2" color="text.secondary">{documents.length}/{mockVaultStats.documentsLimit}</Typography>
            </Box>
            <LinearProgress variant="determinate" value={(documents.length / mockVaultStats.documentsLimit) * 100} sx={{ height: 8, borderRadius: 1 }} />
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
            {filteredDocs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                  <Typography variant="body2" color="text.secondary">No documents found.</Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredDocs.map((doc) => (
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
              ))
            )}
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
        <MenuItem onClick={handleDownloadClick}>
          <ListItemIcon><DownloadIcon fontSize="small" /></ListItemIcon>
          <ListItemText>Download</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleShareClick}>
          <ListItemIcon><ShareIcon fontSize="small" /></ListItemIcon>
          <ListItemText>Share</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleDeleteClick} sx={{ color: 'error.main' }}>
          <ListItemIcon><DeleteIcon fontSize="small" color="error" /></ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>

      {/* Dialogs */}
      <ViewDocumentDialog
        open={viewDialogOpen}
        document={selectedDocument}
        onClose={() => setViewDialogOpen(false)}
        onEdit={handleEditFromView}
      />
      <DownloadDocumentDialog
        open={downloadDialogOpen}
        document={selectedDocument}
        onClose={() => setDownloadDialogOpen(false)}
      />
      <ShareDocumentDialog
        open={shareDialogOpen}
        document={selectedDocument}
        onClose={() => setShareDialogOpen(false)}
      />
      <DeleteDocumentDialog
        open={deleteDialogOpen}
        document={selectedDocument}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
      />

      {/* Snackbar */}
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity="success" sx={{ width: '100%' }}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default DocumentsVault;
