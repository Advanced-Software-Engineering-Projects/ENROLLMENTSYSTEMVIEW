// // // import React, { useEffect, useState } from 'react';
// // // import {
// // //   Box,
// // //   Card,
// // //   CardContent,
// // //   Typography,
// // //   Grid,
// // //   Divider,
// // //   Chip,
// // //   Alert,
// // //   TextField,
// // //   Select,
// // //   MenuItem,
// // //   Button,
// // //   FormControl,
// // //   InputLabel,
// // //   Pagination,
// // // } from '@mui/material';
// // // import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
// // // import TitleBar from '../../components/Titlebar/Titlebar';

// // // // Mock timetable data
// // // const mockTimetable = [
// // //   // MA161
// // //   {
// // //     enrollmentId: 'E001',
// // //     courseCode: 'MA161',
// // //     courseName: 'Discrete Mathematics',
// // //     schedule: '09:00-10:00',
// // //     venue: 'Room A101',
// // //     date: '2025-03-03',
// // //     day: 'Monday',
// // //     course: 'MA161',
// // //     activity: 'Lecture',
// // //   },
// // //   {
// // //     enrollmentId: 'E002',
// // //     courseCode: 'MA161',
// // //     courseName: 'Discrete Mathematics',
// // //     schedule: '10:00-12:00',
// // //     venue: 'Room B202',
// // //     date: '2025-03-05',
// // //     day: 'Wednesday',
// // //     course: 'MA161',
// // //     activity: 'Lab',
// // //   },
// // //   {
// // //     enrollmentId: 'E003',
// // //     courseCode: 'MA161',
// // //     courseName: 'Discrete Mathematics',
// // //     schedule: '13:00-15:00',
// // //     venue: 'Room C303',
// // //     date: '2025-03-06',
// // //     day: 'Thursday',
// // //     course: 'MA161',
// // //     activity: 'Tutorial',
// // //   },
// // //   // CS112
// // //   {
// // //     enrollmentId: 'E004',
// // //     courseCode: 'CS112',
// // //     courseName: 'Data Structures and Algorithms',
// // //     schedule: '09:00-10:00',
// // //     venue: 'Room A101',
// // //     date: '2025-03-04',
// // //     day: 'Tuesday',
// // //     course: 'CS112',
// // //     activity: 'Lecture',
// // //   },
// // //   {
// // //     enrollmentId: 'E005',
// // //     courseCode: 'CS112',
// // //     courseName: 'Data Structures and Algorithms',
// // //     schedule: '10:00-12:00',
// // //     venue: 'Room B202',
// // //     date: '2025-03-06',
// // //     day: 'Thursday',
// // //     course: 'CS112',
// // //     activity: 'Lab',
// // //   },
// // //   {
// // //     enrollmentId: 'E006',
// // //     courseCode: 'CS112',
// // //     courseName: 'Data Structures and Algorithms',
// // //     schedule: '13:00-15:00',
// // //     venue: 'Room C303',
// // //     date: '2025-03-07',
// // //     day: 'Friday',
// // //     course: 'CS112',
// // //     activity: 'Tutorial',
// // //   },
// // //   // MG101
// // //   {
// // //     enrollmentId: 'E007',
// // //     courseCode: 'MG101',
// // //     courseName: 'Introduction to Management',
// // //     schedule: '11:00-12:00',
// // //     venue: 'Room A101',
// // //     date: '2025-03-03',
// // //     day: 'Monday',
// // //     course: 'MG101',
// // //     activity: 'Lecture',
// // //   },
// // //   {
// // //     enrollmentId: 'E008',
// // //     courseCode: 'MG101',
// // //     courseName: 'Introduction to Management',
// // //     schedule: '13:00-15:00',
// // //     venue: 'Room B202',
// // //     date: '2025-03-05',
// // //     day: 'Wednesday',
// // //     course: 'MG101',
// // //     activity: 'Lab',
// // //   },
// // //   {
// // //     enrollmentId: 'E009',
// // //     courseCode: 'MG101',
// // //     courseName: 'Introduction to Management',
// // //     schedule: '15:00-17:00',
// // //     venue: 'Room C303',
// // //     date: '2025-03-06',
// // //     day: 'Thursday',
// // //     course: 'MG101',
// // //     activity: 'Tutorial',
// // //   },
// // //   // PH101
// // //   {
// // //     enrollmentId: 'E010',
// // //     courseCode: 'PH101',
// // //     courseName: 'Physics I',
// // //     schedule: '11:00-12:00',
// // //     venue: 'Room A101',
// // //     date: '2025-03-04',
// // //     day: 'Tuesday',
// // //     course: 'PH101',
// // //     activity: 'Lecture',
// // //   },
// // //   {
// // //     enrollmentId: 'E011',
// // //     courseCode: 'PH101',
// // //     courseName: 'Physics I',
// // //     schedule: '10:00-12:00',
// // //     venue: 'Room B202',
// // //     date: '2025-03-07',
// // //     day: 'Friday',
// // //     course: 'PH101',
// // //     activity: 'Lab',
// // //   },
// // //   {
// // //     enrollmentId: 'E012',
// // //     courseCode: 'PH101',
// // //     courseName: 'Physics I',
// // //     schedule: '13:00-15:00',
// // //     venue: 'Room C303',
// // //     date: '2025-03-03',
// // //     day: 'Monday',
// // //     course: 'PH101',
// // //     activity: 'Tutorial',
// // //   },
// // // ];

// // // // Mock API function
// // // const getTimetable = async () =>
// // //   new Promise((resolve) => setTimeout(() => resolve(mockTimetable), 500));

// // // // Error Boundary Component
// // // class ErrorBoundary extends React.Component {
// // //   state = { hasError: false };

// // //   static getDerivedStateFromError(error) {
// // //     return { hasError: true };
// // //   }

// // //   render() {
// // //     if (this.state.hasError) {
// // //       return (
// // //         <Box sx={{ textAlign: 'center', mt: 4 }}>
// // //           <Typography variant="h6" color="error">
// // //             Something went wrong. Please try again later.
// // //           </Typography>
// // //         </Box>
// // //       );
// // //     }
// // //     return this.props.children;
// // //   }
// // // }

// // // // Timetable Component
// // // const Timetable = () => {
// // //   const [timetable, setTimetable] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState('');
// // //   const [newClass, setNewClass] = useState({
// // //     startTime: '',
// // //     endTime: '',
// // //     venue: '',
// // //     date: '',
// // //     day: '',
// // //     course: '',
// // //     activity: '',
// // //   });
// // //   const [currentPage, setCurrentPage] = useState(1);

