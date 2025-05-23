import React from 'react';
import { Drawer, Box, Typography, Button, Divider, Avatar } from '@mui/material';
import DummyUser from '../../assets/Images/DummyUser/SDIPAdminUserPic.png';
 
const ProfileDrawer = ({ open, toggleDrawer, user }) => {
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const profilePicUrl = user?.profilePicPath ? `${baseUrl}${user.profilePicPath}` : DummyUser;
 
  const handleLogout = () => {
    logout();
  };
 
  return (
    <Drawer anchor="right" open={open} onClose={() => toggleDrawer(false)}>
      <Box sx={{ width: 300, p: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          <Avatar
            sx={{ width: 80, height: 80, mb: 1 }}
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
        <Divider />
        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => toggleDrawer(false)}
            sx={{ mb: 1 }}
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