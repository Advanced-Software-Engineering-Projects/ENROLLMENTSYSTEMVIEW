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
//   CircularProgress,
//   IconButton,
// } from '@mui/material';
// import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';
// import RefreshIcon from '@mui/icons-material/Refresh';
// import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
// import TitleBar from '../../components/Titlebar/Titlebar';
// import { 
//   getAcademicRecords, 

// } from "../../Endpoints/StudentEndpoints";

// const GradesPage = () => {
//   const [academicRecords, setAcademicRecords] = useState(null);
//   const [gpaTrendData, setGpaTrendData] = useState([]);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [selectedYear, setSelectedYear] = useState('All');
//   const [openTranscript, setOpenTranscript] = useState(false);
//   const [pdfError, setPdfError] = useState('');
//   const studentId = 'S11223366'; // Hardcoded for testing, replace with dynamic value later

//   // Fetch academic records and GPA trend data
//   const fetchData = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       // Make API calls in parallel
//       const [recordsResponse, gpaTrendResponse] = await Promise.all([
//         getAcademicRecords(studentId),
//         getGpaTrend(studentId)
//       ]);

//       // Check if responses contain data
//       if (recordsResponse && recordsResponse.data) {
//         setAcademicRecords(recordsResponse.data);
//       } else {
//         throw new Error('No academic records data received');
//       }

//       if (gpaTrendResponse && gpaTrendResponse.data) {
//         setGpaTrendData(gpaTrendResponse.data);
//       } else {
//         throw new Error('No GPA trend data received');
//       }
//     } catch (err) {
//       console.error('Error fetching data:', err);
//       setError(err.message || 'Failed to fetch academic data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // Handle year selection for filtering enrollments
//   const handleYearChange = (event) => {
//     setSelectedYear(event.target.value);
//   };

//   // Filter enrollments by selected year
//   const filteredEnrollments = academicRecords?.enrollments?.filter(
//     (enrollment) => selectedYear === 'All' || enrollment.semester.includes(selectedYear)
//   ) || [];

//   // Generate PDF transcript
//   const generatePDF = () => {
//     try {
//       if (!academicRecords) {
//         throw new Error('No academic records available');
//       }

//       const doc = new jsPDF();
      
//       // Add header
//       doc.setFontSize(16);
//       doc.text('Academic Transcript', 105, 20, null, null, 'center');
//       doc.setFontSize(12);
//       doc.text(`Student ID: ${academicRecords.studentId}`, 14, 30);
//       doc.text(`Email: ${academicRecords.email}`, 14, 40);
//       doc.text(`Cumulative GPA: ${academicRecords.gpa.toFixed(2)}`, 14, 50);

//       // Add table with grades
//       autoTable(doc, {
//         startY: 60,
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

//       doc.save(`Transcript_${academicRecords.studentId}.pdf`);
//     } catch (err) {
//       console.error('PDF Generation Error:', err);
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
//             minHeight: '100vh',
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             flexDirection: 'column',
//             gap: 2
//           }}
//         >
//           <CircularProgress size={60} />
//           <Typography variant="h6">Loading Academic Records...</Typography>
//         </Box>
//       </DashboardLayout>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <DashboardLayout>
//         <Box sx={{ p: 3 }}>
//           <TitleBar title="Academic Records" />
//           <Alert 
//             severity="error" 
//             sx={{ mt: 2 }}
//             action={
//               <Button color="inherit" size="small" onClick={fetchData}>
//                 Retry
//               </Button>
//             }
//           >
//             {error}
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
//           <Box display="flex" alignItems="center" justifyContent="space-between">
//             <TitleBar title="Academic Records" />
//             <IconButton onClick={fetchData}>
//               <RefreshIcon />
//             </IconButton>
//           </Box>
//         </Grid>

//         {pdfError && (
//           <Grid item xs={12}>
//             <Alert severity="error" onClose={() => setPdfError('')}>
//               {pdfError}
//             </Alert>
//           </Grid>
//         )}

