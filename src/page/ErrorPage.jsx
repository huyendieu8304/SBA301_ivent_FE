import {Box, Button, Container, Stack, Typography, useTheme} from "@mui/material";
import {useLocation, useNavigate} from "react-router";
import {useAuth} from "../context/AuthContext.jsx";
import {CONSTANTS, ROLES} from "../common/Constant.jsx";

const ErrorPage = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const { message, code } = location.state || {};
    const {authorities} = useAuth();

    const year = new Date().getFullYear();

    const toHomePage = () => {
        if(authorities && authorities.length > 0 && authorities === ROLES.ADMIN){
            navigate("/admin");
        }
        else {
            navigate("/");
        }
    }

    return (
        <>
            <Box
                sx={{
                    position: "fixed",
                    top: 0,
                    width: "100%",
                    height: "93.5vh",
                    backgroundColor: theme.palette.backgroundColor.main,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    overflowY: "auto",
                }}
            >
                <Container maxWidth="xl">
                    <Stack direction="column" spacing={3} sx={{justifyContent: "center", alignItems: "center"}}>
                        <Typography variant="h3" color="white" sx={{fontWeight: "bold"}}>Ối dồi ôi, ối dồi ôi có lỗi rồi :_)</Typography>
                        <Stack direction="row" spacing={8} sx={{justifyContent: "center", alignItems: "center"}}>
                            <Typography variant="h1" color="white" sx={{color: theme.palette.primary.main, fontWeight: "bold", fontSize: "220px"}}>
                                {code}
                            </Typography>
                            <Box
                                component="img"
                                src="https://ticketbox.vn/_next/static/images/loading.gif"
                                alt={code}
                                sx={{
                                    width: "30%",
                                    height: "auto",
                                    objectFit: "cover",
                                }}
                            />
                        </Stack>
                        <Typography variant="subtitle1" color="white">
                            {message}
                        </Typography>
                        <Stack direction="row" spacing={2}>
                            <Button variant="outlined" sx={{width: "200px", textTransform: "none"}}
                                    onClick={() => navigate(-1)}>
                                <Typography variant="subtitle1" color="white"> Quay về trang trước </Typography>
                            </Button>
                            <Button variant="contained" sx={{width: "200px", textTransform: "none"}}
                                    onClick={toHomePage}>
                                <Typography variant="subtitle1" color="white"> Trang chủ </Typography>
                            </Button>
                        </Stack>
                    </Stack>
                </Container>
            </Box>
            <Box
                component="footer"
                sx={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "6.5vh",
                    backgroundColor: "#1D1D1D",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "inset 0 1px 0 rgba(0, 0, 0, 0.1)",
                    zIndex: 1100,
                }}
            >
                <Typography variant="body2" sx={{color: "#B3B3B3", margin: 0}} gutterBottom>
                    © {year} Bản quyền thuộc công ty ivent
                </Typography>
            </Box>
        </>
    )
}

export default ErrorPage;