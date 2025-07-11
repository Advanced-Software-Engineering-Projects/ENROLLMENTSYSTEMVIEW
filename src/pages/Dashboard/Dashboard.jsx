// import React, { useEffect, useState } from 'react';
// import {
//   Card,
//   CardContent,
//   Typography,
//   Box,
//   Paper,
//   styled,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
// } from '@mui/material';
// import Grid from '@mui/material/Grid';
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import moment from 'moment';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import { useNavigate } from 'react-router-dom';
// import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
// import { Doughnut, Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Filler,
//   Title,
// } from 'chart.js';
// import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// import FunctionsIcon from '@mui/icons-material/Functions';
// import Lottie from 'lottie-react';
// import LoadingAnimation from '../../assets/Animations/LoadingPage/LoadingAnimation.json'; // Adjust path as needed

// ChartJS.register(
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Filler,
//   Title
// );

// // Styled components for industrial look
// const IndustrialPaper = styled(Paper)(({ theme }) => ({
//   background: 'linear-gradient(145deg, #2A2E35 0%, #1A2027 100%)',
//   border: '1px solid #3A3F47',
//   borderRadius: '12px',
//   boxShadow: theme.shadows[6],
//   transition: 'transform 0.2s ease, box-shadow 0.2s ease',
//   '&:hover': {
//     transform: 'translateY(-4px)',
//     boxShadow: theme.shadows[8],
//   },
// }));

// const MetricCard = styled(Card)(({ theme }) => ({
//   background: '#252B32',
//   color: '#FFFFFF',
//   borderRadius: '10px',
//   border: '1px solid #4A4F55',
//   boxShadow: theme.shadows[4],
// }));

// // Mock data
// const mockEnrolledCourses = [
//   { courseId: 1, courseCode: 'CS111', courseName: 'Introduction to Programming', dueDate: '2025-06-01' },
//   { courseId: 2, courseCode: 'MA111', courseName: 'Calculus I', dueDate: '2025-06-05' },
//   { courseId: 3, courseCode: 'ST131', courseName: 'Statistics I', dueDate: '2025-06-10' },
// ];

// const mockCompletedCourses = { count: 4 };
// const mockTotalCompletedCourses = { count: 12 };
// const mockGpaData = [
//   { semester: 'Semester 1', gpa: 2.5 },
//   { semester: 'Semester 2', gpa: 3.0 },
//   { semester: 'Semester 3', gpa: 3.5 },
//   { semester: 'Semester 4', gpa: 4.0 },
//   { semester: 'Semester 5', gpa: 4.5 },
// ];

// const localizer = momentLocalizer(moment);

// // Custom Toolbar Component
// const CustomToolbar = ({ label, onNavigate, onView }) => {
//   return (
//     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
//       <Typography variant="h6" sx={{ color: '#FFFFFF' }}>
//         {label}
//       </Typography>
//       <Box sx={{ display: 'flex', gap: 1 }}>
//         <button
//           style={{
//             background: 'transparent',
//             border: 'none',
//             color: '#FFFFFF',
//             cursor: 'pointer',
//             padding: '5px 10px',
//             fontSize: '1rem',
//           }}
//           onMouseEnter={(e) => (e.target.style.color = '#094c50')}
//           onMouseLeave={(e) => (e.target.style.color = '#FFFFFF')}
//           onClick={() => onNavigate('PREV')}
//         >
//           Back
//         </button>
//         <button
//           style={{
//             background: 'transparent',
//             border: 'none',
//             color: '#FFFFFF',
//             cursor: 'pointer',
//             padding: '5px 10px',
//             fontSize: '1rem',
//           }}
//           onMouseEnter={(e) => (e.target.style.color = '#094c50')}
//           onMouseLeave={(e) => (e.target.style.color = '#FFFFFF')}
//           onClick={() => onNavigate('TODAY')}
//         >
//           Today
//         </button>
//         <button
//           style={{
//             background: 'transparent',
//             border: 'none',
//             color: '#FFFFFF',
//             cursor: 'pointer',
//             padding: '5px 10px',
//             fontSize: '1rem',
//           }}
//           onMouseEnter={(e) => (e.target.style.color = '#094c50')}
//           onMouseLeave={(e) => (e.target.style.color = '#FFFFFF')}
//           onClick={() => onNavigate('NEXT')}
//         >
//           Next
//         </button>
//       </Box>
//     </Box>
//   );
// };

// const Dashboard = () => {
//   const [enrolledCourses, setEnrolledCourses] = useState([]);
//   const [completedCourses, setCompletedCourses] = useState(0);
//   const [totalCompletedCourses, setTotalCompletedCourses] = useState(0);
//   const [gpaData, setGpaData] = useState([]);
//   const [loading, setLoading] = useState(true); // Initialize as true to show loading immediately
//   const navigate = useNavigate();

//   // Get the current year
//   const currentYear = new Date().getFullYear(); // This will return 2025

//   useEffect(() => {
//     // Simulate fetching data with a minimum 2-second delay
//     const timer = setTimeout(() => {
//       setEnrolledCourses(mockEnrolledCourses);
//       setCompletedCourses(mockCompletedCourses.count);
//       setTotalCompletedCourses(mockTotalCompletedCourses.count);
//       setGpaData(mockGpaData);
//       setLoading(false);
//     }, 3000); // 3-second delay
//     return () => clearTimeout(timer); // Cleanup timeout on unmount
//   }, []);

//   if (loading)
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//         <Lottie animationData={LoadingAnimation} style={{ width: 500, height: 300 }} />
//       </Box>
//     );

//   const courseCompletionData = {
//     labels: ['Completed', 'Remaining'],
//     datasets: [
//       {
//         data: [totalCompletedCourses, 20 - totalCompletedCourses], // Assume 20 total courses for degree
//         backgroundColor: ['#094c50', '#FFFFFF'],
//         borderWidth: 0,
//       },
//     ],
//   };

//   const courseCompletionOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { position: 'bottom', labels: { color: '#FFFFFF' } },
//       title: { display: true, text: 'Course Completion', color: '#FFFFFF' },
//     },
//     cutout: '70%',
//   };

//   const gpaLineChartData = {
//     labels: mockGpaData.map((data) => data.semester),
//     datasets: [
//       {
//         label: 'GPA',
//         data: mockGpaData.map((data) => data.gpa),
//         fill: true,
//         backgroundColor: 'rgba(9, 76, 80, 0.8)',
//         borderColor: '#FFFFFF',
//         tension: 0.4,
//       },
//     ],
//   };

//   const gpaLineChartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     animation: {
//       duration: 1500,
//       easing: 'easeOutQuart',
//     },
//     plugins: {
//       legend: { position: 'top', labels: { color: '#FFFFFF' } },
//       title: { display: true, text: 'GPA by Semester (Line)', color: '#FFFFFF' },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         max: 4.5,
//         title: { display: true, text: 'GPA', color: '#FFFFFF' },
//         ticks: { color: '#B0BEC5' },
//       },
//       x: {
//         title: { display: true, text: 'Semesters', color: '#FFFFFF' },
//         ticks: { color: '#B0BEC5' },
//         grid: { color: '#FFFFFF' },
//       },
//     },
//   };

//   const calendarEvents = enrolledCourses.map((course) => ({
//     title: `${course.courseCode} Due`,
//     start: new Date(course.dueDate),
//     end: new Date(course.dueDate),
//     allDay: true,
//   }));

//   return (
//     <DashboardLayout>
//       <style>
//         {`
//           .rbc-calendar .rbc-month-view .rbc-day-bg {
//             background-color: #252B32 !important;
//           }
//           .rbc-calendar .rbc-month-view .rbc-today {
//             background-color: #094c50 !important;
//           }
//           .rbc-calendar .rbc-month-view .rbc-off-range-bg {
//             background-color: #1A2027 !important;
//           }
//           .rbc-calendar .rbc-month-view .rbc-event {
//             background-color: #094c50 !important;
//             color: #FFFFFF !important;
//             border-radius: 5px;
//           }
//           .rbc-calendar .rbc-month-view .rbc-day-slot .rbc-event {
//             background-color: #094c50 !important;
//             color: #FFFFFF !important;
//           }
//           .rbc-calendar .rbc-month-view .rbc-day-slot .rbc-event:hover {
//             background-color: #094c50 !important;
//           }
//           .rbc-calendar .rbc-month-view .rbc-day-slot .rbc-event:focus {
//             outline: none;
//           }
//         `}
//       </style>
//       {/* Welcome Section */}
//       <IndustrialPaper sx={{ p: 3, mb: 4, background: 'linear-gradient(180deg, #dedede 0%, #094c50 100%)' }}>
//         <CardContent>
//           <Typography variant="h5" gutterBottom sx={{ color: '#000', fontWeight: 'bold', fontSize: '2rem' }}>
//             Welcome back 👋
//           </Typography>
//           <Typography variant="body1" sx={{ color: '#000', mb: 2 }}>
//             We’re excited to have you on this journey of learning, growth, and transformation. 🌟
//           </Typography>
//         </CardContent>
//       </IndustrialPaper>

//       {/* Metrics Section */}
//       <Grid container spacing={3} sx={{ mb: 3 }}>
//         <Grid item xs={12} md={4}>
//           <MetricCard>
//             <CardContent sx={{ textAlign: 'center' }}>
//               <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
//                 <LocalLibraryIcon sx={{ color: '#B0BEC5', mr: 1 }} />
//                 <Typography variant="h6" sx={{ color: '#B0BEC5', fontSize: '1rem' }}>
//                   Enrolled Courses
//                 </Typography>
//               </Box>
//               <Typography variant="h4" sx={{ color: '#FFFFFF', fontSize: '2.5rem', fontWeight: 700 }}>
//                 {enrolledCourses.length}
//               </Typography>
//             </CardContent>
//           </MetricCard>
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <MetricCard>
//             <CardContent sx={{ textAlign: 'center' }}>
//               <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
//                 <CalendarMonthIcon sx={{ color: '#B0BEC5', mr: 1 }} />
//                 <Typography variant="h6" sx={{ color: '#B0BEC5', fontSize: '1rem' }}>
//                   {currentYear} Course Completion
//                 </Typography>
//               </Box>
//               <Typography variant="h4" sx={{ color: '#FFFFFF', fontSize: '2.5rem', fontWeight: 700 }}>
//                 {completedCourses}
//               </Typography>
//             </CardContent>
//           </MetricCard>
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <MetricCard>
//             <CardContent sx={{ textAlign: 'center' }}>
//               <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
//                 <FunctionsIcon sx={{ color: '#B0BEC5' }} />
//                 <Typography variant="h6" sx={{ color: '#B0BEC5', fontSize: '1rem' }}>
//                   Overall Course Completion
//                 </Typography>
//               </Box>
//               <Typography variant="h4" sx={{ color: '#FFFFFF', fontSize: '2.5rem', fontWeight: 700 }}>
//                 {totalCompletedCourses}
//               </Typography>
//             </CardContent>
//           </MetricCard>
//         </Grid>
//       </Grid>

//       {/* Charts Section */}
//       <Grid container spacing={3}>
//         <Grid item xs={12} md={6}>
//           <IndustrialPaper sx={{ height: '400px' }}>
//             <CardContent>
//               <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF' }}>
//                 Course Completion
//               </Typography>
//               <Box sx={{ height: '300px' }}>
//                 <Doughnut data={courseCompletionData} options={courseCompletionOptions} />
//               </Box>
//             </CardContent>
//           </IndustrialPaper>
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <IndustrialPaper sx={{ height: '400px' }}>
//             <CardContent>
//               <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF' }}>
//                 GPA Per Semester
//               </Typography>
//               <Box sx={{ height: '300px' }}>
//                 <Line data={gpaLineChartData} options={gpaLineChartOptions} />
//               </Box>
//             </CardContent>
//           </IndustrialPaper>
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <IndustrialPaper sx={{ height: '400px' }}>
//             <CardContent>
//               <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF' }}>
//                 Course Dues
//               </Typography>
//               <TableContainer>
//                 <Table sx={{ backgroundColor: 'transparent' }}>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell sx={{ color: '#FFFFFF', minWidth: '90px' }}>Course Code</TableCell>
//                       <TableCell sx={{ color: '#FFFFFF', minWidth: '90px' }}>Timeline</TableCell>
//                       <TableCell sx={{ color: '#FFFFFF', minWidth: '90px' }}>Due Date</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {enrolledCourses.map((course) => (
//                       <TableRow key={course.courseId}>
//                         <TableCell sx={{ color: '#B0BEC5' }}>{course.courseCode}</TableCell>
//                         <TableCell sx={{ color: '#B0BEC5' }}>{course.courseName}</TableCell>
//                         <TableCell sx={{ color: '#B0BEC5' }}>{course.dueDate}</TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </CardContent>
//           </IndustrialPaper>
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <IndustrialPaper sx={{ height: '400px' }}>
//             <CardContent>
//               <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF' }}>
//                 Due Dates Calendar
//               </Typography>
//               <Box sx={{ height: '300px' }}>
//                 <Calendar
//                   localizer={localizer}
//                   events={calendarEvents}
//                   startAccessor="start"
//                   endAccessor="end"
//                   style={{ height: '100%', backgroundColor: '#252B32', color: '#FFFFFF' }}
//                   defaultView="month"
//                   views={['month']}
//                   components={{
//                     toolbar: CustomToolbar,
//                   }}
//                   eventPropGetter={() => ({
//                     style: {
//                       backgroundColor: '#094c50',
//                       borderRadius: '5px',
//                       color: '#FFFFFF',
//                     },
//                   })}
//                 />
//               </Box>
//             </CardContent>
//           </IndustrialPaper>
//         </Grid>
//         <Grid item xs={12} md={12}>
//           <IndustrialPaper sx={{ height: '200px' }}>
//             <CardContent>
//               <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF', textAlign: 'center' }}>
//                 The University of the South Pacific
//               </Typography>
//               <Typography variant="body1" sx={{ color: '#B0BEC5', mb: 2, textAlign: 'center' }}>
//                 We're excited to have you on this journey of learning, growth, and transformation. 🌟
//               </Typography>
//               <Typography variant="body1" sx={{ color: '#B0BEC5', mb: 2, textAlign: 'center' }}>
//                 Serving the future of students since © 1968
//               </Typography>
//             </CardContent>
//           </IndustrialPaper>
//         </Grid>
//       </Grid>
//     </DashboardLayout>
//   );
// };

// export default Dashboard;


// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Card,
//   CardContent,
//   Typography,
//   Box,
//   Paper,
//   styled,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
// } from '@mui/material';
// import Grid from '@mui/material/Grid';
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import moment from 'moment';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import { useAuth } from '../../hooks/useAuth';
// import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
// import { Doughnut, Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Filler,
//   Title,
// } from 'chart.js';
// import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// import FunctionsIcon from '@mui/icons-material/Functions';
// import PeopleIcon from '@mui/icons-material/People';
// import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
// import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
// import Lottie from 'lottie-react';
// import LoadingAnimation from '../../assets/Animations/LoadingPage/LoadingAnimation.json';
// import {
//   getEnrolledCoursesDashboard,
//   getCompletedCoursesCurrentYear,
//   getTotalCompletedCourses,
//   getGpaData,
// } from "../../Endpoints/StudentEndpoints";


// ChartJS.register(
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Filler,
//   Title
// );