//         <Grid item xs={12}>
//           <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
//             <Typography variant="h5" gutterBottom>
//               Academic Summary
//             </Typography>
//             <Divider sx={{ mb: 2 }} />
//             <Grid container spacing={2}>
//               <Grid item xs={12} md={6}>
//                 <Box display="flex" justifyContent="space-between">
//                   <Typography variant="body1" fontWeight="bold">
//                     Cumulative GPA:
//                   </Typography>
//                   <Typography variant="h6">
//                     {academicRecords?.gpa?.toFixed(2) || 'N/A'}
//                   </Typography>
//                 </Box>
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <Box display="flex" justifyContent="space-between">
//                   <Typography variant="body1" fontWeight="bold">
//                     Total Courses:
//                   </Typography>
//                   <Typography variant="h6">
//                     {academicRecords?.enrollments?.length || 0}
//                   </Typography>
//                 </Box>
//               </Grid>
//               <Grid item xs={12}>
//                 <Box display="flex" gap={2} mt={2}>
//                   <Button variant="contained" onClick={handleViewTranscript}>
//                     View Transcript
//                   </Button>
//                   <Button variant="contained" onClick={generatePDF}>
//                     Download Transcript
//                   </Button>
//                 </Box>
//               </Grid>
//             </Grid>
//           </Paper>
//         </Grid>

//         <Grid item xs={12}>
//           <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
//             <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//               <Typography variant="h5">
//                 Course Grades
//                 <Chip
//                   label={`${filteredEnrollments.length} Courses`}
//                   size="small"
//                   color="primary"
//                   sx={{ ml: 2 }}
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
//                   <MenuItem value="2023">2023</MenuItem>
//                   <MenuItem value="2025">2025</MenuItem>
//                 </Select>
//               </FormControl>
//             </Box>
//             <Divider sx={{ mb: 2 }} />
//             <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
//               {filteredEnrollments.length > 0 ? (
//                 filteredEnrollments.map((enrollment) => (
//                   <Box
//                     key={enrollment.courseId}
//                     sx={{
//                       p: 2,
//                       mb: 1,
//                       border: '1px solid #e0e0e0',
//                       borderRadius: 1,
//                       '&:hover': { backgroundColor: '#f5f5f5' },
//                     }}
//                   >
//                     <Grid container spacing={2}>
//                       <Grid item xs={12} sm={3}>
//                         <Typography variant="body2" color="textSecondary">
//                           Course Code:
//                         </Typography>
//                         <Typography variant="subtitle1">
//                           {enrollment.courseCode}
//                         </Typography>
//                       </Grid>
//                       <Grid item xs={12} sm={4}>
//                         <Typography variant="body2" color="textSecondary">
//                           Course Name:
//                         </Typography>
//                         <Typography variant="subtitle1">
//                           {enrollment.courseName}
//                         </Typography>
//                       </Grid>
//                       <Grid item xs={12} sm={3}>
//                         <Typography variant="body2" color="textSecondary">
//                           Semester:
//                         </Typography>
//                         <Typography variant="subtitle1">
//                           {enrollment.semester}
//                         </Typography>
//                       </Grid>
//                       <Grid item xs={12} sm={2}>
//                         <Typography variant="body2" color="textSecondary">
//                           Grade:
//                         </Typography>
//                         <Typography
//                           variant="subtitle1"
//                           fontWeight="bold"
//                           color={
//                             enrollment.grade === 'N/A' ? 'text.secondary' :
//                             ['A', 'A-', 'B+'].includes(enrollment.grade) ? 'success.main' :
//                             ['B', 'B-', 'C+'].includes(enrollment.grade) ? 'warning.main' :
//                             'error.main'
//                           }
//                         >
//                           {enrollment.grade}
//                         </Typography>
//                       </Grid>
//                     </Grid>
//                   </Box>
//                 ))
//               ) : (
//                 <Typography color="textSecondary">
//                   No courses found for selected year.
//                 </Typography>
//               )}
//             </Box>
//           </Paper>
//         </Grid>

//         <Grid item xs={12}>
//           <Paper elevation={3} sx={{ p: 4 }}>
//             <Typography variant="h5" gutterBottom>
//               GPA Trend Over Semesters
//             </Typography>
//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart data={gpaTrendData}>
//                 <XAxis dataKey="semester" />
//                 <YAxis domain={[0, 4]} />
//                 <Tooltip />
//                 <Legend />
//                 <Line
//                   type="monotone"
//                   dataKey="gpa"
//                   stroke="#094c50"
//                   strokeWidth={2}
//                   activeDot={{ r: 8 }}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </Paper>
//         </Grid>
//       </Grid>

