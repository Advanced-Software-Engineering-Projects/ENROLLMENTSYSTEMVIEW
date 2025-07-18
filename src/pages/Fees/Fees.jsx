// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Typography,
//   Grid,
//   Divider,
//   Chip,
//   Button,
//   Alert,
//   Paper,
//   Card,
//   CardContent,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
// import { jsPDF } from 'jspdf';
// import autoTable from 'jspdf-autotable';
// import TitleBar from '../../components/Titlebar/Titlebar';
// import Logo from '../../assets/Images/Logo/Logo.png';

// // Mock data
// const mockFeeInformation = [
//   { feeId: 'F001', feeType: 'Tuition Fee', amount: 5000, dueDate: '2025-04-01', isPaid: false },
//   { feeId: 'F002', feeType: 'Book Fee', amount: 150, dueDate: '2025-03-15', isPaid: true },
//   { feeId: 'F003', feeType: 'General Service Fee', amount: 300, dueDate: '2025-05-01', isPaid: false },
// ];

// const mockFeeHolds = [
//   { hold: 'Enrollment Hold', reason: 'Unpaid Tuition Fee of $5000 due on 2025-04-01' },
//   { hold: 'Transcript Hold', reason: 'Unpaid General Service Fee of $300 due on 2025-05-01' },
// ];

// const mockPaymentRecords = [
//   {
//     semester: '2024-S1',
//     fees: [
//       { feeId: 'F101', feeType: 'Tuition Fee', amount: 4800, dueDate: '2024-04-01', isPaid: true },
//       { feeId: 'F102', feeType: 'Book Fee', amount: 120, dueDate: '2024-03-15', isPaid: true },
//     ],
//   },
//   {
//     semester: '2024-S2',
//     fees: [
//       { feeId: 'F201', feeType: 'Tuition Fee', amount: 4900, dueDate: '2024-09-01', isPaid: true },
//       { feeId: 'F202', feeType: 'General Service Fee', amount: 280, dueDate: '2024-08-15', isPaid: false },
//     ],
//   },
//   {
//     semester: '2025-S1',
//     fees: mockFeeInformation,
//   },
// ];

// // Mock API functions
// const getFeeInformation = async () =>
//   new Promise((resolve) => setTimeout(() => resolve(mockFeeInformation), 500));

// const checkFeeHolds = async () =>
//   new Promise((resolve) => setTimeout(() => resolve(mockFeeHolds), 500));

// const markFeeAsPaid = async (feeId) =>
//   new Promise((resolve) => setTimeout(() => resolve(), 300));

// // Function to generate PDF invoice
// const generateInvoicePDF = (fee) => {
//   const doc = new jsPDF();

//   try {
//     // Add logo
//     console.log('[Fees] Adding logo to PDF');
//     doc.addImage(Logo, 'PNG', 15, 10, 40, 40);
//   } catch (err) {
//     console.warn('[Fees] Failed to add logo to PDF:', err.message);
//   }

//   // Core content
//   doc.setFontSize(12);
//   doc.text('Invoice', 150, 40);
//   doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 100);
//   doc.text(`Time: ${new Date().toLocaleTimeString()}`, 20, 60);
//   doc.text('Student Name: John Doe', 20, 70);
//   doc.text('Student ID: S123456', 20, 80);
//   doc.text('Payment Method: M-Paisa', 20, 90);

//   // Fee Table
//   autoTable(doc, {
//     startY: 110,
//     head: [['Fee ID', 'Fee Type', 'Amount', 'Due Date', 'Status']],
//     body: [[
//       fee.feeId,
//       fee.feeType,
//       `$${fee.amount.toLocaleString()}`,
//       new Date(fee.dueDate).toLocaleDateString(),
//       fee.isPaid ? 'Paid' : 'Unpaid',
//     ]],
//     theme: 'striped',
//     styles: { fontSize: 10, cellPadding: 4 },
//     headStyles: { fillColor: '#094c50', textColor: '#ffffff' },
//   });

//   // Footer
//   doc.setFontSize(10);
//   doc.text('Thank you for your payment!', 20, doc.lastAutoTable.finalY + 20);

//   return doc;
// };

// // Fees Component
// const Fees = () => {
//   const [feeHolds, setFeeHolds] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   // Fetch fee holds
//   useEffect(() => {
//     const fetchHolds = async () => {
//       setLoading(true);
//       try {
//         const holdsData = await checkFeeHolds();
//         setFeeHolds(holdsData);
//       } catch (error) {
//         setError('Failed to load fee holds.');
//         console.error('Error fetching holds:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchHolds();
//   }, []);

//   // Handle View Invoice (open in new tab)
//   const handleViewInvoice = (fee) => {
//     try {
//       console.log('[Fees] Generating PDF for view');
//       const doc = generateInvoicePDF(fee);
//       const pdfBlob = doc.output('blob');
//       const pdfUrl = URL.createObjectURL(pdfBlob);
//       window.open(pdfUrl, '_blank');
//     } catch (err) {
//       console.error('[Fees] View Invoice Error:', err);
//       setError('Failed to generate invoice PDF.');
//     }
//   };