// // Styled components for industrial look
// const IndustrialPaper = styled(Paper)(({ theme }) => ({
//   background: 'linear-gradient(145deg, #2A2E35 0%, #1A2027 100%)',
//   border: '1px solid #3A3F47',
//   borderRadius: '12px',
//   boxShadow: theme.shadows[6],
//   transition: 'transform 0.2s ease, box-shadow 0.2s ease',
//   '&:hover': {
//     transform: 'translateY(-4px)',
//     boxShadow: theme.shadows[8],
//   },
// }));
// const MetricCard = styled(Card)(({ theme }) => ({
//   background: '#252B32',
//   color: '#FFFFFF',
//   borderRadius: '10px',
//   border: '1px solid #4A4F55',
//   boxShadow: theme.shadows[4],
// }));


// const localizer = momentLocalizer(moment);

// // Custom Toolbar Component
// const CustomToolbar = ({ label, onNavigate }) => {
//   return (
//     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
//       <Typography variant="h6" sx={{ color: '#FFFFFF' }}>
//         {label}
//       </Typography>
//       <Box sx={{ display: 'flex', gap: 1 }}>
//         <button
//           style={{
//             background: 'transparent',
//             border: 'none',
//             color: '#FFFFFF',
//             cursor: 'pointer',
//             padding: '5px 10px',
//             fontSize: '1rem',
//           }}
//           onMouseEnter={(e) => (e.target.style.color = '#094c50')}
//           onMouseLeave={(e) => (e.target.style.color = '#FFFFFF')}
//           onClick={() => onNavigate('PREV')}
//         >
//           Back
//         </button>
//         <button
//           style={{
//             background: 'transparent',
//             border: 'none',
//             color: '#FFFFFF',
//             cursor: 'pointer',
//             padding: '5px 10px',
//             fontSize: '1rem',
//           }}
//           onMouseEnter={(e) => (e.target.style.color = '#094c50')}
//           onMouseLeave={(e) => (e.target.style.color = '#FFFFFF')}
//           onClick={() => onNavigate('TODAY')}
//         >
//           Today
//         </button>
//         <button
//           style={{
//             background: 'transparent',
//             border: 'none',
//             color: '#FFFFFF',
//             cursor: 'pointer',
//             padding: '5px 10px',
//             fontSize: '1rem',
//           }}
//           onMouseEnter={(e) => (e.target.style.color = '#094c50')}
//           onMouseLeave={(e) => (e.target.style.color = '#FFFFFF')}
//           onClick={() => onNavigate('NEXT')}
//         >
//           Next
//         </button>
//       </Box>
//     </Box>
//   );
// };

// const Dashboard = ({ studentId, semester, toggleTheme, mode }) => {
//   const { user } = useAuth();
//   const isAdmin = user?.role === 'admin';
//   const [enrolledCourses, setEnrolledCourses] = useState([]);
//   const [completedCourses, setCompletedCourses] = useState(0);
//   const [totalCompletedCourses, setTotalCompletedCourses] = useState(0);
//   const [gpaData, setGpaData] = useState([]);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [enrolled, completed, totalCompleted, gpa] = await Promise.all([
//           getEnrolledCoursesDashboard(),
//           getCompletedCoursesCurrentYear(),
//           getTotalCompletedCourses(),
//           getGpaData(),
//         ]);

//         setEnrolledCourses(enrolled.data);
//         setCompletedCourses(completed.data.count);
//         setTotalCompletedCourses(totalCompleted.data.count);
//         setGpaData(gpa.data);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching dashboard data:', err);
//         setError('Failed to load dashboard data. Please try again later.');
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);
//   const [registeredStudents, setRegisteredStudents] = useState(0);
//   const [activeCourses, setActiveCourses] = useState(0);
//   const [pendingApprovals, setPendingApprovals] = useState(0);
//   const [pendingRequests, setPendingRequests] = useState([]);
//   const [enrollmentData, setEnrollmentData] = useState([]);
//   const [completionRateData, setCompletionRateData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const currentYear = new Date().getFullYear();

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (isAdmin) {
//         setRegisteredStudents(mockRegisteredStudents.count);
//         setActiveCourses(mockActiveCourses.count);
//         setPendingApprovals(mockPendingApprovals.count);
//         setPendingRequests(mockPendingRequests);
//         setEnrollmentData(mockEnrollmentData);
//         setCompletionRateData(mockCompletionRateData);
//       } else {
//         setEnrolledCourses(mockEnrolledCourses);
//         setCompletedCourses(mockCompletedCourses.count);
//         setTotalCompletedCourses(mockTotalCompletedCourses.count);
//         setGpaData(mockGpaData);
//       }
//       setLoading(false);
//     }, 3000);
//     return () => clearTimeout(timer);
//   }, [isAdmin]);


//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//         <Lottie animationData={LoadingAnimation} style={{ width: 500, height: 300 }} />
//       </Box>
//     );
//   }


//   if (error) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//         <Typography variant="h6" color="error">
//           {error}
//         </Typography>
//       </Box>
//     );
//   }

//   const courseCompletionData = {
//     labels: ['Completed', 'Remaining'],
//     datasets: [
//       {
//         data: [totalCompletedCourses, 20 - totalCompletedCourses],
//         backgroundColor: ['#094c50', '#FFFFFF'],
//         borderWidth: 0,
//       },
//     ],
//   };

//   const courseCompletionOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { position: 'bottom', labels: { color: '#FFFFFF' } },
//       title: { display: true, text: 'Course Completion', color: '#FFFFFF' },
//     },
//     cutout: '70%',
//   };

//   const gpaLineChartData = {
//     labels: gpaData.map((data) => data.semester),
//     datasets: [
//       {
//         label: 'GPA',
//         data: gpaData.map((data) => data.gpa),
//         fill: true,
//         backgroundColor: 'rgba(9, 76, 80, 0.8)',
//         borderColor: '#FFFFFF',
//         tension: 0.4,
//       },
//     ],
//   };

//   const gpaLineChartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     animation: {
//       duration: 1500,
//       easing: 'easeOutQuart',
//     },
//     plugins: {
//       legend: { position: 'top', labels: { color: '#FFFFFF' } },
//       title: { display: true, text: 'GPA by Semester', color: '#FFFFFF' },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         max: 4.5,
//         title: { display: true, text: 'GPA', color: '#FFFFFF' },
//         ticks: { color: '#B0BEC5' },
//       },
//       x: {
//         title: { display: true, text: 'Semesters', color: '#FFFFFF' },
//         ticks: { color: '#B0BEC5' },
//         grid: { color: '#FFFFFF' },
//       },
//     },
//   };

//   const enrollmentChartData = {
//     labels: ['Registered', 'Unregistered'],
//     datasets: [
//       {
//         data: [registeredStudents, 1500 - registeredStudents],
//         backgroundColor: ['#094c50', '#FFFFFF'],
//         borderWidth: 0,
//       },
//     ],
//   };

//   const enrollmentChartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { position: 'bottom', labels: { color: '#FFFFFF' } },
//       title: { display: true, text: 'Student Enrollment', color: '#FFFFFF' },
//     },
//     cutout: '70%',
//   };

//   const completionRateLineChartData = {
//     labels: completionRateData.map((data) => data.semester),
//     datasets: [
//       {
//         label: 'Completion Rate (%)',
//         data: completionRateData.map((data) => data.rate),
//         fill: true,
//         backgroundColor: 'rgba(9, 76, 80, 0.8)',
//         borderColor: '#FFFFFF',
//         tension: 0.4,
//       },
//     ],
//   };

//   const completionRateLineChartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     animation: {
//       duration: 1500,
//       easing: 'easeOutQuart',
//     },
//     plugins: {
//       legend: { position: 'top', labels: { color: '#FFFFFF' } },
//       title: { display: true, text: 'Course Completion Rate by Semester', color: '#FFFFFF' },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         max: 100,
//         title: { display: true, text: 'Completion Rate (%)', color: '#FFFFFF' },
//         ticks: { color: '#B0BEC5' },
//       },
//       x: {
//         title: { display: true, text: 'Semesters', color: '#FFFFFF' },
//         ticks: { color: '#B0BEC5' },
//         grid: { color: '#FFFFFF' },
//       },
//     },
//   };

//   const calendarEvents = isAdmin
//     ? pendingRequests.map((request) => ({
//         title: `${request.requestType} - ${request.studentId}`,
//         start: new Date(request.date),
//         end: new Date(request.date),
//         allDay: true,
//       }))
//     : enrolledCourses.map((course) => ({
//         title: `${course.courseCode} Due`,
//         start: new Date(course.dueDate),
//         end: new Date(course.dueDate),
//         allDay: true,
//       }));

//   return (
//     <DashboardLayout toggleTheme={toggleTheme} mode={mode}>
//       <style>
//         {`
//           .rbc-calendar .rbc-month-view .rbc-day-bg {
//             background-color: #252B32 !important;
//           }
//           .rbc-calendar .rbc-month-view .rbc-today {
//             background-color: #094c50 !important;
//           }
//           .rbc-calendar .rbc-month-view .rbc-off-range-bg {
//             background-color: #1A2027 !important;
//           }
//           .rbc-calendar .rbc-month-view .rbc-event {
//             background-color: #094c50 !important;
//             color: #FFFFFF !important;
//             border-radius: 5px;
//           }
//           .rbc-calendar .rbc-month-view .rbc-day-slot .rbc-event {
//             background-color: #094c50 !important;
//             color: #FFFFFF !important;
//           }
//           .rbc-calendar .rbc-month-view .rbc-day-slot .rbc-event:hover {
//             background-color: #094c50 !important;
//           }
//           .rbc-calendar .rbc-month-view .rbc-day-slot .rbc-event:focus {
//             outline: none;
//           }
//         `}
//       </style>
//       {/* Welcome Section */}
//       <IndustrialPaper sx={{ p: 3, mb: 4, background: 'linear-gradient(180deg, #dedede 0%, #094c50 100%)' }}>
//         <CardContent>
//           <Typography variant="h5" gutterBottom sx={{ color: '#000', fontWeight: 'bold', fontSize: '2rem' }}>
//             {isAdmin ? 'Admin Dashboard 👋' : 'Welcome back 👋'}
//           </Typography>
//           <Typography variant="body1" sx={{ color: '#000', mb: 2 }}>
//             {isAdmin
//               ? 'Manage student records, courses, and approvals efficiently. 🚀'
//               : 'We’re excited to have you on this journey of learning, growth, and transformation. 🌟'}
//           </Typography>
//         </CardContent>
//       </IndustrialPaper>

//       {/* Metrics Section */}
//       <Grid container spacing={3} sx={{ mb: 3 }}>
//         {isAdmin ? (
//           <>
//             <Grid item xs={12} md={4}>
//               <MetricCard>
//                 <CardContent sx={{ textAlign: 'center' }}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
//                     <PeopleIcon sx={{ color: '#B0BEC5', mr: 1 }} />
//                     <Typography variant="h6" sx={{ color: '#B0BEC5', fontSize: '1rem' }}>
//                       Registered Students
//                     </Typography>
//                   </Box>
//                   <Typography variant="h4" sx={{ color: '#FFFFFF', fontSize: '2.5rem', fontWeight: 700 }}>
//                     {registeredStudents}
//                   </Typography>
//                 </CardContent>
//               </MetricCard>
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <MetricCard>
//                 <CardContent sx={{ textAlign: 'center' }}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
//                     <LibraryBooksIcon sx={{ color: '#B0BEC5', mr: 1 }} />
//                     <Typography variant="h6" sx={{ color: '#B0BEC5', fontSize: '1rem' }}>
//                       Active Courses
//                     </Typography>
//                   </Box>
//                   <Typography variant="h4" sx={{ color: '#FFFFFF', fontSize: '2.5rem', fontWeight: 700 }}>
//                     {activeCourses}
//                   </Typography>
//                 </CardContent>
//               </MetricCard>
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <MetricCard>
//                 <CardContent sx={{ textAlign: 'center' }}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
//                     <AssignmentTurnedInIcon sx={{ color: '#B0BEC5', mr: 1 }} />
//                     <Typography variant="h6" sx={{ color: '#B0BEC5', fontSize: '1rem' }}>
//                       Pending Approvals
//                     </Typography>
//                   </Box>
//                   <Typography variant="h4" sx={{ color: '#FFFFFF', fontSize: '2.5rem', fontWeight: 700 }}>
//                     {pendingApprovals}
//                   </Typography>
//                 </CardContent>
//               </MetricCard>
//             </Grid>
//           </>
//         ) : (
//           <>
//             <Grid item xs={12} md={4}>
//               <MetricCard>
//                 <CardContent sx={{ textAlign: 'center' }}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
//                     <LocalLibraryIcon sx={{ color: '#B0BEC5', mr: 1 }} />
//                     <Typography variant="h6" sx={{ color: '#B0BEC5', fontSize: '1rem' }}>
//                       Enrolled Courses
//                     </Typography>
//                   </Box>
//                   <Typography variant="h4" sx={{ color: '#FFFFFF', fontSize: '2.5rem', fontWeight: 700 }}>
//                     {enrolledCourses.length}
//                   </Typography>
//                 </CardContent>
//               </MetricCard>
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <MetricCard>
//                 <CardContent sx={{ textAlign: 'center' }}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
//                     <CalendarMonthIcon sx={{ color: '#B0BEC5', mr: 1 }} />
//                     <Typography variant="h6" sx={{ color: '#B0BEC5', fontSize: '1rem' }}>
//                       {currentYear} Course Completion
//                     </Typography>
//                   </Box>
//                   <Typography variant="h4" sx={{ color: '#FFFFFF', fontSize: '2.5rem', fontWeight: 700 }}>
//                     {completedCourses}
//                   </Typography>
//                 </CardContent>
//               </MetricCard>
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <MetricCard>
//                 <CardContent sx={{ textAlign: 'center' }}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
//                     <FunctionsIcon sx={{ color: '#B0BEC5' }} />
//                     <Typography variant="h6" sx={{ color: '#B0BEC5', fontSize: '1rem' }}>
//                       Overall Course Completion
//                     </Typography>
//                   </Box>
//                   <Typography variant="h4" sx={{ color: '#FFFFFF', fontSize: '2.5rem', fontWeight: 700 }}>
//                     {totalCompletedCourses}
//                   </Typography>
//                 </CardContent>
//               </MetricCard>
//             </Grid>
//           </>
//         )}
//       </Grid>

//       {/* Charts Section */}
//       <Grid container spacing={3}>
//         {isAdmin ? (
//           <>
//             <Grid item xs={12} md={6}>
//               <IndustrialPaper sx={{ height: '400px' }}>
//                 <CardContent>
//                   <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF' }}>
//                     Student Enrollment
//                   </Typography>
//                   <Box sx={{ height: '300px' }}>
//                     <Doughnut data={enrollmentChartData} options={enrollmentChartOptions} />
//                   </Box>
//                 </CardContent>
//               </IndustrialPaper>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <IndustrialPaper sx={{ height: '400px' }}>
//                 <CardContent>
//                   <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF' }}>
//                     Course Completion Rate
//                   </Typography>
//                   <Box sx={{ height: '300px' }}>
//                     <Line data={completionRateLineChartData} options={completionRateLineChartOptions} />
//                   </Box>
//                 </CardContent>
//               </IndustrialPaper>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <IndustrialPaper sx={{ height: '400px' }}>
//                 <CardContent>
//                   <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF' }}>
//                     Pending Approval Requests
//                   </Typography>
//                   <TableContainer>
//                     <Table sx={{ backgroundColor: 'transparent' }}>
//                       <TableHead>
//                         <TableRow>
//                           <TableCell sx={{ color: '#FFFFFF', minWidth: '90px' }}>Student ID</TableCell>
//                           <TableCell sx={{ color: '#FFFFFF', minWidth: '90px' }}>Course Code</TableCell>
//                           <TableCell sx={{ color: '#FFFFFF', minWidth: '90px' }}>Request Type</TableCell>
//                           <TableCell sx={{ color: '#FFFFFF', minWidth: '90px' }}>Date</TableCell>
//                         </TableRow>
//                       </TableHead>
//                       <TableBody>
//                         {pendingRequests.map((request) => (
//                           <TableRow key={request.id}>
//                             <TableCell sx={{ color: '#B0BEC5' }}>{request.studentId}</TableCell>
//                             <TableCell sx={{ color: '#B0BEC5' }}>{request.courseCode}</TableCell>
//                             <TableCell sx={{ color: '#B0BEC5' }}>{request.requestType}</TableCell>
//                             <TableCell sx={{ color: '#B0BEC5' }}>{request.date}</TableCell>
//                           </TableRow>
//                         ))}
//                       </TableBody>
//                     </Table>
//                   </TableContainer>
//                 </CardContent>
//               </IndustrialPaper>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <IndustrialPaper sx={{ height: '400px' }}>
//                 <CardContent>
//                   <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF' }}>
//                     Administrative Deadlines
//                   </Typography>
//                   <Box sx={{ height: '300px' }}>
//                     <Calendar
//                       localizer={localizer}
//                       events={calendarEvents}
//                       startAccessor="start"
//                       endAccessor="end"
//                       style={{ height: '100%', backgroundColor: '#252B32', color: '#FFFFFF' }}
//                       defaultView="month"
//                       views={['month']}
//                       components={{ toolbar: CustomToolbar }}
//                       eventPropGetter={() => ({
//                         style: {
//                           backgroundColor: '#094c50',
//                           borderRadius: '5px',
//                           color: '#FFFFFF',
//                         },
//                       })}
//                     />
//                   </Box>
//                 </CardContent>
//               </IndustrialPaper>
//             </Grid>
//           </>
//         ) : (
//           <>
//             <Grid item xs={12} md={6}>
//               <IndustrialPaper sx={{ height: '400px' }}>
//                 <CardContent>
//                   <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF' }}>
//                     Course Completion
//                   </Typography>
//                   <Box sx={{ height: '300px' }}>
//                     <Doughnut data={courseCompletionData} options={courseCompletionOptions} />
//                   </Box>
//                 </CardContent>
//               </IndustrialPaper>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <IndustrialPaper sx={{ height: '400px' }}>
//                 <CardContent>
//                   <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF' }}>
//                     GPA Per Semester
//                   </Typography>
//                   <Box sx={{ height: '300px' }}>
//                     <Line data={gpaLineChartData} options={gpaLineChartOptions} />
//                   </Box>
//                 </CardContent>
//               </IndustrialPaper>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <IndustrialPaper sx={{ height: '400px' }}>
//                 <CardContent>
//                   <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF' }}>
//                     Course Dues
//                   </Typography>
//                   <TableContainer>
//                     <Table sx={{ backgroundColor: 'transparent' }}>
//                       <TableHead>
//                         <TableRow>
//                           <TableCell sx={{ color: '#FFFFFF', minWidth: '90px' }}>Course Code</TableCell>
//                           <TableCell sx={{ color: '#FFFFFF', minWidth: '90px' }}>Timeline</TableCell>
//                           <TableCell sx={{ color: '#FFFFFF', minWidth: '90px' }}>Due Date</TableCell>
//                         </TableRow>
//                       </TableHead>
//                       <TableBody>
//                         {enrolledCourses.map((course) => (
//                           <TableRow key={course.courseId}>
//                             <TableCell sx={{ color: '#B0BEC5' }}>{course.courseCode}</TableCell>
//                             <TableCell sx={{ color: '#B0BEC5' }}>{course.courseName}</TableCell>
//                             <TableCell sx={{ color: '#B0BEC5' }}>{course.dueDate}</TableCell>
//                           </TableRow>
//                         ))}
//                       </TableBody>
//                     </Table>
//                   </TableContainer>
//                 </CardContent>
//               </IndustrialPaper>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <IndustrialPaper sx={{ height: '400px' }}>
//                 <CardContent>
//                   <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF' }}>
//                     Due Dates Calendar
//                   </Typography>
//                   <Box sx={{ height: '300px' }}>
//                     <Calendar
//                       localizer={localizer}
//                       events={calendarEvents}
//                       startAccessor="start"
//                       endAccessor="end"
//                       style={{ height: '100%', backgroundColor: '#252B32', color: '#FFFFFF' }}
//                       defaultView="month"
//                       views={['month']}
//                       components={{ toolbar: CustomToolbar }}
//                       eventPropGetter={() => ({
//                         style: {
//                           backgroundColor: '#094c50',
//                           borderRadius: '5px',
//                           color: '#FFFFFF',
//                         },
//                       })}
//                     />
//                   </Box>
//                 </CardContent>
//               </IndustrialPaper>
//             </Grid>
//           </>
//         )}
//         <Grid item xs={12} md={12}>
//           <IndustrialPaper sx={{ height: '200px' }}>
//             <CardContent>
//               <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF', textAlign: 'center' }}>
//                 The University of the South Pacific
//               </Typography>
//               <Typography variant="body1" sx={{ color: '#B0BEC5', mb: 2, textAlign: 'center' }}>
//                 {isAdmin
//                   ? 'Empowering student success through efficient administration. 🌟'
//                   : 'We’re excited to have you on this journey of learning, growth, and transformation. 🌟'}
//               </Typography>
//               <Typography variant="body1" sx={{ color: '#B0BEC5', mb: 2, textAlign: 'center' }}>
//                 Serving the future of students since © 1968
//               </Typography>
//             </CardContent>
//           </IndustrialPaper>
//         </Grid>
//       </Grid>
//     </DashboardLayout>
//   );
// };

// export default Dashboard;

// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Card,
//   CardContent,
//   Typography,
//   Box,
//   Paper,
//   styled,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
// } from '@mui/material';
// import Grid from '@mui/material/Grid';
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import moment from 'moment';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import { useAuth } from '../../hooks/useAuth';
// import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
// import { Doughnut, Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Filler,
//   Title,
// } from 'chart.js';
// import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// import FunctionsIcon from '@mui/icons-material/Functions';
// import PeopleIcon from '@mui/icons-material/People';
// import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
// import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
// import Lottie from 'lottie-react';
// import LoadingAnimation from '../../assets/Animations/LoadingPage/LoadingAnimation.json';
// import {
//   getEnrolledCoursesDashboard,
//   getCompletedCoursesCurrentYear,
//   getTotalCompletedCourses,
//   getGpaData,
// } from "../../Endpoints/StudentEndpoints";
// import {
//   getRegisteredStudentsCount,
//   getActiveCoursesCount,
//   getPendingApprovalsCount,
//   getPendingRequests,
//   getEnrollmentData,
//   getCompletionRateData,
// } from "../../Endpoints/AdminEndpoints";

// ChartJS.register(
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Filler,
//   Title
// );

// // // Styled components for industrial look
// const IndustrialPaper = styled(Paper)(({ theme }) => ({
//   background: 'linear-gradient(145deg, #2A2E35 0%, #1A2027 100%)',
//   border: '1px solid #3A3F47',
//   borderRadius: '12px',
//   boxShadow: theme.shadows[6],
//   transition: 'transform 0.2s ease, box-shadow 0.2s ease',
//   '&:hover': {
//     transform: 'translateY(-4px)',
//     boxShadow: theme.shadows[8],
//   },
// }));

// const MetricCard = styled(Card)(({ theme }) => ({
//   background: '#252B32',
//   color: '#FFFFFF',
//   borderRadius: '10px',
//   border: '1px solid #4A4F55',
//   boxShadow: theme.shadows[4],
// }));

// const localizer = momentLocalizer(moment);

// // Custom Toolbar Component
// const CustomToolbar = ({ label, onNavigate }) => {
//   return (
//     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
//       <Typography variant="h6" sx={{ color: '#FFFFFF' }}>
//         {label}
//       </Typography>
//       <Box sx={{ display: 'flex', gap: 1 }}>
//         <button
//           style={{
//             background: 'transparent',
//             border: 'none',
//             color: '#FFFFFF',
//             cursor: 'pointer',
//             padding: '5px 10px',
//             fontSize: '1rem',
//           }}
//           onMouseEnter={(e) => (e.target.style.color = '#094c50')}
//           onMouseLeave={(e) => (e.target.style.color = '#FFFFFF')}
//           onClick={() => onNavigate('PREV')}
//         >
//           Back
//         </button>
//         <button
//           style={{
//             background: 'transparent',
//             border: 'none',
//             color: '#FFFFFF',
//             cursor: 'pointer',
//             padding: '5px 10px',
//             fontSize: '1rem',
//           }}
//           onMouseEnter={(e) => (e.target.style.color = '#094c50')}
//           onMouseLeave={(e) => (e.target.style.color = '#FFFFFF')}
//           onClick={() => onNavigate('TODAY')}
//         >
//           Today
//         </button>
//         <button
//           style={{
//             background: 'transparent',
//             border: 'none',
//             color: '#FFFFFF',
//             cursor: 'pointer',
//             padding: '5px 10px',
//             fontSize: '1rem',
//           }}
//           onMouseEnter={(e) => (e.target.style.color = '#094c50')}
//           onMouseLeave={(e) => (e.target.style.color = '#FFFFFF')}
//           onClick={() => onNavigate('NEXT')}
//         >
//           Next
//         </button>
//       </Box>
//     </Box>
//   );
// };

// const Dashboard = ({ studentId, semester, toggleTheme, mode }) => {
//   const { user } = useAuth();
//   const isAdmin = user?.role === 'admin';
//   const [enrolledCourses, setEnrolledCourses] = useState([]);
//   const [completedCourses, setCompletedCourses] = useState(0);
//   const [totalCompletedCourses, setTotalCompletedCourses] = useState(0);
//   const [gpaData, setGpaData] = useState([]);
//   const [registeredStudents, setRegisteredStudents] = useState(0);
//   const [activeCourses, setActiveCourses] = useState(0);
//   const [pendingApprovals, setPendingApprovals] = useState(0);
//   const [pendingRequests, setPendingRequests] = useState([]);
//   const [enrollmentData, setEnrollmentData] = useState([]);
//   const [completionRateData, setCompletionRateData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const currentYear = new Date().getFullYear();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         if (isAdmin) {
//           const [
//             registeredStudentsRes,
//             activeCoursesRes,
//             pendingApprovalsRes,
//             pendingRequestsRes,
//             enrollmentDataRes,
//             completionRateDataRes,
//           ] = await Promise.all([
//             getRegisteredStudentsCount(),
//             getActiveCoursesCount(),
//             getPendingApprovalsCount(),
//             getPendingRequests(),
//             getEnrollmentData(),
//             getCompletionRateData(),
//           ]);

//           setRegisteredStudents(registeredStudentsRes.data.count);
//           setActiveCourses(activeCoursesRes.data.count);
//           setPendingApprovals(pendingApprovalsRes.data.count);
//           setPendingRequests(pendingRequestsRes.data);
//           setEnrollmentData(enrollmentDataRes.data);
//           setCompletionRateData(completionRateDataRes.data);
//         } else {
//           const [enrolled, completed, totalCompleted, gpa] = await Promise.all([
//             getEnrolledCoursesDashboard(),
//             getCompletedCoursesCurrentYear(),
//             getTotalCompletedCourses(),
//             getGpaData(),
//           ]);

//           setEnrolledCourses(enrolled.data);
//           setCompletedCourses(completed.data.count);
//           setTotalCompletedCourses(totalCompleted.data.count);
//           setGpaData(gpa.data);
//         }
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching dashboard data:', err);
//         setError('Failed to load dashboard data. Please try again later.');
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [isAdmin]);


