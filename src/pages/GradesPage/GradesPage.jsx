// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Typography,
//   Paper,
//   Divider,
//   Chip,
//   Alert,
//   Grid,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   TableContainer,
// } from '@mui/material';
// import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';
// import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
// import TitleBar from '../../components/Titlebar/Titlebar';

// // Mock data aligned with program audit
// const mockAcademicRecords = {
//   studentId: 'S12345',
//   studentEmail: 'student@example.com',
//   gpa: 3.5,
//   enrollments: [
//     { enrollmentId: 'E001', courseCode: 'CS111', courseName: 'Introduction to Computing Science', semester: '2024-S1', grade: 'A', year: 1 },
//     { enrollmentId: 'E002', courseCode: 'CS112', courseName: 'Data Structures & Algorithms', semester: '2024-S1', grade: 'B+', year: 1 },
//     { enrollmentId: 'E003', courseCode: 'CS150', courseName: 'Introduction to Computer Networks & Security', semester: '2024-S1', grade: 'A-', year: 1 },
//     { enrollmentId: 'E004', courseCode: 'MA111', courseName: 'Mathematics', semester: '2024-S1', grade: 'B', year: 1 },
//     { enrollmentId: 'E005', courseCode: 'MA161', courseName: 'Discrete Mathematics', semester: '2024-S2', grade: 'A', year: 1 },
//     { enrollmentId: 'E006', courseCode: 'MG101', courseName: 'Introduction to Management', semester: '2024-S2', grade: 'B+', year: 1 },
//     { enrollmentId: 'E007', courseCode: 'ST131', courseName: 'Statistics', semester: '2024-S2', grade: 'B', year: 1 },
//     { enrollmentId: 'E008', courseCode: 'UU100A', courseName: 'Information Literacy', semester: '2024-S2', grade: 'A-', year: 1 },
//     { enrollmentId: 'E009', courseCode: 'UU114', courseName: 'English for Academic Purposes', semester: '2024-S2', grade: 'A', year: 1 },
//     { enrollmentId: 'E010', courseCode: 'CS211', courseName: 'Computer Organisation', semester: '2025-S1', grade: 'A', year: 2 },
//     { enrollmentId: 'E011', courseCode: 'CS214', courseName: 'Design & Analysis of Algorithms', semester: '2025-S1', grade: 'B+', year: 2 },
//     { enrollmentId: 'E012', courseCode: 'CS215', courseName: 'Computer Communications & Management', semester: '2025-S1', grade: 'E', year: 2 },
//     { enrollmentId: 'E013', courseCode: 'CS218', courseName: 'Mobile Computing', semester: '2025-S1', grade: 'A-', year: 2 },
//     { enrollmentId: 'E014', courseCode: 'CS219', courseName: 'Cloud Computing', semester: '2025-S2', grade: 'E', year: 2 },
//     { enrollmentId: 'E015', courseCode: 'IS221', courseName: 'Information Systems I', semester: '2025-S2', grade: 'B', year: 2 },
//     { enrollmentId: 'E016', courseCode: 'IS222', courseName: 'Information Systems II', semester: '2025-S2', grade: 'A', year: 2 },
//     { enrollmentId: 'E017', courseCode: 'UU200', courseName: 'Ethics & Governance', semester: '2025-S2', grade: 'A-', year: 2 },
//     { enrollmentId: 'E018', courseCode: 'CS001', courseName: 'Foundations of Professional Practice', semester: '2025-S2', grade: 'IP', year: 2 },
//   ].sort((a, b) => a.semester.localeCompare(b.semester)),
// };

// // Mock GPA data for line graph
// const gpaTrendData = [
//   { semester: '2024-S1', gpa: 3.8 },
//   { semester: '2024-S2', gpa: 3.7 },
//   { semester: '2025-S1', gpa: 3.6 },
//   { semester: '2025-S2', gpa: 3.5 },
// ];

// // Mock API function
// const getAcademicRecords = async () =>
//   new Promise((resolve) => setTimeout(() => resolve(mockAcademicRecords), 100));

// // GradesPage Component
// const GradesPage = () => {
//   const [academicRecords, setAcademicRecords] = useState(null);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [selectedYear, setSelectedYear] = useState('All');
//   const [openTranscript, setOpenTranscript] = useState(false);
//   const [pdfError, setPdfError] = useState('');

//   // Fetch academic records
//   useEffect(() => {
//     const fetchGrades = async () => {
//       setLoading(true);
//       try {
//         const data = await getAcademicRecords();
//         setAcademicRecords(data);
//       } catch (err) {
//         setError('Failed to fetch grades');
//         console.error('[GradesPage] Fetch Error:', err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchGrades();
//   }, []);

//   // Handle year selection
//   const handleYearChange = (event) => {
//     setSelectedYear(event.target.value);
//   };

