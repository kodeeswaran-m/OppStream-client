import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./store/index.ts";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import { SnackbarProvider } from "./context/SnackbarContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SnackbarProvider>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline /> 
          <App />
        </ThemeProvider>
      </Provider>
    </SnackbarProvider>
  </StrictMode>
);
