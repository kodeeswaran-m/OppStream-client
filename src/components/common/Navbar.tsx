import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
 
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
  const location = useLocation();
 
  const { user, accessToken } = useSelector((state: RootState) => state.auth);
  const isLoggedIn = Boolean(accessToken);
  const role = user?.role as UserRole | undefined;
 
  const [openDrawer, setOpenDrawer] = useState(false);
 
  const handleLogout = () => dispatch(logout());
 
  // Menu for profile icon
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
 
  // ACTIVE UNDERLINE STYLE
  const activeStyle = {
    borderBottom: "3px solid white",
    borderRadius: 0,
    paddingBottom: "4px",
    fontWeight: "bold",
  };
 
  // Menu Items based on role
  const menuItems =
    role && routeConfig[role]
      ? routeConfig[role]
          .filter((r) => r.label)
          .map((r) => ({ label: r.label!, path: r.path }))
      : [];
 
  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "#8347AD" }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "94%",
            maxWidth: "1200px",
            margin: "0 auto",
            minHeight: "46px !important",
            padding: "4px 0",
          }}
        >
          {/* LEFT SIDE - LOGO */}
          <Typography
            variant="h10"
            to="/"
            style={{ color: "white", textDecoration: "none" , marginLeft:"-50px"}}
          >
            Opp X Stream
          </Typography>
 
          {/* RIGHT SIDE - DESKTOP MENU */}
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 ,marginRight:"-100px"}}>
              {!isLoggedIn && (
                <>
                  <Button
                    component={Link}
                    to="/login"
                    sx={{
                      color: "white",
                      ...(location.pathname === "/login" ? activeStyle : {}),
                    }}
                  >
                    Login
                  </Button>
 
                  <Button
                    component={Link}
                    to="/signup"
                    sx={{
                      color: "white",
                      ...(location.pathname === "/signup" ? activeStyle : {}),
                    }}
                  >
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
                    sx={{
                      color: "white",
                      ...(location.pathname === item.path ? activeStyle : {}),
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
 
              {/* PROFILE ICON */}
              {isLoggedIn && (
                <>
                  <IconButton sx={{ color: "white" }} onClick={handleClick}>
                    <AccountCircleIcon sx={{ fontSize: 30 }} />
                  </IconButton>
 
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                  >
                    <MenuItem disabled>
                      <Box>
                        <Typography fontWeight="bold">{user?.username}</Typography>
                        <Typography variant="body2">{user?.email}</Typography>
                      </Box>
                    </MenuItem>
 
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        window.location.href = "/employee/form";
                      }}
                    >
                      Update Profile
                    </MenuItem>
 
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        handleLogout();
                      }}
                    >
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              )}
            </Box>
          )}
 
          {/* MOBILE MENU ICON */}
          {isMobile && (
            <IconButton color="inherit" onClick={() => setOpenDrawer(true)}>
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
                  <ListItemButton
                    component={Link}
                    to="/login"
                    selected={location.pathname === "/login"}
                  >
                    <ListItemText primary="Login" />
                  </ListItemButton>
                </ListItem>
 
                <ListItem disablePadding>
                  <ListItemButton
                    component={Link}
                    to="/signup"
                    selected={location.pathname === "/signup"}
                  >
                    <ListItemText primary="Signup" />
                  </ListItemButton>
                </ListItem>
              </>
            )}
 
            {isLoggedIn &&
              menuItems.map((item) => (
                <ListItem key={item.path} disablePadding>
                  <ListItemButton
                    component={Link}
                    to={item.path}
                    selected={location.pathname === item.path}
                  >
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </ListItem>
              ))}
 
            {/* MOBILE PROFILE SECTION */}
            {isLoggedIn && (
              <>
                <ListItem>
                  <ListItemText
                    primary={user?.username}
                    secondary={user?.email}
                  />
                </ListItem>
 
                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/employee/update">
                    <ListItemText primary="Update Profile" />
                  </ListItemButton>
                </ListItem>
 
                <ListItem disablePadding>
                  <ListItemButton onClick={handleLogout}>
                    <ListItemText primary="Logout" />
                  </ListItemButton>
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};
 
export default Navbar;