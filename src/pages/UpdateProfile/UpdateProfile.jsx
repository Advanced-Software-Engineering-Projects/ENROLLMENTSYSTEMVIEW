// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Grid,
//   Button,
//   TextField,
//   Typography,
//   Avatar,
//   Container,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   InputAdornment,
// } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
// import BadgeIcon from '@mui/icons-material/Badge';
// import MailOutlineIcon from '@mui/icons-material/MailOutline';
// import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
// import FlagIcon from '@mui/icons-material/Flag';
// import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
// import SchoolIcon from '@mui/icons-material/School';
// import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
// import NoteAltIcon from '@mui/icons-material/NoteAlt';
// import Man4Icon from '@mui/icons-material/Man4';
// import PhotoAlbumIcon from '@mui/icons-material/PhotoAlbum';
// import BookIcon from '@mui/icons-material/Book';
// import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
// import DateRangeIcon from '@mui/icons-material/DateRange';
// import EditNoteIcon from '@mui/icons-material/EditNote';
// import SaveIcon from '@mui/icons-material/Save';
// import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
// import TitleBar from '../../components/Titlebar/Titlebar';
// import { getStudent, updateStudent, uploadAvatar } from '../../Endpoints/StudentEndpoints';

// const UpdateProfile = () => {
//   const [editable, setEditable] = useState(false);
//   const [student, setStudent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchStudentData = async () => {
//       const userString = localStorage.getItem('user');
//       if (!userString) {
//         navigate('/login');
//         return;
//       }
//       let studentId = null;
//       try {
//         const user = JSON.parse(userString);
//         if (user.id) {
//           studentId = user.id;
//         } else if (user.email) {
//           studentId = user.email.split('@')[0];
//         } else {
//           studentId = null;
//         }
//       } catch (e) {
//         console.error('Error parsing user from localStorage:', e);
//         navigate('/login');
//         return;
//       }
//       if (!studentId) {
//         navigate('/login');
//         return;
//       }

//       try {
//         const response = await getStudent(studentId);
//         setStudent(response.data);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching student data:', err);
//         setError('Failed to load profile data. Please try again later.');
//         setLoading(false);
//       }
//     };

//     fetchStudentData();
//   }, [navigate]);

//   const handleEditToggle = async () => {
//     if (editable) {
//       try {
//         const userString = localStorage.getItem('user');
//         let studentId = null;
//         if (userString) {
//           try {
//             const user = JSON.parse(userString);
//             if (user.id) {
//               studentId = user.id;
//             } else if (user.email) {
//               studentId = user.email.split('@')[0];
//             } else {
//               studentId = null;
//             }
//           } catch (e) {
//             console.error('Error parsing user from localStorage:', e);
//           }
//         }
//         if (!studentId) {
//           setError('User not authenticated. Please login again.');
//           return;
//         }
//         await updateStudent(studentId, student);
//         setEditable(false);
//       } catch (err) {
//         console.error('Error updating student data:', err);
//         setError('Failed to save changes. Please try again.');
//       }
//     } else {
//       setEditable(true);
//     }
//   };

//   const handleChange = (e) => {
//     setStudent({ ...student, [e.target.name]: e.target.value });
//   };

//   const handleAvatarChange = async (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       try {
//         const userString = localStorage.getItem('user');
//         let studentId = null;
//         if (userString) {
//           try {
//             const user = JSON.parse(userString);
//             if (user.id) {
//               studentId = user.id;
//             } else if (user.email) {
//               studentId = user.email.split('@')[0];
//             } else {
//               studentId = null;
//             }
//           } catch (e) {
//             console.error('Error parsing user from localStorage:', e);
//           }
//         }
//         if (!studentId) {
//           setError('User not authenticated. Please login again.');
//           return;
//         }
//         const formData = new FormData();
//         formData.append('avatar', file);
//         const response = await uploadAvatar(studentId, formData);
//         setStudent({ ...student, avatar: response.data.AvatarUrl });
//       } catch (err) {
//         console.error('Error uploading avatar:', err);
//         setError('Failed to upload avatar. Please try again.');
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <DashboardLayout>
//         <Container maxWidth="lg">
//           <Typography>Loading...</Typography>
//         </Container>
//       </DashboardLayout>
//     );
//   }

