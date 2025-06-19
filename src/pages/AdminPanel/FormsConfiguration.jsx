// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Select,
//   MenuItem,
//   FormControl,
// } from '@mui/material';
// import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
// import TitleBar from '../../components/Titlebar/Titlebar';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';

// // Mock data for form submissions, aligned with student forms
// const mockSubmissions = {
//   reconsideration: [
//     {
//       id: 1,
//       studentId: 'S12345',
//       fullName: 'John Doe',
//       postalAddress: '123 Main St, Suva',
//       dateOfBirth: '2000-05-15',
//       telephone: '+6791234567',
//       email: 'john.doe@example.com',
//       sponsorship: 'Private',
//       courseCode: 'CS111',
//       courseLecturer: 'Dr. Smith',
//       courseTitle: 'Introduction to Programming',
//       receiptNo: 'REC123',
//       paymentConfirmation: 'receipt1.pdf',
//       currentGrade: 'B',
//       emailStatus: 'sent',
//     },
//     {
//       id: 2,
//       studentId: 'S67890',
//       fullName: 'Jane Smith',
//       postalAddress: '456 Oak Rd, Lautoka',
//       dateOfBirth: '1999-08-22',
//       telephone: '+6797654321',
//       email: 'jane.smith@example.com',
//       sponsorship: 'Sponsored',
//       courseCode: 'CS215',
//       courseLecturer: 'Prof. Brown',
//       courseTitle: 'Data Structures',
//       receiptNo: 'REC456',
//       paymentConfirmation: 'receipt2.pdf',
//       currentGrade: 'C',
//       emailStatus: 'failed',
//     },
//   ],
//   compassionateAegrotat: [
//     {
//       id: 1,
//       studentId: 'S12345',
//       fullName: 'John Doe',
//       email: 'john.doe@example.com',
//       campus: 'Suva',
//       telephone: '+6791234567',
//       postalAddress: '123 Main St, Suva',
//       semester: 'Semester 1',
//       year: '2024',
//       missedExams: [
//         { courseCode: 'CS111', examDate: '2024-12-01', examStartTime: '09:00', applyingFor: 'Aegrotat Pass' },
//         { courseCode: '', examDate: null, examStartTime: '', applyingFor: '' },
//         { courseCode: '', examDate: null, examStartTime: '', applyingFor: '' },
//         { courseCode: '', examDate: null, examStartTime: '', applyingFor: '' },
//       ],
//       reason: 'Medical condition during exam period',
//       supportingDocuments: 'medical_certificate.pdf',
//       applicantSignature: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
//       date: '2024-11-01',
//       status: 'pending',
//       emailStatus: 'sent',
//     },
//     {
//       id: 2,
//       studentId: 'S67890',
//       fullName: 'Jane Smith',
//       email: 'jane.smith@example.com',
//       campus: 'Lautoka',
//       telephone: '+6797654321',
//       postalAddress: '456 Oak Rd, Lautoka',
//       semester: 'Semester 2',
//       year: '2024',
//       missedExams: [
//         { courseCode: 'CS215', examDate: '2024-12-15', examStartTime: '14:00', applyingFor: 'Special Exam' },
//         { courseCode: 'MA112', examDate: '2024-12-16', examStartTime: '10:00', applyingFor: 'Special Exam' },
//         { courseCode: '', examDate: null, examStartTime: '', applyingFor: '' },
//         { courseCode: '', examDate: null, examStartTime: '', applyingFor: '' },
//       ],
//       reason: 'Family emergency',
//       supportingDocuments: 'emergency_letter.pdf',
//       applicantSignature: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
//       date: '2024-11-10',
//       status: 'pending',
//       emailStatus: 'failed',
//     },
//   ],
//   completionProgramme: [
//     {
//       id: 1,
//       studentId: 'S12345',
//       fullName: 'John Doe',
//       email: 'john.doe@example.com',
//       telephone: '+6791234567',
//       dateOfBirth: '2000-05-15',
//       postalAddress: '123 Main St, Suva',
//       programme: 'Undergraduate',
//       declarationAgreed: true,
//       applicantSignature: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
//       date: '2024-11-01',
//       status: 'pending',
//       emailStatus: 'sent',
//     },
//     {
//       id: 2,
//       studentId: 'S67890',
//       fullName: 'Jane Smith',
//       email: 'jane.smith@example.com',
//       telephone: '+6797654321',
//       dateOfBirth: '1999-08-22',
//       postalAddress: '456 Oak Rd, Lautoka',
//       programme: 'Postgraduate',
//       declarationAgreed: true,
//       applicantSignature: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
//       date: '2024-11-10',
//       status: 'pending',
//       emailStatus: 'failed',
//     },
//   ],
// };

