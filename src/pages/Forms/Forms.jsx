// import React, { useState, useRef } from 'react';
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   TextField,
//   Button,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
//   Divider,
//   Radio,
//   RadioGroup,
//   FormControlLabel,
//   Checkbox,
//   FormGroup,
// } from '@mui/material';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import PhoneInput from 'react-phone-number-input';
// import SignatureCanvas from 'react-signature-canvas';
// import 'react-phone-number-input/style.css';
// import dayjs from 'dayjs';
// import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
// import TitleBar from '../../components/Titlebar/Titlebar';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';

// // Mock submission handler with simulated error
// const handleFormSubmit = async (formData, formName) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       // Simulate 10% chance of failure
//       if (Math.random() < 0.1) {
//         reject(new Error(`Failed to submit ${formName}`));
//       } else {
//         console.log(`${formName} submitted:`, formData);
//         resolve({ success: true });
//       }
//     }, 1000);
//   });
// };

// const FormsPage = () => {
//   // State for selected form (null for card view, or form name)
//   const [selectedForm, setSelectedForm] = useState(null);

//   // Signature canvas refs
//   const sigCanvasRef = useRef(null);

//   // State for Reconsideration of Course Grade Form
//   const [reconsideration, setReconsideration] = useState({
//     studentId: '',
//     fullName: '',
//     postalAddress: '',
//     dateOfBirth: null,
//     telephone: '',
//     email: '',
//     sponsorship: 'Private',
//     courseCode: '',
//     courseTitle: '',
//     receiptNo: '',
//     paymentConfirmation: null,
//   });

//   // State for Compassionate/Aegrotat Pass/Special Exam Form
//   const [compassionateAegrotat, setCompassionateAegrotat] = useState({
//     studentId: '',
//     fullName: '',
//     email: '',
//     campus: '',
//     telephone: '',
//     postalAddress: '',
//     semester: '',
//     year: null,
//     missedExams: [
//       { courseCode: '', examDate: null, examStartTime: '', applyingFor: '' },
//       { courseCode: '', examDate: null, examStartTime: '', applyingFor: '' },
//       { courseCode: '', examDate: null, examStartTime: '', applyingFor: '' },
//       { courseCode: '', examDate: null, examStartTime: '', applyingFor: '' },
//     ],
//     reason: '',
//     supportingDocuments: null,
//     applicantSignature: '',
//     date: null,
//   });

//   // State for Application for Completion of Programme Form
//   const [completionProgramme, setCompletionProgramme] = useState({
//     studentId: '',
//     fullName: '',
//     email: '',
//     telephone: '',
//     dateOfBirth: null,
//     postalAddress: '',
//     programme: '',
//     declarationAgreed: false,
//     applicantSignature: '',
//     date: null,
//   });

//   // State for form submission status
//   const [submissionStatus, setSubmissionStatus] = useState({
//     reconsideration: null,
//     compassionateAegrotat: null,
//     completionProgramme: null,
//   });

//   // State for form errors
//   const [formErrors, setFormErrors] = useState({
//     reconsideration: '',
//     compassionateAegrotat: '',
//     completionProgramme: '',
//   });

//   // Validate form data
//   const validateForm = (formData, formName) => {
//     if (formName === 'reconsideration') {
//       const textFields = ['studentId', 'fullName', 'postalAddress', 'telephone', 'email', 'sponsorship', 'courseCode', 'courseLecturer', 'courseTitle', 'receiptNo'];
//       if (textFields.some((field) => !formData[field])) {
//         return `All required text fields are required for ${formName} form.`;
//       }
//       if (!formData.dateOfBirth) return 'Date of birth is required.';
//       if (!formData.paymentConfirmation) return 'Payment confirmation is required.';
//       if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
//         return 'Invalid email format.';
//       }
//       if (!/^\+\d{7,15}$/.test(formData.telephone)) {
//         return 'Telephone must include country code and 7-15 digits.';
//       }
//     } else if (formName === 'compassionateAegrotat') {
//       const textFields = ['studentId', 'fullName', 'email', 'campus', 'telephone', 'postalAddress', 'semester', 'reason', 'applicantSignature'];
//       if (textFields.some((field) => !formData[field])) {
//         return `All required text fields are required for ${formName} form.`;
//       }
//       if (!formData.year) return 'Year is required.';
//       if (!formData.date) return 'Application date is required.';
//       if (!formData.supportingDocuments) return 'Supporting documents are required.';
//       if (!/^\d{4}$/.test(formData.year?.year() || '9999')) {
//         return 'Year must be a 4-digit number.';
//       }
//       if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
//         return 'Invalid email format.';
//       }
//       if (!/^\+\d{7,15}$/.test(formData.telephone)) {
//         return 'Telephone must include country code and 7-15 digits.';
//       }
//       // Validate missed exams: if any field is filled, all must be filled
//       for (let i = 0; i < formData.missedExams.length; i++) {
//         const exam = formData.missedExams[i];
//         const hasAnyField = exam.courseCode || exam.examDate || exam.examStartTime || exam.applyingFor;
//         if (hasAnyField && !(exam.courseCode && exam.examDate && exam.examStartTime && exam.applyingFor)) {
//           return `All fields for Missed Exam ${i + 1} must be filled if any are provided.`;
//         }
//       }
//     } else if (formName === 'completionProgramme') {
//       const textFields = ['studentId', 'fullName', 'email', 'telephone', 'programme', 'applicantSignature'];
//       if (textFields.some((field) => !formData[field])) {
//         return `All required text fields are required for ${formName} form.`;
//       }
//       if (!formData.dateOfBirth) return 'Date of birth is required.';
//       if (!formData.date) return 'Application date is required.';
//       if (!formData.declarationAgreed) return 'You must agree to the declaration.';
//       if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
//         return 'Invalid email format.';
//       }
//       if (!/^\+\d{7,15}$/.test(formData.telephone)) {
//         return 'Telephone must include country code and 7-15 digits.';
//       }
//     }
//     return '';
//   };

//   // Handle input changes
//   const handleInputChange = (setForm, field, value) => {
//     setForm((prev) => ({ ...prev, [field]: value }));
//     setFormErrors((prev) => ({ ...prev, reconsideration: '', compassionateAegrotat: '', completionProgramme: '' }));
//   };

//   // Handle missed exam input changes
//   const handleMissedExamChange = (index, field, value) => {
//     setCompassionateAegrotat((prev) => ({
//       ...prev,
//       missedExams: prev.missedExams.map((exam, i) =>
//         i === index ? { ...exam, [field]: value } : exam
//       ),
//     }));
//     setFormErrors((prev) => ({ ...prev, compassionateAegrotat: '' }));
//   };

//   // Handle file input changes
//   const handleFileChange = (setForm, field, file) => {
//     setForm((prev) => ({ ...prev, [field]: file }));
//     setFormErrors((prev) => ({ ...prev, reconsideration: '', compassionateAegrotat: '', completionProgramme: '' }));
//   };

//   // Handle date changes
//   const handleDateChange = (setForm, field, value) => {
//     setForm((prev) => ({ ...prev, [field]: value }));
//     setFormErrors((prev) => ({ ...prev, reconsideration: '', compassionateAegrotat: '', completionProgramme: '' }));
//   };

