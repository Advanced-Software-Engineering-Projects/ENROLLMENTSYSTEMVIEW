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
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';

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

  // State for Reconsideration of Course Grade Form
  const [reconsideration, setReconsideration] = useState({
    studentId: '',
    name: '',
    address: '',
    courseCode: '',
    year: '',
    semester: '',
    reason: '',
    paymentReceipt: null,
  });

  // State for Compassionate/Aegrotat Pass/Special Exam Form
  const [compassionateAegrotat, setCompassionateAegrotat] = useState({
    studentId: '',
    name: '',
    address: '',
    courseCode: '',
    year: '',
    semester: '',
    applicationType: '',
    reason: '',
    supportingDocuments: null,
  });

  // State for form submission status
  const [submissionStatus, setSubmissionStatus] = useState({
    reconsideration: null,
    compassionateAegrotat: null,
  });

  // State for form errors
  const [formErrors, setFormErrors] = useState({
    reconsideration: '',
    compassionateAegrotat: '',
  });

  // Validate form data
  const validateForm = (formData, formName) => {
    const textFields = formName === 'reconsideration'
      ? ['studentId', 'name', 'address', 'courseCode', 'year', 'semester', 'reason']
      : ['studentId', 'name', 'address', 'courseCode', 'year', 'semester', 'applicationType', 'reason'];
    if (textFields.some((field) => !formData[field])) {
      return `All text fields are required for ${formName} form.`;
    }
    if (!/^\d{4}$/.test(formData.year)) {
      return 'Year must be a 4-digit number.';
    }
    if (formName === 'reconsideration' && !formData.paymentReceipt) {
      return 'Payment receipt is required for Reconsideration of Course Grade.';
    }
    if (formName === 'compassionateAegrotat' && !formData.supportingDocuments) {
      return 'Supporting documents are required for Compassionate/Aegrotat Pass/Special Exam.';
    }
    return '';
  };

  // Handle input changes
  const handleInputChange = (setForm, field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    setFormErrors((prev) => ({ ...prev, reconsideration: '', compassionateAegrotat: '' }));
  };

  // Handle file input changes
  const handleFileChange = (setForm, field, file) => {
    setForm((prev) => ({ ...prev, [field]: file }));
    setFormErrors((prev) => ({ ...prev, reconsideration: '', compassionateAegrotat: '' }));
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
      // Simulate form data with file (in practice, you'd send this to a server)
      const formDataToSubmit = { ...formData, [formName === 'reconsideration' ? 'paymentReceipt' : 'supportingDocuments']: formData[formName === 'reconsideration' ? 'paymentReceipt' : 'supportingDocuments']?.name };
      await handleFormSubmit(formDataToSubmit, formName);
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
    reconsideration: { studentId: '', name: '', address: '', courseCode: '', year: '', semester: '', reason: '', paymentReceipt: null },
    compassionateAegrotat: { studentId: '', name: '', address: '', courseCode: '', year: '', semester: '', applicationType: '', reason: '', supportingDocuments: null },
  };

  // Form configurations
  const forms = [
    {
      name: 'reconsideration',
      title: 'Application for Reconsideration of Course Grade',
      state: reconsideration,
      setState: setReconsideration,
      fields: [
        {
          label: 'Student ID',
          name: 'studentId',
          type: 'text',
          grid: { xs: 12, sm: 6 },
        },
        {
          label: 'Name',
          name: 'name',
          type: 'text',
          grid: { xs: 12, sm: 6 },
        },
        {
          label: 'Address',
          name: 'address',
          type: 'text',
          multiline: true,
          rows: 3,
          grid: { xs: 12 },
        },
        {
          label: 'Course Code',
          name: 'courseCode',
          type: 'text',
          grid: { xs: 12, sm: 6 },
        },
        {
          label: 'Year',
          name: 'year',
          type: 'number',
          grid: { xs: 12, sm: 3 },
        },
        {
          label: 'Semester/Trimester',
          name: 'semester',
          type: 'select',
          options: ['Semester 1', 'Semester 2', 'Trimester 1', 'Trimester 2', 'Trimester 3'],
          grid: { xs: 12, sm: 3 },
        },
        {
          label: 'Reason for Reconsideration',
          name: 'reason',
          type: 'text',
          multiline: true,
          rows: 4,
          grid: { xs: 12 },
        },
        {
          label: 'Payment Receipt (FJ$50)',
          name: 'paymentReceipt',
          type: 'file',
          grid: { xs: 12 },
        },
      ],
    },
    {
      name: 'compassionateAegrotat',
      title: 'Application for Compassionate/Aegrotat Pass/Special Exam',
      state: compassionateAegrotat,
      setState: setCompassionateAegrotat,
      fields: [
        {
          label: 'Student ID',
          name: 'studentId',
          type: 'text',
          grid: { xs: 12, sm: 6 },
        },
        {
          label: 'Name',
          name: 'name',
          type: 'text',
          grid: { xs: 12, sm: 6 },
        },
        {
          label: 'Address',
          name: 'address',
          type: 'text',
          multiline: true,
          rows: 3,
          grid: { xs: 12 },
        },
        {
          label: 'Course Code',
          name: 'courseCode',
          type: 'text',
          grid: { xs: 12, sm: 6 },
        },
        {
          label: 'Year',
          name: 'year',
          type: 'number',
          grid: { xs: 12, sm: 3 },
        },
        {
          label: 'Semester/Trimester',
          name: 'semester',
          type: 'select',
          options: ['Semester 1', 'Semester 2', 'Trimester 1', 'Trimester 2', 'Trimester 3'],
          grid: { xs: 12, sm: 3 },
        },
        {
          label: 'Application Type',
          name: 'applicationType',
          type: 'select',
          options: ['Aegrotat Pass', 'Compassionate Pass', 'Special Exam'],
          grid: { xs: 12 },
        },
        {
          label: 'Reason for Application',
          name: 'reason',
          type: 'text',
          multiline: true,
          rows: 4,
          grid: { xs: 12 },
        },
        {
          label: 'Supporting Documents (e.g., Medical Certificate)',
          name: 'supportingDocuments',
          type: 'file',
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
          <Typography variant="h4" sx={{ color: '#000000', fontWeight: 'medium' }}>
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
                      minHeight: '120px', // Fixed height for consistent tile size
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