//   if (error) {
//     return (
//       <DashboardLayout>
//         <Container maxWidth="lg">
//           <Typography color="error">{error}</Typography>
//         </Container>
//       </DashboardLayout>
//     );
//   }

//   return (
//     <DashboardLayout>
//       <Container maxWidth="lg">
//         <Grid container spacing={2} justifyContent="center">
//           <Grid item xs={12}>
//             <TitleBar title="Update Profile" />
//           </Grid>

//           <Grid item xs={12} sx={{ textAlign: 'center', mb: 4 }}>
//             <AvatarContainer>
//               <StyledAvatar src={student.avatar} alt="Avatar" />
//               <AvatarEditButton htmlFor="avatar-upload">
//                 <EditIcon sx={{ color: 'white', fontSize: 20 }} />
//               </AvatarEditButton>
//               <input
//                 type="file"
//                 hidden
//                 onChange={handleAvatarChange}
//                 accept="image/*"
//                 id="avatar-upload"
//               />
//             </AvatarContainer>
//           </Grid>

//           <Grid container spacing={2}>
//             {[
//               { field: 'firstName', label: 'First Name', icon: <DriveFileRenameOutlineIcon /> },
//               { field: 'middleName', label: 'Middle Name', icon: <DriveFileRenameOutlineIcon /> },
//               { field: 'lastName', label: 'Last Name', icon: <DriveFileRenameOutlineIcon /> },
//               { field: 'studentId', label: 'Student ID', icon: <BadgeIcon />, disabled: true },
//               { field: 'email', label: 'Email', icon: <MailOutlineIcon /> },
//               { field: 'phone', label: 'Phone', icon: <LocalPhoneIcon /> },
//               { field: 'program', label: 'Program', icon: <LibraryBooksIcon /> },
//               { field: 'studentLevel', label: 'Student Level', icon: <SchoolIcon /> },
//               { field: 'studentCampus', label: 'Student Campus', icon: <MapsHomeWorkIcon /> },
//               { field: 'examSite', label: 'Exam Site', icon: <NoteAltIcon /> },
//             ].map(({ field, label, icon, disabled = false }) => (
//               <Grid item xs={12} sm={6} key={field}>
//                 <TextField
//                   fullWidth
//                   label={label}
//                   name={field}
//                   value={student[field] || ''}
//                   onChange={handleChange}
//                   disabled={disabled || !editable}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">{icon}</InputAdornment>
//                     ),
//                     style: { color: '#000000', backgroundColor: '#f9f9f9' },
//                   }}
//                   InputLabelProps={{
//                     style: { color: '#555' },
//                   }}
//                   variant="outlined"
//                 />
//               </Grid>
//             ))}

