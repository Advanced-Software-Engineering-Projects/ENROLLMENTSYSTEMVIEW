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
// import { 
//   getAvailableCoursesEnrollment,
//   enrollInCourse,
//   dropEnrolledCourse,
//   getEnrolledCourses,
//   getDroppedCourses,
//   getPrerequisiteGraph 
// } from '../../Endpoints/StudentEndpoints';

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
//   const [studentId, setStudentId] = useState('');
//   const [program, setProgram] = useState('');
//   const [courses, setCourses] = useState([]);
//   const [lockedCourses, setLockedCourses] = useState(new Set());
//   const [enrolledCourses, setEnrolledCourses] = useState([]);
//   const [droppedCourses, setDroppedCourses] = useState([]);
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
//   const [nodes, setNodes] = useState([]);
//   const [edges, setEdges] = useState([]);

//   // Get student info on component mount
//   useEffect(() => {
//     const userString = localStorage.getItem('user');
//     if (userString) {
//       const user = JSON.parse(userString);
//       const cleanId = user.id || (user.email ? user.email.split('@')[0] : null);
//       setStudentId(cleanId);
//       setProgram(user.program || 'NS'); // Default to NS if program not specified
//     } else {
//       navigate('/login');
//     }
//   }, [navigate]);

//   // Fetch enrolled and dropped courses
//   useEffect(() => {
//     if (!studentId) return;

//     const fetchCourses = async () => {
//       try {
//         setLoading(true);
        
//         // Fetch all necessary data in parallel
//         const [availableCoursesRes, enrolledCoursesRes, droppedCoursesRes] = await Promise.all([
//           getAvailableCoursesEnrollment(studentId, program),
//           getEnrolledCourses(studentId),
//           getDroppedCourses(studentId)
//         ]);

//         setCourses(availableCoursesRes.data);
//         setEnrolledCourses(enrolledCoursesRes.data);
//         setDroppedCourses(droppedCoursesRes.data);

//         // Check prerequisites for each available course
//         const lockedSet = new Set();
//         for (const course of availableCoursesRes.data) {
//           try {
//             const prereqRes = await getPrerequisiteGraph(course.courseCode);
//             const prerequisites = prereqRes.data || [];
            
//             // Check if prerequisites are met
//             const hasUnmetPrereqs = prerequisites.some(prereq => 
//               !enrolledCoursesRes.data.some(ec => ec.courseCode === prereq)
//             );
            
//             if (hasUnmetPrereqs) {
//               lockedSet.add(course.courseCode);
//             }
//           } catch (err) {
//             console.error(`Error checking prerequisites for ${course.courseCode}:`, err);
//           }
//         }
//         setLockedCourses(lockedSet);

//         // Generate prerequisite graph visualization
//         generatePrerequisiteGraph(availableCoursesRes.data, enrolledCoursesRes.data);
//       } catch (err) {
//         console.error('Error fetching course data:', err);
//         setError(err.response?.data?.message || 'Failed to load course data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourses();
//   }, [studentId, program]);

//   const generatePrerequisiteGraph = (availableCourses, enrolledCourses) => {
//     // Create nodes for all courses (available + enrolled)
//     const allCourses = [...availableCourses, ...enrolledCourses];
//     const courseNodes = allCourses.map((course, index) => ({
//       id: course.courseCode,
//       type: 'custom',
//       data: { courseCode: course.courseCode, year: course.year },
//       position: {
//         x: course.year * 250 - 200,
//         y: index % 9 * 100,
//       },
//     }));

//     // Create edges based on prerequisites
//     const courseEdges = allCourses.flatMap(course => {
//       if (!course.prerequisites || course.prerequisites.length === 0) return [];
      
//       return course.prerequisites
//         .filter(prereq => allCourses.some(c => c.courseCode === prereq))
//         .map(prereq => ({
//           id: `${prereq}-${course.courseCode}`,
//           source: prereq,
//           target: course.courseCode,
//           type: 'smoothstep',
//           style: { stroke: '#2596be', strokeWidth: 2 },
//           animated: course.prerequisiteType === 'OR',
//         }));
//     });

//     setNodes(courseNodes);
//     setEdges(courseEdges);
//   };