// // //   // Fetch timetable data
// // //   useEffect(() => {
// // //     const fetchTimetable = async () => {
// // //       setLoading(true);
// // //       try {
// // //         const data = await getTimetable();
// // //         setTimetable(data);
// // //       } catch (error) {
// // //         setError('Failed to load timetable.');
// // //         console.error('Error fetching timetable:', error);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };
// // //     fetchTimetable();
// // //   }, []);

// // //   // Handle form input changes
// // //   const handleInputChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setNewClass((prev) => ({ ...prev, [name]: value }));
// // //   };

// // //   // Handle adding a new class
// // //   const handleAddClass = () => {
// // //     if (
// // //       !newClass.startTime ||
// // //       !newClass.endTime ||
// // //       !newClass.venue ||
// // //       !newClass.date ||
// // //       !newClass.day ||
// // //       !newClass.course ||
// // //       !newClass.activity
// // //     ) {
// // //       setError('All fields are required.');
// // //       return;
// // //     }

// // //     // Validate time format (HH:MM)
// // //     const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
// // //     if (!timeRegex.test(newClass.startTime) || !timeRegex.test(newClass.endTime)) {
// // //       setError('Invalid time format. Use HH:MM (e.g., 09:00).');
// // //       return;
// // //     }

// // //     // Validate date format (YYYY-MM-DD)
// // //     const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
// // //     if (!dateRegex.test(newClass.date)) {
// // //       setError('Invalid date format. Use YYYY-MM-DD (e.g., 2025-03-03).');
// // //       return;
// // //     }

// // //     // Validate course
// // //     const courseNames = {
// // //       MA161: 'Discrete Mathematics',
// // //       CS112: 'Data Structures and Algorithms',
// // //       MG101: 'Introduction to Management',
// // //       PH101: 'Physics I',
// // //     };
// // //     if (!courseNames[newClass.course]) {
// // //       setError('Invalid course selected.');
// // //       return;
// // //     }

// // //     // Generate unique enrollmentId
// // //     const newId = `E${(timetable.length + 1).toString().padStart(3, '0')}`;
// // //     const newEntry = {
// // //       enrollmentId: newId,
// // //       courseCode: newClass.course,
// // //       courseName: courseNames[newClass.course],
// // //       schedule: `${newClass.startTime}-${newClass.endTime}`,
// // //       venue: newClass.venue,
// // //       date: newClass.date,
// // //       day: newClass.day,
// // //       course: newClass.course,
// // //       activity: newClass.activity,
// // //     };

// // //     setTimetable((prev) => [...prev, newEntry]);
// // //     setNewClass({
// // //       startTime: '',
// // //       endTime: '',
// // //       venue: '',
// // //       date: '',
// // //       day: '',
// // //       course: '',
// // //       activity: '',
// // //     });
// // //     setError('');
// // //   };

// // //   // Group timetable by course
// // //   const groupedTimetable = timetable.reduce((acc, entry) => {
// // //     if (!acc[entry.course]) {
// // //       acc[entry.course] = [];
// // //     }
// // //     acc[entry.course].push(entry);
// // //     return acc;
// // //   }, {});

// // //   // Get unique courses for pagination
// // //   const courses = Object.keys(groupedTimetable);
// // //   const coursesPerPage = 1;
// // //   const totalPages = courses.length > 0 ? Math.ceil(courses.length / coursesPerPage) : 1;
// // //   const currentCourse = courses[(currentPage - 1) * coursesPerPage] || '';

// // //   // Handle page change
// // //   const handlePageChange = (event, value) => {
// // //     setCurrentPage(value);
// // //   };

// // //   // Loading State
// // //   if (loading) {
// // //     return (
// // //       <DashboardLayout>
// // //         <Box sx={{ textAlign: 'center', mt: 4 }}>
// // //           <Typography variant="h6" color="text.secondary">
// // //             Loading Timetable...
// // //           </Typography>
// // //         </Box>
// // //       </DashboardLayout>
// // //     );
// // //   }

// // //   return (
// // //     <ErrorBoundary>
// // //       <DashboardLayout>
// // //         <Grid container spacing={3} sx={{ background: 'linear-gradient(180deg, #f5f5f5 0%, #e0f7fa 100%)', p: 4, minHeight: '100vh' }}>
// // //           <Grid item xs={12}>
// // //             <TitleBar title="TIMETABLE FOR SEMESTER 1 2025" />
// // //           </Grid>

// // //           {/* Error Display */}
// // //           {error && (
// // //             <Grid item xs={12}>
// // //               <Alert severity="error" sx={{ mb: 3, borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} onClose={() => setError('')}>
// // //                 {error}
// // //               </Alert>
// // //             </Grid>
// // //           )}

