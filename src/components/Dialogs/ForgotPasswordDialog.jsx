// React Imports
import React, { useState } from "react";
// Material UI Imports
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment,
} from "@mui/material";
// Material Icon Imports
import EmailIcon from "@mui/icons-material/Email";
// Prop Types
import PropTypes from "prop-types";
// Image Imports
import ForgotPassword from "../../assets/Images/LoginPage/ForgotPassword.svg";
 
const ForgotPasswordDialog = ({ open, onClose, onRequest }) => {
  // States
  const [forgotEmail, setForgotEmail] = useState("");
 
  // Handlers
  const handleCancel = () => {
    setForgotEmail("");
    onClose();
  };
 
  const handleRequest = () => {
    onRequest(forgotEmail);
    setForgotEmail("");
    onClose();
  };
 
  return (
    <Dialog open={open} onClose={handleCancel}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pt: 2,
        }}
      >
        <img src={ForgotPassword} alt="Forgot Password" width={"40%"} />
      </Box>
      <DialogTitle sx={{ textAlign: "center" }}>Forgot Password</DialogTitle>
      <DialogContent>
        <Typography variant="body2" sx={{ mb: 2, textAlign: "center" }}>
          Please enter your email address to request a password reset.
        </Typography>
        <TextField
          autoFocus
          margin="dense"
          label="Email Address"
          type="email"
          fullWidth
          variant="outlined"
          value={forgotEmail}
          onChange={(e) => setForgotEmail(e.target.value)}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              borderRadius: "50px",
            },
            // Override autofill background color:
            "& input:-webkit-autofill": {
              WebkitBoxShadow: "0 0 0 1000px white inset",
              transition: "background-color 5000s ease-in-out 0s",
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            },
          }}
        />
      </DialogContent>
      <DialogActions
        sx={{
          pb: 2,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          onClick={handleCancel}
          color="primary"
          variant="outlined"
          sx={{
            borderRadius: "50px",
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleRequest}
          color="primary"
          variant="contained"
          sx={{ borderRadius: "50px" }}
        >
          Request Reset
        </Button>
      </DialogActions>
    </Dialog>
  );
};
 
ForgotPasswordDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onRequest: PropTypes.func.isRequired,
};
 
export default ForgotPasswordDialog;