//   // Handle Download PDF
//   const handleDownloadPDF = (fee) => {
//     try {
//       console.log('[Fees] Generating PDF for download');
//       const doc = generateInvoicePDF(fee);
//       doc.save(`Invoice_${fee.feeId}.pdf`);
//       console.log('[Fees] PDF downloaded:', `Invoice_${fee.feeId}.pdf`);
//     } catch (err) {
//       console.error('[Fees] Download PDF Error:', err);
//       setError('Failed to download invoice PDF.');
//     }
//   };

//   // Loading State
//   if (loading) {
//     return (
//       <DashboardLayout>
//         <Box sx={{ textAlign: 'center', mt: 4 }}>
//           <Typography variant="h6" color="textSecondary">
//             Loading Fee Information...
//           </Typography>
//         </Box>
//       </DashboardLayout>
//     );
//   }

//   return (
//     <DashboardLayout>
//       <Grid container spacing={2} sx={{ background: 'linear-gradient(180deg, #f5f5f5 0%, #e0f7fa 100%)', p: 3 }}>
//         <Grid item xs={12}>
//           <TitleBar title="FEES INFORMATION" />
//         </Grid>

//         {/* Error Display */}
//         {error && (
//           <Grid item xs={12}>
//             <Alert severity="error" sx={{ mb: 3, borderRadius: '12px' }} onClose={() => setError('')}>
//               {error}
//             </Alert>
//           </Grid>
//         )}

//         {/* Payment Records by Semester */}
//         <Grid item xs={12}>
//           <Card elevation={6} sx={{ borderRadius: '20px', overflow: 'hidden', backgroundColor: '#ffffff', mt: 4 }}>
//             <CardContent sx={{ p: 4 }}>
//               <Typography variant="h5" gutterBottom sx={{ color: '#094c50', fontWeight: 'bold' }}>
//                 Payment Records by Semester
//               </Typography>
//               <Divider sx={{ mb: 2, borderColor: '#e0e0e0' }} />
//               {mockPaymentRecords.length === 0 ? (
//                 <Typography align="center" color="textSecondary">
//                   No payment records available.
//                 </Typography>
//               ) : (
//                 mockPaymentRecords.map((record) => (
//                   <Accordion key={record.semester} sx={{ mb: 1, borderRadius: '12px', '&:before': { display: 'none' } }}>
//                     <AccordionSummary
//                       expandIcon={<ExpandMoreIcon />}
//                       sx={{ backgroundColor: '#f9f9f9', borderRadius: '12px', '&:hover': { backgroundColor: '#f0f0f0' } }}
//                     >
//                       <Typography variant="h6" sx={{ fontWeight: 'medium', color: '#094c50' }}>
//                         Semester: {record.semester}
//                       </Typography>
//                     </AccordionSummary>
//                     <AccordionDetails sx={{ p: 2 }}>
//                       <Grid container spacing={2}>
//                         {record.fees.map((fee) => (
//                           <Grid item xs={12} key={fee.feeId}>
//                             <Box
//                               sx={{
//                                 p: 2,
//                                 border: '1px solid #e0e0e0',
//                                 borderRadius: '12px',
//                                 backgroundColor: '#fafafa',
//                                 transition: 'all 0.3s ease',
//                                 '&:hover': { backgroundColor: '#f5f5f5', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' },
//                               }}
//                             >
//                               <Grid container spacing={1} alignItems="center">
//                                 <Grid item xs={12} sm={3}>
//                                   <Typography variant="body2" color="textSecondary">
//                                     Fee Type:
//                                   </Typography>
//                                   <Typography variant="subtitle2" sx={{ fontWeight: 'medium', color: '#094c50' }}>
//                                     {fee.feeType}
//                                   </Typography>
//                                 </Grid>
//                                 <Grid item xs={12} sm={2}>
//                                   <Typography variant="body2" color="textSecondary">
//                                     Amount:
//                                   </Typography>
//                                   <Typography variant="subtitle2" sx={{ fontWeight: 'medium', color: '#388e3c' }}>
//                                     ${fee.amount.toLocaleString()}
//                                   </Typography>
//                                 </Grid>
//                                 <Grid item xs={12} sm={2}>
//                                   <Typography variant="body2" color="textSecondary">
//                                     Due Date:
//                                   </Typography>
//                                   <Typography variant="subtitle2" sx={{ fontWeight: 'medium' }}>
//                                     {new Date(fee.dueDate).toLocaleDateString()}
//                                   </Typography>
//                                 </Grid>
//                                 <Grid item xs={12} sm={2}>
//                                   <Typography variant="body2" color="textSecondary">
//                                     Status:
//                                   </Typography>
//                                   <Chip
//                                     label={fee.isPaid ? 'Paid' : 'Unpaid'}
//                                     color={fee.isPaid ? 'success' : 'error'}
//                                     size="small"
//                                     sx={{ fontWeight: 'bold' }}
//                                   />
//                                 </Grid>
//                                 <Grid item xs={12} sm={3}>
//                                   <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
//                                     <Button
//                                       variant="outlined"
//                                       color="primary"
//                                       size="small"
//                                       sx={{ textTransform: 'none', fontWeight: 'bold', borderRadius: '8px', borderColor: '#2596be', color: '#2596be', '&:hover': { borderColor: '#1a6d8c', color: '#1a6d8c' } }}
//                                       onClick={() => handleViewInvoice(fee)}
//                                     >
//                                       View Invoice
//                                     </Button>
//                                     <Button
//                                       variant="contained"
//                                       color="primary"
//                                       size="small"
//                                       sx={{ textTransform: 'none', fontWeight: 'bold', borderRadius: '8px', bgcolor: '#2596be', '&:hover': { bgcolor: '#1a6d8c' } }}
//                                       onClick={() => handleDownloadPDF(fee)}
//                                     >
//                                       Download PDF
//                                     </Button>
//                                   </Box>
//                                 </Grid>
//                               </Grid>
//                             </Box>
//                           </Grid>
//                         ))}
//                       </Grid>
//                     </AccordionDetails>
//                   </Accordion>
//                 ))
//               )}
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Fee Holds Section */}
//         {feeHolds.length > 0 && (
//           <Grid item xs={12}>
//             <Card elevation={6} sx={{ borderRadius: '20px', overflow: 'hidden', backgroundColor: '#ffffff', mt: 4 }}>
//               <CardContent sx={{ p: 4 }}>
//                 <Typography variant="h5" gutterBottom sx={{ color: '#094c50', fontWeight: 'bold' }}>
//                   Fee Holds
//                   <Chip
//                     label={`${feeHolds.length} Holds`}
//                     size="small"
//                     color="error"
//                     sx={{ ml: 2, fontWeight: 'bold', bgcolor: '#d32f2f' }}
//                   />
//                 </Typography>
//                 <Divider sx={{ mb: 2, borderColor: '#e0e0e0' }} />
//                 <Table sx={{ minWidth: 300 }}>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell sx={{ fontWeight: 'bold', color: '#094c50' }}>Hold Type</TableCell>
//                       <TableCell sx={{ fontWeight: 'bold', color: '#094c50' }}>Reason</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {feeHolds.map((hold, index) => (
//                       <TableRow key={index}>
//                         <TableCell>
//                           <Chip
//                             label={hold.hold}
//                             color="error"
//                             size="medium"
//                             sx={{ fontWeight: 'bold' }}
//                           />
//                         </TableCell>
//                         <TableCell>
//                           <Typography variant="body2" color="textPrimary">
//                             {hold.reason}
//                           </Typography>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </CardContent>
//             </Card>
//           </Grid>
//         )}
//       </Grid>
//     </DashboardLayout>
//   );
// };

