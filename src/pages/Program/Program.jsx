// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from '@mui/material';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
// import TitleBar from '../../components/Titlebar/Titlebar';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import CancelIcon from '@mui/icons-material/Cancel';

// // Mock program audit data for Bachelor of Networks & Security
// const programAudit = {
//   programCode: 'BNS',
//   programName: 'Bachelor of Networks & Security',
//   years: [
//     {
//       year: 1,
//       courses: [
//         { courseCode: 'CS111', status: 'Passed' },
//         { courseCode: 'CS112', status: 'Passed' },
//         { courseCode: 'CS150', status: 'Passed' },
//         { courseCode: 'MA111', status: 'Passed' },
//         { courseCode: 'MA161', status: 'Passed' },
//         { courseCode: 'MG101', status: 'Passed' },
//         { courseCode: 'ST131', status: 'Passed' },
//         { courseCode: 'UU100A', status: 'Passed' },
//         { courseCode: 'UU114', status: 'Passed' },
//       ],
//     },
//     {
//       year: 2,
//       courses: [
//         { courseCode: 'CS211', status: 'Passed' },
//         { courseCode: 'CS214', status: 'Passed' },
//         { courseCode: 'CS215', status: 'Failed' },
//         { courseCode: 'CS218', status: 'Passed' },
//         { courseCode: 'CS219', status: 'Failed' },
//         { courseCode: 'IS221', status: 'Passed' },
//         { courseCode: 'IS222', status: 'Passed' },
//         { courseCode: 'UU200', status: 'Passed' },
//         { courseCode: 'CS001', status: 'Passed' },
//       ],
//     },
//     {
//       year: 3,
//       courses: [
//         { courseCode: 'CS310', status: 'Not Attempted' },
//         { courseCode: 'CS311', status: 'Not Attempted' },
//         { courseCode: 'CS317', status: 'Not Attempted' },
//         { courseCode: 'CS324', status: 'Not Attempted' },
//         { courseCode: 'CS350', status: 'Not Attempted' },
//         { courseCode: 'CS351', status: 'Not Attempted' },
//         { courseCode: 'CS352', status: 'Not Attempted' },
//         { courseCode: 'IS333', status: 'Not Attempted' },
//       ],
//     },
//     {
//       year: 4,
//       courses: [
//         { courseCode: 'CS403', status: 'Not Attempted' },
//         { courseCode: 'CS412', status: 'Not Attempted' },
//         { courseCode: 'CS424', status: 'Not Attempted' },
//         { courseCode: 'CS400', status: 'Not Attempted' },
//       ],
//     },
//   ],
// };

// // Mock API function
// const getStudentProgram = async () =>
//   new Promise((resolve) => setTimeout(() => resolve(programAudit), 100));

// // Program Component
// const Program = () => {
//   const [program, setProgram] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Fetch program data
//   useEffect(() => {
//     const fetchProgram = async () => {
//       setLoading(true);
//       try {
//         const data = await getStudentProgram();
//         setProgram(data);
//       } catch (error) {
//         console.error('Error fetching program:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProgram();
//   }, []);

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
//             Loading Program Details...
//           </Typography>
//         </Box>
//       </DashboardLayout>
//     );
//   }

//   // Render when no program data
//   if (!program) {
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
//           <Typography variant="h6" color="error">
//             Unable to load program details.
//           </Typography>
//         </Box>
//       </DashboardLayout>
//     );
//   }

//   // Calculate completion data for graph
//   const completionData = program.years.map(year => ({
//     year: `Year ${year.year}`,
//     completion: (
//       (year.courses.filter(course => course.status === 'Passed').length / year.courses.length) * 100
//     ).toFixed(1),
//   }));

//   // Determine the maximum number of courses in any year for table rows
//   const maxCourses = Math.max(...program.years.map(year => year.courses.length));

//   return (
//     <DashboardLayout>
//       <Grid container spacing={2}>
//         <Grid item xs={12}>
//           {/* Header */}
//           <TitleBar title="Program" />

