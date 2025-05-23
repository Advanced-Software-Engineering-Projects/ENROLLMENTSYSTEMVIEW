import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Divider,
  Chip,
  Button,
  Alert,
  Paper,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import TitleBar from '../../components/Titlebar/Titlebar';
import Logo from '../../assets/Images/Logo/Logo.png';

// Mock data
const mockFeeInformation = [
  { feeId: 'F001', feeType: 'Tuition Fee', amount: 5000, dueDate: '2025-04-01', isPaid: false },
  { feeId: 'F002', feeType: 'Book Fee', amount: 150, dueDate: '2025-03-15', isPaid: true },
  { feeId: 'F003', feeType: 'General Service Fee', amount: 300, dueDate: '2025-05-01', isPaid: false },
];

const mockFeeHolds = [
  { hold: 'Enrollment Hold', reason: 'Unpaid Tuition Fee of $5000 due on 2025-04-01' },
  { hold: 'Transcript Hold', reason: 'Unpaid General Service Fee of $300 due on 2025-05-01' },
];

const mockPaymentRecords = [
  {
    semester: '2024-S1',
    fees: [
      { feeId: 'F101', feeType: 'Tuition Fee', amount: 4800, dueDate: '2024-04-01', isPaid: true },
      { feeId: 'F102', feeType: 'Book Fee', amount: 120, dueDate: '2024-03-15', isPaid: true },
    ],
  },
  {
    semester: '2024-S2',
    fees: [
      { feeId: 'F201', feeType: 'Tuition Fee', amount: 4900, dueDate: '2024-09-01', isPaid: true },
      { feeId: 'F202', feeType: 'General Service Fee', amount: 280, dueDate: '2024-08-15', isPaid: false },
    ],
  },
  {
    semester: '2025-S1',
    fees: mockFeeInformation,
  },
];

// Mock API functions
const getFeeInformation = async () =>
  new Promise((resolve) => setTimeout(() => resolve(mockFeeInformation), 500));

const checkFeeHolds = async () =>
  new Promise((resolve) => setTimeout(() => resolve(mockFeeHolds), 500));

const markFeeAsPaid = async (feeId) =>
  new Promise((resolve) => setTimeout(() => resolve(), 300));

// Function to generate PDF invoice
const generateInvoicePDF = (fee) => {
  const doc = new jsPDF();

  try {
    // Add logo
    console.log('[Fees] Adding logo to PDF');
    doc.addImage(Logo, 'PNG', 20, 10, 50, 20);
  } catch (err) {
    console.warn('[Fees] Failed to add logo to PDF:', err.message);
  }

  // Core content
  doc.setFontSize(12);
  doc.text('Invoice', 150, 20);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 40);
  doc.text(`Time: ${new Date().toLocaleTimeString()}`, 20, 50);
  doc.text('Student Name: John Doe', 20, 60);
  doc.text('Student ID: S123456', 20, 70);
  doc.text('Payment Method: M-Paisa', 20, 80);

  // Fee Table
  autoTable(doc, {
    startY: 90,
    head: [['Fee ID', 'Fee Type', 'Amount', 'Due Date', 'Status']],
    body: [[
      fee.feeId,
      fee.feeType,
      `$${fee.amount.toLocaleString()}`,
      new Date(fee.dueDate).toLocaleDateString(),
      fee.isPaid ? 'Paid' : 'Unpaid',
    ]],
    theme: 'striped',
    styles: { fontSize: 10, cellPadding: 4 },
    headStyles: { fillColor: '#094c50', textColor: '#ffffff' },
  });

  // Footer
  doc.setFontSize(10);
  doc.text('Thank you for your payment!', 20, doc.lastAutoTable.finalY + 20);

  return doc;
};

