// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Typography,
//   Alert,
//   Box,
//   Snackbar,
//   Button,
//   Paper,
//   Grid,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
// } from '@mui/material';
// import Lottie from 'lottie-react';
// import ReactFlow, { Background, Controls } from 'reactflow';
// import 'reactflow/dist/style.css';
// import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
// import LoadingAnimation from '../../assets/Animations/LoadingPage/LoadingAnimation.json';
// import TitleBar from '../../components/Titlebar/Titlebar';

// // Mock data for available courses
// const mockAvailableCourses = [
//   { courseCode: 'CS111', courseName: 'Introduction to Computing Science', year: 1, program: ['NS', 'SE'] },
//   { courseCode: 'CS112', courseName: 'Data Structures & Algorithms', year: 1, program: ['NS', 'SE'] },
//   { courseCode: 'CS140', courseName: 'Introduction to Software Engineering', year: 1, program: ['SE'] },
//   { courseCode: 'CS150', courseName: 'Introduction to Computer Networks & Security', year: 1, program: ['NS'] },
//   { courseCode: 'MA111', courseName: 'Mathematics', year: 1, program: ['NS', 'SE'] },
//   { courseCode: 'MA161', courseName: 'Discrete Mathematics', year: 1, program: ['NS', 'SE'] },
//   { courseCode: 'MG101', courseName: 'Introduction to Management', year: 1, program: ['NS', 'SE'] },
//   { courseCode: 'ST131', courseName: 'Statistics', year: 1, program: ['NS', 'SE'] },
//   { courseCode: 'UU100A', courseName: 'Information Literacy', year: 1, program: ['NS', 'SE'] },
//   { courseCode: 'UU114', courseName: 'English for Academic Purposes', year: 1, program: ['NS', 'SE'] },
//   { courseCode: 'CS211', courseName: 'Computer Organisation', year: 2, program: ['NS', 'SE'] },
//   { courseCode: 'CS214', courseName: 'Design & Analysis of Algorithms', year: 2, program: ['NS', 'SE'] },
//   { courseCode: 'CS215', courseName: 'Computer Communications & Management', year: 2, program: ['NS'] },
//   { courseCode: 'CS218', courseName: 'Mobile Computing', year: 2, program: ['NS', 'SE'] },
//   { courseCode: 'CS219', courseName: 'Cloud Computing', year: 2, program: ['NS', 'SE'] },
//   { courseCode: 'CS230', courseName: 'Requirements Engineering', year: 2, program: ['SE'] },
//   { courseCode: 'CS241', courseName: 'Software Design & Implementation', year: 2, program: ['SE'] },
//   { courseCode: 'IS221', courseName: 'Information Systems I', year: 2, program: ['NS', 'SE'] },
//   { courseCode: 'IS222', courseName: 'Information Systems II', year: 2, program: ['NS', 'SE'] },
//   { courseCode: 'UU200', courseName: 'Ethics & Governance', year: 2, program: ['NS', 'SE'] },
//   { courseCode: 'CS001', courseName: 'Foundations of Professional Practice', year: 2, program: ['NS', 'SE'] },
//   { courseCode: 'CS310', courseName: 'Computer Networks', year: 3, program: ['NS', 'SE'] },
//   { courseCode: 'CS311', courseName: 'Operating Systems', year: 3, program: ['NS', 'SE'] },
//   { courseCode: 'CS317', courseName: 'Computer & Network Security', year: 3, program: ['NS'] },
//   { courseCode: 'CS324', courseName: 'Distributed Computing', year: 3, program: ['NS', 'SE'] },
//   { courseCode: 'CS341', courseName: 'Software Quality Assurance & Testing', year: 3, program: ['SE'] },
//   { courseCode: 'CS350', courseName: 'Wireless Networks', year: 3, program: ['NS'] },
//   { courseCode: 'CS351', courseName: 'Network Design & Administration', year: 3, program: ['NS'] },
//   { courseCode: 'CS352', courseName: 'IT Infrastructure & Security', year: 3, program: ['NS', 'SE'] },
//   { courseCode: 'IS314', courseName: 'Business Process Analysis', year: 3, program: ['SE'] },
//   { courseCode: 'IS328', courseName: 'Software Project Management', year: 3, program: ['SE'] },
//   { courseCode: 'IS333', courseName: 'Project Management', year: 3, program: ['NS', 'SE'] },
//   { courseCode: 'CS400', courseName: 'Industry Experience Project (IEP)', year: 4, program: ['NS', 'SE'] },
//   { courseCode: 'CS403', courseName: 'Cybercrime & Digital Forensics', year: 4, program: ['NS', 'SE'] },
//   { courseCode: 'CS412', courseName: 'Advanced Networks', year: 4, program: ['NS', 'SE'] },
//   { courseCode: 'CS415', courseName: 'Software Engineering Project', year: 4, program: ['SE'] },
//   { courseCode: 'CS424', courseName: 'Network Security & Forensics', year: 4, program: ['NS', 'SE'] },
// ];

// // Mock prerequisite graph
// const mockPrerequisiteGraph = {
//   CS111: [],
//   CS112: ['CS111'],
//   CS140: [],
//   CS150: [],
//   MA111: [],
//   MA161: [],
//   MG101: [],
//   ST131: [],
//   UU100A: [],
//   UU114: [],
//   CS211: ['CS111'],
//   CS214: ['CS112'],
//   CS215: ['CS111', 'CS150'],
//   CS218: ['CS112'],
//   CS219: ['CS112'],
//   CS230: ['CS111', 'CS140'],
//   CS241: ['CS112', 'CS230'],
//   IS221: [],
//   IS222: [],
//   UU200: [],
//   CS001: [],
//   CS310: ['CS211'],
//   CS311: ['CS211'],
//   CS317: ['CS215'],
//   CS324: ['CS218', 'CS219', 'CS214', 'CS215'],
//   CS341: ['CS241'],
//   CS350: ['CS215'],
//   CS351: ['CS215'],
//   CS352: ['CS215'],
//   IS314: [],
//   IS328: [],
//   IS333: ['CS211', 'CS214', 'CS215', 'CS218', 'CS219', 'CS230', 'CS241', 'IS221', 'IS222'],
//   CS400: [],
//   CS403: [],
//   CS412: [],
//   CS415: [],
//   CS424: [],
// };