//           {/* Program Overview Card */}
//           <Card
//             elevation={3}
//             sx={{
//               mb: 4,
//               borderRadius: "20px",
//               background: 'linear-gradient(135deg, #ffffff 0%, #f5f7fa 100%)',
//             }}
//           >
//             <CardContent sx={{ p: 3 }}>
//               <Typography variant="h5" gutterBottom sx={{ color: '#000000', fontWeight: 'medium' }}>
//                 Program Overview
//               </Typography>
//               <TableContainer>
//                 <Table>
//                   <TableBody>
//                     <TableRow>
//                       <TableCell sx={{ fontWeight: 'bold', color: '#000000' }}>Program</TableCell>
//                       <TableCell>
//                         {program.programCode} - {program.programName}
//                       </TableCell>
//                     </TableRow>
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </CardContent>
//           </Card>

//           {/* Program Audit Table */}
//           <Card elevation={3} sx={{ borderRadius: "20px", mb: 4 }}>
//             <CardContent sx={{ p: 3 }}>
//               <Typography variant="h5" gutterBottom sx={{ color: '#000000', fontWeight: 'medium' }}>
//                 Program Audit
//               </Typography>
//               <Typography variant="body2" sx={{ mb: 2 }}>
//                 Note: For Year 4, choose any two of CS403, CS412, or CS424.
//               </Typography>
//               <TableContainer component={Paper}>
//                 <Table sx={{ minWidth: 650 }} aria-label="program audit table">
//                   <TableHead>
//                     <TableRow>
//                       <TableCell sx={{ fontWeight: 'bold' }}>Year 1</TableCell>
//                       <TableCell sx={{ fontWeight: 'bold' }}>Year 2</TableCell>
//                       <TableCell sx={{ fontWeight: 'bold' }}>Year 3</TableCell>
//                       <TableCell sx={{ fontWeight: 'bold' }}>Year 4</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {[...Array(maxCourses)].map((_, rowIndex) => (
//                       <TableRow key={rowIndex}>
//                         {program.years.map(year => (
//                           <TableCell key={year.year}>
//                             {year.courses[rowIndex] ? (
//                               <Typography variant="body2" sx={{ display: 'inline-flex', alignItems: 'center' }}>
//                                 {year.courses[rowIndex].courseCode}{' '}
//                                 {year.courses[rowIndex].status === 'Passed' && (
//                                   <CheckCircleIcon sx={{ color: '#094c50', verticalAlign: 'middle', ml: 1 }} />
//                                 )}
//                                 {year.courses[rowIndex].status === 'Failed' && (
//                                   <CancelIcon sx={{ color: '#8f1d36', verticalAlign: 'middle', ml: 1 }} />
//                                 )}
//                               </Typography>
//                             ) : ''}
//                           </TableCell>
//                         ))}
//                       </TableRow>
//                     ))}
//                     <TableRow>
//                       {program.years.map(year => (
//                         <TableCell key={year.year} sx={{ fontWeight: 'bold' }}>
//                           Total Units: {year.courses.length}
//                         </TableCell>
//                       ))}
//                     </TableRow>
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </CardContent>
//           </Card>

