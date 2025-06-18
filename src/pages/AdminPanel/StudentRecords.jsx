// import React, { useState } from 'react';
// import {
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
//   Grid,
//   Pagination,
//   Avatar,
//   Container,
// } from '@mui/material';
// import { styled } from '@mui/system';
// import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
// import TitleBar from '../../components/Titlebar/Titlebar';

// // Custom styles
// const StyledPaper = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(4),
//   borderRadius: '12px',
//   backgroundColor: '#fff',
//   boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
//   width: '100%',
// }));

// const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
//   borderRadius: '12px',
//   backgroundColor: '#f9f9f9',
// }));

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   fontWeight: 500,
//   color: '#094C50',
//   borderBottom: '1px solid #e0e0e0',
// }));

// const StyledAvatar = styled(Avatar)(({ theme }) => ({
//   width: 40,
//   height: 40,
//   border: '2px solid #fff',
//   boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
// }));

// // Student data from the Excel file
// const students = [
//   {
//     firstName: 'Aarya',
//     middleName: 'Vishal',
//     lastName: 'Singh',
//     studentId: 's10234876',
//     dob: '2004-08-12',
//     email: 'aarya.singh@usp.ac.fj',
//     phone: '+6799876543',
//     avatar: 'https://via.placeholder.com/150',
//     gender: 'Female',
//     citizenship: 'Fijian',
//     program: 'Certificate in Land Management',
//     studentLevel: 'Certificate',
//     studentCampus: 'Laucala',
//     examSite: 'Laucala Campus',
//     majorType: 'Single Major',
//     major1: 'CLM',
//     major2: '',
//   },
//   {
//     firstName: 'John',
//     middleName: 'David',
//     lastName: 'Roberts',
//     studentId: 's10345981',
//     dob: '2003-05-22',
//     email: 'john.roberts@usp.ac.fj',
//     phone: '+16615551234',
//     avatar: 'https://via.placeholder.com/150',
//     gender: 'Male',
//     citizenship: 'American',
//     program: 'Bachelor of Engineering (Civil)',
//     studentLevel: 'Degree',
//     studentCampus: 'Emalus',
//     examSite: 'Emalus Campus',
//     majorType: 'Single Major',
//     major1: 'BCE',
//     major2: '',
//   },
//   {
//     firstName: 'Meera',
//     middleName: '',
//     lastName: 'Naidu',
//     studentId: 's10124763',
//     dob: '2002-11-17',
//     email: 'meera.naidu@usp.ac.fj',
//     phone: '+6799213456',
//     avatar: 'https://via.placeholder.com/150',
//     gender: 'Female',
//     citizenship: 'Fijian',
//     program: 'Bachelor of Software Engineering',
//     studentLevel: 'Degree',
//     studentCampus: 'Lautoka',
//     examSite: 'Lautoka Campus',
//     majorType: 'Single Major',
//     major1: 'BSE',
//     major2: '',
//   },
//   {
//     firstName: 'Ethan',
//     middleName: 'Malik',
//     lastName: 'Kumar',
//     studentId: 's10436529',
//     dob: '2001-02-05',
//     email: 'ethan.kumar@usp.ac.fj',
//     phone: '+6799011223',
//     avatar: 'https://via.placeholder.com/150',
//     gender: 'Male',
//     citizenship: 'Indian',
//     program: 'Bachelor of Networks & Security',
//     studentLevel: 'Degree',
//     studentCampus: 'Labasa',
//     examSite: 'Labasa Campus',
//     majorType: 'Single Major',
//     major1: 'BNS',
//     major2: '',
//   },
//   {
//     firstName: 'Priya',
//     middleName: 'Anne',
//     lastName: 'Johnson',
//     studentId: 's10547102',
//     dob: '2000-03-29',
//     email: 'priya.johnson@usp.ac.fj',
//     phone: '+6799988776',
//     avatar: 'https://via.placeholder.com/150',
//     gender: 'Female',
//     citizenship: 'American',
//     program: 'Bachelor of Education in Mathematics & Physics',
//     studentLevel: 'Degree',
//     studentCampus: 'Solomon',
//     examSite: 'Solomon Campus',
//     majorType: 'Double Major',
//     major1: 'ED',
//     major2: '',
//   },
// ];