// // BNS Courses and Prerequisites
// const bnsCourses = [
//   { courseCode: 'CS111', courseName: 'Introduction to Computing Science', year: 1, prerequisites: ['50% in Year 13/Form 7 Mathematics'] },
//   { courseCode: 'CS112', courseName: 'Data Structures & Algorithms', year: 1, prerequisites: ['CS111'] },
//   { courseCode: 'CS150', courseName: 'Introduction to Computer Networks & Security', year: 1, prerequisites: [] },
//   { courseCode: 'MA111', courseName: 'Mathematics', year: 1, prerequisites: [] },
//   { courseCode: 'MA161', courseName: 'Discrete Mathematics', year: 1, prerequisites: [] },
//   { courseCode: 'MG101', courseName: 'Introduction to Management', year: 1, prerequisites: [] },
//   { courseCode: 'ST131', courseName: 'Statistics', year: 1, prerequisites: [] },
//   { courseCode: 'UU100A', courseName: 'Information Literacy', year: 1, prerequisites: [] },
//   { courseCode: 'UU114', courseName: 'English for Academic Purposes', year: 1, prerequisites: [] },
//   { courseCode: 'CS211', courseName: 'Computer Organisation', year: 2, prerequisites: ['CS111'] },
//   { courseCode: 'CS214', courseName: 'Design & Analysis of Algorithms', year: 2, prerequisites: ['CS112'] },
//   { courseCode: 'CS215', courseName: 'Computer Communications & Management', year: 2, prerequisites: ['CS111', 'CS150'] },
//   { courseCode: 'CS218', courseName: 'Mobile Computing', year: 2, prerequisites: ['CS112'] },
//   { courseCode: 'CS219', courseName: 'Cloud Computing', year: 2, prerequisites: ['CS112'] },
//   { courseCode: 'IS221', courseName: 'Information Systems I', year: 2, prerequisites: [] },
//   { courseCode: 'IS222', courseName: 'Information Systems II', year: 2, prerequisites: [] },
//   { courseCode: 'UU200', courseName: 'Ethics & Governance', year: 2, prerequisites: [] },
//   { courseCode: 'CS001', courseName: 'Foundations of Professional Practice', year: 2, prerequisites: [] },
//   { courseCode: 'CS310', courseName: 'Computer Networks', year: 3, prerequisites: ['CS211'] },
//   { courseCode: 'CS311', courseName: 'Operating Systems', year: 3, prerequisites: ['CS211'] },
//   { courseCode: 'CS317', courseName: 'Computer & Network Security', year: 3, prerequisites: ['CS215'] },
//   { courseCode: 'CS324', courseName: 'Distributed Computing', year: 3, prerequisites: ['CS218', 'CS219', 'CS214', 'CS215'], prerequisiteType: 'OR' },
//   { courseCode: 'CS350', courseName: 'Wireless Networks', year: 3, prerequisites: ['CS215'] },
//   { courseCode: 'CS351', courseName: 'Network Design & Administration', year: 3, prerequisites: ['CS215'] },
//   { courseCode: 'CS352', courseName: 'IT Infrastructure & Security', year: 3, prerequisites: ['CS215'] },
//   { courseCode: 'IS333', courseName: 'Project Management', year: 3, prerequisites: ['Completion of 200-level CS/IS courses'] },
//   { courseCode: 'CS400', courseName: 'Industry Experience Project (IEP)', year: 4, prerequisites: [] },
//   { courseCode: 'CS403', courseName: 'Cybercrime & Digital Forensics', year: 4, prerequisites: [] },
//   { courseCode: 'CS412', courseName: 'Advanced Networks', year: 4, prerequisites: [] },
//   { courseCode: 'CS424', courseName: 'Network Security & Forensics', year: 4, prerequisites: [] },
// ];

// // Mock API functions
// const getAvailableCourses = async () =>
//   new Promise((resolve) => setTimeout(() => resolve(mockAvailableCourses), 500));

// const getPrerequisiteGraph = async (courseCode) =>
//   new Promise((resolve) => setTimeout(() => resolve(mockPrerequisiteGraph[courseCode] || []), 500));

// const mockRegisterCourse = async (courseCode) =>
//   new Promise((resolve) => setTimeout(() => resolve(`Registered ${courseCode}`), 500));

// // Custom Node for ReactFlow
// const CustomNode = ({ data }) => {
//   const { courseCode, year } = data;
//   const color = {
//     1: '#094c50',
//     2: '#2596be',
//     3: '#388e3c',
//     4: '#d32f2f',
//   }[year] || '#424242';

//   return (
//     <Box
//       sx={{
//         backgroundColor: color,
//         color: '#fff',
//         padding: '10px',
//         borderRadius: '8px',
//         textAlign: 'center',
//         width: '100px',
//         fontSize: '12px',
//         fontWeight: 'bold',
//         cursor: 'pointer',
//       }}
//     >
//       {courseCode}
//     </Box>
//   );
// };

// // Enrollment Component
// const Enrollment = () => {
//   const navigate = useNavigate();
//   const [studentId] = useState('12345');
//   const [program] = useState('NS');
//   const [courses, setCourses] = useState([]);
//   const [lockedCourses, setLockedCourses] = useState(new Set());
//   const [enrolledCourses, setEnrolledCourses] = useState(() => {
//     const saved = localStorage.getItem('enrolledCourses');
//     return saved ? JSON.parse(saved) : [];
//   });
//   const [droppedCourses, setDroppedCourses] = useState(() => {
//     const saved = localStorage.getItem('droppedCourses');
//     return saved ? JSON.parse(saved) : [];
//   });
//   const [selectedEnrolledCourse, setSelectedEnrolledCourse] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [enrollLoading, setEnrollLoading] = useState(false);
//   const [dropLoading, setDropLoading] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [enrollDialogOpen, setEnrollDialogOpen] = useState(false);
//   const [dropDialogOpen, setDropDialogOpen] = useState(false);
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [selectedYear, setSelectedYear] = useState({ 1: '', 2: '', 3: '', 4: '' });
//   const [courseDialogOpen, setCourseDialogOpen] = useState(false);
//   const [selectedCourseDetails, setSelectedCourseDetails] = useState(null);

