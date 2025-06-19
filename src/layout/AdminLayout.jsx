import {Link, Outlet, useNavigate} from "react-router";
import {
    Avatar,
    Box, Button,
    Divider, Drawer,
    IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText,
    Menu,
    MenuItem,
    Stack,
    Tooltip,
    Typography, useTheme,
} from "@mui/material";
import List from '@mui/material/List';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MessageComponent from "../component/MessageComponent.jsx";
import React, {useState, Fragment} from "react";
import {useAuth} from "../context/AuthContext.jsx";
import '@fontsource/comfortaa/700.css';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import TicketIconSvg from "../component/svg/TicketIconSvg.jsx";

const drawerWidth = 240;

const AdminLayout = () => {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [pageTitle, setPageTitle] = useState("");
    const {authorities, logout} = useAuth();
    const theme = useTheme();
    const navigate = useNavigate();

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        handleCloseUserMenu();
        logout();
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
                                            <Box sx={{flexGrow: 0}}>
                                                <Tooltip title="Tùy chọn">
                                                    <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                                        <Avatar alt="user avatar" src="/static/images/avatar/2.jpg"/>
                                                    </IconButton>
                                                </Tooltip>
                                                <Menu
                                                    sx={{mt: '45px'}}
                                                    id="menu-appbar"
                                                    anchorEl={anchorElUser}
                                                    anchorOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'right',
                                                    }}
                                                    keepMounted
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'right',
                                                    }}
                                                    open={Boolean(anchorElUser)}
                                                    onClose={handleCloseUserMenu}
                                                >
                                                    <MenuItem onClick={handleLogout}>
                                                        <Typography sx={{
                                                            textAlign: 'center',
                                                            color: theme.palette.primary.main,
                                                            margin: "0 6px"
                                                        }}>Đăng xuất</Typography>
                                                    </MenuItem>
                                                </Menu>
                                            </Box>
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
                        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {['All mail', 'Trash', 'Spam'].map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
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
            <MessageComponent/>
        </>
    );
};

export default AdminLayout;