//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth variant="outlined" disabled={!editable}>
//                 <InputLabel sx={{ color: '#555' }}>Citizenship</InputLabel>
//                 <Select
//                   name="citizenship"
//                   value={student.citizenship || ''}
//                   onChange={handleChange}
//                   label="Citizenship"
//                   sx={{ color: '#000000', backgroundColor: '#f9f9f9' }}
//                   startAdornment={
//                     <InputAdornment position="start">
//                       <FlagIcon />
//                     </InputAdornment>
//                   }
//                 >
//                   <MenuItem value="United States">United States</MenuItem>
//                   <MenuItem value="Canada">Canada</MenuItem>
//                   <MenuItem value="Australia">Australia</MenuItem>
//                   <MenuItem value="United Kingdom">United Kingdom</MenuItem>
//                   <MenuItem value="India">India</MenuItem>
//                   <MenuItem value="China">China</MenuItem>
//                   <MenuItem value="Fiji">Fiji</MenuItem>
//                   <MenuItem value="Other">Other</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth variant="outlined" disabled={!editable}>
//                 <InputLabel sx={{ color: '#555' }}>Gender</InputLabel>
//                 <Select
//                   name="gender"
//                   value={student.gender || ''}
//                   onChange={handleChange}
//                   label="Gender"
//                   sx={{ color: '#000000', backgroundColor: '#f9f9f9' }}
//                   startAdornment={
//                     <InputAdornment position="start">
//                       <Man4Icon />
//                     </InputAdornment>
//                   }
//                 >
//                   <MenuItem value="Male">Male</MenuItem>
//                   <MenuItem value="Female">Female</MenuItem>
//                   <MenuItem value="Other">Other</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth variant="outlined" disabled={!editable}>
//                 <InputLabel sx={{ color: '#555' }}>Major Type</InputLabel>
//                 <Select
//                   name="majorType"
//                   value={student.majorType || ''}
//                   onChange={handleChange}
//                   label="Major Type"
//                   sx={{ color: '#000000', backgroundColor: '#f9f9f9' }}
//                   startAdornment={
//                     <InputAdornment position="start">
//                       <PhotoAlbumIcon />
//                     </InputAdornment>
//                   }
//                 >
//                   <MenuItem value="Single">Single</MenuItem>
//                   <MenuItem value="Double">Double</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label={student.majorType === 'Double' ? 'First Major' : 'Major'}
//                 name="major1"
//                 value={student.major1 || ''}
//                 onChange={handleChange}
//                 disabled={!editable}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <BookIcon />
//                     </InputAdornment>
//                   ),
//                   style: { color: '#000000', backgroundColor: '#f9f9f9' },
//                 }}
//                 InputLabelProps={{
//                   style: { color: '#555' },
//                 }}
//                 variant="outlined"
//               />
//             </Grid>

//             {student.majorType === 'Double' && (
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Second Major/Minor"
//                   name="major2"
//                   value={student.major2 || ''}
//                   onChange={handleChange}
//                   disabled={!editable}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <CollectionsBookmarkIcon />
//                       </InputAdornment>
//                     ),
//                     style: { color: '#000000', backgroundColor: '#f9f9f9' },
//                   }}
//                   InputLabelProps={{
//                     style: { color: '#555' },
//                   }}
//                   variant="outlined"
//                 />
//               </Grid>
//             )}

//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Date of Birth"
//                 type="date"
//                 name="dob"
//                 value={student.dob || ''}
//                 onChange={handleChange}
//                 disabled={true} // Kept disabled as in original
//                 InputLabelProps={{ shrink: true, style: { color: '#555' } }}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <DateRangeIcon />
//                     </InputAdornment>
//                   ),
//                   style: { color: '#000000', backgroundColor: '#f9f9f9' },
//                 }}
//                 variant="outlined"
//               />
//             </Grid>
//           </Grid>

//           {/* Edit Button */}
//           <Grid item xs={12} sx={{ mt: 3, textAlign: 'center' }}>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleEditToggle}
//               startIcon={editable ? <SaveIcon /> : <EditNoteIcon />}
//               sx={{
//                 bgcolor: '#094C50',
//                 '&:hover': { bgcolor: '#0D7075' },
//                 padding: '10px 24px',
//                 borderRadius: '8px',
//                 textTransform: 'none',
//                 fontSize: '16px',
//               }}
//             >
//               {editable ? 'Save' : 'Edit'}
//             </Button>
//           </Grid>
//         </Grid>
//       </Container>
//     </DashboardLayout>
//   );
// };

// export default UpdateProfile;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Button,
  TextField,
  Typography,
  Avatar,
  Container,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
  CircularProgress,
  Box,
  styled,
} from '@mui/material';
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
import { getStudent, updateStudent, uploadAvatar } from '../../Endpoints/StudentEndpoints';

// Styled components
const StyledAvatar = styled(Avatar)({
  width: 120,
  height: 120,
  border: '3px solid #094C50',
});

