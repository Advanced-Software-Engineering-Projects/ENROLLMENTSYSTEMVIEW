// import React, { useState, useEffect } from 'react';
// import { Box, Typography, Button, Alert, Grid, Select, MenuItem, Checkbox, ListItemText, Paper } from '@mui/material';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
// import TitleBar from '../../components/Titlebar/Titlebar';
// import dayjs from 'dayjs';
// import RotateLeftIcon from '@mui/icons-material/RotateLeft';

// const CourseManagement = ({ toggleTheme, mode }) => {
//   // Define courses array inside the component
//   const courses = [
//     { program: 'BNS', year: 1, code: 'CS111', name: 'Introduction to Computing Science' },
//     { program: 'BNS', year: 1, code: 'CS112', name: 'Data Structures & Algorithms' },
//     { program: 'BNS', year: 1, code: 'CS150', name: 'Introduction to Computer Networks & Security' },
//     { program: 'BNS', year: 1, code: 'MA111', name: 'Mathematics' },
//     { program: 'BNS', year: 1, code: 'MA161', name: 'Discrete Mathematics' },
//     { program: 'BNS', year: 1, code: 'MG101', name: 'Introduction to Management' },
//     { program: 'BNS', year: 1, code: 'ST131', name: 'Statistics' },
//     { program: 'BNS', year: 1, code: 'UU100A', name: 'Information Literacy' },
//     { program: 'BNS', year: 1, code: 'UU114', name: 'English for Academic Purposes' },
//     { program: 'BNS', year: 2, code: 'CS211', name: 'Computer Organisation' },
//     { program: 'BNS', year: 2, code: 'CS214', name: 'Design & Analysis of Algorithms' },
//     { program: 'BNS', year: 2, code: 'CS215', name: 'Computer Communications & Management' },
//     { program: 'BNS', year: 2, code: 'CS218', name: 'Mobile Computing' },
//     { program: 'BNS', year: 2, code: 'CS219', name: 'Cloud Computing' },
//     { program: 'BNS', year: 2, code: 'IS221', name: 'Information Systems I' },
//     { program: 'BNS', year: 2, code: 'IS222', name: 'Information Systems II' },
//     { program: 'BNS', year: 2, code: 'UU200', name: 'Ethics & Governance' },
//     { program: 'BNS', year: 2, code: 'CS001', name: 'Foundations of Professional Practice' },
//     { program: 'BNS', year: 3, code: 'CS310', name: 'Computer Networks' },
//     { program: 'BNS', year: 3, code: 'CS311', name: 'Operating Systems' },
//     { program: 'BNS', year: 3, code: 'CS317', name: 'Computer & Network Security' },
//     { program: 'BNS', year: 3, code: 'CS324', name: 'Distributed Computing' },
//     { program: 'BNS', year: 3, code: 'CS350', name: 'Wireless Networks' },
//     { program: 'BNS', year: 3, code: 'CS351', name: 'Network Design & Administration' },
//     { program: 'BNS', year: 3, code: 'CS352', name: 'IT Infrastructure & Security' },
//     { program: 'BNS', year: 3, code: 'IS333', name: 'Project Management' },
//     { program: 'BNS', year: 4, code: 'CS403', name: 'Cybercrime & Digital Forensics' },
//     { program: 'BNS', year: 4, code: 'CS412', name: 'Advanced Networks' },
//     { program: 'BNS', year: 4, code: 'CS424', name: 'Network Security & Forensics' },
//     { program: 'BNS', year: 4, code: 'CS400', name: 'Industry Experience Project (IEP)' },
//     { program: 'BSE', year: 1, code: 'CS111', name: 'Introduction to Computing Science' },
//     { program: 'BSE', year: 1, code: 'CS112', name: 'Data Structures & Algorithms' },
//     { program: 'BSE', year: 1, code: 'CS140', name: 'Introduction to Software Engineering' },
//     { program: 'BSE', year: 1, code: 'MA111', name: 'Mathematics' },
//     { program: 'BSE', year: 1, code: 'MA161', name: 'Discrete Mathematics' },
//     { program: 'BSE', year: 1, code: 'MG101', name: 'Introduction to Management' },
//     { program: 'BSE', year: 1, code: 'ST131', name: 'Statistics' },
//     { program: 'BSE', year: 1, code: 'UU100A', name: 'Information Literacy' },
//     { program: 'BSE', year: 1, code: 'UU114', name: 'English for Academic Purposes' },
//     { program: 'BSE', year: 2, code: 'CS211', name: 'Computer Organisation' },
//     { program: 'BSE', year: 2, code: 'CS214', name: 'Design & Analysis of Algorithms' },
//     { program: 'BSE', year: 2, code: 'CS218', name: 'Mobile Computing' },
//     { program: 'BSE', year: 2, code: 'CS219', name: 'Cloud Computing' },
//     { program: 'BSE', year: 2, code: 'CS230', name: 'Requirements Engineering' },
//     { program: 'BSE', year: 2, code: 'CS241', name: 'Software Design & Implementation' },
//     { program: 'BSE', year: 2, code: 'IS221', name: 'Information Systems I' },
//     { program: 'BSE', year: 2, code: 'IS222', name: 'Information Systems II' },
//     { program: 'BSE', year: 2, code: 'UU200', name: 'Ethics & Governance' },
//     { program: 'BSE', year: 2, code: 'CS001', name: 'Foundations of Professional Practice' },
//     { program: 'BSE', year: 3, code: 'CS310', name: 'Computer Networks' },
//     { program: 'BSE', year: 3, code: 'CS311', name: 'Operating Systems' },
//     { program: 'BSE', year: 3, code: 'CS324', name: 'Distributed Computing' },
//     { program: 'BSE', year: 3, code: 'CS341', name: 'Software Quality Assurance & Testing' },
//     { program: 'BSE', year: 3, code: 'CS352', name: 'IT Infrastructure & Security' },
//     { program: 'BSE', year: 3, code: 'IS314', name: 'Business Process Analysis' },
//     { program: 'BSE', year: 3, code: 'IS328', name: 'Software Project Management' },
//     { program: 'BSE', year: 3, code: 'IS333', name: 'Project Management' },
//     { program: 'BSE', year: 4, code: 'CS415', name: 'Software Engineering Project' },
//     { program: 'BSE', year: 4, code: 'CS403', name: 'Cybercrime & Digital Forensics' },
//     { program: 'BSE', year: 4, code: 'CS412', name: 'Advanced Networks' },
//     { program: 'BSE', year: 4, code: 'CS424', name: 'Network Security & Forensics' },
//     { program: 'BSE', year: 4, code: 'CS400', name: 'Industry Experience Project (IEP)' },
//   ];