//   // Filter enrollments by selected year
//   const filteredEnrollments = academicRecords?.enrollments.filter(
//     (enrollment) => selectedYear === 'All' || enrollment.year === parseInt(selectedYear)
//   ) || [];

//   // Generate PDF transcript
//   const generatePDF = () => {
//     try {
//       console.log('[GradesPage] Starting PDF generation');
//       const doc = new jsPDF();
//       // Apply autoTable plugin
//       autoTable(doc, {
//         startY: 70,
//         head: [['Course Code', 'Course Title', 'Semester', 'Grade']],
//         body: academicRecords.enrollments.map((enrollment) => [
//           enrollment.courseCode,
//           enrollment.courseName,
//           enrollment.semester,
//           enrollment.grade,
//         ]),
//         theme: 'grid',
//         headStyles: { fillColor: '#094c50', textColor: '#ffffff' },
//         styles: { fontSize: 10 },
//       });

//       // Add core content
//       doc.setFontSize(16);
//       doc.text('Academic Transcript', 10, 20);
//       doc.setFontSize(12);
//       doc.text(`Student ID: ${academicRecords.studentId}`, 10, 30);
//       doc.text(`Email: ${academicRecords.studentEmail}`, 10, 40);
//       doc.text(`Cumulative GPA: ${academicRecords.gpa}`, 10, 50);

//       // Try adding logo
//       const logoUrl = '/logo.png';
//       const img = new Image();
//       img.src = logoUrl;

//       img.onload = () => {
//         console.log('[GradesPage] Logo loaded successfully');
//         doc.addImage(img, 'PNG', 10, 10, 50, 50);
//         doc.save(`Transcript_${academicRecords.studentId}.pdf`);
//         console.log('[GradesPage] PDF saved with logo');
//       };

//       img.onerror = () => {
//         console.warn('[GradesPage] Logo failed to load');
//         doc.save(`Transcript_${academicRecords.studentId}.pdf`);
//         console.log('[GradesPage] PDF saved without logo');
//       };

//       // Fallback: Save PDF if logo loading hangs
//       setTimeout(() => {
//         if (!doc.isSaved) {
//           console.log('[GradesPage] Fallback save triggered');
//           doc.save(`Transcript_${academicRecords.studentId}.pdf`);
//         }
//       }, 3000);

//     } catch (err) {
//       console.error('[GradesPage] PDF Generation Error:', err);
//       setPdfError(`Failed to generate PDF: ${err.message}`);
//     }
//   };

//   // Handle view transcript
//   const handleViewTranscript = () => {
//     setOpenTranscript(true);
//   };

//   // Handle close transcript
//   const handleCloseTranscript = () => {
//     setOpenTranscript(false);
//   };

//   // Loading State
//   if (loading) {
//     return (
//       <DashboardLayout>
//         <Box
//           sx={{
//             p: 3,
//             background: 'linear-gradient(180deg, #dedede 0%, #2596be 100%)',
//             minHeight: '100vh',
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}
//         >
//           <Typography variant="h6" color="textSecondary">
//             Loading Academic Records...
//           </Typography>
//         </Box>
//       </DashboardLayout>
//     );
//   }

//   // Render when no data
//   if (!academicRecords) {
//     return (
//       <DashboardLayout>
//         <Box
//           sx={{
//             p: 3,
//             background: 'linear-gradient(180deg, #dedede 0%, #2596be 100%)',
//             minHeight: '100vh',
//           }}
//         >
//           <Typography
//             variant="h4"
//             align="center"
//             gutterBottom
//             sx={{ fontWeight: 'bold', color: '#000000' }}
//           >
//             Academic Records
//           </Typography>
//           <Alert severity="error" sx={{ mt: 2, maxWidth: 900, mx: 'auto' }} onClose={() => setError('')}>
//             {error || 'No academic records available.'}
//           </Alert>
//         </Box>
//       </DashboardLayout>
//     );
//   }

//   return (
//     <DashboardLayout>
//       <Grid container spacing={2}>
//         <Grid item xs={12}>
//           <TitleBar title="Academic Records" />
//         </Grid>

//         {error && (
//           <Grid item xs={12}>
//             <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
//             {error}
//           </Alert>
//         </Grid>
//       )}

//       {pdfError && (
//         <Grid item xs={12}>
//           <Alert severity="error" sx={{ mb: 3 }} onClose={() => setPdfError('')}>
//             {pdfError}
//           </Alert>
//         </Grid>
//       )}