//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//         <Lottie animationData={LoadingAnimation} style={{ width: 500, height: 300 }} />
//       </Box>
//     );
//   }


//   if (error) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//         <Typography variant="h6" color="error">
//           {error}
//         </Typography>
//       </Box>
//     );
//   }

//   const courseCompletionData = {
//     labels: ['Completed', 'Remaining'],
//     datasets: [
//       {
//         data: [totalCompletedCourses, 20 - totalCompletedCourses],
//         backgroundColor: ['#094c50', '#FFFFFF'],
//         borderWidth: 0,
//       },
//     ],
//   };

//   const courseCompletionOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { position: 'bottom', labels: { color: '#FFFFFF' } },
//       title: { display: true, text: 'Course Completion', color: '#FFFFFF' },
//     },
//     cutout: '70%',
//   };

//   const gpaLineChartData = {
//     labels: gpaData.map((data) => data.semester),
//     datasets: [
//       {
//         label: 'GPA',
//         data: gpaData.map((data) => data.gpa),
//         fill: true,
//         backgroundColor: 'rgba(9, 76, 80, 0.8)',
//         borderColor: '#FFFFFF',
//         tension: 0.4,
//       },
//     ],
//   };

//   const gpaLineChartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     animation: {
//       duration: 1500,
//       easing: 'easeOutQuart',
//     },
//     plugins: {
//       legend: { position: 'top', labels: { color: '#FFFFFF' } },
//       title: { display: true, text: 'GPA by Semester', color: '#FFFFFF' },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         max: 4.5,
//         title: { display: true, text: 'GPA', color: '#FFFFFF' },
//         ticks: { color: '#B0BEC5' },
//       },
//       x: {
//         title: { display: true, text: 'Semesters', color: '#FFFFFF' },
//         ticks: { color: '#B0BEC5' },
//         grid: { color: '#FFFFFF' },
//       },
//     },
//   };

//   const enrollmentChartData = {
//     labels: ['Registered', 'Unregistered'],
//     datasets: [
//       {
//         data: [registeredStudents, 1500 - registeredStudents],
//         backgroundColor: ['#094c50', '#FFFFFF'],
//         borderWidth: 0,
//       },
//     ],
//   };

//   const enrollmentChartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { position: 'bottom', labels: { color: '#FFFFFF' } },
//       title: { display: true, text: 'Student Enrollment', color: '#FFFFFF' },
//     },
//     cutout: '70%',
//   };

//   const completionRateLineChartData = {
//     labels: completionRateData.map((data) => data.semester),
//     datasets: [
//       {
//         label: 'Completion Rate (%)',
//         data: completionRateData.map((data) => data.rate),
//         fill: true,
//         backgroundColor: 'rgba(9, 76, 80, 0.8)',
//         borderColor: '#FFFFFF',
//         tension: 0.4,
//       },
//     ],
//   };

//   const completionRateLineChartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     animation: {
//       duration: 1500,
//       easing: 'easeOutQuart',
//     },
//     plugins: {
//       legend: { position: 'top', labels: { color: '#FFFFFF' } },
//       title: { display: true, text: 'Course Completion Rate by Semester', color: '#FFFFFF' },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         max: 100,
//         title: { display: true, text: 'Completion Rate (%)', color: '#FFFFFF' },
//         ticks: { color: '#B0BEC5' },
//       },
//       x: {
//         title: { display: true, text: 'Semesters', color: '#FFFFFF' },
//         ticks: { color: '#B0BEC5' },
//         grid: { color: '#FFFFFF' },
//       },
//     },
//   };

