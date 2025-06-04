import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Link,
  Stack,
  ListSubheader,
  Divider,
  Avatar,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import Logo from '../../assets/Images/Logo/Logo.png';
import CardCurve from '../../assets/Images/Sidebar/CardCurve';
import DummyUser from '../../assets/Images/DummyUser/SDIPAdminUserPic.png';
import SidebarItem from './SidebarItem';

// Icon Imports
import DashboardTwoToneIcon from '@mui/icons-material/DashboardTwoTone';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import PaymentIcon from '@mui/icons-material/Payment';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BlockTwoToneIcon from '@mui/icons-material/BlockTwoTone';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';

const Sidebar = ({ isSidebarCollapsed }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  // Get the logged-in user from auth hook
  const { user } = useAuth();

  // Construct the profile pic URL
  const baseUrl = import.meta.env.VITE_API_URL;
  const profilePicUrl = user && user.profilePicPath ? `${baseUrl}${user.profilePicPath}` : DummyUser;

  // Define navigation items with role-based access
  const navigationItems = [
    { kind: 'header', title: 'Overview' },
    {
      icon: DashboardTwoToneIcon,
      name: 'Dashboard',
      onClick: () => navigate('/dashboard'),
      isActive: currentPath.startsWith('/dashboard'),
      allowedRoles: ['student', 'admin'],
    },
    {
      icon: PersonIcon,
      name: "Profile",
      onClick: () => navigate("/update-profile"),
      isActive: currentPath.startsWith("/update-profile"),
    },
    { kind: 'divider' },
    { kind: 'header', title: 'Academics', allowedRoles: ['student'] },
    {
      icon: SchoolIcon,
      name: 'Enrollment',
      onClick: () => navigate('/enrollment'),
      isActive: currentPath.startsWith('/enrollment'),
      allowedRoles: ['student'],
    },
    {
      icon: SchoolIcon,
      name: 'Program Audit',
      onClick: () => navigate('/program'),
      isActive: currentPath.startsWith('/program'),
      allowedRoles: ['student'],
    },
    {
      icon: SchoolIcon,
      name: 'Grades',
      onClick: () => navigate('/grades-page'),
      isActive: currentPath.startsWith('/grades-page'),
      allowedRoles: ['student'],
    },
    {
      icon: PaymentIcon,
      name: 'Fees',
      onClick: () => navigate('/fees'),
      isActive: currentPath.startsWith('/fees'),
      allowedRoles: ['student'],
    },
    {
      icon: CalendarTodayIcon,
      name: 'Timetable',
      onClick: () => navigate('/timetable'),
      isActive: currentPath.startsWith('/timetable'),
      allowedRoles: ['student'],
    },
    {
      icon: PaymentIcon,
      name: 'Forms',
      onClick: () => navigate('/forms'),
      isActive: currentPath.startsWith('/forms'),
      allowedRoles: ['student'],
    },
    { kind: 'divider' },
    { kind: 'header', title: 'Admin', allowedRoles: ['admin'] },
    {
      icon: AdminPanelSettingsIcon,
      name: 'Course Management',
      onClick: () => navigate('/course-management'),
      isActive: currentPath.startsWith('/course-management'), 
      allowedRoles: ['admin'],
    },
    {
      icon: PersonIcon,
      name: 'Student Records',
      onClick: () => navigate('/student-records'),
      isActive: currentPath.startsWith('/student-records'),
      allowedRoles: ['admin'],
    },
    {
      icon: BlockTwoToneIcon,
      name: 'Service Management',
      onClick: () => navigate('/service-management'),
      isActive: currentPath.startsWith('/service-management'),
      allowedRoles: ['admin'],
    },
    {
      icon: DescriptionTwoToneIcon,
      name: 'Forms Configuration',
      onClick: () => navigate('/forms-configuration'),
      isActive: currentPath.startsWith('/forms-configuration'),
      allowedRoles: ['admin'],
    },
  ];

  const filteredNavigationItems = navigationItems.filter((item) => {
    if (item.allowedRoles) {
      return user && item.allowedRoles.includes(user.role);
    }
    return true;
  });

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', paddingBottom: '8px' }}>
        <Link
          onClick={() => navigate('/dashboard')}
          sx={{
            textDecoration: 'none',
            width: isSidebarCollapsed ? '65px' : '65px',
            height: '100%',
            flexShrink: 0,
            display: 'inline-flex',
            verticalAlign: 'middle',
            paddingBottom: '3px',
            borderRadius: '40px',
            justifyContent: 'center',
            transition: 'width 0.5s ease',
          }}
        >
          <Box
            sx={{
              width: '320px',
              display: 'flex',
              transform: 'rotate(180deg)',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '-60px',
              position: 'absolute',
            }}
          >
            <CardCurve style={{ width: '320px', height: '100%' }} />
          </Box>
          <img
            src={isSidebarCollapsed ? Logo : Logo}
            alt="logo"
            width={isSidebarCollapsed ? '70px' : '70px'}
            height="auto"
            style={{
              transition: 'opacity 0.5s ease',
              transformOrigin: 'center',
              zIndex: 1,
              marginTop: '5px',
              cursor: 'pointer',
            }}
          />
        </Link>
      </Box>
      <Box sx={{ padding: '16px', backgroundColor: '#rgb(37, 150, 190)', borderRadius: '8px' }}>
        <Stack spacing={2}>
          <Box>
            {filteredNavigationItems.map((item, index) => {
              if (item.kind === 'header') {
                return (
                  <Box key={index} sx={{ mb: 1 }}>
                    <ListSubheader
                      sx={{
                        backgroundColor: 'transparent',
                        fontWeight: 'bold',
                        color: item.title === 'Overview' || item.title === 'Admin' || item.title === 'Academics' ? '#ffffff' : theme.palette.text.primary,
                      }}
                    >
                      {item.title}
                    </ListSubheader>
                  </Box>
                );
              } else if (item.kind === 'divider') {
                return <Divider key={index} />;
              } else {
                return <SidebarItem key={index} {...item} isSidebarCollapsed={isSidebarCollapsed} />;
              }
            })}
          </Box>
        </Stack>
        <Divider variant="middle" sx={{ my: 2 }} />
        <Divider variant="middle" sx={{ my: 2 }} />
        <Stack spacing={1} alignItems="center">
          <Box>
            <Avatar
              sx={{ width: 56, height: 56 }}
              src={profilePicUrl}
              alt={user ? `${user.firstName} ${user.lastName}` : 'User'}
            />
          </Box>
          <Stack alignItems="center">
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#ffffff' }}>
              {user ? `${user.firstName} ${user.lastName}` : ''}
            </Typography>
            <Typography variant="body2" sx={{ color: '#ffffff' }}>
              {user ? user.email : ''}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default Sidebar;