//       <Grid item xs={12}>
//         <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: '20px' }}>
//           <Typography variant="h5" gutterBottom sx={{ color: '#000000', fontWeight: 'medium' }}>
//             Academic Summary
//           </Typography>
//           <Divider sx={{ mb: 2 }} />
//           <Grid container spacing={2}>
//             <Grid item xs={12} md={6}>
//               <Box
//                 sx={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'space-between',
//                 }}
//               >
//                 <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#000000' }}>
//                   Cumulative GPA:
//                 </Typography>
//                 <Typography variant="h6">{academicRecords.gpa}</Typography>
//               </Box>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <Box
//                 sx={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'space-between',
//                 }}
//               >
//                 <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#000000' }}>
//                   Total Courses:
//                 </Typography>
//                 <Typography variant="h6">{academicRecords.enrollments.length}</Typography>
//               </Box>
//             </Grid>
//             <Grid item xs={12}>
//               <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
//                 <Button
//                   variant="contained"
//                   sx={{ backgroundColor: '#094c50', '&:hover': { backgroundColor: '#073a3e' } }}
//                   onClick={handleViewTranscript}
//                 >
//                   View Transcript
//                 </Button>
//                 <Button
//                   variant="contained"
//                   sx={{ backgroundColor: '#094c50', '&:hover': { backgroundColor: '#073a3e' } }}
//                   onClick={generatePDF}
//                 >
//                   Download Transcript
//                 </Button>
//               </Box>
//             </Grid>
//           </Grid>
//         </Paper>
//       </Grid>

//       <Grid item xs={12}>
//         <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: '20px' }}>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//             <Typography variant="h5" sx={{ color: '#000000', fontWeight: 'medium' }}>
//               Course Grades
//               <Chip
//                 label={`${filteredEnrollments.length} Courses`}
//                 size="small"
//                 color="primary"
//                 sx={{ ml: 2, fontWeight: 'bold' }}
//               />
//             </Typography>
//             <FormControl sx={{ minWidth: 120 }}>
//               <InputLabel>Filter by Year</InputLabel>
//               <Select
//                 value={selectedYear}
//                 onChange={handleYearChange}
//                 label="Filter by Year"
//               >
//                 <MenuItem value="All">All Years</MenuItem>
//                 <MenuItem value="1">Year 1</MenuItem>
//                 <MenuItem value="2">Year 2</MenuItem>
//               </Select>
//             </FormControl>
//           </Box>
//           <Typography variant="body2" sx={{ mb: 2 }}>
//             Note: IP (In Progress) grades do not affect GPA.
//           </Typography>
//           <Divider sx={{ mb: 2 }} />
//           <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
//             {filteredEnrollments.length > 0 ? (
//               filteredEnrollments.map((enrollment) => (
//                 <Box
//                   key={enrollment.enrollmentId}
//                   sx={{
//                     p: 2,
//                     border: '1px solid #e0e0e0',
//                     borderRadius: 2,
//                     backgroundColor: '#f9f9f9',
//                     transition: 'background-color 0.3s',
//                     '&:hover': { backgroundColor: '#f5f5f5' },
//                     mb: 1,
//                   }}
//                 >
//                   <Grid container spacing={1}>
//                     <Grid item xs={12} sm={3}>
//                       <Typography variant="body2" color="textSecondary">
//                         Course Code:
//                       </Typography>
//                       <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
//                         {enrollment.courseCode}
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={12} sm={3}>
//                       <Typography variant="body2" color="textSecondary">
//                         Course Name:
//                       </Typography>
//                       <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
//                         {enrollment.courseName}
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={12} sm={3}>
//                       <Typography variant="body2" color="textSecondary">
//                         Semester:
//                       </Typography>
//                       <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
//                         {enrollment.semester}
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={12} sm={3}>
//                       <Typography variant="body2" color="textSecondary">
//                         Grade:
//                       </Typography>
//                       <Typography
//                         variant="subtitle1"
//                         sx={{
//                           fontWeight: 'bold',
//                           color: enrollment.grade === 'E' ? '#d32f2f' : enrollment.grade === 'IP' ? '#0288d1' : '#388e3c',
//                         }}
//                       >
//                         {enrollment.grade}
//                       </Typography>
//                     </Grid>
//                   </Grid>
//                 </Box>
//               ))
//             ) : (
//               <Typography color="textSecondary">No courses for selected year.</Typography>
//             )}
//           </Box>
//         </Paper>
//       </Grid>

//       <Grid item xs={12}>
//         <Paper elevation={3} sx={{ p: 4, borderRadius: '20px' }}>
//           <Typography variant="h5" gutterBottom sx={{ color: '#000000', fontWeight: 'medium' }}>
//             GPA Trend Over Semesters
//           </Typography>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={gpaTrendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
//               <defs>
//                 <linearGradient id="gpaGradient" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="0%" stopColor="#094c50" />
//                   <stop offset="100%" stopColor="#2596be" />
//                 </linearGradient>
//               </defs>
//               <XAxis dataKey="semester" />
//               <YAxis domain={[0, 4.3]} label={{ value: 'GPA', angle: -90, position: 'insideLeft' }} />
//               <Tooltip />
//               <Legend />
//               <Line type="monotone" dataKey="gpa" stroke="url(#gpaGradient)" name="GPA" />
//             </LineChart>
//           </ResponsiveContainer>
//         </Paper>
//       </Grid>
//     </Grid>

