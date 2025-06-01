import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer, Box, Typography, Button, Divider, Avatar } from '@mui/material';
import DummyUser from '../../assets/Images/DummyUser/SDIPAdminUserPic.png';
import YourProfile from '../../assets/Images/ProfileDrawer/YourProfile.png';

const ProfileDrawer = ({ open, toggleDrawer, user }) => {
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const profilePicUrl = user?.profilePicPath ? `${baseUrl}${user.profilePicPath}` : DummyUser;
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication data from localStorage
    localStorage.removeItem('authToken'); // Adjust key if different
    localStorage.removeItem('user'); // Clear user data if stored
    // Redirect to login page
    navigate('/login');
    // Close the drawer
    toggleDrawer(false)();
  };

  return (
    <Drawer anchor="right" open={open} onClose={() => toggleDrawer(false)}>
      <Box sx={{ width: 300, p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Your Profile Image */}
        <Box sx={{ mb: 2 }}>
          <img
            src={YourProfile}
            alt="Your Profile"
            style={{ width: '300px', height: '200px', display: 'block' }}
          />
        </Box>
        <Divider sx={{ width: '100%', mb: 2 }} />
        {/* User Info */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          <Avatar
            sx={{ width: 150, height: 150, mb: 1 }}
            src={profilePicUrl}
            alt={user ? `${user.firstName} ${user.lastName}` : 'User'}
          />
          <Typography variant="h6">
            {user ? `${user.firstName} ${user.lastName}` : ''}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user ? user.email : ''}
          </Typography>
        </Box>
        <Divider sx={{ width: '100%', mb: 2 }} />
        {/* Buttons */}
        <Box sx={{ width: '100%' }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => toggleDrawer(false)}
            sx={{
              mb: 1,
              '&:hover': {
                backgroundColor: '#094c50',
              },
            }}
          >
            Close
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default ProfileDrawer;