//   // Handle missed exam date changes
//   const handleMissedExamDateChange = (index, value) => {
//     setCompassionateAegrotat((prev) => ({
//       ...prev,
//       missedExams: prev.missedExams.map((exam, i) =>
//         i === index ? { ...exam, examDate: value } : exam
//       ),
//     }));
//     setFormErrors((prev) => ({ ...prev, compassionateAegrotat: '' }));
//   };

//   // Handle signature save
//   const handleSignatureSave = () => {
//     if (sigCanvasRef.current && !sigCanvasRef.current.isEmpty()) {
//       const signatureData = sigCanvasRef.current.getTrimmedCanvas().toDataURL('image/png');
//       if (selectedForm === 'compassionateAegrotat') {
//         setCompassionateAegrotat((prev) => ({ ...prev, applicantSignature: signatureData }));
//       } else if (selectedForm === 'completionProgramme') {
//         setCompletionProgramme((prev) => ({ ...prev, applicantSignature: signatureData }));
//       }
//     }
//   };

//   // Handle signature clear
//   const handleSignatureClear = () => {
//     if (sigCanvasRef.current) {
//       sigCanvasRef.current.clear();
//       if (selectedForm === 'compassionateAegrotat') {
//         setCompassionateAegrotat((prev) => ({ ...prev, applicantSignature: '' }));
//       } else if (selectedForm === 'completionProgramme') {
//         setCompletionProgramme((prev) => ({ ...prev, applicantSignature: '' }));
//       }
//     }
//   };

//   // Handle form submissions
//   const handleSubmit = async (formData, formName, setForm, resetData) => {
//     const error = validateForm(formData, formName);
//     if (error) {
//       setFormErrors((prev) => ({ ...prev, [formName]: error }));
//       return;
//     }
//     setSubmissionStatus((prev) => ({ ...prev, [formName]: 'submitting' }));
//     try {
//       const formDataToSubmit = {
//         ...formData,
//         dateOfBirth: formData.dateOfBirth ? formData.dateOfBirth.format('YYYY-MM-DD') : null,
//         year: formData.year ? formData.year.format('YYYY') : null,
//         date: formData.date ? formData.date.format('YYYY-MM-DD') : null,
//         paymentConfirmation: formData.paymentConfirmation?.name || null,
//         supportingDocuments: formData.supportingDocuments?.name || null,
//       };
//       if (formName === 'compassionateAegrotat') {
//         formDataToSubmit.missedExams = formData.missedExams.map((exam) => ({
//           ...exam,
//           examDate: exam.examDate ? exam.examDate.format('YYYY-MM-DD') : null,
//         }));
//       }
//       await handleFormSubmit(formDataToSubmit, formName);
//       setSubmissionStatus((prev) => ({ ...prev, [formName]: 'success' }));
//       setForm(resetData);
//       if ((formName === 'compassionateAegrotat' || formName === 'completionProgramme') && sigCanvasRef.current) {
//         sigCanvasRef.current.clear();
//       }
//       setTimeout(() => {
//         setSubmissionStatus((prev) => ({ ...prev, [formName]: null }));
//         setSelectedForm(null);
//       }, 3000);
//     } catch (error) {
//       setSubmissionStatus((prev) => ({ ...prev, [formName]: 'error' }));
//       setFormErrors((prev) => ({ ...prev, [formName]: error.message }));
//     }
//   };

//   // Form reset data
//   const resetData = {
//     reconsideration: {
//       studentId: '',
//       fullName: '',
//       postalAddress: '',
//       dateOfBirth: null,
//       telephone: '',
//       email: '',
//       sponsorship: 'Private',
//       courseCode: '',
//       courseTitle: '',
//       receiptNo: '',
//       paymentConfirmation: null,
//     },
//     compassionateAegrotat: {
//       studentId: '',
//       fullName: '',
//       email: '',
//       campus: '',
//       telephone: '',
//       postalAddress: '',
//       semester: '',
//       year: null,
//       missedExams: [
//         { courseCode: '', examDate: null, examStartTime: '', applyingFor: '' },
//         { courseCode: '', examDate: null, examStartTime: '', applyingFor: '' },
//         { courseCode: '', examDate: null, examStartTime: '', applyingFor: '' },
//         { courseCode: '', examDate: null, examStartTime: '', applyingFor: '' },
//       ],
//       reason: '',
//       supportingDocuments: null,
//       applicantSignature: '',
//       date: null,
//     },
//     completionProgramme: {
//       studentId: '',
//       fullName: '',
//       email: '',
//       telephone: '',
//       dateOfBirth: null,
//       postalAddress: '',
//       programme: '',
//       declarationAgreed: false,
//       applicantSignature: '',
//       date: null,
//     },
//   };