// Fees Component
const Fees = () => {
  const [feeHolds, setFeeHolds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch fee holds
  useEffect(() => {
    const fetchHolds = async () => {
      setLoading(true);
      try {
        const holdsData = await checkFeeHolds();
        setFeeHolds(holdsData);
      } catch (error) {
        setError('Failed to load fee holds.');
        console.error('Error fetching holds:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHolds();
  }, []);

  // Handle View Invoice (open in new tab)
  const handleViewInvoice = (fee) => {
    try {
      console.log('[Fees] Generating PDF for view');
      const doc = generateInvoicePDF(fee);
      const pdfBlob = doc.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl, '_blank');
    } catch (err) {
      console.error('[Fees] View Invoice Error:', err);
      setError('Failed to generate invoice PDF.');
    }
  };

  // Handle Download PDF
  const handleDownloadPDF = (fee) => {
    try {
      console.log('[Fees] Generating PDF for download');
      const doc = generateInvoicePDF(fee);
      doc.save(`Invoice_${fee.feeId}.pdf`);
      console.log('[Fees] PDF downloaded:', `Invoice_${fee.feeId}.pdf`);
    } catch (err) {
      console.error('[Fees] Download PDF Error:', err);
      setError('Failed to download invoice PDF.');
    }
  };

  // Loading State
  if (loading) {
    return (
      <DashboardLayout>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" color="textSecondary">
            Loading Fee Information...
          </Typography>
        </Box>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Grid container spacing={2} sx={{ background: 'linear-gradient(180deg, #f5f5f5 0%, #e0f7fa 100%)', p: 3 }}>
        <Grid item xs={12}>
          <TitleBar title="FEES INFORMATION" />
        </Grid>

        {/* Error Display */}
        {error && (
          <Grid item xs={12}>
            <Alert severity="error" sx={{ mb: 3, borderRadius: '12px' }} onClose={() => setError('')}>
              {error}
            </Alert>
          </Grid>
        )}

        {/* Payment Records by Semester */}
        <Grid item xs={12}>
          <Card elevation={6} sx={{ borderRadius: '20px', overflow: 'hidden', backgroundColor: '#ffffff', mt: 4 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ color: '#094c50', fontWeight: 'bold' }}>
                Payment Records by Semester
              </Typography>
              <Divider sx={{ mb: 2, borderColor: '#e0e0e0' }} />
              {mockPaymentRecords.length === 0 ? (
                <Typography align="center" color="textSecondary">
                  No payment records available.
                </Typography>
              ) : (
                mockPaymentRecords.map((record) => (
                  <Accordion key={record.semester} sx={{ mb: 1, borderRadius: '12px', '&:before': { display: 'none' } }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      sx={{ backgroundColor: '#f9f9f9', borderRadius: '12px', '&:hover': { backgroundColor: '#f0f0f0' } }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 'medium', color: '#094c50' }}>
                        Semester: {record.semester}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 2 }}>
                      <Grid container spacing={2}>
                        {record.fees.map((fee) => (
                          <Grid item xs={12} key={fee.feeId}>
                            <Box
                              sx={{
                                p: 2,
                                border: '1px solid #e0e0e0',
                                borderRadius: '12px',
                                backgroundColor: '#fafafa',
                                transition: 'all 0.3s ease',
                                '&:hover': { backgroundColor: '#f5f5f5', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' },
                              }}
                            >
                              <Grid container spacing={1} alignItems="center">
                                <Grid item xs={12} sm={3}>
                                  <Typography variant="body2" color="textSecondary">
                                    Fee Type:
                                  </Typography>
                                  <Typography variant="subtitle2" sx={{ fontWeight: 'medium', color: '#094c50' }}>
                                    {fee.feeType}
                                  </Typography>
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                  <Typography variant="body2" color="textSecondary">
                                    Amount:
                                  </Typography>
                                  <Typography variant="subtitle2" sx={{ fontWeight: 'medium', color: '#388e3c' }}>
                                    ${fee.amount.toLocaleString()}
                                  </Typography>
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                  <Typography variant="body2" color="textSecondary">
                                    Due Date:
                                  </Typography>
                                  <Typography variant="subtitle2" sx={{ fontWeight: 'medium' }}>
                                    {new Date(fee.dueDate).toLocaleDateString()}
                                  </Typography>
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                  <Typography variant="body2" color="textSecondary">
                                    Status:
                                  </Typography>
                                  <Chip
                                    label={fee.isPaid ? 'Paid' : 'Unpaid'}
                                    color={fee.isPaid ? 'success' : 'error'}
                                    size="small"
                                    sx={{ fontWeight: 'bold' }}
                                  />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                    <Button
                                      variant="outlined"
                                      color="primary"
                                      size="small"
                                      sx={{ textTransform: 'none', fontWeight: 'bold', borderRadius: '8px', borderColor: '#2596be', color: '#2596be', '&:hover': { borderColor: '#1a6d8c', color: '#1a6d8c' } }}
                                      onClick={() => handleViewInvoice(fee)}
                                    >
                                      View Invoice
                                    </Button>
                                    <Button
                                      variant="contained"
                                      color="primary"
                                      size="small"
                                      sx={{ textTransform: 'none', fontWeight: 'bold', borderRadius: '8px', bgcolor: '#2596be', '&:hover': { bgcolor: '#1a6d8c' } }}
                                      onClick={() => handleDownloadPDF(fee)}
                                    >
                                      Download PDF
                                    </Button>
                                  </Box>
                                </Grid>
                              </Grid>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                ))
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Fee Holds Section */}
        {feeHolds.length > 0 && (
          <Grid item xs={12}>
            <Card elevation={6} sx={{ borderRadius: '20px', overflow: 'hidden', backgroundColor: '#ffffff', mt: 4 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom sx={{ color: '#094c50', fontWeight: 'bold' }}>
                  Fee Holds
                  <Chip
                    label={`${feeHolds.length} Holds`}
                    size="small"
                    color="error"
                    sx={{ ml: 2, fontWeight: 'bold', bgcolor: '#d32f2f' }}
                  />
                </Typography>
                <Divider sx={{ mb: 2, borderColor: '#e0e0e0' }} />
                <Table sx={{ minWidth: 300 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold', color: '#094c50' }}>Hold Type</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#094c50' }}>Reason</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {feeHolds.map((hold, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Chip
                            label={hold.hold}
                            color="error"
                            size="medium"
                            sx={{ fontWeight: 'bold' }}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="textPrimary">
                            {hold.reason}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </DashboardLayout>
  );
};

export default Fees;