// export default Fees;

// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Typography,
//   Grid,
//   Divider,
//   Chip,
//   Button,
//   Alert,
//   Card,
//   CardContent,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
// import { jsPDF } from 'jspdf';
// import autoTable from 'jspdf-autotable';
// import TitleBar from '../../components/Titlebar/Titlebar';
// import Logo from '../../assets/Images/Logo/Logo.png';
// import { getPaymentRecords, getFeeHolds } from "../../Endpoints/StudentEndpoints"; 

// // Function to generate PDF invoice
// const generateInvoicePDF = (fee) => {
//   const doc = new jsPDF();

//   try {
//     console.log('[Fees] Adding logo to PDF');
//     doc.addImage(Logo, 'PNG', 15, 10, 40, 40);
//   } catch (err) {
//     console.warn('[Fees] Failed to add logo to PDF:', err.message);
//   }

//   doc.setFontSize(12);
//   doc.text('Invoice', 150, 40);
//   doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 100);
//   doc.text(`Time: ${new Date().toLocaleTimeString()}`, 20, 60);
//   doc.text('Student Name: John Doe', 20, 70); // Ideally, replace with dynamic data
//   doc.text('Student ID: S123456', 20, 80);   // Ideally, replace with dynamic data
//   doc.text('Payment Method: M-Paisa', 20, 90);

//   autoTable(doc, {
//     startY: 110,
//     head: [['Fee ID', 'Fee Type', 'Amount', 'Due Date', 'Status']],
//     body: [
//       [
//         fee.feeId,
//         fee.feeType,
//         `$${fee.amount.toLocaleString()}`,
//         new Date(fee.dueDate).toLocaleDateString(),
//         fee.isPaid ? 'Paid' : 'Unpaid',
//       ],
//     ],
//     theme: 'striped',
//     styles: { fontSize: 10, cellPadding: 4 },
//     headStyles: { fillColor: '#094c50', textColor: '#ffffff' },
//   });

//   doc.setFontSize(10);
//   doc.text('Thank you for your payment!', 20, doc.lastAutoTable.finalY + 20);

//   return doc;
// };

