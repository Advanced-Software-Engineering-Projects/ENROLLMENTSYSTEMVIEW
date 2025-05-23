/*
    Theme File:
    Includes~
        - Light Mode
        - Dark Mode
        - Screen Size
*/
 
import { createTheme } from "@mui/material/styles";
 
// Light Mode Theme
const LightModeTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "rgb(37, 150, 190)", //TSLS Main Maroon
      main900: "#6C1530", //Darkest shade of maroon
      main700: "#A22338", //3rd darkest shade of maroon
      main600: "#B62838", //4th darkest shade of maroon
      main500: "#C52D36", //5th darkest shade of maroon
      main400: "#CF4254", //6th darkest shade of maroon
      main300: "#DA5E6F", //7th darkest shade of maroon
      main200: "#E68996", //8th darkest shade of maroon
      main100: "#F1B7BF", //9th darkest shade of maroon
      main50: "#F9E2E5", //Lightest shade of maroon
      dark: "#6C1530",
      light: "#F9E2E5",
      contrastText: "#fff",
      text: "#000000",
      dividerLine: "#000000",
      btnText: "#8F1D36",
    },
    secondary: {
      main: "rgb(37, 150, 190)", //TSLS Main Blue
      main800: "#276ab5", //2nd darkest shade of blue
      main700: "#2e7bc7", //2nd darkest shade of blue
      main600: "#368dda", //3rd darkest shade of blue
      main500: "#3d9be7", //4th darkest shade of blue
      main400: "#54a9ea", //5th darkest shade of blue
      main300: "#70b8ed", //6th darkest shade of blue
      main200: "#96ccf3", //7th darkest shade of blue
      main100: "#bedff7", //8th darkest shade of blue
      main50: "#e4f2fb", //9th darkest shade of blue
      dark: "#1C4C96",
      light: "#e4f2fb",
      contrastText: "#fff",
    },
    sidebar: {
      sidebarText: "#919EAB", //Light Shade of Grey
      sidebarButtonHoverBg: "rgba(145, 158, 171, 0.08)",
      sidebarButtonActiveBg: "rgba(143, 29, 54, 0.4)",
      sidebarButtonTextActive: "#FFFFFF",
      sidebarIcon: "#919EAB",
      sidebarbg: "rgba(20,26,33,255)",
      sidebarToggleButton: "#1C4C96",
    },
    iconButton: {
      bg: "#F2F8FC",
      shadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
      hoverShadow: "0px 6px 20px rgba(0, 0, 0, 0.3)",
      transition: "box-shadow 0.3s ease-in-out",
    },
    background: {
      default: "#F2F8FC",
    },
    tableHeader: {
      background: "#F4F6F8",
    },
  },
  // Typography
  typography: {
    h1: { fontFamily: "Poppins, sans-serif" },
    h2: { fontFamily: "Poppins, sans-serif" },
    h3: { fontFamily: "Poppins, sans-serif" },
    h4: { fontFamily: "Poppins, sans-serif" },
    h5: { fontFamily: "Poppins, sans-serif" },
    h6: { fontFamily: "Poppins, sans-serif" },
    subtitle1: { fontFamily: "Poppins, sans-serif" },
    subtitle2: { fontFamily: "Poppins, sans-serif" },
    body1: { fontFamily: "Poppins, sans-serif" },
    body2: { fontFamily: "Poppins, sans-serif" },
    button: { fontFamily: "Poppins, monospace" },
    caption: { fontFamily: "Poppins, sans-serif" },
    overline: { fontFamily: "Poppins, sans-serif" },
  },
  // Breakpoints for responsive design
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});
 
// Dark Mode Theme
const DarkModeTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "rgb(37, 150, 190)", //TSLS Main Maroon
      main900: "#6C1530", //Darkest shade of maroon
      main700: "#A22338", //3rd darkest shade of maroon
      main600: "#B62838", //4th darkest shade of maroon
      main500: "#C52D36", //5th darkest shade of maroon
      main400: "#CF4254", //6th darkest shade of maroon
      main300: "#DA5E6F", //7th darkest shade of maroon
      main200: "#E68996", //8th darkest shade of maroon
      main100: "#F1B7BF", //9th darkest shade of maroon
      main50: "#F9E2E5", //Lightest shade of maroon
      dark: "#6C1530",
      light: "#F9E2E5",
      contrastText: "#fff",
      text: "#FFFFFF",
      dividerLine: "#FFFFFF",
      btnText: "#FFFFFF",
    },
    secondary: {
      main: "#1C4C96", //TSLS Main Blue
      main800: "#276ab5", //2nd darkest shade of blue
      main700: "#2e7bc7", //2nd darkest shade of blue
      main600: "#368dda", //3rd darkest shade of blue
      main500: "#3d9be7", //4th darkest shade of blue
      main400: "#54a9ea", //5th darkest shade of blue
      main300: "#70b8ed", //6th darkest shade of blue
      main200: "#96ccf3", //7th darkest shade of blue
      main100: "#bedff7", //8th darkest shade of blue
      main50: "#e4f2fb", //9th darkest shade of blue
      dark: "#1C4C96",
      light: "#e4f2fb",
      contrastText: "#fff",
    },
    sidebar: {
      sidebarText: "#919EAB", //Light Shade of Grey
      sidebarButtonHoverBg: "rgba(145, 158, 171, 0.08)",
      sidebarButtonActiveBg: "#094c50",
      sidebarButtonTextActive: "#FFFFFF",
      sidebarIcon: "#919EAB",
      sidebarbg: "#1C252E",
      sidebarToggleButton: "#1C4C96",
    },
    iconButton: {
      bg: "#28282B",
      shadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
      hoverShadow: "0px 6px 20px rgba(0, 0, 0, 0.3)",
      transition: "box-shadow 0.3s ease-in-out",
    },
    background: {
      default: "rgba(20,26,33,255)",
    },
    tableHeader: {
      background: "#25323D",
    },
  },
  // Typography
  typography: {
    h1: { fontFamily: "Poppins, sans-serif" },
    h2: { fontFamily: "Poppins, sans-serif" },
    h3: { fontFamily: "Poppins, sans-serif" },
    h4: { fontFamily: "Poppins, sans-serif" },
    h5: { fontFamily: "Poppins, sans-serif" },
    h6: { fontFamily: "Poppins, sans-serif" },
    subtitle1: { fontFamily: "Poppins, sans-serif" },
    subtitle2: { fontFamily: "Poppins, sans-serif" },
    body1: { fontFamily: "Poppins, sans-serif" },
    body2: { fontFamily: "Poppins, sans-serif" },
    button: { fontFamily: "Poppins, monospace" },
    caption: { fontFamily: "Poppins, sans-serif" },
    overline: { fontFamily: "Poppins, sans-serif" },
  },
  // Breakpoints for responsive design
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});
 
export { LightModeTheme, DarkModeTheme };