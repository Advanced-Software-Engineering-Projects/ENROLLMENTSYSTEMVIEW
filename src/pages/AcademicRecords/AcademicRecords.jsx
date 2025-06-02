import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography, List, ListItem, ListItemText } from '@mui/material';
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";

// Mock data for academic records
const mockAcademicRecords = {
  enrollments: [
    {
      enrollmentId: 1,
      courseCode: 'CS101',
      courseName: 'Introduction to Computer Science',
      semester: 'Fall 2023',
      grade: 'A',
    },
    {
      enrollmentId: 2,
      courseCode: 'MATH101',
      courseName: 'Calculus I',
      semester: 'Fall 2023',
      grade: 'B+',
    },
    {
      enrollmentId: 3,
      courseCode: 'CS102',
      courseName: 'Data Structures',
      semester: 'Spring 2024',
      grade: 'A-',
    },
    {
      enrollmentId: 4,
      courseCode: 'PHYS101',
      courseName: 'Physics I',
      semester: 'Spring 2024',
      grade: null, // Simulating an ungraded course
    },
  ],
  gpa: 3.75,
};

const AcademicRecords = () => {
  const [records, setRecords] = useState({ enrollments: [], gpa: 0 });

  useEffect(() => {
    // Simulate fetching records with a slight delay for realism
    const timer = setTimeout(() => {
      setRecords(mockAcademicRecords);
    }, 500); // 0.5-second delay
    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, []);

  return (
    <DashboardLayout>
      <Box sx={{ p: 3 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Academic Records
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>GPA:</strong> {records.gpa.toFixed(2)}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Enrollments
          </Typography>
          {records.enrollments.length === 0 ? (
            <Typography>No records available.</Typography>
          ) : (
            <List>
              {records.enrollments.map((enrollment) => (
                <ListItem key={enrollment.enrollmentId}>
                  <ListItemText
                    primary={`${enrollment.courseCode} - ${enrollment.courseName}`}
                    secondary={
                      <>
                        <Typography component="span" variant="body2">
                          Semester: {enrollment.semester}
                        </Typography>
                        <br />
                        <Typography component="span" variant="body2">
                          Grade: {enrollment.grade || 'Not graded'}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Paper>
      </Box>
    </DashboardLayout>
  );
};

export default AcademicRecords;