// // Fees Component
// const Fees = ({ studentId }) => {
//   const [paymentRecords, setPaymentRecords] = useState([]);
//   const [feeHolds, setFeeHolds] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   // Fetch payment records and fee holds on mount
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const [recordsResponse, holdsResponse] = await Promise.all([
//           getPaymentRecords(studentId),
//           getFeeHolds(studentId),
//         ]);
//         setPaymentRecords(recordsResponse.data);
//         setFeeHolds(holdsResponse.data);
//       } catch (error) {
//         setError('Failed to load fee information.');
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [studentId]);

//   // Handle View Invoice (open in new tab)
//   const handleViewInvoice = (fee) => {
//     try {
//       console.log('[Fees] Generating PDF for view');
//       const doc = generateInvoicePDF(fee);
//       const pdfBlob = doc.output('blob');
//       const pdfUrl = URL.createObjectURL(pdfBlob);
//       window.open(pdfUrl, '_blank');
//     } catch (err) {
//       console.error('[Fees] View Invoice Error:', err);
//       setError('Failed to generate invoice PDF.');
//     }
//   };

//   // Handle Download PDF
//   const handleDownloadPDF = (fee) => {
//     try {
//       console.log('[Fees] Generating PDF for download');
//       const doc = generateInvoicePDF(fee);
//       doc.save(`Invoice_${fee.feeId}.pdf`);
//       console.log('[Fees] PDF downloaded:', `Invoice_${fee.feeId}.pdf`);
//     } catch (err) {
//       console.error('[Fees] Download PDF Error:', err);
//       setError('Failed to download invoice PDF.');
//     }
//   };

//   // Loading State
//   if (loading) {
//     return (
//       <DashboardLayout>
//         <Box sx={{ textAlign: 'center', mt: 4 }}>
//           <Typography variant="h6" color="textSecondary">
//             Loading Fee Information...
//           </Typography>
//         </Box>
//       </DashboardLayout>
//     );
//   }

//   return (
//     <DashboardLayout>
//       <Grid container spacing={2} sx={{ background: 'linear-gradient(180deg, #f5f5f5 0%, #e0f7fa 100%)', p: 3 }}>
//         <Grid item xs={12}>
//           <TitleBar title="FEES INFORMATION" />
//         </Grid>

//         {/* Error Display */}
//         {error && (
//           <Grid item xs={12}>
//             <Alert severity="error" sx={{ mb: 3, borderRadius: '12px' }} onClose={() => setError('')}>
//               {error}
//             </Alert>
//           </Grid>
//         )}

//         {/* Payment Records by Semester */}
//         <Grid item xs={12}>
//           <Card elevation={6} sx={{ borderRadius: '20px', overflow: 'hidden', backgroundColor: '#ffffff', mt: 4 }}>
//             <CardContent sx={{ p: 4 }}>
//               <Typography variant="h5" gutterBottom sx={{ color: '#094c50', fontWeight: 'bold' }}>
//                 Payment Records by Semester
//               </Typography>
//               <Divider sx={{ mb: 2, borderColor: '#e0e0e0' }} />
//               {paymentRecords.length === 0 ? (
//                 <Typography align="center" color="textSecondary">
//                   No payment records available.
//                 </Typography>
//               ) : (
//                 paymentRecords.map((record) => (
//                   <Accordion key={record.semester} sx={{ mb: 1, borderRadius: '12px', '&:before': { display: 'none' } }}>
//                     <AccordionSummary
//                       expandIcon={<ExpandMoreIcon />}
//                       sx={{ backgroundColor: '#f9f9f9', borderRadius: '12px', '&:hover': { backgroundColor: '#f0f0f0' } }}
//                     >
//                       <Typography variant="h6" sx={{ fontWeight: 'medium', color: '#094c50' }}>
//                         Semester: {record.semester}
//                       </Typography>
//                     </AccordionSummary>
//                     <AccordionDetails sx={{ p: 2 }}>
//                       <Grid container spacing={2}>
//                         {record.fees.map((fee) => (
//                           <Grid item xs={12} key={fee.feeId}>
//                             <Box
//                               sx={{
//                                 p: 2,
//                                 border: '1px solid #e0e0e0',
//                                 borderRadius: '12px',
//                                 backgroundColor: '#fafafa',
//                                 transition: 'all 0.3s ease',
//                                 '&:hover': { backgroundColor: '#f5f5f5', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' },
//                               }}
//                             >
//                               <Grid container spacing={1} alignItems="center">
//                                 <Grid item xs={12} sm={3}>
//                                   <Typography variant="body2" color="textSecondary">
//                                     Fee Type:
//                                   </Typography>
//                                   <Typography variant="subtitle2" sx={{ fontWeight: 'medium', color: '#094c50' }}>
//                                     {fee.feeType}
//                                   </Typography>
//                                 </Grid>
//                                 <Grid item xs={12} sm={2}>
//                                   <Typography variant="body2" color="textSecondary">
//                                     Amount:
//                                   </Typography>
//                                   <Typography variant="subtitle2" sx={{ fontWeight: 'medium', color: '#388e3c' }}>
//                                     ${fee.amount.toLocaleString()}
//                                   </Typography>
//                                 </Grid>
//                                 <Grid item xs={12} sm={2}>
//                                   <Typography variant="body2" color="textSecondary">
//                                     Due Date:
//                                   </Typography>
//                                   <Typography variant="subtitle2" sx={{ fontWeight: 'medium' }}>
//                                     {new Date(fee.dueDate).toLocaleDateString()}
//                                   </Typography>
//                                 </Grid>
//                                 <Grid item xs={12} sm={2}>
//                                   <Typography variant="body2" color="textSecondary">
//                                     Status:
//                                   </Typography>
//                                   <Chip
//                                     label={fee.isPaid ? 'Paid' : 'Unpaid'}
//                                     color={fee.isPaid ? 'success' : 'error'}
//                                     size="small"
//                                     sx={{ fontWeight: 'bold' }}
//                                   />
//                                 </Grid>
//                                 <Grid item xs={12} sm={3}>
//                                   <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
//                                     <Button
//                                       variant="outlined"
//                                       color="primary"
//                                       size="small"
//                                       sx={{
//                                         textTransform: 'none',
//                                         fontWeight: 'bold',
//                                         borderRadius: '8px',
//                                         borderColor: '#2596be',
//                                         color: '#2596be',
//                                         '&:hover': { borderColor: '#1a6d8c', color: '#1a6d8c' },
//                                       }}
//                                       onClick={() => handleViewInvoice(fee)}
//                                     >
//                                       View Invoice
//                                     </Button>
//                                     <Button
//                                       variant="contained"
//                                       color="primary"
//                                       size="small"
//                                       sx={{
//                                         textTransform: 'none',
//                                         fontWeight: 'bold',
//                                         borderRadius: '8px',
//                                         bgcolor: '#2596be',
//                                         '&:hover': { bgcolor: '#1a6d8c' },
//                                       }}
//                                       onClick={() => handleDownloadPDF(fee)}
//                                     >
//                                       Download PDF
//                                     </Button>
//                                   </Box>
//                                 </Grid>
//                               </Grid>
//                             </Box>
//                           </Grid>
//                         ))}
//                       </Grid>
//                     </AccordionDetails>
//                   </Accordion>
//                 ))
//               )}
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Fee Holds Section */}
//         {feeHolds.length > 0 && (
//           <Grid item xs={12}>
//             <Card elevation={6} sx={{ borderRadius: '20px', overflow: 'hidden', backgroundColor: '#ffffff', mt: 4 }}>
//               <CardContent sx={{ p: 4 }}>
//                 <Typography variant="h5" gutterBottom sx={{ color: '#094c50', fontWeight: 'bold' }}>
//                   Fee Holds
//                   <Chip
//                     label={`${feeHolds.length} Holds`}
//                     size="small"
//                     color="error"
//                     sx={{ ml: 2, fontWeight: 'bold', bgcolor: '#d32f2f' }}
//                   />
//                 </Typography>
//                 <Divider sx={{ mb: 2, borderColor: '#e0e0e0' }} />
//                 <Table sx={{ minWidth: 300 }}>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell sx={{ fontWeight: 'bold', color: '#094c50' }}>Hold Type</TableCell>
//                       <TableCell sx={{ fontWeight: 'bold', color: '#094c50' }}>Reason</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {feeHolds.map((hold, index) => (
//                       <TableRow key={index}>
//                         <TableCell>
//                           <Chip label={hold.hold} color="error" size="medium" sx={{ fontWeight: 'bold' }} />
//                         </TableCell>
//                         <TableCell>
//                           <Typography variant="body2" color="textPrimary">
//                             {hold.reason}
//                           </Typography>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </CardContent>
//             </Card>
//           </Grid>
//         )}
//       </Grid>
//     </DashboardLayout>
//   );
// };