// // Mock API functions
// const updateGrade = async (submissionId, newGrade) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log(`Updated grade for submission ${submissionId} to ${newGrade}`);
//       resolve({ success: true });
//     }, 1000);
//   });
// };

// const updateApplicationStatus = async (submissionId, status) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log(`Updated status for submission ${submissionId} to ${status}`);
//       resolve({ success: true });
//     }, 1000);
//   });
// };

// const sendEmail = async (submissionId, formName, studentEmail) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       // Simulate 10% chance of email failure
//       if (Math.random() < 0.1) {
//         reject(new Error(`Failed to send email for ${formName} to ${studentEmail}`));
//       } else {
//         console.log(`Email sent for ${formName} to ${studentEmail}`);
//         resolve({ success: true });
//       }
//     }, 1000);
//   });
// };

// const FormsConfiguration = () => {
//   // State for selected form type (null for card view, or form name)
//   const [selectedForm, setSelectedForm] = useState(null);

//   // State for submissions
//   const [submissions, setSubmissions] = useState(mockSubmissions);

//   // State for grade update form (reconsideration)
//   const [gradeUpdate, setGradeUpdate] = useState({
//     submissionId: null,
//     newGrade: '',
//   });

//   // State for application status update (for compassionateAegrotat and completionProgramme)
//   const [applicationStatusUpdate, setApplicationStatusUpdate] = useState({
//     submissionId: null,
//     status: '',
//   });

//   // State for form errors
//   const [formErrors, setFormErrors] = useState({
//     gradeUpdate: '',
//     applicationStatus: '',
//   });

//   // State for submission status (for grade updates, status updates, and email sending)
//   const [submissionStatus, setSubmissionStatus] = useState({
//     gradeUpdate: null,
//     applicationStatus: null,
//     email: {},
//   });

//   // Simulate fetching submissions and sending auto emails on mount
//   useEffect(() => {
//     const sendAutoEmails = async () => {
//       const updatedSubmissions = { ...submissions };
//       for (const formName of ['reconsideration', 'compassionateAegrotat', 'completionProgramme']) {
//         for (const submission of updatedSubmissions[formName]) {
//           if (submission.emailStatus === 'pending') {
//             try {
//               await sendEmail(submission.id, formName, submission.email);
//               submission.emailStatus = 'sent';
//             } catch (error) {
//               submission.emailStatus = 'failed';
//             }
//           }
//         }
//       }
//       setSubmissions(updatedSubmissions);
//     };
//     sendAutoEmails();
//   }, []);

//   // Handle grade update input
//   const handleGradeChange = (value) => {
//     setGradeUpdate((prev) => ({ ...prev, newGrade: value }));
//     setFormErrors((prev) => ({ ...prev, gradeUpdate: '' }));
//   };

//   // Handle application status update input
//   const handleStatusChange = (value) => {
//     setApplicationStatusUpdate((prev) => ({ ...prev, status: value }));
//     setFormErrors((prev) => ({ ...prev, applicationStatus: '' }));
//   };

//   // Handle grade update submission
//   const handleGradeSubmit = async (submissionId) => {
//     if (!gradeUpdate.newGrade) {
//       setFormErrors((prev) => ({ ...prev, gradeUpdate: 'Please select a new grade.' }));
//       return;
//     }
//     setSubmissionStatus((prev) => ({ ...prev, gradeUpdate: 'submitting' }));
//     try {
//       await updateGrade(submissionId, gradeUpdate.newGrade);
//       setSubmissions((prev) => ({
//         ...prev,
//         reconsideration: prev.reconsideration.map((sub) =>
//           sub.id === submissionId ? { ...sub, currentGrade: gradeUpdate.newGrade } : sub
//         ),
//       }));
//       setSubmissionStatus((prev) => ({ ...prev, gradeUpdate: 'success' }));
//       setGradeUpdate({ submissionId: null, newGrade: '' });
//       setTimeout(() => {
//         setSubmissionStatus((prev) => ({ ...prev, gradeUpdate: null }));
//       }, 3000);
//     } catch (error) {
//       setSubmissionStatus((prev) => ({ ...prev, gradeUpdate: 'error' }));
//       setFormErrors((prev) => ({ ...prev, gradeUpdate: 'Error updating grade. Please try again.' }));
//     }
//   };

