// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Paper,
//   Typography,
//   List,
//   ListItem,
//   ListItemText,
//   Button,
//   Chip,
//   Alert,
// } from '@mui/material';
// import { Link } from 'react-router-dom';
// import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';

// // Mock data for available courses and enrollments
// const mockAvailableCourses = [
//   {
//     courseId: 1,
//     courseCode: 'CS101',
//     courseName: 'Introduction to Computer Science',
//     schedule: 'MWF 10:00-11:00 AM',
//     prerequisites: [
//       { prerequisiteId: 1, requiredCourseCode: 'CS100', isMet: true },
//     ],
//   },
//   {
//     courseId: 2,
//     courseCode: 'MATH101',
//     courseName: 'Calculus I',
//     schedule: 'TTh 1:00-2:30 PM',
//     prerequisites: [],
//   },
//   {
//     courseId: 3,
//     courseCode: 'CS102',
//     courseName: 'Data Structures',
//     schedule: 'MWF 2:00-3:00 PM',
//     prerequisites: [
//       { prerequisiteId: 2, requiredCourseCode: 'CS101', isMet: false },
//     ],
//   },
// ];

// const mockInitialEnrollments = [
//   {
//     enrollmentId: 1,
//     courseCode: 'ENG101',
//     courseName: 'English Composition',
//     schedule: 'TTh 9:00-10:30 AM',
//   },
// ];

// const CourseRegistration = () => {
//   const [courses, setCourses] = useState([]);
//   const [enrollments, setEnrollments] = useState([]);
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     // Simulate fetching data with a delay
//     setLoading(true);
//     const timer = setTimeout(() => {
//       setCourses(mockAvailableCourses);
//       setEnrollments(mockInitialEnrollments);
//       setLoading(false);
//     }, 1000); // 1-second delay for realism
//     return () => clearTimeout(timer); // Cleanup timeout on unmount
//   }, []);

//   const handleRegister = (courseId) => {
//     setLoading(true);
//     setTimeout(() => {
//       const course = mockAvailableCourses.find((c) => c.courseId === courseId);
//       if (course.prerequisites.some((p) => !p.isMet)) {
//         setMessage(`Error: Prerequisites not met for ${course.courseName}`);
//       } else {
//         const newEnrollment = {
//           enrollmentId: enrollments.length + 1,
//           courseCode: course.courseCode,
//           courseName: course.courseName,
//           schedule: course.schedule,
//         };
//         setEnrollments([...enrollments, newEnrollment]);
//         setCourses(courses.filter((c) => c.courseId !== courseId));
//         setMessage(`Successfully registered for ${course.courseName}`);
//       }
//       setLoading(false);
//     }, 1000); // 1-second delay for realism
//   };

//   const handleDrop = (enrollmentId) => {
//     setLoading(true);
//     setTimeout(() => {
//       const enrollment = enrollments.find((e) => e.enrollmentId === enrollmentId);
//       setEnrollments(enrollments.filter((e) => e.enrollmentId !== enrollmentId));
//       const newCourse = {
//         courseId: mockAvailableCourses.length + 1,
//         courseCode: enrollment.courseCode,
//         courseName: enrollment.courseName,
//         schedule: enrollment.schedule,
//         prerequisites: [], // Assume dropped courses have no prerequisites for simplicity
//       };
//       setCourses([...courses, newCourse]);
//       setMessage(`Successfully dropped ${enrollment.courseName}`);
//       setLoading(false);
//     }, 1000); // 1-second delay for realism
//   };

