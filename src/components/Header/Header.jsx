import {
  Paper,
  Toolbar,
  useMediaQuery,
  useTheme,
  Box,
  Typography,
  IconButton,
  Tooltip,
  keyframes,
  Avatar,
  Badge,
  Popover,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
 
// Icons Imports
import NightsStayTwoToneIcon from "@mui/icons-material/NightsStayTwoTone";
import Brightness5TwoToneIcon from "@mui/icons-material/Brightness5TwoTone";
import NotificationsIcon from "@mui/icons-material/Notifications";
 
 
// Import auth hook
import { useAuth } from "../../hooks/useAuth";
import ProfileDrawer from "../Extras/ProfileDrawer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
 
// Import Images
import DummyUser from "../../assets/Images/DummyUser/SDIPAdminUserPic.png";
 
// Keyframe Animations
const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;
 
const Header = ({ isSidebarCollapsed, toggleTheme, mode }) => {
  const theme = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
 
  // Construct the profile pic URL
  const baseUrl = import.meta.env.VITE_API_URL;
  const profilePicUrl =
    user && user.profilePicPath
      ? `${baseUrl}${user.profilePicPath}`
      : DummyUser;
 
  // State for controlling the profile drawer
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };
 
  // State for notifications and chats
  const [notifications, setNotifications] = useState([
    "Fees Payment Notice: USP Finance",
    "Fee Payment Reminder for Semester 1",
 
    "Upcoming Event: USP Open Day",
    "Semester 1 Exam Timetable to be released soon",
 
   
  ]);
 
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [chatAnchorEl, setChatAnchorEl] = useState(null);
 
  const handleNotificationClick = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };
 
  const handleChatClick = (event) => {
    setChatAnchorEl(event.currentTarget);
  };
 
  const handleClose = () => {
    setNotificationAnchorEl(null);
    setChatAnchorEl(null);
  };
 
  return (
    <>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
          flexShrink: 0,
          position: "fixed",
          top: "0",
          left: isSmallScreen ? "0px" : isSidebarCollapsed ? "88px" : "300px",
          right: "0px",
          backgroundColor: theme.palette.background.default,
          backdropFilter: "blur(230px)",
          color: "inherit",
          backgroundImage: "none",
          boxShadow: "none",
          zIndex: 5,
          transition: "left 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          paddingLeft: "16px",
          paddingRight: "16px",
          height: "70px",
        }}
      >
        <Toolbar
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            minHeight: "auto",
            height: "100%",
            transition:
              "height 200ms cubic-bezier(0.4, 0, 0.2, 1), background-color 200ms cubic-bezier(0.4, 0, 0.2, 1)",
            backgroundColor: "transparent",
            backdropFilter: "blur(30px)",
          }}
        >
          <Box
            sx={{
              width: "100%",
              marginLeft: "auto",
              boxSizing: "border-box",
              marginRight: "auto",
              height: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontSize: isSmallScreen ? "0.85rem" : "1.125rem",
                fontWeight: "600",
                color: theme.palette.primary.text,
                textAlign: "center",
                paddingLeft: isSmallScreen ? "30px" : "0px",
              }}
            >
              Welcome 👋 {user ? `${user.firstName} ${user.lastName}` : "Student"}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flex: "1 1 auto",
                justifyContent: "center",
              }}
            ></Box>
 
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {/* Notifications Icon */}
              <Tooltip title="Notifications" arrow>
                <IconButton color="inherit" onClick={handleNotificationClick}>
                  <Badge badgeContent={notifications.length} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
 
              {/* Notification Popover */}
              <Popover
                open={Boolean(notificationAnchorEl)}
                anchorEl={notificationAnchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <List>
                  {notifications.map((note, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={note} />
                    </ListItem>
                  ))}
                  <ListItem>
                    <Button variant="contained" fullWidth onClick={() => navigate("/notifications")}>
                      View All
                    </Button>
                  </ListItem>
                </List>
              </Popover>
 
              {/* Dark and Light Mode Toggle Button */}
              <Tooltip
                title={
                  mode === "light"
                    ? "Dim the lights 🌚"
                    : "Let there be light 🌞"
                }
                arrow
              >
                <IconButton
                  sx={(theme) => ({
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: theme.palette.iconButton.bg,
                    boxShadow: theme.palette.iconButton.shadow,
                    cursor: "pointer",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    padding: "0px",
                    transition:
                      "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)",
                  })}
                  onClick={toggleTheme}
                >
                  {mode === "light" ? (
                    <NightsStayTwoToneIcon
                      sx={{ color: theme.palette.secondary.main }}
                    />
                  ) : (
                    <Brightness5TwoToneIcon sx={{ color: "#FFBF00" }} />
                  )}
                </IconButton>
              </Tooltip>
 
              {/* User Profile Toggle Button */}
              <Tooltip title="View Profile" arrow>
                <IconButton onClick={() => toggleDrawer(true)}>
                  <Box
                    sx={{
                      width: "50px",
                      height: "50px",
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "5px",
                      boxSizing: "border-box",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        borderRadius: "50%",
                        borderRight: "3px solid transparent",
                        borderLeft: "3px solid transparent",
                        borderTopColor: "#8F1D36",
                        borderRightColor: "#8F1D36",
                        borderBottomColor: "#8F1D36",
                        borderLeftColor: "#223D91",
                        boxSizing: "border-box",
                        animation: `${rotate} 10s linear infinite`,
                      },
                    }}
                  >
                    <Avatar
                      sx={{
                        width: "100%",
                        height: "100%",
                      }}
                      src={profilePicUrl}
                      alt={user ? `${user.firstName} ${user.lastName}` : "User"}
                    />
                  </Box>
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Toolbar>
      </Paper>
      {/* Render the ProfileDrawer */}
      <ProfileDrawer open={isDrawerOpen} toggleDrawer={toggleDrawer} />
    </>
  );
};
 
export default Header;