//   // Handle application status submission
//   const handleStatusSubmit = async (submissionId, formName) => {
//     if (!applicationStatusUpdate.status) {
//       setFormErrors((prev) => ({ ...prev, applicationStatus: 'Please select a status.' }));
//       return;
//     }
//     setSubmissionStatus((prev) => ({ ...prev, applicationStatus: 'submitting' }));
//     try {
//       await updateApplicationStatus(submissionId, applicationStatusUpdate.status);
//       setSubmissions((prev) => ({
//         ...prev,
//         [formName]: prev[formName].map((sub) =>
//           sub.id === submissionId ? { ...sub, status: applicationStatusUpdate.status } : sub
//         ),
//       }));
//       setSubmissionStatus((prev) => ({ ...prev, applicationStatus: 'success' }));
//       setApplicationStatusUpdate({ submissionId: null, status: '' });
//       setTimeout(() => {
//         setSubmissionStatus((prev) => ({ ...prev, applicationStatus: null }));
//       }, 3000);
//     } catch (error) {
//       setSubmissionStatus((prev) => ({ ...prev, applicationStatus: 'error' }));
//       setFormErrors((prev) => ({ ...prev, applicationStatus: 'Error updating status. Please try again.' }));
//     }
//   };

//   // Handle email resend
//   const handleEmailResend = async (submissionId, formName, studentEmail) => {
//     setSubmissionStatus((prev) => ({
//       ...prev,
//       email: { ...prev.email, [submissionId]: 'sending' },
//     }));
//     try {
//       await sendEmail(submissionId, formName, studentEmail);
//       setSubmissions((prev) => ({
//         ...prev,
//         [formName]: prev[formName].map((sub) =>
//           sub.id === submissionId ? { ...sub, emailStatus: 'sent' } : sub
//         ),
//       }));
//       setSubmissionStatus((prev) => ({
//         ...prev,
//         email: { ...prev.email, [submissionId]: 'success' },
//       }));
//       setTimeout(() => {
//         setSubmissionStatus((prev) => ({
//           ...prev,
//           email: { ...prev.email, [submissionId]: null },
//         }));
//       }, 3000);
//     } catch (error) {
//       setSubmissionStatus((prev) => ({
//         ...prev,
//         email: { ...prev.email, [submissionId]: 'error' },
//       }));
//     }
//   };

//   // Form configurations, aligned with student forms
//   const forms = [
//     {
//       name: 'reconsideration',
//       title: 'Application for Reconsideration of Course Grade',
//       columns: [
//         'Student ID',
//         'Name',
//         'Email',
//         'Telephone',
//         'Course Code',
//         'Course Title',
//         'Course Lecturer',
//         'Receipt No.',
//         'Current Grade',
//         'Update Grade',
//         'Email Status',
//         'Action',
//       ],
//     },
//     {
//       name: 'compassionateAegrotat',
//       title: 'Application for Compassionate/Aegrotat Pass/Special Exam',
//       columns: [
//         'Student ID',
//         'Name',
//         'Email',
//         'Telephone',
//         'Missed Exams',
//         'Application Type',
//         'Reason',
//         'Supporting Documents',
//         'Signature',
//         'Status',
//         'Email Status',
//         'Action',
//       ],
//     },
//     {
//       name: 'completionProgramme',
//       title: 'Application for Completion of Programme',
//       columns: [
//         'Student ID',
//         'Name',
//         'Email',
//         'Telephone',
//         'Date of Birth',
//         'Postal Address',
//         'Programme',
//         'Declaration Agreed',
//         'Signature',
//         'Date',
//         'Status',
//         'Email Status',
//         'Action',
//       ],
//     },
//   ];

