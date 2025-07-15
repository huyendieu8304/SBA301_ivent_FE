import {Link, Outlet, useNavigate} from "react-router";
import {
    Box, Button,
    Divider, Drawer,
    ListItem, ListItemButton, ListItemIcon, ListItemText,
    Stack,
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
import AvatarMenu from "../component/AvatarMenu.jsx";
import AddIcon from '@mui/icons-material/Add';
import ListIcon from '@mui/icons-material/List';

const drawerWidth = 240;

const OrganizerLayout = () => {
    const [pageTitle, setPageTitle] = useState("");
    const {authorities} = useAuth();
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <Box sx={{display: 'flex', minHeight: "100dvh", margin: 0, padding: 0}}>
            <CssBaseline/>
            <AppBar
                position="fixed"
                sx={{width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, height: "8.5vh"}}
            >
                <Toolbar sx={{height: "100%", minHeight: "0 !important"}}>
                    <Stack direction="row" spacing={2}
                           sx={{alignItems: "center", justifyContent: "space-between", width: "100%"}}>
                        <Stack direction="row" spacing={2} sx={{
                            height: "8.5vh",
                            minHeight: "0 !important",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
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
                        {authorities ? (
                            <Stack direction="row" spacing={2}>
                                <Button variant="outlined"
                                        sx={{textTransform: "none", borderColor: "white", borderRadius: "10px"}}
                                        onClick={() => navigate("create-event")}
                                >
                                    <Typography
                                        variant="subtitle1"
                                        sx={{color: "white", fontFamily: 'Arial', fontSize: "14px"}}
                                    >
                                        Tạo sự kiện
                                    </Typography>
                                </Button>
                                <AvatarMenu/>
                            </Stack>
                        ) : (
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
                        )
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
                <Stack direction="row" spacing={2} sx={{
                    height: "8.5vh",
                    minHeight: "0 !important",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
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
                <Divider/>
                <List>
                    {/*{['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (*/}
                        <ListItem key={1} disablePadding>
                            <ListItemButton onClick={() => navigate("my-events")}>
                                <ListItemIcon>
                                     <ListIcon/>
                                </ListItemIcon>
                                <ListItemText primary={"Sự kiện của tôi"}/>
                            </ListItemButton>
                        </ListItem>

                        <ListItem key={2} disablePadding>
                            <ListItemButton onClick={() => navigate("create-event")}>
                                <ListItemIcon>
                                     <AddIcon/>
                                </ListItemIcon>
                                <ListItemText primary={"Tạo sự kiện"}/>
                            </ListItemButton>
                        </ListItem>
                    {/*))}*/}
                </List>
                {/*<Divider/>*/}
                {/*<List>*/}
                {/*    {['All mail', 'Trash', 'Spam'].map((text, index) => (*/}
                {/*        <ListItem key={text} disablePadding>*/}
                {/*            <ListItemButton>*/}
                {/*                <ListItemIcon>*/}
                {/*                    {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}*/}
                {/*                </ListItemIcon>*/}
                {/*                <ListItemText primary={text}/>*/}
                {/*            </ListItemButton>*/}
                {/*        </ListItem>*/}
                {/*    ))}*/}
                {/*</List>*/}
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
                    <Box sx={{padding: 3}}>
                        <Outlet context={{setPageTitle}}/>
                    </Box>
                </Box>
            </Box>
        </Box>

    );
};

export default OrganizerLayout;
