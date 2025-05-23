// React Imports
import React from "react";
// Lottie Imports
import Lottie from "lottie-react";
import LoadingtText from "../../assets/Animations/LoadingPage/LoadingAnimation.json";
// Material UI Imports
import { Box } from "@mui/material";
 
const LoadingAnimation = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "auto",
      }}
    >
      <Box
        sx={{
          width: "40%",
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Lottie animationData={LoadingtText} loop={true} />
      </Box>
    </Box>
  );
};
 
export default LoadingAnimation;
 