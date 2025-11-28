import { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import type { UserRole } from "../../routes/routeTypes";
import { routeConfig } from "../../routes/RouteConfig";
import { logout } from "../../store/actions/authActions";
import type { ThunkDispatch } from "redux-thunk";
import type { AnyAction } from "redux";

type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;

const Navbar = () => {
  const dispatch: AppDispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const { user, accessToken } = useSelector((state: RootState) => state.auth);
  const isLoggedIn = Boolean(accessToken);
  const role = user?.role as UserRole | undefined;

  const [openDrawer, setOpenDrawer] = useState(false);

  const handleLogout = () => dispatch(logout());

  // ---- MENU ITEMS BASED ON ROLE ----
  const menuItems =
    role && routeConfig[role]
      ? routeConfig[role]
          .filter((r) => r.label)
          .map((r) => ({ label: r.label!, path: r.path }))
      : [];

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#8347AD" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* LOGO */}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            style={{ color: "white", textDecoration: "none" }}
          >
            Opp X Stream
          </Typography>

          {/* DESKTOP MENU */}
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {!isLoggedIn && (
                <>
                  <Button component={Link} to="/login" sx={{ color: "white" }}>
                    Login
                  </Button>
                  <Button component={Link} to="/signup" sx={{ color: "white" }}>
                    Signup
                  </Button>
                </>
              )}

              {isLoggedIn &&
                menuItems.map((item) => (
                  <Button
                    key={item.path}
                    component={Link}
                    to={item.path}
                    sx={{ color: "white" }}
                  >
                    {item.label}
                  </Button>
                ))}

              {isLoggedIn && (
                <Button
                  onClick={handleLogout}
                  sx={{
                    color: "white",
                    border: "1px solid white",
                    ml: 2,
                    px: 2,
                  }}
                >
                  Logout
                </Button>
              )}
            </Box>
          )}

          {/* MOBILE MENU ICON */}
          {isMobile && (
            <IconButton
              color="inherit"
              onClick={() => setOpenDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* MOBILE DRAWER */}
      <Drawer anchor="right" open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <Box sx={{ width: 250, padding: 2 }}>
          <Typography variant="h6" mb={1}>
            Menu
          </Typography>

          <List>
            {!isLoggedIn && (
              <>
                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/login">
                    <ListItemText primary="Login" />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/signup">
                    <ListItemText primary="Signup" />
                  </ListItemButton>
                </ListItem>
              </>
            )}

            {isLoggedIn &&
              menuItems.map((item) => (
                <ListItem key={item.path} disablePadding>
                  <ListItemButton component={Link} to={item.path}>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </ListItem>
              ))}

            {isLoggedIn && (
              <ListItem disablePadding>
                <ListItemButton onClick={handleLogout}>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;