//   // Define mock data inside the component
//   const totalRegistrations = 50; // Mock data
//   const totalDropped = 5; // Mock data

//   const [dates, setDates] = useState({ startDate: '', startTime: '', endDate: '', endTime: '' });
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [selectedCourses, setSelectedCourses] = useState([]);
//   const [selectedCloseCourses, setSelectedCloseCourses] = useState([]);
//   const [openRegistrations, setOpenRegistrations] = useState([]);
//   const [closedRegistrations, setClosedRegistrations] = useState([]);

//   // Automatically close registrations when end time is reached
//   useEffect(() => {
//     const checkExpiredRegistrations = () => {
//       const now = dayjs();
//       const expired = openRegistrations.filter((reg) => {
//         const endDateTime = dayjs(`${reg.endDate} ${reg.endTime}`, 'YYYY-MM-DD h:mm A');
//         return now.isAfter(endDateTime);
//       });

//       if (expired.length > 0) {
//         setOpenRegistrations((prev) =>
//           prev.filter((reg) => !expired.some((exp) => exp.courses.join(',') === reg.courses.join(',')))
//         );
//         setClosedRegistrations((prev) => [
//           ...prev,
//           ...expired.map((reg) => ({
//             courses: reg.courses,
//             closedAt: now.format('YYYY-MM-DD h:mm A'),
//           })),
//         ]);
//         setMessage(`Registration closed automatically for ${expired.map((reg) => reg.courses.join(', ')).join(', ')}`);
//       }
//     };

//     const interval = setInterval(checkExpiredRegistrations, 60000); // Check every minute
//     return () => clearInterval(interval);
//   }, [openRegistrations]);