//           {/* Program Completion Graph */}
//           <Card elevation={3} sx={{ borderRadius: "20px" }}>
//             <CardContent sx={{ p: 3 }}>
//               <Typography variant="h5" gutterBottom sx={{ color: '#000000', fontWeight: 'medium' }}>
//                 Program Completion Progress
//               </Typography>
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={completionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
//                   <XAxis dataKey="year" />
//                   <YAxis label={{ value: 'Completion (%)', angle: -90, position: 'insideLeft' }} />
//                   <Tooltip />
//                   <Legend />
//                   <Bar dataKey="completion" fill="#094c50" name="Completion Percentage" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </DashboardLayout>
//   );
// };

// export default Program;

import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  CircularProgress,
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
import TitleBar from '../../components/Titlebar/Titlebar';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { getStudent } from '../../Endpoints/StudentEndpoints'; // Using getStudent as a placeholder

// Program Component
const Program = () => {
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [studentId, setStudentId] = useState('');
  const [authError, setAuthError] = useState('');

  // Fetch student ID from local storage
  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      const cleanId = user.id || (user.email ? user.email.split('@')[0] : null);
      if (cleanId) {
        setStudentId(cleanId);
      } else {
        setAuthError('Invalid user data. Please login again.');
        setLoading(false);
      }
    } else {
      setAuthError('User not authenticated. Please login.');
      setLoading(false);
    }
  }, []);

  // Fetch program data
  useEffect(() => {
    if (!studentId) return;

    const fetchProgram = async () => {
      setLoading(true);
      setError('');
      try {
        // Using getStudent as a placeholder; replace with getStudentProgram or correct endpoint
        const response = await getStudent(studentId);
        // Adjust mapping based on actual response structure
        const studentData = response.data;
        const programData = {
          programCode: studentData.programCode || studentData.program, // Adjust field name
          programName: studentData.programName || studentData.program, // Adjust field name
          years: studentData.years || [
            // Fallback structure if years/courses are not provided
            { year: 1, courses: [] },
            { year: 2, courses: [] },
            { year: 3, courses: [] },
            { year: 4, courses: [] },
          ],
        };
        setProgram(programData);
      } catch (err) {
        console.error('Error fetching program:', err);
        setError(err.response?.data?.message || 'Unable to load program details.');
      } finally {
        setLoading(false);
      }
    };
    fetchProgram();
  }, [studentId]);

  // Loading or Error State
  if (loading || authError) {
    return (
      <DashboardLayout>
        <Box
          sx={{
            p: 3,
            background: 'linear-gradient(180deg, #dedede 0%, #2596be 100%)',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {authError ? (
            <Alert severity="error" sx={{ mb: 3 }}>
              {authError}
            </Alert>
          ) : (
            <>
              <CircularProgress />
              <Typography variant="h6" color="textSecondary" sx={{ ml: 2 }}>
                Loading Program Details...
              </Typography>
            </>
          )}
        </Box>
      </DashboardLayout>
    );
  }

  // Render when no program data
  if (!program) {
    return (
      <DashboardLayout>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TitleBar title="Program" />
            <Alert severity="error" sx={{ mb: 3, borderRadius: '12px' }}>
              {error}
            </Alert>
          </Grid>
        </Grid>
      </DashboardLayout>
    );
  }

  // Calculate completion data for graph
  const completionData = program.years.map(year => ({
    year: `Year ${year.year}`,
    completion: (
      (year.courses.filter(course => course.status === 'Passed').length / (year.courses.length || 1)) * 100
    ).toFixed(1),
  }));

  // Determine the maximum number of courses in any year for table rows
  const maxCourses = Math.max(...program.years.map(year => year.courses.length), 1);

  return (
    <DashboardLayout>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {/* Header */}
          <TitleBar title="Program" />

          {/* Program Overview Card */}
          <Card
            elevation={3}
            sx={{
              mb: 4,
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #ffffff 0%, #f5f7fa 100%)',
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom sx={{ color: '#000000', fontWeight: 'medium' }}>
                Program Overview
              </Typography>
              <TableContainer>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold', color: '#000000' }}>Program</TableCell>
                      <TableCell>
                        {program.programCode}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>

          {/* Program Audit Table */}
          <Card elevation={3} sx={{ borderRadius: '20px', mb: 4 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom sx={{ color: '#000000', fontWeight: 'medium' }}>
                Program Audit
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Note: For Year 4, choose any two of CS403, CS412, or CS424.
              </Typography>
              {error && (
                <Alert severity="error" sx={{ mb: 2, borderRadius: '12px' }} onClose={() => setError('')}>
                  {error}
                </Alert>
              )}
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="program audit table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>Year 1</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Year 2</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Year 3</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Year 4</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[...Array(maxCourses)].map((_, rowIndex) => (
                      <TableRow key={rowIndex}>
                        {program.years.map(year => (
                          <TableCell key={year.year}>
                            {year.courses[rowIndex] ? (
                              <Typography variant="body2" sx={{ display: 'inline-flex', alignItems: 'center' }}>
                                {year.courses[rowIndex].courseCode}{' '}
                                {year.courses[rowIndex].status === 'Passed' && (
                                  <CheckCircleIcon sx={{ color: '#094c50', verticalAlign: 'middle', ml: 1 }} />
                                )}
                                {year.courses[rowIndex].status === 'Failed' && (
                                  <CancelIcon sx={{ color: '#8f1d36', verticalAlign: 'middle', ml: 1 }} />
                                )}
                              </Typography>
                            ) : ''}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                    <TableRow>
                      {program.years.map(year => (
                        <TableCell key={year.year} sx={{ fontWeight: 'bold' }}>
                          Total Units: {year.courses.length}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>

          {/* Program Completion Graph */}
          <Card elevation={3} sx={{ borderRadius: '20px' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom sx={{ color: '#000000', fontWeight: 'medium' }}>
                Program Completion Progress
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={completionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis dataKey="year" />
                  <YAxis label={{ value: 'Completion (%)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completion" fill="#094c50" name="Completion Percentage" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default Program;