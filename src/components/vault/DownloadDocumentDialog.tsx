import React, { useState } from 'react';
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
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Close as CloseIcon,
  PictureAsPdf as PdfIcon,
  Article as DocxIcon,
  Code as MarkdownIcon,
} from '@mui/icons-material';
import { Document as DocxDocument, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';
import { Document } from '@/data/mockDocuments';
import { defaultCompanyContext } from '@/data/companyContext';
import jsPDF from 'jspdf';

interface DownloadDocumentDialogProps {
  open: boolean;
  document: Document | null;
  onClose: () => void;
}

const DownloadDocumentDialog: React.FC<DownloadDocumentDialogProps> = ({ open, document, onClose }) => {
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({ open: false, message: '' });
  const company = defaultCompanyContext;

  if (!document) return null;

  const fileName = document.title.toLowerCase().replace(/\s+/g, '-');

  const handleDownloadMarkdown = () => {
    const blob = new Blob([document.content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement('a');
    a.href = url;
    a.download = `${fileName}.md`;
    window.document.body.appendChild(a);
    a.click();
    window.document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setSnackbar({ open: true, message: 'Markdown downloaded!' });
    onClose();
  };

  const handleDownloadPDF = () => {
    try {
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const margin = 20;
      const maxWidth = pageWidth - margin * 2;

      // Header
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text(company.companyName, margin, 20);
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'italic');
      pdf.text(`Release Date: ${document.createdAt}`, pageWidth - margin, 20, { align: 'right' });

      pdf.setDrawColor(200);
      pdf.line(margin, 25, pageWidth - margin, 25);

      // Content
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      const lines = pdf.splitTextToSize(document.content.replace(/[#*_`]/g, ''), maxWidth);
      let y = 35;
      const pageHeight = pdf.internal.pageSize.getHeight();

      for (const line of lines) {
        if (y > pageHeight - 30) {
          pdf.addPage();
          y = 20;
        }
        pdf.text(line, margin, y);
        y += 5;
      }

      // Footer
      pdf.setDrawColor(200);
      pdf.line(margin, pageHeight - 20, pageWidth - margin, pageHeight - 20);
      pdf.setFontSize(7);
      pdf.setTextColor(128);
      pdf.text(company.companyAddress, pageWidth / 2, pageHeight - 15, { align: 'center' });
      pdf.text(`${company.companyWebsite} | ${company.companyEmail}`, pageWidth / 2, pageHeight - 11, { align: 'center' });
      pdf.text('Created with Edjobster', pageWidth / 2, pageHeight - 7, { align: 'center' });

      pdf.save(`${fileName}.pdf`);
      setSnackbar({ open: true, message: 'PDF downloaded!' });
      onClose();
    } catch {
      setSnackbar({ open: true, message: 'Failed to generate PDF' });
    }
  };

  const handleDownloadDocx = async () => {
    try {
      const contentLines = document.content.split('\n');
      const children: Paragraph[] = [];

      children.push(new Paragraph({ children: [new TextRun({ text: company.companyName, bold: true, size: 28 })], alignment: AlignmentType.LEFT, spacing: { after: 100 } }));
      children.push(new Paragraph({ children: [new TextRun({ text: `Release Date: ${document.createdAt}`, size: 20, italics: true })], alignment: AlignmentType.RIGHT, spacing: { after: 300 } }));

      contentLines.forEach((line) => {
        if (line.startsWith('# ')) {
          children.push(new Paragraph({ text: line.replace('# ', ''), heading: HeadingLevel.HEADING_1, spacing: { before: 300, after: 150 } }));
        } else if (line.startsWith('## ')) {
          children.push(new Paragraph({ text: line.replace('## ', ''), heading: HeadingLevel.HEADING_2, spacing: { before: 250, after: 100 } }));
        } else if (line.startsWith('### ')) {
          children.push(new Paragraph({ text: line.replace('### ', ''), heading: HeadingLevel.HEADING_3, spacing: { before: 200, after: 100 } }));
        } else if (line.startsWith('- ') || line.startsWith('* ')) {
          children.push(new Paragraph({ text: line.replace(/^[-*] /, ''), bullet: { level: 0 }, spacing: { after: 50 } }));
        } else if (line.trim()) {
          const cleanText = line.replace(/\*\*/g, '').replace(/\*/g, '');
          children.push(new Paragraph({ children: [new TextRun({ text: cleanText })], spacing: { after: 100 } }));
        } else {
          children.push(new Paragraph({ text: '', spacing: { after: 100 } }));
        }
      });

      children.push(new Paragraph({ children: [new TextRun({ text: company.companyAddress, size: 18, color: '666666' })], alignment: AlignmentType.CENTER, spacing: { before: 400 } }));
      children.push(new Paragraph({ children: [new TextRun({ text: `${company.companyWebsite} | ${company.companyEmail}`, size: 18, color: '666666' })], alignment: AlignmentType.CENTER }));

      const doc = new DocxDocument({ sections: [{ children }] });
      const blob = await Packer.toBlob(doc);
      saveAs(blob, `${fileName}.docx`);
      setSnackbar({ open: true, message: 'DOCX downloaded!' });
      onClose();
    } catch {
      setSnackbar({ open: true, message: 'Failed to generate DOCX' });
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight={600}>Download Document</Typography>
          <IconButton onClick={onClose} size="small"><CloseIcon /></IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ py: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Select the format you'd like to download "{document.title}":
          </Typography>
          <List>
            <ListItemButton onClick={handleDownloadPDF} sx={{ borderRadius: 1, mb: 1, border: '1px solid', borderColor: 'divider' }}>
              <ListItemIcon><PdfIcon color="error" /></ListItemIcon>
              <ListItemText primary="PDF Document" secondary="Best for sharing and printing" />
            </ListItemButton>
            <ListItemButton onClick={handleDownloadDocx} sx={{ borderRadius: 1, mb: 1, border: '1px solid', borderColor: 'divider' }}>
              <ListItemIcon><DocxIcon color="primary" /></ListItemIcon>
              <ListItemText primary="Word Document (.docx)" secondary="Best for further editing" />
            </ListItemButton>
            <ListItemButton onClick={handleDownloadMarkdown} sx={{ borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
              <ListItemIcon><MarkdownIcon /></ListItemIcon>
              <ListItemText primary="Markdown (.md)" secondary="Best for developers and docs" />
            </ListItemButton>
          </List>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button variant="outlined" onClick={onClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackbar.open} autoHideDuration={2000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity="success" sx={{ width: '100%' }}>{snackbar.message}</Alert>
      </Snackbar>
    </>
  );
};

export default DownloadDocumentDialog;
