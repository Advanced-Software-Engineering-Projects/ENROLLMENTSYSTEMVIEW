import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Box,
  Button,
  List,
  TextField,
  InputAdornment,
  TablePagination,
  useTheme,
  Alert,
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from '@mui/lab';

// Mock data for academic plan
const mockAcademicPlan = [
  {
    semester: 1,
    courses: [
      { code: 'CS101', name: 'Introduction to Computer Science' },
      { code: 'MATH101', name: 'Calculus I' },
      { code: 'ENG101', name: 'English Composition' },
    ],
  },
  {
    semester: 2,
    courses: [
      { code: 'CS102', name: 'Data Structures' },
      { code: 'MATH102', name: 'Calculus II' },
      { code: 'PHYS101', name: 'Physics I' },
    ],
  },
  {
    semester: 3,
    courses: [
      { code: 'CS201', name: 'Algorithms' },
      { code: 'CS202', name: 'Database Systems' },
    ],
  },
];

const AcademicPlan = () => {
  const [plan, setPlan] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    // Simulate a delay to mimic API call
    setTimeout(() => {
      setPlan(mockAcademicPlan);
      setMessage('Academic plan generated successfully');
      setLoading(false);
    }, 1000); // 1-second delay for realism
  };

  return (
    <DashboardLayout>
      <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
        <Typography variant="h4" gutterBottom>Academic Plan</Typography>
        <Button
          variant="contained"
          onClick={handleGenerate}
          sx={{ mb: 3 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} sx={{ mr: 1 }} /> : null}
          Generate Academic Plan
        </Button>
        {message && (
          <Alert
            severity={message.includes('Error') ? 'error' : 'success'}
            sx={{ mb: 2 }}
            onClose={() => setMessage('')}
          >
            {message}
          </Alert>
        )}
        {plan.length > 0 ? (
          <Timeline position="alternate">
            {plan.map((semester, index) => (
              <TimelineItem key={index}>
                <TimelineSeparator>
                  <TimelineDot color="primary" />
                  {index < plan.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <Typography variant="h6">Semester {semester.semester}</Typography>
                  {semester.courses && semester.courses.length > 0 ? (
                    semester.courses.map((course) => (
                      <Typography key={course.code}>
                        {course.code} - {course.name}
                      </Typography>
                    ))
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No courses available for this semester
                    </Typography>
                  )}
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        ) : (
          <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', mt: 2 }}>
            No academic plan available. Click "Generate Academic Plan" to create one.
          </Typography>
        )}
      </Box>
    </DashboardLayout>
  );
};

export default AcademicPlan;