//   // Save enrolled and dropped courses to localStorage
//   useEffect(() => {
//     localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
//     localStorage.setItem('droppedCourses', JSON.stringify(droppedCourses));
//   }, [enrolledCourses, droppedCourses]);

//   // Authentication Check
//   useEffect(() => {
//     const token = localStorage.getItem('token') || 'dummy-token';
//     if (!token) {
//       setError('Authentication failed. Please log in again.');
//       navigate('/login');
//     }
//   }, [navigate]);

//   // Fetch Courses and Prerequisites
//   useEffect(() => {
//     const fetchCoursesAndPrerequisites = async () => {
//       try {
//         const startTime = Date.now();
//         const coursesData = await getAvailableCourses();
//         if (!Array.isArray(coursesData)) throw new Error('Invalid course data received.');

//         // Filter by program and exclude enrolled courses
//         const availableCourses = coursesData.filter(
//           (course) =>
//             course.program.includes(program) &&
//             !enrolledCourses.some((ec) => ec.courseCode === course.courseCode)
//         );
//         setCourses(availableCourses);

//         // Check prerequisites
//         const lockedSet = new Set();
//         for (const course of coursesData) {
//           if (!course.program.includes(program)) continue;
//           const unmetPrereqs = await getPrerequisiteGraph(course.courseCode);
//           let hasUnmetPrereqs = false;
//           if (course.courseCode === 'CS324') {
//             hasUnmetPrereqs = !unmetPrereqs.some((prereq) =>
//               enrolledCourses.some((ec) => ec.courseCode === prereq)
//             );
//           } else if (course.courseCode === 'IS333') {
//             hasUnmetPrereqs = !unmetPrereqs.every((prereq) =>
//               enrolledCourses.some((ec) => ec.courseCode === prereq)
//             );
//           } else {
//             hasUnmetPrereqs = unmetPrereqs.some(
//               (prereq) => !enrolledCourses.some((ec) => ec.courseCode === prereq)
//             );
//           }
//           if (hasUnmetPrereqs) lockedSet.add(course.courseCode);
//         }
//         setLockedCourses(lockedSet);

//         // Ensure minimum 3-second delay
//         const elapsedTime = Date.now() - startTime;
//         const remainingTime = 3000 - elapsedTime;
//         if (remainingTime > 0) {
//           await new Promise((resolve) => setTimeout(resolve, remainingTime));
//         }
//       } catch (err) {
//         console.error('[DEBUG] Fetch Error:', err);
//         setError(err.message || 'Failed to load courses.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCoursesAndPrerequisites();
//   }, [enrolledCourses, program]);

//   // Define ReactFlow nodes and edges for BNS prerequisites
//   const nodes = bnsCourses.map((course, index) => ({
//     id: course.courseCode,
//     type: 'custom',
//     data: { courseCode: course.courseCode, year: course.year },
//     position: {
//       x: course.year * 250 - 200,
//       y: index % 9 * 100,
//     },
//   }));

//   const edges = bnsCourses.flatMap((course) =>
//     course.prerequisites
//       .filter((prereq) => prereq !== '50% in Year 13/Form 7 Mathematics' && prereq !== 'Completion of 200-level CS/IS courses')
//       .map((prereq) => ({
//         id: `${prereq}-${course.courseCode}`,
//         source: prereq,
//         target: course.courseCode,
//         type: 'smoothstep',
//         style: { stroke: '#2596be', strokeWidth: 2 },
//         animated: course.prerequisiteType === 'OR',
//       }))
//   );

//   // Handlers
//   const handleYearSelectChange = (year, courseCode) => {
//     setSelectedYear((prev) => ({ ...prev, [year]: courseCode }));
//     const course = courses.find((c) => c.courseCode === courseCode);
//     if (course && !lockedCourses.has(courseCode)) {
//       setSelectedCourse(course);
//       setEnrollDialogOpen(true);
//     }
//   };

//   const confirmEnroll = async () => {
//     if (!selectedCourse) return;
//     setEnrollLoading(true);
//     try {
//       await mockRegisterCourse(selectedCourse.courseCode);
//       setEnrolledCourses((prev) => [...prev, { ...selectedCourse, status: 'Waiting Approval' }]);
//       setCourses((prev) => prev.filter((c) => c.courseCode !== selectedCourse.courseCode));
//       setSnackbarMessage(`Successfully enrolled in ${selectedCourse.courseName}!`);
//       setSnackbarOpen(true);
//       setError('');
//       setSelectedYear((prev) => ({ ...prev, [selectedCourse.year]: '' }));
//       setSelectedEnrolledCourse('');
//     } catch (err) {
//       console.error('[Enrollment] Error enrolling course:', err);
//       setError(`Failed to enroll in ${selectedCourse.courseName}. Please try again.`);
//     } finally {
//       setEnrollLoading(false);
//       setEnrollDialogOpen(false);
//       setSelectedCourse(null);
//     }
//   };

//   const handleDrop = () => {
//     if (!selectedEnrolledCourse) {
//       setSnackbarMessage('Please select a course to drop.');
//       setSnackbarOpen(true);
//       return;
//     }
//     const course = enrolledCourses.find((c) => c.courseCode === selectedEnrolledCourse);
//     if (course) {
//       setSelectedCourse(course);
//       setDropDialogOpen(true);
//     }
//   };

