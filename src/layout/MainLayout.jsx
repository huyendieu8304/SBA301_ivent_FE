import {Outlet, useNavigate} from "react-router";
import {
    Box, Button,
    Container,
    Stack,
    Typography, useTheme,
} from "@mui/material";
import {useAuth} from "../context/AuthContext.jsx";
import '@fontsource/comfortaa/700.css';
import TicketIconSvg from "../component/svg/TicketIconSvg.jsx";
import AvatarMenu from "../component/AvatarMenu.jsx";
import LoadingComponent from "../component/LoadingComponent.jsx";
import {useState} from "react";
import LogoAndSearch from "../component/LogoAndSearch.jsx";

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
                        <LogoAndSearch/>
                        {authorities ?
                            <>
                                <Stack direction="row" spacing={3}>
                                    <Button variant="outlined"
                                            sx={{textTransform: "none", borderColor: "white", borderRadius: "10px"}}
                                        onClick={() => navigate("/organizer/create-event")}
                                    >
                                        <Typography
                                            variant="subtitle1"
                                            sx={{color: "white", fontFamily: 'Arial', fontSize: "14px"}}
                                        >
                                            Tạo sự kiện
                                        </Typography>
                                    </Button>
                                    <Button sx={{textTransform: "none", borderColor: "white", padding: 0}} onClick={()=> navigate("/my-bought-tickets")}>
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