//     {/* Transcript View Dialog */}
//     <Dialog open={openTranscript} onClose={handleCloseTranscript} maxWidth="md" fullWidth>
//       <DialogTitle sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#094c50', color: '#ffffff' }}>
//         <img
//           src="/logo.png"
//           alt="University Logo"
//           style={{ width: 50, height: 50, marginRight: 10 }}
//           onError={(e) => (e.target.style.display = 'none')}
//         />
//         Academic Transcript
//       </DialogTitle>
//       <DialogContent>
//         <Box sx={{ p: 2 }}>
//           <Typography variant="body1" sx={{ mb: 1 }}>
//             <strong>Student ID:</strong> {academicRecords.studentId}
//           </Typography>
//           <Typography variant="body1" sx={{ mb: 1 }}>
//             <strong>Email:</strong> {academicRecords.studentEmail}
//           </Typography>
//           <Typography variant="body1" sx={{ mb: 2 }}>
//             <strong>Cumulative GPA:</strong> {academicRecords.gpa}
//           </Typography>
//           <TableContainer component={Paper}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#094c50', color: '#ffffff' }}>
//                     Course Code
//                   </TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#094c50', color: '#ffffff' }}>
//                     Course Title
//                   </TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#094c50', color: '#ffffff' }}>
//                     Semester
//                   </TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#094c50', color: '#ffffff' }}>
//                     Grade
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {academicRecords.enrollments.map((enrollment) => (
//                   <TableRow key={enrollment.enrollmentId}>
//                     <TableCell>{enrollment.courseCode}</TableCell>
//                     <TableCell>{enrollment.courseName}</TableCell>
//                     <TableCell>{enrollment.semester}</TableCell>
//                     <TableCell>{enrollment.grade}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//           <Box sx={{ mt: 2, textAlign: 'right' }}>
//             <Button
//               variant="contained"
//               sx={{ backgroundColor: '#094c50', '&:hover': { backgroundColor: '#073a3e' } }}
//               onClick={handleCloseTranscript}
//             >
//               Close
//             </Button>
//           </Box>
//         </Box>
//       </DialogContent>
//     </Dialog>
//   </DashboardLayout>
// );
// };

// export default GradesPage;

// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Typography,
//   Paper,
//   Divider,
//   Chip,
//   Alert,
//   Grid,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   TableContainer,
// } from '@mui/material';
// import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';
// import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
// import TitleBar from '../../components/Titlebar/Titlebar';
// import { getAcademicRecords, getGpaTrend } from "../../Endpoints/StudentEndpoints";

// const GradesPage = () => {
//   const [academicRecords, setAcademicRecords] = useState(null);
//   const [gpaTrendData, setGpaTrendData] = useState([]);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [selectedYear, setSelectedYear] = useState('All');
//   const [openTranscript, setOpenTranscript] = useState(false);
//   const [pdfError, setPdfError] = useState('');
//   const studentId = 'S12345'; // Replace with dynamic student ID from auth context

//   // Fetch academic records and GPA trend data when the component mounts
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const [recordsResponse, gpaTrendResponse] = await Promise.all([
//           getAcademicRecords(studentId),
//           getGpaTrend(studentId),
//         ]);
//         setAcademicRecords(recordsResponse.data);
//         setGpaTrendData(gpaTrendResponse.data);
//       } catch (err) {
//         setError('Failed to fetch data');
//         console.error('[GradesPage] Fetch Error:', err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [studentId]);

//   // Handle year selection for filtering enrollments
//   const handleYearChange = (event) => {
//     setSelectedYear(event.target.value);
//   };

//   // Filter enrollments by selected year
//   const filteredEnrollments = academicRecords?.enrollments.filter(
//     (enrollment) => selectedYear === 'All' || enrollment.year === parseInt(selectedYear)
//   ) || [];

//   // Generate PDF transcript
//   const generatePDF = () => {
//     try {
//       console.log('[GradesPage] Starting PDF generation');
//       const doc = new jsPDF();
//       autoTable(doc, {
//         startY: 70,
//         head: [['Course Code', 'Course Title', 'Semester', 'Grade']],
//         body: academicRecords.enrollments.map((enrollment) => [
//           enrollment.courseCode,
//           enrollment.courseName,
//           enrollment.semester,
//           enrollment.grade,
//         ]),
//         theme: 'grid',
//         headStyles: { fillColor: '#094c50', textColor: '#ffffff' },
//         styles: { fontSize: 10 },
//       });

//       doc.setFontSize(16);
//       doc.text('Academic Transcript', 10, 20);
//       doc.setFontSize(12);
//       doc.text(`Student ID: ${academicRecords.studentId}`, 10, 30);
//       doc.text(`Email: ${academicRecords.studentEmail}`, 10, 40);
//       doc.text(`Cumulative GPA: ${academicRecords.gpa}`, 10, 50);

//       const logoUrl = '/logo.png';
//       const img = new Image();
//       img.src = logoUrl;

//       img.onload = () => {
//         console.log('[GradesPage] Logo loaded successfully');
//         doc.addImage(img, 'PNG', 10, 10, 50, 50);
//         doc.save(`Transcript_${academicRecords.studentId}.pdf`);
//       };

//       img.onerror = () => {
//         console.warn('[GradesPage] Logo failed to load');
//         doc.save(`Transcript_${academicRecords.studentId}.pdf`);
//       };

//       setTimeout(() => {
//         if (!doc.isSaved) {
//           console.log('[GradesPage] Fallback save triggered');
//           doc.save(`Transcript_${academicRecords.studentId}.pdf`);
//         }
//       }, 3000);
//     } catch (err) {
//       console.error('[GradesPage] PDF Generation Error:', err);
//       setPdfError(`Failed to generate PDF: ${err.message}`);
//     }
//   };

//   // Handle view transcript dialog
//   const handleViewTranscript = () => {
//     setOpenTranscript(true);
//   };

//   const handleCloseTranscript = () => {
//     setOpenTranscript(false);
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <DashboardLayout>
//         <Box
//           sx={{
//             p: 3,
//             background: 'linear-gradient(180deg, #dedede 0%, #2596be 100%)',
//             minHeight: '100vh',
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}
//         >
//           <Typography variant="h6" color="textSecondary">
//             Loading Academic Records...
//           </Typography>
//         </Box>
//       </DashboardLayout>
//     );
//   }

//   // Render when no data is available
//   if (!academicRecords) {
//     return (
//       <DashboardLayout>
//         <Box
//           sx={{
//             p: 3,
//             background: 'linear-gradient(180deg, #dedede 0%, #2596be 100%)',
//             minHeight: '100vh',
//           }}
//         >
//           <Typography
//             variant="h4"
//             align="center"
//             gutterBottom
//             sx={{ fontWeight: 'bold', color: '#000000' }}
//           >
//             Academic Records
//           </Typography>
//           <Alert severity="error" sx={{ mt: 2, maxWidth: 900, mx: 'auto' }} onClose={() => setError('')}>
//             {error || 'No academic records available.'}
//           </Alert>
//         </Box>
//       </DashboardLayout>
//     );
//   }

//   // Main render
//   return (
//     <DashboardLayout>
//       <Grid container spacing={2}>
//         <Grid item xs={12}>
//           <TitleBar title="Academic Records" />
//         </Grid>

//         {error && (
//           <Grid item xs={12}>
//             <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
//               {error}
//             </Alert>
//           </Grid>
//         )}

//         {pdfError && (
//           <Grid item xs={12}>
//             <Alert severity="error" sx={{ mb: 3 }} onClose={() => setPdfError('')}>
//               {pdfError}
//             </Alert>
//           </Grid>
//         )}

//         <Grid item xs={12}>
//           <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: '20px' }}>
//             <Typography variant="h5" gutterBottom sx={{ color: '#000000', fontWeight: 'medium' }}>
//               Academic Summary
//             </Typography>
//             <Divider sx={{ mb: 2 }} />
//             <Grid container spacing={2}>
//               <Grid item xs={12} md={6}>
//                 <Box
//                   sx={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'space-between',
//                   }}
//                 >
//                   <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#000000' }}>
//                     Cumulative GPA:
//                   </Typography>
//                   <Typography variant="h6">{academicRecords.gpa}</Typography>
//                 </Box>
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <Box
//                   sx={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'space-between',
//                   }}
//                 >
//                   <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#000000' }}>
//                     Total Courses:
//                   </Typography>
//                   <Typography variant="h6">{academicRecords.enrollments.length}</Typography>
//                 </Box>
//               </Grid>
//               <Grid item xs={12}>
//                 <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
//                   <Button
//                     variant="contained"
//                     sx={{ backgroundColor: '#094c50', '&:hover': { backgroundColor: '#073a3e' } }}
//                     onClick={handleViewTranscript}
//                   >
//                     View Transcript
//                   </Button>
//                   <Button
//                     variant="contained"
//                     sx={{ backgroundColor: '#094c50', '&:hover': { backgroundColor: '#073a3e' } }}
//                     onClick={generatePDF}
//                   >
//                     Download Transcript
//                   </Button>
//                 </Box>
//               </Grid>
//             </Grid>
//           </Paper>
//         </Grid>

//         <Grid item xs={12}>
//           <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: '20px' }}>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//               <Typography variant="h5" sx={{ color: '#000000', fontWeight: 'medium' }}>
//                 Course Grades
//                 <Chip
//                   label={`${filteredEnrollments.length} Courses`}
//                   size="small"
//                   color="primary"
//                   sx={{ ml: 2, fontWeight: 'bold' }}
//                 />
//               </Typography>
//               <FormControl sx={{ minWidth: 120 }}>
//                 <InputLabel>Filter by Year</InputLabel>
//                 <Select
//                   value={selectedYear}
//                   onChange={handleYearChange}
//                   label="Filter by Year"
//                 >
//                   <MenuItem value="All">All Years</MenuItem>
//                   <MenuItem value="1">Year 1</MenuItem>
//                   <MenuItem value="2">Year 2</MenuItem>
//                 </Select>
//               </FormControl>
//             </Box>
//             <Typography variant="body2" sx={{ mb: 2 }}>
//               Note: IP (In Progress) grades do not affect GPA.
//             </Typography>
//             <Divider sx={{ mb: 2 }} />
//             <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
//               {filteredEnrollments.length > 0 ? (
//                 filteredEnrollments.map((enrollment) => (
//                   <Box
//                     key={enrollment.enrollmentId}
//                     sx={{
//                       p: 2,
//                       border: '1px solid #e0e0e0',
//                       borderRadius: 2,
//                       backgroundColor: '#f9f9f9',
//                       transition: 'background-color 0.3s',
//                       '&:hover': { backgroundColor: '#f5f5f5' },
//                       mb: 1,
//                     }}
//                   >
//                     <Grid container spacing={1}>
//                       <Grid item xs={12} sm={3}>
//                         <Typography variant="body2" color="textSecondary">
//                           Course Code:
//                         </Typography>
//                         <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
//                           {enrollment.courseCode}
//                         </Typography>
//                       </Grid>
//                       <Grid item xs={12} sm={3}>
//                         <Typography variant="body2" color="textSecondary">
//                           Course Name:
//                         </Typography>
//                         <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
//                           {enrollment.courseName}
//                         </Typography>
//                       </Grid>
//                       <Grid item xs={12} sm={3}>
//                         <Typography variant="body2" color="textSecondary">
//                           Semester:
//                         </Typography>
//                         <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
//                           {enrollment.semester}
//                         </Typography>
//                       </Grid>
//                       <Grid item xs={12} sm={3}>
//                         <Typography variant="body2" color="textSecondary">
//                           Grade:
//                         </Typography>
//                         <Typography
//                           variant="subtitle1"
//                           sx={{
//                             fontWeight: 'bold',
//                             color: enrollment.grade === 'E' ? '#d32f2f' : enrollment.grade === 'IP' ? '#0288d1' : '#388e3c',
//                           }}
//                         >
//                           {enrollment.grade}
//                         </Typography>
//                       </Grid>
//                     </Grid>
//                   </Box>
//                 ))
//               ) : (
//                 <Typography color="textSecondary">No courses for selected year.</Typography>
//               )}
//             </Box>
//           </Paper>
//         </Grid>

//         <Grid item xs={12}>
//           <Paper elevation={3} sx={{ p: 4, borderRadius: '20px' }}>
//             <Typography variant="h5" gutterBottom sx={{ color: '#000000', fontWeight: 'medium' }}>
//               GPA Trend Over Semesters
//             </Typography>
//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart data={gpaTrendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
//                 <defs>
//                   <linearGradient id="gpaGradient" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="0%" stopColor="#094c50" />
//                     <stop offset="100%" stopColor="#2596be" />
//                   </linearGradient>
//                 </defs>
//                 <XAxis dataKey="semester" />
//                 <YAxis domain={[0, 4.3]} label={{ value: 'GPA', angle: -90, position: 'insideLeft' }} />
//                 <Tooltip />
//                 <Legend />
//                 <Line type="monotone" dataKey="gpa" stroke="url(#gpaGradient)" name="GPA" />
//               </LineChart>
//             </ResponsiveContainer>
//           </Paper>
//         </Grid>
//       </Grid>

//       {/* Transcript View Dialog */}
//       <Dialog open={openTranscript} onClose={handleCloseTranscript} maxWidth="md" fullWidth>
//         <DialogTitle sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#094c50', color: '#ffffff' }}>
//           <img
//             src="/logo.png"
//             alt="University Logo"
//             style={{ width: 50, height: 50, marginRight: 10 }}
//             onError={(e) => (e.target.style.display = 'none')}
//           />
//           Academic Transcript
//         </DialogTitle>
//         <DialogContent>
//           <Box sx={{ p: 2 }}>
//             <Typography variant="body1" sx={{ mb: 1 }}>
//               <strong>Student ID:</strong> {academicRecords.studentId}
//             </Typography>
//             <Typography variant="body1" sx={{ mb: 1 }}>
//               <strong>Email:</strong> {academicRecords.studentEmail}
//             </Typography>
//             <Typography variant="body1" sx={{ mb: 2 }}>
//               <strong>Cumulative GPA:</strong> {academicRecords.gpa}
//             </Typography>
//             <TableContainer component={Paper}>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#094c50', color: '#ffffff' }}>
//                       Course Code
//                     </TableCell>
//                     <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#094c50', color: '#ffffff' }}>
//                       Course Title
//                     </TableCell>
//                     <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#094c50', color: '#ffffff' }}>
//                       Semester
//                     </TableCell>
//                     <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#094c50', color: '#ffffff' }}>
//                       Grade
//                     </TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {academicRecords.enrollments.map((enrollment) => (
//                     <TableRow key={enrollment.enrollmentId}>
//                       <TableCell>{enrollment.courseCode}</TableCell>
//                       <TableCell>{enrollment.courseName}</TableCell>
//                       <TableCell>{enrollment.semester}</TableCell>
//                       <TableCell>{enrollment.grade}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//             <Box sx={{ mt: 2, textAlign: 'right' }}>
//               <Button
//                 variant="contained"
//                 sx={{ backgroundColor: '#094c50', '&:hover': { backgroundColor: '#073a3e' } }}
//                 onClick={handleCloseTranscript}
//               >
//                 Close
//               </Button>
//             </Box>
//           </Box>
//         </DialogContent>
//       </Dialog>
//     </DashboardLayout>
//   );
// };

// export default GradesPage;

import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Divider,
  Chip,
  Alert,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  CircularProgress,
  IconButton,
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import RefreshIcon from '@mui/icons-material/Refresh';
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
import TitleBar from '../../components/Titlebar/Titlebar';
import { 
  getAcademicRecords, 
  getGpaTrend,
} from "../../Endpoints/StudentEndpoints";

const GradesPage = () => {
  const [academicRecords, setAcademicRecords] = useState(null);
  const [gpaTrendData, setGpaTrendData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState('All');
  const [openTranscript, setOpenTranscript] = useState(false);
  const [pdfError, setPdfError] = useState('');
  const studentId = 'S11223366'; // Hardcoded for testing, replace with dynamic value later

  // Fetch academic records and GPA trend data
  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      // Make API calls in parallel
      const [recordsResponse, gpaTrendResponse] = await Promise.all([
        getAcademicRecords(studentId),
        getGpaTrend(studentId)
      ]);

      // Check if responses contain data
      if (recordsResponse && recordsResponse.data) {
        setAcademicRecords(recordsResponse.data);
      } else {
        throw new Error('No academic records data received');
      }

      if (gpaTrendResponse && gpaTrendResponse.data) {
        setGpaTrendData(gpaTrendResponse.data);
      } else {
        throw new Error('No GPA trend data received');
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message || 'Failed to fetch academic data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle year selection for filtering enrollments
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  // Filter enrollments by selected year
  const filteredEnrollments = academicRecords?.enrollments?.filter(
    (enrollment) => selectedYear === 'All' || enrollment.semester.includes(selectedYear)
  ) || [];

  // Generate PDF transcript
  const generatePDF = () => {
    try {
      if (!academicRecords) {
        throw new Error('No academic records available');
      }

      const doc = new jsPDF();
      
      // Add header
      doc.setFontSize(16);
      doc.text('Academic Transcript', 105, 20, null, null, 'center');
      doc.setFontSize(12);
      doc.text(`Student ID: ${academicRecords.studentId}`, 14, 30);
      doc.text(`Email: ${academicRecords.email}`, 14, 40);
      doc.text(`Cumulative GPA: ${academicRecords.gpa.toFixed(2)}`, 14, 50);

      // Add table with grades
      autoTable(doc, {
        startY: 60,
        head: [['Course Code', 'Course Title', 'Semester', 'Grade']],
        body: academicRecords.enrollments.map((enrollment) => [
          enrollment.courseCode,
          enrollment.courseName,
          enrollment.semester,
          enrollment.grade,
        ]),
        theme: 'grid',
        headStyles: { fillColor: '#094c50', textColor: '#ffffff' },
        styles: { fontSize: 10 },
      });

      doc.save(`Transcript_${academicRecords.studentId}.pdf`);
    } catch (err) {
      console.error('PDF Generation Error:', err);
      setPdfError(`Failed to generate PDF: ${err.message}`);
    }
  };

  // Handle view transcript dialog
  const handleViewTranscript = () => {
    setOpenTranscript(true);
  };

  const handleCloseTranscript = () => {
    setOpenTranscript(false);
  };

  // Loading state
  if (loading) {
    return (
      <DashboardLayout>
        <Box
          sx={{
            p: 3,
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: 2
          }}
        >
          <CircularProgress size={60} />
          <Typography variant="h6">Loading Academic Records...</Typography>
        </Box>
      </DashboardLayout>
    );
  }

  // Error state
  if (error) {
    return (
      <DashboardLayout>
        <Box sx={{ p: 3 }}>
          <TitleBar title="Academic Records" />
          <Alert 
            severity="error" 
            sx={{ mt: 2 }}
            action={
              <Button color="inherit" size="small" onClick={fetchData}>
                Retry
              </Button>
            }
          >
            {error}
          </Alert>
        </Box>
      </DashboardLayout>
    );
  }

  // Main render
  return (
    <DashboardLayout>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <TitleBar title="Academic Records" />
            <IconButton onClick={fetchData}>
              <RefreshIcon />
            </IconButton>
          </Box>
        </Grid>

        {pdfError && (
          <Grid item xs={12}>
            <Alert severity="error" onClose={() => setPdfError('')}>
              {pdfError}
            </Alert>
          </Grid>
        )}

        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              Academic Summary
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body1" fontWeight="bold">
                    Cumulative GPA:
                  </Typography>
                  <Typography variant="h6">
                    {academicRecords?.gpa?.toFixed(2) || 'N/A'}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body1" fontWeight="bold">
                    Total Courses:
                  </Typography>
                  <Typography variant="h6">
                    {academicRecords?.enrollments?.length || 0}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" gap={2} mt={2}>
                  <Button variant="contained" onClick={handleViewTranscript}>
                    View Transcript
                  </Button>
                  <Button variant="contained" onClick={generatePDF}>
                    Download Transcript
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h5">
                Course Grades
                <Chip
                  label={`${filteredEnrollments.length} Courses`}
                  size="small"
                  color="primary"
                  sx={{ ml: 2 }}
                />
              </Typography>
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>Filter by Year</InputLabel>
                <Select
                  value={selectedYear}
                  onChange={handleYearChange}
                  label="Filter by Year"
                >
                  <MenuItem value="All">All Years</MenuItem>
                  <MenuItem value="2023">2023</MenuItem>
                  <MenuItem value="2025">2025</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
              {filteredEnrollments.length > 0 ? (
                filteredEnrollments.map((enrollment) => (
                  <Box
                    key={enrollment.courseId}
                    sx={{
                      p: 2,
                      mb: 1,
                      border: '1px solid #e0e0e0',
                      borderRadius: 1,
                      '&:hover': { backgroundColor: '#f5f5f5' },
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={3}>
                        <Typography variant="body2" color="textSecondary">
                          Course Code:
                        </Typography>
                        <Typography variant="subtitle1">
                          {enrollment.courseCode}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Typography variant="body2" color="textSecondary">
                          Course Name:
                        </Typography>
                        <Typography variant="subtitle1">
                          {enrollment.courseName}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <Typography variant="body2" color="textSecondary">
                          Semester:
                        </Typography>
                        <Typography variant="subtitle1">
                          {enrollment.semester}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={2}>
                        <Typography variant="body2" color="textSecondary">
                          Grade:
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          fontWeight="bold"
                          color={
                            enrollment.grade === 'N/A' ? 'text.secondary' :
                            ['A', 'A-', 'B+'].includes(enrollment.grade) ? 'success.main' :
                            ['B', 'B-', 'C+'].includes(enrollment.grade) ? 'warning.main' :
                            'error.main'
                          }
                        >
                          {enrollment.grade}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                ))
              ) : (
                <Typography color="textSecondary">
                  No courses found for selected year.
                </Typography>
              )}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>
              GPA Trend Over Semesters
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={gpaTrendData}>
                <XAxis dataKey="semester" />
                <YAxis domain={[0, 4]} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="gpa"
                  stroke="#094c50"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Transcript Dialog */}
      <Dialog open={openTranscript} onClose={handleCloseTranscript} maxWidth="md" fullWidth>
        <DialogTitle>
          Academic Transcript
        </DialogTitle>
        <DialogContent>
          <Box sx={{ p: 2 }}>
            <Typography variant="body1" mb={1}>
              <strong>Student ID:</strong> {academicRecords?.studentId}
            </Typography>
            <Typography variant="body1" mb={1}>
              <strong>Email:</strong> {academicRecords?.email}
            </Typography>
            <Typography variant="body1" mb={2}>
              <strong>Cumulative GPA:</strong> {academicRecords?.gpa?.toFixed(2)}
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Course Code</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Course Title</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Semester</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Grade</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {academicRecords?.enrollments?.map((enrollment) => (
                    <TableRow key={enrollment.courseId}>
                      <TableCell>{enrollment.courseCode}</TableCell>
                      <TableCell>{enrollment.courseName}</TableCell>
                      <TableCell>{enrollment.semester}</TableCell>
                      <TableCell>{enrollment.grade}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box mt={2} display="flex" justifyContent="flex-end">
              <Button onClick={handleCloseTranscript}>Close</Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default GradesPage;