//   const confirmDrop = async () => {
//     if (!selectedCourse) return;
//     setDropLoading(true);
//     try {
//       setEnrolledCourses((prev) => prev.filter((c) => c.courseCode !== selectedCourse.courseCode));
//       setCourses((prev) => [...prev, selectedCourse]);
//       setDroppedCourses((prev) => [...prev, selectedCourse]);
//       setSnackbarMessage(`Successfully dropped ${selectedCourse.courseName}!`);
//       setSnackbarOpen(true);
//       setSelectedEnrolledCourse('');
//     } finally {
//       setDropLoading(false);
//       setDropDialogOpen(false);
//       setSelectedCourse(null);
//     }
//   };

//   const handleNodeClick = (event, node) => {
//     const course = bnsCourses.find((c) => c.courseCode === node.id);
//     setSelectedCourseDetails(course);
//     setCourseDialogOpen(true);
//   };

//   const handleSnackbarClose = () => setSnackbarOpen(false);

//   // Group courses by year
//   const coursesByYear = {
//     1: courses.filter((c) => c.year === 1),
//     2: courses.filter((c) => c.year === 2),
//     3: courses.filter((c) => c.year === 3),
//     4: courses.filter((c) => c.year === 4),
//   };

//   if (loading) {
//     return (
//       <DashboardLayout>
//         <Box
//           sx={{
//             p: 3,
//             minHeight: '100vh',
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}
//         >
//           <Lottie
//             animationData={LoadingAnimation}
//             loop
//             style={{ width: 500, height: 300, marginBottom: 16 }}
//           />
//         </Box>
//       </DashboardLayout>
//     );
//   }

//   return (
//     <DashboardLayout>
//       <Grid container spacing={2}>
//         <Grid item xs={12}>
//           <TitleBar title="Enrollment" />
//         </Grid>

//         {error && (
//           <Grid item xs={12}>
//             <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
//               {error}
//             </Alert>
//           </Grid>
//         )}

//         <Grid item xs={12}>
//           <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: '20px' }}>
//             <Typography
//               variant="h6"
//               sx={{ fontWeight: 'bold', fontSize: '1.5rem', textAlign: 'center', color: '#000000' }}
//             >
//               Available Courses
//             </Typography>
//             {Object.keys(coursesByYear).map((year) => (
//               <Box key={year} sx={{ mb: 3 }}>
//                 <FormControl fullWidth sx={{ mt: 2 }}>
//                   <InputLabel>Year {year} Courses</InputLabel>
//                   <Select
//                     value={selectedYear[year] || ''}
//                     onChange={(e) => handleYearSelectChange(year, e.target.value)}
//                     label={`Year ${year} Courses`}
//                   >
//                     <MenuItem value="" disabled>
//                       Select a course
//                     </MenuItem>
//                     {coursesByYear[year].length > 0 ? (
//                       coursesByYear[year].map((course) => (
//                         <MenuItem
//                           key={course.courseCode}
//                           value={course.courseCode}
//                           disabled={lockedCourses.has(course.courseCode)}
//                         >
//                           {course.courseCode} - {course.courseName}
//                           {lockedCourses.has(course.courseCode) && ' (Prerequisites not met)'}
//                         </MenuItem>
//                       ))
//                     ) : (
//                       <MenuItem disabled>No courses available</MenuItem>
//                     )}
//                   </Select>
//                 </FormControl>
//               </Box>
//             ))}
//           </Paper>
//         </Grid>

//         <Grid item xs={12}>
//           <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: '20px' }}>
//             <Typography
//               variant="h6"
//               sx={{ fontWeight: 'bold', fontSize: '1.5rem', textAlign: 'center', color: '#000000', mb: 2 }}
//             >
//               BNS Prerequisite Graph
//             </Typography>
//             <Box sx={{ height: '600px', width: '100%' }}>
//               <ReactFlow
//                 nodes={nodes}
//                 edges={edges}
//                 nodeTypes={{ custom: CustomNode }}
//                 onNodeClick={handleNodeClick}
//                 fitView
//                 style={{ background: '#f5f5f5' }}
//               >
//                 <Background />
//                 <Controls />
//               </ReactFlow>
//             </Box>
//           </Paper>
//         </Grid>

//         <Grid container item xs={12} spacing={2}>
//           {/* Enrolled Courses Column */}
//           <Grid item xs={6}>
//             <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: '20px' }}>
//               <Typography variant="h6" gutterBottom sx={{ color: '#424242' }}>
//                 Enrolled Courses
//               </Typography>
//               <FormControl fullWidth sx={{ mt: 2 }}>
//                 <InputLabel>Enrolled Courses</InputLabel>
//                 <Select
//                   value={selectedEnrolledCourse}
//                   onChange={(e) => setSelectedEnrolledCourse(e.target.value)}
//                   label="Enrolled Courses"
//                 >
//                   <MenuItem value="" disabled>
//                     Select a course
//                   </MenuItem>
//                   {enrolledCourses.length > 0 ? (
//                     enrolledCourses.map((course) => (
//                       <MenuItem key={course.courseCode} value={course.courseCode}>
//                         {course.courseCode} - {course.courseName} (Status: {course.status})
//                       </MenuItem>
//                     ))
//                   ) : (
//                     <MenuItem disabled>No enrolled courses</MenuItem>
//                   )}
//                 </Select>
//               </FormControl>
//               {selectedEnrolledCourse && (
//                 <Button
//                   variant="outlined"
//                   color="error"
//                   onClick={handleDrop}
//                   sx={{ mt: 2 }}
//                 >
//                   Drop Course
//                 </Button>
//               )}
//             </Paper>
//           </Grid>