// // //           {/* Add New Class Form */}
// // //           <Grid item xs={12}>
// // //             <Card elevation={4} sx={{ borderRadius: '16px', backgroundColor: '#ffffff', overflow: 'hidden' }}>
// // //               <CardContent sx={{ p: 4 }}>
// // //                 <Typography variant="h5" gutterBottom sx={{ color: '#094c50', fontWeight: 600 }}>
// // //                   Add New Class
// // //                 </Typography>
// // //                 <Divider sx={{ mb: 3, borderColor: '#e0e0e0' }} />
// // //                 <Grid container spacing={3}>
// // //                   <Grid item xs={12} sm={6} md={3}>
// // //                     <TextField
// // //                       label="Start Time (HH:MM)"
// // //                       name="startTime"
// // //                       value={newClass.startTime}
// // //                       onChange={handleInputChange}
// // //                       fullWidth
// // //                       size="small"
// // //                       sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
// // //                     />
// // //                   </Grid>
// // //                   <Grid item xs={12} sm={6} md={3}>
// // //                     <TextField
// // //                       label="End Time (HH:MM)"
// // //                       name="endTime"
// // //                       value={newClass.endTime}
// // //                       onChange={handleInputChange}
// // //                       fullWidth
// // //                       size="small"
// // //                       sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
// // //                     />
// // //                   </Grid>
// // //                   <Grid item xs={12} sm={6} md={3}>
// // //                     <TextField
// // //                       label="Venue"
// // //                       name="venue"
// // //                       value={newClass.venue}
// // //                       onChange={handleInputChange}
// // //                       fullWidth
// // //                       size="small"
// // //                       sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
// // //                     />
// // //                   </Grid>
// // //                   <Grid item xs={12} sm={6} md={3}>
// // //                     <TextField
// // //                       label="Date (YYYY-MM-DD)"
// // //                       name="date"
// // //                       value={newClass.date}
// // //                       onChange={handleInputChange}
// // //                       fullWidth
// // //                       size="small"
// // //                       sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
// // //                     />
// // //                   </Grid>
// // //                   <Grid item xs={12} sm={6} md={3}>
// // //                     <FormControl fullWidth size="small">
// // //                       <InputLabel>Day</InputLabel>
// // //                       <Select
// // //                         name="day"
// // //                         value={newClass.day}
// // //                         onChange={handleInputChange}
// // //                         label="Day"
// // //                         sx={{ borderRadius: '8px' }}
// // //                       >
// // //                         <MenuItem value="Monday">Monday</MenuItem>
// // //                         <MenuItem value="Tuesday">Tuesday</MenuItem>
// // //                         <MenuItem value="Wednesday">Wednesday</MenuItem>
// // //                         <MenuItem value="Thursday">Thursday</MenuItem>
// // //                         <MenuItem value="Friday">Friday</MenuItem>
// // //                       </Select>
// // //                     </FormControl>
// // //                   </Grid>
// // //                   <Grid item xs={12} sm={6} md={3}>
// // //                     <FormControl fullWidth size="small">
// // //                       <InputLabel>Course</InputLabel>
// // //                       <Select
// // //                         name="course"
// // //                         value={newClass.course}
// // //                         onChange={handleInputChange}
// // //                         label="Course"
// // //                         sx={{ borderRadius: '8px' }}
// // //                       >
// // //                         <MenuItem value="MA161">MA161 - Discrete Mathematics</MenuItem>
// // //                         <MenuItem value="CS112">CS112 - Data Structures and Algorithms</MenuItem>
// // //                         <MenuItem value="MG101">MG101 - Introduction to Management</MenuItem>
// // //                         <MenuItem value="PH101">PH101 - Physics I</MenuItem>
// // //                       </Select>
// // //                     </FormControl>
// // //                   </Grid>
// // //                   <Grid item xs={12} sm={6} md={3}>
// // //                     <FormControl fullWidth size="small">
// // //                       <InputLabel>Activity</InputLabel>
// // //                       <Select
// // //                         name="activity"
// // //                         value={newClass.activity}
// // //                         onChange={handleInputChange}
// // //                         label="Activity"
// // //                         sx={{ borderRadius: '8px' }}
// // //                       >
// // //                         <MenuItem value="Lecture">Lecture</MenuItem>
// // //                         <MenuItem value="Lab">Lab</MenuItem>
// // //                         <MenuItem value="Tutorial">Tutorial</MenuItem>
// // //                       </Select>
// // //                     </FormControl>
// // //                   </Grid>
// // //                   <Grid item xs={12} sm={6} md={3}>
// // //                     <Button
// // //                       variant="contained"
// // //                       color="primary"
// // //                       fullWidth
// // //                       sx={{ mt: 1, borderRadius: '8px', bgcolor: '#2596be', '&:hover': { bgcolor: '#1a6d8c' } }}
// // //                       onClick={handleAddClass}
// // //                     >
// // //                       Add Class
// // //                     </Button>
// // //                   </Grid>
// // //                 </Grid>
// // //               </CardContent>
// // //             </Card>
// // //           </Grid>

// // //           {/* Timetable Entries */}
// // //           <Grid item xs={12}>
// // //             <Card elevation={4} sx={{ borderRadius: '16px', backgroundColor: '#ffffff', overflow: 'hidden', mt: 4 }}>
// // //               <CardContent sx={{ p: 4 }}>
// // //                 {timetable.length > 0 && currentCourse && groupedTimetable[currentCourse] ? (
// // //                   <Box>
// // //                     <Typography variant="h5" gutterBottom sx={{ color: '#094c50', fontWeight: 600, mb: 2 }}>
// // //                       Scheduled Courses
// // //                       <Chip
// // //                         label={`${groupedTimetable[currentCourse].length} Classes`}
// // //                         size="small"
// // //                         color="primary"
// // //                         sx={{ ml: 2, fontWeight: 500, bgcolor: '#2596be', color: '#fff' }}
// // //                       />
// // //                     </Typography>
// // //                     <Divider sx={{ mb: 3, borderColor: '#e0e0e0' }} />
// // //                     <Grid container spacing={3}>
// // //                       {groupedTimetable[currentCourse].map((entry) => (
// // //                         <Grid item xs={12} sm={6} md={4} key={entry.enrollmentId}>
// // //                           <Box
// // //                             sx={{
// // //                               p: 3,
// // //                               border: '1px solid #e0e0e0',
// // //                               borderRadius: '12px',
// // //                               backgroundColor: '#ffffff',
// // //                               boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
// // //                               transition: 'all 0.3s ease-in-out',
// // //                               '&:hover': {
// // //                                 transform: 'translateY(-6px)',
// // //                                 boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
// // //                               },
// // //                             }}
// // //                           >
// // //                             <Grid container spacing={2}>
// // //                               <Grid item xs={6}>
// // //                                 <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 500, mb: 1 }}>
// // //                                   Course
// // //                                 </Typography>
// // //                                 <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#094c50', mb: 2 }}>
// // //                                   {entry.course} - {entry.courseName}
// // //                                 </Typography>
// // //                                 <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 500, mb: 1 }}>
// // //                                   Activity
// // //                                 </Typography>
// // //                                 <Chip
// // //                                   label={entry.activity}
// // //                                   size="small"
// // //                                   sx={{
// // //                                     fontWeight: 500,
// // //                                     bgcolor:
// // //                                       entry.activity === 'Lecture' ? '#4caf50' :
// // //                                       entry.activity === 'Lab' ? '#2196f3' :
// // //                                       '#ff9800',
// // //                                     color: '#ffffff',
// // //                                     borderRadius: '8px',
// // //                                   }}
// // //                                 />
// // //                               </Grid>
// // //                               <Grid item xs={6}>
// // //                                 <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 500, mb: 1 }}>
// // //                                   Schedule
// // //                                 </Typography>
// // //                                 <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#388e3c', mb: 2 }}>
// // //                                   {entry.schedule}
// // //                                 </Typography>
// // //                                 <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 500, mb: 1 }}>
// // //                                   Day
// // //                                 </Typography>
// // //                                 <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 2 }}>
// // //                                   {entry.day}
// // //                                 </Typography>
// // //                                 <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 500, mb: 1 }}>
// // //                                   Date
// // //                                 </Typography>
// // //                                 <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 2 }}>
// // //                                   {entry.date}
// // //                                 </Typography>
// // //                                 <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 500, mb: 1 }}>
// // //                                   Venue
// // //                                 </Typography>
// // //                                 <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
// // //                                   {entry.venue}
// // //                                 </Typography>
// // //                               </Grid>
// // //                             </Grid>
// // //                           </Box>
// // //                         </Grid>
// // //                       ))}
// // //                     </Grid>
// // //                     {courses.length > 1 && (
// // //                       <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
// // //                         <Pagination
// // //                           count={totalPages}
// // //                           page={currentPage}
// // //                           onChange={handlePageChange}
// // //                           color="primary"
// // //                           sx={{ '& .MuiPaginationItem-root': { borderRadius: '8px' } }}
// // //                         />
// // //                       </Box>
// // //                     )}
// // //                   </Box>
// // //                 ) : (
// // //                   <Card elevation={3} sx={{ borderRadius: '12px', mt: 3, backgroundColor: '#ffffff' }}>
// // //                     <CardContent sx={{ p: 4, textAlign: 'center' }}>
// // //                       <Typography variant="h6" color="text.secondary">
// // //                         No classes scheduled for this semester.
// // //                       </Typography>
// // //                     </CardContent>
// // //                   </Card>
// // //                 )}
// // //               </CardContent>
// // //             </Card>
// // //           </Grid>
// // //         </Grid>
// // //       </DashboardLayout>
// // //     </ErrorBoundary>
// // //   );
// // // };