// export default Fees;

// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Typography,
//   Grid,
//   Divider,
//   Chip,
//   Button,
//   Alert,
//   Card,
//   CardContent,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
// import { jsPDF } from 'jspdf';
// import autoTable from 'jspdf-autotable';
// import TitleBar from '../../components/Titlebar/Titlebar';
// import Logo from '../../assets/Images/Logo/Logo.png';
// import { 
//   getCurrentFees,
//   getPaymentRecords, 
//   getFeeHolds,
//   markFeeAsPaid
// } from "../../Endpoints/StudentEndpoints";

// // Function to generate PDF invoice
// const generateInvoicePDF = (fee, studentData) => {
//   const doc = new jsPDF();

//   try {
//     doc.addImage(Logo, 'PNG', 15, 10, 40, 40);
//   } catch (err) {
//     console.warn('[Fees] Failed to add logo to PDF:', err.message);
//   }

//   doc.setFontSize(12);
//   doc.text('Invoice', 150, 40);
//   doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 100);
//   doc.text(`Time: ${new Date().toLocaleTimeString()}`, 20, 60);
//   doc.text(`Student Name: ${studentData?.name || 'N/A'}`, 20, 70);
//   doc.text(`Student ID: ${studentData?.id || 'N/A'}`, 20, 80);
//   doc.text('Payment Method: M-Paisa', 20, 90);

//   autoTable(doc, {
//     startY: 110,
//     head: [['Fee ID', 'Fee Type', 'Amount', 'Due Date', 'Status']],
//     body: [
//       [
//         fee.feeId,
//         fee.feeType,
//         `$${fee.amount.toLocaleString()}`,
//         new Date(fee.dueDate).toLocaleDateString(),
//         fee.isPaid ? 'Paid' : 'Unpaid',
//       ],
//     ],
//     theme: 'striped',
//     styles: { fontSize: 10, cellPadding: 4 },
//     headStyles: { fillColor: '#094c50', textColor: '#ffffff' },
//   });

//   doc.setFontSize(10);
//   doc.text('Thank you for your payment!', 20, doc.lastAutoTable.finalY + 20);

//   return doc;
// };

// const Fees = ({ studentId }) => {
//   const [currentFees, setCurrentFees] = useState([]);
//   const [paymentRecords, setPaymentRecords] = useState([]);
//   const [feeHolds, setFeeHolds] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [studentData, setStudentData] = useState({});
//   const [processingPayment, setProcessingPayment] = useState(false);