//           {/* Dropped Courses Column */}
//           <Grid item xs={6}>
//             <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: '20px' }}>
//               <Typography variant="h6" gutterBottom sx={{ color: '#424242' }}>
//                 Dropped Courses
//               </Typography>
//               <FormControl fullWidth sx={{ mt: 2 }}>
//                 <InputLabel>Dropped Courses</InputLabel>
//                 <Select
//                   value=""
//                   onChange={() => {}}
//                   label="Dropped Courses"
//                 >
//                   <MenuItem value="" disabled>
//                     Dropped courses
//                   </MenuItem>
//                   {droppedCourses.length > 0 ? (
//                     droppedCourses.map((course) => (
//                       <MenuItem key={course.courseCode} value={course.courseCode} disabled>
//                         {course.courseCode} - {course.courseName}
//                       </MenuItem>
//                     ))
//                   ) : (
//                     <MenuItem disabled>No dropped courses</MenuItem>
//                   )}
//                 </Select>
//               </FormControl>
//             </Paper>
//           </Grid>
//         </Grid>

//         {/* Enroll Confirmation Dialog */}
//         <Dialog open={enrollDialogOpen} onClose={() => setEnrollDialogOpen(false)}>
//           <DialogTitle>Confirm Enrollment</DialogTitle>
//           <DialogContent sx={{ textAlign: 'center' }}>
//             {enrollLoading ? (
//               <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 2 }}>
//                 <Lottie
//                   animationData={LoadingAnimation}
//                   loop
//                   style={{ width: 500, height: 300 }}
//                 />
//                 <Typography variant="body1">Enrolling in course...</Typography>
//               </Box>
//             ) : (
//               <Typography>
//                 Are you sure you want to enroll in{' '}
//                 {selectedCourse?.courseName} ({selectedCourse?.courseCode})?
//               </Typography>
//             )}
//           </DialogContent>
//           {!enrollLoading && (
//             <DialogActions>
//               <Button onClick={() => setEnrollDialogOpen(false)} color="primary">
//                 No
//               </Button>
//               <Button onClick={confirmEnroll} color="primary" variant="contained">
//                 Yes
//               </Button>
//             </DialogActions>
//           )}
//         </Dialog>

//         {/* Drop Confirmation Dialog */}
//         <Dialog open={dropDialogOpen} onClose={() => setDropDialogOpen(false)}>
//           <DialogTitle>Confirm Drop</DialogTitle>
//           <DialogContent sx={{ textAlign: 'center' }}>
//             {dropLoading ? (
//               <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 2 }}>
//                 <Lottie
//                   animationData={LoadingAnimation}
//                   loop
//                   style={{ width: 500, height: 300 }}
//                 />
//                 <Typography variant="body1">Dropping course...</Typography>
//               </Box>
//             ) : (
//               <Typography>
//                 Are you sure you want to drop{' '}
//                 {selectedCourse?.courseName} ({selectedCourse?.courseCode})?
//               </Typography>
//             )}
//           </DialogContent>
//           {!dropLoading && (
//             <DialogActions>
//               <Button onClick={() => setDropDialogOpen(false)} color="primary">
//                 No
//               </Button>
//               <Button onClick={confirmDrop} color="error" variant="contained">
//                 Yes
//               </Button>
//             </DialogActions>
//           )}
//         </Dialog>

//         {/* Course Details Dialog */}
//         <Dialog open={courseDialogOpen} onClose={() => setCourseDialogOpen(false)}>
//           <DialogTitle>Course Details</DialogTitle>
//           <DialogContent>
//             {selectedCourseDetails && (
//               <Box>
//                 <Typography variant="h6">{selectedCourseDetails.courseCode} - {selectedCourseDetails.courseName}</Typography>
//                 <Typography variant="body1"><strong>Year:</strong> {selectedCourseDetails.year}</Typography>
//                 <Typography variant="body1">
//                   <strong>Prerequisites:</strong>{' '}
//                   {selectedCourseDetails.prerequisites.length > 0
//                     ? selectedCourseDetails.prerequisites.join(
//                         selectedCourseDetails.prerequisiteType === 'OR' ? ' or ' : ', '
//                       )
//                     : 'None'}
//                 </Typography>
//               </Box>
//             )}
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setCourseDialogOpen(false)} color="primary">
//               Close
//             </Button>
//           </DialogActions>
//         </Dialog>

//         <Snackbar
//           open={snackbarOpen}
//           autoHideDuration={2000}
//           onClose={handleSnackbarClose}
//           anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//           message={snackbarMessage}
//           action={
//             <Button color="inherit" onClick={handleSnackbarClose}>
//               Close
//             </Button>
//           }
//           sx={{ '& .MuiSnackbarContent-root': { backgroundColor: '#4caf50', color: '#fff' } }}
//         />
//       </Grid>
//     </DashboardLayout>
//   );
// };

// export default Enrollment;


import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Alert,
  Box,
  Snackbar,
  Button,
  Paper,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import Lottie from 'lottie-react';
import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
import LoadingAnimation from '../../assets/Animations/LoadingPage/LoadingAnimation.json';
import TitleBar from '../../components/Titlebar/Titlebar';
import {
  getEnrolledCourses,
  getDroppedCourses,
  getAvailableCoursesEnrollment,
  getPrerequisiteGraph,
  enrollInCourse,
  dropEnrolledCourse,
} from "../../Endpoints/StudentEndpoints";