//   const calendarEvents = isAdmin
//     ? pendingRequests.map((request) => ({
//         title: `${request.requestType} - ${request.studentId}`,
//         start: new Date(request.date),
//         end: new Date(request.date),
//         allDay: true,
//       }))
//     : enrolledCourses.map((course) => ({
//         title: `${course.courseCode} Due`,
//         start: new Date(course.dueDate),
//         end: new Date(course.dueDate),
//         allDay: true,
//       }));

//   return (
//     <DashboardLayout toggleTheme={toggleTheme} mode={mode}>
//       <style>
//         {`
//           .rbc-calendar .rbc-month-view .rbc-day-bg {
//             background-color: #252B32 !important;
//           }
//           .rbc-calendar .rbc-month-view .rbc-today {
//             background-color: #094c50 !important;
//           }
//           .rbc-calendar .rbc-month-view .rbc-off-range-bg {
//             background-color: #1A2027 !important;
//           }
//           .rbc-calendar .rbc-month-view .rbc-event {
//             background-color: #094c50 !important;
//             color: #FFFFFF !important;
//             border-radius: 5px;
//           }
//           .rbc-calendar .rbc-month-view .rbc-day-slot .rbc-event {
//             background-color: #094c50 !important;
//             color: #FFFFFF !important;
//           }
//           .rbc-calendar .rbc-month-view .rbc-day-slot .rbc-event:hover {
//             background-color: #094c50 !important;
//           }
//           .rbc-calendar .rbc-month-view .rbc-day-slot .rbc-event:focus {
//             outline: none;
//           }
//         `}
//       </style>
//       {/* Welcome Section */}
//       <IndustrialPaper sx={{ p: 3, mb: 4, background: 'linear-gradient(180deg, #dedede 0%, #094c50 100%)' }}>
//         <CardContent>
//           <Typography variant="h5" gutterBottom sx={{ color: '#000', fontWeight: 'bold', fontSize: '2rem' }}>
//             {isAdmin ? 'Admin Dashboard 👋' : 'Welcome back 👋'}
//           </Typography>
//           <Typography variant="body1" sx={{ color: '#000', mb: 2 }}>
//             {isAdmin
//               ? 'Manage student records, courses, and approvals efficiently. 🚀'
//               : 'We’re excited to have you on this journey of learning, growth, and transformation. 🌟'}
//           </Typography>
//         </CardContent>
//       </IndustrialPaper>

//       {/* Metrics Section */}
//       <Grid container spacing={3} sx={{ mb: 3 }}>
//         {isAdmin ? (
//           <>
//             <Grid item xs={12} md={4}>
//               <MetricCard>
//                 <CardContent sx={{ textAlign: 'center' }}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
//                     <PeopleIcon sx={{ color: '#B0BEC5', mr: 1 }} />
//                     <Typography variant="h6" sx={{ color: '#B0BEC5', fontSize: '1rem' }}>
//                       Registered Students
//                     </Typography>
//                   </Box>
//                   <Typography variant="h4" sx={{ color: '#FFFFFF', fontSize: '2.5rem', fontWeight: 700 }}>
//                     {registeredStudents}
//                   </Typography>
//                 </CardContent>
//               </MetricCard>
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <MetricCard>
//                 <CardContent sx={{ textAlign: 'center' }}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
//                     <LibraryBooksIcon sx={{ color: '#B0BEC5', mr: 1 }} />
//                     <Typography variant="h6" sx={{ color: '#B0BEC5', fontSize: '1rem' }}>
//                       Active Courses
//                     </Typography>
//                   </Box>
//                   <Typography variant="h4" sx={{ color: '#FFFFFF', fontSize: '2.5rem', fontWeight: 700 }}>
//                     {activeCourses}
//                   </Typography>
//                 </CardContent>
//               </MetricCard>
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <MetricCard>
//                 <CardContent sx={{ textAlign: 'center' }}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
//                     <AssignmentTurnedInIcon sx={{ color: '#B0BEC5', mr: 1 }} />
//                     <Typography variant="h6" sx={{ color: '#B0BEC5', fontSize: '1rem' }}>
//                       Pending Approvals
//                     </Typography>
//                   </Box>
//                   <Typography variant="h4" sx={{ color: '#FFFFFF', fontSize: '2.5rem', fontWeight: 700 }}>
//                     {pendingApprovals}
//                   </Typography>
//                 </CardContent>
//               </MetricCard>
//             </Grid>
//           </>
//         ) : (
//           <>
//             <Grid item xs={12} md={4}>
//               <MetricCard>
//                 <CardContent sx={{ textAlign: 'center' }}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
//                     <LocalLibraryIcon sx={{ color: '#B0BEC5', mr: 1 }} />
//                     <Typography variant="h6" sx={{ color: '#B0BEC5', fontSize: '1rem' }}>
//                       Enrolled Courses
//                     </Typography>
//                   </Box>
//                   <Typography variant="h4" sx={{ color: '#FFFFFF', fontSize: '2.5rem', fontWeight: 700 }}>
//                     {enrolledCourses.length}
//                   </Typography>
//                 </CardContent>
//               </MetricCard>
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <MetricCard>
//                 <CardContent sx={{ textAlign: 'center' }}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
//                     <CalendarMonthIcon sx={{ color: '#B0BEC5', mr: 1 }} />
//                     <Typography variant="h6" sx={{ color: '#B0BEC5', fontSize: '1rem' }}>
//                       {currentYear} Course Completion
//                     </Typography>
//                   </Box>
//                   <Typography variant="h4" sx={{ color: '#FFFFFF', fontSize: '2.5rem', fontWeight: 700 }}>
//                     {completedCourses}
//                   </Typography>
//                 </CardContent>
//               </MetricCard>
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <MetricCard>
//                 <CardContent sx={{ textAlign: 'center' }}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
//                     <FunctionsIcon sx={{ color: '#B0BEC5' }} />
//                     <Typography variant="h6" sx={{ color: '#B0BEC5', fontSize: '1rem' }}>
//                       Overall Course Completion
//                     </Typography>
//                   </Box>
//                   <Typography variant="h4" sx={{ color: '#FFFFFF', fontSize: '2.5rem', fontWeight: 700 }}>
//                     {totalCompletedCourses}
//                   </Typography>
//                 </CardContent>
//               </MetricCard>
//             </Grid>
//           </>
//         )}
//       </Grid>

//       {/* Charts Section */}
//       <Grid container spacing={3}>
//         {isAdmin ? (
//           <>
//             <Grid item xs={12} md={6}>
//               <IndustrialPaper sx={{ height: '400px' }}>
//                 <CardContent>
//                   <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF' }}>
//                     Student Enrollment
//                   </Typography>
//                   <Box sx={{ height: '300px' }}>
//                     <Doughnut data={enrollmentChartData} options={enrollmentChartOptions} />
//                   </Box>
//                 </CardContent>
//               </IndustrialPaper>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <IndustrialPaper sx={{ height: '400px' }}>
//                 <CardContent>
//                   <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF' }}>
//                     Course Completion Rate
//                   </Typography>
//                   <Box sx={{ height: '300px' }}>
//                     <Line data={completionRateLineChartData} options={completionRateLineChartOptions} />
//                   </Box>
//                 </CardContent>
//               </IndustrialPaper>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <IndustrialPaper sx={{ height: '400px' }}>
//                 <CardContent>
//                   <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF' }}>
//                     Pending Approval Requests
//                   </Typography>
//                   <TableContainer>
//                     <Table sx={{ backgroundColor: 'transparent' }}>
//                       <TableHead>
//                         <TableRow>
//                           <TableCell sx={{ color: '#FFFFFF', minWidth: '90px' }}>Student ID</TableCell>
//                           <TableCell sx={{ color: '#FFFFFF', minWidth: '90px' }}>Course Code</TableCell>
//                           <TableCell sx={{ color: '#FFFFFF', minWidth: '90px' }}>Request Type</TableCell>
//                           <TableCell sx={{ color: '#FFFFFF', minWidth: '90px' }}>Date</TableCell>
//                         </TableRow>
//                       </TableHead>
//                       <TableBody>
//                         {pendingRequests.map((request) => (
//                           <TableRow key={request.id}>
//                             <TableCell sx={{ color: '#B0BEC5' }}>{request.studentId}</TableCell>
//                             <TableCell sx={{ color: '#B0BEC5' }}>{request.courseCode}</TableCell>
//                             <TableCell sx={{ color: '#B0BEC5' }}>{request.requestType}</TableCell>
//                             <TableCell sx={{ color: '#B0BEC5' }}>{request.date}</TableCell>
//                           </TableRow>
//                         ))}
//                       </TableBody>
//                     </Table>
//                   </TableContainer>
//                 </CardContent>
//               </IndustrialPaper>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <IndustrialPaper sx={{ height: '400px' }}>
//                 <CardContent>
//                   <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF' }}>
//                     Administrative Deadlines
//                   </Typography>
//                   <Box sx={{ height: '300px' }}>
//                     <Calendar
//                       localizer={localizer}
//                       events={calendarEvents}
//                       startAccessor="start"
//                       endAccessor="end"
//                       style={{ height: '100%', backgroundColor: '#252B32', color: '#FFFFFF' }}
//                       defaultView="month"
//                       views={['month']}
//                       components={{ toolbar: CustomToolbar }}
//                       eventPropGetter={() => ({
//                         style: {
//                           backgroundColor: '#094c50',
//                           borderRadius: '5px',
//                           color: '#FFFFFF',
//                         },
//                       })}
//                     />
//                   </Box>
//                 </CardContent>
//               </IndustrialPaper>
//             </Grid>
//           </>
//         ) : (
//           <>
//             <Grid item xs={12} md={6}>
//               <IndustrialPaper sx={{ height: '400px' }}>
//                 <CardContent>
//                   <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF' }}>
//                     Course Completion
//                   </Typography>
//                   <Box sx={{ height: '300px' }}>
//                     <Doughnut data={courseCompletionData} options={courseCompletionOptions} />
//                   </Box>
//                 </CardContent>
//               </IndustrialPaper>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <IndustrialPaper sx={{ height: '400px' }}>
//                 <CardContent>
//                   <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF' }}>
//                     GPA Per Semester
//                   </Typography>
//                   <Box sx={{ height: '300px' }}>
//                     <Line data={gpaLineChartData} options={gpaLineChartOptions} />
//                   </Box>
//                 </CardContent>
//               </IndustrialPaper>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <IndustrialPaper sx={{ height: '400px' }}>
//                 <CardContent>
//                   <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF' }}>
//                     Course Dues
//                   </Typography>
//                   <TableContainer>
//                     <Table sx={{ backgroundColor: 'transparent' }}>
//                       <TableHead>
//                         <TableRow>
//                           <TableCell sx={{ color: '#FFFFFF', minWidth: '90px' }}>Course Code</TableCell>
//                           <TableCell sx={{ color: '#FFFFFF', minWidth: '90px' }}>Timeline</TableCell>
//                           <TableCell sx={{ color: '#FFFFFF', minWidth: '90px' }}>Due Date</TableCell>
//                         </TableRow>
//                       </TableHead>
//                       <TableBody>
//                         {enrolledCourses.map((course) => (
//                           <TableRow key={course.courseId}>
//                             <TableCell sx={{ color: '#B0BEC5' }}>{course.courseCode}</TableCell>
//                             <TableCell sx={{ color: '#B0BEC5' }}>{course.courseName}</TableCell>
//                             <TableCell sx={{ color: '#B0BEC5' }}>{course.dueDate}</TableCell>
//                           </TableRow>
//                         ))}
//                       </TableBody>
//                     </Table>
//                   </TableContainer>
//                 </CardContent>
//               </IndustrialPaper>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <IndustrialPaper sx={{ height: '400px' }}>
//                 <CardContent>
//                   <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF' }}>
//                     Due Dates Calendar
//                   </Typography>
//                   <Box sx={{ height: '300px' }}>
//                     <Calendar
//                       localizer={localizer}
//                       events={calendarEvents}
//                       startAccessor="start"
//                       endAccessor="end"
//                       style={{ height: '100%', backgroundColor: '#252B32', color: '#FFFFFF' }}
//                       defaultView="month"
//                       views={['month']}
//                       components={{ toolbar: CustomToolbar }}
//                       eventPropGetter={() => ({
//                         style: {
//                           backgroundColor: '#094c50',
//                           borderRadius: '5px',
//                           color: '#FFFFFF',
//                         },
//                       })}
//                     />
//                   </Box>
//                 </CardContent>
//               </IndustrialPaper>
//             </Grid>
//           </>
//         )}
//         <Grid item xs={12} md={12}>
//           <IndustrialPaper sx={{ height: '200px' }}>
//             <CardContent>
//               <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF', textAlign: 'center' }}>
//                 The University of the South Pacific
//               </Typography>
//               <Typography variant="body1" sx={{ color: '#B0BEC5', mb: 2, textAlign: 'center' }}>
//                 {isAdmin
//                   ? 'Empowering student success through efficient administration. 🌟'
//                   : 'We’re excited to have you on this journey of learning, growth, and transformation. 🌟'}
//               </Typography>
//               <Typography variant="body1" sx={{ color: '#B0BEC5', mb: 2, textAlign: 'center' }}>
//                 Serving the future of students since © 1968
//               </Typography>
//             </CardContent>
//           </IndustrialPaper>
//         </Grid>
//       </Grid>
//     </DashboardLayout>
//   );
// };

// export default Dashboard;

// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Card,
//   CardContent,
//   Typography,
//   Box,
//   Paper,
//   styled,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
// } from '@mui/material';
// import Grid from '@mui/material/Grid';
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import moment from 'moment';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import { useAuth } from '../../hooks/useAuth';
// import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
// import { Doughnut, Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Filler,
//   Title,
// } from 'chart.js';
// import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// import FunctionsIcon from '@mui/icons-material/Functions';
// import PeopleIcon from '@mui/icons-material/People';
// import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
// import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
// import Lottie from 'lottie-react';
// import LoadingAnimation from '../../assets/Animations/LoadingPage/LoadingAnimation.json';
// import {
//   getEnrolledCoursesDashboard,
//   getCompletedCoursesCurrentYear,
//   getTotalCompletedCourses,
//   getGpaData,
// } from "../../Endpoints/StudentEndpoints";
// import {
//   getRegisteredStudentsCount,
//   getActiveCoursesCount,
//   getPendingApprovalsCount,
//   getPendingRequests,
//   getEnrollmentData,
//   getCompletionRateData,
// } from "../../Endpoints/AdminEndpoints";

// ChartJS.register(
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Filler,
//   Title
// );

// const IndustrialPaper = styled(Paper)(({ theme }) => ({
//   background: 'linear-gradient(145deg, #2A2E35 0%, #1A2027 100%)',
//   border: '1px solid #3A3F47',
//   borderRadius: '12px',
//   boxShadow: theme.shadows[6],
//   transition: 'transform 0.2s ease, box-shadow 0.2s ease',
//   '&:hover': {
//     transform: 'translateY(-4px)',
//     boxShadow: theme.shadows[8],
//   },
// }));

// const MetricCard = styled(Card)(({ theme }) => ({
//   background: '#252B32',
//   color: '#FFFFFF',
//   borderRadius: '10px',
//   border: '1px solid #4A4F55',
//   boxShadow: theme.shadows[4],
// }));