//   // Form configurations
//   const forms = [
//     {
//       name: 'reconsideration',
//       title: 'Application for Reconsideration of Course Grade',
//       state: reconsideration,
//       setState: setReconsideration,
//       sections: [
//         {
//           title: 'Personal Details',
//           fields: [
//             { label: 'Student ID', name: 'studentId', type: 'text', grid: { xs: 12, sm: 6 } },
//             { label: 'Full Name', name: 'fullName', type: 'text', grid: { xs: 12, sm: 6 } },
//             { label: 'Postal Address', name: 'postalAddress', type: 'text', multiline: true, rows: 3, grid: { xs: 12 } },
//             { label: 'Date of Birth', name: 'dateOfBirth', type: 'date', grid: { xs: 12, sm: 6 } },
//             { label: 'Telephone', name: 'telephone', type: 'phone', grid: { xs: 12, sm: 6 } },
//             { label: 'Email', name: 'email', type: 'email', grid: { xs: 12 } },
//             {
//               label: 'Are you a sponsored or private student?',
//               name: 'sponsorship',
//               type: 'radio',
//               options: ['Private', 'Sponsored'],
//               grid: { xs: 12 },
//             },
//           ],
//         },
//         {
//           title: 'Request Details',
//           fields: [
//             { label: 'Course Code', name: 'courseCode', type: 'text', grid: { xs: 12, sm: 6 } },
//             { label: 'Course Title', name: 'courseTitle', type: 'text', grid: { xs: 12 } },
//             { label: 'Receipt No.', name: 'receiptNo', type: 'text', grid: { xs: 12, sm: 6 } },
//             { label: 'Payment Confirmation Upload', name: 'paymentConfirmation', type: 'file', grid: { xs: 12 } },
//           ],
//         },
//       ],
//     },
//     {
//       name: 'compassionateAegrotat',
//       title: 'Application for Compassionate/Aegrotat Pass/Special Exam',
//       state: compassionateAegrotat,
//       setState: setCompassionateAegrotat,
//       sections: [
//         {
//           title: 'Personal Details',
//           fields: [
//             { label: 'Student ID', name: 'studentId', type: 'text', grid: { xs: 12, sm: 6 } },
//             { label: 'Full Name', name: 'fullName', type: 'text', grid: { xs: 12, sm: 6 } },
//             { label: 'Email', name: 'email', type: 'email', grid: { xs: 12, sm: 6 } },
//             { label: 'Campus', name: 'campus', type: 'text', grid: { xs: 12, sm: 6 } },
//             { label: 'Telephone', name: 'telephone', type: 'phone', grid: { xs: 12, sm: 6 } },
//             { label: 'Postal Address', name: 'postalAddress', type: 'text', multiline: true, rows: 3, grid: { xs: 12 } },
//             {
//               label: 'Semester/Trimester',
//               name: 'semester',
//               type: 'select',
//               options: ['Semester 1', 'Semester 2', 'Trimester 1', 'Trimester 2', 'Trimester 3'],
//               grid: { xs: 12, sm: 6 },
//             },
//             { label: 'Year', name: 'year', type: 'year', grid: { xs: 12, sm: 6 } },
//           ],
//         },
//         {
//           title: 'Missed Exam Details',
//           fields: [
//             {
//               type: 'missedExam',
//               sets: [
//                 { number: 1, grid: { xs: 12 } },
//                 { number: 2, grid: { xs: 12 } },
//                 { number: 3, grid: { xs: 12 } },
//                 { number: 4, grid: { xs: 12 } },
//               ],
//             },
//           ],
//         },
//         {
//           title: 'Application Details',
//           note: (
//             <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
//               <strong>Supporting Certified Documents</strong><br />
//               Aegrotat Pass (attach a USP approved medical certificate)<br />
//               Compassionate Pass (attach a certified copy of the death certificate or letter from employer)<br />
//               Special Examination (attach relevant documentation)
//             </Typography>
//           ),
//           fields: [
//             {
//               label: 'Please state below your reasons for making this application and attach all necessary documents.',
//               name: 'reason',
//               type: 'text',
//               multiline: true,
//               rows: 4,
//               grid: { xs: 12 },
//             },
//             { label: 'Attach Supporting Documents', name: 'supportingDocuments', type: 'file', grid: { xs: 12 } },
//             { label: 'Applicant’s Signature', name: 'applicantSignature', type: 'signature', grid: { xs: 12 } },
//             { label: 'Date', name: 'date', type: 'date', grid: { xs: 12, sm: 6 } },
//           ],
//         },
//       ],
//     },
//     {
//       name: 'completionProgramme',
//       title: 'Application for Completion of Programme',
//       state: completionProgramme,
//       setState: setCompletionProgramme,
//       sections: [
//         {
//           title: 'Personal Details',
//           note: (
//             <Box sx={{ mb: 2 }}>
//               <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//                 Note: For Preliminary Certificate, students enrolled from 2018 onwards are eligible.
//               </Typography>
//               <Typography variant="body2" sx={{ color: 'error.main', mt: 1 }}>
//                 Laucala Campus: Applications for this ceremony is open and will close on 30th June 2025<br />
//                 Solomon Islands Campus: Applications for this ceremony is open and will close on 4th of July 2025<br />
//                 Tonga Campus: Applications for this ceremony is open and will close on 1st of August 2025
//               </Typography>
//             </Box>
//           ),
//           fields: [
//             { label: 'Student ID Number', name: 'studentId', type: 'text', grid: { xs: 12, sm: 6 } },
//             { label: 'Name', name: 'fullName', type: 'text', grid: { xs: 12, sm: 6 } },
//             { label: 'Email', name: 'email', type: 'email', grid: { xs: 12, sm: 6 } },
//             { label: 'Telephone', name: 'telephone', type: 'phone', grid: { xs: 12, sm: 6 } },
//             { label: 'Date of Birth', name: 'dateOfBirth', type: 'date', grid: { xs: 12, sm: 6 } },
//             { label: 'Postal Address', name: 'postalAddress', type: 'text', multiline: true, rows: 3, grid: { xs: 12 } },
//             {
//               label: 'Programme',
//               name: 'programme',
//               type: 'select',
//               options: ['Pacific TAFE', 'Undergraduate', 'Postgraduate'],
//               grid: { xs: 12, sm: 6 },
//             },
//           ],
//         },
//         {
//           title: 'Declaration',
//           note: (
//             <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
//               I certify that the particulars in this form are correct, I have read the notes above, and I will abide by the rules set out in the Statutes, Ordinances Regulations and the Charter of the University of the South Pacific.
//             </Typography>
//           ),
//           fields: [
//             {
//               label: 'I have read the above information',
//               name: 'declarationAgreed',
//               type: 'checkbox',
//               grid: { xs: 12 },
//             },
//             { label: 'Student’s Signature', name: 'applicantSignature', type: 'signature', grid: { xs: 12 } },
//             { label: 'Date', name: 'date', type: 'date', grid: { xs: 12, sm: 6 } },
//           ],
//         },
//       ],
//     },
//   ];