// // StudentRecords Component
// const StudentRecords = () => {
//   const [page, setPage] = useState(1);
//   const studentsPerPage = 5;
//   const totalPages = Math.ceil(students.length / studentsPerPage);

//   // Handle page change
//   const handlePageChange = (event, value) => {
//     setPage(value);
//   };

//   // Calculate students to display on current page
//   const startIndex = (page - 1) * studentsPerPage;
//   const currentStudents = students.slice(startIndex, startIndex + studentsPerPage);

//   return (
//     <DashboardLayout>
//       <Container maxWidth="lg">
//         <Grid container spacing={3}>
//           <Grid item xs={12}>
//             <TitleBar title="Student Records" />
//           </Grid>
//           <Grid item xs={12}>
//             <StyledPaper>
//               <Typography
//                 variant="h5"
//                 gutterBottom
//                 sx={{ color: '#094C50', fontWeight: 600, mb: 3 }}
//               >
//                 All Students ({students.length})
//               </Typography>
//               <StyledTableContainer>
//                 <Table>
//                   <TableHead>
//                     <TableRow>
//                       <StyledTableCell>Avatar</StyledTableCell>
//                       <StyledTableCell>First Name</StyledTableCell>
//                       <StyledTableCell>Middle Name</StyledTableCell>
//                       <StyledTableCell>Last Name</StyledTableCell>
//                       <StyledTableCell>Student ID</StyledTableCell>
//                       <StyledTableCell>DOB</StyledTableCell>
//                       <StyledTableCell>Email</StyledTableCell>
//                       <StyledTableCell>Phone</StyledTableCell>
//                       <StyledTableCell>Gender</StyledTableCell>
//                       <StyledTableCell>Citizenship</StyledTableCell>
//                       <StyledTableCell>Program</StyledTableCell>
//                       <StyledTableCell>Level</StyledTableCell>
//                       <StyledTableCell>Campus</StyledTableCell>
//                       <StyledTableCell>Exam Site</StyledTableCell>
//                       <StyledTableCell>Major Type</StyledTableCell>
//                       <StyledTableCell>Major 1</StyledTableCell>
//                       <StyledTableCell>Major 2</StyledTableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {currentStudents.map((student) => (
//                       <TableRow key={student.studentId}>
//                         <TableCell>
//                           <StyledAvatar src={student.avatar} alt={`${student.firstName} ${student.lastName}`} />
//                         </TableCell>
//                         <TableCell>{student.firstName}</TableCell>
//                         <TableCell>{student.middleName || '-'}</TableCell>
//                         <TableCell>{student.lastName}</TableCell>
//                         <TableCell>{student.studentId}</TableCell>
//                         <TableCell>{student.dob}</TableCell>
//                         <TableCell>{student.email}</TableCell>
//                         <TableCell>{student.phone}</TableCell>
//                         <TableCell>{student.gender}</TableCell>
//                         <TableCell>{student.citizenship}</TableCell>
//                         <TableCell>{student.program}</TableCell>
//                         <TableCell>{student.studentLevel}</TableCell>
//                         <TableCell>{student.studentCampus}</TableCell>
//                         <TableCell>{student.examSite}</TableCell>
//                         <TableCell>{student.majorType}</TableCell>
//                         <TableCell>{student.major1}</TableCell>
//                         <TableCell>{student.major2 || '-'}</TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </StyledTableContainer>
//               {students.length > studentsPerPage && (
//                 <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
//                   <Pagination
//                     count={totalPages}
//                     page={page}
//                     onChange={handlePageChange}
//                     color="primary"
//                     sx={{ '& .MuiPaginationItem-root': { borderRadius: '8px' } }}
//                   />
//                 </Box>
//               )}
//             </StyledPaper>
//           </Grid>
//         </Grid>
//       </Container>
//     </DashboardLayout>
//   );
// };

// export default StudentRecords;