//   const handleYearSelectChange = (year, courseCode) => {
//     setSelectedYear(prev => ({ ...prev, [year]: courseCode }));
//     const course = courses.find(c => c.courseCode === courseCode);
//     if (course && !lockedCourses.has(courseCode)) {
//       setSelectedCourse(course);
//       setEnrollDialogOpen(true);
//     }
//   };

//   const confirmEnroll = async () => {
//     if (!selectedCourse || !studentId) return;
    
//     setEnrollLoading(true);
//     try {
//       const enrollmentDto = {
//         studentId,
//         courseCode: selectedCourse.courseCode,
//         semester: '2025S1' // You might want to make this dynamic
//       };
      
//       await enrollInCourse(enrollmentDto);
      
//       // Update local state
//       setEnrolledCourses(prev => [...prev, { 
//         ...selectedCourse, 
//         status: 'Enrolled' 
//       }]);
//       setCourses(prev => prev.filter(c => c.courseCode !== selectedCourse.courseCode));
      
//       setSnackbarMessage(`Successfully enrolled in ${selectedCourse.courseName}!`);
//       setSnackbarOpen(true);
//       setError('');
//       setSelectedYear(prev => ({ ...prev, [selectedCourse.year]: '' }));
//       setSelectedEnrolledCourse('');
//     } catch (err) {
//       console.error('Error enrolling course:', err);
//       setError(err.response?.data?.message || 'Failed to enroll in course');
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
//     const course = enrolledCourses.find(c => c.courseCode === selectedEnrolledCourse);
//     if (course) {
//       setSelectedCourse(course);
//       setDropDialogOpen(true);
//     }
//   };

//   const confirmDrop = async () => {
//     if (!selectedCourse || !studentId) return;
    
//     setDropLoading(true);
//     try {
//       await dropEnrolledCourse(studentId, selectedCourse.courseCode);
      
//       // Update local state
//       setEnrolledCourses(prev => prev.filter(c => c.courseCode !== selectedCourse.courseCode));
//       setCourses(prev => [...prev, selectedCourse]);
//       setDroppedCourses(prev => [...prev, selectedCourse]);
      
//       setSnackbarMessage(`Successfully dropped ${selectedCourse.courseName}!`);
//       setSnackbarOpen(true);
//       setSelectedEnrolledCourse('');
//     } catch (err) {
//       console.error('Error dropping course:', err);
//       setError(err.response?.data?.message || 'Failed to drop course');
//     } finally {
//       setDropLoading(false);
//       setDropDialogOpen(false);
//       setSelectedCourse(null);
//     }
//   };

//   const handleNodeClick = (event, node) => {
//     const course = [...courses, ...enrolledCourses, ...droppedCourses]
//       .find(c => c.courseCode === node.id);
//     setSelectedCourseDetails(course);
//     setCourseDialogOpen(true);
//   };

//   const handleSnackbarClose = () => setSnackbarOpen(false);