// // // export default Timetable;

// // import React, { useEffect, useState } from 'react';
// // import {
// //   Box,
// //   Card,
// //   CardContent,
// //   Typography,
// //   Grid,
// //   Divider,
// //   Chip,
// //   Alert,
// //   TextField,
// //   Select,
// //   MenuItem,
// //   Button,
// //   FormControl,
// //   InputLabel,
// //   Pagination,
// // } from '@mui/material';
// // import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
// // import TitleBar from '../../components/Titlebar/Titlebar';
// // import { getTimetables, addTimetable } from "../../Endpoints/StudentEndpoints";

// // // Error Boundary Component
// // class ErrorBoundary extends React.Component {
// //   state = { hasError: false };

// //   static getDerivedStateFromError(error) {
// //     return { hasError: true };
// //   }

// //   render() {
// //     if (this.state.hasError) {
// //       return (
// //         <Box sx={{ textAlign: 'center', mt: 4 }}>
// //           <Typography variant="h6" color="error">
// //             Something went wrong. Please try again later.
// //           </Typography>
// //         </Box>
// //       );
// //     }
// //     return this.props.children;
// //   }
// // }

// // // Timetable Component
// // const Timetable = () => {
// //   const [timetable, setTimetable] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState('');
// //   const [adding, setAdding] = useState(false); // State for adding a new class
// //   const [newClass, setNewClass] = useState({
// //     startTime: '',
// //     endTime: '',
// //     venue: '',
// //     date: '',
// //     day: '',
// //     course: '',
// //     activity: '',
// //   });
// //   const [currentPage, setCurrentPage] = useState(1);

// //   // Hardcoded studentId and semester (should be dynamic in a real app)
// //   const studentId = 'S123456';
// //   const semester = '2025-S1';

// //   // Fetch timetable data on mount
// //   useEffect(() => {
// //     const fetchTimetable = async () => {
// //       setLoading(true);
// //       try {
// //         const data = await getTimetables(studentId, semester);
// //         setTimetable(data);
// //       } catch (error) {
// //         setError('Failed to load timetable.');
// //         console.error('Error fetching timetable:', error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchTimetable();
// //   }, [studentId, semester]);

// //   // Handle form input changes
// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setNewClass((prev) => ({ ...prev, [name]: value }));
// //   };

// //   // Handle adding a new class
// //   const handleAddClass = async () => {
// //     // Validate all fields are filled
// //     if (
// //       !newClass.startTime ||
// //       !newClass.endTime ||
// //       !newClass.venue ||
// //       !newClass.date ||
// //       !newClass.day ||
// //       !newClass.course ||
// //       !newClass.activity
// //     ) {
// //       setError('All fields are required.');
// //       return;
// //     }

// //     // Validate time format (HH:MM)
// //     const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
// //     if (!timeRegex.test(newClass.startTime) || !timeRegex.test(newClass.endTime)) {
// //       setError('Invalid time format. Use HH:MM (e.g., 09:00).');
// //       return;
// //     }

// //     // Validate date format (YYYY-MM-DD)
// //     const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
// //     if (!dateRegex.test(newClass.date)) {
// //       setError('Invalid date format. Use YYYY-MM-DD (e.g., 2025-03-03).');
// //       return;
// //     }

// //     // Validate course
// //     const courseNames = {
// //       MA161: 'Discrete Mathematics',
// //       CS112: 'Data Structures and Algorithms',
// //       MG101: 'Introduction to Management',
// //       PH101: 'Physics I',
// //     };
// //     if (!courseNames[newClass.course]) {
// //       setError('Invalid course selected.');
// //       return;
// //     }

// //     setAdding(true);
// //     try {
// //       const timetableDto = {
// //         startTime: newClass.startTime,
// //         endTime: newClass.endTime,
// //         venue: newClass.venue,
// //         date: newClass.date,
// //         day: newClass.day,
// //         course: newClass.course,
// //         activity: newClass.activity,
// //         studentId,
// //         semester,
// //       };
// //       const newEntry = await addTimetable(timetableDto);
// //       setTimetable((prev) => [...prev, newEntry]);
// //       setNewClass({
// //         startTime: '',
// //         endTime: '',
// //         venue: '',
// //         date: '',
// //         day: '',
// //         course: '',
// //         activity: '',
// //       });
// //       setError('');
// //     } catch (error) {
// //       setError('Failed to add new class.');
// //       console.error('Error adding class:', error);
// //     } finally {
// //       setAdding(false);
// //     }
// //   };

// //   // Group timetable by course for pagination
// //   const groupedTimetable = timetable.reduce((acc, entry) => {
// //     if (!acc[entry.course]) {
// //       acc[entry.course] = [];
// //     }
// //     acc[entry.course].push(entry);
// //     return acc;
// //   }, {});

// //   // Get unique courses for pagination
// //   const courses = Object.keys(groupedTimetable);
// //   const coursesPerPage = 1;
// //   const totalPages = courses.length > 0 ? Math.ceil(courses.length / coursesPerPage) : 1;
// //   const currentCourse = courses[(currentPage - 1) * coursesPerPage] || '';

// //   // Handle page change
// //   const handlePageChange = (event, value) => {
// //     setCurrentPage(value);
// //   };

// //   // Loading State
// //   if (loading) {
// //     return (
// //       <DashboardLayout>
// //         <Box sx={{ textAlign: 'center', mt: 4 }}>
// //           <Typography variant="h6" color="text.secondary">
// //             Loading Timetable...
// //           </Typography>
// //         </Box>
// //       </DashboardLayout>
// //     );
// //   }