import React, { useState, useEffect } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Grid,
  Pagination,
  Avatar,
  Container,
  CircularProgress,
  Alert,
} from '@mui/material';
import { styled } from '@mui/system';
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
import TitleBar from '../../components/Titlebar/Titlebar';
import { getAllStudents } from '../../Endpoints/AdminEndpoints';

// Custom styles
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '12px',
  backgroundColor: '#fff',
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  width: '100%',
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: '12px',
  backgroundColor: '#f9f9f9',
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 500,
  color: '#094C50',
  borderBottom: '1px solid #e0e0e0',
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 40,
  height: 40,
  border: '2px solid #fff',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
}));

// StudentRecords Component
const StudentRecords = () => {
  const [page, setPage] = useState(1);
  const [students, setStudents] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const studentsPerPage = 5;

  // Fetch students on mount and page change
  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await getAllStudents(page, studentsPerPage);
        setStudents(response.data.students || []);
        setTotalStudents(response.data.totalCount || 0);
      } catch (err) {
        console.error('Error fetching students:', err);
        //setError(err.response?.data?.message || 'Failed to load student records.');
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, [page]);

  // Handle page change
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Calculate total pages
  const totalPages = Math.ceil(totalStudents / studentsPerPage);

  // Loading State
  if (loading) {
    return (
      <DashboardLayout>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress />
          </Box>
        </Container>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TitleBar title="Student Records" />
          </Grid>
          <Grid item xs={12}>
            {error && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: '12px' }} onClose={() => setError('')}>
                {error}
              </Alert>
            )}
            <StyledPaper>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ color: '#094C50', fontWeight: 600, mb: 3 }}
              >
                All Students ({totalStudents})
              </Typography>
              <StyledTableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Avatar</StyledTableCell>
                      <StyledTableCell>First Name</StyledTableCell>
                      <StyledTableCell>Middle Name</StyledTableCell>
                      <StyledTableCell>Last Name</StyledTableCell>
                      <StyledTableCell>Student ID</StyledTableCell>
                      <StyledTableCell>DOB</StyledTableCell>
                      <StyledTableCell>Email</StyledTableCell>
                      <StyledTableCell>Phone</StyledTableCell>
                      <StyledTableCell>Gender</StyledTableCell>
                      <StyledTableCell>Citizenship</StyledTableCell>
                      <StyledTableCell>Program</StyledTableCell>
                      <StyledTableCell>Level</StyledTableCell>
                      <StyledTableCell>Campus</StyledTableCell>
                      <StyledTableCell>Exam Site</StyledTableCell>
                      <StyledTableCell>Major Type</StyledTableCell>
                      <StyledTableCell>Major 1</StyledTableCell>
                      <StyledTableCell>Major 2</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {students.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={17} align="center">
                          No student records found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      students.map((student) => (
                        <TableRow key={student.studentId}>
                          <TableCell>
                            <StyledAvatar src={student.avatar || 'https://via.placeholder.com/150'} alt={`${student.firstName} ${student.lastName}`} />
                          </TableCell>
                          <TableCell>{student.firstName}</TableCell>
                          <TableCell>{student.middleName || '-'}</TableCell>
                          <TableCell>{student.lastName}</TableCell>
                          <TableCell>{student.studentId}</TableCell>
                          <TableCell>{student.dob}</TableCell>
                          <TableCell>{student.email}</TableCell>
                          <TableCell>{student.phone}</TableCell>
                          <TableCell>{student.gender}</TableCell>
                          <TableCell>{student.citizenship}</TableCell>
                          <TableCell>{student.program}</TableCell>
                          <TableCell>{student.studentLevel}</TableCell>
                          <TableCell>{student.studentCampus}</TableCell>
                          <TableCell>{student.examSite}</TableCell>
                          <TableCell>{student.majorType}</TableCell>
                          <TableCell>{student.major1}</TableCell>
                          <TableCell>{student.major2 || '-'}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </StyledTableContainer>
              {totalStudents > studentsPerPage && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    sx={{ '& .MuiPaginationItem-root': { borderRadius: '8px' } }}
                  />
                </Box>
              )}
            </StyledPaper>
          </Grid>
        </Grid>
      </Container>
    </DashboardLayout>
  );
};

export default StudentRecords;