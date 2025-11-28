import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#8347AD",  
    },
    secondary: {
      main: "#6A1B9A",  
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
        }
      }
    }
  }
});

export default theme;
