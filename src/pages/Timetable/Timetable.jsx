import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  Chip,
  Alert,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Pagination,
} from '@mui/material';
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
import TitleBar from '../../components/Titlebar/Titlebar';

// Mock timetable data
const mockTimetable = [
  // MA161
  {
    enrollmentId: 'E001',
    courseCode: 'MA161',
    courseName: 'Discrete Mathematics',
    schedule: '09:00-10:00',
    venue: 'Room A101',
    date: '2025-03-03',
    day: 'Monday',
    course: 'MA161',
    activity: 'Lecture',
  },
  {
    enrollmentId: 'E002',
    courseCode: 'MA161',
    courseName: 'Discrete Mathematics',
    schedule: '10:00-12:00',
    venue: 'Room B202',
    date: '2025-03-05',
    day: 'Wednesday',
    course: 'MA161',
    activity: 'Lab',
  },
  {
    enrollmentId: 'E003',
    courseCode: 'MA161',
    courseName: 'Discrete Mathematics',
    schedule: '13:00-15:00',
    venue: 'Room C303',
    date: '2025-03-06',
    day: 'Thursday',
    course: 'MA161',
    activity: 'Tutorial',
  },
  // CS112
  {
    enrollmentId: 'E004',
    courseCode: 'CS112',
    courseName: 'Data Structures and Algorithms',
    schedule: '09:00-10:00',
    venue: 'Room A101',
    date: '2025-03-04',
    day: 'Tuesday',
    course: 'CS112',
    activity: 'Lecture',
  },
  {
    enrollmentId: 'E005',
    courseCode: 'CS112',
    courseName: 'Data Structures and Algorithms',
    schedule: '10:00-12:00',
    venue: 'Room B202',
    date: '2025-03-06',
    day: 'Thursday',
    course: 'CS112',
    activity: 'Lab',
  },
  {
    enrollmentId: 'E006',
    courseCode: 'CS112',
    courseName: 'Data Structures and Algorithms',
    schedule: '13:00-15:00',
    venue: 'Room C303',
    date: '2025-03-07',
    day: 'Friday',
    course: 'CS112',
    activity: 'Tutorial',
  },
  // MG101
  {
    enrollmentId: 'E007',
    courseCode: 'MG101',
    courseName: 'Introduction to Management',
    schedule: '11:00-12:00',
    venue: 'Room A101',
    date: '2025-03-03',
    day: 'Monday',
    course: 'MG101',
    activity: 'Lecture',
  },
  {
    enrollmentId: 'E008',
    courseCode: 'MG101',
    courseName: 'Introduction to Management',
    schedule: '13:00-15:00',
    venue: 'Room B202',
    date: '2025-03-05',
    day: 'Wednesday',
    course: 'MG101',
    activity: 'Lab',
  },
  {
    enrollmentId: 'E009',
    courseCode: 'MG101',
    courseName: 'Introduction to Management',
    schedule: '15:00-17:00',
    venue: 'Room C303',
    date: '2025-03-06',
    day: 'Thursday',
    course: 'MG101',
    activity: 'Tutorial',
  },
  // PH101
  {
    enrollmentId: 'E010',
    courseCode: 'PH101',
    courseName: 'Physics I',
    schedule: '11:00-12:00',
    venue: 'Room A101',
    date: '2025-03-04',
    day: 'Tuesday',
    course: 'PH101',
    activity: 'Lecture',
  },
  {
    enrollmentId: 'E011',
    courseCode: 'PH101',
    courseName: 'Physics I',
    schedule: '10:00-12:00',
    venue: 'Room B202',
    date: '2025-03-07',
    day: 'Friday',
    course: 'PH101',
    activity: 'Lab',
  },
  {
    enrollmentId: 'E012',
    courseCode: 'PH101',
    courseName: 'Physics I',
    schedule: '13:00-15:00',
    venue: 'Room C303',
    date: '2025-03-03',
    day: 'Monday',
    course: 'PH101',
    activity: 'Tutorial',
  },
];

// Mock API function
const getTimetable = async () =>
  new Promise((resolve) => setTimeout(() => resolve(mockTimetable), 500));

// Error Boundary Component
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" color="error">
            Something went wrong. Please try again later.
          </Typography>
        </Box>
      );
    }
    return this.props.children;
  }
}