// //   return (
// //     <ErrorBoundary>
// //       <DashboardLayout>
// //         <Grid container spacing={3} sx={{ background: 'linear-gradient(180deg, #f5f5f5 0%, #e0f7fa 100%)', p: 4, minHeight: '100vh' }}>
// //           <Grid item xs={12}>
// //             <TitleBar title="TIMETABLE FOR SEMESTER 1 2025" />
// //           </Grid>

// //           {/* Error Display */}
// //           {error && (
// //             <Grid item xs={12}>
// //               <Alert severity="error" sx={{ mb: 3, borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} onClose={() => setError('')}>
// //                 {error}
// //               </Alert>
// //             </Grid>
// //           )}

// //           {/* Add New Class Form */}
// //           <Grid item xs={12}>
// //             <Card elevation={4} sx={{ borderRadius: '16px', backgroundColor: '#ffffff', overflow: 'hidden' }}>
// //               <CardContent sx={{ p: 4 }}>
// //                 <Typography variant="h5" gutterBottom sx={{ color: '#094c50', fontWeight: 600 }}>
// //                   Add New Class
// //                 </Typography>
// //                 <Divider sx={{ mb: 3, borderColor: '#e0e0e0' }} />
// //                 <Grid container spacing={3}>
// //                   <Grid item xs={12} sm={6} md={3}>
// //                     <TextField
// //                       label="Start Time (HH:MM)"
// //                       name="startTime"
// //                       value={newClass.startTime}
// //                       onChange={handleInputChange}
// //                       fullWidth
// //                       size="small"
// //                       sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
// //                     />
// //                   </Grid>
// //                   <Grid item xs={12} sm={6} md={3}>
// //                     <TextField
// //                       label="End Time (HH:MM)"
// //                       name="endTime"
// //                       value={newClass.endTime}
// //                       onChange={handleInputChange}
// //                       fullWidth
// //                       size="small"
// //                       sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
// //                     />
// //                   </Grid>
// //                   <Grid item xs={12} sm={6} md={3}>
// //                     <TextField
// //                       label="Venue"
// //                       name="venue"
// //                       value={newClass.venue}
// //                       onChange={handleInputChange}
// //                       fullWidth
// //                       size="small"
// //                       sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
// //                     />
// //                   </Grid>
// //                   <Grid item xs={12} sm={6} md={3}>
// //                     <TextField
// //                       label="Date (YYYY-MM-DD)"
// //                       name="date"
// //                       value={newClass.date}
// //                       onChange={handleInputChange}
// //                       fullWidth
// //                       size="small"
// //                       sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
// //                     />
// //                   </Grid>
// //                   <Grid item xs={12} sm={6} md={3}>
// //                     <FormControl fullWidth size="small">
// //                       <InputLabel>Day</InputLabel>
// //                       <Select
// //                         name="day"
// //                         value={newClass.day}
// //                         onChange={handleInputChange}
// //                         label="Day"
// //                         sx={{ borderRadius: '8px' }}
// //                       >
// //                         <MenuItem value="Monday">Monday</MenuItem>
// //                         <MenuItem value="Tuesday">Tuesday</MenuItem>
// //                         <MenuItem value="Wednesday">Wednesday</MenuItem>
// //                         <MenuItem value="Thursday">Thursday</MenuItem>
// //                         <MenuItem value="Friday">Friday</MenuItem>
// //                       </Select>
// //                     </FormControl>
// //                   </Grid>
// //                   <Grid item xs={12} sm={6} md={3}>
// //                     <FormControl fullWidth size="small">
// //                       <InputLabel>Course</InputLabel>
// //                       <Select
// //                         name="course"
// //                         value={newClass.course}
// //                         onChange={handleInputChange}
// //                         label="Course"
// //                         sx={{ borderRadius: '8px' }}
// //                       >
// //                         <MenuItem value="MA161">MA161 - Discrete Mathematics</MenuItem>
// //                         <MenuItem value="CS112">CS112 - Data Structures and Algorithms</MenuItem>
// //                         <MenuItem value="MG101">MG101 - Introduction to Management</MenuItem>
// //                         <MenuItem value="PH101">PH101 - Physics I</MenuItem>
// //                       </Select>
// //                     </FormControl>
// //                   </Grid>
// //                   <Grid item xs={12} sm={6} md={3}>
// //                     <FormControl fullWidth size="small">
// //                       <InputLabel>Activity</InputLabel>
// //                       <Select
// //                         name="activity"
// //                         value={newClass.activity}
// //                         onChange={handleInputChange}
// //                         label="Activity"
// //                         sx={{ borderRadius: '8px' }}
// //                       >
// //                         <MenuItem value="Lecture">Lecture</MenuItem>
// //                         <MenuItem value="Lab">Lab</MenuItem>
// //                         <MenuItem value="Tutorial">Tutorial</MenuItem>
// //                       </Select>
// //                     </FormControl>
// //                   </Grid>
// //                   <Grid item xs={12} sm={6} md={3}>
// //                     <Button
// //                       variant="contained"
// //                       color="primary"
// //                       fullWidth
// //                       sx={{ mt: 1, borderRadius: '8px', bgcolor: '#2596be', '&:hover': { bgcolor: '#1a6d8c' } }}
// //                       onClick={handleAddClass}
// //                       disabled={adding}
// //                     >
// //                       {adding ? 'Adding...' : 'Add Class'}
// //                     </Button>
// //                   </Grid>
// //                 </Grid>
// //               </CardContent>
// //             </Card>
// //           </Grid>

