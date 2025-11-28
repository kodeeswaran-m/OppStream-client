
import { AppBar, Toolbar, Typography, Button, Avatar, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import { logout } from "../store/actions/authActions";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { accessToken, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch<any>(logout());
    navigate("/login");
  };

  return (
    <AppBar position="fixed" sx={{ background: "#8347AD" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography 
          variant="h6" 
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          OppStream
        </Typography>

        {!accessToken ? (
          <Box>
            <Button color="inherit" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button color="inherit" onClick={() => navigate("/signup")}>
              Signup
            </Button>
          </Box>
        ) : (
          <Box display="flex" alignItems="center" gap={2}>
            <Box display="flex" alignItems="center" gap={1}>
              <Avatar sx={{ bgcolor: "#fff", color: "#1976d2" }}>
                {user?.username?.[0]?.toUpperCase()}
              </Avatar>
              <Typography>{user?.username}</Typography>
            </Box>

            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