// Timetable Component
const Timetable = () => {
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newClass, setNewClass] = useState({
    startTime: '',
    endTime: '',
    venue: '',
    date: '',
    day: '',
    course: '',
    activity: '',
  });
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch timetable data
  useEffect(() => {
    const fetchTimetable = async () => {
      setLoading(true);
      try {
        const data = await getTimetable();
        setTimetable(data);
      } catch (error) {
        setError('Failed to load timetable.');
        console.error('Error fetching timetable:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTimetable();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClass((prev) => ({ ...prev, [name]: value }));
  };

  // Handle adding a new class
  const handleAddClass = () => {
    if (
      !newClass.startTime ||
      !newClass.endTime ||
      !newClass.venue ||
      !newClass.date ||
      !newClass.day ||
      !newClass.course ||
      !newClass.activity
    ) {
      setError('All fields are required.');
      return;
    }

    // Validate time format (HH:MM)
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(newClass.startTime) || !timeRegex.test(newClass.endTime)) {
      setError('Invalid time format. Use HH:MM (e.g., 09:00).');
      return;
    }

    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(newClass.date)) {
      setError('Invalid date format. Use YYYY-MM-DD (e.g., 2025-03-03).');
      return;
    }

    // Validate course
    const courseNames = {
      MA161: 'Discrete Mathematics',
      CS112: 'Data Structures and Algorithms',
      MG101: 'Introduction to Management',
      PH101: 'Physics I',
    };
    if (!courseNames[newClass.course]) {
      setError('Invalid course selected.');
      return;
    }

    // Generate unique enrollmentId
    const newId = `E${(timetable.length + 1).toString().padStart(3, '0')}`;
    const newEntry = {
      enrollmentId: newId,
      courseCode: newClass.course,
      courseName: courseNames[newClass.course],
      schedule: `${newClass.startTime}-${newClass.endTime}`,
      venue: newClass.venue,
      date: newClass.date,
      day: newClass.day,
      course: newClass.course,
      activity: newClass.activity,
    };

    setTimetable((prev) => [...prev, newEntry]);
    setNewClass({
      startTime: '',
      endTime: '',
      venue: '',
      date: '',
      day: '',
      course: '',
      activity: '',
    });
    setError('');
  };

  // Group timetable by course
  const groupedTimetable = timetable.reduce((acc, entry) => {
    if (!acc[entry.course]) {
      acc[entry.course] = [];
    }
    acc[entry.course].push(entry);
    return acc;
  }, {});

  // Get unique courses for pagination
  const courses = Object.keys(groupedTimetable);
  const coursesPerPage = 1;
  const totalPages = courses.length > 0 ? Math.ceil(courses.length / coursesPerPage) : 1;
  const currentCourse = courses[(currentPage - 1) * coursesPerPage] || '';

  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Loading State
  if (loading) {
    return (
      <DashboardLayout>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" color="text.secondary">
            Loading Timetable...
          </Typography>
        </Box>
      </DashboardLayout>
    );
  }

  return (
    <ErrorBoundary>
      <DashboardLayout>
        <Grid container spacing={3} sx={{ background: 'linear-gradient(180deg, #f5f5f5 0%, #e0f7fa 100%)', p: 4, minHeight: '100vh' }}>
          <Grid item xs={12}>
            <TitleBar title="TIMETABLE FOR SEMESTER 1 2025" />
          </Grid>

          {/* Error Display */}
          {error && (
            <Grid item xs={12}>
              <Alert severity="error" sx={{ mb: 3, borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} onClose={() => setError('')}>
                {error}
              </Alert>
            </Grid>
          )}

          {/* Add New Class Form */}
          <Grid item xs={12}>
            <Card elevation={4} sx={{ borderRadius: '16px', backgroundColor: '#ffffff', overflow: 'hidden' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom sx={{ color: '#094c50', fontWeight: 600 }}>
                  Add New Class
                </Typography>
                <Divider sx={{ mb: 3, borderColor: '#e0e0e0' }} />
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      label="Start Time (HH:MM)"
                      name="startTime"
                      value={newClass.startTime}
                      onChange={handleInputChange}
                      fullWidth
                      size="small"
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      label="End Time (HH:MM)"
                      name="endTime"
                      value={newClass.endTime}
                      onChange={handleInputChange}
                      fullWidth
                      size="small"
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      label="Venue"
                      name="venue"
                      value={newClass.venue}
                      onChange={handleInputChange}
                      fullWidth
                      size="small"
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      label="Date (YYYY-MM-DD)"
                      name="date"
                      value={newClass.date}
                      onChange={handleInputChange}
                      fullWidth
                      size="small"
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Day</InputLabel>
                      <Select
                        name="day"
                        value={newClass.day}
                        onChange={handleInputChange}
                        label="Day"
                        sx={{ borderRadius: '8px' }}
                      >
                        <MenuItem value="Monday">Monday</MenuItem>
                        <MenuItem value="Tuesday">Tuesday</MenuItem>
                        <MenuItem value="Wednesday">Wednesday</MenuItem>
                        <MenuItem value="Thursday">Thursday</MenuItem>
                        <MenuItem value="Friday">Friday</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Course</InputLabel>
                      <Select
                        name="course"
                        value={newClass.course}
                        onChange={handleInputChange}
                        label="Course"
                        sx={{ borderRadius: '8px' }}
                      >
                        <MenuItem value="MA161">MA161 - Discrete Mathematics</MenuItem>
                        <MenuItem value="CS112">CS112 - Data Structures and Algorithms</MenuItem>
                        <MenuItem value="MG101">MG101 - Introduction to Management</MenuItem>
                        <MenuItem value="PH101">PH101 - Physics I</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Activity</InputLabel>
                      <Select
                        name="activity"
                        value={newClass.activity}
                        onChange={handleInputChange}
                        label="Activity"
                        sx={{ borderRadius: '8px' }}
                      >
                        <MenuItem value="Lecture">Lecture</MenuItem>
                        <MenuItem value="Lab">Lab</MenuItem>
                        <MenuItem value="Tutorial">Tutorial</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{ mt: 1, borderRadius: '8px', bgcolor: '#2596be', '&:hover': { bgcolor: '#1a6d8c' } }}
                      onClick={handleAddClass}
                    >
                      Add Class
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Timetable Entries */}
          <Grid item xs={12}>
            <Card elevation={4} sx={{ borderRadius: '16px', backgroundColor: '#ffffff', overflow: 'hidden', mt: 4 }}>
              <CardContent sx={{ p: 4 }}>
                {timetable.length > 0 && currentCourse && groupedTimetable[currentCourse] ? (
                  <Box>
                    <Typography variant="h5" gutterBottom sx={{ color: '#094c50', fontWeight: 600, mb: 2 }}>
                      Scheduled Courses
                      <Chip
                        label={`${groupedTimetable[currentCourse].length} Classes`}
                        size="small"
                        color="primary"
                        sx={{ ml: 2, fontWeight: 500, bgcolor: '#2596be', color: '#fff' }}
                      />
                    </Typography>
                    <Divider sx={{ mb: 3, borderColor: '#e0e0e0' }} />
                    <Grid container spacing={3}>
                      {groupedTimetable[currentCourse].map((entry) => (
                        <Grid item xs={12} sm={6} md={4} key={entry.enrollmentId}>
                          <Box
                            sx={{
                              p: 3,
                              border: '1px solid #e0e0e0',
                              borderRadius: '12px',
                              backgroundColor: '#ffffff',
                              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                              transition: 'all 0.3s ease-in-out',
                              '&:hover': {
                                transform: 'translateY(-6px)',
                                boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                              },
                            }}
                          >
                            <Grid container spacing={2}>
                              <Grid item xs={6}>
                                <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 500, mb: 1 }}>
                                  Course
                                </Typography>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#094c50', mb: 2 }}>
                                  {entry.course} - {entry.courseName}
                                </Typography>
                                <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 500, mb: 1 }}>
                                  Activity
                                </Typography>
                                <Chip
                                  label={entry.activity}
                                  size="small"
                                  sx={{
                                    fontWeight: 500,
                                    bgcolor:
                                      entry.activity === 'Lecture' ? '#4caf50' :
                                      entry.activity === 'Lab' ? '#2196f3' :
                                      '#ff9800',
                                    color: '#ffffff',
                                    borderRadius: '8px',
                                  }}
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 500, mb: 1 }}>
                                  Schedule
                                </Typography>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#388e3c', mb: 2 }}>
                                  {entry.schedule}
                                </Typography>
                                <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 500, mb: 1 }}>
                                  Day
                                </Typography>
                                <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 2 }}>
                                  {entry.day}
                                </Typography>
                                <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 500, mb: 1 }}>
                                  Date
                                </Typography>
                                <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 2 }}>
                                  {entry.date}
                                </Typography>
                                <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 500, mb: 1 }}>
                                  Venue
                                </Typography>
                                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                                  {entry.venue}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                    {courses.length > 1 && (
                      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <Pagination
                          count={totalPages}
                          page={currentPage}
                          onChange={handlePageChange}
                          color="primary"
                          sx={{ '& .MuiPaginationItem-root': { borderRadius: '8px' } }}
                        />
                      </Box>
                    )}
                  </Box>
                ) : (
                  <Card elevation={3} sx={{ borderRadius: '12px', mt: 3, backgroundColor: '#ffffff' }}>
                    <CardContent sx={{ p: 4, textAlign: 'center' }}>
                      <Typography variant="h6" color="text.secondary">
                        No classes scheduled for this semester.
                      </Typography>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </DashboardLayout>
    </ErrorBoundary>
  );
};

export default Timetable;