import React, { useState } from 'react';
import { Box, Typography, Button, Alert, Grid, Select, MenuItem, Checkbox, ListItemText, Paper } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
import TitleBar from '../../components/Titlebar/Titlebar';
import dayjs from 'dayjs';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';

const courses = [
  { program: 'BNS', year: 1, code: 'CS111', name: 'Introduction to Computing Science' },
  { program: 'BNS', year: 1, code: 'CS112', name: 'Data Structures & Algorithms' },
  { program: 'BNS', year: 1, code: 'CS150', name: 'Introduction to Computer Networks & Security' },
  { program: 'BNS', year: 1, code: 'MA111', name: 'Mathematics' },
  { program: 'BNS', year: 1, code: 'MA161', name: 'Discrete Mathematics' },
  { program: 'BNS', year: 1, code: 'MG101', name: 'Introduction to Management' },
  { program: 'BNS', year: 1, code: 'ST131', name: 'Statistics' },
  { program: 'BNS', year: 1, code: 'UU100A', name: 'Information Literacy' },
  { program: 'BNS', year: 1, code: 'UU114', name: 'English for Academic Purposes' },
  { program: 'BNS', year: 2, code: 'CS211', name: 'Computer Organisation' },
  { program: 'BNS', year: 2, code: 'CS214', name: 'Design & Analysis of Algorithms' },
  { program: 'BNS', year: 2, code: 'CS215', name: 'Computer Communications & Management' },
  { program: 'BNS', year: 2, code: 'CS218', name: 'Mobile Computing' },
  { program: 'BNS', year: 2, code: 'CS219', name: 'Cloud Computing' },
  { program: 'BNS', year: 2, code: 'IS221', name: 'Information Systems I' },
  { program: 'BNS', year: 2, code: 'IS222', name: 'Information Systems II' },
  { program: 'BNS', year: 2, code: 'UU200', name: 'Ethics & Governance' },
  { program: 'BNS', year: 2, code: 'CS001', name: 'Foundations of Professional Practice' },
  { program: 'BNS', year: 3, code: 'CS310', name: 'Computer Networks' },
  { program: 'BNS', year: 3, code: 'CS311', name: 'Operating Systems' },
  { program: 'BNS', year: 3, code: 'CS317', name: 'Computer & Network Security' },
  { program: 'BNS', year: 3, code: 'CS324', name: 'Distributed Computing' },
  { program: 'BNS', year: 3, code: 'CS350', name: 'Wireless Networks' },
  { program: 'BNS', year: 3, code: 'CS351', name: 'Network Design & Administration' },
  { program: 'BNS', year: 3, code: 'CS352', name: 'IT Infrastructure & Security' },
  { program: 'BNS', year: 3, code: 'IS333', name: 'Project Management' },
  { program: 'BNS', year: 4, code: 'CS403', name: 'Cybercrime & Digital Forensics' },
  { program: 'BNS', year: 4, code: 'CS412', name: 'Advanced Networks' },
  { program: 'BNS', year: 4, code: 'CS424', name: 'Network Security & Forensics' },
  { program: 'BNS', year: 4, code: 'CS400', name: 'Industry Experience Project (IEP)' },
  { program: 'BSE', year: 1, code: 'CS111', name: 'Introduction to Computing Science' },
  { program: 'BSE', year: 1, code: 'CS112', name: 'Data Structures & Algorithms' },
  { program: 'BSE', year: 1, code: 'CS140', name: 'Introduction to Software Engineering' },
  { program: 'BSE', year: 1, code: 'MA111', name: 'Mathematics' },
  { program: 'BSE', year: 1, code: 'MA161', name: 'Discrete Mathematics' },
  { program: 'BSE', year: 1, code: 'MG101', name: 'Introduction to Management' },
  { program: 'BSE', year: 1, code: 'ST131', name: 'Statistics' },
  { program: 'BSE', year: 1, code: 'UU100A', name: 'Information Literacy' },
  { program: 'BSE', year: 1, code: 'UU114', name: 'English for Academic Purposes' },
  { program: 'BSE', year: 2, code: 'CS211', name: 'Computer Organisation' },
  { program: 'BSE', year: 2, code: 'CS214', name: 'Design & Analysis of Algorithms' },
  { program: 'BSE', year: 2, code: 'CS218', name: 'Mobile Computing' },
  { program: 'BSE', year: 2, code: 'CS219', name: 'Cloud Computing' },
  { program: 'BSE', year: 2, code: 'CS230', name: 'Requirements Engineering' },
  { program: 'BSE', year: 2, code: 'CS241', name: 'Software Design & Implementation' },
  { program: 'BSE', year: 2, code: 'IS221', name: 'Information Systems I' },
  { program: 'BSE', year: 2, code: 'IS222', name: 'Information Systems II' },
  { program: 'BSE', year: 2, code: 'UU200', name: 'Ethics & Governance' },
  { program: 'BSE', year: 2, code: 'CS001', name: 'Foundations of Professional Practice' },
  { program: 'BSE', year: 3, code: 'CS310', name: 'Computer Networks' },
  { program: 'BSE', year: 3, code: 'CS311', name: 'Operating Systems' },
  { program: 'BSE', year: 3, code: 'CS324', name: 'Distributed Computing' },
  { program: 'BSE', year: 3, code: 'CS341', name: 'Software Quality Assurance & Testing' },
  { program: 'BSE', year: 3, code: 'CS352', name: 'IT Infrastructure & Security' },
  { program: 'BSE', year: 3, code: 'IS314', name: 'Business Process Analysis' },
  { program: 'BSE', year: 3, code: 'IS328', name: 'Software Project Management' },
  { program: 'BSE', year: 3, code: 'IS333', name: 'Project Management' },
  { program: 'BSE', year: 4, code: 'CS415', name: 'Software Engineering Project' },
  { program: 'BSE', year: 4, code: 'CS403', name: 'Cybercrime & Digital Forensics' },
  { program: 'BSE', year: 4, code: 'CS412', name: 'Advanced Networks' },
  { program: 'BSE', year: 4, code: 'CS424', name: 'Network Security & Forensics' },
  { program: 'BSE', year: 4, code: 'CS400', name: 'Industry Experience Project (IEP)' },
];