//   // Render form
//   const renderForm = (form) => (
//     <Card elevation={3} sx={{ borderRadius: '20px', mb: 4, background: 'linear-gradient(135deg, #ffffff 0%, #f5f7fa 100%)' }}>
//       <CardContent sx={{ p: 3 }}>
//         <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//           <Button
//             startIcon={<ArrowBackIcon />}
//             onClick={() => setSelectedForm(null)}
//             sx={{ mr: 2, color: '#094c50' }}
//           >
//             Back
//           </Button>
//           <Typography variant="h4" sx={{ color: '#000000', fontWeight: 'medium' }}>
//             {form.title}
//           </Typography>
//         </Box>
//         <Box component="form" noValidate>
//           <Grid container spacing={2}>
//             {form.sections.map((section, index) => (
//               <Grid item xs={12} key={section.title}>
//                 <Typography variant="h6" sx={{ mb: 2, color: '#094c50' }}>
//                   {section.title}
//                 </Typography>
//                 {section.note && section.note}
//                 {section.fields.map((field, fieldIndex) => (
//                   <Grid item {...(field.grid || { xs: 12 })} key={field.name || `field-${fieldIndex}`} sx={{ mb: 2 }}>
//                     {field.type === 'select' ? (
//                       <FormControl fullWidth error={!!formErrors[form.name]}>
//                         <InputLabel>{field.label}</InputLabel>
//                         <Select
//                           value={form.state[field.name]}
//                           onChange={(e) => handleInputChange(form.setState, field.name, e.target.value)}
//                           required
//                         >
//                           {field.options.map((option) => (
//                             <MenuItem key={option} value={option}>
//                               {option}
//                             </MenuItem>
//                           ))}
//                         </Select>
//                       </FormControl>
//                     ) : field.type === 'file' ? (
//                       <Box>
//                         <Typography variant="body2" sx={{ mb: 1, color: formErrors[form.name] ? 'error.main' : 'text.secondary' }}>
//                           {field.label}
//                         </Typography>
//                         <input
//                           type="file"
//                           accept=".pdf,.jpg,.jpeg,.png"
//                           onChange={(e) => handleFileChange(form.setState, field.name, e.target.files[0])}
//                           style={{ width: '100%' }}
//                         />
//                         {form.state[field.name] && (
//                           <Typography variant="caption" sx={{ mt: 1, color: 'text.secondary' }}>
//                             Selected: {form.state[field.name].name}
//                           </Typography>
//                         )}
//                       </Box>
//                     ) : field.type === 'date' || field.type === 'year' ? (
//                       <LocalizationProvider dateAdapter={AdapterDayjs}>
//                         <DatePicker
//                           label={field.label}
//                           value={form.state[field.name]}
//                           onChange={(value) => handleDateChange(form.setState, field.name, value)}
//                           views={field.type === 'year' ? ['year'] : ['year', 'month', 'day']}
//                           renderInput={(params) => (
//                             <TextField {...params} fullWidth required error={!!formErrors[form.name]} />
//                           )}
//                         />
//                       </LocalizationProvider>
//                     ) : field.type === 'radio' ? (
//                       <FormControl component="fieldset" error={!!formErrors[form.name]}>
//                         <Typography variant="body1" sx={{ mb: 1 }}>
//                           {field.label}
//                         </Typography>
//                         <RadioGroup
//                           value={form.state[field.name]}
//                           onChange={(e) => handleInputChange(form.setState, field.name, e.target.value)}
//                         >
//                           {field.options.map((option) => (
//                             <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
//                           ))}
//                         </RadioGroup>
//                       </FormControl>
//                     ) : field.type === 'phone' ? (
//                       <PhoneInput
//                         international
//                         defaultCountry="FJ"
//                         value={form.state[field.name]}
//                         onChange={(value) => handleInputChange(form.setState, field.name, value || '')}
//                         placeholder={field.label}
//                         style={{
//                           border: formErrors[form.name] ? '1px solid #d32f2f' : '1px solid #c4c4c4',
//                           borderRadius: '4px',
//                           padding: '8px',
//                           width: '100%',
//                         }}
//                       />
//                     ) : field.type === 'signature' ? (
//                       <Box>
//                         <Typography variant="body2" sx={{ mb: 1, color: formErrors[form.name] ? 'error.main' : 'text.secondary' }}>
//                           {field.label}
//                         </Typography>
//                         <SignatureCanvas
//                           ref={sigCanvasRef}
//                           canvasProps={{
//                             style: { border: '1px solid #c4c4c4', width: '100%', height: '150px' },
//                           }}
//                         />
//                         <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
//                           <Button
//                             variant="outlined"
//                             onClick={handleSignatureClear}
//                             sx={{ color: '#094c50', borderColor: '#094c50' }}
//                           >
//                             Clear
//                           </Button>
//                           <Button
//                             variant="contained"
//                             onClick={handleSignatureSave}
//                             sx={{ backgroundColor: '#094c50', '&:hover': { backgroundColor: '#073a3e' } }}
//                           >
//                             Save
//                           </Button>
//                         </Box>
//                         {form.state[field.name] && (
//                           <Typography variant="caption" sx={{ mt: 1, color: 'text.secondary' }}>
//                             Signature saved
//                           </Typography>
//                         )}
//                       </Box>
//                     ) : field.type === 'checkbox' ? (
//                       <FormControl error={!!formErrors[form.name]}>
//                         <FormGroup>
//                           <FormControlLabel
//                             control={
//                               <Checkbox
//                                 checked={form.state[field.name]}
//                                 onChange={(e) => handleInputChange(form.setState, field.name, e.target.checked)}
//                               />
//                             }
//                             label={field.label}
//                           />
//                         </FormGroup>
//                       </FormControl>
//                     ) : field.type === 'missedExam' ? (
//                       <Box>
//                         {field.sets.map((set) => (
//                           <Grid container spacing={1} key={`missed-exam-${set.number}`} sx={{ mb: 2 }}>
//                             <Grid item xs={12}>
//                               <Typography variant="subtitle1" sx={{ mb: 1 }}>
//                                 Missed Exam {set.number}
//                               </Typography>
//                             </Grid>
//                             <Grid item xs={3}>
//                               <TextField
//                                 fullWidth
//                                 label="Course Code"
//                                 value={form.state.missedExams[set.number - 1].courseCode}
//                                 onChange={(e) => handleMissedExamChange(set.number - 1, 'courseCode', e.target.value)}
//                                 error={!!formErrors[form.name]}
//                                 required
//                               />
//                             </Grid>
//                             <Grid item xs={3}>
//                               <LocalizationProvider dateAdapter={AdapterDayjs}>
//                                 <DatePicker
//                                   label="Exam Date"
//                                   value={form.state.missedExams[set.number - 1].examDate}
//                                   onChange={(value) => handleMissedExamDateChange(set.number - 1, value)}
//                                   renderInput={(params) => (
//                                     <TextField {...params} fullWidth required error={!!formErrors[form.name]} />
//                                   )}
//                                 />
//                               </LocalizationProvider>
//                             </Grid>
//                             <Grid item xs={3}>
//                               <TextField
//                                 fullWidth
//                                 label="Exam Start Time"
//                                 type="time"
//                                 value={form.state.missedExams[set.number - 1].examStartTime}
//                                 onChange={(e) => handleMissedExamChange(set.number - 1, 'examStartTime', e.target.value)}
//                                 InputLabelProps={{ shrink: true }}
//                                 error={!!formErrors[form.name]}
//                                 required
//                               />
//                             </Grid>
//                             <Grid item xs={3}>
//                               <FormControl fullWidth error={!!formErrors[form.name]}>
//                                 <InputLabel>Applying For</InputLabel>
//                                 <Select
//                                   value={form.state.missedExams[set.number - 1].applyingFor}
//                                   onChange={(e) => handleMissedExamChange(set.number - 1, 'applyingFor', e.target.value)}
//                                   required
//                                 >
//                                   {['Aegrotat Pass', 'Compassionate Pass', 'Special Exam'].map((option) => (
//                                     <MenuItem key={option} value={option}>
//                                       {option}
//                                     </MenuItem>
//                                   ))}
//                                 </Select>
//                               </FormControl>
//                             </Grid>
//                           </Grid>
//                         ))}
//                       </Box>
//                     ) : (
//                       <TextField
//                         fullWidth
//                         label={field.label}
//                         type={field.type}
//                         value={form.state[field.name]}
//                         onChange={(e) => handleInputChange(form.setState, field.name, e.target.value)}
//                         required
//                         error={!!formErrors[form.name]}
//                         multiline={field.multiline || false}
//                         rows={field.rows || 1}
//                       />
//                     )}
//                   </Grid>
//                 ))}
//                 {index < form.sections.length - 1 && <Grid item xs={12}><Divider sx={{ my: 2 }} /></Grid>}
//               </Grid>
//             ))}
//             <Grid item xs={12}>
//               <Button
//                 variant="contained"
//                 sx={{ backgroundColor: '#094c50', '&:hover': { backgroundColor: '#073a3e' } }}
//                 onClick={() => handleSubmit(form.state, form.name, form.setState, resetData[form.name])}
//                 disabled={submissionStatus[form.name] === 'submitting'}
//               >
//                 {submissionStatus[form.name] === 'submitting' ? 'Submitting...' : 'Submit'}
//               </Button>
//               {submissionStatus[form.name] === 'success' && (
//                 <Typography sx={{ mt: 2, color: (theme) => theme.palette.success.main }}>
//                   {form.title} submitted successfully!
//                 </Typography>
//               )}
//               {submissionStatus[form.name] === 'error' && (
//                 <Typography sx={{ mt: 2, color: (theme) => theme.palette.error.main }}>
//                   {formErrors[form.name] || `Error submitting ${form.title}. Please try again.`}
//                 </Typography>
//               )}
//             </Grid>
//           </Grid>
//         </Box>
//       </CardContent>
//     </Card>
//   );

