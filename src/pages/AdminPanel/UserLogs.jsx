// // React Imports
// import React, { useState, useEffect } from "react";
// // Material UI Imports
// import {
//   Box,
//   TextField,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   Typography,
//   Avatar,
//   InputAdornment,
//   Tooltip,
//   Stack,
//   Snackbar,
//   Alert,
//   useTheme,
//   Slide,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth";
// // Date Picker
// import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import dayjs from "dayjs";
// // Icons Imports
// import SearchIcon from "@mui/icons-material/Search";
// import PendingActionsIcon from "@mui/icons-material/PendingActions";
// import RateReviewIcon from "@mui/icons-material/RateReview";
// // Component Imports
// //import TitleBar from "../../components/TitleBar/TitleBar";
// import LoadingAnimation from "../../components/Extras/LoadingAnimation";
// import Lottie from "lottie-react";
// // Utils and Endpoints
// import axiosInstance from "../../utils/api";
// //import { GetAllUserLogs } from "../../endpoints/AdminActionsEndpoints/AdminActionsEndpoints";

// // Helper Functions
// //import { formatDate } from "../../helpers/HelperFunctions";

// // Set base URL for images (adjust as needed)
// const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:7043";

// // Slide transition for Snackbar
// function SlideTransition(props) {
//   return <Slide {...props} direction="left" />;
// }

// const UserLogs = () => {
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   // States
//   const [logs, setLogs] = useState([]);
//   const [filteredLogs, setFilteredLogs] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [startDate, setStartDate] = useState(null); // Initialize as null
//   const [endDate, setEndDate] = useState(null); // Initialize as null
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [pageLoading, setPageLoading] = useState(true);
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   // Mock data for testing (until API is implemented)
//   const mockLogs = [
//     {
//       sdipUserLogId: 1,
//       emailAddress: "user1@example.com",
//       sdipUserLogTimeStamp: "2025-03-10T10:00:00Z",
//       sdipUserLogActivity: "Logged in",
//       sdipUserProfileImageRelativePath: "/images/user1.jpg",
//     },
//     {
//       sdipUserLogId: 2,
//       emailAddress: "user2@example.com",
//       sdipUserLogTimeStamp: "2025-03-09T15:30:00Z",
//       sdipUserLogActivity: "Updated profile",
//       sdipUserProfileImageRelativePath: "",
//     },
//     {
//       sdipUserLogId: 3,
//       emailAddress: "user3@example.com",
//       sdipUserLogTimeStamp: "2025-03-08T09:15:00Z",
//       sdipUserLogActivity: "Applied for a job",
//       sdipUserProfileImageRelativePath: "/images/user3.jpg",
//     },
//   ];

//   // Check for Super Admin access
//   useEffect(() => {
//     if (!user || user.roleName !== "SUPER ADMIN") {
//       navigate("/unauthorized-access");
//     }
//   }, [user, navigate]);

//   // Fetch logs on mount
//   useEffect(() => {
//     const fetchLogs = async () => {
//       try {
//         // Uncomment this when the API is ready
//         // const response = await axiosInstance.get(GetAllUserLogs);
//         // setLogs(response.data);

//         // Using mock data for now
//         setLogs(mockLogs);
//       } catch (error) {
//         console.error("Error fetching logs:", error);
//         setSnackbar({
//           open: true,
//           message: "Error fetching logs.",
//           severity: "error",
//         });
//       } finally {
//         setTimeout(() => {
//           setPageLoading(false);
//         }, 1000); // Reduced delay for better UX with mock data
//       }
//     };
//     fetchLogs();
//   }, []);

//   // Filter logs when logs, searchQuery, startDate, or endDate changes
//   useEffect(() => {
//     let filtered = logs;
//     if (searchQuery) {
//       filtered = filtered.filter((log) => {
//         // Search over email and activity (both lower-cased)
//         const text = (
//           log.emailAddress +
//           " " +
//           log.sdipUserLogActivity
//         ).toLowerCase();
//         return text.includes(searchQuery.toLowerCase());
//       });
//     }
//     if (startDate) {
//       const start = dayjs(startDate).startOf("day").toDate();
//       filtered = filtered.filter(
//         (log) => new Date(log.sdipUserLogTimeStamp) >= start
//       );
//     }
//     if (endDate) {
//       const end = dayjs(endDate).endOf("day").toDate();
//       filtered = filtered.filter(
//         (log) => new Date(log.sdipUserLogTimeStamp) <= end
//       );
//     }