//   // Group courses by year
//   const coursesByYear = {
//     1: courses.filter(c => c.year === 1),
//     2: courses.filter(c => c.year === 2),
//     3: courses.filter(c => c.year === 3),
//     4: courses.filter(c => c.year === 4),
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
//           <Typography variant="h6">Loading enrollment data...</Typography>
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
//             <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
//               Available Courses
//             </Typography>
//             {Object.keys(coursesByYear).map(year => (
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
//                       coursesByYear[year].map(course => (
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
//             <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 2 }}>
//               Course Prerequisite Graph
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
//               <Typography variant="h6" gutterBottom>
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
//                     enrolledCourses.map(course => (
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
//               <Typography variant="h6" gutterBottom>
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
//                     droppedCourses.map(course => (
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
//                 <Typography variant="h6">
//                   {selectedCourseDetails.courseCode} - {selectedCourseDetails.courseName}
//                 </Typography>
//                 <Typography variant="body1">
//                   <strong>Year:</strong> {selectedCourseDetails.year}
//                 </Typography>
//                 <Typography variant="body1">
//                   <strong>Program:</strong> {selectedCourseDetails.program?.join(', ') || 'All'}
//                 </Typography>
//                 <Typography variant="body1">
//                   <strong>Prerequisites:</strong>{' '}
//                   {selectedCourseDetails.prerequisites?.length > 0
//                     ? selectedCourseDetails.prerequisites.join(', ')
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
//           message={snackbarMessage}
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
  CircularProgress,
} from '@mui/material';
import Lottie from 'lottie-react';
import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
import LoadingAnimation from '../../assets/Animations/LoadingPage/LoadingAnimation.json';
import TitleBar from '../../components/Titlebar/Titlebar';
import { 
  getAvailableCoursesEnrollment,
  enrollInCourse,
  dropEnrolledCourse,
  getEnrolledCourses,
  getDroppedCourses,
  getPrerequisiteGraph 
} from '../../Endpoints/StudentEndpoints';

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
  const [studentId, setStudentId] = useState('');
  const [program, setProgram] = useState('');
  const [courses, setCourses] = useState([]);
  const [lockedCourses, setLockedCourses] = useState(new Set());
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [droppedCourses, setDroppedCourses] = useState([]);
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
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [authError, setAuthError] = useState('');

  // Get student info on component mount
  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      const cleanId = user.id || (user.email ? user.email.split('@')[0] : null);
      if (cleanId) {
        setStudentId(cleanId);
        setProgram(user.program || 'NS'); // Default to NS if program not specified
      } else {
        setAuthError('Invalid user data. Please login again.');
        navigate('/login');
      }
    } else {
      setAuthError('User not authenticated. Please login.');
      navigate('/login');
    }
  }, [navigate]);

  // Fetch enrolled and dropped courses
  useEffect(() => {
    if (!studentId) return;

    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError('');
        
        // Fetch all necessary data in parallel
        const [availableCoursesRes, enrolledCoursesRes, droppedCoursesRes] = await Promise.all([
          getAvailableCoursesEnrollment(studentId, program),
          getEnrolledCourses(studentId),
          getDroppedCourses(studentId)
        ]);

        const availableCourses = availableCoursesRes.data || [];
        setCourses(availableCourses);
        setEnrolledCourses(enrolledCoursesRes.data || []);
        setDroppedCourses(droppedCoursesRes.data || []);

        // Check prerequisites for each available course
        const lockedSet = new Set();
        for (const course of availableCourses) {
          try {
            const prereqRes = await getPrerequisiteGraph(course.courseCode);
            const prerequisites = prereqRes.data || [];
            
            // Check if prerequisites are met
            const hasUnmetPrereqs = prerequisites.some(prereq => 
              !enrolledCoursesRes.data.some(ec => ec.courseCode === prereq)
            );
            
            if (hasUnmetPrereqs) {
              lockedSet.add(course.courseCode);
            }
          } catch (err) {
            console.error(`Error checking prerequisites for ${course.courseCode}:`, err);
          }
        }
        setLockedCourses(lockedSet);

        // Generate prerequisite graph visualization
        generatePrerequisiteGraph(availableCourses, enrolledCoursesRes.data);
      } catch (err) {
        console.error('Error fetching course data:', err);
        setError(err.response?.data?.message || 'Failed to load course data');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [studentId, program]);

  const generatePrerequisiteGraph = (availableCourses, enrolledCourses) => {
    // Create nodes for all courses (available + enrolled)
    const allCourses = [...availableCourses, ...enrolledCourses];
    const courseNodes = allCourses.map((course, index) => ({
      id: course.courseCode,
      type: 'custom',
      data: { courseCode: course.courseCode, year: course.year },
      position: {
        x: course.year * 250 - 200,
        y: index % 9 * 100,
      },
    }));

    // Create edges based on prerequisites
    const courseEdges = allCourses.flatMap(course => {
      if (!course.prerequisites || course.prerequisites.length === 0) return [];
      
      return course.prerequisites
        .filter(prereq => allCourses.some(c => c.courseCode === prereq))
        .map(prereq => ({
          id: `${prereq}-${course.courseCode}`,
          source: prereq,
          target: course.courseCode,
          type: 'smoothstep',
          style: { stroke: '#2596be', strokeWidth: 2 },
          animated: course.prerequisiteType === 'OR',
        }));
    });

    setNodes(courseNodes);
    setEdges(courseEdges);
  };

  const handleYearSelectChange = (year, courseCode) => {
    setSelectedYear(prev => ({ ...prev, [year]: courseCode }));
    const course = courses.find(c => c.courseCode === courseCode);
    if (course && !lockedCourses.has(courseCode)) {
      setSelectedCourse(course);
      setEnrollDialogOpen(true);
    }
  };

  const confirmEnroll = async () => {
    if (!selectedCourse || !studentId) return;
    
    setEnrollLoading(true);
    setError('');
    try {
      const enrollmentDto = {
        studentId,
        courseCode: selectedCourse.courseCode,
        semester: 'Fall2025', // Configurable semester
      };
      
      await enrollInCourse(enrollmentDto);
      
      // Update local state
      setEnrolledCourses(prev => [...prev, { 
        ...selectedCourse, 
        status: 'Enrolled' 
      }]);
      setCourses(prev => prev.filter(c => c.courseCode !== selectedCourse.courseCode));
      
      setSnackbarMessage(`Successfully enrolled in ${selectedCourse.courseName}!`);
      setSnackbarOpen(true);
      setSelectedYear(prev => ({ ...prev, [selectedCourse.year]: '' }));
      setSelectedEnrolledCourse('');
    } catch (err) {
      console.error('Error enrolling course:', err);
      setError(err.response?.data?.message || 'Failed to enroll in course');
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
    const course = enrolledCourses.find(c => c.courseCode === selectedEnrolledCourse);
    if (course) {
      setSelectedCourse(course);
      setDropDialogOpen(true);
    }
  };

  const confirmDrop = async () => {
    if (!selectedCourse || !studentId) return;
    
    setDropLoading(true);
    setError('');
    try {
      await dropEnrolledCourse(studentId, selectedCourse.courseCode);
      
      // Update local state
      setEnrolledCourses(prev => prev.filter(c => c.courseCode !== selectedCourse.courseCode));
      setCourses(prev => [...prev, selectedCourse]);
      setDroppedCourses(prev => [...prev, selectedCourse]);
      
      setSnackbarMessage(`Successfully dropped ${selectedCourse.courseName}!`);
      setSnackbarOpen(true);
      setSelectedEnrolledCourse('');
    } catch (err) {
      console.error('Error dropping course:', err);
      setError(err.response?.data?.message || 'Failed to drop course');
    } finally {
      setDropLoading(false);
      setDropDialogOpen(false);
      setSelectedCourse(null);
    }
  };

  const handleNodeClick = (event, node) => {
    const course = [...courses, ...enrolledCourses, ...droppedCourses]
      .find(c => c.courseCode === node.id);
    setSelectedCourseDetails(course);
    setCourseDialogOpen(true);
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);

  // Group courses by year
  const coursesByYear = {
    1: courses.filter(c => c.year === 1),
    2: courses.filter(c => c.year === 2),
    3: courses.filter(c => c.year === 3),
    4: courses.filter(c => c.year === 4),
  };

  if (loading || authError) {
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
          {authError ? (
            <Alert severity="error" sx={{ mb: 3 }}>
              {authError}
            </Alert>
          ) : (
            <>
              <Lottie
                animationData={LoadingAnimation}
                loop
                style={{ width: 500, height: 300, marginBottom: 16 }}
              />
              <Typography variant="h6">Loading enrollment data...</Typography>
            </>
          )}
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
            <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
              Available Courses
            </Typography>
            {Object.keys(coursesByYear).map(year => (
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
                      coursesByYear[year].map(course => (
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
            <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 2 }}>
              Course Prerequisite Graph
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
              <Typography variant="h6" gutterBottom>
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
                    enrolledCourses.map(course => (
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
                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleDrop}
                    disabled={dropLoading}
                  >
                    Drop Course
                  </Button>
                  {dropLoading && (
                    <CircularProgress size={24} sx={{ ml: 2 }} />
                  )}
                </Box>
              )}
            </Paper>
          </Grid>

          {/* Dropped Courses Column */}
          <Grid item xs={6}>
            <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: '20px' }}>
              <Typography variant="h6" gutterBottom>
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
                    droppedCourses.map(course => (
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
                <Typography variant="h6">
                  {selectedCourseDetails.courseCode} - {selectedCourseDetails.courseName}
                </Typography>
                <Typography variant="body1">
                  <strong>Year:</strong> {selectedCourseDetails.year}
                </Typography>
                <Typography variant="body1">
                  <strong>Program:</strong> {selectedCourseDetails.program?.join(', ') || 'All'}
                </Typography>
                <Typography variant="body1">
                  <strong>Prerequisites:</strong>{' '}
                  {selectedCourseDetails.prerequisites?.length > 0
                    ? selectedCourseDetails.prerequisites.join(', ')
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
          message={snackbarMessage}
        />
      </Grid>
    </DashboardLayout>
  );
};

export default Enrollment;