//   // Format missed exams for display
//   const formatMissedExams = (missedExams) => {
//     return missedExams
//       .map((exam, index) =>
//         exam.courseCode
//           ? `${index + 1}. ${exam.courseCode} (${exam.examDate}, ${exam.examStartTime}, ${exam.applyingFor})`
//           : null
//       )
//       .filter(Boolean)
//       .join('; ');
//   };

//   // Render submission table
//   const renderTable = (form) => (
//     <Card elevation={3} sx={{ borderRadius: '20px', mb: 4, background: 'linear-gradient(135deg, #ffffff 0%, #f5f7fa 100%)' }}>
//       <CardContent sx={{ p: 3 }}>
//         <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//           <Button
//             startIcon={<ArrowBackIcon />}
//             onClick={() => {
//               setSelectedForm(null);
//               setGradeUpdate({ submissionId: null, newGrade: '' });
//               setApplicationStatusUpdate({ submissionId: null, status: '' });
//             }}
//             sx={{ mr: 2, color: '#094c50' }}
//           >
//             Back
//           </Button>
//           <Typography variant="h4" sx={{ color: '#000000', fontWeight: 'medium' }}>
//             {form.title}
//           </Typography>
//         </Box>
//         <TableContainer component={Paper}>
//           <Table sx={{ minWidth: 650 }} aria-label={`${form.name} table`}>
//             <TableHead>
//               <TableRow>
//                 {form.columns.map((column) => (
//                   <TableCell key={column} sx={{ fontWeight: 'bold' }}>
//                     {column}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {submissions[form.name].map((submission) => (
//                 <TableRow key={submission.id}>
//                   <TableCell>{submission.studentId}</TableCell>
//                   <TableCell>{submission.fullName}</TableCell>
//                   <TableCell>{submission.email}</TableCell>
//                   <TableCell>{submission.telephone}</TableCell>
//                   {form.name === 'reconsideration' ? (
//                     <>
//                       <TableCell>{submission.courseCode}</TableCell>
//                       <TableCell>{submission.courseTitle}</TableCell>
//                       <TableCell>{submission.courseLecturer}</TableCell>
//                       <TableCell>{submission.receiptNo}</TableCell>
//                       <TableCell>{submission.currentGrade}</TableCell>
//                       <TableCell>
//                         {gradeUpdate.submissionId === submission.id ? (
//                           <Box sx={{ display: 'flex', alignItems: 'center' }}>``
//                             <FormControl sx={{ minWidth: 100, mr: 1 }}>
//                               <Select
//                                 value={gradeUpdate.newGrade}
//                                 onChange={(e) => handleGradeChange(e.target.value)}
//                                 displayEmpty
//                               >
//                                 <MenuItem value="" disabled>
//                                   Select Grade
//                                 </MenuItem>
//                                 {['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F'].map((grade) => (
//                                   <MenuItem key={grade} value={grade}>
//                                     {grade}
//                                   </MenuItem>
//                                 ))}
//                               </Select>
//                             </FormControl>
//                             <Button
//                               variant="contained"
//                               sx={{ backgroundColor: '#094c50', '&:hover': { backgroundColor: '#073a3e' } }}
//                               onClick={() => handleGradeSubmit(submission.id)}
//                               disabled={submissionStatus.gradeUpdate === 'submitting'}
//                             >
//                               {submissionStatus.gradeUpdate === 'submitting' ? 'Saving...' : 'Save'}
//                             </Button>
//                           </Box>
//                         ) : (
//                           <Button
//                             variant="outlined"
//                             sx={{ color: '#094c50', borderColor: '#094c50' }}
//                             onClick={() => setGradeUpdate({ submissionId: submission.id, newGrade: '' })}
//                           >
//                             Update
//                           </Button>
//                         )}
//                         {submissionStatus.gradeUpdate === 'success' && gradeUpdate.submissionId === submission.id && (
//                           <Typography sx={{ color: (theme) => theme.palette.success.main, mt: 1 }}>
//                             Grade updated successfully!
//                           </Typography>
//                         )}
//                         {submissionStatus.gradeUpdate === 'error' && gradeUpdate.submissionId === submission.id && (
//                           <Typography sx={{ color: (theme) => theme.palette.error.main, mt: 1 }}>
//                             {formErrors.gradeUpdate}
//                           </Typography>
//                         )}
//                       </TableCell>
//                     </>
//                   ) : form.name === 'compassionateAegrotat' ? (
//                     <>
//                       <TableCell>{formatMissedExams(submission.missedExams) || 'None'}</TableCell>
//                       <TableCell>{submission.missedExams.find((exam) => exam.applyingFor)?.applyingFor || 'N/A'}</TableCell>
//                       <TableCell>{submission.reason}</TableCell>
//                       <TableCell>{submission.supportingDocuments}</TableCell>
//                       <TableCell>
//                         {submission.applicantSignature ? (
//                           <img
//                             src={submission.applicantSignature}
//                             alt="Signature"
//                             style={{ height: '50px', border: '1px solid #c4c4c4' }}
//                           />
//                         ) : (
//                           'No Signature'
//                         )}
//                       </TableCell>
//                       <TableCell>{submission.status}</TableCell>
//                       <TableCell>
//                         {applicationStatusUpdate.submissionId === submission.id ? (
//                           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                             <FormControl sx={{ minWidth: 120, mr: 1 }}>
//                               <Select
//                                 value={applicationStatusUpdate.status}
//                                 onChange={(e) => handleStatusChange(e.target.value)}
//                                 displayEmpty
//                               >
//                                 <MenuItem value="" disabled>
//                                   Select Status
//                                 </MenuItem>
//                                 {['Approved', 'Rejected', 'Pending'].map((status) => (
//                                   <MenuItem key={status} value={status}>
//                                     {status}
//                                   </MenuItem>
//                                 ))}
//                               </Select>
//                             </FormControl>
//                             <Button
//                               variant="contained"
//                               sx={{ backgroundColor: '#094c50', '&:hover': { backgroundColor: '#073a3e' } }}
//                               onClick={() => handleStatusSubmit(submission.id, form.name)}
//                               disabled={submissionStatus.applicationStatus === 'submitting'}
//                             >
//                               {submissionStatus.applicationStatus === 'submitting' ? 'Saving...' : 'Save'}
//                             </Button>
//                           </Box>
//                         ) : (
//                           <Button
//                             variant="outlined"
//                             sx={{ color: '#094c50', borderColor: '#094c50' }}
//                             onClick={() => setApplicationStatusUpdate({ submissionId: submission.id, status: '' })}
//                           >
//                             Update
//                           </Button>
//                         )}
//                         {submissionStatus.applicationStatus === 'success' && applicationStatusUpdate.submissionId === submission.id && (
//                           <Typography sx={{ color: (theme) => theme.palette.success.main, mt: 1 }}>
//                             Status updated successfully!
//                           </Typography>
//                         )}
//                         {submissionStatus.applicationStatus === 'error' && applicationStatusUpdate.submissionId === submission.id && (
//                           <Typography sx={{ color: (theme) => theme.palette.error.main, mt: 1 }}>
//                             {formErrors.applicationStatus}
//                           </Typography>
//                         )}
//                       </TableCell>
//                     </>
//                   ) : (
//                     <>
//                       <TableCell>{submission.dateOfBirth}</TableCell>
//                       <TableCell>{submission.postalAddress}</TableCell>
//                       <TableCell>{submission.programme}</TableCell>
//                       <TableCell>{submission.declarationAgreed ? 'Yes' : 'No'}</TableCell>
//                       <TableCell>
//                         {submission.applicantSignature ? (
//                           <img
//                             src={submission.applicantSignature}
//                             alt="Signature"
//                             style={{ height: '50px', border: '1px solid #c4c4c4' }}
//                           />
//                         ) : (
//                           'No Signature'
//                         )}
//                       </TableCell>
//                       <TableCell>{submission.date}</TableCell>
//                       <TableCell>{submission.status}</TableCell>
//                       <TableCell>
//                         {applicationStatusUpdate.submissionId === submission.id ? (
//                           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                             <FormControl sx={{ minWidth: 120, mr: 1 }}>
//                               <Select
//                                 value={applicationStatusUpdate.status}
//                                 onChange={(e) => handleStatusChange(e.target.value)}
//                                 displayEmpty
//                               >
//                                 <MenuItem value="" disabled>
//                                   Select Status
//                                 </MenuItem>
//                                 {['Approved', 'Rejected', 'Pending'].map((status) => (
//                                   <MenuItem key={status} value={status}>
//                                     {status}
//                                   </MenuItem>
//                                 ))}
//                               </Select>
//                             </FormControl>
//                             <Button
//                               variant="contained"
//                               sx={{ backgroundColor: '#094c50', '&:hover': { backgroundColor: '#073a3e' } }}
//                               onClick={() => handleStatusSubmit(submission.id, form.name)}
//                               disabled={submissionStatus.applicationStatus === 'submitting'}
//                             >
//                               {submissionStatus.applicationStatus === 'submitting' ? 'Saving...' : 'Save'}
//                             </Button>
//                           </Box>
//                         ) : (
//                           <Button
//                             variant="outlined"
//                             sx={{ color: '#094c50', borderColor: '#094c50' }}
//                             onClick={() => setApplicationStatusUpdate({ submissionId: submission.id, status: '' })}
//                           >
//                             Update
//                           </Button>
//                         )}
//                         {submissionStatus.applicationStatus === 'success' && applicationStatusUpdate.submissionId === submission.id && (
//                           <Typography sx={{ color: (theme) => theme.palette.success.main, mt: 1 }}>
//                             Status updated successfully!
//                           </Typography>
//                         )}
//                         {submissionStatus.applicationStatus === 'error' && applicationStatusUpdate.submissionId === submission.id && (
//                           <Typography sx={{ color: (theme) => theme.palette.error.main, mt: 1 }}>
//                             {formErrors.applicationStatus}
//                           </Typography>
//                         )}
//                       </TableCell>
//                     </>
//                   )}
//                   <TableCell>
//                     {submission.emailStatus === 'sent' ? (
//                       <Typography sx={{ color: (theme) => theme.palette.success.main }}>Sent</Typography>
//                     ) : submission.emailStatus === 'failed' ? (
//                       <Typography sx={{ color: (theme) => theme.palette.error.main }}>Failed</Typography>
//                     ) : (
//                       'Pending'
//                     )}
//                   </TableCell>
//                   <TableCell>
//                     {submission.emailStatus === 'failed' && (
//                       <Button
//                         variant="contained"
//                         sx={{ backgroundColor: '#094c50', '&:hover': { backgroundColor: '#073a3e' } }}
//                         onClick={() => handleEmailResend(submission.id, form.name, submission.email)}
//                         disabled={submissionStatus.email[submission.id] === 'sending'}
//                       >
//                         {submissionStatus.email[submission.id] === 'sending' ? 'Sending...' : 'Send Again'}
//                       </Button>
//                     )}
//                     {submissionStatus.email[submission.id] === 'success' && (
//                       <Typography sx={{ color: (theme) => theme.palette.success.main, mt: 1 }}>
//                         Email sent successfully!
//                       </Typography>
//                     )}
//                     {submissionStatus.email[submission.id] === 'error' && (
//                       <Typography sx={{ color: (theme) => theme.palette.error.main, mt: 1 }}>
//                         Error sending email. Please try again.
//                       </Typography>
//                     )}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </CardContent>
//     </Card>
//   );

//   return (
//     <DashboardLayout>
//       <Grid container spacing={2}>
//         <Grid item xs={12}>
//           {/* Header */}
//           <TitleBar title="Forms Configuration" />
//           {/* Card View or Selected Form */}
//           {!selectedForm ? (
//             <Grid container spacing={2} sx={{ mt: 2 }}>
//               {forms.map((form) => (
//                 <Grid item xs={12} sm={6} md={4} key={form.name}>
//                   <Card
//                     elevation={3}
//                     sx={{
//                       borderRadius: '20px',
//                       background: 'linear-gradient(135deg, #ffffff 0%, #f5f7fa 100%)',
//                       cursor: 'pointer',
//                       '&:hover': { background: 'linear-gradient(135deg, #f5f7fa 0%, #e0e4ea 100%)' },
//                       minHeight: '120px',
//                       display: 'flex',
//                       flexDirection: 'column',
//                     }}
//                     onClick={() => setSelectedForm(form.name)}
//                   >
//                     <CardContent sx={{ p: 3, display: 'flex', alignItems: 'center', flex: 1 }}>
//                       <DescriptionTwoToneIcon sx={{ fontSize: 48, color: '#094c50', mr: 2, flexShrink: 0 }} />
//                       <Typography
//                         variant="h6"
//                         sx={{
//                           color: '#000000',
//                           fontWeight: 'medium',
//                           textAlign: 'left',
//                           wordBreak: 'break-word',
//                           overflow: 'hidden',
//                           textOverflow: 'ellipsis',
//                           display: '-webkit-box',
//                           WebkitLineClamp: 3,
//                           WebkitBoxOrient: 'vertical',
//                         }}
//                       >
//                         {form.title}
//                       </Typography>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//           ) : (
//             renderTable(forms.find((form) => form.name === selectedForm))
//           )}
//         </Grid>
//       </Grid>
//     </DashboardLayout>
//   );
// };

