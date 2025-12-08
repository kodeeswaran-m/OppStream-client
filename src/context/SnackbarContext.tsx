import { createContext, useContext, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
interface ProviderProps {
  children: React.ReactNode;
}
interface SnackbarContextType {
  showMessage: (message: string, duration?: number) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export const SnackbarProvider = ({ children }: ProviderProps) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const showMessage = (msg: string, duration = 3000) => {
    setMessage(msg);
    setOpen(true);
    setTimeout(() => setOpen(false), duration);
  };

  return (
    <SnackbarContext.Provider value={{ showMessage }}>
      {children}

      <Snackbar
        ContentProps={{
          sx: {
            backgroundColor: "#8347AD",
            color: "white",
            fontWeight: "500",
            borderRadius: "6px",
          },
        }}
        open={open}
        message={message}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        action={
          <IconButton onClick={() => setOpen(false)} color="inherit">
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used inside SnackbarProvider");
  }
  return context;
};