// const localizer = momentLocalizer(moment);

// const CustomToolbar = ({ label, onNavigate }) => {
//   return (
//     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
//       <Typography variant="h6" sx={{ color: '#FFFFFF' }}>
//         {label}
//       </Typography>
//       <Box sx={{ display: 'flex', gap: 1 }}>
//         <button
//           style={{
//             background: 'transparent',
//             border: 'none',
//             color: '#FFFFFF',
//             cursor: 'pointer',
//             padding: '5px 10px',
//             fontSize: '1rem',
//           }}
//           onMouseEnter={(e) => (e.target.style.color = '#094c50')}
//           onMouseLeave={(e) => (e.target.style.color = '#FFFFFF')}
//           onClick={() => onNavigate('PREV')}
//         >
//           Back
//         </button>
//         <button
//           style={{
//             background: 'transparent',
//             border: 'none',
//             color: '#FFFFFF',
//             cursor: 'pointer',
//             padding: '5px 10px',
//             fontSize: '1rem',
//           }}
//           onMouseEnter={(e) => (e.target.style.color = '#094c50')}
//           onMouseLeave={(e) => (e.target.style.color = '#FFFFFF')}
//           onClick={() => onNavigate('TODAY')}
//         >
//           Today
//         </button>
//         <button
//           style={{
//             background: 'transparent',
//             border: 'none',
//             color: '#FFFFFF',
//             cursor: 'pointer',
//             padding: '5px 10px',
//             fontSize: '1rem',
//           }}
//           onMouseEnter={(e) => (e.target.style.color = '#094c50')}
//           onMouseLeave={(e) => (e.target.style.color = '#FFFFFF')}
//           onClick={() => onNavigate('NEXT')}
//         >
//           Next
//         </button>
//       </Box>
//     </Box>
//   );
// };

// const Dashboard = ({ studentId, semester, toggleTheme, mode }) => {
//   const { user } = useAuth();
//   const isAdmin = user?.role === 'admin';
//   const [enrolledCourses, setEnrolledCourses] = useState([]);
//   const [completedCourses, setCompletedCourses] = useState(0);
//   const [totalCompletedCourses, setTotalCompletedCourses] = useState(0);
//   const [gpaData, setGpaData] = useState([]);
//   const [registeredStudents, setRegisteredStudents] = useState(0);
//   const [activeCourses, setActiveCourses] = useState(0);
//   const [pendingApprovals, setPendingApprovals] = useState(0);
//   const [pendingRequests, setPendingRequests] = useState([]);
//   const [enrollmentData, setEnrollmentData] = useState([]);
//   const [completionRateData, setCompletionRateData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const currentYear = new Date().getFullYear();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         if (isAdmin) {
//           const [
//             registeredStudentsRes,
//             activeCoursesRes,
//             pendingApprovalsRes,
//             pendingRequestsRes,
//             enrollmentDataRes,
//             completionRateDataRes,
//           ] = await Promise.all([
//             getRegisteredStudentsCount(),
//             getActiveCoursesCount(),
//             getPendingApprovalsCount(),
//             getPendingRequests(),
//             getEnrollmentData(),
//             getCompletionRateData(),
//           ]);

//           setRegisteredStudents(registeredStudentsRes.data.count);
//           setActiveCourses(activeCoursesRes.data.count);
//           setPendingApprovals(pendingApprovalsRes.data.count);
//           setPendingRequests(pendingRequestsRes.data);
//           setEnrollmentData(enrollmentDataRes.data);
//           setCompletionRateData(completionRateDataRes.data);
//         } else {
//           const [enrolled, completed, totalCompleted, gpa] = await Promise.all([
//             getEnrolledCoursesDashboard(),
//             getCompletedCoursesCurrentYear(),
//             getTotalCompletedCourses(),
//             getGpaData(),
//           ]);

//           setEnrolledCourses(enrolled.data);
//           setCompletedCourses(completed.data.count);
//           setTotalCompletedCourses(totalCompleted.data.count);
//           setGpaData(gpa.data);
//         }
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching dashboard data:', err);
//         setError('Failed to load dashboard data. Please try again later.');
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [isAdmin]);

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//         <Lottie animationData={LoadingAnimation} style={{ width: 500, height: 300 }} />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//         <Typography variant="h6" color="error">
//           {error}
//         </Typography>
//       </Box>
//     );
//   }

//   const courseCompletionData = {
//     labels: ['Completed', 'Remaining'],
//     datasets: [
//       {
//         data: [totalCompletedCourses, 20 - totalCompletedCourses],
//         backgroundColor: ['#094c50', '#FFFFFF'],
//         borderWidth: 0,
//       },
//     ],
//   };

//   const courseCompletionOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { position: 'bottom', labels: { color: '#FFFFFF' } },
//       title: { display: true, text: 'Course Completion', color: '#FFFFFF' },
//     },
//     cutout: '70%',
//   };

//   const gpaLineChartData = {
//     labels: gpaData.map((data) => data.semester),
//     datasets: [
//       {
//         label: 'GPA',
//         data: gpaData.map((data) => data.gpa),
//         fill: true,
//         backgroundColor: 'rgba(9, 76, 80, 0.8)',
//         borderColor: '#FFFFFF',
//         tension: 0.4,
//       },
//     ],
//   };

//   const gpaLineChartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     animation: {
//       duration: 1500,
//       easing: 'easeOutQuart',
//     },
//     plugins: {
//       legend: { position: 'top', labels: { color: '#FFFFFF' } },
//       title: { display: true, text: 'GPA by Semester', color: '#FFFFFF' },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         max: 4.5,
//         title: { display: true, text: 'GPA', color: '#FFFFFF' },
//         ticks: { color: '#B0BEC5' },
//       },
//       x: {
//         title: { display: true, text: 'Semesters', color: '#FFFFFF' },
//         ticks: { color: '#B0BEC5' },
//         grid: { color: '#FFFFFF' },
//       },
//     },
//   };

//   const enrollmentChartData = {
//     labels: ['Registered', 'Unregistered'],
//     datasets: [
//       {
//         data: [registeredStudents, 1500 - registeredStudents],
//         backgroundColor: ['#094c50', '#FFFFFF'],
//         borderWidth: 0,
//       },
//     ],
//   };

//   const enrollmentChartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { position: 'bottom', labels: { color: '#FFFFFF' } },
//       title: { display: true, text: 'Student Enrollment', color: '#FFFFFF' },
//     },
//     cutout: '70%',
//   };

//   const completionRateLineChartData = {
//     labels: completionRateData.map((data) => data.semester),
//     datasets: [
//       {
//         label: 'Completion Rate (%)',
//         data: completionRateData.map((data) => data.rate),
//         fill: true,
//         backgroundColor: 'rgba(9, 76, 80, 0.8)',
//         borderColor: '#FFFFFF',
//         tension: 0.4,
//       },
//     ],
//   };

//   const completionRateLineChartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     animation: {
//       duration: 1500,
//       easing: 'easeOutQuart',
//     },
//     plugins: {
//       legend: { position: 'top', labels: { color: '#FFFFFF' } },
//       title: { display: true, text: 'Course Completion Rate by Semester', color: '#FFFFFF' },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         max: 100,
//         title: { display: true, text: 'Completion Rate (%)', color: '#FFFFFF' },
//         ticks: { color: '#B0BEC5' },
//       },
//       x: {
//         title: { display: true, text: 'Semesters', color: '#FFFFFF' },
//         ticks: { color: '#B0BEC5' },
//         grid: { color: '#FFFFFF' },
//       },
//     },
//   };

//   const calendarEvents = isAdmin
//     ? pendingRequests.map((request) => ({
//         title: `${request.requestType} - ${request.studentId}`,
//         start: new Date(request.date),
//         end: new Date(request.date),
//         allDay: true,
//       }))
//     : enrolledCourses.map((course) => ({
//         title: `${course.courseCode} Due`,
//         start: new Date(course.dueDate),
//         end: new Date(course.dueDate),
//         allDay: true,
//       }));

//   return (
//     <DashboardLayout toggleTheme={toggleTheme} mode={mode}>
//       <style>
//         {`
//           .rbc-calendar .rbc-month-view .rbc-day-bg {
//             background-color: #252B32 !important;
//           }
//           .rbc-calendar .rbc-month-view .rbc-today {
//             background-color: #094c50 !important;
//           }
//           .rbc-calendar .rbc-month-view .rbc-off-range-bg {
//             background-color: #1A2027 !important;
//           }
//           .rbc-calendar .rbc-month-view .rbc-event {
//             background-color: #094c50 !important;
//             color: #FFFFFF !important;
//             border-radius: 5px;
//           }
//           .rbc-calendar .rbc-month-view .rbc-day-slot .rbc-event {
//             background-color: #094c50 !important;
//             color: #FFFFFF !important;
//           }
//           .rbc-calendar .rbc-month-view .rbc-day-slot .rbc-event:hover {
//             background-color: #094c50 !important;
//           }
//           .rbc-calendar .rbc-month-view .rbc-day-slot .rbc-event:focus {
//             outline: none;
//           }
//         `}
//       </style>
//       <IndustrialPaper sx={{ p: 3, mb: 4, background: 'linear-gradient(180deg, #dedede 0%, #094c50 100%)' }}>
//         <CardContent>
//           <Typography variant="h5" gutterBottom sx={{ color: '#000', fontWeight: 'bold', fontSize: '2rem' }}>
//             {isAdmin ? 'Admin Dashboard 👋' : 'Welcome back 👋'}
//           </Typography>
//           <Typography variant="body1" sx={{ color: '#000', mb: 2 }}>
//             {isAdmin
//               ? 'Manage student records, courses, and approvals efficiently. 🚀'
//               : 'We’re excited to have you on this journey of learning, growth, and transformation. 🌟'}
//           </Typography>
//         </CardContent>
//       </IndustrialPaper>

//       <Grid container spacing={3} sx={{ mb: 3 }}>
//         {isAdmin ? (
//           <>
//             <Grid item xs={12} md={4}>
//               <MetricCard>
//                 <CardContent sx={{ textAlign: 'center' }}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
//                     <PeopleIcon sx={{ color: '#B0BEC5', mr: 1 }} />
//                     <Typography variant="h6" sx={{ color: '#B0BEC5', fontSize: '1rem' }}>
//                       Registered Students
//                     </Typography>
//                   </Box>
//                   <Typography variant="h4" sx={{ color: '#FFFFFF', fontSize: '2.5rem', fontWeight: 700 }}>
//                     {registeredStudents}
//                   </Typography>
//                 </CardContent>
//               </MetricCard>
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <MetricCard>
//                 <CardContent sx={{ textAlign: 'center' }}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
//                     <LibraryBooksIcon sx={{ color: '#B0BEC5', mr: 1 }} />
//                     <Typography variant="h6" sx={{ color: '#B0BEC5', fontSize: '1rem' }}>
//                       Active Courses
//                     </Typography>
//                   </Box>
//                   <Typography variant="h4" sx={{ color: '#FFFFFF', fontSize: '2.5rem', fontWeight: 700 }}>
//                     {activeCourses}
//                   </Typography>
//                 </CardContent>
//               </MetricCard>
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <MetricCard>
//                 <CardContent sx={{ textAlign: 'center' }}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
//                     <AssignmentTurnedInIcon sx={{ color: '#B0BEC5', mr: 1 }} />
//                     <Typography variant="h6" sx={{ color: '#B0BEC5', fontSize: '1rem' }}>
//                       Pending Approvals
//                     </Typography>
//                   </Box>
//                   <Typography variant="h4" sx={{ color: '#FFFFFF', fontSize: '2.5rem', fontWeight: 700 }}>
//                     {pendingApprovals}
//                   </Typography>
//                 </CardContent>
//               </MetricCard>
//             </Grid>
//           </>
//         ) : (
//           <>
//             <Grid item xs={12} md={4}>
//               <MetricCard>
//                 <CardContent sx={{ textAlign: 'center' }}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
//                     <LocalLibraryIcon sx={{ color: '#B0BEC5', mr: 1 }} />
//                     <Typography variant="h6" sx={{ color: '#B0BEC5', fontSize: '1rem' }}>
//                       Enrolled Courses
//                     </Typography>
//                   </Box>
//                   <Typography variant="h4" sx={{ color: '#FFFFFF', fontSize: '2.5rem', fontWeight: 700 }}>
//                     {enrolledCourses.length}
//                   </Typography>
//                 </CardContent>
//               </MetricCard>
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <MetricCard>
//                 <CardContent sx={{ textAlign: 'center' }}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
//                     <CalendarMonthIcon sx={{ color: '#B0BEC5', mr: 1 }} />
//                     <Typography variant="h6" sx={{ color: '#B0BEC5', fontSize: '1rem' }}>
//                       {currentYear} Course Completion
//                     </Typography>
//                   </Box>
//                   <Typography variant="h4" sx={{ color: '#FFFFFF', fontSize: '2.5rem', fontWeight: 700 }}>
//                     {completedCourses > 0 ? completedCourses : 'In Progress'}
//                   </Typography>
//                 </CardContent>
//               </MetricCard>
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <MetricCard>
//                 <CardContent sx={{ textAlign: 'center' }}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
//                     <FunctionsIcon sx={{ color: '#B0BEC5' }} />
//                     <Typography variant="h6" sx={{ color: '#B0BEC5', fontSize: '1rem' }}>
//                       Overall Course Completion
//                     </Typography>
//                   </Box>
//                   <Typography variant="h4" sx={{ color: '#FFFFFF', fontSize: '2.5rem', fontWeight: 700 }}>
//                     {totalCompletedCourses}
//                   </Typography>
//                 </CardContent>
//               </MetricCard>
//             </Grid>
//           </>
//         )}
//       </Grid>

