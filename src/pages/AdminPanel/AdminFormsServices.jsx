import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
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
  InputLabel,
} from '@mui/material';
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
import TitleBar from '../../components/Titlebar/Titlebar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Mock data for form submissions
const mockSubmissions = {
  gradeRecheck: [
    {
      id: 1,
      studentId: 'S12345',
      studentEmail: 'student1@example.com',
      courseCode: 'CS111',
      semester: 'Semester 1',
      year: '2024',
      reason: 'Discrepancy in final exam score',
      currentGrade: 'B',
      emailStatus: 'sent',
    },
    {
      id: 2,
      studentId: 'S67890',
      studentEmail: 'student2@example.com',
      courseCode: 'CS215',
      semester: 'Semester 2',
      year: '2024',
      reason: 'Believe marking error in assignment',
      currentGrade: 'C',
      emailStatus: 'failed',
    },
  ],
  graduation: [
    {
      id: 1,
      studentId: 'S12345',
      studentEmail: 'student1@example.com',
      programCode: 'BNS',
      expectedGraduationDate: '2025-12-15',
      contactEmail: 'student1@example.com',
      emailStatus: 'sent',
    },
  ],
  resitPaper: [
    {
      id: 1,
      studentId: 'S67890',
      studentEmail: 'student2@example.com',
      courseCode: 'CS215',
      semester: 'Semester 2',
      year: '2024',
      justification: 'Missed exam due to medical reasons',
      emailStatus: 'failed',
    },
  ],
};