// Static data for BNS courses and prerequisites (could be fetched from API in a real app)
const bnsCourses = [
  { courseCode: 'CS111', courseName: 'Introduction to Computing Science', year: 1, prerequisites: ['50% in Year 13/Form 7 Mathematics'] },
  { courseCode: 'CS112', courseName: 'Data Structures & Algorithms', year: 1, prerequisites: ['CS111'] },
  { courseCode: 'CS150', courseName: 'Introduction to Computer Networks & Security', year: 1, prerequisites: [] },
  { courseCode: 'MA111', courseName: 'Mathematics', year: 1, prerequisites: [] },
  { courseCode: 'MA161', courseName: 'Discrete Mathematics', year: 1, prerequisites: [] },
  { courseCode: 'MG101', courseName: 'Introduction to Management', year: 1, prerequisites: [] },
  { courseCode: 'ST131', courseName: 'Statistics', year: 1, prerequisites: [] },
  { courseCode: 'UU100A', courseName: 'Information Literacy', year: 1, prerequisites: [] },
  { courseCode: 'UU114', courseName: 'English for Academic Purposes', year: 1, prerequisites: [] },
  { courseCode: 'CS211', courseName: 'Computer Organisation', year: 2, prerequisites: ['CS111'] },
  { courseCode: 'CS214', courseName: 'Design & Analysis of Algorithms', year: 2, prerequisites: ['CS112'] },
  { courseCode: 'CS215', courseName: 'Computer Communications & Management', year: 2, prerequisites: ['CS111', 'CS150'] },
  { courseCode: 'CS218', courseName: 'Mobile Computing', year: 2, prerequisites: ['CS112'] },
  { courseCode: 'CS219', courseName: 'Cloud Computing', year: 2, prerequisites: ['CS112'] },
  { courseCode: 'IS221', courseName: 'Information Systems I', year: 2, prerequisites: [] },
  { courseCode: 'IS222', courseName: 'Information Systems II', year: 2, prerequisites: [] },
  { courseCode: 'UU200', courseName: 'Ethics & Governance', year: 2, prerequisites: [] },
  { courseCode: 'CS001', courseName: 'Foundations of Professional Practice', year: 2, prerequisites: [] },
  { courseCode: 'CS310', courseName: 'Computer Networks', year: 3, prerequisites: ['CS211'] },
  { courseCode: 'CS311', courseName: 'Operating Systems', year: 3, prerequisites: ['CS211'] },
  { courseCode: 'CS317', courseName: 'Computer & Network Security', year: 3, prerequisites: ['CS215'] },
  { courseCode: 'CS324', courseName: 'Distributed Computing', year: 3, prerequisites: ['CS218', 'CS219', 'CS214', 'CS215'], prerequisiteType: 'OR' },
  { courseCode: 'CS350', courseName: 'Wireless Networks', year: 3, prerequisites: ['CS215'] },
  { courseCode: 'CS351', courseName: 'Network Design & Administration', year: 3, prerequisites: ['CS215'] },
  { courseCode: 'CS352', courseName: 'IT Infrastructure & Security', year: 3, prerequisites: ['CS215'] },
  { courseCode: 'IS333', courseName: 'Project Management', year: 3, prerequisites: ['Completion of 200-level CS/IS courses'] },
  { courseCode: 'CS400', courseName: 'Industry Experience Project (IEP)', year: 4, prerequisites: [] },
  { courseCode: 'CS403', courseName: 'Cybercrime & Digital Forensics', year: 4, prerequisites: [] },
  { courseCode: 'CS412', courseName: 'Advanced Networks', year: 4, prerequisites: [] },
  { courseCode: 'CS424', courseName: 'Network Security & Forensics', year: 4, prerequisites: [] },
];

// Custom Node for ReactFlow
const CustomNode = ({ data }) => {
  const { courseCode, year } = data;
  const color = {
    1: '#094c50',
    2: '#2596be',
    3: '#388e3c',
    4: '#d32f2f',
  }[year] || '#424242';

  return (
    <Box
      sx={{
        backgroundColor: color,
        color: '#fff',
        padding: '10px',
        borderRadius: '8px',
        textAlign: 'center',
        width: '100px',
        fontSize: '12px',
        fontWeight: 'bold',
        cursor: 'pointer',
      }}
    >
      {courseCode}
    </Box>
  );
};