//   const handleOpen = () => {
//     setLoading(true);
//     setTimeout(() => {
//       if (
//         dates.startDate &&
//         dates.endDate &&
//         dates.startTime &&
//         dates.endTime &&
//         selectedCourses &&
//         selectedCourses.length > 0
//       ) {
//         const startDateTime = dayjs(`${dates.startDate} ${dates.startTime}`, 'YYYY-MM-DD h:mm A');
//         const endDateTime = dayjs(`${dates.endDate} ${dates.endTime}`, 'YYYY-MM-DD h:mm A');
//         if (endDateTime.isBefore(startDateTime)) {
//           setMessage('Error: End date/time must be after start date/time');
//           setLoading(false);
//           return;
//         }
//         if (endDateTime.isBefore(dayjs())) {
//           setMessage('Error: End date/time cannot be in the past');
//           setLoading(false);
//           return;
//         }
//         setOpenRegistrations((prev) => [
//           ...prev,
//           {
//             courses: selectedCourses,
//             startDate: dates.startDate,
//             startTime: dates.startTime,
//             endDate: dates.endDate,
//             endTime: dates.endTime,
//           },
//         ]);
//         setMessage(
//           `Registration period opened successfully for ${selectedCourses.join(', ')} from ${dates.startDate} ${dates.startTime} to ${dates.endDate} ${dates.endTime}`
//         );
//         handleReset();
//       } else {
//         setMessage('Error: Please provide both dates, times, and select at least one course');
//       }
//       setLoading(false);
//     }, 1000);
//   };

//   const handleClose = () => {
//     setLoading(true);
//     setTimeout(() => {
//       if (selectedCloseCourses.length > 0) {
//         const closed = openRegistrations.filter((reg) =>
//           reg.courses.some((course) => selectedCloseCourses.includes(course))
//         );
//         const remaining = openRegistrations.filter(
//           (reg) => !reg.courses.some((course) => selectedCloseCourses.includes(course))
//         );
//         setOpenRegistrations(remaining);
//         setClosedRegistrations((prev) => [
//           ...prev,
//           ...closed.map((reg) => ({
//             courses: reg.courses.filter((course) => selectedCloseCourses.includes(course)),
//             closedAt: dayjs().format('YYYY-MM-DD h:mm A'),
//           })),
//         ]);
//         setMessage(`Registration closed successfully for ${selectedCloseCourses.join(', ')}`);
//         setSelectedCloseCourses([]);
//       } else {
//         setMessage('Error: Please select at least one course to close registration');
//       }
//       setLoading(false);
//     }, 1000);
//   };

//   const handleReset = () => {
//     setLoading(true);
//     setTimeout(() => {
//       setDates({ startDate: '', startTime: '', endDate: '', endTime: '' });
//       setSelectedCourses([]);
//       setMessage('');
//       setLoading(false);
//     }, 500);
//   };

//   const handleCourseChange = (event) => {
//     const value = event.target.value;
//     const openCourses = openRegistrations.flatMap((reg) => reg.courses);
//     if (value.includes('select-all')) {
//       const availableCourses = courses
//         .filter((course) => !openCourses.includes(course.code))
//         .map((course) => course.code);
//       setSelectedCourses(
//         value.includes('select-all') && selectedCourses.length !== availableCourses.length
//           ? availableCourses
//           : []
//       );
//     } else {
//       setSelectedCourses(value.filter((course) => !openCourses.includes(course)));
//     }
//   };

//   const handleCloseCourseChange = (event) => {
//     const value = event.target.value;
//     if (value.includes('select-all')) {
//       const allOpenCourses = openRegistrations.flatMap((reg) => reg.courses);
//       setSelectedCloseCourses(
//         value.includes('select-all') && selectedCloseCourses.length !== allOpenCourses.length
//           ? allOpenCourses
//           : []
//       );
//     } else {
//       setSelectedCloseCourses(value);
//     }
//   };

//   const openCourses = openRegistrations.flatMap((reg) => reg.courses);

