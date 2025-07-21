
import {Link, Outlet, useNavigate} from "react-router";
import {
  Dashboard as DashboardIcon,
} from '@mui/icons-material';
import {
    Box, Button,
    Divider, Drawer,
    ListItem, ListItemButton, ListItemIcon, ListItemText,
    Stack,
    Typography, useTheme,
} from "@mui/material";
import List from '@mui/material/List';
import React, {useState, Fragment} from "react";
import {useAuth} from "../context/AuthContext.jsx";
import '@fontsource/comfortaa/700.css';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import AvatarMenu from "../component/AvatarMenu.jsx";
import LoadingComponent from "../component/LoadingComponent.jsx";
import authSettingApi from "../api/service/authSettingApi.jsx";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
const drawerWidth = 240;

const AdminLayout = () => {
  const [pageTitle, setPageTitle] = useState("Trang quản trị viên");
  const { authorities, logout } = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    authSettingApi.logout(LogoutSuccess, LogoutFail);
    setIsLoading(true);
  };

  const LogoutSuccess = (data) => {
    logout();
    console.log(data);
  };

  const LogoutFail = (e) => {
    console.log(e);
    navigate("/error", {
      state: {
        message: e.response?.data?.message || "Đã xảy ra lỗi.",
        code: e.status || 500,
      }
    });
  };

  return (
    <>
      <Box sx={{ display: 'flex', minHeight: "100dvh" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, height: "8.5vh" }}
        >
          <Toolbar sx={{ height: "100%", minHeight: "0 !important" }}>
            <Stack direction="row" spacing={2} sx={{ alignItems: "center", justifyContent: "space-between", width: "100%" }}>
              <Typography
                variant="h5"
                sx={{ color: "white", fontFamily: 'Comfortaa', fontWeight: 700 }}
              >
                {pageTitle}
              </Typography>
              {authorities && (
                <AvatarMenu setIsLoading={setIsLoading} />
              )}
            </Stack>
          </Toolbar>
        </AppBar>

        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Stack direction="row" spacing={2} sx={{ height: "8.5vh", alignItems: "center", justifyContent: "center" }}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Typography
                variant="h3"
                sx={{ color: "#12B76A", fontFamily: 'Comfortaa', fontWeight: 700 }}
              >
                ivent
              </Typography>
            </Link>
          </Stack>
          <Divider />

          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/admin/statistic">
                <ListItemIcon><DashboardIcon /></ListItemIcon>
                <ListItemText primary="Thống kê" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/admin/account">
                <ListItemIcon><SettingsIcon /></ListItemIcon>
                <ListItemText primary="Quản lý tài khoản" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/admin/create-admin-account">
                <ListItemIcon><AdminPanelSettingsIcon /></ListItemIcon>
                <ListItemText primary="Tạo tài khoản quản trị viên" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton component={Link} to="/admin/users-ban-list">
                <ListItemIcon><SettingsIcon /></ListItemIcon>
                <ListItemText primary="Danh sách người dùng" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon><LogoutIcon /></ListItemIcon>
                <ListItemText primary="Đăng xuất" />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            backgroundColor: theme.palette.backgroundColor.main,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Toolbar sx={{ height: "8.5vh", minHeight: "0 !important" }} />
          <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
            <Box sx={{ padding: 3 }}>
              <Outlet context={{ setPageTitle }} />
            </Box>
          </Box>
        </Box>
      </Box>

      {isLoading && <LoadingComponent />}
    </>
  );
};

export default AdminLayout;
