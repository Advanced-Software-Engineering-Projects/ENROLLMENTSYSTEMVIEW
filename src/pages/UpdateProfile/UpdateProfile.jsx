import React, { useState } from 'react';
import {
  Grid,
  Button,
  TextField,
  Typography,
  Avatar,
  Paper,
  Box,
  Container,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
} from '@mui/material';
import { styled } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import BadgeIcon from '@mui/icons-material/Badge';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import FlagIcon from '@mui/icons-material/Flag';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import SchoolIcon from '@mui/icons-material/School';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import Man4Icon from '@mui/icons-material/Man4';
import PhotoAlbumIcon from '@mui/icons-material/PhotoAlbum';
import BookIcon from '@mui/icons-material/Book';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import DateRangeIcon from '@mui/icons-material/DateRange';
import EditNoteIcon from '@mui/icons-material/EditNote';
import SaveIcon from '@mui/icons-material/Save';
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
import TitleBar from '../../components/Titlebar/Titlebar';

// Custom styles
const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  margin: '0 auto',
  border: '3px solid #fff',
  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
}));

const AvatarContainer = styled('div')({
  position: 'relative',
  display: 'inline-block',
  marginBottom: theme => theme.spacing(2),
});

const AvatarEditButton = styled('label')({
  position: 'absolute',
  bottom: 8,
  right: 8,
  backgroundColor: '#000',
  borderRadius: '50%',
  padding: '8px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    backgroundColor: '#333',
  },
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '12px',
  backgroundColor: '#fff',
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  maxWidth: 800,
  width: '100%',
}));

