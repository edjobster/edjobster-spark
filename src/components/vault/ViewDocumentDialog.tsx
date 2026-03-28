import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
  Divider,
  Paper,
} from '@mui/material';
import {
  Close as CloseIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import ReactMarkdown from 'react-markdown';
import { Document } from '@/data/mockDocuments';
import { defaultCompanyContext } from '@/data/companyContext';

interface ViewDocumentDialogProps {
  open: boolean;
  document: Document | null;
  onClose: () => void;
  onEdit: () => void;
}

const formatDate = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const ViewDocumentDialog: React.FC<ViewDocumentDialogProps> = ({ open, document, onClose, onEdit }) => {
  const company = defaultCompanyContext;

  if (!document) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth PaperProps={{ sx: { maxHeight: '90vh' } }}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', pb: 1 }}>
        <Box>
          <Typography variant="h6" component="div" fontWeight={600}>{document.title}</Typography>
          <Box sx={{ display: 'flex', gap: 2, mt: 1, flexWrap: 'wrap' }}>
            <Typography variant="body2" color="text.secondary">Type: {document.type}</Typography>
            <Typography variant="body2" color="text.secondary">Category: {document.category}</Typography>
            <Typography variant="body2" color="text.secondary">Created: {document.createdAt}</Typography>
            <Typography variant="body2" color="text.secondary">Size: {document.size}</Typography>
          </Box>
        </Box>
        <IconButton onClick={onClose} size="small"><CloseIcon /></IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ py: 3 }}>
        <Paper elevation={0} sx={{ bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
          {/* Letterhead */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', p: 3, pb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <img src={company.logoUrl} alt={`${company.companyName} Logo`} style={{ height: 50, width: 'auto' }} />
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main', fontSize: '1rem' }}>
                {company.companyName}
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>Release Date:</Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>{formatDate(new Date(document.createdAt))}</Typography>
            </Box>
          </Box>

          <Divider />

          {/* Document Body */}
          <Box sx={{
            p: 4,
            '& h1, & h2, & h3': { mt: 2, mb: 1, fontWeight: 600 },
            '& h1': { fontSize: '1.25rem' },
            '& h2': { fontSize: '1.1rem' },
            '& h3': { fontSize: '1rem' },
            '& p': { mb: 1.5, lineHeight: 1.7, fontSize: '0.875rem' },
            '& ul, & ol': { pl: 3, mb: 1.5 },
            '& li': { mb: 0.5, fontSize: '0.875rem' },
            '& strong': { fontWeight: 600 },
          }}>
            <ReactMarkdown>{document.content}</ReactMarkdown>
          </Box>

          <Divider />

          {/* Footer */}
          <Box sx={{ p: 2, textAlign: 'center', bgcolor: 'grey.50' }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', fontSize: '0.7rem' }}>
              {company.companyAddress}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', fontSize: '0.7rem', mt: 0.5 }}>
              {company.companyWebsite} | {company.companyEmail} | {company.companyPhone}
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(0,0,0,0.35)', display: 'block', fontSize: '0.65rem', mt: 1, fontStyle: 'italic' }}>
              Created with Edjobster
            </Typography>
          </Box>
        </Paper>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button variant="outlined" startIcon={<EditIcon />} onClick={onEdit}>Edit</Button>
        <Button variant="contained" onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewDocumentDialog;