//       <Grid container spacing={3}>
//         {isAdmin ? (
//           <>
//             <Grid item xs={12} md={6}>
//               <IndustrialPaper sx={{ height: '400px' }}>
//                 <CardContent>
//                   <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF' }}>
//                     Student Enrollment
//                   </Typography>
//                   <Box sx={{ height: '300px' }}>
//                     <Doughnut data={enrollmentChartData} options={enrollmentChartOptions} />
//                   </Box>
//                 </CardContent>
//               </IndustrialPaper>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <IndustrialPaper sx={{ height: '400px' }}>
//                 <CardContent>
//                   <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF' }}>
//                     Course Completion Rate
//                   </Typography>
//                   <Box sx={{ height: '300px' }}>
//                     <Line data={completionRateLineChartData} options={completionRateLineChartOptions} />
//                   </Box>
//                 </CardContent>
//               </IndustrialPaper>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <IndustrialPaper sx={{ height: '400px' }}>
//                 <CardContent>
//                   <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF' }}>
//                     Pending Approval Requests
//                   </Typography>
//                   <TableContainer>
//                     <Table sx={{ backgroundColor: 'transparent' }}>
//                       <TableHead>
//                         <TableRow>
//                           <TableCell sx={{ color: '#FFFFFF', minWidth: '90px' }}>Student ID</TableCell>
//                           <TableCell sx={{ color: '#FFFFFF', minWidth: '90px' }}>Course Code</TableCell>
//                           <TableCell sx={{ color: '#FFFFFF', minWidth: '90px' }}>Request Type</TableCell>
//                           <TableCell sx={{ color: '#FFFFFF', minWidth: '90px' }}>Date</TableCell>
//                         </TableRow>
//                       </TableHead>
//                       <TableBody>
//                         {pendingRequests.map((request) => (
//                           <TableRow key={request.id}>
//                             <TableCell sx={{ color: '#B0BEC5' }}>{request.studentId}</TableCell>
//                             <TableCell sx={{ color: '#B0BEC5' }}>{request.courseCode}</TableCell>
//                             <TableCell sx={{ color: '#B0BEC5' }}>{request.requestType}</TableCell>
//                             <TableCell sx={{ color: '#B0BEC5' }}>{request.date}</TableCell>
//                           </TableRow>
//                         ))}
//                       </TableBody>
//                     </Table>
//                   </TableContainer>
//                 </CardContent>
//               </IndustrialPaper>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <IndustrialPaper sx={{ height: '400px' }}>
//                 <CardContent>
//                   <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF' }}>
//                     Administrative Deadlines
//                   </Typography>
//                   <Box sx={{ height: '300px' }}>
//                     <Calendar
//                       localizer={localizer}
//                       events={calendarEvents}
//                       startAccessor="start"
//                       endAccessor="end"
//                       style={{ height: '100%', backgroundColor: '#252B32', color: '#FFFFFF' }}
//                       defaultView="month"
//                       views={['month']}
//                       components={{ toolbar: CustomToolbar }}
//                       eventPropGetter={() => ({
//                         style: {
//                           backgroundColor: '#094c50',
//                           borderRadius: '5px',
//                           color: '#FFFFFF',
//                         },
//                       })}
//                     />
//                   </Box>
//                 </CardContent>
//               </IndustrialPaper>
//             </Grid>
//           </>
//         ) : (
//           <>
//             <Grid item xs={12} md={6}>
//               <IndustrialPaper sx={{ height: '400px' }}>
//                 <CardContent>
//                   <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF' }}>
//                     Course Completion
//                   </Typography>
//                   <Box sx={{ height: '300px' }}>
//                     <Doughnut data={courseCompletionData} options={courseCompletionOptions} />
//                   </Box>
//                 </CardContent>
//               </IndustrialPaper>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <IndustrialPaper sx={{ height: '400px' }}>
//                 <CardContent>
//                   <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF' }}>
//                     GPA Per Semester
//                   </Typography>
//                   <Box sx={{ height: '300px' }}>
//                     <Line data={gpaLineChartData} options={gpaLineChartOptions} />
//                   </Box>
//                 </CardContent>
//               </IndustrialPaper>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <IndustrialPaper sx={{ height: '400px' }}>
//                 <CardContent>
//                   <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF' }}>
//                     Course Dues
//                   </Typography>
//                   <TableContainer>
//                     <Table sx={{ backgroundColor: 'transparent' }}>
//                       <TableHead>
//                         <TableRow>
//                           <TableCell sx={{ color: '#FFFFFF', minWidth: '90px' }}>Course Code</TableCell>
//                           <TableCell sx={{ color: '#FFFFFF', minWidth: '90px' }}>Timeline</TableCell>
//                           <TableCell sx={{ color: '#FFFFFF', minWidth: '90px' }}>Due Date</TableCell>
//                         </TableRow>
//                       </TableHead>
//                       <TableBody>
//                         {enrolledCourses.map((course) => (
//                           <TableRow key={course.courseId}>
//                             <TableCell sx={{ color: '#B0BEC5' }}>{course.courseCode}</TableCell>
//                             <TableCell sx={{ color: '#B0BEC5' }}>{course.courseName}</TableCell>
//                             <TableCell sx={{ color: '#B0BEC5' }}>{course.dueDate}</TableCell>
//                           </TableRow>
//                         ))}
//                       </TableBody>
//                     </Table>
//                   </TableContainer>
//                 </CardContent>
//               </IndustrialPaper>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <IndustrialPaper sx={{ height: '400px' }}>
//                 <CardContent>
//                   <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF' }}>
//                     Due Dates Calendar
//                   </Typography>
//                   <Box sx={{ height: '300px' }}>
//                     <Calendar
//                       localizer={localizer}
//                       events={calendarEvents}
//                       startAccessor="start"
//                       endAccessor="end"
//                       style={{ height: '100%', backgroundColor: '#252B32', color: '#FFFFFF' }}
//                       defaultView="month"
//                       views={['month']}
//                       components={{ toolbar: CustomToolbar }}
//                       eventPropGetter={() => ({
//                         style: {
//                           backgroundColor: '#094c50',
//                           borderRadius: '5px',
//                           color: '#FFFFFF',
//                         },
//                       })}
//                     />
//                   </Box>
//                 </CardContent>
//               </IndustrialPaper>
//             </Grid>
//           </>
//         )}
//         <Grid item xs={12} md={12}>
//           <IndustrialPaper sx={{ height: '200px' }}>
//             <CardContent>
//               <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF', textAlign: 'center' }}>
//                 The University of the South Pacific
//               </Typography>
//               <Typography variant="body1" sx={{ color: '#B0BEC5', mb: 2, textAlign: 'center' }}>
//                 {isAdmin
//                   ? 'Empowering student success through efficient administration. 🌟'
//                   : 'We’re excited to have you on this journey of learning, growth, and transformation. 🌟'}
//               </Typography>
//               <Typography variant="body1" sx={{ color: '#B0BEC5', mb: 2, textAlign: 'center' }}>
//                 Serving the future of students since © 1968
//               </Typography>
//             </CardContent>
//           </IndustrialPaper>
//         </Grid>
//       </Grid>
//     </DashboardLayout>
//   );
// };

// export default Dashboard;


// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Card,
//   CardContent,
//   Typography,
//   Box,
//   Paper,
//   styled,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
// } from '@mui/material';
// import Grid from '@mui/material/Grid';
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import moment from 'moment';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import { useAuth } from '../../hooks/useAuth';
// import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
// import { Doughnut, Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Filler,
//   Title,
// } from 'chart.js';
// import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// import FunctionsIcon from '@mui/icons-material/Functions';
// import PeopleIcon from '@mui/icons-material/People';
// import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
// import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
// import Lottie from 'lottie-react';
// import LoadingAnimation from '../../assets/Animations/LoadingPage/LoadingAnimation.json';
// import {
//   getEnrolledCoursesDashboard,
//   getCompletedCoursesCurrentYear,
//   getTotalCompletedCourses,
//   getGpaData,
// } from "../../Endpoints/StudentEndpoints";
// import {
//   getRegisteredStudentsCount,
//   getActiveCoursesCount,
//   getPendingApprovalsCount,
//   getPendingRequests,
//   getEnrollmentData,
//   getCompletionRateData,
// } from "../../Endpoints/AdminEndpoints";

// ChartJS.register(
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Filler,
//   Title
// );

// const IndustrialPaper = styled(Paper)(({ theme }) => ({
//   background: 'linear-gradient(145deg, #2A2E35 0%, #1A2027 100%)',
//   border: '1px solid #3A3F47',
//   borderRadius: '12px',
//   boxShadow: theme.shadows[6],
//   transition: 'transform 0.2s ease, box-shadow 0.2s ease',
//   '&:hover': {
//     transform: 'translateY(-4px)',
//     boxShadow: theme.shadows[8],
//   },
// }));

// const MetricCard = styled(Card)(({ theme }) => ({
//   background: '#252B32',
//   color: '#FFFFFF',
//   borderRadius: '10px',
//   border: '1px solid #4A4F55',
//   boxShadow: theme.shadows[4],
// }));

// const localizer = momentLocalizer(moment);

// const CustomToolbar = ({ label, onNavigate }) => {
//   return (
//     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
//       <Typography variant="h6" sx={{ color: '#FFFFFF' }}>
//         {label}
//       </Typography>
//       <Box sx={{ display: 'flex', gap: 1 }}>
//         <button
//           style={{
//             background: 'transparent',
//             border: 'none',
//             color: '#FFFFFF',
//             cursor: 'pointer',
//             padding: '5px 10px',
//             fontSize: '1rem',
//           }}
//           onMouseEnter={(e) => (e.target.style.color = '#094c50')}
//           onMouseLeave={(e) => (e.target.style.color = '#FFFFFF')}
//           onClick={() => onNavigate('PREV')}
//         >
//           Back
//         </button>
//         <button
//           style={{
//             background: 'transparent',
//             border: 'none',
//             color: '#FFFFFF',
//             cursor: 'pointer',
//             padding: '5px 10px',
//             fontSize: '1rem',
//           }}
//           onMouseEnter={(e) => (e.target.style.color = '#094c50')}
//           onMouseLeave={(e) => (e.target.style.color = '#FFFFFF')}
//           onClick={() => onNavigate('TODAY')}
//         >
//           Today
//         </button>
//         <button
//           style={{
//             background: 'transparent',
//             border: 'none',
//             color: '#FFFFFF',
//             cursor: 'pointer',
//             padding: '5px 10px',
//             fontSize: '1rem',
//           }}
//           onMouseEnter={(e) => (e.target.style.color = '#094c50')}
//           onMouseLeave={(e) => (e.target.style.color = '#FFFFFF')}
//           onClick={() => onNavigate('NEXT')}
//         >
//           Next
//         </button>
//       </Box>
//     </Box>
//   );
// };

// const Dashboard = ({ studentId, semester, toggleTheme, mode }) => {
//   const { user } = useAuth();
//   const isAdmin = user?.role === 'admin';
//   const [enrolledCourses, setEnrolledCourses] = useState([]);
//   const [completedCourses, setCompletedCourses] = useState(0);
//   const [totalCompletedCourses, setTotalCompletedCourses] = useState(0);
//   const [gpaData, setGpaData] = useState([]);
//   const [registeredStudents, setRegisteredStudents] = useState(0);
//   const [activeCourses, setActiveCourses] = useState(0);
//   const [pendingApprovals, setPendingApprovals] = useState(0);
//   const [pendingRequests, setPendingRequests] = useState([]);
//   const [enrollmentData, setEnrollmentData] = useState([]);
//   const [completionRateData, setCompletionRateData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const currentYear = new Date().getFullYear();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         if (isAdmin) {
//           const [
//             registeredStudentsRes,
//             activeCoursesRes,
//             pendingApprovalsRes,
//             pendingRequestsRes,
//             enrollmentDataRes,
//             completionRateDataRes,
//           ] = await Promise.all([
//             getRegisteredStudentsCount(),
//             getActiveCoursesCount(),
//             getPendingApprovalsCount(),
//             getPendingRequests(),
//             getEnrollmentData(),
//             getCompletionRateData(),
//           ]);

//           setRegisteredStudents(registeredStudentsRes.data.count);
//           setActiveCourses(activeCoursesRes.data.count);
//           setPendingApprovals(pendingApprovalsRes.data.count);
//           setPendingRequests(pendingRequestsRes.data);
//           setEnrollmentData(enrollmentDataRes.data);
//           setCompletionRateData(completionRateDataRes.data);
//         } else {
//           const [enrolled, completed, totalCompleted, gpa] = await Promise.all([
//             getEnrolledCoursesDashboard(),
//             getCompletedCoursesCurrentYear(),
//             getTotalCompletedCourses(),
//             getGpaData(),
//           ]);

//           setEnrolledCourses(enrolled.data);
//           setCompletedCourses(completed.data.count);
//           setTotalCompletedCourses(totalCompleted.data.count);
//           setGpaData(gpa.data);
//         }
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching dashboard data:', err);
//         setError('Failed to load dashboard data. Please try again later.');
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [isAdmin]);

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//         <Lottie animationData={LoadingAnimation} style={{ width: 500, height: 300 }} />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//         <Typography variant="h6" color="error">
//           {error}
//         </Typography>
//       </Box>
//     );
//   }

//   const courseCompletionData = {
//     labels: ['Completed', 'Remaining'],
//     datasets: [
//       {
//         data: [totalCompletedCourses, 20 - totalCompletedCourses],
//         backgroundColor: ['#094c50', '#FFFFFF'],
//         borderWidth: 0,
//       },
//     ],
//   };

//   const courseCompletionOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { position: 'bottom', labels: { color: '#FFFFFF' } },
//       title: { display: true, text: 'Course Completion', color: '#FFFFFF' },
//     },
//     cutout: '70%',
//   };

//   const gpaLineChartData = {
//     labels: gpaData.map((data) => data.semester),
//     datasets: [
//       {
//         label: 'GPA',
//         data: gpaData.map((data) => data.gpa),
//         fill: true,
//         backgroundColor: 'rgba(9, 76, 80, 0.8)',
//         borderColor: '#FFFFFF',
//         tension: 0.4,
//       },
//     ],
//   };

//   const gpaLineChartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     animation: {
//       duration: 1500,
//       easing: 'easeOutQuart',
//     },
//     plugins: {
//       legend: { position: 'top', labels: { color: '#FFFFFF' } },
//       title: { display: true, text: 'GPA by Semester', color: '#FFFFFF' },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         max: 4.5,
//         title: { display: true, text: 'GPA', color: '#FFFFFF' },
//         ticks: { color: '#B0BEC5' },
//       },
//       x: {
//         title: { display: true, text: 'Semesters', color: '#FFFFFF' },
//         ticks: { color: '#B0BEC5' },
//         grid: { color: '#FFFFFF' },
//       },
//     },
//   };

//   const enrollmentChartData = {
//     labels: ['Registered', 'Unregistered'],
//     datasets: [
//       {
//         data: [registeredStudents, 1500 - registeredStudents],
//         backgroundColor: ['#094c50', '#FFFFFF'],
//         borderWidth: 0,
//       },
//     ],
//   };

//   const enrollmentChartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { position: 'bottom', labels: { color: '#FFFFFF' } },
//       title: { display: true, text: 'Student Enrollment', color: '#FFFFFF' },
//     },
//     cutout: '70%',
//   };

//   const completionRateLineChartData = {
//     labels: completionRateData.map((data) => data.semester),
//     datasets: [
//       {
//         label: 'Completion Rate (%)',
//         data: completionRateData.map((data) => data.rate),
//         fill: true,
//         backgroundColor: 'rgba(9, 76, 80, 0.8)',
//         borderColor: '#FFFFFF',
//         tension: 0.4,
//       },
//     ],
//   };

//   const completionRateLineChartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     animation: {
//       duration: 1500,
//       easing: 'easeOutQuart',
//     },
//     plugins: {
//       legend: { position: 'top', labels: { color: '#FFFFFF' } },
//       title: { display: true, text: 'Course Completion Rate by Semester', color: '#FFFFFF' },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         max: 100,
//         title: { display: true, text: 'Completion Rate (%)', color: '#FFFFFF' },
//         ticks: { color: '#B0BEC5' },
//       },
//       x: {
//         title: { display: true, text: 'Semesters', color: '#FFFFFF' },
//         ticks: { color: '#B0BEC5' },
//         grid: { color: '#FFFFFF' },
//       },
//     },
//   };

//   const calendarEvents = isAdmin
//     ? pendingRequests.map((request) => ({
//         title: `${request.requestType} - ${request.studentId}`,
//         start: new Date(request.date),
//         end: new Date(request.date),
//         allDay: true,
//       }))
//     : enrolledCourses.map((course) => ({
//         title: `${course.courseCode} Due`,
//         start: new Date(course.dueDate),
//         end: new Date(course.dueDate),
//         allDay: true,
//       }));