const AvatarContainer = styled(Box)({
  position: 'relative',
  display: 'inline-block',
});

const AvatarEditButton = styled(Button)({
  position: 'absolute',
  bottom: 0,
  right: 0,
  backgroundColor: '#094C50',
  minWidth: 'auto',
  width: 40,
  height: 40,
  borderRadius: '50%',
  '&:hover': {
    backgroundColor: '#0D7075',
  },
});

const UpdateProfile = () => {
  const [editable, setEditable] = useState(false);
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

const getCleanStudentId = (user) => {
  if (!user) return null;
  if (user.id) return user.id;
  if (user.email) return user.email.split('@')[0];
  return null;
};

// In your useEffect:
useEffect(() => {
  const fetchStudentData = async () => {
    try {
      const userString = localStorage.getItem('user');
      if (!userString) {
        navigate('/login');
        return;
      }

      const user = JSON.parse(userString);
      const studentId = getCleanStudentId(user);

      if (!studentId) {
        navigate('/login');
        return;
      }

      const response = await getStudent(studentId);
      setStudent(response.data);
    } catch (err) {
      console.error('Error fetching student data:', err);
      setError('Failed to load profile data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  fetchStudentData();
}, [navigate]);

  const handleEditToggle = async () => {
    if (editable) {
      try {
        const userString = localStorage.getItem('user');
        const user = JSON.parse(userString);
        const studentId = user.id || (user.email ? user.email.split('@')[0] : null);

        if (!studentId) {
          setError('User not authenticated. Please login again.');
          return;
        }

        await updateStudent(studentId, student);
        setEditable(false);
        setSuccess('Profile updated successfully!');
        setTimeout(() => setSuccess(null), 3000);
      } catch (err) {
        console.error('Error updating student data:', err);
        setError('Failed to save changes. Please try again.');
      }
    } else {
      setEditable(true);
      setError(null);
      setSuccess(null);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const userString = localStorage.getItem('user');
      const user = JSON.parse(userString);
      const studentId = user.id || (user.email ? user.email.split('@')[0] : null);

      if (!studentId) {
        setError('User not authenticated. Please login again.');
        return;
      }

      const formData = new FormData();
      formData.append('avatar', file);
      
      const response = await uploadAvatar(studentId, formData);
      setStudent(prev => ({ ...prev, avatar: response.data.avatarUrl }));
      setSuccess('Avatar updated successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error('Error uploading avatar:', err);
      setError('Failed to upload avatar. Please try again.');
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
          <CircularProgress />
        </Container>
      </DashboardLayout>
    );
  }

  if (!student) {
    return (
      <DashboardLayout>
        <Container maxWidth="lg">
          <Typography color="error">{error || 'Student data not available'}</Typography>
        </Container>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Container maxWidth="lg">
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <TitleBar title="Update Profile" />
          </Grid>

          {error && (
            <Grid item xs={12}>
              <Typography color="error" align="center">
                {error}
              </Typography>
            </Grid>
          )}

          {success && (
            <Grid item xs={12}>
              <Typography color="success.main" align="center">
                {success}
              </Typography>
            </Grid>
          )}

          <Grid item xs={12} sx={{ textAlign: 'center', mb: 4 }}>
            <AvatarContainer>
              <StyledAvatar src={student.avatar || '/default-avatar.png'} alt="Avatar" />
              <AvatarEditButton component="label" htmlFor="avatar-upload" disabled={!editable}>
                <EditIcon sx={{ color: 'white', fontSize: 20 }} />
                <input
                  type="file"
                  hidden
                  onChange={handleAvatarChange}
                  accept="image/*"
                  id="avatar-upload"
                  disabled={!editable}
                />
              </AvatarEditButton>
            </AvatarContainer>
          </Grid>

          <Grid container spacing={2}>
            {[
              { field: 'firstName', label: 'First Name', icon: <DriveFileRenameOutlineIcon /> },
              { field: 'middleName', label: 'Middle Name', icon: <DriveFileRenameOutlineIcon /> },
              { field: 'lastName', label: 'Last Name', icon: <DriveFileRenameOutlineIcon /> },
              { field: 'studentId', label: 'Student ID', icon: <BadgeIcon />, disabled: true },
              { field: 'email', label: 'Email', icon: <MailOutlineIcon />, disabled: true }, // Email typically shouldn't be editable
              { field: 'phone', label: 'Phone', icon: <LocalPhoneIcon /> },
              { field: 'program', label: 'Program', icon: <LibraryBooksIcon />, disabled: true }, // Program usually fixed
              { field: 'studentLevel', label: 'Student Level', icon: <SchoolIcon />, disabled: true }, // Level typically managed by system
              { field: 'studentCampus', label: 'Student Campus', icon: <MapsHomeWorkIcon /> },
              { field: 'examSite', label: 'Exam Site', icon: <NoteAltIcon /> },
            ].map(({ field, label, icon, disabled = false }) => (
              <Grid item xs={12} sm={6} key={field}>
                <TextField
                  fullWidth
                  label={label}
                  name={field}
                  value={student[field] || ''}
                  onChange={handleChange}
                  disabled={disabled || !editable}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">{icon}</InputAdornment>
                    ),
                    style: { backgroundColor: '#f9f9f9' },
                  }}
                  variant="outlined"
                />
              </Grid>
            ))}

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined" disabled={!editable}>
                <InputLabel>Citizenship</InputLabel>
                <Select
                  name="citizenship"
                  value={student.citizenship || ''}
                  onChange={handleChange}
                  label="Citizenship"
                  sx={{ backgroundColor: '#f9f9f9' }}
                  startAdornment={
                    <InputAdornment position="start">
                      <FlagIcon />
                    </InputAdornment>
                  }
                >
                  {['United States', 'Canada', 'Australia', 'United Kingdom', 'India', 'China', 'Fiji', 'Other'].map(
                    (country) => (
                      <MenuItem key={country} value={country}>
                        {country}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined" disabled={!editable}>
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  value={student.gender || ''}
                  onChange={handleChange}
                  label="Gender"
                  sx={{ backgroundColor: '#f9f9f9' }}
                  startAdornment={
                    <InputAdornment position="start">
                      <Man4Icon />
                    </InputAdornment>
                  }
                >
                  {['Male', 'Female', 'Other', 'Prefer not to say'].map((gender) => (
                    <MenuItem key={gender} value={gender}>
                      {gender}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined" disabled={!editable}>
                <InputLabel>Major Type</InputLabel>
                <Select
                  name="majorType"
                  value={student.majorType || ''}
                  onChange={handleChange}
                  label="Major Type"
                  sx={{ backgroundColor: '#f9f9f9' }}
                  startAdornment={
                    <InputAdornment position="start">
                      <PhotoAlbumIcon />
                    </InputAdornment>
                  }
                >
                  {['Single', 'Double'].map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={student.majorType === 'Double' ? 'First Major' : 'Major'}
                name="major1"
                value={student.major1 || ''}
                onChange={handleChange}
                disabled={!editable}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BookIcon />
                    </InputAdornment>
                  ),
                  style: { backgroundColor: '#f9f9f9' },
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
                  value={student.major2 || ''}
                  onChange={handleChange}
                  disabled={!editable}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CollectionsBookmarkIcon />
                      </InputAdornment>
                    ),
                    style: { backgroundColor: '#f9f9f9' },
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
                value={student.dob || ''}
                onChange={handleChange}
                disabled={true} // Typically DOB shouldn't be editable
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DateRangeIcon />
                    </InputAdornment>
                  ),
                  style: { backgroundColor: '#f9f9f9' },
                }}
                variant="outlined"
              />
            </Grid>
          </Grid>

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
              {editable ? 'Save Changes' : 'Edit Profile'}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </DashboardLayout>
  );
};

export default UpdateProfile;