//   // Fetch all fee-related data
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const [currentFeesRes, recordsRes, holdsRes] = await Promise.all([
//           getCurrentFees(studentId),
//           getPaymentRecords(studentId),
//           getFeeHolds(studentId)
//         ]);
        
//         setCurrentFees(currentFeesRes.data);
//         setPaymentRecords(recordsRes.data);
//         setFeeHolds(holdsRes.data);
        
//         // Get student data from localStorage or API if needed
//         const storedStudent = JSON.parse(localStorage.getItem('student'))
//         setStudentData(storedStudent);
//       } catch (error) {
//         setError('Failed to load fee information. Please try again later.');
//         console.error('Error fetching fee data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     fetchData();
//   }, [studentId]);

//   const handleViewInvoice = (fee) => {
//     try {
//       const doc = generateInvoicePDF(fee, studentData);
//       const pdfBlob = doc.output('blob');
//       const pdfUrl = URL.createObjectURL(pdfBlob);
//       window.open(pdfUrl, '_blank');
//     } catch (err) {
//       console.error('[Fees] View Invoice Error:', err);
//       setError('Failed to generate invoice PDF.');
//     }
//   };

//   const handleDownloadPDF = (fee) => {
//     try {
//       const doc = generateInvoicePDF(fee, studentData);
//       doc.save(`Invoice_${fee.feeId}.pdf`);
//     } catch (err) {
//       console.error('[Fees] Download PDF Error:', err);
//       setError('Failed to download invoice PDF.');
//     }
//   };

//   const handleMarkAsPaid = async (feeId) => {
//     setProcessingPayment(true);
//     try {
//       await markFeeAsPaid(studentId, feeId);
      
//       // Refresh the data
//       const [currentFeesRes, holdsRes] = await Promise.all([
//         getCurrentFees(studentId),
//         getFeeHolds(studentId)
//       ]);
      
//       setCurrentFees(currentFeesRes.data);
//       setFeeHolds(holdsRes.data);
      
//       setError('');
//     } catch (error) {
//       setError('Failed to mark fee as paid. Please try again.');
//       console.error('Error marking fee as paid:', error);
//     } finally {
//       setProcessingPayment(false);
//     }
//   };

//   if (loading) {
//     return (
//       <DashboardLayout>
//         <Box sx={{ textAlign: 'center', mt: 4 }}>
//           <Typography variant="h6" color="textSecondary">
//             Loading Fee Information...
//           </Typography>
//         </Box>
//       </DashboardLayout>
//     );
//   }

//   return (
//     <DashboardLayout>
//       <Grid container spacing={2} sx={{ p: 3 }}>
//         <Grid item xs={12}>
//           <TitleBar title="FEES INFORMATION" />
//         </Grid>

//         {error && (
//           <Grid item xs={12}>
//             <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
//               {error}
//             </Alert>
//           </Grid>
//         )}

//         {/* Current Fees Section */}
//         <Grid item xs={12}>
//           <Card elevation={3} sx={{ borderRadius: '16px' }}>
//             <CardContent>
//               <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#094c50' }}>
//                 Current Fees
//               </Typography>
//               <Divider sx={{ mb: 2 }} />
              
//               {currentFees.length === 0 ? (
//                 <Typography color="textSecondary">No current fees due.</Typography>
//               ) : (
//                 <Table>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell sx={{ fontWeight: 'bold' }}>Fee Type</TableCell>
//                       <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
//                       <TableCell sx={{ fontWeight: 'bold' }}>Due Date</TableCell>
//                       <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
//                       <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {currentFees.map((fee) => (
//                       <TableRow key={fee.feeId}>
//                         <TableCell>{fee.feeType}</TableCell>
//                         <TableCell>${fee.amount.toLocaleString()}</TableCell>
//                         <TableCell>{new Date(fee.dueDate).toLocaleDateString()}</TableCell>
//                         <TableCell>
//                           <Chip 
//                             label={fee.isPaid ? 'Paid' : 'Unpaid'} 
//                             color={fee.isPaid ? 'success' : 'error'} 
//                           />
//                         </TableCell>
//                         <TableCell>
//                           <Box sx={{ display: 'flex', gap: 1 }}>
//                             <Button 
//                               variant="outlined" 
//                               size="small"
//                               onClick={() => handleViewInvoice(fee)}
//                             >
//                               View
//                             </Button>
//                             <Button 
//                               variant="contained" 
//                               size="small"
//                               onClick={() => handleDownloadPDF(fee)}
//                             >
//                               Download
//                             </Button>
//                             {!fee.isPaid && (
//                               <Button 
//                                 variant="contained" 
//                                 color="success"
//                                 size="small"
//                                 disabled={processingPayment}
//                                 onClick={() => handleMarkAsPaid(fee.feeId)}
//                               >
//                                 {processingPayment ? 'Processing...' : 'Mark Paid'}
//                               </Button>
//                             )}
//                           </Box>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               )}
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Payment History Section */}
//         <Grid item xs={12}>
//           <Card elevation={3} sx={{ borderRadius: '16px', mt: 3 }}>
//             <CardContent>
//               <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#094c50' }}>
//                 Payment History
//               </Typography>
//               <Divider sx={{ mb: 2 }} />
              
//               {paymentRecords.length === 0 ? (
//                 <Typography color="textSecondary">No payment history available.</Typography>
//               ) : (
//                 paymentRecords.map((record) => (
//                   <Accordion key={record.semester} sx={{ mb: 2 }}>
//                     <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                       <Typography sx={{ fontWeight: 'medium' }}>
//                         {record.semester} - {record.fees.filter(f => f.isPaid).length} of {record.fees.length} fees paid
//                       </Typography>
//                     </AccordionSummary>
//                     <AccordionDetails>
//                       <Table>
//                         <TableHead>
//                           <TableRow>
//                             <TableCell>Fee Type</TableCell>
//                             <TableCell>Amount</TableCell>
//                             <TableCell>Due Date</TableCell>
//                             <TableCell>Status</TableCell>
//                           </TableRow>
//                         </TableHead>
//                         <TableBody>
//                           {record.fees.map((fee) => (
//                             <TableRow key={fee.feeId}>
//                               <TableCell>{fee.feeType}</TableCell>
//                               <TableCell>${fee.amount.toLocaleString()}</TableCell>
//                               <TableCell>{new Date(fee.dueDate).toLocaleDateString()}</TableCell>
//                               <TableCell>
//                                 <Chip 
//                                   label={fee.isPaid ? 'Paid' : 'Unpaid'} 
//                                   color={fee.isPaid ? 'success' : 'error'} 
//                                 />
//                               </TableCell>
//                             </TableRow>
//                           ))}
//                         </TableBody>
//                       </Table>
//                     </AccordionDetails>
//                   </Accordion>
//                 ))
//               )}
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Fee Holds Section */}
//         {feeHolds.length > 0 && (
//           <Grid item xs={12}>
//             <Card elevation={3} sx={{ borderRadius: '16px', mt: 3 }}>
//               <CardContent>
//                 <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#094c50' }}>
//                   Fee Holds
//                 </Typography>
//                 <Divider sx={{ mb: 2 }} />
//                 <Table>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell sx={{ fontWeight: 'bold' }}>Hold Type</TableCell>
//                       <TableCell sx={{ fontWeight: 'bold' }}>Reason</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {feeHolds.map((hold, index) => (
//                       <TableRow key={index}>
//                         <TableCell>
//                           <Chip label={hold.hold} color="error" />
//                         </TableCell>
//                         <TableCell>{hold.reason}</TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </CardContent>
//             </Card>
//           </Grid>
//         )}
//       </Grid>
//     </DashboardLayout>
//   );
// };