const StudentProfile = () => {
  const [editable, setEditable] = useState(false);
  const [student, setStudent] = useState({
    firstName: 'Jane',
    middleName: 'Optional',
    lastName: 'Doe',
    studentId: 'S11111111',
    dob: '2000-05-15',
    email: 'jane.doe@example.com',
    phone: '123-456-7890',
    avatar: 'https://via.placeholder.com/150',
    gender: 'Female',
    citizenship: 'United States',
    program: 'Bachelor of Science',
    studentLevel: 'Sophomore',
    studentCampus: 'Main Campus',
    examSite: 'Campus Testing Center',
    majorType: 'Single',
    major1: 'Computer Science',
    major2: '',
  });

  const handleEditToggle = () => {
    setEditable(!editable);
  };

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStudent({ ...student, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <DashboardLayout>
      <Container maxWidth="lg">
      
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <TitleBar title="Update Profile">

              </TitleBar>
            </Grid>

            {/* Avatar Section */}
            <Grid item xs={12} sx={{ textAlign: 'center', mb: 4 }}>
              <AvatarContainer>
                <StyledAvatar src={student.avatar} alt="Avatar" />
                <AvatarEditButton htmlFor="avatar-upload">
                  <EditIcon sx={{ color: 'white', fontSize: 20 }} />
                </AvatarEditButton>
                <input
                  type="file"
                  hidden
                  onChange={handleAvatarChange}
                  accept="image/*"
                  id="avatar-upload"
                />
              </AvatarContainer>
            </Grid>

         

            {/* Personal Details Fields */}
            <Grid container spacing={2}>
              {[
                { field: 'firstName', label: 'First Name', icon: <DriveFileRenameOutlineIcon /> },
                { field: 'middleName', label: 'Middle Name', icon: <DriveFileRenameOutlineIcon /> },
                { field: 'lastName', label: 'Last Name', icon: <DriveFileRenameOutlineIcon /> },
                { field: 'studentId', label: 'Student ID', icon: <BadgeIcon />, disabled: true },
                { field: 'email', label: 'Email', icon: <MailOutlineIcon /> },
                { field: 'phone', label: 'Phone', icon: <LocalPhoneIcon /> },
                { field: 'program', label: 'Program', icon: <LibraryBooksIcon /> },
                { field: 'studentLevel', label: 'Student Level', icon: <SchoolIcon /> },
                { field: 'studentCampus', label: 'Student Campus', icon: <MapsHomeWorkIcon /> },
                { field: 'examSite', label: 'Exam Site', icon: <NoteAltIcon /> },
              ].map(({ field, label, icon, disabled = false }) => (
                <Grid item xs={12} sm={6} key={field}>
                  <TextField
                    fullWidth
                    label={label}
                    name={field}
                    value={student[field]}
                    onChange={handleChange}
                    disabled={disabled || !editable}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">{icon}</InputAdornment>
                      ),
                      style: { color: '#000000', backgroundColor: '#f9f9f9' },
                    }}
                    InputLabelProps={{
                      style: { color: '#555' },
                    }}
                    variant="outlined"
                  />
                </Grid>
              ))}

              {/* Citizenship Dropdown */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined" disabled={!editable}>
                  <InputLabel sx={{ color: '#555' }}>Citizenship</InputLabel>
                  <Select
                    name="citizenship"
                    value={student.citizenship}
                    onChange={handleChange}
                    label="Citizenship"
                    sx={{ color: '#000000', backgroundColor: '#f9f9f9' }}
                    startAdornment={
                      <InputAdornment position="start">
                        <FlagIcon />
                      </InputAdornment>
                    }
                  >
                    <MenuItem value="United States">United States</MenuItem>
                    <MenuItem value="Canada">Canada</MenuItem>
                    <MenuItem value="Australia">Australia</MenuItem>
                    <MenuItem value="United Kingdom">United Kingdom</MenuItem>
                    <MenuItem value="India">India</MenuItem>
                    <MenuItem value="China">China</MenuItem>
                    <MenuItem value="Fiji">Fiji</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined" disabled={!editable}>
                  <InputLabel sx={{ color: '#555' }}>Gender</InputLabel>
                  <Select
                    name="gender"
                    value={student.gender}
                    onChange={handleChange}
                    label="Gender"
                    sx={{ color: '#000000', backgroundColor: '#f9f9f9' }}
                    startAdornment={
                      <InputAdornment position="start">
                        <Man4Icon />
                      </InputAdornment>
                    }
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined" disabled={!editable}>
                  <InputLabel sx={{ color: '#555' }}>Major Type</InputLabel>
                  <Select
                    name="majorType"
                    value={student.majorType}
                    onChange={handleChange}
                    label="Major Type"
                    sx={{ color: '#000000', backgroundColor: '#f9f9f9' }}
                    startAdornment={
                      <InputAdornment position="start">
                        <PhotoAlbumIcon />
                      </InputAdornment>
                    }
                  >
                    <MenuItem value="Single">Single</MenuItem>
                    <MenuItem value="Double">Double</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={student.majorType === 'Double' ? 'First Major' : 'Major'}
                  name="major1"
                  value={student.major1}
                  onChange={handleChange}
                  disabled={!editable}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BookIcon />
                      </InputAdornment>
                    ),
                    style: { color: '#000000', backgroundColor: '#f9f9f9' },
                  }}
                  InputLabelProps={{
                    style: { color: '#555' },
                  }}
                  variant="outlined"
                />
              </Grid>

              {student.majorType === 'Double' && (
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Second Major/Minor"
                    name="major2"
                    value={student.major2}
                    onChange={handleChange}
                    disabled={!editable}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CollectionsBookmarkIcon />
                        </InputAdornment>
                      ),
                      style: { color: '#000000', backgroundColor: '#f9f9f9' },
                    }}
                    InputLabelProps={{
                      style: { color: '#555' },
                    }}
                    variant="outlined"
                  />
                </Grid>
              )}

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Date of Birth"
                  type="date"
                  name="dob"
                  value={student.dob}
                  onChange={handleChange}
                  disabled={true}
                  InputLabelProps={{ shrink: true, style: { color: '#555' } }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DateRangeIcon />
                      </InputAdornment>
                    ),
                    style: { color: '#000000', backgroundColor: '#f9f9f9' },
                  }}
                  variant="outlined"
                />
              </Grid>
            </Grid>

            {/* Edit Button */}
            <Grid item xs={12} sx={{ mt: 3, textAlign: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleEditToggle}
                startIcon={editable ? <SaveIcon /> : <EditNoteIcon />}
                sx={{
                  bgcolor: '#094C50',
                  '&:hover': { bgcolor: '#0D7075' },
                  padding: '10px 24px',
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontSize: '16px',
                }}
              >
                {editable ? 'Save' : 'Edit'}
              </Button>
            </Grid>
          </Grid>
      
      </Container>
    </DashboardLayout>
  );
};

export default StudentProfile;