const AdminPanel = () => {
  const [dates, setDates] = useState({ startDate: '', startTime: '', endDate: '', endTime: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);

  const handleOpen = () => {
    setLoading(true);
    setTimeout(() => {
      if (dates.startDate && dates.endDate && dates.startTime && dates.endTime && selectedCourses.length > 0) {
        setMessage(
          `Registration period opened successfully for ${selectedCourses.join(', ')} from ${dates.startDate} ${dates.startTime} to ${dates.endDate} ${dates.endTime}`
        );
      } else {
        setMessage('Error: Please provide both dates, times, and select at least one course');
      }
      setLoading(false);
    }, 1000);
  };

  const handleClose = () => {
    setLoading(true);
    setTimeout(() => {
      if (selectedCourses.length > 0) {
        setMessage(`Registration period closed successfully for ${selectedCourses.join(', ')}`);
      } else {
        setMessage('Error: Please select at least one course to close registration');
      }
      setLoading(false);
    }, 1000);
  };

  const handleReset = () => {
    setLoading(true);
    setTimeout(() => {
      setDates({ startDate: '', startTime: '', endDate: '', endTime: '' });
      setSelectedCourses([]);
      setMessage('');
      setStartDateOpen(false);
      setEndDateOpen(false);
      setLoading(false);
    }, 500);
  };

  const handleCourseChange = (event) => {
    const value = event.target.value;
    if (value.includes('select-all')) {
      setSelectedCourses(value.includes('select-all') && selectedCourses.length !== courses.length ? courses.map((c) => c.code) : []);
    } else {
      setSelectedCourses(value);
    }
  };

  const totalRegistrations = 50; // Mock data
  const totalDropped = 5; // Mock data

  return (
    <DashboardLayout>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TitleBar title="ADMIN PANEL" />
        </Grid>
        <Grid item xs={12}>
          {message && (
            <Alert
              severity={message.includes('Error') ? 'error' : 'success'}
              sx={{ mb: 2 }}
              onClose={() => setMessage('')}
            >
              {message}
            </Alert>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: '20px', textAlign: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 'medium', mb: 1}}>
              Total Registrations
            </Typography>
            <Typography variant="h4" color="#094c50" sx={{ fontWeight: 700 }} >
              {totalRegistrations}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: '20px', textAlign: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 'medium', mb: 1 }}>
              Total Dropped Courses
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {totalDropped}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
            <Paper elevation={2} sx={{ p: 2, borderRadius: '8px', width: '100%', maxWidth: 400 }}>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 'medium', textAlign: 'center' }}>
                Select Courses
              </Typography>
              <Select
                multiple
                fullWidth
                value={selectedCourses}
                onChange={handleCourseChange}
                displayEmpty
                disabled={loading}
                renderValue={(selected) =>
                  selected.length === 0
                    ? 'Select Courses'
                    : selected.length === courses.length
                    ? 'All Courses'
                    : selected.join(', ')
                }
              >
                <MenuItem value="select-all">
                  <Checkbox checked={selectedCourses.length === courses.length} />
                  <ListItemText primary="Select All" />
                </MenuItem>
                {courses.map((course) => (
                  <MenuItem key={`${course.program}-${course.code}`} value={course.code}>
                    <Checkbox checked={selectedCourses.includes(course.code)} />
                    <ListItemText primary={`${course.program} Year ${course.year}: ${course.code} – ${course.name}`} />
                  </MenuItem>
                ))}
              </Select>
            </Paper>
          </Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={6}>
                <Paper elevation={2} sx={{ p: 2, borderRadius: '8px', mb: 2 }}>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 'medium' }}>Select Start Date</Typography>
                  <Box sx={{ mb: 1 }}>
                    <Button
                      variant="outlined"
                      onClick={() => setStartDateOpen(!startDateOpen)}
                      disabled={loading}
                    >
                      {startDateOpen ? 'Hide Calendar' : 'Show Calendar'}
                    </Button>
                  </Box>
                  {startDateOpen && (
                    <Box sx={{ maxHeight: '300px', overflow: 'auto' }}>
                      <DatePicker
                        views={['year', 'month', 'day']}
                        openTo="day"
                        value={dates.startDate ? dayjs(dates.startDate) : null}
                        onChange={(newValue) =>
                          setDates({
                            ...dates,
                            startDate: newValue ? dayjs(newValue).format('YYYY-MM-DD') : '',
                          })
                        }
                        disabled={loading}
                        slotProps={{
                          calendar: {
                            sx: {
                              border: '1px solid #e0e0e0',
                              borderRadius: '8px',
                              p: 1,
                              backgroundColor: '#fff',
                              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                              width: '100%',
                            },
                          },
                        }}
                      />
                    </Box>
                  )}
                </Paper>
                <Paper elevation={2} sx={{ p: 2, borderRadius: '8px', mb: 2 }}>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 'medium' }}>Select Start Time</Typography>
                  <TimePicker
                    label="Start Time"
                    value={dates.startTime ? dayjs(dates.startTime, 'h:mm A') : null}
                    onChange={(newValue) =>
                      setDates({
                        ...dates,
                        startTime: newValue ? dayjs(newValue).format('h:mm A') : '',
                      })
                    }
                    disabled={loading}
                    ampm
                    slotProps={{
                      textField: {
                        fullWidth: true,
                      },
                    }}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper elevation={2} sx={{ p: 2, borderRadius: '8px', mb: 2 }}>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 'medium' }}>Select End Date</Typography>
                  <Box sx={{ mb: 1 }}>
                    <Button
                      variant="outlined"
                      onClick={() => setEndDateOpen(!endDateOpen)}
                      disabled={loading}
                    >
                      {endDateOpen ? 'Hide Calendar' : 'Show Calendar'}
                    </Button>
                  </Box>
                  {endDateOpen && (
                    <Box sx={{ maxHeight: '300px', overflow: 'auto' }}>
                      <DatePicker
                        views={['year', 'month', 'day']}
                        openTo="day"
                        value={dates.endDate ? dayjs(dates.endDate) : null}
                        onChange={(newValue) =>
                          setDates({
                            ...dates,
                            endDate: newValue ? dayjs(newValue).format('YYYY-MM-DD') : '',
                          })
                        }
                        disabled={loading}
                        slotProps={{
                          calendar: {
                            sx: {
                              border: '1px solid #e0e0e0',
                              borderRadius: '8px',
                              p: 1,
                              backgroundColor: '#fff',
                              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                              width: '100%',
                            },
                          },
                        }}
                      />
                    </Box>
                  )}
                </Paper>
                <Paper elevation={2} sx={{ p: 2, borderRadius: '8px', mb: 2 }}>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 'medium' }}>Select End Time</Typography>
                  <TimePicker
                    label="End Time"
                    value={dates.endTime ? dayjs(dates.endTime, 'h:mm A') : null}
                    onChange={(newValue) =>
                      setDates({
                        ...dates,
                        endTime: newValue ? dayjs(newValue).format('h:mm A') : '',
                      })
                    }
                    disabled={loading}
                    ampm
                    slotProps={{
                      textField: {
                        fullWidth: true,
                      },
                    }}
                  />
                </Paper>
              </Grid>
            </Grid>
          </LocalizationProvider>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              variant="contained"
              onClick={handleOpen}
              disabled={loading}
              sx={{ bgcolor: '#094C50', '&:hover': { bgcolor: '#0D7075' },}}
            >
              Open Registration
            </Button>
            <Button
              variant="outlined"
              color="#094c50"
              onClick={handleClose}
              disabled={loading}
              
            >
              Close Registration
            </Button>
            <Button
              variant="ghost"
              color="secondary"
              onClick={handleReset}
              disabled={loading}
            >
              <RotateLeftIcon/>
            </Button>
          </Box>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default AdminPanel;