//     // Sort logs by descending timestamp (newest first)
//     filtered = filtered.sort(
//       (a, b) =>
//         new Date(b.sdipUserLogTimeStamp) - new Date(a.sdipUserLogTimeStamp)
//     );

//     setFilteredLogs(filtered);
//     setPage(0);
//   }, [logs, searchQuery, startDate, endDate]);

//   // Pagination handlers
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleSnackbarClose = (event, reason) => {
//     if (reason === "clickaway") return;
//     setSnackbar((prev) => ({ ...prev, open: false }));
//   };

//   // Get current page of logs
//   const paginatedLogs = filteredLogs.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   // Render loading animation until page is ready
//   if (pageLoading) {
//     return <LoadingAnimation />;
//   }

//   return (
//     <ErrorBoundary>
//       <Box sx={{ p: { xs: 1, md: 2 }, my: 2, minHeight: "100vh" }}>
//         {/* Title Bar */}
//         <TitleBar title="User Logs" />

//         {/* Filter Controls */}
//         <Stack
//           direction={{ xs: "column", sm: "row" }}
//           spacing={2}
//           sx={{ my: 3 }}
//         >
//           <TextField
//             label="Search by Email or Activity"
//             variant="outlined"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             fullWidth
//             sx={{
//               "& .MuiOutlinedInput-root": {
//                 borderRadius: "50px",
//               },
//               "& input:-webkit-autofill": {
//                 WebkitBoxShadow: "0 0 0 1000px white inset",
//                 transition: "background-color 5000s ease-in-out 0s",
//               },
//             }}
//             slotProps={{
//               input: {
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <Tooltip title="Search by Email or Activity" arrow>
//                       <SearchIcon sx={{ color: theme.palette.primary.main }} />
//                     </Tooltip>
//                   </InputAdornment>
//                 ),
//               },
//             }}
//           />
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <DatePicker
//               label="Start Date"
//               value={startDate}
//               onChange={(newValue) => setStartDate(newValue)}
//               maxDate={endDate || dayjs()} // Prevent selecting future dates or dates after endDate
//               slotProps={{
//                 textField: {
//                   variant: "outlined",
//                   sx: {
//                     "& .MuiOutlinedInput-root": {
//                       borderRadius: "50px",
//                     },
//                     "& input:-webkit-autofill": {
//                       WebkitBoxShadow: "0 0 0 1000px white inset",
//                       transition: "background-color 5000s ease-in-out 0s",
//                     },
//                   },
//                 },
//               }}
//             />
//             <DatePicker
//               label="End Date"
//               value={endDate}
//               onChange={(newValue) => setEndDate(newValue)}
//               minDate={startDate} // Prevent selecting dates before startDate
//               maxDate={dayjs()} // Prevent selecting future dates
//               slotProps={{
//                 textField: {
//                   variant: "outlined",
//                   sx: {
//                     "& .MuiOutlinedInput-root": {
//                       borderRadius: "50px",
//                     },
//                     "& input:-webkit-autofill": {
//                       WebkitBoxShadow: "0 0 0 1000px white inset",
//                       transition: "background-color 5000s ease-in-out 0s",
//                     },
//                   },
//                 },
//               }}
//             />
//           </LocalizationProvider>
//         </Stack>

//         {/* Logs Table */}
//         <TableContainer
//           sx={{
//             borderRadius: "16px",
//             backgroundColor: "#FFFFFF",
//             boxShadow: theme.shadows[2],
//             "&::-webkit-scrollbar": {
//               width: "8px",
//               height: "10px",
//             },
//             "&::-webkit-scrollbar-track": {
//               backgroundColor: theme.palette.background.default,
//               borderRadius: "5px",
//             },
//             "&::-webkit-scrollbar-thumb": {
//               backgroundColor: theme.palette.primary.main,
//               borderRadius: "5px",
//             },
//             "&::-webkit-scrollbar-thumb:hover": {
//               backgroundColor: theme.palette.primary.dark,
//             },
//           }}
//         >
//           <Table size="medium" sx={{ borderCollapse: "collapse" }}>
//             <TableHead
//               sx={{
//                 backgroundColor: theme.palette.primary.main,
//               }}
//             >
//               <TableRow>
//                 <TableCell
//                   sx={{
//                     whiteSpace: "nowrap",
//                     textAlign: "center",
//                     fontWeight: "700",
//                     color: theme.palette.primary.contrastText,
//                     borderBottom: `2px solid ${theme.palette.divider}`,
//                   }}
//                 >
//                   Log ID
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     whiteSpace: "nowrap",
//                     textAlign: "center",
//                     fontWeight: "700",
//                     color: theme.palette.primary.contrastText,
//                     borderBottom: `2px solid ${theme.palette.divider}`,
//                   }}
//                 >
//                   User
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     whiteSpace: "nowrap",
//                     textAlign: "center",
//                     fontWeight: "700",
//                     color: theme.palette.primary.contrastText,
//                     borderBottom: `2px solid ${theme.palette.divider}`,
//                   }}
//                 >
//                   Timestamp
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     whiteSpace: "nowrap",
//                     textAlign: "center",
//                     fontWeight: "700",
//                     color: theme.palette.primary.contrastText,
//                     borderBottom: `2px solid ${theme.palette.divider}`,
//                   }}
//                 >
//                   Activity
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {paginatedLogs.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={4} align="center">
//                     <Box
//                       sx={{
//                         display: "flex",
//                         flexDirection: "column",
//                         alignItems: "center",
//                         gap: 2,
//                         py: 4,
//                       }}
//                     >
//                       <Lottie
//                         animationData={NoDataAnimation}
//                         style={{ width: "200px", height: "200px" }}
//                       />
//                       <Typography
//                         variant="h6"
//                         sx={{ color: theme.palette.text.secondary }}
//                       >
//                         No logs found
//                       </Typography>
//                     </Box>
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 paginatedLogs.map((log) => {
//                   const userImage =
//                     log.sdipUserProfileImageRelativePath &&
//                     log.sdipUserProfileImageRelativePath.trim() !== ""
//                       ? `${baseUrl}${log.sdipUserProfileImageRelativePath}`
//                       : "";
//                   return (
//                     <TableRow
//                       key={log.sdipUserLogId}
//                       sx={{
//                         "&:hover": {
//                           backgroundColor: theme.palette.action.hover,
//                         },
//                       }}
//                     >
//                       <TableCell align="center">
//                         <Typography variant="body2">
//                           {log.sdipUserLogId}
//                         </Typography>
//                       </TableCell>
//                       <TableCell align="center">
//                         <Box
//                           sx={{
//                             display: "flex",
//                             alignItems: "center",
//                             gap: 1,
//                             justifyContent: "center",
//                           }}
//                         >
//                           {userImage ? (
//                             <Avatar
//                               src={userImage}
//                               alt={log.emailAddress}
//                               sx={{ width: 32, height: 32 }}
//                             />
//                           ) : (
//                             <Avatar sx={{ width: 32, height: 32 }}>
//                               {log.emailAddress
//                                 ? log.emailAddress.charAt(0).toUpperCase()
//                                 : "?"}
//                             </Avatar>
//                           )}
//                           <Typography variant="body2">
//                             {log.emailAddress || "Unknown"}
//                           </Typography>
//                         </Box>
//                       </TableCell>
//                       <TableCell align="center">
//                         <Box
//                           sx={{
//                             display: "flex",
//                             alignItems: "center",
//                             gap: 1,
//                             justifyContent: "center",
//                           }}
//                         >
//                           <PendingActionsIcon
//                             sx={{ color: theme.palette.secondary.main }}
//                           />
//                           <Typography variant="body2">
//                             {formatDate(log.sdipUserLogTimeStamp)}
//                           </Typography>
//                         </Box>
//                       </TableCell>
//                       <TableCell align="center">
//                         <Box
//                           sx={{
//                             display: "flex",
//                             alignItems: "center",
//                             gap: 1,
//                             justifyContent: "center",
//                           }}
//                         >
//                           <RateReviewIcon
//                             sx={{ color: theme.palette.secondary.main }}
//                           />
//                           <Typography variant="body2">
//                             {log.sdipUserLogActivity}
//                           </Typography>
//                         </Box>
//                       </TableCell>
//                     </TableRow>
//                   );
//                 })
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         {/* Pagination */}
//         <TablePagination
//           component="div"
//           count={filteredLogs.length}
//           page={page}
//           onPageChange={handleChangePage}
//           rowsPerPage={rowsPerPage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//           sx={{
//             "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
//               color: theme.palette.text.primary,
//             },
//             "& .MuiTablePagination-actions": {
//               "& .MuiIconButton-root": {
//                 color: theme.palette.primary.main,
//               },
//             },
//           }}
//         />

//         {/* Snackbar for alerts */}
//         <Snackbar
//           open={snackbar.open}
//           autoHideDuration={3000}
//           onClose={handleSnackbarClose}
//           anchorOrigin={{ vertical: "top", horizontal: "right" }}
//           TransitionComponent={SlideTransition}
//         >
//           <Alert
//             onClose={handleSnackbarClose}
//             severity={snackbar.severity}
//             variant="filled"
//             sx={{ width: "100%" }}
//           >
//             {snackbar.message}
//           </Alert>
//         </Snackbar>
//       </Box>
//     </ErrorBoundary>
//   );
// };

// export default UserLogs;

import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  Avatar,
  InputAdornment,
  Tooltip,
  Stack,
  Snackbar,
  Alert,
  useTheme,
  Slide,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import SearchIcon from "@mui/icons-material/Search";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { useAuth } from "../../hooks/useAuth";
import { getAllUserLogs } from "../../Endpoints/AdminEndpoints";

// Set base URL for images
const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:7043";

// Slide transition for Snackbar
function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}

// Helper function to format date
const formatDate = (dateString) => {
  return dayjs(dateString).format("DD/MM/YYYY HH:mm:ss");
};

const UserLogs = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user } = useAuth();

  // States
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Check for Super Admin access
  useEffect(() => {
    if (!user || user.roleName !== "SUPER ADMIN") {
      navigate("/unauthorized-access");
    }
  }, [user, navigate]);

  // Fetch logs on mount
  useEffect(() => {
    const fetchLogs = async () => {
      setPageLoading(true);
      setError("");
      try {
        const response = await getAllUserLogs();
        setLogs(response.data || []);
      } catch (error) {
        console.error("Error fetching logs:", error);
        setError(error.response?.data?.message || "Error fetching logs.");
        setSnackbar({
          open: true,
          message: error.response?.data?.message || "Error fetching logs.",
          severity: "error",
        });
      } finally {
        setPageLoading(false);
      }
    };
    fetchLogs();
  }, []);

  // Filter logs when logs, searchQuery, startDate, or endDate changes
  useEffect(() => {
    let filtered = logs;
    if (searchQuery) {
      filtered = filtered.filter((log) => {
        const text = (
          (log.emailAddress || "") +
          " " +
          (log.sdipUserLogActivity || "")
        ).toLowerCase();
        return text.includes(searchQuery.toLowerCase());
      });
    }
    if (startDate) {
      const start = dayjs(startDate).startOf("day").toDate();
      filtered = filtered.filter(
        (log) => new Date(log.sdipUserLogTimeStamp) >= start
      );
    }
    if (endDate) {
      const end = dayjs(endDate).endOf("day").toDate();
      filtered = filtered.filter(
        (log) => new Date(log.sdipUserLogTimeStamp) <= end
      );
    }

    // Sort logs by descending timestamp (newest first)
    filtered = filtered.sort(
      (a, b) =>
        new Date(b.sdipUserLogTimeStamp) - new Date(a.sdipUserLogTimeStamp)
    );

    setFilteredLogs(filtered);
    setPage(0);
  }, [logs, searchQuery, startDate, endDate]);

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  // Get current page of logs
  const paginatedLogs = filteredLogs.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Render loading animation until page is ready
  if (pageLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 1, md: 2 }, my: 2, minHeight: "100vh" }}>
      {/* Filter Controls */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ my: 3 }}
      >
        <TextField
          label="Search by Email or Activity"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "50px",
            },
            "& input:-webkit-autofill": {
              WebkitBoxShadow: "0 0 0 1000px white inset",
              transition: "background-color 5000s ease-in-out 0s",
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Tooltip title="Search by Email or Activity" arrow>
                    <SearchIcon sx={{ color: theme.palette.primary.main }} />
                  </Tooltip>
                </InputAdornment>
              ),
            },
          }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            maxDate={endDate || dayjs()}
            slotProps={{
              textField: {
                variant: "outlined",
                sx: {
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "50px",
                  },
                  "& input:-webkit-autofill": {
                    WebkitBoxShadow: "0 0 0 1000px white inset",
                    transition: "background-color 5000s ease-in-out 0s",
                  },
                },
              },
            }}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            minDate={startDate}
            maxDate={dayjs()}
            slotProps={{
              textField: {
                variant: "outlined",
                sx: {
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "50px",
                  },
                  "& input:-webkit-autofill": {
                    WebkitBoxShadow: "0 0 0 1000px white inset",
                    transition: "background-color 5000s ease-in-out 0s",
                  },
                },
              },
            }}
          />
        </LocalizationProvider>
      </Stack>

      {/* Error Display */}
      {error && (
        <Alert
          severity="error"
          sx={{ mb: 3, borderRadius: "12px" }}
          onClose={() => setError("")}
        >
          {error}
        </Alert>
      )}

      {/* Logs Table */}
      <TableContainer
        sx={{
          borderRadius: "16px",
          backgroundColor: "#FFFFFF",
          boxShadow: theme.shadows[2],
          "&::-webkit-scrollbar": {
            width: "8px",
            height: "10px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: theme.palette.background.default,
            borderRadius: "5px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: theme.palette.primary.main,
            borderRadius: "5px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: theme.palette.primary.dark,
          },
        }}
      >
        <Table size="medium" sx={{ borderCollapse: "collapse" }}>
          <TableHead
            sx={{
              backgroundColor: theme.palette.primary.main,
            }}
          >
            <TableRow>
              <TableCell
                sx={{
                  whiteSpace: "nowrap",
                  textAlign: "center",
                  fontWeight: "700",
                  color: theme.palette.primary.contrastText,
                  borderBottom: `2px solid ${theme.palette.divider}`,
                }}
              >
                Log ID
              </TableCell>
              <TableCell
                sx={{
                  whiteSpace: "nowrap",
                  textAlign: "center",
                  fontWeight: "700",
                  color: theme.palette.primary.contrastText,
                  borderBottom: `2px solid ${theme.palette.divider}`,
                }}
              >
                User
              </TableCell>
              <TableCell
                sx={{
                  whiteSpace: "nowrap",
                  textAlign: "center",
                  fontWeight: "700",
                  color: theme.palette.primary.contrastText,
                  borderBottom: `2px solid ${theme.palette.divider}`,
                }}
              >
                Timestamp
              </TableCell>
              <TableCell
                sx={{
                  whiteSpace: "nowrap",
                  textAlign: "center",
                  fontWeight: "700",
                  color: theme.palette.primary.contrastText,
                  borderBottom: `2px solid ${theme.palette.divider}`,
                }}
              >
                Activity
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedLogs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 2,
                      py: 4,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      No logs found
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              paginatedLogs.map((log) => {
                const userImage =
                  log.sdipUserProfileImageRelativePath &&
                  log.sdipUserProfileImageRelativePath.trim() !== ""
                    ? `${baseUrl}${log.sdipUserProfileImageRelativePath}`
                    : "";
                return (
                  <TableRow
                    key={log.sdipUserLogId}
                    sx={{
                      "&:hover": {
                        backgroundColor: theme.palette.action.hover,
                      },
                    }}
                  >
                    <TableCell align="center">
                      <Typography variant="body2">
                        {log.sdipUserLogId}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          justifyContent: "center",
                        }}
                      >
                        {userImage ? (
                          <Avatar
                            src={userImage}
                            alt={log.emailAddress}
                            sx={{ width: 32, height: 32 }}
                          />
                        ) : (
                          <Avatar sx={{ width: 32, height: 32 }}>
                            {log.emailAddress
                              ? log.emailAddress.charAt(0).toUpperCase()
                              : "?"}
                          </Avatar>
                        )}
                        <Typography variant="body2">
                          {log.emailAddress || "Unknown"}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          justifyContent: "center",
                        }}
                      >
                        <PendingActionsIcon
                          sx={{ color: theme.palette.secondary.main }}
                        />
                        <Typography variant="body2">
                          {formatDate(log.sdipUserLogTimeStamp)}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          justifyContent: "center",
                        }}
                      >
                        <RateReviewIcon
                          sx={{ color: theme.palette.secondary.main }}
                        />
                        <Typography variant="body2">
                          {log.sdipUserLogActivity}
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        component="div"
        count={filteredLogs.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
            color: theme.palette.text.primary,
          },
          "& .MuiTablePagination-actions": {
            "& .MuiIconButton-root": {
              color: theme.palette.primary.main,
            },
          },
        }}
      />

      {/* Snackbar for alerts */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        TransitionComponent={SlideTransition}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserLogs;