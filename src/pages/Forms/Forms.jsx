import React, { useState } from 'react';
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
} from '@mui/material';
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
import TitleBar from '../../components/Titlebar/Titlebar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Mock submission handler with simulated error
const handleFormSubmit = async (formData, formName) => {
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
  // State for selected form (null for card view, or form name)
  const [selectedForm, setSelectedForm] = useState(null);

  // State for Grade Recheck Form
  const [gradeRecheck, setGradeRecheck] = useState({
    courseCode: '',
    semester: '',
    year: '',
    reason: '',
  });

  // State for Apply for Graduation Form
  const [graduation, setGraduation] = useState({
    programCode: '',
    expectedGraduationDate: '',
    contactEmail: '',
  });

  // State for Re-sit Paper Form
  const [resitPaper, setResitPaper] = useState({
    courseCode: '',
    semester: '',
    year: '',
    justification: '',
  });

  // State for form submission status
  const [submissionStatus, setSubmissionStatus] = useState({
    gradeRecheck: null,
    graduation: null,
    resitPaper: null,
  });

  // State for form errors
  const [formErrors, setFormErrors] = useState({
    gradeRecheck: '',
    graduation: '',
    resitPaper: '',
  });

  // Validate form data
  const validateForm = (formData, formName) => {
    const fields = Object.values(formData);
    if (fields.some((field) => !field)) {
      return `All fields are required for ${formName} form.`;
    }
    if (formName === 'graduation' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      return 'Please enter a valid email address.';
    }
    if (['gradeRecheck', 'resitPaper'].includes(formName) && !/^\d{4}$/.test(formData.year)) {
      return 'Year must be a 4-digit number.';
    }
    return '';
  };

  // Handle input changes
  const handleInputChange = (setForm, field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    setFormErrors((prev) => ({ ...prev, gradeRecheck: '', graduation: '', resitPaper: '' }));
  };

  // Handle form submissions
  const handleSubmit = async (formData, formName, setForm, resetData) => {
    const error = validateForm(formData, formName);
    if (error) {
      setFormErrors((prev) => ({ ...prev, [formName]: error }));
      return;
    }
    setSubmissionStatus((prev) => ({ ...prev, [formName]: 'submitting' }));
    try {
      await handleFormSubmit(formData, formName);
      setSubmissionStatus((prev) => ({ ...prev, [formName]: 'success' }));
      setForm(resetData); // Reset form
      setTimeout(() => {
        setSubmissionStatus((prev) => ({ ...prev, [formName]: null }));
        setSelectedForm(null); // Return to card view after success
      }, 3000); // Clear success message and return to cards after 3 seconds
    } catch (error) {
      setSubmissionStatus((prev) => ({ ...prev, [formName]: 'error' }));
      setFormErrors((prev) => ({ ...prev, [formName]: error.message }));
    }
  };

  // Form reset data
  const resetData = {
    gradeRecheck: { courseCode: '', semester: '', year: '', reason: '' },
    graduation: { programCode: '', expectedGraduationDate: '', contactEmail: '' },
    resitPaper: { courseCode: '', semester: '', year: '', justification: '' },
  };

  // Form configurations
  const forms = [
    {
      name: 'gradeRecheck',
      title: 'Grade Recheck Request',
      state: gradeRecheck,
      setState: setGradeRecheck,
      fields: [
        {
          label: 'Course Code',
          name: 'courseCode',
          type: 'text',
          grid: { xs: 12, sm: 6 },
        },
        {
          label: 'Semester',
          name: 'semester',
          type: 'select',
          options: ['Semester 1', 'Semester 2'],
          grid: { xs: 12, sm: 3 },
        },
        {
          label: 'Year',
          name: 'year',
          type: 'number',
          grid: { xs: 12, sm: 3 },
        },
        {
          label: 'Reason for Recheck',
          name: 'reason',
          type: 'text',
          multiline: true,
          rows: 4,
          grid: { xs: 12 },
        },
      ],
    },
    {
      name: 'graduation',
      title: 'Apply for Graduation',
      state: graduation,
      setState: setGraduation,
      fields: [
        {
          label: 'Program Code',
          name: 'programCode',
          type: 'text',
          grid: { xs: 12, sm: 6 },
        },
        {
          label: 'Expected Graduation Date',
          name: 'expectedGraduationDate',
          type: 'date',
          grid: { xs: 12, sm: 6 },
          InputLabelProps: { shrink: true },
        },
        {
          label: 'Contact Email',
          name: 'contactEmail',
          type: 'email',
          grid: { xs: 12 },
        },
      ],
    },
    {
      name: 'resitPaper',
      title: 'Re-sit Paper Request',
      state: resitPaper,
      setState: setResitPaper,
      fields: [
        {
          label: 'Course Code',
          name: 'courseCode',
          type: 'text',
          grid: { xs: 12, sm: 6 },
        },
        {
          label: 'Semester',
          name: 'semester',
          type: 'select',
          options: ['Semester 1', 'Semester 2'],
          grid: { xs: 12, sm: 3 },
        },
        {
          label: 'Year',
          name: 'year',
          type: 'number',
          grid: { xs: 12, sm: 3 },
        },
        {
          label: 'Justification for Re-sit',
          name: 'justification',
          type: 'text',
          multiline: true,
          rows: 4,
          grid: { xs: 12 },
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
          <Typography variant="h5" sx={{ color: '#000000', fontWeight: 'medium' }}>
            {form.title}
          </Typography>
        </Box>
        <Box component="form" noValidate>
          <Grid container spacing={2}>
            {form.fields.map((field) => (
              <Grid item {...field.grid} key={field.name}>
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
                    InputLabelProps={field.InputLabelProps || {}}
                  />
                )}
              </Grid>
            ))}
            <Grid item xs={12}>
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
                  {formErrors[form.name] || `Error submitting ${form.title}. Please try again.`}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <DashboardLayout>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {/* Header */}
          <TitleBar title="Student Forms" />

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
            renderForm(forms.find((form) => form.name === selectedForm))
          )}
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default FormsPage;