//   return (
//     <DashboardLayout toggleTheme={toggleTheme} mode={mode}>
//       <style>
//         {`
//           .rbc-calendar .rbc-month-view .rbc-day-bg {
//             background-color: #252B32 !important;
//           }
//           .rbc-calendar .rbc-month-view .rbc-today {
//             background-color: #094c50 !important;
//           }
//           .rbc-calendar .rbc-month-view .rbc-off-range-bg {
//             background-color: #1A2027 !important;
//           }
//           .rbc-calendar .rbc-month-view .rbc-event {
//             background-color: #094c50 !important;
//             color: #FFFFFF !important;
//             border-radius: 5px;
//           }
//           .rbc-calendar .rbc-month-view .rbc-day-slot .rbc-event {
//             background-color: #094c50 !important;
//             color: #FFFFFF !important;
//           }
//           .rbc-calendar .rbc-month-view .rbc-day-slot .rbc-event:hover {
//             background-color: #094c50 !important;
//           }
//           .rbc-calendar .rbc-month-view .rbc-day-slot .rbc-event:focus {
//             outline: none;
//           }
//         `}
//       </style>
//       <IndustrialPaper sx={{ p: 3, mb: 4, background: 'linear-gradient(180deg, #dedede 0%, #094c50 100%)' }}>
//         <CardContent>
//           <Typography variant="h5" gutterBottom sx={{ color: '#000', fontWeight: 'bold', fontSize: '2rem' }}>
//             {isAdmin ? 'Admin Dashboard 👋' : 'Welcome back 👋'}
//           </Typography>
//           <Typography variant="body1" sx={{ color: '#000', mb: 2 }}>
//             {isAdmin
//               ? 'Manage student records, courses, and approvals efficiently. 🚀'
//               : 'We’re excited to have you on this journey of learning, growth, and transformation. 🌟'}
//           </Typography>
//         </CardContent>
//       </IndustrialPaper>

//       <Grid container spacing={3} sx={{ mb: 3 }}>
//         {isAdmin ? (
//           <>
//             <Grid item xs={12} md={4}>
//               <MetricCard>
//                 <CardContent sx={{ textAlign: 'center' }}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
//                     <PeopleIcon sx={{ color: '#B0BEC5', mr: 1 }} />
//                     <Typography variant="h6" sx={{ color: '#B0BEC5', fontSize: '1rem' }}>
//                       Registered Students
//                     </Typography>
//                   </Box>
//                   <Typography variant="h4" sx={{ color: '#FFFFFF', fontSize: '2.5rem', fontWeight: 700 }}>
//                     {registeredStudents}
//                   </Typography>
//                 </CardContent>
//               </MetricCard>
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <MetricCard>
//                 <CardContent sx={{ textAlign: 'center' }}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
//                     <LibraryBooksIcon sx={{ color: '#B0BEC5', mr: 1 }} />
//                     <Typography variant="h6" sx={{ color: '#B0BEC5', fontSize: '1rem' }}>
//                       Active Courses
//                     </Typography>
//                   </Box>
//                   <Typography variant="h4" sx={{ color: '#FFFFFF', fontSize: '2.5rem', fontWeight: 700 }}>
//                     {activeCourses}
//                   </Typography>
//                 </CardContent>
//               </MetricCard>
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <MetricCard>
//                 <CardContent sx={{ textAlign: 'center' }}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
//                     <AssignmentTurnedInIcon sx={{ color: '#B0BEC5', mr: 1 }} />
//                     <Typography variant="h6" sx={{ color: '#B0BEC5', fontSize: '1rem' }}>
//                       Pending Approvals
//                     </Typography>
//                   </Box>
//                   <Typography variant="h4" sx={{ color: '#FFFFFF', fontSize: '2.5rem', fontWeight: 700 }}>
//                     {pendingApprovals}
//                   </Typography>
//                 </CardContent>
//               </MetricCard>
//             </Grid>
//           </>
//         ) : (
//           <>
//             <Grid item xs={12} md={4}>
//               <MetricCard>
//                 <CardContent sx={{ textAlign: 'center' }}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
//                     <LocalLibraryIcon sx={{ color: '#B0BEC5', mr: 1 }} />
//                     <Typography variant="h6" sx={{ color: '#B0BEC5', fontSize: '1rem' }}>
//                       Enrolled Courses
//                     </Typography>
//                   </Box>
//                   <Typography variant="h4" sx={{ color: '#FFFFFF', fontSize: '2.5rem', fontWeight: 700 }}>
//                     {enrolledCourses.length}
//                   </Typography>
//                 </CardContent>
//               </MetricCard>
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <MetricCard>
//                 <CardContent sx={{ textAlign: 'center' }}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
//                     <CalendarMonthIcon sx={{ color: '#B0BEC5', mr: 1 }} />
//                     <Typography variant="h6" sx={{ color: '#B0BEC5', fontSize: '1rem' }}>
//                       {getCompletedCoursesCurrentYear} Course Completion
//                     </Typography>
//                   </Box>
//                   <Typography variant="h4" sx={{ color: '#FFFFFF', fontSize: '2.5rem', fontWeight: 700 }}>
//                     {completedCourses > 0 ? completedCourses : 'In Progress'}
//                   </Typography>
//                 </CardContent>
//               </MetricCard>
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <MetricCard>
//                 <CardContent sx={{ textAlign: 'center' }}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
//                     <FunctionsIcon sx={{ color: '#B0BEC5' }} />
//                     <Typography variant="h6" sx={{ color: '#B0BEC5', fontSize: '1rem' }}>
//                       {getTotalCompletedCourses}Overall Course Completion
//                     </Typography>
//                   </Box>
//                   <Typography variant="h4" sx={{ color: '#FFFFFF', fontSize: '2.5rem', fontWeight: 700 }}>
//                     {totalCompletedCourses}
//                   </Typography>
//                 </CardContent>
//               </MetricCard>
//             </Grid>
//           </>
//         )}
//       </Grid>

//       <Grid container spacing={3}>
//         {isAdmin ? (
//           <>
//             <Grid item xs={12} md={6}>
//               <IndustrialPaper sx={{ height: '400px' }}>
//                 <CardContent>
//                   <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF' }}>
//                     Student Enrollment
//                   </Typography>
//                   <Box sx={{ height: '300px' }}>
//                     <Doughnut data={enrollmentChartData} options={enrollmentChartOptions} />
//                   </Box>
//                 </CardContent>
//               </IndustrialPaper>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <IndustrialPaper sx={{ height: '400px' }}>
//                 <CardContent>
//                   <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF' }}>
//                     Course Completion Rate
//                   </Typography>
//                   <Box sx={{ height: '300px' }}>
//                     <Line data={completionRateLineChartData} options={completionRateLineChartOptions} />
//                   </Box>
//                 </CardContent>
//               </IndustrialPaper>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <IndustrialPaper sx={{ height: '400px' }}>
//                 <CardContent>
//                   <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF' }}>
//                     Pending Approval Requests
//                   </Typography>
//                   <TableContainer>
//                     <Table sx={{ backgroundColor: 'transparent' }}>
//                       <TableHead>
//                         <TableRow>
//                           <TableCell sx={{ color: '#FFFFFF', minWidth: '90px' }}>Student ID</TableCell>
//                           <TableCell sx={{ color: '#FFFFFF', minWidth: '90px' }}>Course Code</TableCell>
//                           <TableCell sx={{ color: '#FFFFFF', minWidth: '90px' }}>Request Type</TableCell>
//                           <TableCell sx={{ color: '#FFFFFF', minWidth: '90px' }}>Date</TableCell>
//                         </TableRow>
//                       </TableHead>
//                       <TableBody>
//                         {pendingRequests.map((request) => (
//                           <TableRow key={request.id}>
//                             <TableCell sx={{ color: '#B0BEC5' }}>{request.studentId}</TableCell>
//                             <TableCell sx={{ color: '#B0BEC5' }}>{request.courseCode}</TableCell>
//                             <TableCell sx={{ color: '#B0BEC5' }}>{request.requestType}</TableCell>
//                             <TableCell sx={{ color: '#B0BEC5' }}>{request.date}</TableCell>
//                           </TableRow>
//                         ))}
//                       </TableBody>
//                     </Table>
//                   </TableContainer>
//                 </CardContent>
//               </IndustrialPaper>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <IndustrialPaper sx={{ height: '400px' }}>
//                 <CardContent>
//                   <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF' }}>
//                     Administrative Deadlines
//                   </Typography>
//                   <Box sx={{ height: '300px' }}>
//                     <Calendar
//                       localizer={localizer}
//                       events={calendarEvents}
//                       startAccessor="start"
//                       endAccessor="end"
//                       style={{ height: '100%', backgroundColor: '#252B32', color: '#FFFFFF' }}
//                       defaultView="month"
//                       views={['month']}
//                       components={{ toolbar: CustomToolbar }}
//                       eventPropGetter={() => ({
//                         style: {
//                           backgroundColor: '#094c50',
//                           borderRadius: '5px',
//                           color: '#FFFFFF',
//                         },
//                       })}
//                     />
//                   </Box>
//                 </CardContent>
//               </IndustrialPaper>
//             </Grid>
//           </>
//         ) : (
//           <>
//             <Grid item xs={12} md={6}>
//               <IndustrialPaper sx={{ height: '400px' }}>
//                 <CardContent>
//                   <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF' }}>
//                     Course Completion
//                   </Typography>
//                   <Box sx={{ height: '300px' }}>
//                     <Doughnut data={courseCompletionData} options={courseCompletionOptions} />
//                   </Box>
//                 </CardContent>
//               </IndustrialPaper>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <IndustrialPaper sx={{ height: '400px' }}>
//                 <CardContent>
//                   <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF' }}>
//                     GPA Per Semester
//                   </Typography>
//                   <Box sx={{ height: '300px' }}>
//                     <Line data={gpaLineChartData} options={gpaLineChartOptions} />
//                   </Box>
//                 </CardContent>
//               </IndustrialPaper>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <IndustrialPaper sx={{ height: '400px' }}>
//                 <CardContent>
//                   <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF' }}>
//                     Course Dues
//                   </Typography>
//                   <TableContainer>
//                     <Table sx={{ backgroundColor: 'transparent' }}>
//                       <TableHead>
//                         <TableRow>
//                           <TableCell sx={{ color: '#FFFFFF', minWidth: '90px' }}>Course Code</TableCell>
//                           <TableCell sx={{ color: '#FFFFFF', minWidth: '90px' }}>Timeline</TableCell>
//                           <TableCell sx={{ color: '#FFFFFF', minWidth: '90px' }}>Due Date</TableCell>
//                         </TableRow>
//                       </TableHead>
//                       <TableBody>
//                         {enrolledCourses.map((course) => (
//                           <TableRow key={course.courseId}>
//                             <TableCell sx={{ color: '#B0BEC5' }}>{course.courseCode}</TableCell>
//                             <TableCell sx={{ color: '#B0BEC5' }}>{course.courseName}</TableCell>
//                             <TableCell sx={{ color: '#B0BEC5' }}>{course.dueDate}</TableCell>
//                           </TableRow>
//                         ))}
//                       </TableBody>
//                     </Table>
//                   </TableContainer>
//                 </CardContent>
//               </IndustrialPaper>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <IndustrialPaper sx={{ height: '400px' }}>
//                 <CardContent>
//                   <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF' }}>
//                     Due Dates Calendar
//                   </Typography>
//                   <Box sx={{ height: '300px' }}>
//                     <Calendar
//                       localizer={localizer}
//                       events={calendarEvents}
//                       startAccessor="start"
//                       endAccessor="end"
//                       style={{ height: '100%', backgroundColor: '#252B32', color: '#FFFFFF' }}
//                       defaultView="month"
//                       views={['month']}
//                       components={{ toolbar: CustomToolbar }}
//                       eventPropGetter={() => ({
//                         style: {
//                           backgroundColor: '#094c50',
//                           borderRadius: '5px',
//                           color: '#FFFFFF',
//                         },
//                       })}
//                     />
//                   </Box>
//                 </CardContent>
//               </IndustrialPaper>
//             </Grid>
//           </>
//         )}
//         <Grid item xs={12} md={12}>
//           <IndustrialPaper sx={{ height: '200px' }}>
//             <CardContent>
//               <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF', textAlign: 'center' }}>
//                 The University of the South Pacific
//               </Typography>
//               <Typography variant="body1" sx={{ color: '#B0BEC5', mb: 2, textAlign: 'center' }}>
//                 {isAdmin
//                   ? 'Empowering student success through efficient administration. 🌟'
//                   : 'We’re excited to have you on this journey of learning, growth, and transformation. 🌟'}
//               </Typography>
//               <Typography variant="body1" sx={{ color: '#B0BEC5', mb: 2, textAlign: 'center' }}>
//                 Serving the future of students since © 1968
//               </Typography>
//             </CardContent>
//           </IndustrialPaper>
//         </Grid>
//       </Grid>
//     </DashboardLayout>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useAuth } from '../../hooks/useAuth';
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
import { Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
} from 'chart.js';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FunctionsIcon from '@mui/icons-material/Functions';
import PeopleIcon from '@mui/icons-material/People';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import Lottie from 'lottie-react';
import LoadingAnimation from '../../assets/Animations/LoadingPage/LoadingAnimation.json';
import {
  getEnrolledCoursesDashboard,
  getCompletedCoursesCurrentYear,
  getTotalCompletedCourses,
  getGpaData,
} from "../../Endpoints/StudentEndpoints";
import {
  getRegisteredStudentsCount,
  getActiveCoursesCount,
  getPendingApprovalsCount,
  getPendingRequests,
  getEnrollmentData,
  getCompletionRateData,
} from "../../Endpoints/AdminEndpoints";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title
);

const IndustrialPaper = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(145deg, #2A2E35 0%, #1A2027 100%)',
  border: '1px solid #3A3F47',
  borderRadius: '12px',
  boxShadow: theme.shadows[6],
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
}));

const MetricCard = styled(Card)(({ theme }) => ({
  background: '#252B32',
  color: '#FFFFFF',
  borderRadius: '10px',
  border: '1px solid #4A4F55',
  boxShadow: theme.shadows[4],
}));

const localizer = momentLocalizer(moment);

const CustomToolbar = ({ label, onNavigate }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
      <Typography variant="h6" sx={{ color: '#FFFFFF' }}>
        {label}
      </Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <button
          style={{
            background: 'transparent',
            border: 'none',
            color: '#FFFFFF',
            cursor: 'pointer',
            padding: '5px 10px',
            fontSize: '1rem',
          }}
          onMouseEnter={(e) => (e.target.style.color = '#094c50')}
          onMouseLeave={(e) => (e.target.style.color = '#FFFFFF')}
          onClick={() => onNavigate('PREV')}
        >
          Back
        </button>
        <button
          style={{
            background: 'transparent',
            border: 'none',
            color: '#FFFFFF',
            cursor: 'pointer',
            padding: '5px 10px',
            fontSize: '1rem',
          }}
          onMouseEnter={(e) => (e.target.style.color = '#094c50')}
          onMouseLeave={(e) => (e.target.style.color = '#FFFFFF')}
          onClick={() => onNavigate('TODAY')}
        >
          Today
        </button>
        <button
          style={{
            background: 'transparent',
            border: 'none',
            color: '#FFFFFF',
            cursor: 'pointer',
            padding: '5px 10px',
            fontSize: '1rem',
          }}
          onMouseEnter={(e) => (e.target.style.color = '#094c50')}
          onMouseLeave={(e) => (e.target.style.color = '#FFFFFF')}
          onClick={() => onNavigate('NEXT')}
        >
          Next
        </button>
      </Box>
    </Box>
  );
};

