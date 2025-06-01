
// import { useState } from "react";
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Paper,
//   Grid,
//   Divider,
//   useTheme,
//   InputAdornment,
//   IconButton,
//   Snackbar,
//   Alert,
//   Slide,
//   Tooltip,
//   CircularProgress,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import PTEI from "../../assets/Images/Logo/Logo.png";
// import Lottie from "lottie-react";
// import LoginPageAnimation from "../../assets/Animations/LoginPage/PTEILogin.json";
// import LoginUniversity from "../../assets/Animations/LoginPage/PTEILoginUniversity.json";
// import HandWave from "../../assets/Animations/LoginPage/HandWave.json";
// import Bulb from "../../assets/Animations/LoginPage/Bulb.json";
// import EmailIcon from "@mui/icons-material/Email";
// import PasswordIcon from "@mui/icons-material/Password";
// import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import ForgotPasswordDialog from "../../components/Dialogs/ForgotPasswordDialog";

// function SlideTransition(props) {
//   return <Slide {...props} direction="left" />;
// }

// const Login = ({ onLogin }) => {
//   const navigate = useNavigate();
//   const theme = useTheme();
//   const [studentId, setStudentId] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   const handleSnackbarClose = (event, reason) => {
//     if (reason === "clickaway") return;
//     setSnackbar({ ...snackbar, open: false });
//   };

//   const handleLogin = (e) => {
//   e.preventDefault();
//   console.log('[Login] handleLogin called with studentId:', studentId);
//   setLoading(true);

//   try {
//     if (!studentId || !password) {
//       setSnackbar({
//         open: true,
//         message: "Please enter Student ID/Email and password.",
//         severity: "error",
//       });
//       setLoading(false);
//       return;
//     }

//     // Validate Student ID format: S + 8 digits + @student.usp.ac.fj
//     const studentIdRegex = /^S\d{8}@student\.usp\.ac\.fj$/;
//     const isStudent = studentIdRegex.test(studentId);
//     const isAdmin = studentId === "Admin@usp.ac.fj";

//     if (!isStudent && !isAdmin) {
//       setSnackbar({
//         open: true,
//         message: "Invalid Student ID or Admin ID format.",
//         severity: "error",
//       });
//       setLoading(false);
//       return;
//     }

//     // Simulate authentication (replace with actual API call later)
//     const role = isAdmin ? "admin" : "student";
//     const token = "dummy-token-123";
//     const userData = {
//       id: studentId,
//       name: isAdmin ? "Admin User" : `Student ${studentId.split('@')[0]}`,
//       email: studentId,
//       role: role,
//       firstName: isAdmin ? "Admin" : "Student",
//       lastName: isAdmin ? "User" : studentId.split('@')[0],
//     };

//     // Store token and user data in localStorage
//     localStorage.setItem("token", token);
//     localStorage.setItem("user", JSON.stringify(userData));

//     // Call onLogin prop with user data
//     onLogin(userData);

//     setSnackbar({
//       open: true,
//       message: "Login successful! Redirecting...",
//       severity: "success",
//     });

//     console.log('[Login] Navigating to:', role === "admin" ? "/admin-dashboard" : "/dashboard");

//     setTimeout(() => {
//       try {
//         navigate(role === "admin" ? "/admin-dashboard" : "/dashboard");
//       } catch (navError) {
//         console.error('[Login] Navigation error:', navError);
//         setSnackbar({
//           open: true,
//           message: "Navigation failed. Please try again.",
//           severity: "error",
//         });
//         setLoading(false);
//       }
//     }, 1000);
//   } catch (error) {
//     console.error('[Login] Error in handleLogin:', error);
//     setSnackbar({
//       open: true,
//       message: "An error occurred during login. Please try again.",
//       severity: "error",
//     });
//     setLoading(false);
//   }
// };

//   const [forgotOpen, setForgotOpen] = useState(false);

//   const handleForgotPasswordRequest = (studentId) => {
//     if (!studentId) {
//       setSnackbar({
//         open: true,
//         message: "Please provide a Student ID.",
//         severity: "error",
//       });
//       return;
//     }
//     setSnackbar({
//       open: true,
//       message: "Password reset request sent successfully!",
//       severity: "success",
//     });
//     setForgotOpen(false);
//   };