// //           {/* Timetable Entries */}
// //           <Grid item xs={12}>
// //             <Card elevation={4} sx={{ borderRadius: '16px', backgroundColor: '#ffffff', overflow: 'hidden', mt: 4 }}>
// //               <CardContent sx={{ p: 4 }}>
// //                 {timetable.length > 0 && currentCourse && groupedTimetable[currentCourse] ? (
// //                   <Box>
// //                     <Typography variant="h5" gutterBottom sx={{ color: '#094c50', fontWeight: 600, mb: 2 }}>
// //                       Scheduled Courses
// //                       <Chip
// //                         label={`${groupedTimetable[currentCourse].length} Classes`}
// //                         size="small"
// //                         color="primary"
// //                         sx={{ ml: 2, fontWeight: 500, bgcolor: '#2596be', color: '#fff' }}
// //                       />
// //                     </Typography>
// //                     <Divider sx={{ mb: 3, borderColor: '#e0e0e0' }} />
// //                     <Grid container spacing={3}>
// //                       {groupedTimetable[currentCourse].map((entry) => (
// //                         <Grid item xs={12} sm={6} md={4} key={entry.enrollmentId}>
// //                           <Box
// //                             sx={{
// //                               p: 3,
// //                               border: '1px solid #e0e0e0',
// //                               borderRadius: '12px',
// //                               backgroundColor: '#ffffff',
// //                               boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
// //                               transition: 'all 0.3s ease-in-out',
// //                               '&:hover': {
// //                                 transform: 'translateY(-6px)',
// //                                 boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
// //                               },
// //                             }}
// //                           >
// //                             <Grid container spacing={2}>
// //                               <Grid item xs={6}>
// //                                 <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 500, mb: 1 }}>
// //                                   Course
// //                                 </Typography>
// //                                 <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#094c50', mb: 2 }}>
// //                                   {entry.course} - {entry.courseName}
// //                                 </Typography>
// //                                 <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 500, mb: 1 }}>
// //                                   Activity
// //                                 </Typography>
// //                                 <Chip
// //                                   label={entry.activity}
// //                                   size="small"
// //                                   sx={{
// //                                     fontWeight: 500,
// //                                     bgcolor:
// //                                       entry.activity === 'Lecture' ? '#4caf50' :
// //                                       entry.activity === 'Lab' ? '#2196f3' :
// //                                       '#ff9800',
// //                                     color: '#ffffff',
// //                                     borderRadius: '8px',
// //                                   }}
// //                                 />
// //                               </Grid>
// //                               <Grid item xs={6}>
// //                                 <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 500, mb: 1 }}>
// //                                   Schedule
// //                                 </Typography>
// //                                 <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#388e3c', mb: 2 }}>
// //                                   {entry.schedule}
// //                                 </Typography>
// //                                 <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 500, mb: 1 }}>
// //                                   Day
// //                                 </Typography>
// //                                 <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 2 }}>
// //                                   {entry.day}
// //                                 </Typography>
// //                                 <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 500, mb: 1 }}>
// //                                   Date
// //                                 </Typography>
// //                                 <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 2 }}>
// //                                   {entry.date}
// //                                 </Typography>
// //                                 <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 500, mb: 1 }}>
// //                                   Venue
// //                                 </Typography>
// //                                 <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
// //                                   {entry.venue}
// //                                 </Typography>
// //                               </Grid>
// //                             </Grid>
// //                           </Box>
// //                         </Grid>
// //                       ))}
// //                     </Grid>
// //                     {courses.length > 1 && (
// //                       <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
// //                         <Pagination
// //                           count={totalPages}
// //                           page={currentPage}
// //                           onChange={handlePageChange}
// //                           color="primary"
// //                           sx={{ '& .MuiPaginationItem-root': { borderRadius: '8px' } }}
// //                         />
// //                       </Box>
// //                     )}
// //                   </Box>
// //                 ) : (
// //                   <Card elevation={3} sx={{ borderRadius: '12px', mt: 3, backgroundColor: '#ffffff' }}>
// //                     <CardContent sx={{ p: 4, textAlign: 'center' }}>
// //                       <Typography variant="h6" color="text.secondary">
// //                         No classes scheduled for this semester.
// //                       </Typography>
// //                     </CardContent>
// //                   </Card>
// //                 )}
// //               </CardContent>
// //             </Card>
// //           </Grid>
// //         </Grid>
// //       </DashboardLayout>
// //     </ErrorBoundary>
// //   );
// // };

// // export default Timetable;

// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   Divider,
//   Chip,
//   Alert,
//   TextField,
//   Select,
//   MenuItem,
//   Button,
//   FormControl,
//   InputLabel,
//   Pagination,
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
// import TitleBar from '../../components/Titlebar/Titlebar';
// import { 
//   getTimetables, 
//   addTimetable,
//   getEnrolledCourses
// } from "../../Endpoints/StudentEndpoints";

// // Error Boundary Component
// class ErrorBoundary extends React.Component {
//   state = { hasError: false };

//   static getDerivedStateFromError(error) {
//     return { hasError: true };
//   }

//   render() {
//     if (this.state.hasError) {
//       return (
//         <Box sx={{ textAlign: 'center', mt: 4 }}>
//           <Typography variant="h6" color="error">
//             Something went wrong. Please try again later.
//           </Typography>
//         </Box>
//       );
//     }
//     return this.props.children;
//   }
// }

// const Timetable = () => {
//   const [timetable, setTimetable] = useState([]);
//   const [enrolledCourses, setEnrolledCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [adding, setAdding] = useState(false);
//   const [newClass, setNewClass] = useState({
//     startTime: '',
//     endTime: '',
//     venue: '',
//     date: '',
//     day: '',
//     course: '',
//     activity: '',
//   });
//   const [currentPage, setCurrentPage] = useState(1);

//   // Get student ID from localStorage or context in a real app
//   const studentId = localStorage.getItem('studentId') || 'S123456';
//   const semester = '2025-S1'; // This should be dynamic based on current semester

