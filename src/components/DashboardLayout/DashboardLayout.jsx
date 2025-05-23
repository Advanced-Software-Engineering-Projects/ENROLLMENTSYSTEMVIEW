// Material UI Imports
import {
  Box,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
 
// React Imports
import { useRef, useState } from "react";
 
// Icons Imports
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Sidebar from "../Navigation/Sidebar";
import Header from "../Header/Header";
 
export default function DashboardLayout({ children, toggleTheme, mode }) {
  // Theme Variables
  const theme = useTheme();
 
  // Sidebar States
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const sidebarRef = useRef(null);
 
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
 
  // Check for small screens using useMediaQuery
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
 
  // Sidebar Collapse Toggler
  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };
 
  const toggleSidebarVisibility = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };
 
  return (
    /* Main full box START */
    <Box
      sx={{
        display: "flex",
        backgroundColor: theme.palette.background.default,
        width: "100vw",
      }}
    >
      {/* Sidebar Toggle Button Box (Hamburger Icon for small screens) */}
      {isSmallScreen && (
        <Box
          sx={{
            position: "fixed",
            top: 16,
            left: 16,
            zIndex: 1101,
          }}
        >
          <Tooltip title="Toggle Sidebar" arrow placement="top">
            <IconButton
              onClick={toggleSidebarVisibility}
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: theme.palette.secondary.main,
                boxShadow: theme.palette.iconButton.shadow,
                cursor: "pointer",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                padding: "0px",
                transition:
                  "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              {isSidebarVisible ? (
                <CloseIcon sx={{ color: theme.palette.primary.contrastText }} />
              ) : (
                <MenuIcon />
              )}
            </IconButton>
          </Tooltip>
        </Box>
      )}
 
      {/* Sidebar Toggle Box START */}
      <Box
        ref={sidebarRef}
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100%",
          flexDirection: "column",
          backgroundColor: theme.palette.sidebar.sidebarbg,
          zIndex: 1000,
          width: isSidebarCollapsed ? "88px" : "300px",
          borderRight: "1px solid rgba(0, 0, 0, 0.12)",
          transition:
            "width 0.5s cubic-bezier(0.4, 0, 0.2, 1), left 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          overflowX: "hidden",
          overflowY: "auto",
          display: isSidebarVisible ? "flex" : isSmallScreen ? "none" : "flex",
        }}
      >
        {/* Sidebar Toggle Button Box START */}
        {!isSmallScreen && (
          <Box
            sx={{
              alignItems: "center",
              justifyContent: "center",
              boxSizing: "border-box",
              outline: "0px",
              margin: "0px",
              cursor: "pointer",
              userSelect: "none",
              verticalAlign: "middle",
              appearance: "none",
              textDecoration: "none",
              textAlign: "center",
              flex: "0 0 auto",
              borderRadius: "50%",
              display: "flex",
              overflow: "visible",
              fontSize: "1.25rem",
              padding: "1px",
              top: "52px",
              position: "fixed",
              backgroundColor: theme.palette.iconButton.bg,
              zIndex: 1101,
              left: isSidebarCollapsed ? "88px" : "300px",
              border: "1px solid rgba(0, 0, 0, 0.12)",
              transition:
                "left 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              transform: `translateX(-50%) rotate(${
                isSidebarCollapsed ? "180deg" : "0deg"
              })`,
              "&:hover": {
                backgroundColor: theme.palette.primary.main200,
              },
            }}
          >
            {/* Sidebar Toggle Icon */}
            <Tooltip title="Toggle Sidebar" arrow placement="top">
              <IconButton
                onClick={toggleSidebarCollapse}
                sx={{
                  color: theme.palette.primary.main,
                  boxShadow: theme.palette.iconButton.shadow,
                  transition: theme.palette.iconButton.transition,
                  "&:hover": {
                    boxShadow: theme.palette.iconButton.hoverShadow,
                    color: theme.palette.primary.contrastText,
                  },
                }}
              >
                <MenuOpenIcon />
              </IconButton>
            </Tooltip>
          </Box>
        )}
 
        {/* Sidebar Toggle Button Box END */}
 
        {/* Side Component Call START */}
        <Sidebar isSidebarCollapsed={isSidebarCollapsed} />
        {/* Side Component Call END */}
      </Box>
      {/* Sidebar Toggle Box END */}
 
      {/* Main Content Box START */}
      <Box
        sx={{
          paddingLeft:
            !isSmallScreen && !isSidebarVisible
              ? isSidebarCollapsed
                ? "88px"
                : "300px"
              : "0",
          transition: "padding-left 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          width: "100%",
          height: "100vh",
          position: isSmallScreen && isSidebarVisible ? "fixed" : "relative",
          overflow: "auto",
          "&::-webkit-scrollbar": {
            width: "11px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#2e7bc7",
            borderRadius: "8px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#1C4C96",
          },
        }}
      >
        {/* Header Component Call START */}
        <Header
          isSidebarCollapsed={isSidebarCollapsed}
          toggleTheme={toggleTheme}
          mode={mode}
        />
        {/* Header Component Call END */}
        {/* Content Box START */}
        <Box
          sx={{
            marginTop: "60px",
            padding: isSmallScreen ? "24px 10px" : "24px 35px",
            marginBottom: "30px",
          }}
        >
          {children}
        </Box>
        {/* Content Box END */}
      </Box>
      {/* Main Content Box END */}
    </Box>
    /* Main full box END */
  );
}