//   return (
//     <DashboardLayout>
//       <Box sx={{ p: 3 }}>
//         <Paper sx={{ p: 3 }}>
//           <Typography variant="h5" gutterBottom>
//             Course Registration for Fall 2025
//           </Typography>
//           {message && (
//             <Alert
//               severity={message.includes('successfully') ? 'success' : 'error'}
//               sx={{ mb: 2 }}
//               onClose={() => setMessage('')}
//             >
//               {message}
//             </Alert>
//           )}
//           <Typography variant="h6" gutterBottom>
//             Available Courses
//           </Typography>
//           {loading ? (
//             <Typography>Loading courses...</Typography>
//           ) : courses.length === 0 ? (
//             <Typography>No courses available.</Typography>
//           ) : (
//             <List>
//               {courses.map((course) => (
//                 <ListItem key={course.courseId} sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
//                   <ListItemText
//                     primary={`${course.courseCode} - ${course.courseName}`}
//                     secondary={
//                       <>
//                         <Typography component="span" variant="body2">
//                           Schedule: {course.schedule}
//                         </Typography>
//                         <br />
//                         <Typography component="span" variant="body2">
//                           Prerequisites:{' '}
//                           {course.prerequisites.length > 0
//                             ? course.prerequisites.map((p) => (
//                                 <Chip
//                                   key={p.prerequisiteId}
//                                   label={`${p.requiredCourseCode} (${p.isMet ? 'Met' : 'Not Met'})`}
//                                   color={p.isMet ? 'success' : 'error'}
//                                   size="small"
//                                   sx={{ mr: 1 }}
//                                 />
//                               ))
//                             : 'None'}
//                         </Typography>
//                       </>
//                     }
//                   />
//                   <Box sx={{ mt: 1 }}>
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       onClick={() => handleRegister(course.courseId)}
//                       sx={{ mr: 1 }}
//                       disabled={loading}
//                     >
//                       Register
//                     </Button>
//                     <Button
//                       variant="outlined"
//                       component={Link}
//                       to={`/prerequisites/${course.courseId}`}
//                       disabled={loading}
//                     >
//                       View Prerequisites Graph
//                     </Button>
//                   </Box>
//                 </ListItem>
//               ))}
//             </List>
//           )}
//           <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
//             Enrolled Courses
//           </Typography>
//           {loading ? (
//             <Typography>Loading enrollments...</Typography>
//           ) : enrollments.length === 0 ? (
//             <Typography>No enrolled courses.</Typography>
//           ) : (
//             <List>
//               {enrollments.map((enrollment) => (
//                 <ListItem key={enrollment.enrollmentId} sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
//                   <ListItemText
//                     primary={`${enrollment.courseCode} - ${enrollment.courseName}`}
//                     secondary={`Schedule: ${enrollment.schedule}`}
//                   />
//                   <Button
//                     variant="contained"
//                     color="secondary"
//                     onClick={() => handleDrop(enrollment.enrollmentId)}
//                     sx={{ mt: 1 }}
//                     disabled={loading}
//                   >
//                     Drop
//                   </Button>
//                 </ListItem>
//               ))}
//             </List>
//           )}
//         </Paper>
//       </Box>
//     </DashboardLayout>
//   );
// };

// export default CourseRegistration;

import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Chip,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
import {
  getAvailableCoursesRegistration,
  getRegisteredCoursesRegistration,
  registerCourseRegistration,
  unregisterCourse,
  getCoursePrerequisitesRegistration,
} from '../../Endpoints/StudentEndpoints';

