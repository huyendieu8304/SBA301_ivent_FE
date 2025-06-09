import {Link, Outlet} from "react-router";
import {
    Avatar,
    Box,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Stack,
    Tooltip,
    Typography,
    useTheme
} from "@mui/material";
import MessageComponent from "../component/MessageComponent.jsx";
import {useState} from "react";
import {useAuth} from "../context/AuthContext.jsx";

const MainLayout = () => {
    const theme = useTheme();
    const [anchorElUser, setAnchorElUser] = useState(null);
    const {logout} = useAuth();

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

    const year = new Date().getFullYear();

    return (
        <>
            <Box
                component="header"
                sx={{
                    height: "6.5vh",
                    backgroundColor: "transparent",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
                }}
            >
                <Container maxWidth="xl">
                    <Stack direction="row" spacing={2} sx={{alignItems: "center", justifyContent: "space-between"}}>
                        <Stack direction="row" spacing={2}>
                            <Link to="/" style={{textDecoration: "none"}}>
                                <Avatar alt="ivent logo" src="/ivent_logo.png" sx={{height: 40, width: 40}}/>
                            </Link>
                            <Typography
                                variant="h4"
                                gutterBottom
                                sx={{color: theme.palette.primary.main, fontWeight: "bold", ml: 1}}
                            >
                                ivent
                            </Typography>
                        </Stack>
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
                                    <Typography sx={{textAlign: 'center', color: "#027A48"}}>Đăng xuất</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Stack>
                </Container>
            </Box>

            <Box sx={{height: "87vh", overflowY: "auto"}}>
                <Outlet/>
            </Box>

            <Box
                component="footer"
                sx={{
                    flexGrow: 1,
                    // height: "4.5vh",
                    backgroundColor: "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "inset 0 1px 0 rgba(0, 0, 0, 0.1)",
                }}
            >
                <Typography variant="body2" sx={{color: "#027A48"}} gutterBottom>
                    © {year} Bản quyền thuộc công ty ivent
                </Typography>
            </Box>
            <MessageComponent/>
        </>
    );
};

export default MainLayout;