//   return (
//     <>
//       <Box
//         sx={{
//           backgroundColor: "#0b6468",
//           minHeight: "100vh",
//           width: "100vw",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           overflow: "auto",
//           p: { xs: 2, sm: 0 },
//         }}
//       >
//         <Paper
//           elevation={6}
//           sx={{
//             //width: { xs: "90%", sm: "600px" },
//             borderRadius: "30px",
//             backgroundColor: "#FAF9F6",
//             overflow: "hidden",
//             display: "flex",
//             alignItems: "center",
//           }}
//         >
//           <Grid container>
//             <Grid
//               item
//               xs={12}
//               md={6}
//               sx={{
//                 backgroundColor: "#FFFFFF",
//                 borderTopLeftRadius: { xs: "30px", md: "30px" },
//                 borderBottomLeftRadius: { xs: "30px", md: "30px" },
//                 borderTopRightRadius: { xs: "30px", md: 0 },
//                 borderBottomRightRadius: { xs: "30px", md: 0 },
//                 p: 3,
//                 position: "relative",
//               }}
//             >
//               <Box
//                 sx={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <Lottie
//                   animationData={HandWave}
//                   style={{ width: "80px", marginBottom: "8px" }}
//                 />
//                 <Typography
//                   variant="h5"
//                   sx={{ fontWeight: "700", color: "#0b6468", mb: 1 }}
//                 >
//                   Login
//                 </Typography>
//                 <Box sx={{ display: "flex", flexDirection: "row", gap: 0.5, mb: 1 }}>
//                   <Divider
//                     sx={{
//                       backgroundColor: theme.palette.primary.main,
//                       height: "3px",
//                       width: "25px",
//                       borderRadius: "10px",
//                     }}
//                   />
//                   <Divider
//                     sx={{
//                       backgroundColor: theme.palette.primary.main,
//                       height: "3px",
//                       width: "10px",
//                       borderRadius: "10px",
//                     }}
//                   />
//                   <Divider
//                     sx={{
//                       backgroundColor: theme.palette.primary.main,
//                       height: "3px",
//                       width: "5px",
//                       borderRadius: "10px",
//                     }}
//                   />
//                 </Box>
//                 <Typography
//                   variant="body2"
//                   sx={{ fontWeight: "500", color: "text.secondary", mb: 2 }}
//                 >
//                   USP Enrollment System
//                 </Typography>
//               </Box>
//               <Box
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   mb: 2,
//                 }}
//               >
//                 <Lottie animationData={Bulb} style={{ width: "20px", mr: 0.5 }} />
//                 <Typography
//                   variant="caption"
//                   sx={{ fontWeight: "600", color: "text.secondary" }}
//                 >
//                   Contact Admin for Access
//                 </Typography>
//               </Box>
//               <form onSubmit={handleLogin}>
//                 <TextField
//                   label="Student ID or Email"
//                   variant="outlined"
//                   fullWidth
//                   value={studentId}
//                   onChange={(e) => setStudentId(e.target.value)}
//                   onKeyDown={(e) => {
//                     if (e.key === " ") e.preventDefault();
//                   }}
//                   sx={{
//                     mb: 2,
//                     "& .MuiOutlinedInput-root": {
//                       borderRadius: "25px",
//                       backgroundColor: "#F5F5F5",
//                     },
//                     "& input:-webkit-autofill": {
//                       WebkitBoxShadow: "0 0 0 1000px #F5F5F5 inset",
//                       transition: "background-color 5000s ease-in-out 0s",
//                     },
//                   }}
//                   slotProps={{
//                     input: {
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <EmailIcon sx={{ color: "text.secondary" }} />
//                         </InputAdornment>
//                       ),
//                     },
//                   }}
//                 />
//                 <TextField
//                   id="password"
//                   label="Password"
//                   variant="outlined"
//                   fullWidth
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   onKeyDown={(e) => {
//                     if (e.key === " ") e.preventDefault();
//                   }}
//                   sx={{
//                     mb: 2,
//                     "& .MuiOutlinedInput-root": {
//                       borderRadius: "25px",
//                       backgroundColor: "#F5F5F5",
//                     },
//                     "& input:-webkit-autofill": {
//                       WebkitBoxShadow: "0 0 0 1000px #F5F5F5 inset",
//                       transition: "background-color 5000s ease-in-out 0s",
//                     },
//                   }}
//                   slotProps={{
//                     input: {
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <PasswordIcon sx={{ color: "text.secondary" }} />
//                         </InputAdornment>
//                       ),
//                       endAdornment: (
//                         <InputAdornment position="end">
//                           <Tooltip title="Toggle Password Visibility" arrow placement="top">
//                             <IconButton onClick={() => setShowPassword((prev) => !prev)}>
//                               {showPassword ? (
//                                 <VisibilityOff sx={{ color: "text.secondary" }} />
//                               ) : (
//                                 <Visibility sx={{ color: "text.secondary" }} />
//                               )}
//                             </IconButton>
//                           </Tooltip>
//                         </InputAdornment>
//                       ),
//                     },
//                   }}
//                 />
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "flex-end",
//                     alignItems: "center",
//                     mb: 2,
//                   }}
//                 >
//                   <EmojiObjectsIcon
//                     sx={{ color: theme.palette.secondary.main, mr: 0.5 }}
//                   />
//                   <Typography
//                     variant="body2"
//                     sx={{
//                       fontWeight: "600",
//                       color: theme.palette.secondary.main,
//                       textDecoration: "none",
//                       cursor: "pointer",
//                       "&:hover": { textDecoration: "underline" },
//                     }}
//                     onClick={() => setForgotOpen(true)}
//                   >
//                     Forgot password?
//                   </Typography>
//                 </Box>
//                 <Box sx={{ display: "flex", justifyContent: "center" }}>
//                   <Button
//                     type="submit"
//                     variant="contained"
//                     color="primary"
//                     disabled={loading}
//                     onClick={handleLogin} // Added fallback
//                     sx={{
//                       width: "70%",
//                       borderRadius: "25px",
//                       borderWidth: 2,
//                       padding: "10px",
//                       letterSpacing: "1px",
//                       cursor: "pointer",
//                       position: "relative",
//                       backgroundColor: "transparent",
//                       transition: "color 0.2s ease",
//                       background: "linear-gradient(135deg, #0b6468 0%, #4CAF50 100%)",
//                       "&:hover": {
//                         background: "linear-gradient(135deg, #094c50 0%, #388E3C 100%)",
//                       },
//                       "&:disabled": {
//                         background: "grey.500",
//                         opacity: 0.7,
//                       },
//                     }}
//                   >
//                     {loading ? (
//                       <CircularProgress size={24} sx={{ color: "#FFFFFF" }} />
//                     ) : (
//                       <Typography
//                         variant="button"
//                         sx={{ fontWeight: 600, fontSize: "16px", color: "#FFFFFF" }}
//                       >
//                         Login
//                       </Typography>
//                     )}
//                   </Button>
//                 </Box>
//               </form>
//               {/* <Box>
//                 <img
//                   src={LoginBorder}
//                   alt="SDIP"
//                   style={{
//                     width: "60%",
//                     position: "absolute",
//                     bottom: 0,
//                     left: 0,
//                     borderBottomLeftRadius: "30px",
//                   }}
//                 />
//               </Box> */}
//             </Grid>
//             <Grid
//               item
//               xs={12}
//               md={6}
//               sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 p: 3,
//                 background: "linear-gradient(180deg, #FAF9F6 0%, #E0F7FA 100%)",
//                 borderTopRightRadius: { md: "30px" },
//                 borderBottomRightRadius: { md: "30px" },
//               }}
//             >
//               <Lottie
//                 animationData={LoginUniversity}
//                 style={{ width: "120px", mb: 2 }}
//               />
//               <Box sx={{ textAlign: "center", mb: 2 }}>
//                 <img src={PTEI} alt="PTEI" style={{ width: "150px" }} />
//               </Box>
//               <Lottie
//                 animationData={LoginPageAnimation}
//                 style={{ width: "80%", maxWidth: "250px" }}
//               />
//             </Grid>
//           </Grid>
//         </Paper>
//       </Box>
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={3000}
//         onClose={handleSnackbarClose}
//         anchorOrigin={{ vertical: "top", horizontal: "right" }}
//         TransitionComponent={SlideTransition}
//       >
//         <Alert
//           onClose={handleSnackbarClose}
//           severity={snackbar.severity}
//           variant="filled"
//           sx={{ width: "100%" }}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//       <ForgotPasswordDialog
//         open={forgotOpen}
//         onClose={() => setForgotOpen(false)}
//         onRequest={handleForgotPasswordRequest}
//       />
//     </>
//   );
// };

// export default Login;



// import { useState } from 'react';
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Paper,
//   Grid,
//   Divider,
//   useTheme,
//   InputAdornment,
//   IconButton,
//   Snackbar,
//   Alert,
//   Slide,
//   Tooltip,
//   CircularProgress,

// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import PTEI from "../../assets/Images/Logo/Logo.png";
// import Lottie from "lottie-react";
// import LoginPageAnimation from "../../assets/Animations/LoginPage/PTEILogin.json";
// import LoginUniversity from "../../assets/Animations/LoginPage/PTEILoginUniversity.json";
// import HandWave from "../../assets/Animations/LoginPage/HandWave.json";
// import Bulb from "../../assets/Animations/LoginPage/Bulb.json";
// import EmailIcon from "@mui/icons-material/Email";
// import PasswordIcon from "@mui/icons-material/Password";
// import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import ForgotPasswordDialog from "../../components/Dialogs/ForgotPasswordDialog";
// import { login, resetPassword } from "../../Endpoints/AuthEndpoints";



// function SlideTransition(props) {
//   return <Slide {...props} direction='left' />;
// }

// const Login = () => {
//   const navigate = useNavigate();
//   const theme = useTheme();
//   const { login } = useAuth();
//   const [studentId, setStudentId] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: '',
//     severity: 'success',
//   });

//   const handleSnackbarClose = (event, reason) => {
//     if (reason === 'clickaway') return;
//     setSnackbar({ ...snackbar, open: false });
//   };

//   const handleLogin = (e) => {
//     e.preventDefault();
//     console.log('[Login] handleLogin called with studentId:', studentId);
//     setLoading(true);

//     try {
//       if (studentId && password) {
//         const role = studentId.toLowerCase().includes('admin') ? 'admin' : 'student';
//         const token = 'dummy-token-123';
//         const userData = {
//           id: studentId,
//           name: role === 'admin' ? 'Admin User' : 'John Doe',
//           email: `${studentId}@example.com`,
//           role: role,
//           firstName: role === 'admin' ? 'Admin' : 'John',
//           lastName: role === 'admin' ? 'User' : 'Doe',
//         };

//         login(userData, token);

//         setSnackbar({
//           open: true,
//           message: 'Login successful! Redirecting...',
//           severity: 'success',
//         });

//         console.log('[Login] Navigating to: /dashboard');
//         setTimeout(() => {
//           try {
//             navigate('/dashboard');
//           } catch (navError) {
//             console.error('[Login] Navigation error:', navError);
//             setSnackbar({
//               open: true,
//               message: 'Navigation failed. Please try again.',
//               severity: 'error',
//             });
//             setLoading(false);
//           }
//         }, 1000);
//       } else {
//         setSnackbar({
//           open: true,
//           message: 'Please enter Student ID and password.',
//           severity: 'error',
//         });
//         setLoading(false);
//       }
//     } catch (error) {
//       console.error('[Login] Error in handleLogin:', error);
//       setSnackbar({
//         open: true,
//         message: 'An error occurred during login. Please try again.',
//         severity: 'error',

//       });
//       setLoading(false);
//       return;
//     }

//     // Validate email/student ID format
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
//     const studentIdRegex = /^[sS]\d{8}$/; 
//     const isValidEmail = emailRegex.test(studentId);
//     const isValidStudentId = studentIdRegex.test(studentId);

//     if (!isValidEmail && !isValidStudentId) {
//       setSnackbar({
//         open: true,
//         message: "Please enter a valid Student ID (e.g., s12345678) or email address.",
//         severity: "error",
//       });
//       setLoading(false);
//       return;
//     }

//     // Validate password (e.g., minimum length)
//     if (password.length < 6) {
//       setSnackbar({
//         open: true,

//         message: "Password must be at least 6 characters long.",
//         severity: "error",

//         message: 'Please provide a Student ID.',
//         severity: 'error',

//       });
//       setLoading(false);
//       return;
//     }

//     // Make API call to login endpoint
//     const response = await login({
//       email: studentId,
//       password: password,
//     });

//     // Check if response contains the expected data
//     if (!response.data) {
//       throw new Error("Invalid response from server");
//     }

//     // Extract token and user data from response
//     const token = response.data.token || response.data.accessToken;
//     const userData = response.data.user || {
//       id: studentId,
//       email: studentId,
//       role: studentId === "Admin@usp.ac.fj" ? "admin" : "student",
//       name: studentId === "Admin@usp.ac.fj" ? "Admin User" : `Student ${studentId.split('@')[0]}`,
//       firstName: studentId === "Admin@usp.ac.fj" ? "Admin" : "Student",
//       lastName: studentId === "Admin@usp.ac.fj" ? "User" : studentId.split('@')[0],
//     };

//     if (!token || !userData) {
//       throw new Error("Missing token or user data in response");
//     }

//     // Store token and user data in localStorage
//     localStorage.setItem("token", token);
//     localStorage.setItem("user", JSON.stringify(userData));

//     // Call onLogin prop with user data
//     onLogin(userData);

//     setSnackbar({
//       open: true,
//       message: "Login successful! Redirecting...",
//       severity: "success",
//     });

//     console.log('[Login] Navigating to:', userData.role === "admin" ? "/admin-dashboard" : "/dashboard");

//     setTimeout(() => {
//       navigate(userData.role === "admin" ? "/admin-dashboard" : "/dashboard");
//     }, 1000);
//     setLoading(false);
//   }
// };

//   const [forgotOpen, setForgotOpen] = useState(false);

//  const handleForgotPasswordRequest = async (studentId) => {
//   if (!studentId) {
//     setSnackbar({
//       open: true,
//       message: "Please provide a Student ID.",
//       severity: "error",
//     });
//     return;
//   }

//   try {
//     setLoading(true);
//     await resetPassword({ email: studentId });
    
//     setSnackbar({
//       open: true,

//       message: "Password reset link sent to your email!",
//       severity: "success",

//       message: 'Password reset request sent successfully!',
//       severity: 'success',

//     });
//     setForgotOpen(false);
//   } catch (error) {
//     console.error('[Forgot Password] Error:', error);
//     let errorMessage = "Failed to send password reset request.";
    
//     if (error.response && error.response.data && error.response.data.message) {
//       errorMessage = error.response.data.message;
//     }
    
//     setSnackbar({
//       open: true,
//       message: errorMessage,
//       severity: "error",
//     });
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <>
//       <Box
//         sx={{
//           backgroundColor: '#0b6468',
//           minHeight: '100vh',
//           width: '100vw',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           overflow: 'auto',
//           p: { xs: 2, sm: 0 },
//         }}
//       >
//         <Paper
//           elevation={6}
//           sx={{
//             borderRadius: '30px',
//             backgroundColor: '#FAF9F6',
//             overflow: 'hidden',
//             display: 'flex',
//             alignItems: 'center',
//           }}
//         >
//           <Grid container>
//             <Grid
//               item
//               xs={12}
//               md={6}
//               sx={{
//                 backgroundColor: '#FFFFFF',
//                 borderTopLeftRadius: { xs: '30px', md: '30px' },
//                 borderBottomLeftRadius: { xs: '30px', md: '30px' },
//                 borderTopRightRadius: { xs: '30px', md: 0 },
//                 borderBottomRightRadius: { xs: '30px', md: 0 },
//                 p: 3,
//                 position: 'relative',
//               }}
//             >
//               <Box
//                 sx={{
//                   display: 'flex',
//                   flexDirection: 'column',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                 }}
//               >
//                 <Lottie
//                   animationData={HandWave}
//                   style={{ width: '80px', marginBottom: '8px' }}
//                 />
//                 <Typography
//                   variant='h5'
//                   sx={{ fontWeight: '700', color: '#0b6468', mb: 1 }}
//                 >
//                   Login
//                 </Typography>
//                 <Box sx={{ display: 'flex', flexDirection: 'row', gap: 0.5, mb: 1 }}>
//                   <Divider
//                     sx={{
//                       backgroundColor: theme.palette.primary.main,
//                       height: '3px',
//                       width: '25px',
//                       borderRadius: '10px',
//                     }}
//                   />
//                   <Divider
//                     sx={{
//                       backgroundColor: theme.palette.primary.main,
//                       height: '3px',
//                       width: '10px',
//                       borderRadius: '10px',
//                     }}
//                   />
//                   <Divider
//                     sx={{
//                       backgroundColor: theme.palette.primary.main,
//                       height: '3px',
//                       width: '5px',
//                       borderRadius: '10px',
//                     }}
//                   />
//                 </Box>
//                 <Typography
//                   variant='body2'
//                   sx={{ fontWeight: '500', color: 'text.secondary', mb: 2 }}
//                 >
//                   USP Enrollment System
//                 </Typography>
//               </Box>
//               <Box
//                 sx={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   mb: 2,
//                 }}
//               >
//                 <Lottie animationData={Bulb} style={{ width: '20px', mr: 0.5 }} />
//                 <Typography
//                   variant='caption'
//                   sx={{ fontWeight: '600', color: 'text.secondary' }}
//                 >
//                   Contact Admin for Access
//                 </Typography>
//               </Box>
//               <form onSubmit={handleLogin}>
//                 <TextField
//                   label='Student ID or Email'
//                   variant='outlined'
//                   fullWidth
//                   value={studentId}
//                   onChange={(e) => setStudentId(e.target.value)}
//                   onKeyDown={(e) => {
//                     if (e.key === ' ') e.preventDefault();
//                   }}
//                   sx={{
//                     mb: 2,
//                     '& .MuiOutlinedInput-root': {
//                       borderRadius: '25px',
//                       backgroundColor: '#F5F5F5',
//                     },
//                     '& input:-webkit-autofill': {
//                       WebkitBoxShadow: '0 0 0 1000px #F5F5F5 inset',
//                       transition: 'background-color 5000s ease-in-out 0s',
//                     },
//                   }}
//                   slotProps={{
//                     input: {
//                       startAdornment: (
//                         <InputAdornment position='start'>
//                           <EmailIcon sx={{ color: 'text.secondary' }} />
//                         </InputAdornment>
//                       ),
//                     },
//                   }}
//                 />
//                 <TextField
//                   id='password'
//                   label='Password'
//                   variant='outlined'
//                   fullWidth
//                   type={showPassword ? 'text' : 'password'}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   onKeyDown={(e) => {
//                     if (e.key === ' ') e.preventDefault();
//                   }}
//                   sx={{
//                     mb: 2,
//                     '& .MuiOutlinedInput-root': {
//                       borderRadius: '25px',
//                       backgroundColor: '#F5F5F5',
//                     },
//                     '& input:-webkit-autofill': {
//                       WebkitBoxShadow: '0 0 0 1000px #F5F5F5 inset',
//                       transition: 'background-color 5000s ease-in-out 0s',
//                     },
//                   }}
//                   slotProps={{
//                     input: {
//                       startAdornment: (
//                         <InputAdornment position='start'>
//                           <PasswordIcon sx={{ color: 'text.secondary' }} />
//                         </InputAdornment>
//                       ),
//                       endAdornment: (
//                         <InputAdornment position='end'>
//                           <Tooltip title='Toggle Password Visibility' arrow placement='top'>
//                             <IconButton onClick={() => setShowPassword((prev) => !prev)}>
//                               {showPassword ? (
//                                 <VisibilityOff sx={{ color: 'text.secondary' }} />
//                               ) : (
//                                 <Visibility sx={{ color: 'text.secondary' }} />
//                               )}
//                             </IconButton>
//                           </Tooltip>
//                         </InputAdornment>
//                       ),
//                     },
//                   }}
//                 />
//                 <Box
//                   sx={{
//                     display: 'flex',
//                     justifyContent: 'flex-end',
//                     alignItems: 'center',
//                     mb: 2,
//                   }}
//                 >
//                   <EmojiObjectsIcon
//                     sx={{ color: theme.palette.secondary.main, mr: 0.5 }}
//                   />
//                   <Typography
//                     variant='body2'
//                     sx={{
//                       fontWeight: '600',
//                       color: theme.palette.secondary.main,
//                       textDecoration: 'none',
//                       cursor: 'pointer',
//                       '&:hover': { textDecoration: 'underline' },
//                     }}
//                     onClick={() => setForgotOpen(true)}
//                   >
//                     Forgot password?
//                   </Typography>
//                 </Box>
//                 <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//                   <Button
//                     type='submit'
//                     variant='contained'
//                     color='primary'
//                     disabled={loading}
//                     sx={{
//                       width: '70%',
//                       borderRadius: '25px',
//                       borderWidth: 2,
//                       padding: '10px',
//                       letterSpacing: '1px',
//                       cursor: 'pointer',
//                       position: 'relative',
//                       backgroundColor: 'transparent',
//                       transition: 'color 0.2s ease',
//                       background: 'linear-gradient(135deg, #0b6468 0%, #4CAF50 100%)',
//                       '&:hover': {
//                         background: 'linear-gradient(135deg, #094c50 0%, #388E3C 100%)',
//                       },
//                       '&:disabled': {
//                         background: 'grey.500',
//                         opacity: 0.7,
//                       },
//                     }}
//                   >
//                     {loading ? (
//                       <CircularProgress size={24} sx={{ color: '#FFFFFF' }} />
//                     ) : (
//                       <Typography
//                         variant='button'
//                         sx={{ fontWeight: 600, fontSize: '16px', color: '#FFFFFF' }}
//                       >
//                         Login
//                       </Typography>
//                     )}
//                   </Button>
//                 </Box>
//               </form>
//               {/* <Box>
//                 <img
//                   src={LoginBorder}
//                   alt='SDIP'
//                   style={{
//                     width: '60%',
//                     position: 'absolute',
//                     bottom: 0,
//                     left: 0,
//                     borderBottomLeftRadius: '30px',
//                   }}
//                 />
//               </Box> */}
//             </Grid>
//             <Grid
//               item
//               xs={12}
//               md={6}
//               sx={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 p: 3,
//                 background: 'linear-gradient(180deg, #FAF9F6 0%, #E0F7FA 100%)',
//                 borderTopRightRadius: { md: '30px' },
//                 borderBottomRightRadius: { md: '30px' },
//               }}
//             >
//               <Lottie
//                 animationData={LoginUniversity}
//                 style={{ width: '120px', mb: 2 }}
//               />
//               <Box sx={{ textAlign: 'center', mb: 2 }}>
//                 <img src={PTEI} alt='PTEI' style={{ width: '150px' }} />
//               </Box>
//               <Lottie
//                 animationData={LoginPageAnimation}
//                 style={{ width: '80%', maxWidth: '250px' }}
//               />
//             </Grid>
//           </Grid>
//         </Paper>
//       </Box>
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={3000}
//         onClose={handleSnackbarClose}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//         TransitionComponent={SlideTransition}
//       >
//         <Alert
//           onClose={handleSnackbarClose}
//           severity={snackbar.severity}
//           variant='filled'
//           sx={{ width: '100%' }}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//       <ForgotPasswordDialog
//         open={forgotOpen}
//         onClose={() => setForgotOpen(false)}
//         onRequest={handleForgotPasswordRequest}
//       />
//     </>
//   );
// };

// export default Login;

import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Divider,
  useTheme,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
  Slide,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PTEI from "../../assets/Images/Logo/Logo.png";
import Lottie from "lottie-react";
import LoginPageAnimation from "../../assets/Animations/LoginPage/PTEILogin.json";
import LoginUniversity from "../../assets/Animations/LoginPage/PTEILoginUniversity.json";
import HandWave from "../../assets/Animations/LoginPage/HandWave.json";
import Bulb from "../../assets/Animations/LoginPage/Bulb.json";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ForgotPasswordDialog from "../../components/Dialogs/ForgotPasswordDialog";
import { login, resetPassword } from "../../Endpoints/AuthEndpoints";
import { jwtDecode } from "jwt-decode"; 

function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar({ ...snackbar, open: false });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("[Login] handleLogin called with studentId:", studentId);
    setLoading(true);

    try {
      if (!studentId || !password) {
        setSnackbar({
          open: true,
          message: "Please enter Student ID/Email and password.",
          severity: "error",
        });
        setLoading(false);
        return;
      }

      // Validate Student ID format: S + 8 digits + @student.usp.ac.fj or Admin email
      const studentIdRegex = /^S\d{8}@student\.usp\.ac\.fj$/;
      const isStudent = studentIdRegex.test(studentId);
      const isAdmin = studentId === "Admin@usp.ac.fj";

      if (!isStudent && !isAdmin) {
        setSnackbar({
          open: true,
          message: "Invalid Student ID or Admin ID format.",
          severity: "error",
        });
        setLoading(false);
        return;
      }

      // Prepare login DTO
      const loginDto = {
        email: studentId, // Assuming API expects email field
        password,
      };

      // Call login API
      const response = await login(loginDto);

      // Extract token from response
      const { token } = response.data;
      if (!token) {
        throw new Error("Invalid response from server: Missing token");
      }

      // Decode token to get user details
      const decoded = jwtDecode(token);
      const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      if (!role) {
        throw new Error("Missing role in token");
      }

      const user = {
        id: decoded.sub,
        email: decoded.email,
        role: role,
      };

      // Store token and user data in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Call onLogin prop with user data
      onLogin(user);

      setSnackbar({
        open: true,
        message: "Login successful! Redirecting...",
        severity: "success",
      });

      console.log(
        "[Login] Navigating to:",
        user.role === "admin" ? "/admin-dashboard" : "/dashboard"
      );

      setTimeout(() => {
        try {
          navigate(user.role === "admin" ? "/admin-dashboard" : "/dashboard");
        } catch (navError) {
          console.error("[Login] Navigation error:", navError);
          setSnackbar({
            open: true,
            message: "Navigation failed. Please try again.",
            severity: "error",
          });
          setLoading(false);
        }
      }, 1000);
    } catch (error) {
      console.error("[Login] Error in handleLogin:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Invalid credentials or server error. Please try again.";
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: "error",
      });
      setLoading(false);
    }
  };

  const [forgotOpen, setForgotOpen] = useState(false);

  const handleForgotPasswordRequest = async (studentId) => {
    try {
      if (!studentId) {
        setSnackbar({
          open: true,
          message: "Please provide a Student ID.",
          severity: "error",
        });
        return;
      }

      // Validate Student ID format
      const studentIdRegex = /^S\d{8}@student\.usp\.ac\.fj$/;
      if (!studentIdRegex.test(studentId)) {
        setSnackbar({
          open: true,
          message: "Invalid Student ID format.",
          severity: "error",
        });
        return;
      }

      // Prepare reset DTO
      const resetDto = {
        email: studentId, // Assuming API expects email field
      };

      // Call resetPassword API
      await resetPassword(resetDto);

      setSnackbar({
        open: true,
        message: "Password reset request sent successfully!",
        severity: "success",
      });
      setForgotOpen(false);
    } catch (error) {
      console.error("[Login] Error in handleForgotPasswordRequest:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to send password reset request. Please try again.";
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: "error",
      });
    }
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#0b6468",
          minHeight: "100vh",
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "auto",
          p: { xs: 2, sm: 0 },
        }}
      >
        <Paper
          elevation={6}
          sx={{
            borderRadius: "30px",
            backgroundColor: "#FAF9F6",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Grid container>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                backgroundColor: "#FFFFFF",
                borderTopLeftRadius: { xs: "30px", md: "30px" },
                borderBottomLeftRadius: { xs: "30px", md: "30px" },
                borderTopRightRadius: { xs: "30px", md: 0 },
                borderBottomRightRadius: { xs: "30px", md: 0 },
                p: 3,
                position: "relative",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Lottie
                  animationData={HandWave}
                  style={{ width: "80px", marginBottom: "8px" }}
                />
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "700", color: "#0b6468", mb: 1 }}
                >
                  Login
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", gap: 0.5, mb: 1 }}>
                  <Divider
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      height: "3px",
                      width: "25px",
                      borderRadius: "10px",
                    }}
                  />
                  <Divider
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      height: "3px",
                      width: "10px",
                      borderRadius: "10px",
                    }}
                  />
                  <Divider
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      height: "3px",
                      width: "5px",
                      borderRadius: "10px",
                    }}
                  />
                </Box>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: "500", color: "text.secondary", mb: 2 }}
                >
                  USP Enrollment System
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <Lottie animationData={Bulb} style={{ width: "20px", mr: 0.5 }} />
                <Typography
                  variant="caption"
                  sx={{ fontWeight: "600", color: "text.secondary" }}
                >
                  Contact Admin for Access
                </Typography>
              </Box>
              <form onSubmit={handleLogin}>
                <TextField
                  label="Student ID or Email"
                  variant="outlined"
                  fullWidth
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === " ") e.preventDefault();
                  }}
                  sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "25px",
                      backgroundColor: "#F5F5F5",
                    },
                    "& input:-webkit-autofill": {
                      WebkitBoxShadow: "0 0 0 1000px #F5F5F5 inset",
                      transition: "background-color 5000s ease-in-out 0s",
                    },
                  }}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon sx={{ color: "text.secondary" }} />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
                <TextField
                  id="password"
                  label="Password"
                  variant="outlined"
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === " ") e.preventDefault();
                  }}
                  sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "25px",
                      backgroundColor: "#F5F5F5",
                    },
                    "& input:-webkit-autofill": {
                      WebkitBoxShadow: "0 0 0 1000px #F5F5F5 inset",
                      transition: "background-color 5000s ease-in-out 0s",
                    },
                  }}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <PasswordIcon sx={{ color: "text.secondary" }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip title="Toggle Password Visibility" arrow placement="top">
                            <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                              {showPassword ? (
                                <VisibilityOff sx={{ color: "text.secondary" }} />
                              ) : (
                                <Visibility sx={{ color: "text.secondary" }} />
                              )}
                            </IconButton>
                          </Tooltip>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <EmojiObjectsIcon
                    sx={{ color: theme.palette.secondary.main, mr: 0.5 }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: "600",
                      color: theme.palette.secondary.main,
                      textDecoration: "none",
                      cursor: "pointer",
                      "&:hover": { textDecoration: "underline" },
                    }}
                    onClick={() => setForgotOpen(true)}
                  >
                    Forgot password?
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    onClick={handleLogin} // Added fallback
                    sx={{
                      width: "70%",
                      borderRadius: "25px",
                      borderWidth: 2,
                      padding: "10px",
                      letterSpacing: "1px",
                      cursor: "pointer",
                      position: "relative",
                      backgroundColor: "transparent",
                      transition: "color 0.2s ease",
                      background: "linear-gradient(135deg, #0b6468 0%, #4CAF50 100%)",
                      "&:hover": {
                        background: "linear-gradient(135deg, #094c50 0%, #388E3C 100%)",
                      },
                      "&:disabled": {
                        background: "grey.500",
                        opacity: 0.7,
                      },
                    }}
                  >
                    {loading ? (
                      <CircularProgress size={24} sx={{ color: "#FFFFFF" }} />
                    ) : (
                      <Typography
                        variant="button"
                        sx={{ fontWeight: 600, fontSize: "16px", color: "#FFFFFF" }}
                      >
                        Login
                      </Typography>
                    )}
                  </Button>
                </Box>
              </form>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                p: 3,
                background: "linear-gradient(180deg, #FAF9F6 0%, #E0F7FA 100%)",
                borderTopRightRadius: { md: "30px" },
                borderBottomRightRadius: { md: "30px" },
              }}
            >
              <Lottie
                animationData={LoginUniversity}
                style={{ width: "120px", mb: 2 }}
              />
              <Box sx={{ textAlign: "center", mb: 2 }}>
                <img src={PTEI} alt="PTEI" style={{ width: "150px" }} />
              </Box>
              <Lottie
                animationData={LoginPageAnimation}
                style={{ width: "80%", maxWidth: "250px" }}
              />
            </Grid>
          </Grid>
        </Paper>
      </Box>
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
      <ForgotPasswordDialog
        open={forgotOpen}
        onClose={() => setForgotOpen(false)}
        onRequest={handleForgotPasswordRequest}
      />
    </>
  );
};

export default Login;