// export default FormsConfiguration;

import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  CircularProgress,
} from '@mui/material';
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
import TitleBar from '../../components/Titlebar/Titlebar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import { getPendingGradeRecheckRequests, updateGradeRecheckRequestStatus } from '../../Endpoints/AdminEndpoints';

const FormsConfiguration = () => {
  // State for selected form type (null for card view, or 'reconsideration')
  const [selectedForm, setSelectedForm] = useState(null);

  // State for submissions
  const [submissions, setSubmissions] = useState([]);

  // State for status update
  const [statusUpdate, setStatusUpdate] = useState({
    requestId: null,
    status: '',
  });

  // State for form errors
  const [formErrors, setFormErrors] = useState({
    statusUpdate: '',
  });

  // State for submission status
  const [submissionStatus, setSubmissionStatus] = useState({
    statusUpdate: null,
  });

  // State for loading and error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch pending grade recheck requests on mount
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        const response = await getPendingGradeRecheckRequests();
        setSubmissions(response.data || []);
      } catch (err) {
        console.error('Error fetching grade recheck requests:', err);
        //setError(err.response?.data?.message || 'Failed to load submissions');
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, []);

  // Handle status update input
  const handleStatusChange = (value) => {
    setStatusUpdate((prev) => ({ ...prev, status: value }));
    setFormErrors((prev) => ({ ...prev, statusUpdate: '' }));
  };

  // Handle status update submission
  const handleStatusSubmit = async (requestId) => {
    if (!statusUpdate.status) {
      setFormErrors((prev) => ({ ...prev, statusUpdate: 'Please select a status.' }));
      return;
    }
    setSubmissionStatus((prev) => ({ ...prev, statusUpdate: 'submitting' }));
    try {
      await updateGradeRecheckRequestStatus(requestId, { status: statusUpdate.status });
      setSubmissions((prev) =>
        prev.map((sub) =>
          sub.id === requestId ? { ...sub, status: statusUpdate.status } : sub
        )
      );
      setSubmissionStatus((prev) => ({ ...prev, statusUpdate: 'success' }));
      setStatusUpdate({ requestId: null, status: '' });
      setTimeout(() => {
        setSubmissionStatus((prev) => ({ ...prev, statusUpdate: null }));
      }, 3000);
    } catch (err) {
      console.error('Error updating status:', err);
      setSubmissionStatus((prev) => ({ ...prev, statusUpdate: 'error' }));
      setFormErrors((prev) => ({
        ...prev,
        statusUpdate: err.response?.data?.message || 'Error updating status. Please try again.',
      }));
    }
  };

  // Form configuration for reconsideration
  const forms = [
    {
      name: 'reconsideration',
      title: 'Application for Reconsideration of Course Grade',
      columns: [
        'Student ID',
        'Name',
        'Email',
        'Telephone',
        'Course Code',
        'Course Title',
        'Current Grade',
        'Status',
        'Action',
      ],
    },
  ];

  // Render submission table
  const renderTable = (form) => (
    <Card elevation={3} sx={{ borderRadius: '20px', mb: 4, background: 'linear-gradient(135deg, #ffffff 0%, #f5f7fa 100%)' }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => {
              setSelectedForm(null);
              setStatusUpdate({ requestId: null, status: '' });
            }}
            sx={{ mr: 2, color: '#094c50' }}
          >
            Back
          </Button>
          <Typography variant="h4" sx={{ color: '#000000', fontWeight: 'medium' }}>
            {form.title}
          </Typography>
        </Box>
        {error && (
          <Typography sx={{ color: (theme) => theme.palette.error.main, mb: 2 }}>
            {error}
          </Typography>
        )}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label={`${form.name} table`}>
            <TableHead>
              <TableRow>
                {form.columns.map((column) => (
                  <TableCell key={column} sx={{ fontWeight: 'bold' }}>
                    {column}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {submissions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={form.columns.length} align="center">
                    No pending grade recheck requests found.
                  </TableCell>
                </TableRow>
              ) : (
                submissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell>{submission.studentId}</TableCell>
                    <TableCell>{submission.fullName}</TableCell>
                    <TableCell>{submission.email}</TableCell>
                    <TableCell>{submission.telephone}</TableCell>
                    <TableCell>{submission.courseCode}</TableCell>
                    <TableCell>{submission.courseTitle}</TableCell>
                    <TableCell>{submission.currentGrade}</TableCell>
                    <TableCell>{submission.status}</TableCell>
                    <TableCell>
                      {statusUpdate.requestId === submission.id ? (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <FormControl sx={{ minWidth: 120, mr: 1 }}>
                            <Select
                              value={statusUpdate.status}
                              onChange={(e) => handleStatusChange(e.target.value)}
                              displayEmpty
                            >
                              <MenuItem value="" disabled>
                                Select Status
                              </MenuItem>
                              {['Approved', 'Rejected', 'Pending'].map((status) => (
                                <MenuItem key={status} value={status}>
                                  {status}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          <Button
                            variant="contained"
                            sx={{ backgroundColor: '#094c50', '&:hover': { backgroundColor: '#073a3e' } }}
                            onClick={() => handleStatusSubmit(submission.id)}
                            disabled={submissionStatus.statusUpdate === 'submitting'}
                          >
                            {submissionStatus.statusUpdate === 'submitting' ? 'Saving...' : 'Save'}
                          </Button>
                        </Box>
                      ) : (
                        <Button
                          variant="outlined"
                          sx={{ color: '#094c50', borderColor: '#094c50' }}
                          onClick={() => setStatusUpdate({ requestId: submission.id, status: '' })}
                        >
                          Update
                        </Button>
                      )}
                      {submissionStatus.statusUpdate === 'success' && statusUpdate.requestId === submission.id && (
                        <Typography sx={{ color: (theme) => theme.palette.success.main, mt: 1 }}>
                          Status updated successfully!
                        </Typography>
                      )}
                      {submissionStatus.statusUpdate === 'error' && statusUpdate.requestId === submission.id && (
                        <Typography sx={{ color: (theme) => theme.palette.error.main, mt: 1 }}>
                          {formErrors.statusUpdate}
                        </Typography>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <DashboardLayout>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {/* Header */}
          <TitleBar title="Forms Configuration" />
          {/* Card View or Selected Form */}
          {!selectedForm ? (
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {forms.map((form) => (
                <Grid item xs={12} sm={6} md={4} key={form.name}>
                  <Card
                    elevation={3}
                    sx={{
                      borderRadius: '20px',
                      background: 'linear-gradient(135deg, #ffffff 0%, #f5f7fa 100%)',
                      cursor: 'pointer',
                      '&:hover': { background: 'linear-gradient(135deg, #f5f7fa 0%, #e0e4ea 100%)' },
                      minHeight: '120px',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                    onClick={() => setSelectedForm(form.name)}
                  >
                    <CardContent sx={{ p: 3, display: 'flex', alignItems: 'center', flex: 1 }}>
                      <DescriptionTwoToneIcon sx={{ fontSize: 48, color: '#094c50', mr: 2, flexShrink: 0 }} />
                      <Typography
                        variant="h6"
                        sx={{
                          color: '#000000',
                          fontWeight: 'medium',
                          textAlign: 'left',
                          wordBreak: 'break-word',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {form.title}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            renderTable(forms.find((form) => form.name === selectedForm))
          )}
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default FormsConfiguration;