// Enrollment Component
const Enrollment = () => {
  const navigate = useNavigate();
  const [studentId] = useState('12345'); // Replace with actual student ID from auth context
  const [program] = useState('NS'); // Replace with actual program from user data
  const [courses, setCourses] = useState([]);
  const [lockedCourses, setLockedCourses] = useState(new Set());
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [droppedCourses, setDroppedCourses] = useState([]);
  const [prerequisites, setPrerequisites] = useState({});
  const [selectedEnrolledCourse, setSelectedEnrolledCourse] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [enrollLoading, setEnrollLoading] = useState(false);
  const [dropLoading, setDropLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [enrollDialogOpen, setEnrollDialogOpen] = useState(false);
  const [dropDialogOpen, setDropDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedYear, setSelectedYear] = useState({ 1: '', 2: '', 3: '', 4: '' });
  const [courseDialogOpen, setCourseDialogOpen] = useState(false);
  const [selectedCourseDetails, setSelectedCourseDetails] = useState(null);

  // Authentication Check
  useEffect(() => {
    const token = localStorage.getItem('token') || 'dummy-token';
    if (!token) {
      setError('Authentication failed. Please log in again.');
      navigate('/login');
    }
  }, [navigate]);

  // Fetch initial data (enrolled courses, dropped courses, and prerequisites)
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [enrolled, dropped, prereqs] = await Promise.all([
          getEnrolledCourses(studentId),
          getDroppedCourses(studentId),
          getPrerequisiteGraph(program),
        ]);
        setEnrolledCourses(enrolled.data);
        setDroppedCourses(dropped.data);
        setPrerequisites(prereqs.data); // Expected format: { courseCode: [prereqCourseCodes] }
      } catch (err) {
        setError('Failed to fetch initial data. Please try again later.');
        console.error('[Enrollment] Fetch Initial Data Error:', err);
      }
    };
    fetchInitialData();
  }, [studentId, program]);

  // Fetch available courses and check prerequisites
  useEffect(() => {
    const fetchCoursesAndCheckPrerequisites = async () => {
      setLoading(true);
      try {
        const available = await getAvailableCoursesEnrollment(studentId, program);
        const availableCourses = available.data.filter(
          (course) => !enrolledCourses.some((ec) => ec.courseCode === course.courseCode)
        );
        setCourses(availableCourses);

        const lockedSet = new Set();
        for (const course of availableCourses) {
          const prereqs = prerequisites[course.courseCode] || [];
          let hasUnmetPrereqs = false;
          if (course.courseCode === 'CS324') {
            // OR condition: at least one prerequisite must be met
            hasUnmetPrereqs = !prereqs.some((prereq) =>
              enrolledCourses.some((ec) => ec.courseCode === prereq)
            );
          } else if (course.courseCode === 'IS333') {
            // AND condition: all prerequisites must be met
            hasUnmetPrereqs = !prereqs.every((prereq) =>
              enrolledCourses.some((ec) => ec.courseCode === prereq)
            );
          } else {
            // Default: any unmet prerequisite locks the course
            hasUnmetPrereqs = prereqs.some(
              (prereq) => !enrolledCourses.some((ec) => ec.courseCode === prereq)
            );
          }
          if (hasUnmetPrereqs) lockedSet.add(course.courseCode);
        }
        setLockedCourses(lockedSet);
      } catch (err) {
        setError('Failed to load available courses.');
        console.error('[Enrollment] Fetch Courses Error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCoursesAndCheckPrerequisites();
  }, [enrolledCourses, studentId, program, prerequisites]);

  // Define ReactFlow nodes and edges for BNS prerequisites
  const nodes = bnsCourses.map((course, index) => ({
    id: course.courseCode,
    type: 'custom',
    data: { courseCode: course.courseCode, year: course.year },
    position: { x: course.year * 250 - 200, y: index % 9 * 100 },
  }));

  const edges = bnsCourses.flatMap((course) =>
    course.prerequisites
      .filter((prereq) => prereq !== '50% in Year 13/Form 7 Mathematics' && prereq !== 'Completion of 200-level CS/IS courses')
      .map((prereq) => ({
        id: `${prereq}-${course.courseCode}`,
        source: prereq,
        target: course.courseCode,
        type: 'smoothstep',
        style: { stroke: '#2596be', strokeWidth: 2 },
        animated: course.prerequisiteType === 'OR',
      }))
  );

  // Handlers
  const handleYearSelectChange = (year, courseCode) => {
    setSelectedYear((prev) => ({ ...prev, [year]: courseCode }));
    const course = courses.find((c) => c.courseCode === courseCode);
    if (course && !lockedCourses.has(courseCode)) {
      setSelectedCourse(course);
      setEnrollDialogOpen(true);
    }
  };

  const confirmEnroll = async () => {
    if (!selectedCourse) return;
    setEnrollLoading(true);
    try {
      const enrollmentDto = { studentId, courseCode: selectedCourse.courseCode };
      await enrollInCourse(enrollmentDto);
      setEnrolledCourses((prev) => [...prev, { ...selectedCourse, status: 'Waiting Approval' }]);
      setCourses((prev) => prev.filter((c) => c.courseCode !== selectedCourse.courseCode));
      setSnackbarMessage(`Successfully enrolled in ${selectedCourse.courseName}!`);
      setSnackbarOpen(true);
      setError('');
      setSelectedYear((prev) => ({ ...prev, [selectedCourse.year]: '' }));
      setSelectedEnrolledCourse('');
    } catch (err) {
      console.error('[Enrollment] Error enrolling course:', err);
      setError(`Failed to enroll in ${selectedCourse.courseName}. Please try again.`);
    } finally {
      setEnrollLoading(false);
      setEnrollDialogOpen(false);
      setSelectedCourse(null);
    }
  };

  const handleDrop = () => {
    if (!selectedEnrolledCourse) {
      setSnackbarMessage('Please select a course to drop.');
      setSnackbarOpen(true);
      return;
    }
    const course = enrolledCourses.find((c) => c.courseCode === selectedEnrolledCourse);
    if (course) {
      setSelectedCourse(course);
      setDropDialogOpen(true);
    }
  };

  const confirmDrop = async () => {
    if (!selectedCourse) return;
    setDropLoading(true);
    try {
      await dropEnrolledCourse(studentId, selectedCourse.courseCode);
      setEnrolledCourses((prev) => prev.filter((c) => c.courseCode !== selectedCourse.courseCode));
      setCourses((prev) => [...prev, selectedCourse]);
      setDroppedCourses((prev) => [...prev, selectedCourse]);
      setSnackbarMessage(`Successfully dropped ${selectedCourse.courseName}!`);
      setSnackbarOpen(true);
      setSelectedEnrolledCourse('');
    } catch (err) {
      console.error('[Enrollment] Error dropping course:', err);
      setError(`Failed to drop ${selectedCourse.courseName}. Please try again.`);
    } finally {
      setDropLoading(false);
      setDropDialogOpen(false);
      setSelectedCourse(null);
    }
  };

  const handleNodeClick = (event, node) => {
    const course = bnsCourses.find((c) => c.courseCode === node.id);
    setSelectedCourseDetails(course);
    setCourseDialogOpen(true);
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);

  // Group courses by year
  const coursesByYear = {
    1: courses.filter((c) => c.year === 1),
    2: courses.filter((c) => c.year === 2),
    3: courses.filter((c) => c.year === 3),
    4: courses.filter((c) => c.year === 4),
  };

  if (loading) {
    return (
      <DashboardLayout>
        <Box
          sx={{
            p: 3,
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Lottie
            animationData={LoadingAnimation}
            loop
            style={{ width: 500, height: 300, marginBottom: 16 }}
          />
        </Box>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TitleBar title="Enrollment" />
        </Grid>

        {error && (
          <Grid item xs={12}>
            <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
              {error}
            </Alert>
          </Grid>
        )}

        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: '20px' }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 'bold', fontSize: '1.5rem', textAlign: 'center', color: '#000000' }}
            >
              Available Courses
            </Typography>
            {Object.keys(coursesByYear).map((year) => (
              <Box key={year} sx={{ mb: 3 }}>
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel>Year {year} Courses</InputLabel>
                  <Select
                    value={selectedYear[year] || ''}
                    onChange={(e) => handleYearSelectChange(year, e.target.value)}
                    label={`Year ${year} Courses`}
                  >
                    <MenuItem value="" disabled>
                      Select a course
                    </MenuItem>
                    {coursesByYear[year].length > 0 ? (
                      coursesByYear[year].map((course) => (
                        <MenuItem
                          key={course.courseCode}
                          value={course.courseCode}
                          disabled={lockedCourses.has(course.courseCode)}
                        >
                          {course.courseCode} - {course.courseName}
                          {lockedCourses.has(course.courseCode) && ' (Prerequisites not met)'}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>No courses available</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Box>
            ))}
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: '20px' }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 'bold', fontSize: '1.5rem', textAlign: 'center', color: '#000000', mb: 2 }}
            >
              BNS Prerequisite Graph
            </Typography>
            <Box sx={{ height: '600px', width: '100%' }}>
              <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={{ custom: CustomNode }}
                onNodeClick={handleNodeClick}
                fitView
                style={{ background: '#f5f5f5' }}
              >
                <Background />
                <Controls />
              </ReactFlow>
            </Box>
          </Paper>
        </Grid>

        <Grid container item xs={12} spacing={2}>
          {/* Enrolled Courses Column */}
          <Grid item xs={6}>
            <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: '20px' }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#424242' }}>
                Enrolled Courses
              </Typography>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Enrolled Courses</InputLabel>
                <Select
                  value={selectedEnrolledCourse}
                  onChange={(e) => setSelectedEnrolledCourse(e.target.value)}
                  label="Enrolled Courses"
                >
                  <MenuItem value="" disabled>
                    Select a course
                  </MenuItem>
                  {enrolledCourses.length > 0 ? (
                    enrolledCourses.map((course) => (
                      <MenuItem key={course.courseCode} value={course.courseCode}>
                        {course.courseCode} - {course.courseName} (Status: {course.status})
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No enrolled courses</MenuItem>
                  )}
                </Select>
              </FormControl>
              {selectedEnrolledCourse && (
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleDrop}
                  sx={{ mt: 2 }}
                >
                  Drop Course
                </Button>
              )}
            </Paper>
          </Grid>

          {/* Dropped Courses Column */}
          <Grid item xs={6}>
            <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: '20px' }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#424242' }}>
                Dropped Courses
              </Typography>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Dropped Courses</InputLabel>
                <Select
                  value=""
                  onChange={() => {}}
                  label="Dropped Courses"
                >
                  <MenuItem value="" disabled>
                    Dropped courses
                  </MenuItem>
                  {droppedCourses.length > 0 ? (
                    droppedCourses.map((course) => (
                      <MenuItem key={course.courseCode} value={course.courseCode} disabled>
                        {course.courseCode} - {course.courseName}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No dropped courses</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Paper>
          </Grid>
        </Grid>

        {/* Enroll Confirmation Dialog */}
        <Dialog open={enrollDialogOpen} onClose={() => setEnrollDialogOpen(false)}>
          <DialogTitle>Confirm Enrollment</DialogTitle>
          <DialogContent sx={{ textAlign: 'center' }}>
            {enrollLoading ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 2 }}>
                <Lottie
                  animationData={LoadingAnimation}
                  loop
                  style={{ width: 500, height: 300 }}
                />
                <Typography variant="body1">Enrolling in course...</Typography>
              </Box>
            ) : (
              <Typography>
                Are you sure you want to enroll in{' '}
                {selectedCourse?.courseName} ({selectedCourse?.courseCode})?
              </Typography>
            )}
          </DialogContent>
          {!enrollLoading && (
            <DialogActions>
              <Button onClick={() => setEnrollDialogOpen(false)} color="primary">
                No
              </Button>
              <Button onClick={confirmEnroll} color="primary" variant="contained">
                Yes
              </Button>
            </DialogActions>
          )}
        </Dialog>

        {/* Drop Confirmation Dialog */}
        <Dialog open={dropDialogOpen} onClose={() => setDropDialogOpen(false)}>
          <DialogTitle>Confirm Drop</DialogTitle>
          <DialogContent sx={{ textAlign: 'center' }}>
            {dropLoading ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 2 }}>
                <Lottie
                  animationData={LoadingAnimation}
                  loop
                  style={{ width: 500, height: 300 }}
                />
                <Typography variant="body1">Dropping course...</Typography>
              </Box>
            ) : (
              <Typography>
                Are you sure you want to drop{' '}
                {selectedCourse?.courseName} ({selectedCourse?.courseCode})?
              </Typography>
            )}
          </DialogContent>
          {!dropLoading && (
            <DialogActions>
              <Button onClick={() => setDropDialogOpen(false)} color="primary">
                No
              </Button>
              <Button onClick={confirmDrop} color="error" variant="contained">
                Yes
              </Button>
            </DialogActions>
          )}
        </Dialog>

        {/* Course Details Dialog */}
        <Dialog open={courseDialogOpen} onClose={() => setCourseDialogOpen(false)}>
          <DialogTitle>Course Details</DialogTitle>
          <DialogContent>
            {selectedCourseDetails && (
              <Box>
                <Typography variant="h6">{selectedCourseDetails.courseCode} - {selectedCourseDetails.courseName}</Typography>
                <Typography variant="body1"><strong>Year:</strong> {selectedCourseDetails.year}</Typography>
                <Typography variant="body1">
                  <strong>Prerequisites:</strong>{' '}
                  {selectedCourseDetails.prerequisites.length > 0
                    ? selectedCourseDetails.prerequisites.join(
                        selectedCourseDetails.prerequisiteType === 'OR' ? ' or ' : ', '
                      )
                    : 'None'}
                </Typography>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCourseDialogOpen(false)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={2000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          message={snackbarMessage}
          action={
            <Button color="inherit" onClick={handleSnackbarClose}>
              Close
            </Button>
          }
          sx={{ '& .MuiSnackbarContent-root': { backgroundColor: '#4caf50', color: '#fff' } }}
        />
      </Grid>
    </DashboardLayout>
  );
};

export default Enrollment;