//   // Fetch timetable and enrolled courses data
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const [timetableRes, enrolledRes] = await Promise.all([
//           getTimetables(studentId, semester),
//           getEnrolledCourses(studentId)
//         ]);
        
//         setTimetable(timetableRes.data);
//         setEnrolledCourses(enrolledRes.data);
//       } catch (error) {
//         setError('Failed to load timetable data.');
//         console.error('Error fetching timetable data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [studentId, semester]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewClass((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleAddClass = async () => {
//     // Validate all fields
//     if (
//       !newClass.startTime ||
//       !newClass.endTime ||
//       !newClass.venue ||
//       !newClass.date ||
//       !newClass.day ||
//       !newClass.course ||
//       !newClass.activity
//     ) {
//       setError('All fields are required.');
//       return;
//     }

//     // Validate time format
//     const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
//     if (!timeRegex.test(newClass.startTime) || !timeRegex.test(newClass.endTime)) {
//       setError('Invalid time format. Use HH:MM (e.g., 09:00).');
//       return;
//     }

//     // Validate date format
//     const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
//     if (!dateRegex.test(newClass.date)) {
//       setError('Invalid date format. Use YYYY-MM-DD (e.g., 2025-03-03).');
//       return;
//     }

//     // Check if course is enrolled
//     if (!enrolledCourses.some(course => course.courseCode === newClass.course)) {
//       setError('You are not enrolled in this course.');
//       return;
//     }

//     setAdding(true);
//     try {
//       const timetableDto = {
//         studentId,
//         semester,
//         courseCode: newClass.course,
//         courseName: enrolledCourses.find(c => c.courseCode === newClass.course)?.courseName || newClass.course,
//         startTime: newClass.startTime,
//         endTime: newClass.endTime,
//         venue: newClass.venue,
//         date: newClass.date,
//         day: newClass.day,
//         activity: newClass.activity
//       };

//       const response = await addTimetable(timetableDto);
//       setTimetable(prev => [...prev, response.data]);
      
//       // Reset form
//       setNewClass({
//         startTime: '',
//         endTime: '',
//         venue: '',
//         date: '',
//         day: '',
//         course: '',
//         activity: '',
//       });
//       setError('');
//     } catch (error) {
//       setError(error.response?.data?.message || 'Failed to add new class.');
//       console.error('Error adding class:', error);
//     } finally {
//       setAdding(false);
//     }
//   };

//   // Group timetable by course for pagination
//   const groupedTimetable = timetable.reduce((acc, entry) => {
//     if (!acc[entry.courseCode]) {
//       acc[entry.courseCode] = [];
//     }
//     acc[entry.courseCode].push(entry);
//     return acc;
//   }, {});

//   // Get unique courses for pagination
//   const courses = Object.keys(groupedTimetable);
//   const coursesPerPage = 1;
//   const totalPages = Math.max(1, Math.ceil(courses.length / coursesPerPage));
//   const currentCourse = courses[(currentPage - 1) * coursesPerPage] || '';

//   const handlePageChange = (event, value) => {
//     setCurrentPage(value);
//   };

//   if (loading) {
//     return (
//       <DashboardLayout>
//         <Box sx={{ textAlign: 'center', mt: 4 }}>
//           <Typography variant="h6" color="text.secondary">
//             Loading Timetable...
//           </Typography>
//         </Box>
//       </DashboardLayout>
//     );
//   }

//   return (
//     <ErrorBoundary>
//       <DashboardLayout>
//         <Grid container spacing={3} sx={{ p: 3 }}>
//           <Grid item xs={12}>
//             <TitleBar title={`TIMETABLE FOR SEMESTER ${semester}`} />
//           </Grid>

//           {error && (
//             <Grid item xs={12}>
//               <Alert severity="error" onClose={() => setError('')}>
//                 {error}
//               </Alert>
//             </Grid>
//           )}

//           {/* Add New Class Form */}
//           <Grid item xs={12}>
//             <Card elevation={3}>
//               <CardContent>
//                 <Typography variant="h6" gutterBottom>
//                   Add New Class
//                 </Typography>
//                 <Divider sx={{ mb: 2 }} />
//                 <Grid container spacing={2}>
//                   <Grid item xs={12} sm={6} md={3}>
//                     <TextField
//                       label="Start Time (HH:MM)"
//                       name="startTime"
//                       value={newClass.startTime}
//                       onChange={handleInputChange}
//                       fullWidth
//                       size="small"
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={6} md={3}>
//                     <TextField
//                       label="End Time (HH:MM)"
//                       name="endTime"
//                       value={newClass.endTime}
//                       onChange={handleInputChange}
//                       fullWidth
//                       size="small"
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={6} md={3}>
//                     <TextField
//                       label="Venue"
//                       name="venue"
//                       value={newClass.venue}
//                       onChange={handleInputChange}
//                       fullWidth
//                       size="small"
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={6} md={3}>
//                     <TextField
//                       label="Date (YYYY-MM-DD)"
//                       name="date"
//                       value={newClass.date}
//                       onChange={handleInputChange}
//                       fullWidth
//                       size="small"
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={6} md={3}>
//                     <FormControl fullWidth size="small">
//                       <InputLabel>Day</InputLabel>
//                       <Select
//                         name="day"
//                         value={newClass.day}
//                         onChange={handleInputChange}
//                         label="Day"
//                       >
//                         {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
//                           <MenuItem key={day} value={day}>{day}</MenuItem>
//                         ))}
//                       </Select>
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} sm={6} md={3}>
//                     <FormControl fullWidth size="small">
//                       <InputLabel>Course</InputLabel>
//                       <Select
//                         name="course"
//                         value={newClass.course}
//                         onChange={handleInputChange}
//                         label="Course"
//                       >
//                         {enrolledCourses.map(course => (
//                           <MenuItem key={course.courseCode} value={course.courseCode}>
//                             {course.courseCode} - {course.courseName}
//                           </MenuItem>
//                         ))}
//                       </Select>
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} sm={6} md={3}>
//                     <FormControl fullWidth size="small">
//                       <InputLabel>Activity</InputLabel>
//                       <Select
//                         name="activity"
//                         value={newClass.activity}
//                         onChange={handleInputChange}
//                         label="Activity"
//                       >
//                         {['Lecture', 'Lab', 'Tutorial'].map(activity => (
//                           <MenuItem key={activity} value={activity}>{activity}</MenuItem>
//                         ))}
//                       </Select>
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} sm={6} md={3}>
//                     <Button
//                       variant="contained"
//                       fullWidth
//                       onClick={handleAddClass}
//                       disabled={adding}
//                       sx={{ height: '40px' }}
//                     >
//                       {adding ? 'Adding...' : 'Add Class'}
//                     </Button>
//                   </Grid>
//                 </Grid>
//               </CardContent>
//             </Card>
//           </Grid>

//           {/* Timetable Display */}
//           <Grid item xs={12}>
//             <Card elevation={3}>
//               <CardContent>
//                 {timetable.length > 0 ? (
//                   <>
//                     <Typography variant="h6" gutterBottom>
//                       Your Timetable
//                     </Typography>
//                     <Divider sx={{ mb: 3 }} />
                    
//                     {currentCourse && groupedTimetable[currentCourse] && (
//                       <>
//                         <Box sx={{ mb: 2 }}>
//                           <Typography variant="subtitle1">
//                             {currentCourse} - {groupedTimetable[currentCourse][0].courseName}
//                           </Typography>
//                         </Box>
                        
//                         <Grid container spacing={2}>
//                           {groupedTimetable[currentCourse].map((entry, index) => (
//                             <Grid item xs={12} sm={6} md={4} key={index}>
//                               <Card variant="outlined">
//                                 <CardContent>
//                                   <Typography variant="subtitle2" color="text.secondary">
//                                     {entry.day}, {entry.date}
//                                   </Typography>
//                                   <Typography variant="h6">
//                                     {entry.startTime} - {entry.endTime}
//                                   </Typography>
//                                   <Typography variant="body1">
//                                     {entry.venue}
//                                   </Typography>
//                                   <Chip 
//                                     label={entry.activity} 
//                                     color={
//                                       entry.activity === 'Lecture' ? 'primary' :
//                                       entry.activity === 'Lab' ? 'secondary' : 'default'
//                                     }
//                                     size="small"
//                                     sx={{ mt: 1 }}
//                                   />
//                                 </CardContent>
//                               </Card>
//                             </Grid>
//                           ))}
//                         </Grid>
//                       </>
//                     )}