const Dashboard = ({ studentId, semester, toggleTheme, mode }) => {
  const { user } = useAuth();
  console.log("User:", user);
  const isAdmin = user?.role === 'Admin';
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [completedCourses, setCompletedCourses] = useState(0);
  const [totalCompletedCourses, setTotalCompletedCourses] = useState(0);
  const [gpaData, setGpaData] = useState([]);
  const [registeredStudents, setRegisteredStudents] = useState(0);
  const [activeCourses, setActiveCourses] = useState(0);
  const [pendingApprovals, setPendingApprovals] = useState(0);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [enrollmentData, setEnrollmentData] = useState([]);
  const [completionRateData, setCompletionRateData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        if (isAdmin) {
          // Fetch all admin data in parallel
          const [
            registeredStudentsRes,
            activeCoursesRes,
            pendingApprovalsRes,
            pendingRequestsRes,
            enrollmentDataRes,
            completionRateDataRes,
          ] = await Promise.all([
            getRegisteredStudentsCount(),
            getActiveCoursesCount(),
            getPendingApprovalsCount(),
            getPendingRequests(),
            getEnrollmentData(),
            getCompletionRateData(),
          ]);

          setRegisteredStudents(registeredStudentsRes.data);
          setActiveCourses(activeCoursesRes.data);
          setPendingApprovals(pendingApprovalsRes.data);
          setPendingRequests(pendingRequestsRes.data);
          setEnrollmentData(enrollmentDataRes.data);
          setCompletionRateData(completionRateDataRes.data);
        } else {
          // Fetch all student data in parallel
          const [enrolledRes, completedRes, totalCompletedRes, gpaRes] = await Promise.all([
            getEnrolledCoursesDashboard(),
            getCompletedCoursesCurrentYear(),
            getTotalCompletedCourses(),
            getGpaData(),
          ]);

          setEnrolledCourses(enrolledRes.data);
          setCompletedCourses(completedRes.data);
          setTotalCompletedCourses(totalCompletedRes.data);
          setGpaData(gpaRes.data);
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAdmin]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Lottie animationData={LoadingAnimation} style={{ width: 500, height: 300 }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  // Chart data configurations
  const courseCompletionData = {
    labels: ['Completed', 'Remaining'],
    datasets: [
      {
        data: [totalCompletedCourses, 20 - totalCompletedCourses],
        backgroundColor: ['#094c50', '#FFFFFF'],
        borderWidth: 0,
      },
    ],
  };

  const courseCompletionOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { color: '#FFFFFF' } },
      title: { display: true, text: 'Course Completion', color: '#FFFFFF' },
    },
    cutout: '70%',
  };

  const gpaLineChartData = {
    labels: gpaData.map((data) => data.semester),
    datasets: [
      {
        label: 'GPA',
        data: gpaData.map((data) => data.gpa),
        fill: true,
        backgroundColor: 'rgba(9, 76, 80, 0.8)',
        borderColor: '#FFFFFF',
        tension: 0.4,
      },
    ],
  };

  const gpaLineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { color: '#FFFFFF' } },
      title: { display: true, text: 'GPA by Semester', color: '#FFFFFF' },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 4.5,
        title: { display: true, text: 'GPA', color: '#FFFFFF' },
        ticks: { color: '#B0BEC5' },
      },
      x: {
        title: { display: true, text: 'Semesters', color: '#FFFFFF' },
        ticks: { color: '#B0BEC5' },
      },
    },
  };

  const enrollmentChartData = {
    labels: ['Registered', 'Unregistered'],
    datasets: [
      {
        data: [registeredStudents, 1500 - registeredStudents],
        backgroundColor: ['#094c50', '#FFFFFF'],
        borderWidth: 0,
      },
    ],
  };

  const enrollmentChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { color: '#FFFFFF' } },
      title: { display: true, text: 'Student Enrollment', color: '#FFFFFF' },
    },
    cutout: '70%',
  };

  const completionRateLineChartData = {
    labels: completionRateData.map((data) => data.semester),
    datasets: [
      {
        label: 'Completion Rate (%)',
        data: completionRateData.map((data) => data.rate),
        fill: true,
        backgroundColor: 'rgba(9, 76, 80, 0.8)',
        borderColor: '#FFFFFF',
        tension: 0.4,
      },
    ],
  };

  const completionRateLineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { color: '#FFFFFF' } },
      title: { display: true, text: 'Course Completion Rate', color: '#FFFFFF' },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: { display: true, text: 'Rate (%)', color: '#FFFFFF' },
        ticks: { color: '#B0BEC5' },
      },
      x: {
        title: { display: true, text: 'Semesters', color: '#FFFFFF' },
        ticks: { color: '#B0BEC5' },
      },
    },
  };

  const calendarEvents = isAdmin
    ? pendingRequests.map((request) => ({
        title: `${request.requestType} - ${request.studentId}`,
        start: new Date(request.date),
        end: new Date(request.date),
        allDay: true,
      }))
    : enrolledCourses.map((course) => ({
        title: `${course.courseCode} Due`,
        start: new Date(course.dueDate),
        end: new Date(course.dueDate),
        allDay: true,
      }));

  return (
    <DashboardLayout toggleTheme={toggleTheme} mode={mode}>
      <style>
        {`
          .rbc-calendar {
            background-color: #252B32;
            color: #FFFFFF;
          }
          .rbc-calendar .rbc-month-view .rbc-day-bg {
            background-color: #252B32;
          }
          .rbc-calendar .rbc-month-view .rbc-today {
            background-color: #094c50;
          }
          .rbc-calendar .rbc-month-view .rbc-off-range-bg {
            background-color: #1A2027;
          }
          .rbc-calendar .rbc-month-view .rbc-event {
            background-color: #094c50;
            color: #FFFFFF;
            border-radius: 5px;
          }
        `}
      </style>
      
      <IndustrialPaper sx={{ p: 3, mb: 4, background: 'linear-gradient(180deg, #dedede 0%, #094c50 100%)' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ color: '#000', fontWeight: 'bold', fontSize: '2rem' }}>
            {isAdmin ? 'Admin Dashboard 👋' : 'Welcome back 👋'}
          </Typography>
          <Typography variant="body1" sx={{ color: '#000', mb: 2 }}>
            {isAdmin ? 'Manage student records, courses, and approvals efficiently. 🚀' : 'We are excited to have you on this journey of learning, growth, and transformation. 🌟'}
              
          </Typography>
        </CardContent>
      </IndustrialPaper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        {isAdmin ? (
          <>
            <Grid item xs={12} md={4}>
              <MetricCard>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                    <PeopleIcon sx={{ color: '#B0BEC5', mr: 1 }} />
                    <Typography variant="h6" sx={{ color: '#B0BEC5', fontSize: '1rem' }}>
                      Registered Students
                    </Typography>
                  </Box>
                  <Typography variant="h4" sx={{ color: '#FFFFFF', fontSize: '2.5rem', fontWeight: 700 }}>
                    {registeredStudents}
                  </Typography>
                </CardContent>
              </MetricCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <MetricCard>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                    <LibraryBooksIcon sx={{ color: '#B0BEC5', mr: 1 }} />
                    <Typography variant="h6" sx={{ color: '#B0BEC5', fontSize: '1rem' }}>
                      Active Courses
                    </Typography>
                  </Box>
                  <Typography variant="h4" sx={{ color: '#FFFFFF', fontSize: '2.5rem', fontWeight: 700 }}>
                    {activeCourses}
                  </Typography>
                </CardContent>
              </MetricCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <MetricCard>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                    <AssignmentTurnedInIcon sx={{ color: '#B0BEC5', mr: 1 }} />
                    <Typography variant="h6" sx={{ color: '#B0BEC5', fontSize: '1rem' }}>
                      Pending Approvals
                    </Typography>
                  </Box>
                  <Typography variant="h4" sx={{ color: '#FFFFFF', fontSize: '2.5rem', fontWeight: 700 }}>
                    {pendingApprovals}
                  </Typography>
                </CardContent>
              </MetricCard>
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12} md={4}>
              <MetricCard>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                    <LocalLibraryIcon sx={{ color: '#B0BEC5', mr: 1 }} />
                    <Typography variant="h6" sx={{ color: '#B0BEC5', fontSize: '1rem' }}>
                      Enrolled Courses
                    </Typography>
                  </Box>
                  <Typography variant="h4" sx={{ color: '#FFFFFF', fontSize: '2.5rem', fontWeight: 700 }}>
                    {enrolledCourses.length}
                  </Typography>
                </CardContent>
              </MetricCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <MetricCard>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                    <CalendarMonthIcon sx={{ color: '#B0BEC5', mr: 1 }} />
                    <Typography variant="h6" sx={{ color: '#B0BEC5', fontSize: '1rem' }}>
                      {currentYear} Course Completion
                    </Typography>
                  </Box>
                  <Typography variant="h4" sx={{ color: '#FFFFFF', fontSize: '2.5rem', fontWeight: 700 }}>
                    {completedCourses > 0 ? completedCourses : 'In Progress'}
                  </Typography>
                </CardContent>
              </MetricCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <MetricCard>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                    <FunctionsIcon sx={{ color: '#B0BEC5' }} />
                    <Typography variant="h6" sx={{ color: '#B0BEC5', fontSize: '1rem' }}>
                      Overall Course Completion
                    </Typography>
                  </Box>
                  <Typography variant="h4" sx={{ color: '#FFFFFF', fontSize: '2.5rem', fontWeight: 700 }}>
                    {totalCompletedCourses}
                  </Typography>
                </CardContent>
              </MetricCard>
            </Grid>
          </>
        )}
      </Grid>

      <Grid container spacing={3}>
        {isAdmin ? (
          <>
            <Grid item xs={12} md={6}>
              <IndustrialPaper sx={{ height: '400px' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF' }}>
                    Student Enrollment
                  </Typography>
                  <Box sx={{ height: '300px' }}>
                    <Doughnut data={enrollmentChartData} options={enrollmentChartOptions} />
                  </Box>
                </CardContent>
              </IndustrialPaper>
            </Grid>
            <Grid item xs={12} md={6}>
              <IndustrialPaper sx={{ height: '400px' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF' }}>
                    Course Completion Rate
                  </Typography>
                  <Box sx={{ height: '300px' }}>
                    <Line data={completionRateLineChartData} options={completionRateLineChartOptions} />
                  </Box>
                </CardContent>
              </IndustrialPaper>
            </Grid>
            <Grid item xs={12} md={6}>
              <IndustrialPaper sx={{ height: '400px' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF' }}>
                    Pending Approval Requests
                  </Typography>
                  <TableContainer>
                    <Table sx={{ backgroundColor: 'transparent' }}>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ color: '#FFFFFF', minWidth: '90px' }}>Student ID</TableCell>
                          <TableCell sx={{ color: '#FFFFFF', minWidth: '90px' }}>Request Type</TableCell>
                          <TableCell sx={{ color: '#FFFFFF', minWidth: '90px' }}>Date</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {pendingRequests.map((request) => (
                          <TableRow key={request.id}>
                            <TableCell sx={{ color: '#B0BEC5' }}>{request.studentId}</TableCell>
                            <TableCell sx={{ color: '#B0BEC5' }}>{request.requestType}</TableCell>
                            <TableCell sx={{ color: '#B0BEC5' }}>{new Date(request.date).toLocaleDateString()}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </IndustrialPaper>
            </Grid>
            <Grid item xs={12} md={6}>
              <IndustrialPaper sx={{ height: '400px' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF' }}>
                    Administrative Deadlines
                  </Typography>
                  <Box sx={{ height: '300px' }}>
                    <Calendar
                      localizer={localizer}
                      events={calendarEvents}
                      startAccessor="start"
                      endAccessor="end"
                      style={{ height: '100%' }}
                      components={{ toolbar: CustomToolbar }}
                      eventPropGetter={() => ({
                        style: {
                          backgroundColor: '#094c50',
                          borderRadius: '5px',
                          color: '#FFFFFF',
                        },
                      })}
                    />
                  </Box>
                </CardContent>
              </IndustrialPaper>
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12} md={6}>
              <IndustrialPaper sx={{ height: '400px' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF' }}>
                    Course Completion
                  </Typography>
                  <Box sx={{ height: '300px' }}>
                    <Doughnut data={courseCompletionData} options={courseCompletionOptions} />
                  </Box>
                </CardContent>
              </IndustrialPaper>
            </Grid>
            <Grid item xs={12} md={6}>
              <IndustrialPaper sx={{ height: '400px' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF' }}>
                    GPA Per Semester
                  </Typography>
                  <Box sx={{ height: '300px' }}>
                    <Line data={gpaLineChartData} options={gpaLineChartOptions} />
                  </Box>
                </CardContent>
              </IndustrialPaper>
            </Grid>
            <Grid item xs={12} md={6}>
              <IndustrialPaper sx={{ height: '400px' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF' }}>
                    Course Dues
                  </Typography>
                  <TableContainer>
                    <Table sx={{ backgroundColor: 'transparent' }}>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ color: '#FFFFFF', minWidth: '90px' }}>Course Code</TableCell>
                          <TableCell sx={{ color: '#FFFFFF', minWidth: '90px' }}>Course Name</TableCell>
                          <TableCell sx={{ color: '#FFFFFF', minWidth: '90px' }}>Due Date</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {enrolledCourses.map((course) => (
                          <TableRow key={course.courseId}>
                            <TableCell sx={{ color: '#B0BEC5' }}>{course.courseCode}</TableCell>
                            <TableCell sx={{ color: '#B0BEC5' }}>{course.courseName}</TableCell>
                            <TableCell sx={{ color: '#B0BEC5' }}>{new Date(course.dueDate).toLocaleDateString()}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </IndustrialPaper>
            </Grid>
            <Grid item xs={12} md={6}>
              <IndustrialPaper sx={{ height: '400px' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF' }}>
                    Due Dates Calendar
                  </Typography>
                  <Box sx={{ height: '300px' }}>
                    <Calendar
                      localizer={localizer}
                      events={calendarEvents}
                      startAccessor="start"
                      endAccessor="end"
                      style={{ height: '100%' }}
                      components={{ toolbar: CustomToolbar }}
                      eventPropGetter={() => ({
                        style: {
                          backgroundColor: '#094c50',
                          borderRadius: '5px',
                          color: '#FFFFFF',
                        },
                      })}
                    />
                  </Box>
                </CardContent>
              </IndustrialPaper>
            </Grid>
          </>
        )}
        <Grid item xs={12} md={12}>
          <IndustrialPaper sx={{ height: '200px' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF', textAlign: 'center' }}>
                The University of the South Pacific
              </Typography>
              <Typography variant="body1" sx={{ color: '#B0BEC5', mb: 2, textAlign: 'center' }}>
                {isAdmin
                  ? 'Empowering student success through efficient administration. 🌟'
                  : 'We are excited to have you on this journey of learning, growth, and transformation. 🌟'}
              </Typography>
              <Typography variant="body1" sx={{ color: '#B0BEC5', mb: 2, textAlign: 'center' }}>
                Serving the future of students since © 1968
              </Typography>
            </CardContent>
          </IndustrialPaper>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default Dashboard;