//       {/* Transcript Dialog */}
//       <Dialog open={openTranscript} onClose={handleCloseTranscript} maxWidth="md" fullWidth>
//         <DialogTitle>
//           Academic Transcript
//         </DialogTitle>
//         <DialogContent>
//           <Box sx={{ p: 2 }}>
//             <Typography variant="body1" mb={1}>
//               <strong>Student ID:</strong> {academicRecords?.studentId}
//             </Typography>
//             <Typography variant="body1" mb={1}>
//               <strong>Email:</strong> {academicRecords?.email}
//             </Typography>
//             <Typography variant="body1" mb={2}>
//               <strong>Cumulative GPA:</strong> {academicRecords?.gpa?.toFixed(2)}
//             </Typography>
//             <TableContainer>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell sx={{ fontWeight: 'bold' }}>Course Code</TableCell>
//                     <TableCell sx={{ fontWeight: 'bold' }}>Course Title</TableCell>
//                     <TableCell sx={{ fontWeight: 'bold' }}>Semester</TableCell>
//                     <TableCell sx={{ fontWeight: 'bold' }}>Grade</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {academicRecords?.enrollments?.map((enrollment) => (
//                     <TableRow key={enrollment.courseId}>
//                       <TableCell>{enrollment.courseCode}</TableCell>
//                       <TableCell>{enrollment.courseName}</TableCell>
//                       <TableCell>{enrollment.semester}</TableCell>
//                       <TableCell>{enrollment.grade}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//             <Box mt={2} display="flex" justifyContent="flex-end">
//               <Button onClick={handleCloseTranscript}>Close</Button>
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
} from "../../Endpoints/StudentEndpoints";

const GradesPage = () => {
  const [academicRecords, setAcademicRecords] = useState(null);
  const [gpaTrendData, setGpaTrendData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState('All');
  const [openTranscript, setOpenTranscript] = useState(false);
  const [pdfError, setPdfError] = useState('');
  const [studentId, setStudentId] = useState('');

  // Get studentId from localStorage on mount
  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      const cleanId = user.email ? user.email.split('@')[0] : '';
      setStudentId(cleanId);
    } else {
      setError('User not authenticated. Please login.');
      setLoading(false);
    }
  }, []);

  // Fetch academic records and GPA trend data when studentId changes
  useEffect(() => {
    if (!studentId) return;

    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const [recordsResponse, gpaTrendResponse] = await Promise.all([
          getAcademicRecords(studentId)
        ]);

        if (recordsResponse && recordsResponse.data) {
          setAcademicRecords(recordsResponse.data);
        } else {
          throw new Error('No academic records data received');
        }

        // if (gpaTrendResponse && gpaTrendResponse.data) {
        //   setGpaTrendData(gpaTrendResponse.data);
        // } else {
        //   throw new Error('No GPA trend data received');
        // }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message || 'Failed to fetch academic data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [studentId]);

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
      
      doc.setFontSize(16);
      doc.text('Academic Transcript', 105, 20, null, null, 'center');
      doc.setFontSize(12);
      doc.text(`Student ID: ${academicRecords.studentId}`, 14, 30);
      doc.text(`Email: ${academicRecords.email}`, 14, 40);
      doc.text(`Cumulative GPA: ${academicRecords.gpa.toFixed(2)}`, 14, 50);

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

  const handleViewTranscript = () => {
    setOpenTranscript(true);
  };

  const handleCloseTranscript = () => {
    setOpenTranscript(false);
  };

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

  if (error) {
    return (
      <DashboardLayout>
        <Box sx={{ p: 3 }}>
          <TitleBar title="Academic Records" />
          <Alert 
            severity="error" 
            sx={{ mt: 2 }}
            action={
              <Button color="inherit" size="small" onClick={() => window.location.reload()}>
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

  return (
    <DashboardLayout>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <TitleBar title="Academic Records" />
            <IconButton onClick={() => window.location.reload()}>
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