//   return (
//     <DashboardLayout>
//       <Grid container spacing={2}>
//         <Grid item xs={12}>
//           {/* Header */}
//           <TitleBar title="Student Forms" />
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
//                     }}
//                     onClick={() => setSelectedForm(form.name)}
//                   >
//                     <CardContent sx={{ p: 3, display: 'flex', alignItems: 'center' }}>
//                       <DescriptionTwoToneIcon sx={{ fontSize: 48, color: '#094c50', mr: 2 }} />
//                       <Typography
//                         variant="h6"
//                         sx={{ color: '#000000', fontWeight: 'medium', textAlign: 'left' }}
//                       >
//                         {form.title}
//                       </Typography>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//           ) : (
//             renderForm(forms.find((form) => form.name === selectedForm))
//           )}
//         </Grid>
//       </Grid>
//     </DashboardLayout>
//   );
// };

// export default FormsPage;

import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Alert,
  CircularProgress,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import PhoneInput from 'react-phone-number-input';
import SignatureCanvas from 'react-signature-canvas';
import 'react-phone-number-input/style.css';
import dayjs from 'dayjs';
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
import TitleBar from '../../components/Titlebar/Titlebar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import { createGradeRecheckRequest } from '../../Endpoints/StudentEndpoints';

// Mock submission handler for unsupported forms
const handleMockFormSubmit = async (formData, formName) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate 10% chance of failure
      if (Math.random() < 0.1) {
        reject(new Error(`Failed to submit ${formName}`));
      } else {
        console.log(`${formName} submitted:`, formData);
        resolve({ success: true });
      }
    }, 1000);
  });
};

