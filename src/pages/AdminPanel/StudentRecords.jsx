import React, { useState } from 'react';
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
} from '@mui/material';
import { styled } from '@mui/system';
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
import TitleBar from '../../components/Titlebar/Titlebar';

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

// Dummy student data
const students = [
  {
    firstName: 'Amita',
    middleName: 'Lata',
    lastName: 'Naidu',
    studentId: 'S12345678',
    dob: '2002-03-12',
    email: 'amita.naidu@usp.ac.fj',
    phone: '+679-123-4567',
    avatar: 'https://via.placeholder.com/150',
    gender: 'Female',
    citizenship: 'Fiji',
    program: 'Bachelor of Science',
    studentLevel: 'Sophomore',
    studentCampus: 'Laucala Campus',
    examSite: 'Laucala Testing Center',
    majorType: 'Single',
    major1: 'Computer Science',
    major2: '',
  },
  {
    firstName: 'Viliame',
    middleName: '',
    lastName: 'Tui',
    studentId: 'S12345679',
    dob: '2001-07-25',
    email: 'viliame.tui@usp.ac.fj',
    phone: '+679-234-5678',
    avatar: 'https://via.placeholder.com/150',
    gender: 'Male',
    citizenship: 'Fiji',
    program: 'Bachelor of Arts',
    studentLevel: 'Junior',
    studentCampus: 'Laucala Campus',
    examSite: 'Laucala Testing Center',
    majorType: 'Double',
    major1: 'Economics',
    major2: 'Political Science',
  },
  {
    firstName: 'Sereana',
    middleName: 'Adi',
    lastName: 'Vatu',
    studentId: 'S12345680',
    dob: '2003-11-05',
    email: 'sereana.vatu@usp.ac.fj',
    phone: '+679-345-6789',
    avatar: 'https://via.placeholder.com/150',
    gender: 'Female',
    citizenship: 'Fiji',
    program: 'Bachelor of Science',
    studentLevel: 'Freshman',
    studentCampus: 'Labasa Campus',
    examSite: 'Labasa Testing Center',
    majorType: 'Single',
    major1: 'Biology',
    major2: '',
  },
  {
    firstName: 'Jone',
    middleName: 'Ratu',
    lastName: 'Lewa',
    studentId: 'S12345681',
    dob: '2000-09-15',
    email: 'jone.lewa@usp.ac.fj',
    phone: '+679-456-7890',
    avatar: 'https://via.placeholder.com/150',
    gender: 'Male',
    citizenship: 'Fiji',
    program: 'Bachelor of Commerce',
    studentLevel: 'Senior',
    studentCampus: 'Laucala Campus',
    examSite: 'Laucala Testing Center',
    majorType: 'Single',
    major1: 'Accounting',
    major2: '',
  },
  {
    firstName: 'Litia',
    middleName: '',
    lastName: 'Qalo',
    studentId: 'S12345682',
    dob: '2002-04-20',
    email: 'litia.qalo@usp.ac.fj',
    phone: '+679-567-8901',
    avatar: 'https://via.placeholder.com/150',
    gender: 'Female',
    citizenship: 'Fiji',
    program: 'Bachelor of Education',
    studentLevel: 'Junior',
    studentCampus: 'Laucala Campus',
    examSite: 'Laucala Testing Center',
    majorType: 'Single',
    major1: 'Education',
    major2: '',
  },
  {
    firstName: 'Tomasi',
    middleName: 'Vili',
    lastName: 'Rai',
    studentId: 'S12345683',
    dob: '2001-12-30',
    email: 'tomasi.rai@usp.ac.fj',
    phone: '+679-678-9012',
    avatar: 'https://via.placeholder.com/150',
    gender: 'Male',
    citizenship: 'Fiji',
    program: 'Bachelor of Science',
    studentLevel: 'Sophomore',
    studentCampus: 'Labasa Campus',
    examSite: 'Labasa Testing Center',
    majorType: 'Double',
    major1: 'Mathematics',
    major2: 'Physics',
  },
  {
    firstName: 'Ana',
    middleName: 'Mere',
    lastName: 'Soro',
    studentId: 'S12345684',
    dob: '2003-06-10',
    email: 'ana.soro@usp.ac.fj',
    phone: '+679-789-0123',
    avatar: 'https://via.placeholder.com/150',
    gender: 'Female',
    citizenship: 'Fiji',
    program: 'Bachelor of Arts',
    studentLevel: 'Freshman',
    studentCampus: 'Laucala Campus',
    examSite: 'Laucala Testing Center',
    majorType: 'Single',
    major1: 'Geography',
    major2: '',
  },
  {
    firstName: 'Epeli',
    middleName: '',
    lastName: 'Nau',
    studentId: 'S12345685',
    dob: '2000-08-22',
    email: 'epeli.nau@usp.ac.fj',
    phone: '+679-890-1234',
    avatar: 'https://via.placeholder.com/150',
    gender: 'Male',
    citizenship: 'Fiji',
    program: 'Bachelor of Commerce',
    studentLevel: 'Senior',
    studentCampus: 'Laucala Campus',
    examSite: 'Laucala Testing Center',
    majorType: 'Single',
    major1: 'Management',
    major2: '',
  },
  {
    firstName: 'Salote',
    middleName: 'Wati',
    lastName: 'Vuki',
    studentId: 'S12345686',
    dob: '2002-01-18',
    email: 'salote.vuki@usp.ac.fj',
    phone: '+679-901-2345',
    avatar: 'https://via.placeholder.com/150',
    gender: 'Female',
    citizenship: 'Fiji',
    program: 'Bachelor of Science',
    studentLevel: 'Junior',
    studentCampus: 'Laucala Campus',
    examSite: 'Laucala Testing Center',
    majorType: 'Single',
    major1: 'Chemistry',
    major2: '',
  },
  {
    firstName: 'Mosese',
    middleName: 'Jone',
    lastName: 'Bale',
    studentId: 'S12345687',
    dob: '2001-10-03',
    email: 'mosese.bale@usp.ac.fj',
    phone: '+679-012-3456',
    avatar: 'https://via.placeholder.com/150',
    gender: 'Male',
    citizenship: 'Fiji',
    program: 'Bachelor of Arts',
    studentLevel: 'Sophomore',
    studentCampus: 'Labasa Campus',
    examSite: 'Labasa Testing Center',
    majorType: 'Double',
    major1: 'History',
    major2: 'Sociology',
  },
];

// StudentRecords Component
const StudentRecords = () => {
  const [page, setPage] = useState(1);
  const studentsPerPage = 5;
  const totalPages = Math.ceil(students.length / studentsPerPage);

  // Handle page change
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Calculate students to display on current page
  const startIndex = (page - 1) * studentsPerPage;
  const currentStudents = students.slice(startIndex, startIndex + studentsPerPage);

  return (
    <DashboardLayout>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TitleBar title="Student Records" />
          </Grid>
          <Grid item xs={12}>
            <StyledPaper>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ color: '#094C50', fontWeight: 600, mb: 3 }}
              >
                All Students ({students.length})
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
                    {currentStudents.map((student) => (
                      <TableRow key={student.studentId}>
                        <TableCell>
                          <StyledAvatar src={student.avatar} alt={`${student.firstName} ${student.lastName}`} />
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
                    ))}
                  </TableBody>
                </Table>
              </StyledTableContainer>
              {students.length > studentsPerPage && (
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