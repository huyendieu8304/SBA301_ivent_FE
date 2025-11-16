import {Link, Outlet, useNavigate} from "react-router";
import {
    Box, Button,
    Divider, Drawer,
    ListItem, ListItemButton, ListItemIcon, ListItemText,
    Stack,
    Typography, useTheme,
} from "@mui/material";
import List from '@mui/material/List';
import {
    Dashboard as DashboardIcon,
    Event as EventIcon,
    CheckCircle as CheckCircleIcon,
    AccountCircle as AccountCircleIcon,
    Logout as LogoutIcon,
    ListAlt as ListAltIcon,
} from '@mui/icons-material';

import React, {useState, Fragment} from "react";
import {useAuth} from "../context/AuthContext.jsx";
import '@fontsource/comfortaa/700.css';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import AvatarMenu from "../component/AvatarMenu.jsx";
import LoadingComponent from "../component/LoadingComponent.jsx";
import authSettingApi from "../api/service/authSettingApi.jsx";

const drawerWidth = 240;

const OperatorLayout = () => {
    const [pageTitle, setPageTitle] = useState("");
    const {authorities, logout} = useAuth();
    const theme = useTheme();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const handleLogout = () => {
        authSettingApi.logout(LogoutSuccess, LogoutFail);
        setIsLoading(true);
    }
    const LogoutSuccess = (data) => {
        logout();
        console.log(data);
    }

    const LogoutFail = (e) => {
        console.log(e);
        navigate("/error", {
            state: {
                message: e.response.data.message,
                code: e.status,
            }
        })
    }
    return (
        <>
            <Box sx={{ display: 'flex', minHeight: "100dvh", margin: 0, padding: 0 }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, height: "8.5vh"}}
                >
                    <Toolbar sx={{height: "100%", minHeight: "0 !important"}}>
                            <Stack direction="row" spacing={2} sx={{alignItems: "center", justifyContent: "space-between", width: "100%"}}>
                                <Stack direction="row" spacing={2} sx={{height: "8.5vh", minHeight: "0 !important", alignItems: "center", justifyContent: "center"}}>
                                    <Link to="/" style={{textDecoration: "none"}}>
                                        <Typography
                                            variant="h5"
                                            gutterBottom
                                            sx={{color: "white", fontFamily: 'Comfortaa', fontWeight: 700, margin: 0}}
                                        >
                                            {pageTitle}
                                        </Typography>
                                    </Link>
                                </Stack>
                                {authorities ?
                                    <>
                                        <Stack direction="row" spacing={2}>
                                            <Button variant="outlined"
                                                    sx={{textTransform: "none", borderColor: "white", borderRadius: "10px"}}>
                                                <Typography
                                                    variant="subtitle1"
                                                    sx={{color: "white", fontFamily: 'Arial', fontSize: "14px"}}
                                                >
                                                    Tạo sự kiện
                                                </Typography>
                                            </Button>
                                            <AvatarMenu setIsLoading={setIsLoading} />
                                        </Stack>
                                    </>
                                    :
                                    <Stack direction="row" spacing={0.5} justifyContent="center" alignItems="center">
                                        <Button sx={{color: "white", textTransform: "none"}} onClick={() => navigate("/login")}>
                                            Đăng nhập
                                        </Button>
                                        <Typography sx={{color: "white"}}>|</Typography>
                                        <Button sx={{color: "white", textTransform: "none"}}
                                                onClick={() => navigate("/register")}>
                                            Đăng ký
                                        </Button>
                                    </Stack>
                                }
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
                        height: "100%",
                    }}
                    variant="permanent"
                    anchor="left"
                >
                    <Stack direction="row" spacing={2} sx={{height: "8.5vh", minHeight: "0 !important", alignItems: "center", justifyContent: "center"}}>
                        <Link to="/" style={{textDecoration: "none"}}>
                            <Typography
                                variant="h3"
                                gutterBottom
                                sx={{color: "#12B76A", fontFamily: 'Comfortaa', fontWeight: 700, margin: 0}}
                            >
                                ivent
                            </Typography>
                        </Link>
                    </Stack>
                    <Divider />
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to="/operator">
                                <ListItemIcon><DashboardIcon /></ListItemIcon>
                                <ListItemText primary="Thống kê" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to="/event">
                                <ListItemIcon><EventIcon /></ListItemIcon>
                                <ListItemText primary="Quản lý sự kiện" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to="/approve">
                                <ListItemIcon><CheckCircleIcon /></ListItemIcon>
                                <ListItemText primary="Phê duyệt sự kiện" />
                            </ListItemButton>
                        </ListItem>
                    </List>

                    <Divider />
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to="#">
                                <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                                <ListItemText primary="Thông tin tài khoản" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to="/event">
                                <ListItemIcon><ListAltIcon /></ListItemIcon>
                                <ListItemText primary="Danh sách sự kiện" />
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
                    <Toolbar sx={{height: "8.5vh", minHeight: "0 !important",}}/>
                    <Box sx={{
                        flexGrow: 1,
                        overflowY: "auto",
                    }}>
                        <Box sx={{ padding: 3 }}>
                            <Outlet context={{ setPageTitle }} />
                        </Box>
                    </Box>
                </Box>
            </Box>
            {isLoading && <LoadingComponent/>}
        </>
    );
};

export default OperatorLayout;