const FormsPage = () => {
  const [selectedForm, setSelectedForm] = useState(null);
  const [studentId, setStudentId] = useState('');
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(true);

  // Signature canvas refs
  const sigCanvasRef = useRef(null);

  // State for Reconsideration of Course Grade Form
  const [reconsideration, setReconsideration] = useState({
    studentId: '',
    fullName: '',
    postalAddress: '',
    dateOfBirth: null,
    telephone: '',
    email: '',
    sponsorship: 'Private',
    courseCode: '',
    courseTitle: '',
    receiptNo: '',
    paymentConfirmation: null,
  });

  // State for Compassionate/Aegrotat Pass/Special Exam Form
  const [compassionateAegrotat, setCompassionateAegrotat] = useState({
    studentId: '',
    fullName: '',
    email: '',
    campus: '',
    telephone: '',
    postalAddress: '',
    semester: '',
    year: null,
    missedExams: [
      { courseCode: '', examDate: null, examStartTime: '', applyingFor: '' },
      { courseCode: '', examDate: null, examStartTime: '', applyingFor: '' },
      { courseCode: '', examDate: null, examStartTime: '', applyingFor: '' },
      { courseCode: '', examDate: null, examStartTime: '', applyingFor: '' },
    ],
    reason: '',
    supportingDocuments: null,
    applicantSignature: '',
    date: null,
  });

  // State for Application for Completion of Programme Form
  const [completionProgramme, setCompletionProgramme] = useState({
    studentId: '',
    fullName: '',
    email: '',
    telephone: '',
    dateOfBirth: null,
    postalAddress: '',
    programme: '',
    declarationAgreed: false,
    applicantSignature: '',
    date: null,
  });

  // State for form submission status
  const [submissionStatus, setSubmissionStatus] = useState({
    reconsideration: null,
    compassionateAegrotat: null,
    completionProgramme: null,
  });

  // State for form errors
  const [formErrors, setFormErrors] = useState({
    reconsideration: '',
    compassionateAegrotat: '',
    completionProgramme: '',
  });

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
      }
    } else {
      setAuthError('User not authenticated. Please login.');
    }
    setLoading(false);
  }, []);

  // Validate form data
  const validateForm = (formData, formName) => {
    if (formName === 'reconsideration') {
      const textFields = ['studentId', 'fullName', 'postalAddress', 'telephone', 'email', 'sponsorship', 'courseCode', 'courseTitle', 'receiptNo'];
      if (textFields.some((field) => !formData[field])) {
        return `All required text fields are required for ${formName} form.`;
      }
      if (!formData.dateOfBirth) return 'Date of birth is required.';
      if (!formData.paymentConfirmation) return 'Payment confirmation is required.';
      if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
        return 'Invalid email format.';
      }
      if (!/^\+\d{7,15}$/.test(formData.telephone)) {
        return 'Telephone must include country code and 7-15 digits.';
      }
    } else if (formName === 'compassionateAegrotat') {
      const textFields = ['studentId', 'fullName', 'email', 'campus', 'telephone', 'postalAddress', 'semester', 'reason', 'applicantSignature'];
      if (textFields.some((field) => !formData[field])) {
        return `All required text fields are required for ${formName} form.`;
      }
      if (!formData.year) return 'Year is required.';
      if (!formData.date) return 'Application date is required.';
      if (!formData.supportingDocuments) return 'Supporting documents are required.';
      if (!/^\d{4}$/.test(formData.year?.year() || '9999')) {
        return 'Year must be a 4-digit number.';
      }
      if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
        return 'Invalid email format.';
      }
      if (!/^\+\d{7,15}$/.test(formData.telephone)) {
        return 'Telephone must include country code and 7-15 digits.';
      }
      // Validate missed exams: if any field is filled, all must be filled
      for (let i = 0; i < formData.missedExams.length; i++) {
        const exam = formData.missedExams[i];
        const hasAnyField = exam.courseCode || exam.examDate || exam.examStartTime || exam.applyingFor;
        if (hasAnyField && !(exam.courseCode && exam.examDate && exam.examStartTime && exam.applyingFor)) {
          return `All fields for Missed Exam ${i + 1} must be filled if any are provided.`;
        }
      }
    } else if (formName === 'completionProgramme') {
      const textFields = ['studentId', 'fullName', 'email', 'telephone', 'programme', 'applicantSignature'];
      if (textFields.some((field) => !formData[field])) {
        return `All required text fields are required for ${formName} form.`;
      }
      if (!formData.dateOfBirth) return 'Date of birth is required.';
      if (!formData.date) return 'Application date is required.';
      if (!formData.declarationAgreed) return 'You must agree to the declaration.';
      if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
        return 'Invalid email format.';
      }
      if (!/^\+\d{7,15}$/.test(formData.telephone)) {
        return 'Telephone must include country code and 7-15 digits.';
      }
    }
    return '';
  };

  // Handle input changes
  const handleInputChange = (setForm, field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setFormErrors((prev) => ({ ...prev, reconsideration: '', compassionateAegrotat: '', completionProgramme: '' }));
  };

  // Handle missed exam input changes
  const handleMissedExamChange = (index, field, value) => {
    setCompassionateAegrotat((prev) => ({
      ...prev,
      missedExams: prev.missedExams.map((exam, i) =>
        i === index ? { ...exam, [field]: value } : exam
      ),
    }));
    setFormErrors((prev) => ({ ...prev, compassionateAegrotat: '' }));
  };

  // Handle file input changes
  const handleFileChange = (setForm, field, file) => {
    setForm((prev) => ({ ...prev, [field]: file }));
    setFormErrors((prev) => ({ ...prev, reconsideration: '', compassionateAegrotat: '', completionProgramme: '' }));
  };

  // Handle date changes
  const handleDateChange = (setForm, field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setFormErrors((prev) => ({ ...prev, reconsideration: '', compassionateAegrotat: '', completionProgramme: '' }));
  };

  // Handle missed exam date changes
  const handleMissedExamDateChange = (index, value) => {
    setCompassionateAegrotat((prev) => ({
      ...prev,
      missedExams: prev.missedExams.map((exam, i) =>
        i === index ? { ...exam, examDate: value } : exam
      ),
    }));
    setFormErrors((prev) => ({ ...prev, compassionateAegrotat: '' }));
  };

  // Handle signature save
  const handleSignatureSave = () => {
    if (sigCanvasRef.current && !sigCanvasRef.current.isEmpty()) {
      const signatureData = sigCanvasRef.current.getTrimmedCanvas().toDataURL('image/png');
      if (selectedForm === 'compassionateAegrotat') {
        setCompassionateAegrotat((prev) => ({ ...prev, applicantSignature: signatureData }));
      } else if (selectedForm === 'completionProgramme') {
        setCompletionProgramme((prev) => ({ ...prev, applicantSignature: signatureData }));
      }
    }
  };

  // Handle signature clear
  const handleSignatureClear = () => {
    if (sigCanvasRef.current) {
      sigCanvasRef.current.clear();
      if (selectedForm === 'compassionateAegrotat') {
        setCompassionateAegrotat((prev) => ({ ...prev, applicantSignature: '' }));
      } else if (selectedForm === 'completionProgramme') {
        setCompletionProgramme((prev) => ({ ...prev, applicantSignature: '' }));
      }
    }
  };

  // Handle form submissions
  const handleSubmit = async (formData, formName, setForm, resetData) => {
    if (!studentId) {
      setFormErrors((prev) => ({ ...prev, [formName]: 'User not authenticated. Please login.' }));
      return;
    }

    const error = validateForm(formData, formName);
    if (error) {
      setFormErrors((prev) => ({ ...prev, [formName]: error }));
      return;
    }

    setSubmissionStatus((prev) => ({ ...prev, [formName]: 'submitting' }));
    try {
      if (formName === 'reconsideration') {
        // Prepare FormData for file upload
        const formDataToSubmit = new FormData();
        formDataToSubmit.append('studentId', studentId);
        formDataToSubmit.append('fullName', formData.fullName);
        formDataToSubmit.append('postalAddress', formData.postalAddress);
        formDataToSubmit.append('dateOfBirth', formData.dateOfBirth ? formData.dateOfBirth.format('YYYY-MM-DD') : '');
        formDataToSubmit.append('telephone', formData.telephone);
        formDataToSubmit.append('email', formData.email);
        formDataToSubmit.append('sponsorship', formData.sponsorship);
        formDataToSubmit.append('courseCode', formData.courseCode);
        formDataToSubmit.append('courseTitle', formData.courseTitle);
        formDataToSubmit.append('receiptNo', formData.receiptNo);
        if (formData.paymentConfirmation) {
          formDataToSubmit.append('paymentConfirmation', formData.paymentConfirmation);
        }

        await createGradeRecheckRequest(formDataToSubmit);
      } else {
        // Mock submission for unsupported forms
        const formDataToSubmit = {
          ...formData,
          studentId,
          dateOfBirth: formData.dateOfBirth ? formData.dateOfBirth.format('YYYY-MM-DD') : null,
          year: formData.year ? formData.year.format('YYYY') : null,
          date: formData.date ? formData.date.format('YYYY-MM-DD') : null,
          paymentConfirmation: formData.paymentConfirmation?.name || null,
          supportingDocuments: formData.supportingDocuments?.name || null,
        };
        if (formName === 'compassionateAegrotat') {
          formDataToSubmit.missedExams = formData.missedExams.map((exam) => ({
            ...exam,
            examDate: exam.examDate ? exam.examDate.format('YYYY-MM-DD') : null,
          }));
        }
        await handleMockFormSubmit(formDataToSubmit, formName);
      }

      setSubmissionStatus((prev) => ({ ...prev, [formName]: 'success' }));
      setForm(resetData);
      if ((formName === 'compassionateAegrotat' || formName === 'completionProgramme') && sigCanvasRef.current) {
        sigCanvasRef.current.clear();
      }
      setTimeout(() => {
        setSubmissionStatus((prev) => ({ ...prev, [formName]: null }));
        setSelectedForm(null);
      }, 3000);
    } catch (error) {
      console.error(`Error submitting ${formName}:`, error);
      setSubmissionStatus((prev) => ({ ...prev, [formName]: 'error' }));
      setFormErrors((prev) => ({
        ...prev,
        [formName]: error.response?.data?.message || `Failed to submit ${formName}. Please try again.`,
      }));
    }
  };

  // Form reset data
  const resetData = {
    reconsideration: {
      studentId: '',
      fullName: '',
      postalAddress: '',
      dateOfBirth: null,
      telephone: '',
      email: '',
      sponsorship: 'Private',
      courseCode: '',
      courseTitle: '',
      receiptNo: '',
      paymentConfirmation: null,
    },
    compassionateAegrotat: {
      studentId: '',
      fullName: '',
      email: '',
      campus: '',
      telephone: '',
      postalAddress: '',
      semester: '',
      year: null,
      missedExams: [
        { courseCode: '', examDate: null, examStartTime: '', applyingFor: '' },
        { courseCode: '', examDate: null, examStartTime: '', applyingFor: '' },
        { courseCode: '', examDate: null, examStartTime: '', applyingFor: '' },
        { courseCode: '', examDate: null, examStartTime: '', applyingFor: '' },
      ],
      reason: '',
      supportingDocuments: null,
      applicantSignature: '',
      date: null,
    },
    completionProgramme: {
      studentId: '',
      fullName: '',
      email: '',
      telephone: '',
      dateOfBirth: null,
      postalAddress: '',
      programme: '',
      declarationAgreed: false,
      applicantSignature: '',
      date: null,
    },
  };

  // Form configurations
  const forms = [
    {
      name: 'reconsideration',
      title: 'Application for Reconsideration of Course Grade',
      state: reconsideration,
      setState: setReconsideration,
      sections: [
        {
          title: 'Personal Details',
          fields: [
            { label: 'Student ID', name: 'studentId', type: 'text', grid: { xs: 12, sm: 6 } },
            { label: 'Full Name', name: 'fullName', type: 'text', grid: { xs: 12, sm: 6 } },
            { label: 'Postal Address', name: 'postalAddress', type: 'text', multiline: true, rows: 3, grid: { xs: 12 } },
            { label: 'Date of Birth', name: 'dateOfBirth', type: 'date', grid: { xs: 12, sm: 6 } },
            { label: 'Telephone', name: 'telephone', type: 'phone', grid: { xs: 12, sm: 6 } },
            { label: 'Email', name: 'email', type: 'email', grid: { xs: 12 } },
            {
              label: 'Are you a sponsored or private student?',
              name: 'sponsorship',
              type: 'radio',
              options: ['Private', 'Sponsored'],
              grid: { xs: 12 },
            },
          ],
        },
        {
          title: 'Request Details',
          fields: [
            { label: 'Course Code', name: 'courseCode', type: 'text', grid: { xs: 12, sm: 6 } },
            { label: 'Course Title', name: 'courseTitle', type: 'text', grid: { xs: 12 } },
            { label: 'Receipt No.', name: 'receiptNo', type: 'text', grid: { xs: 12, sm: 6 } },
            { label: 'Payment Confirmation Upload', name: 'paymentConfirmation', type: 'file', grid: { xs: 12 } },
          ],
        },
      ],
    },
    {
      name: 'compassionateAegrotat',
      title: 'Application for Compassionate/Aegrotat Pass/Special Exam',
      state: compassionateAegrotat,
      setState: setCompassionateAegrotat,
      sections: [
        {
          title: 'Personal Details',
          fields: [
            { label: 'Student ID', name: 'studentId', type: 'text', grid: { xs: 12, sm: 6 } },
            { label: 'Full Name', name: 'fullName', type: 'text', grid: { xs: 12, sm: 6 } },
            { label: 'Email', name: 'email', type: 'email', grid: { xs: 12, sm: 6 } },
            { label: 'Campus', name: 'campus', type: 'text', grid: { xs: 12, sm: 6 } },
            { label: 'Telephone', name: 'telephone', type: 'phone', grid: { xs: 12, sm: 6 } },
            { label: 'Postal Address', name: 'postalAddress', type: 'text', multiline: true, rows: 3, grid: { xs: 12 } },
            {
              label: 'Semester/Trimester',
              name: 'semester',
              type: 'select',
              options: ['Semester 1', 'Semester 2', 'Trimester 1', 'Trimester 2', 'Trimester 3'],
              grid: { xs: 12, sm: 6 },
            },
            { label: 'Year', name: 'year', type: 'year', grid: { xs: 12, sm: 6 } },
          ],
        },
        {
          title: 'Missed Exam Details',
          fields: [
            {
              type: 'missedExam',
              sets: [
                { number: 1, grid: { xs: 12 } },
                { number: 2, grid: { xs: 12 } },
                { number: 3, grid: { xs: 12 } },
                { number: 4, grid: { xs: 12 } },
              ],
            },
          ],
        },
        {
          title: 'Application Details',
          note: (
            <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
              <strong>Supporting Certified Documents</strong><br />
              Aegrotat Pass (attach a USP approved medical certificate)<br />
              Compassionate Pass (attach a certified copy of the death certificate or letter from employer)<br />
              Special Examination (attach relevant documentation)
            </Typography>
          ),
          fields: [
            {
              label: 'Please state below your reasons for making this application and attach all necessary documents.',
              name: 'reason',
              type: 'text',
              multiline: true,
              rows: 4,
              grid: { xs: 12 },
            },
            { label: 'Attach Supporting Documents', name: 'supportingDocuments', type: 'file', grid: { xs: 12 } },
            { label: 'Applicant’s Signature', name: 'applicantSignature', type: 'signature', grid: { xs: 12 } },
            { label: 'Date', name: 'date', type: 'date', grid: { xs: 12, sm: 6 } },
          ],
        },
      ],
    },
    {
      name: 'completionProgramme',
      title: 'Application for Completion of Programme',
      state: completionProgramme,
      setState: setCompletionProgramme,
      sections: [
        {
          title: 'Personal Details',
          note: (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Note: For Preliminary Certificate, students enrolled from 2018 onwards are eligible.
              </Typography>
              <Typography variant="body2" sx={{ color: 'error.main', mt: 1 }}>
                Laucala Campus: Applications for this ceremony is open and will close on 30th June 2025<br />
                Solomon Islands Campus: Applications for this ceremony is open and will close on 4th of July 2025<br />
                Tonga Campus: Applications for this ceremony is open and will close on 1st of August 2025
              </Typography>
            </Box>
          ),
          fields: [
            { label: 'Student ID Number', name: 'studentId', type: 'text', grid: { xs: 12, sm: 6 } },
            { label: 'Name', name: 'fullName', type: 'text', grid: { xs: 12, sm: 6 } },
            { label: 'Email', name: 'email', type: 'email', grid: { xs: 12, sm: 6 } },
            { label: 'Telephone', name: 'telephone', type: 'phone', grid: { xs: 12, sm: 6 } },
            { label: 'Date of Birth', name: 'dateOfBirth', type: 'date', grid: { xs: 12, sm: 6 } },
            { label: 'Postal Address', name: 'postalAddress', type: 'text', multiline: true, rows: 3, grid: { xs: 12 } },
            {
              label: 'Programme',
              name: 'programme',
              type: 'select',
              options: ['Pacific TAFE', 'Undergraduate', 'Postgraduate'],
              grid: { xs: 12, sm: 6 },
            },
          ],
        },
        {
          title: 'Declaration',
          note: (
            <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
              I certify that the particulars in this form are correct, I have read the notes above, and I will abide by the rules set out in the Statutes, Ordinances Regulations and the Charter of the University of the South Pacific.
            </Typography>
          ),
          fields: [
            {
              label: 'I have read the above information',
              name: 'declarationAgreed',
              type: 'checkbox',
              grid: { xs: 12 },
            },
            { label: 'Student’s Signature', name: 'applicantSignature', type: 'signature', grid: { xs: 12 } },
            { label: 'Date', name: 'date', type: 'date', grid: { xs: 12, sm: 6 } },
          ],
        },
      ],
    },
  ];

  // Render form
  const renderForm = (form) => (
    <Card elevation={3} sx={{ borderRadius: '20px', mb: 4, background: 'linear-gradient(135deg, #ffffff 0%, #f5f7fa 100%)' }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => setSelectedForm(null)}
            sx={{ mr: 2, color: '#094c50' }}
          >
            Back
          </Button>
          <Typography variant="h4" sx={{ color: '#000000', fontWeight: 'medium' }}>
            {form.title}
          </Typography>
        </Box>
        <Box component="form" noValidate>
          <Grid container spacing={2}>
            {form.sections.map((section, index) => (
              <Grid item xs={12} key={section.title}>
                <Typography variant="h6" sx={{ mb: 2, color: '#094c50' }}>
                  {section.title}
                </Typography>
                {section.note && section.note}
                {section.fields.map((field, fieldIndex) => (
                  <Grid item {...(field.grid || { xs: 12 })} key={field.name || `field-${fieldIndex}`} sx={{ mb: 2 }}>
                    {field.type === 'select' ? (
                      <FormControl fullWidth error={!!formErrors[form.name]}>
                        <InputLabel>{field.label}</InputLabel>
                        <Select
                          value={form.state[field.name]}
                          onChange={(e) => handleInputChange(form.setState, field.name, e.target.value)}
                          required
                        >
                          {field.options.map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    ) : field.type === 'file' ? (
                      <Box>
                        <Typography variant="body2" sx={{ mb: 1, color: formErrors[form.name] ? 'error.main' : 'text.secondary' }}>
                          {field.label}
                        </Typography>
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileChange(form.setState, field.name, e.target.files[0])}
                          style={{ width: '100%' }}
                        />
                        {form.state[field.name] && (
                          <Typography variant="caption" sx={{ mt: 1, color: 'text.secondary' }}>
                            Selected: {form.state[field.name].name}
                          </Typography>
                        )}
                      </Box>
                    ) : field.type === 'date' || field.type === 'year' ? (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label={field.label}
                          value={form.state[field.name]}
                          onChange={(value) => handleDateChange(form.setState, field.name, value)}
                          views={field.type === 'year' ? ['year'] : ['year', 'month', 'day']}
                          renderInput={(params) => (
                            <TextField {...params} fullWidth required error={!!formErrors[form.name]} />
                          )}
                        />
                      </LocalizationProvider>
                    ) : field.type === 'radio' ? (
                      <FormControl component="fieldset" error={!!formErrors[form.name]}>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                          {field.label}
                        </Typography>
                        <RadioGroup
                          value={form.state[field.name]}
                          onChange={(e) => handleInputChange(form.setState, field.name, e.target.value)}
                        >
                          {field.options.map((option) => (
                            <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
                          ))}
                        </RadioGroup>
                      </FormControl>
                    ) : field.type === 'phone' ? (
                      <PhoneInput
                        international
                        defaultCountry="FJ"
                        value={form.state[field.name]}
                        onChange={(value) => handleInputChange(form.setState, field.name, value || '')}
                        placeholder={field.label}
                        style={{
                          border: formErrors[form.name] ? '1px solid #d32f2f' : '1px solid #c4c4c4',
                          borderRadius: '4px',
                          padding: '8px',
                          width: '100%',
                        }}
                      />
                    ) : field.type === 'signature' ? (
                      <Box>
                        <Typography variant="body2" sx={{ mb: 1, color: formErrors[form.name] ? 'error.main' : 'text.secondary' }}>
                          {field.label}
                        </Typography>
                        <SignatureCanvas
                          ref={sigCanvasRef}
                          canvasProps={{
                            style: { border: '1px solid #c4c4c4', width: '100%', height: '150px' },
                          }}
                        />
                        <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                          <Button
                            variant="outlined"
                            onClick={handleSignatureClear}
                            sx={{ color: '#094c50', borderColor: '#094c50' }}
                          >
                            Clear
                          </Button>
                          <Button
                            variant="contained"
                            onClick={handleSignatureSave}
                            sx={{ backgroundColor: '#094c50', '&:hover': { backgroundColor: '#073a3e' } }}
                          >
                            Save
                          </Button>
                        </Box>
                        {form.state[field.name] && (
                          <Typography variant="caption" sx={{ mt: 1, color: 'text.secondary' }}>
                            Signature saved
                          </Typography>
                        )}
                      </Box>
                    ) : field.type === 'checkbox' ? (
                      <FormControl error={!!formErrors[form.name]}>
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={form.state[field.name]}
                                onChange={(e) => handleInputChange(form.setState, field.name, e.target.checked)}
                              />
                            }
                            label={field.label}
                          />
                        </FormGroup>
                      </FormControl>
                    ) : field.type === 'missedExam' ? (
                      <Box>
                        {field.sets.map((set) => (
                          <Grid container spacing={1} key={`missed-exam-${set.number}`} sx={{ mb: 2 }}>
                            <Grid item xs={12}>
                              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                                Missed Exam {set.number}
                              </Typography>
                            </Grid>
                            <Grid item xs={3}>
                              <TextField
                                fullWidth
                                label="Course Code"
                                value={form.state.missedExams[set.number - 1].courseCode}
                                onChange={(e) => handleMissedExamChange(set.number - 1, 'courseCode', e.target.value)}
                                error={!!formErrors[form.name]}
                                required
                              />
                            </Grid>
                            <Grid item xs={3}>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                  label="Exam Date"
                                  value={form.state.missedExams[set.number - 1].examDate}
                                  onChange={(value) => handleMissedExamDateChange(set.number - 1, value)}
                                  renderInput={(params) => (
                                    <TextField {...params} fullWidth required error={!!formErrors[form.name]} />
                                  )}
                                />
                              </LocalizationProvider>
                            </Grid>
                            <Grid item xs={3}>
                              <TextField
                                fullWidth
                                label="Exam Start Time"
                                type="time"
                                value={form.state.missedExams[set.number - 1].examStartTime}
                                onChange={(e) => handleMissedExamChange(set.number - 1, 'examStartTime', e.target.value)}
                                InputLabelProps={{ shrink: true }}
                                error={!!formErrors[form.name]}
                                required
                              />
                            </Grid>
                            <Grid item xs={3}>
                              <FormControl fullWidth error={!!formErrors[form.name]}>
                                <InputLabel>Applying For</InputLabel>
                                <Select
                                  value={form.state.missedExams[set.number - 1].applyingFor}
                                  onChange={(e) => handleMissedExamChange(set.number - 1, 'applyingFor', e.target.value)}
                                  required
                                >
                                  {['Aegrotat Pass', 'Compassionate Pass', 'Special Exam'].map((option) => (
                                    <MenuItem key={option} value={option}>
                                      {option}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>
                          </Grid>
                        ))}
                      </Box>
                    ) : (
                      <TextField
                        fullWidth
                        label={field.label}
                        type={field.type}
                        value={form.state[field.name]}
                        onChange={(e) => handleInputChange(form.setState, field.name, e.target.value)}
                        required
                        error={!!formErrors[form.name]}
                        multiline={field.multiline || false}
                        rows={field.rows || 1}
                      />
                    )}
                  </Grid>
                ))}
                {index < form.sections.length - 1 && <Grid item xs={12}><Divider sx={{ my: 2 }} /></Grid>}
              </Grid>
            ))}
            <Grid item xs={12}>
              {formErrors[form.name] && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {formErrors[form.name]}
                </Alert>
              )}
              <Button
                variant="contained"
                sx={{ backgroundColor: '#094c50', '&:hover': { backgroundColor: '#073a3e' } }}
                onClick={() => handleSubmit(form.state, form.name, form.setState, resetData[form.name])}
                disabled={submissionStatus[form.name] === 'submitting'}
              >
                {submissionStatus[form.name] === 'submitting' ? 'Submitting...' : 'Submit'}
              </Button>
              {submissionStatus[form.name] === 'success' && (
                <Typography sx={{ mt: 2, color: (theme) => theme.palette.success.main }}>
                  {form.title} submitted successfully!
                </Typography>
              )}
              {submissionStatus[form.name] === 'error' && (
                <Typography sx={{ mt: 2, color: (theme) => theme.palette.error.main }}>
                  {formErrors[form.name]}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );

  if (loading || authError) {
    return (
      <DashboardLayout>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          {authError ? (
            <Alert severity="error" sx={{ mb: 3 }}>
              {authError}
            </Alert>
          ) : (
            <CircularProgress />
          )}
        </Box>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TitleBar title="Student Forms" />
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
                    }}
                    onClick={() => setSelectedForm(form.name)}
                  >
                    <CardContent sx={{ p: 3, display: 'flex', alignItems: 'center' }}>
                      <DescriptionTwoToneIcon sx={{ fontSize: 48, color: '#094c50', mr: 2 }} />
                      <Typography
                        variant="h6"
                        sx={{ color: '#000000', fontWeight: 'medium', textAlign: 'left' }}
                      >
                        {form.title}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            renderForm(forms.find((form) => form.name === selectedForm))
          )}
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default FormsPage;