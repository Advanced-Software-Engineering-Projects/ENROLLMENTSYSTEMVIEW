import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
} from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import Logo from "../../assets/Images/Logo/Logo.png";
import CardCurve from "../../assets/Images/Sidebar/CardCurve";
import DummyUser from "../../assets/Images/DummyUser/SDIPAdminUserPic.png";
import SidebarItem from "./SidebarItem";
 
// Icon Imports
import DashboardTwoToneIcon from "@mui/icons-material/DashboardTwoTone";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import PaymentIcon from "@mui/icons-material/Payment";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
 
const Sidebar = ({ isSidebarCollapsed }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
 
  // Get the logged-in user from auth hook.
  const { user } = useAuth();
 
  // Construct the profile pic URL by prefixing the relative path with your base URL.
  const baseUrl = import.meta.env.VITE_API_URL;
  const profilePicUrl =
    user && user.profilePicPath
      ? `${baseUrl}${user.profilePicPath}`
      : DummyUser;
 
  // Define navigation items. Items that require specific roles include an allowedRoles array.
  const navigationItems = [
    { kind: "header", title: "Overview" },
    {
      icon: DashboardTwoToneIcon,
      name: "Dashboard",
      onClick: () => navigate("/dashboard"),
      isActive: currentPath.startsWith("/dashboard"),
    },
    {
      icon: PersonIcon,
      name: "Profile",
      onClick: () => navigate("/profile"),
      isActive: currentPath.startsWith("/profile"),
    },
    { kind: "divider" },
    { kind: "header", title: "Academics" },
    {
      icon: SchoolIcon,
      name: "Enrollment",
      onClick: () => navigate("/enrollment"),
      isActive: currentPath.startsWith("/enrollment"),
    },
    {
      icon: SchoolIcon,
      name: "Program Audit",
      onClick: () => navigate("/program"),
      isActive: currentPath.startsWith("/program"),
    },
    {
      icon: SchoolIcon,
      name: "Grades",
      onClick: () => navigate("/grades-page"),
      isActive: currentPath.startsWith("/grades-page"),
    },
    {
      icon: PaymentIcon,
      name: "Fees",
      onClick: () => navigate("/fees"),
      isActive: currentPath.startsWith("/fees"),
    },
    {
      icon: CalendarTodayIcon,
      name: "Timetable",
      onClick: () => navigate("/timetable"),
      isActive: currentPath.startsWith("/timetable"),
    },
    {
      icon: PaymentIcon,
      name: "Forms",
      onClick: () => navigate("/forms"),
      isActive: currentPath.startsWith("/forms"),
    },
    { kind: "divider" },
    { kind: "header", title: "Admin", allowedRoles: ["SAS_MANAGER"] },
    {
      icon: AdminPanelSettingsIcon,
      name: "Admin Panel",
      onClick: () => navigate("/admin"),
      isActive: currentPath.startsWith("/admin"),
      allowedRoles: ["SAS_MANAGER"],
    },
    {
      icon: AdminPanelSettingsIcon,
      name: "Admin Forms Services",
      onClick: () => navigate("/student"),
      isActive: currentPath.startsWith("/student"),
      allowedRoles: ["student"],
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: "8px",
        }}
      >
        <Link
          onClick={() => navigate("/dashboard")}
          sx={{
            textDecoration: "none",
            width: isSidebarCollapsed ? "65px" : "65px",
            height: "100%",
            flexShrink: 0,
            display: "inline-flex",
            verticalAlign: "middle",
            paddingBottom: "3px",
            borderRadius: "40px",
            justifyContent: "center",
            transition: "width 0.5s ease",
          }}
        >
          <Box
            sx={{
              width: "320px",
              display: "flex",
              transform: "rotate(180deg)",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "-60px",
              position: "absolute",
            }}
          >
            <CardCurve style={{ width: "320px", height: "100%" }} />
          </Box>
          <img
            src={isSidebarCollapsed ? Logo : Logo}
            alt="logo"
            width={isSidebarCollapsed ? "70px" : "70px"}
            height="auto"
            style={{
              transition: "opacity 0.5s ease",
              transformOrigin: "center",
              zIndex: 1,
              marginTop: "5px",
              cursor: "pointer",
            }}
          />
        </Link>
      </Box>
      <Box
        sx={{
          padding: "16px",
          backgroundColor: "#rgb(37, 150, 190)",
          borderRadius: "8px",
        }}
      >
        <Stack spacing={2}>
          <Box>
            {filteredNavigationItems.map((item, index) => {
              if (item.kind === "header") {
                return (
                  <Box key={index} sx={{ mb: 1 }}>
                    <ListSubheader
                      sx={{
                        backgroundColor: "transparent",
                        fontWeight: "bold",
                        color:
                          item.title === "Overview" || item.title === "Academics"
                            ? "#ffffff"
                            : theme.palette.text.primary,
                      }}
                    >
                      {item.title}
                    </ListSubheader>
                  </Box>
                );
              } else if (item.kind === "divider") {
                return <Divider key={index} />;
              } else {
                return (
                  <SidebarItem
                    key={index}
                    {...item}
                    isSidebarCollapsed={isSidebarCollapsed}
                  />
                );
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
              alt={user ? `${user.firstName} ${user.lastName}` : "User"}
            />
          </Box>
          <Stack alignItems="center">
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: "bold", color: "#ffffff" }}
            >
              {user ? `${user.firstName} ${user.lastName}` : ""}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user ? user.email : ""}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};
 
export default Sidebar;