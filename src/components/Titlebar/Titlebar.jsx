// React Imports
import React from "react";
// Material UI Imports
import {
  Grid2,
  Paper,
  Box,
  Divider,
  Typography,
  useTheme,
} from "@mui/material";
// Image Imports
import HatMotif from "../../assets/Images/Global/HatMotif.png";
 
const TitleBar = ({ title }) => {
  // Theme Variable
  const theme = useTheme();
 
  return (
    <Grid2 container mb={12}>
      <Grid2 size={{ xs: 12 }}>
        <Paper
          sx={{
            height: "50px",
            width: "100%",
            marginTop: "20px",
            borderRadius: "16px",
          }}
        >
          <Box
            sx={{
              position: "relative",
              backgroundImage: `linear-gradient(to right, #094c50, #ffffff, #808080), url(${HatMotif})`,
              width: "100%",
              height: "100%",
              borderRadius: "16px",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "30px",
              }}
            >
              <Box
                sx={{
                  marginTop: "70px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  textAlign: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "700",
                    textTransform: "uppercase",
                    textAlign: "center",
                  }}
                >
                  {title}
                </Typography>
 
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    gap: "5px",
                    marginTop: "5px",
                  }}
                >
                  <Divider
                    sx={{
                      color: theme.palette.primary.main,
                      backgroundColor: theme.palette.primary.main,
                      height: "3px",
                      width: "180px",
                    }}
                  />
                  <Divider
                    sx={{
                      color: theme.palette.primary.main,
                      backgroundColor: theme.palette.primary.main,
                      height: "3px",
                      width: "20px",
                    }}
                  />
                  <Divider
                    sx={{
                      color: theme.palette.primary.main,
                      backgroundColor: theme.palette.primary.main,
                      height: "3px",
                      width: "10px",
                    }}
                  />
                </Box>
              </Box>
            </Box>
            {/* Hat Motif START */}
            <Box
              sx={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
              }}
            >
              <img src={HatMotif} alt="Hat Motif" width={"20%"} />
            </Box>
            {/* Hat Motif END */}
          </Box>
        </Paper>
      </Grid2>
    </Grid2>
  );
};
 
export default TitleBar;
 