//   return (
//     <DashboardLayout toggleTheme={toggleTheme} mode={mode}>
//       <Grid container spacing={2}>
//         <Grid item xs={12}>
//           <TitleBar title="Course Management" />
//         </Grid>
//         <Grid item xs={12}>
//           {message && (
//             <Alert
//               severity={message.includes('Error') ? 'error' : 'success'}
//               sx={{ mb: 2 }}
//               onClose={() => setMessage('')}
//             >
//               {message}
//             </Alert>
//           )}
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <Paper elevation={3} sx={{ p: 3, borderRadius: '20px', textAlign: 'center' }}>
//             <Typography variant="h6" sx={{ fontWeight: 'medium', mb: 1 }}>
//               Total Registrations
//             </Typography>
//             <Typography variant="h4" color="#094c50" sx={{ fontWeight: 700 }}>
//               {totalRegistrations}
//             </Typography>
//           </Paper>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <Paper elevation={3} sx={{ p: 3, borderRadius: '20px', textAlign: 'center' }}>
//             <Typography variant="h6" sx={{ fontWeight: 'medium', mb: 1 }}>
//               Total Dropped Courses
//             </Typography>
//             <Typography variant="h4" sx={{ fontWeight: 700 }}>
//               {totalDropped}
//             </Typography>
//           </Paper>
//         </Grid>
//         <Grid item xs={12}>
//           <Grid container spacing={2}>
//             <Grid item xs={12} md={6}>
//               <Paper elevation={2} sx={{ p: 2, borderRadius: '8px' }}>
//                 <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium', textAlign: 'center' }}>
//                   Close Open Registration
//                 </Typography>
//                 <Box sx={{ mb: 2 }}>
//                   <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'medium' }}>
//                     Select Open Courses
//                   </Typography>
//                   <Select
//                     multiple
//                     fullWidth
//                     value={selectedCloseCourses}
//                     onChange={handleCloseCourseChange}
//                     displayEmpty
//                     disabled={loading || openRegistrations.length === 0}
//                     renderValue={(selected) =>
//                       selected.length === 0 ? 'No Open Courses' : selected.join(', ')
//                     }
//                   >
//                     <MenuItem value="select-all">
//                       <Checkbox
//                         checked={
//                           selectedCloseCourses.length ===
//                           openRegistrations.flatMap((reg) => reg.courses).length
//                         }
//                       />
//                       <ListItemText primary="Select All" />
//                     </MenuItem>
//                     {openRegistrations.flatMap((reg) =>
//                       reg.courses.map((course) => (
//                         <MenuItem key={course} value={course}>
//                           <Checkbox checked={selectedCloseCourses.includes(course)} />
//                           <ListItemText
//                             primary={`${course} (Open until ${reg.endDate} ${reg.endTime})`}
//                           />
//                         </MenuItem>
//                       ))
//                     )}
//                   </Select>
//                 </Box>
//                 <Button
//                   variant="contained"
//                   onClick={handleClose}
//                   disabled={loading || selectedCloseCourses.length === 0}
//                   sx={{ bgcolor: '#094C50', '&:hover': { bgcolor: '#0D7075' }, width: '100%' }}
//                 >
//                   Close Registration
//                 </Button>
//               </Paper>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <Paper elevation={2} sx={{ p: 2, borderRadius: '8px' }}>
//                 <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium', textAlign: 'center' }}>
//                   Closed Registrations
//                 </Typography>
//                 {closedRegistrations.length === 0 ? (
//                   <Typography variant="body1" sx={{ textAlign: 'center', color: 'text.secondary' }}>
//                     No courses have been closed.
//                   </Typography>
//                 ) : (
//                   <Box sx={{ maxHeight: '400px', overflowY: 'auto' }}>
//                     {closedRegistrations.map((reg, index) => (
//                       <Box key={index} sx={{ mb: 1 }}>
//                         <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
//                           Courses: {reg.courses.join(', ')}
//                         </Typography>
//                         <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//                           Closed at: {reg.closedAt}
//                         </Typography>
//                       </Box>
//                     ))}
//                   </Box>
//                 )}
//               </Paper>
//             </Grid>
//           </Grid>
//         </Grid>
//         <Grid item xs={12}>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <Paper elevation={2} sx={{ p: 2, borderRadius: '8px' }}>
//                 <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium', textAlign: 'center' }}>
//                   Open Course Registration
//                 </Typography>
//                 <Box sx={{ mb: 2 }}>
//                   <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'medium' }}>
//                     Select Courses
//                   </Typography>
//                   <Select
//                     multiple
//                     fullWidth
//                     value={selectedCourses}
//                     onChange={handleCourseChange}
//                     displayEmpty
//                     disabled={loading}
//                     renderValue={(selected) =>
//                       selected.length === 0
//                         ? 'Select Courses'
//                         : selected.length === courses.length - openCourses.length
//                         ? 'All Available Courses'
//                         : selected.join(', ')
//                     }
//                   >
//                     <MenuItem value="select-all">
//                       <Checkbox
//                         checked={
//                           selectedCourses.length ===
//                           courses.filter((course) => !openCourses.includes(course.code)).length
//                         }
//                       />
//                       <ListItemText primary="Select All" />
//                     </MenuItem>
//                     {courses.map((course) => (
//                       <MenuItem
//                         key={`${course.program}-${course.code}`}
//                         value={course.code}
//                         disabled={openCourses.includes(course.code)}
//                       >
//                         <Checkbox checked={selectedCourses.includes(course.code)} />
//                         <ListItemText
//                           primary={`${course.program} Year ${course.year}: ${course.code} – ${course.name}`}
//                         />
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </Box>
//                 <LocalizationProvider dateAdapter={AdapterDayjs}>
//                   <Grid container spacing={2} sx={{ mb: 2 }}>
//                     {/* Row 1: Start Date and Start Time */}
//                     <Grid container item xs={12} spacing={2}>
//                       <Grid item xs={12} sm={6}>
//                         <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'medium' }}>
//                           Start Date
//                         </Typography>
//                         <Calendar
//                           value={dates.startDate ? new Date(dates.startDate) : null}
//                           onChange={(newValue) =>
//                             setDates({
//                               ...dates,
//                               startDate: newValue ? dayjs(newValue).format('YYYY-MM-DD') : '',
//                             })
//                           }
//                           disabled={loading}
//                           className="custom-calendar"
//                           style={{
//                             border: '1px solid #e0e0e0',
//                             borderRadius: '8px',
//                             padding: '8px',
//                             backgroundColor: '#fff',
//                             boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
//                             maxWidth: '100%',
//                             width: '100%',
//                             fontSize: '0.9em',
//                           }}
//                         />
//                       </Grid>
//                       <Grid item xs={12} sm={6}>
//                         <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'medium' }}>
//                           Start Time
//                         </Typography>
//                         <StaticTimePicker
//                           orientation="landscape"
//                           value={dates.startTime ? dayjs(dates.startTime, 'h:mm A') : null}
//                           onChange={(newValue) =>
//                             setDates({
//                               ...dates,
//                               startTime: newValue ? newValue.format('h:mm A') : '',
//                             })
//                           }
//                           disabled={loading}
//                           ampm
//                         />
//                       </Grid>
//                     </Grid>
//                     {/* Row 2: End Date and End Time */}
//                     <Grid container item xs={12} spacing={2}>
//                       <Grid item xs={12} sm={6}>
//                         <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'medium' }}>
//                           End Date
//                         </Typography>
//                         <Calendar
//                           value={dates.endDate ? new Date(dates.endDate) : null}
//                           onChange={(newValue) =>
//                             setDates({
//                               ...dates,
//                               endDate: newValue ? dayjs(newValue).format('YYYY-MM-DD') : '',
//                             })
//                           }
//                           disabled={loading}
//                           className="custom-calendar"
//                           style={{
//                             border: '1px solid #e0e0e0',
//                             borderRadius: '8px',
//                             padding: '8px',
//                             backgroundColor: '#fff',
//                             boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
//                             maxWidth: '100%',
//                             width: '100%',
//                             fontSize: '0.9em',
//                           }}
//                         />
//                       </Grid>
//                       <Grid item xs={12} sm={6}>
//                         <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'medium' }}>
//                           End Time
//                         </Typography>
//                         <StaticTimePicker
//                           orientation="landscape"
//                           value={dates.endTime ? dayjs(dates.endTime, 'h:mm A') : null}
//                           onChange={(newValue) =>
//                             setDates({
//                               ...dates,
//                               endTime: newValue ? newValue.format('h:mm A') : '',
//                             })
//                           }
//                           disabled={loading}
//                           ampm
//                         />
//                       </Grid>
//                     </Grid>
//                   </Grid>
//                 </LocalizationProvider>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
//                   <Button
//                     variant="contained"
//                     onClick={handleOpen}
//                     disabled={loading}
//                     sx={{ bgcolor: '#094C50', '&:hover': { bgcolor: '#0D7075' } }}
//                   >
//                     Open Registration
//                   </Button>
//                   <Button
//                     variant="outlined"
//                     onClick={handleReset}
//                     disabled={loading}
//                     sx={{ borderColor: '#094C50', color: '#094C50' }}
//                   >
//                     <RotateLeftIcon />
//                   </Button>
//                 </Box>
//               </Paper>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//       <style jsx global>{`
//         .custom-calendar {
//           border: none !important;
//         }
//         .custom-calendar .react-calendar__tile--active {
//           background: #094C50 !important;
//           color: white !important;
//         }
//         .custom-calendar .react-calendar__tile--now {
//           background: #e0f7fa !important;
//         }
//         .custom-calendar .react-calendar__navigation button {
//           color: #094C50 !important;
//           fontWeight: 500 !important;
//         }
//         .custom-calendar .react-calendar__tile:disabled {
//           background: #f0f0f0 !important;
//           color: #bbb !important;
//         }
//       `}</style>
//     </DashboardLayout>
//   );
// };

