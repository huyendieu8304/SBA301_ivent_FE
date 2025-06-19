import {Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography, useTheme} from "@mui/material";
import {useState} from "react";
import {useAuth} from "../context/AuthContext.jsx";
import authSettingApi from "../api/service/authSettingApi.jsx";

const AvatarMenu = () => {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const {avatarUri, logout} = useAuth();
    const theme = useTheme();

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        handleCloseUserMenu();
        authSettingApi.logout(LogoutSuccess, LogoutFail);
        setIsLoading(true);
    }

    const LogoutSuccess = (data) => {
        logout();
        console.log(data);
        setIsLoading(false);
    }

    const LogoutFail = (e) => {
        console.log(e);
        setIsLoading(false);
    }

    return (
        <Box sx={{flexGrow: 0}}>
            <Tooltip title="Tùy chọn">
                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                    <Avatar alt="user avatar" src={avatarUri}/>
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
    )
}

export default AvatarMenu;