// Mock API functions
const updateGrade = async (submissionId, newGrade) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Updated grade for submission ${submissionId} to ${newGrade}`);
      resolve({ success: true });
    }, 1000);
  });
};

const sendEmail = async (submissionId, formName, studentEmail) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate 10% chance of email failure
      if (Math.random() < 0.1) {
        reject(new Error(`Failed to send email for ${formName} to ${studentEmail}`));
      } else {
        console.log(`Email sent for ${formName} to ${studentEmail}`);
        resolve({ success: true });
      }
    }, 1000);
  });
};

const AdminFormsServices = () => {
  // State for selected form type (null for card view, or form name)
  const [selectedForm, setSelectedForm] = useState(null);

  // State for submissions
  const [submissions, setSubmissions] = useState(mockSubmissions);

  // State for grade update form
  const [gradeUpdate, setGradeUpdate] = useState({
    submissionId: null,
    newGrade: '',
  });

  // State for form errors
  const [formErrors, setFormErrors] = useState({
    gradeUpdate: '',
  });

  // State for submission status (for grade updates and email sending)
  const [submissionStatus, setSubmissionStatus] = useState({
    gradeUpdate: null,
    email: {},
  });

  // Simulate fetching submissions and sending auto emails on mount
  useEffect(() => {
    // Simulate auto email sending for new submissions
    const sendAutoEmails = async () => {
      const updatedSubmissions = { ...submissions };
      for (const formName of ['graduation', 'resitPaper']) {
        for (const submission of updatedSubmissions[formName]) {
          if (submission.emailStatus === 'pending') {
            try {
              await sendEmail(submission.id, formName, submission.studentEmail);
              submission.emailStatus = 'sent';
            } catch (error) {
              submission.emailStatus = 'failed';
            }
          }
        }
      }
      setSubmissions(updatedSubmissions);
    };
    sendAutoEmails();
  }, []);

  // Handle grade update input
  const handleGradeChange = (value) => {
    setGradeUpdate((prev) => ({ ...prev, newGrade: value }));
    setFormErrors((prev) => ({ ...prev, gradeUpdate: '' }));
  };

  // Handle grade update submission
  const handleGradeSubmit = async (submissionId) => {
    if (!gradeUpdate.newGrade) {
      setFormErrors((prev) => ({ ...prev, gradeUpdate: 'Please select a new grade.' }));
      return;
    }
    setSubmissionStatus((prev) => ({ ...prev, gradeUpdate: 'submitting' }));
    try {
      await updateGrade(submissionId, gradeUpdate.newGrade);
      setSubmissions((prev) => ({
        ...prev,
        gradeRecheck: prev.gradeRecheck.map((sub) =>
          sub.id === submissionId ? { ...sub, currentGrade: gradeUpdate.newGrade } : sub
        ),
      }));
      setSubmissionStatus((prev) => ({ ...prev, gradeUpdate: 'success' }));
      setGradeUpdate({ submissionId: null, newGrade: '' });
      setTimeout(() => {
        setSubmissionStatus((prev) => ({ ...prev, gradeUpdate: null }));
      }, 3000);
    } catch (error) {
      setSubmissionStatus((prev) => ({ ...prev, gradeUpdate: 'error' }));
      setFormErrors((prev) => ({ ...prev, gradeUpdate: 'Error updating grade. Please try again.' }));
    }
  };

  // Handle email resend
  const handleEmailResend = async (submissionId, formName, studentEmail) => {
    setSubmissionStatus((prev) => ({
      ...prev,
      email: { ...prev.email, [submissionId]: 'sending' },
    }));
    try {
      await sendEmail(submissionId, formName, studentEmail);
      setSubmissions((prev) => ({
        ...prev,
        [formName]: prev[formName].map((sub) =>
          sub.id === submissionId ? { ...sub, emailStatus: 'sent' } : sub
        ),
      }));
      setSubmissionStatus((prev) => ({
        ...prev,
        email: { ...prev.email, [submissionId]: 'success' },
      }));
      setTimeout(() => {
        setSubmissionStatus((prev) => ({
          ...prev,
          email: { ...prev.email, [submissionId]: null },
        }));
      }, 3000);
    } catch (error) {
      setSubmissionStatus((prev) => ({
        ...prev,
        email: { ...prev.email, [submissionId]: 'error' },
      }));
    }
  };

  // Form configurations for display
  const forms = [
    {
      name: 'gradeRecheck',
      title: 'Grade Recheck Requests',
      columns: [
        'Student ID',
        'Course Code',
        'Semester',
        'Year',
        'Reason',
        'Current Grade',
        'Update Grade',
        'Email Status',
        'Action',
      ],
    },
    {
      name: 'graduation',
      title: 'Graduation Applications',
      columns: ['Student ID', 'Program Code', 'Expected Graduation Date', 'Contact Email', 'Email Status', 'Action'],
    },
    {
      name: 'resitPaper',
      title: 'Re-sit Paper Requests',
      columns: ['Student ID', 'Course Code', 'Semester', 'Year', 'Justification', 'Email Status', 'Action'],
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
              setGradeUpdate({ submissionId: null, newGrade: '' });
            }}
            sx={{ mr: 2, color: '#094c50' }}
          >
            Back
          </Button>
          <Typography variant="h5" sx={{ color: '#000000', fontWeight: 'medium' }}>
            {form.title}
          </Typography>
        </Box>
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
              {submissions[form.name].map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell>{submission.studentId}</TableCell>
                  {form.name === 'gradeRecheck' && (
                    <>
                      <TableCell>{submission.courseCode}</TableCell>
                      <TableCell>{submission.semester}</TableCell>
                      <TableCell>{submission.year}</TableCell>
                      <TableCell>{submission.reason}</TableCell>
                      <TableCell>{submission.currentGrade}</TableCell>
                      <TableCell>
                        {gradeUpdate.submissionId === submission.id ? (
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <FormControl sx={{ minWidth: 100, mr: 1 }}>
                              <Select
                                value={gradeUpdate.newGrade}
                                onChange={(e) => handleGradeChange(e.target.value)}
                                displayEmpty
                              >
                                <MenuItem value="" disabled>
                                  Select Grade
                                </MenuItem>
                                {['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F'].map((grade) => (
                                  <MenuItem key={grade} value={grade}>
                                    {grade}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                            <Button
                              variant="contained"
                              sx={{ backgroundColor: '#094c50', '&:hover': { backgroundColor: '#073a3e' } }}
                              onClick={() => handleGradeSubmit(submission.id)}
                              disabled={submissionStatus.gradeUpdate === 'submitting'}
                            >
                              {submissionStatus.gradeUpdate === 'submitting' ? 'Saving...' : 'Save'}
                            </Button>
                          </Box>
                        ) : (
                          <Button
                            variant="outlined"
                            sx={{ color: '#094c50', borderColor: '#094c50' }}
                            onClick={() => setGradeUpdate({ submissionId: submission.id, newGrade: '' })}
                          >
                            Update
                          </Button>
                        )}
                        {submissionStatus.gradeUpdate === 'success' && gradeUpdate.submissionId === submission.id && (
                          <Typography sx={{ color: (theme) => theme.palette.success.main, mt: 1 }}>
                            Grade updated successfully!
                          </Typography>
                        )}
                        {submissionStatus.gradeUpdate === 'error' && gradeUpdate.submissionId === submission.id && (
                          <Typography sx={{ color: (theme) => theme.palette.error.main, mt: 1 }}>
                            {formErrors.gradeUpdate}
                          </Typography>
                        )}
                      </TableCell>
                    </>
                  )}
                  {form.name === 'graduation' && (
                    <>
                      <TableCell>{submission.programCode}</TableCell>
                      <TableCell>{submission.expectedGraduationDate}</TableCell>
                      <TableCell>{submission.contactEmail}</TableCell>
                    </>
                  )}
                  {form.name === 'resitPaper' && (
                    <>
                      <TableCell>{submission.courseCode}</TableCell>
                      <TableCell>{submission.semester}</TableCell>
                      <TableCell>{submission.year}</TableCell>
                      <TableCell>{submission.justification}</TableCell>
                    </>
                  )}
                  <TableCell>
                    {submission.emailStatus === 'sent' ? (
                      <Typography sx={{ color: (theme) => theme.palette.success.main }}>Sent</Typography>
                    ) : submission.emailStatus === 'failed' ? (
                      <Typography sx={{ color: (theme) => theme.palette.error.main }}>Failed</Typography>
                    ) : (
                      'Pending'
                    )}
                  </TableCell>
                  <TableCell>
                    {submission.emailStatus === 'failed' && (
                      <Button
                        variant="contained"
                        sx={{ backgroundColor: '#094c50', '&:hover': { backgroundColor: '#073a3e' } }}
                        onClick={() => handleEmailResend(submission.id, form.name, submission.studentEmail)}
                        disabled={submissionStatus.email[submission.id] === 'sending'}
                      >
                        {submissionStatus.email[submission.id] === 'sending' ? 'Sending...' : 'Send Again'}
                      </Button>
                    )}
                    {submissionStatus.email[submission.id] === 'success' && (
                      <Typography sx={{ color: (theme) => theme.palette.success.main, mt: 1 }}>
                        Email sent successfully!
                      </Typography>
                    )}
                    {submissionStatus.email[submission.id] === 'error' && (
                      <Typography sx={{ color: (theme) => theme.palette.error.main, mt: 1 }}>
                        Error sending email. Please try again.
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );

  return (
    <DashboardLayout>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {/* Header */}
          <TitleBar title="Admin Forms Services" />

          {/* Card View or Selected Form */}
          {!selectedForm ? (
            <Grid container spacing={2}>
              {forms.map((form) => (
                <Grid item xs={12} sm={6} md={4} key={form.name}>
                  <Card
                    elevation={3}
                    sx={{
                      borderRadius: '20px',
                      background: 'linear-gradient(135deg, #ffffff 0%, #f5f7fa 100%)',
                      cursor: 'pointer',
                      '&:hover': { background: 'linear-gradient(135deg, #f5f7fa 0%, #e0e4ea 100%)' },
                    }}
                    onClick={() => setSelectedForm(form.name)}
                  >
                    <CardContent sx={{ p: 3, textAlign: 'center' }}>
                      <Typography variant="h6" sx={{ color: '#000000', fontWeight: 'medium' }}>
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

export default AdminFormsServices;