//                     {courses.length > 1 && (
//                       <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
//                         <Pagination
//                           count={totalPages}
//                           page={currentPage}
//                           onChange={handlePageChange}
//                           color="primary"
//                         />
//                       </Box>
//                     )}
//                   </>
//                 ) : (
//                   <Typography variant="body1" color="text.secondary" align="center">
//                     No classes scheduled for this semester.
//                   </Typography>
//                 )}
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>
//       </DashboardLayout>
//     </ErrorBoundary>
//   );
// };

// export default Timetable;

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
  CircularProgress,
} from '@mui/material';
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
import TitleBar from '../../components/Titlebar/Titlebar';
import { getTimetables, addTimetable, getEnrolledCourses } from "../../Endpoints/StudentEndpoints";

// Timetable Component
const Timetable = () => {
  const [timetable, setTimetable] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [adding, setAdding] = useState(false);
  const [newClass, setNewClass] = useState({
    startTime: '',
    endTime: '',
    venue: '',
    date: '',
    day: '',
    course: '',
    activity: '',
  });
  const [studentId, setStudentId] = useState('');
  const [authError, setAuthError] = useState('');
  const [semester, setSemester] = useState('2025-S1'); // Configurable semester

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

  // Fetch timetable and enrolled courses data
  useEffect(() => {
    if (!studentId) return;

    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const [timetableRes, enrolledRes] = await Promise.all([
          getTimetables(studentId, semester),
          getEnrolledCourses(studentId),
        ]);
        
        setTimetable(timetableRes.data || []);
        setEnrolledCourses(enrolledRes.data || []);
      } catch (error) {
        console.error('Error fetching timetable data:', error);
        //setError(error.response?.data?.message || 'Failed to load timetable data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [studentId, semester]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClass((prev) => ({ ...prev, [name]: value }));
    setError(''); // Clear error on input change
  };

  // Handle adding a new class
  const handleAddClass = async () => {
    // Validate all fields
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

    // Check if course is enrolled
    const selectedCourse = enrolledCourses.find(course => course.courseCode === newClass.course);
    if (!selectedCourse) {
      setError('You are not enrolled in this course.');
      return;
    }

    setAdding(true);
    try {
      const timetableDto = {
        studentId,
        semester,
        courseCode: newClass.course,
        courseName: selectedCourse.courseName,
        startTime: newClass.startTime,
        endTime: newClass.endTime,
        venue: newClass.venue,
        date: newClass.date,
        day: newClass.day,
        activity: newClass.activity,
      };

      const response = await addTimetable(timetableDto);
      setTimetable(prev => [...prev, response.data]);

      // Reset form
      setNewClass({
        startTime: '',
        endTime: '',
        venue: '',
        date: '',
        day: '',
        course: '',
        activity: '',
      });
    } catch (error) {
      console.error('Error adding class:', error);
      setError(error.response?.data?.message || 'Failed to add new class.');
    } finally {
      setAdding(false);
    }
  };

  // Group timetable by course for display
  const groupedTimetable = timetable.reduce((acc, entry) => {
    if (!acc[entry.courseCode]) {
      acc[entry.courseCode] = [];
    }
    acc[entry.courseCode].push(entry);
    return acc;
  }, {});

  // Loading or Error State
  if (loading || authError) {
    return (
      <DashboardLayout>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          {authError ? (
            <Alert severity="error" sx={{ mb: 3 }}>
              {authError}
            </Alert>
          ) : (
            <>
              <CircularProgress />
              <Typography variant="h6" color="textSecondary" sx={{ ml: 2 }}>
                Loading Timetable...
              </Typography>
            </>
          )}
        </Box>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Grid container spacing={3} sx={{ p: 3 }}>
        <Grid item xs={12}>
          <TitleBar title={`Timetable for Semester ${semester}`} />
        </Grid>

        {/* Error Display */}
        {error && (
          <Grid item xs={12}>
            <Alert severity="error" sx={{ mb: 3, borderRadius: '12px' }} onClose={() => setError('')}>
              {error}
            </Alert>
          </Grid>
        )}

        {/* Add New Class Form */}
        <Grid item xs={12}>
          <Card elevation={3} sx={{ borderRadius: '16px', backgroundColor: '#ffffff', overflow: 'hidden' }}>
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
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
                        <MenuItem key={day} value={day}>{day}</MenuItem>
                      ))}
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
                      {enrolledCourses.map(course => (
                        <MenuItem key={course.courseCode} value={course.courseCode}>
                          {course.courseCode} - {course.courseName}
                        </MenuItem>
                      ))}
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
                      {['Lecture', 'Lab', 'Tutorial'].map(activity => (
                        <MenuItem key={activity} value={activity}>{activity}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{ mt: 1, borderRadius: '8px', bgcolor: '#2596be', '&:hover': { bgcolor: '#1a6d8c' } }}
                      onClick={handleAddClass}
                      disabled={adding}
                    >
                      Add Class
                    </Button>
                    {adding && <CircularProgress size={24} />}
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Timetable Entries */}
        <Grid item xs={12}>
          <Card elevation={3} sx={{ borderRadius: '16px', backgroundColor: '#ffffff', overflow: 'hidden', mt: 4 }}>
            <CardContent sx={{ p: 4 }}>
              {timetable.length > 0 ? (
                <Box>
                  <Typography variant="h5" gutterBottom sx={{ color: '#094c50', fontWeight: 600, mb: 2 }}>
                    Scheduled Courses
                    <Chip
                      label={`${timetable.length} Classes`}
                      size="small"
                      color="primary"
                      sx={{ ml: 2, fontWeight: 500, bgcolor: '#2596be', color: '#fff' }}
                    />
                  </Typography>
                  <Divider sx={{ mb: 3, borderColor: '#e0e0e0' }} />
                  {Object.keys(groupedTimetable).map(courseCode => (
                    <Box key={courseCode} sx={{ mb: 4 }}>
                      <Typography variant="h6" gutterBottom sx={{ color: '#094c50', mb: 2 }}>
                        {courseCode} - {groupedTimetable[courseCode][0].courseName}
                      </Typography>
                      <Grid container spacing={3}>
                        {groupedTimetable[courseCode].map((entry, index) => (
                          <Grid item xs={12} sm={6} md={4} key={entry.enrollmentId || index}>
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
                                    {entry.courseCode} - {entry.courseName}
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
                                    {entry.startTime}-{entry.endTime}
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
                    </Box>
                  ))}
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
  );
};

export default Timetable;