import {Link, Outlet, useNavigate} from "react-router";
import {
    Box, Button,
    Container, Divider,
    InputBase,
    Paper,
    Stack,
    Typography, useTheme,
} from "@mui/material";
import {useAuth} from "../context/AuthContext.jsx";
import '@fontsource/comfortaa/700.css';
import TicketIconSvg from "../component/svg/TicketIconSvg.jsx";
import SearchIcon from '@mui/icons-material/Search';
import AvatarMenu from "../component/AvatarMenu.jsx";
import LoadingComponent from "../component/LoadingComponent.jsx";
import {useState} from "react";

const MainLayout = () => {
    const {authorities} = useAuth();
    const theme = useTheme();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const year = new Date().getFullYear();

    return (
        <>
            <Box
                component="header"
                sx={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "8.5vh",
                    backgroundColor: theme.palette.primary.main,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
                    zIndex: 1100,
                }}
            >
                <Container maxWidth="lg">
                    <Stack direction="row" spacing={2} sx={{alignItems: "center", justifyContent: "space-between"}}>
                        <Stack direction="row" spacing={2}>
                            <Link to="/" style={{textDecoration: "none"}}>
                                {/*<Avatar alt="ivent logo" src="/ivent_logo.png" sx={{height: 40, width: 40}}/>*/}
                                <Typography
                                    variant="h3"
                                    gutterBottom
                                    sx={{color: "white", fontFamily: 'Comfortaa', fontWeight: 700, margin: 0}}
                                >
                                    ivent
                                </Typography>
                            </Link>
                        </Stack>
                        {authorities ?
                            <>
                                <Paper
                                    component="form"
                                    sx={{p: '0px 4px', display: 'flex', alignItems: 'center', width: 400}}
                                >
                                    <SearchIcon sx={{p: '10px', color: "#BDBDBD"}}/>
                                    <InputBase
                                        sx={{ml: 1, flex: 1}}
                                        placeholder="Bạn tìm gì hôm nay?"
                                    />
                                    <Divider sx={{height: 28, m: 0.5}} orientation="vertical"/>
                                    <Button sx={{
                                        textTransform: "none",
                                        borderRadius: "10px"
                                    }}>
                                        <Typography
                                            variant="subtitle1"
                                            sx={{color: "black", fontFamily: 'Arial', fontSize: "14px"}}
                                        >
                                            Tìm kiếm
                                        </Typography>
                                    </Button>
                                </Paper>
                                <Stack direction="row" spacing={3}>
                                    <Button variant="outlined"
                                            sx={{textTransform: "none", borderColor: "white", borderRadius: "10px"}}>
                                        <Typography
                                            variant="subtitle1"
                                            sx={{color: "white", fontFamily: 'Arial', fontSize: "14px"}}
                                        >
                                            Tạo sự kiện
                                        </Typography>
                                    </Button>
                                    <Button sx={{textTransform: "none", borderColor: "white", padding: 0}}>
                                        <Stack direction="row" spacing={0.5} justifyContent="center"
                                               alignItems="center">
                                            <TicketIconSvg style={{color: "white", fontSize: "20px"}}/>
                                            <Typography
                                                variant="subtitle1"
                                                sx={{color: "white", fontFamily: 'Arial', fontSize: "14px"}}
                                            >
                                                Vé đã mua
                                            </Typography>
                                        </Stack>
                                    </Button>
                                </Stack>
                                <AvatarMenu setIsLoading={setIsLoading} />
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
                </Container>
            </Box>

            <Box sx={{
                position: "fixed",
                top: "8.5vh",
                left: 0,
                right: 0,
                height: "91.5vh",
                overflowY: "auto",
                backgroundColor: theme.palette.backgroundColor.main,
            }}>
                <Box component="main" sx={{minHeight:"85vh", }}>
                    <Box sx={{padding: "24px"}}>
                        <Outlet/>
                    </Box>
                </Box>
                <Box
                    component="footer"
                    sx={{
                        height: "6.5vh",
                        backgroundColor: "#1D1D1D",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "inset 0 1px 0 rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <Typography variant="body2" sx={{color: "#B3B3B3", margin: 0}} gutterBottom>
                        © {year} Bản quyền thuộc công ty ivent
                    </Typography>
                </Box>
            </Box>
            {isLoading && <LoadingComponent/>}
        </>
    );
};

export default MainLayout;