// export default Fees;

import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Divider,
  Chip,
  Button,
  Alert,
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
  CircularProgress,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import TitleBar from '../../components/Titlebar/Titlebar';
import Logo from '../../assets/Images/Logo/Logo.png';
import { 
  getCurrentFees,
  getPaymentRecords, 
  getFeeHolds,
  markFeeAsPaid,
  getStudent
} from "../../Endpoints/StudentEndpoints";

// Function to generate PDF invoice
const generateInvoicePDF = (fee, studentData) => {
  const doc = new jsPDF();

  try {
    doc.addImage(Logo, 'PNG', 15, 10, 40, 40);
  } catch (err) {
    console.warn('[Fees] Failed to add logo to PDF:', err.message);
  }

  doc.setFontSize(12);
  doc.text('Invoice', 150, 40);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 100);
  doc.text(`Time: ${new Date().toLocaleTimeString()}`, 20, 60);
  doc.text(`Student Name: ${studentData?.name || 'N/A'}`, 20, 70);
  doc.text(`Student ID: ${studentData?.id || 'N/A'}`, 20, 80);
  doc.text('Payment Method: M-Paisa', 20, 90);

  autoTable(doc, {
    startY: 110,
    head: [['Fee ID', 'Fee Type', 'Amount', 'Due Date', 'Status']],
    body: [
      [
        fee.feeId,
        fee.feeType,
        `$${fee.amount.toLocaleString()}`,
        new Date(fee.dueDate).toLocaleDateString(),
        fee.isPaid ? 'Paid' : 'Unpaid',
      ],
    ],
    theme: 'striped',
    styles: { fontSize: 10, cellPadding: 4 },
    headStyles: { fillColor: '#094c50', textColor: '#ffffff' },
  });

  doc.setFontSize(10);
  doc.text('Thank you for your payment!', 20, doc.lastAutoTable.finalY + 20);

  return doc;
};