// export default CourseManagement;

import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Alert, Grid, Select, MenuItem, Checkbox, ListItemText, Paper } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
import TitleBar from '../../components/Titlebar/Titlebar';
import dayjs from 'dayjs';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import {
  openCourseRegistration,
  closeCourseRegistration,
  getRegistrationMetrics,
} from '../../Endpoints/AdminEndpoints';

const CourseManagement = ({ toggleTheme, mode }) => {
  // Define courses array inside the component
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

  const [dates, setDates] = useState({ startDate: '', startTime: '', endDate: '', endTime: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedCloseCourses, setSelectedCloseCourses] = useState([]);
  const [openRegistrations, setOpenRegistrations] = useState([]);
  const [closedRegistrations, setClosedRegistrations] = useState([]);
  const [metrics, setMetrics] = useState({ totalRegistrations: 0, totalDropped: 0 });

  // Fetch registration metrics on mount
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        const response = await getRegistrationMetrics();
        setMetrics({
          totalRegistrations: response.data.totalRegistrations || 0,
          totalDropped: response.data.totalDropped || 0,
        });
      } catch (error) {
        console.error('Error fetching registration metrics:', error);
        //setMessage('Error: Failed to load registration metrics');
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  // Automatically close registrations when end time is reached
  useEffect(() => {
    const checkExpiredRegistrations = () => {
      const now = dayjs();
      const expired = openRegistrations.filter((reg) => {
        const endDateTime = dayjs(`${reg.endDate} ${reg.endTime}`, 'YYYY-MM-DD h:mm A');
        return now.isAfter(endDateTime);
      });

      if (expired.length > 0) {
        setOpenRegistrations((prev) =>
          prev.filter((reg) => !expired.some((exp) => exp.courses.join(',') === reg.courses.join(',')))
        );
        setClosedRegistrations((prev) => [
          ...prev,
          ...expired.map((reg) => ({
            courses: reg.courses,
            closedAt: now.format('YYYY-MM-DD h:mm A'),
          })),
        ]);
        setMessage(`Registration closed automatically for ${expired.map((reg) => reg.courses.join(', ')).join(', ')}`);
      }
    };

    const interval = setInterval(checkExpiredRegistrations, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [openRegistrations]);

  const handleOpen = async () => {
    setLoading(true);
    try {
      if (
        dates.startDate &&
        dates.endDate &&
        dates.startTime &&
        dates.endTime &&
        selectedCourses &&
        selectedCourses.length > 0
      ) {
        const startDateTime = dayjs(`${dates.startDate} ${dates.startTime}`, 'YYYY-MM-DD h:mm A');
        const endDateTime = dayjs(`${dates.endDate} ${dates.endTime}`, 'YYYY-MM-DD h:mm A');
        if (endDateTime.isBefore(startDateTime)) {
          setMessage('Error: End date/time must be after start date/time');
          return;
        }
        if (endDateTime.isBefore(dayjs())) {
          setMessage('Error: End date/time cannot be in the past');
          return;
        }

        const courseRegistrationDto = {
          courses: selectedCourses,
          startDate: startDateTime.format('YYYY-MM-DD HH:mm:ss'),
          endDate: endDateTime.format('YYYY-MM-DD HH:mm:ss'),
        };

        await openCourseRegistration(courseRegistrationDto);

        setOpenRegistrations((prev) => [
          ...prev,
          {
            courses: selectedCourses,
            startDate: dates.startDate,
            startTime: dates.startTime,
            endDate: dates.endDate,
            endTime: dates.endTime,
          },
        ]);
        setMessage(
          `Registration period opened successfully for ${selectedCourses.join(', ')} from ${dates.startDate} ${dates.startTime} to ${dates.endDate} ${dates.endTime}`
        );
        handleReset();
      } else {
        setMessage('Error: Please provide both dates, times, and select at least one course');
      }
    } catch (error) {
      console.error('Error opening registration:', error);
      setMessage(error.response?.data?.message || 'Error: Failed to open registration');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = async () => {
    setLoading(true);
    try {
      if (selectedCloseCourses.length > 0) {
        const courseCloseDto = { courseCodes: selectedCloseCourses };
        await closeCourseRegistration(courseCloseDto);

        const closed = openRegistrations.filter((reg) =>
          reg.courses.some((course) => selectedCloseCourses.includes(course))
        );
        const remaining = openRegistrations.filter(
          (reg) => !reg.courses.some((course) => selectedCloseCourses.includes(course))
        );
        setOpenRegistrations(remaining);
        setClosedRegistrations((prev) => [
          ...prev,
          ...closed.map((reg) => ({
            courses: reg.courses.filter((course) => selectedCloseCourses.includes(course)),
            closedAt: dayjs().format('YYYY-MM-DD h:mm A'),
          })),
        ]);
        setMessage(`Registration closed successfully for ${selectedCloseCourses.join(', ')}`);
        setSelectedCloseCourses([]);
      } else {
        setMessage('Error: Please select at least one course to close registration');
      }
    } catch (error) {
      console.error('Error closing registration:', error);
      setMessage(error.response?.data?.message || 'Error: Failed to close registration');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setLoading(true);
    setTimeout(() => {
      setDates({ startDate: '', startTime: '', endDate: '', endTime: '' });
      setSelectedCourses([]);
      setMessage('');
      setLoading(false);
    }, 500);
  };

  const handleCourseChange = (event) => {
    const value = event.target.value;
    const openCourses = openRegistrations.flatMap((reg) => reg.courses);
    if (value.includes('select-all')) {
      const availableCourses = courses
        .filter((course) => !openCourses.includes(course.code))
        .map((course) => course.code);
      setSelectedCourses(
        value.includes('select-all') && selectedCourses.length !== availableCourses.length
          ? availableCourses
          : []
      );
    } else {
      setSelectedCourses(value.filter((course) => !openCourses.includes(course)));
    }
  };

  const handleCloseCourseChange = (event) => {
    const value = event.target.value;
    if (value.includes('select-all')) {
      const allOpenCourses = openRegistrations.flatMap((reg) => reg.courses);
      setSelectedCloseCourses(
        value.includes('select-all') && selectedCloseCourses.length !== allOpenCourses.length
          ? allOpenCourses
          : []
      );
    } else {
      setSelectedCloseCourses(value);
    }
  };

  const openCourses = openRegistrations.flatMap((reg) => reg.courses);

  return (
    <DashboardLayout toggleTheme={toggleTheme} mode={mode}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TitleBar title="Course Management" />
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
            <Typography variant="h6" sx={{ fontWeight: 'medium', mb: 1 }}>
              Total Registrations
            </Typography>
            <Typography variant="h4" color="#094c50" sx={{ fontWeight: 700 }}>
              {metrics.totalRegistrations}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: '20px', textAlign: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 'medium', mb: 1 }}>
              Total Dropped Courses
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {metrics.totalDropped}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Paper elevation={2} sx={{ p: 2, borderRadius: '8px' }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium', textAlign: 'center' }}>
                  Close Open Registration
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'medium' }}>
                    Select Open Courses
                  </Typography>
                  <Select
                    multiple
                    fullWidth
                    value={selectedCloseCourses}
                    onChange={handleCloseCourseChange}
                    displayEmpty
                    disabled={loading || openRegistrations.length === 0}
                    renderValue={(selected) =>
                      selected.length === 0 ? 'No Open Courses' : selected.join(', ')
                    }
                  >
                    <MenuItem value="select-all">
                      <Checkbox
                        checked={
                          selectedCloseCourses.length ===
                          openRegistrations.flatMap((reg) => reg.courses).length
                        }
                      />
                      <ListItemText primary="Select All" />
                    </MenuItem>
                    {openRegistrations.flatMap((reg) =>
                      reg.courses.map((course) => (
                        <MenuItem key={course} value={course}>
                          <Checkbox checked={selectedCloseCourses.includes(course)} />
                          <ListItemText
                            primary={`${course} (Open until ${reg.endDate} ${reg.endTime})`}
                          />
                        </MenuItem>
                      ))
                    )}
                  </Select>
                </Box>
                <Button
                  variant="contained"
                  onClick={handleClose}
                  disabled={loading || selectedCloseCourses.length === 0}
                  sx={{ bgcolor: '#094C50', '&:hover': { bgcolor: '#0D7075' }, width: '100%' }}
                >
                  Close Registration
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={2} sx={{ p: 2, borderRadius: '8px' }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium', textAlign: 'center' }}>
                  Closed Registrations
                </Typography>
                {closedRegistrations.length === 0 ? (
                  <Typography variant="body1" sx={{ textAlign: 'center', color: 'text.secondary' }}>
                    No courses have been closed.
                  </Typography>
                ) : (
                  <Box sx={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {closedRegistrations.map((reg, index) => (
                      <Box key={index} sx={{ mb: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                          Courses: {reg.courses.join(', ')}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          Closed at: {reg.closedAt}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper elevation={2} sx={{ p: 2, borderRadius: '8px' }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium', textAlign: 'center' }}>
                  Open Course Registration
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'medium' }}>
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
                        : selected.length === courses.length - openCourses.length
                        ? 'All Available Courses'
                        : selected.join(', ')
                    }
                  >
                    <MenuItem value="select-all">
                      <Checkbox
                        checked={
                          selectedCourses.length ===
                          courses.filter((course) => !openCourses.includes(course.code)).length
                        }
                      />
                      <ListItemText primary="Select All" />
                    </MenuItem>
                    {courses.map((course) => (
                      <MenuItem
                        key={`${course.program}-${course.code}`}
                        value={course.code}
                        disabled={openCourses.includes(course.code)}
                      >
                        <Checkbox checked={selectedCourses.includes(course.code)} />
                        <ListItemText
                          primary={`${course.program} Year ${course.year}: ${course.code} – ${course.name}`}
                        />
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Grid container spacing={2} sx={{ mb: 2 }}>
                    {/* Row 1: Start Date and Start Time */}
                    <Grid container item xs={12} spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'medium' }}>
                          Start Date
                        </Typography>
                        <Calendar
                          value={dates.startDate ? new Date(dates.startDate) : null}
                          onChange={(newValue) =>
                            setDates({
                              ...dates,
                              startDate: newValue ? dayjs(newValue).format('YYYY-MM-DD') : '',
                            })
                          }
                          disabled={loading}
                          className="custom-calendar"
                          style={{
                            border: '1px solid #e0e0e0',
                            borderRadius: '8px',
                            padding: '8px',
                            backgroundColor: '#fff',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            maxWidth: '100%',
                            width: '100%',
                            fontSize: '0.9em',
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'medium' }}>
                          Start Time
                        </Typography>
                        <StaticTimePicker
                          orientation="landscape"
                          value={dates.startTime ? dayjs(dates.startTime, 'h:mm A') : null}
                          onChange={(newValue) =>
                            setDates({
                              ...dates,
                              startTime: newValue ? newValue.format('h:mm A') : '',
                            })
                          }
                          disabled={loading}
                          ampm
                        />
                      </Grid>
                    </Grid>
                    {/* Row 2: End Date and End Time */}
                    <Grid container item xs={12} spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'medium' }}>
                          End Date
                        </Typography>
                        <Calendar
                          value={dates.endDate ? new Date(dates.endDate) : null}
                          onChange={(newValue) =>
                            setDates({
                              ...dates,
                              endDate: newValue ? dayjs(newValue).format('YYYY-MM-DD') : '',
                            })
                          }
                          disabled={loading}
                          className="custom-calendar"
                          style={{
                            border: '1px solid #e0e0e0',
                            borderRadius: '8px',
                            padding: '8px',
                            backgroundColor: '#fff',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            maxWidth: '100%',
                            width: '100%',
                            fontSize: '0.9em',
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'medium' }}>
                          End Time
                        </Typography>
                        <StaticTimePicker
                          orientation="landscape"
                          value={dates.endTime ? dayjs(dates.endTime, 'h:mm A') : null}
                          onChange={(newValue) =>
                            setDates({
                              ...dates,
                              endTime: newValue ? newValue.format('h:mm A') : '',
                            })
                          }
                          disabled={loading}
                          ampm
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </LocalizationProvider>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                  <Button
                    variant="contained"
                    onClick={handleOpen}
                    disabled={loading}
                    sx={{ bgcolor: '#094C50', '&:hover': { bgcolor: '#0D7075' } }}
                  >
                    Open Registration
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleReset}
                    disabled={loading}
                    sx={{ borderColor: '#094C50', color: '#094C50' }}
                  >
                    <RotateLeftIcon />
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <style jsx global>{`
        .custom-calendar {
          border: none !important;
        }
        .custom-calendar .react-calendar__tile--active {
          background: #094C50 !important;
          color: white !important;
        }
        .custom-calendar .react-calendar__tile--now {
          background: #e0f7fa !important;
        }
        .custom-calendar .react-calendar__navigation button {
          color: #094C50 !important;
          fontWeight: 500 !important;
        }
        .custom-calendar .react-calendar__tile:disabled {
          background: #f0f0f0 !important;
          color: #bbb !important;
        }
      `}</style>
    </DashboardLayout>
  );
};

export default CourseManagement;