const CourseRegistration = () => {
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [studentId, setStudentId] = useState('');

  // Fetch student ID from local storage
  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      const cleanId = user.id || (user.email ? user.email.split('@')[0] : null);
      setStudentId(cleanId);
    } else {
      setError('User not authenticated. Please login.');
      setLoading(false);
    }
  }, []);

  // Fetch available courses, enrolled courses, and prerequisites
  useEffect(() => {
    if (!studentId) return;

    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        // Fetch available and registered courses in parallel
        const [availableCoursesRes, registeredCoursesRes] = await Promise.all([
          getAvailableCoursesRegistration(studentId),
          getRegisteredCoursesRegistration(studentId),
        ]);

        let availableCourses = availableCoursesRes.data || [];

        // Fetch prerequisites for each available course and check if met
        for (let course of availableCourses) {
          try {
            const prereqRes = await getCoursePrerequisitesRegistration(course.courseId);
            const prerequisites = prereqRes.data || [];
            course.prerequisites = prerequisites.map((prereq) => ({
              prerequisiteId: prereq.prerequisiteId || prereq.requiredCourseId,
              requiredCourseCode: prereq.requiredCourseCode,
              isMet: registeredCoursesRes.data.some(
                (regCourse) => regCourse.courseCode === prereq.requiredCourseCode
              ),
            }));
          } catch (err) {
            console.error(`Error fetching prerequisites for ${course.courseCode}:`, err);
            course.prerequisites = [];
          }
        }

        setCourses(availableCourses);
        setEnrollments(registeredCoursesRes.data || []);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.response?.data?.message || 'Failed to load courses and enrollments.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [studentId]);

  const handleRegister = async (courseId) => {
    setLoading(true);
    setMessage('');
    setError('');
    try {
      const course = courses.find((c) => c.courseId === courseId);
      if (course.prerequisites.some((p) => !p.isMet)) {
        setMessage(`Error: Prerequisites not met for ${course.courseName}`);
        setLoading(false);
        return;
      }

      const registrationDto = {
        studentId,
        courseId,
      };
      await registerCourseRegistration(registrationDto);

      // Update local state
      const newEnrollment = {
        enrollmentId: Date.now(), // Temporary ID, replace with backend ID if provided
        courseCode: course.courseCode,
        courseName: course.courseName,
        schedule: course.schedule,
      };
      setEnrollments([...enrollments, newEnrollment]);
      setCourses(courses.filter((c) => c.courseId !== courseId));
      setMessage(`Successfully registered for ${course.courseName}`);
    } catch (err) {
      console.error('Error registering course:', err);
      setError(err.response?.data?.message || `Failed to register for the course.`);
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = async (enrollmentId) => {
    setLoading(true);
    setMessage('');
    setError('');
    try {
      const enrollment = enrollments.find((e) => e.enrollmentId === enrollmentId);
      const registrationDto = {
        studentId,
        courseId: enrollment.courseId, // Assume courseId is available in enrollment data
      };
      await unregisterCourse(registrationDto);

      // Update local state
      const newCourse = {
        courseId: enrollment.courseId,
        courseCode: enrollment.courseCode,
        courseName: enrollment.courseName,
        schedule: enrollment.schedule,
        prerequisites: [], // Fetch prerequisites again if needed
      };
      setCourses([...courses, newCourse]);
      setEnrollments(enrollments.filter((e) => e.enrollmentId !== enrollmentId));
      setMessage(`Successfully dropped ${enrollment.courseName}`);
    } catch (err) {
      console.error('Error dropping course:', err);
      setError(err.response?.data?.message || `Failed to drop the course.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <Box sx={{ p: 3 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Course Registration for Fall 2025
          </Typography>
          {(message || error) && (
            <Alert
              severity={message.includes('successfully') ? 'success' : 'error'}
              sx={{ mb: 2 }}
              onClose={() => {
                setMessage('');
                setError('');
              }}
            >
              {message || error}
            </Alert>
          )}
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
              <CircularProgress />
            </Box>
          )}
          <Typography variant="h6" gutterBottom>
            Available Courses
          </Typography>
          {!loading && courses.length === 0 && (
            <Typography>No courses available.</Typography>
          )}
          {!loading && courses.length > 0 && (
            <List>
              {courses.map((course) => (
                <ListItem key={course.courseId} sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                  <ListItemText
                    primary={`${course.courseCode} - ${course.courseName}`}
                    secondary={
                      <>
                        <Typography component="span" variant="body2">
                          Schedule: {course.schedule}
                        </Typography>
                        <br />
                        <Typography component="span" variant="body2">
                          Prerequisites:{' '}
                          {course.prerequisites.length > 0
                            ? course.prerequisites.map((p) => (
                                <Chip
                                  key={p.prerequisiteId}
                                  label={`${p.requiredCourseCode} (${p.isMet ? 'Met' : 'Not Met'})`}
                                  color={p.isMet ? 'success' : 'error'}
                                  size="small"
                                  sx={{ mr: 1 }}
                                />
                              ))
                            : 'None'}
                        </Typography>
                      </>
                    }
                  />
                  <Box sx={{ mt: 1 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleRegister(course.courseId)}
                      sx={{ mr: 1 }}
                      disabled={loading}
                    >
                      Register
                    </Button>
                    <Button
                      variant="outlined"
                      component={Link}
                      to={`/prerequisites/${course.courseId}`}
                      disabled={loading}
                    >
                      View Prerequisites Graph
                    </Button>
                  </Box>
                </ListItem>
              ))}
            </List>
          )}
          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Enrolled Courses
          </Typography>
          {!loading && enrollments.length === 0 && (
            <Typography>No enrolled courses.</Typography>
          )}
          {!loading && enrollments.length > 0 && (
            <List>
              {enrollments.map((enrollment) => (
                <ListItem key={enrollment.enrollmentId} sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                  <ListItemText
                    primary={`${enrollment.courseCode} - ${enrollment.courseName}`}
                    secondary={`Schedule: ${enrollment.schedule}`}
                  />
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDrop(enrollment.enrollmentId)}
                    sx={{ mt: 1 }}
                    disabled={loading}
                  >
                    Drop
                  </Button>
                </ListItem>
              ))}
            </List>
          )}
        </Paper>
      </Box>
    </DashboardLayout>
  );
};

export default CourseRegistration;