const Fees = () => {
  const [currentFees, setCurrentFees] = useState([]);
  const [paymentRecords, setPaymentRecords] = useState([]);
  const [feeHolds, setFeeHolds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [studentData, setStudentData] = useState({});
  const [processingPayment, setProcessingPayment] = useState(null); // Track specific feeId being processed
  const [studentId, setStudentId] = useState('');

  // Fetch student ID from local storage
  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      const cleanId = user.id || (user.email ? user.email.split('@')[0] : null);
      if (cleanId) {
        setStudentId(cleanId);
      } else {
        setError('Invalid user data. Please login again.');
        setLoading(false);
      }
    } else {
      setError('User not authenticated. Please login.');
      setLoading(false);
    }
  }, []);

  // Fetch student data and fee-related data
  useEffect(() => {
    if (!studentId) return;

    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const [studentRes, currentFeesRes, recordsRes, holdsRes] = await Promise.all([
          getStudent(studentId),
          getCurrentFees(studentId),
          getPaymentRecords(studentId),
          getFeeHolds(studentId),
        ]);
        
        setStudentData({
          id: studentId,
          name: `${studentRes.data.firstName} ${studentRes.data.lastName}`.trim(),
        });
        setCurrentFees(currentFeesRes.data || []);
        setPaymentRecords(recordsRes.data || []);
        setFeeHolds(holdsRes.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.response?.data?.message || 'Failed to load fee information. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [studentId]);

  const handleViewInvoice = (fee) => {
    try {
      const doc = generateInvoicePDF(fee, studentData);
      const pdfBlob = doc.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl, '_blank');
    } catch (err) {
      console.error('[Fees] View Invoice Error:', err);
      setError('Failed to generate invoice PDF.');
    }
  };

  const handleDownloadPDF = (fee) => {
    try {
      const doc = generateInvoicePDF(fee, studentData);
      doc.save(`Invoice_${fee.feeId}.pdf`);
    } catch (err) {
      console.error('[Fees] Download PDF Error:', err);
      setError('Failed to download invoice PDF.');
    }
  };

  const handleMarkAsPaid = async (feeId) => {
    setProcessingPayment(feeId);
    setError('');
    try {
      await markFeeAsPaid(studentId, feeId);
      
      // Refresh the data
      const [currentFeesRes, holdsRes] = await Promise.all([
        getCurrentFees(studentId),
        getFeeHolds(studentId),
      ]);
      
      setCurrentFees(currentFeesRes.data || []);
      setFeeHolds(holdsRes.data || []);
    } catch (error) {
      console.error('Error marking fee as paid:', error);
      setError(error.response?.data?.message || 'Failed to mark fee as paid. Please try again.');
    } finally {
      setProcessingPayment(null);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
          <Typography variant="h6" color="textSecondary" sx={{ ml: 2 }}>
            Loading Fee Information...
          </Typography>
        </Box>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Grid container spacing={2} sx={{ p: 3 }}>
        <Grid item xs={12}>
          <TitleBar title="Fees Information" />
        </Grid>

        {error && (
          <Grid item xs={12}>
            <Alert severity="error" sx={{ mb: 3, borderRadius: '12px' }} onClose={() => setError('')}>
              {error}
            </Alert>
          </Grid>
        )}

        {/* Current Fees Section */}
        <Grid item xs={12}>
          <Card elevation={3} sx={{ borderRadius: '16px' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#094c50' }}>
                Current Fees
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              {currentFees.length === 0 ? (
                <Typography color="textSecondary">No current fees due.</Typography>
              ) : (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>Fee Type</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Due Date</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentFees.map((fee) => (
                      <TableRow key={fee.feeId}>
                        <TableCell>{fee.feeType}</TableCell>
                        <TableCell>${fee.amount.toLocaleString()}</TableCell>
                        <TableCell>{new Date(fee.dueDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Chip 
                            label={fee.isPaid ? 'Paid' : 'Unpaid'} 
                            color={fee.isPaid ? 'success' : 'error'} 
                          />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                            <Button 
                              variant="outlined" 
                              size="small"
                              onClick={() => handleViewInvoice(fee)}
                            >
                              View
                            </Button>
                            <Button 
                              variant="contained" 
                              size="small"
                              onClick={() => handleDownloadPDF(fee)}
                            >
                              Download
                            </Button>
                            {!fee.isPaid && (
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Button 
                                  variant="contained" 
                                  color="success"
                                  size="small"
                                  disabled={processingPayment === fee.feeId}
                                  onClick={() => handleMarkAsPaid(fee.feeId)}
                                >
                                  Mark Paid
                                </Button>
                                {processingPayment === fee.feeId && (
                                  <CircularProgress size={24} sx={{ ml: 1 }} />
                                )}
                              </Box>
                            )}
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Payment History Section */}
        <Grid item xs={12}>
          <Card elevation={3} sx={{ borderRadius: '16px', mt: 3 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#094c50' }}>
                Payment History
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              {paymentRecords.length === 0 ? (
                <Typography color="textSecondary">No payment history available.</Typography>
              ) : (
                paymentRecords.map((record) => (
                  <Accordion key={record.semester} sx={{ mb: 2 }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography sx={{ fontWeight: 'medium' }}>
                        {record.semester} - {record.fees.filter(f => f.isPaid).length} of {record.fees.length} fees paid
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Fee Type</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Due Date</TableCell>
                            <TableCell>Status</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {record.fees.map((fee) => (
                            <TableRow key={fee.feeId}>
                              <TableCell>{fee.feeType}</TableCell>
                              <TableCell>${fee.amount.toLocaleString()}</TableCell>
                              <TableCell>{new Date(fee.dueDate).toLocaleDateString()}</TableCell>
                              <TableCell>
                                <Chip 
                                  label={fee.isPaid ? 'Paid' : 'Unpaid'} 
                                  color={fee.isPaid ? 'success' : 'error'} 
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
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
            <Card elevation={3} sx={{ borderRadius: '16px', mt: 3 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#094c50' }}>
                  Fee Holds
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>Hold Type</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Reason</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {feeHolds.map((hold, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Chip label={hold.hold} color="error" />
                        </TableCell>
                        <TableCell>{hold.reason}</TableCell>
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