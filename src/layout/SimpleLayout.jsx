import {Link, Outlet} from "react-router";
import {
    Box,
    Container,
    Stack,
    Typography, useTheme,
} from "@mui/material";
import '@fontsource/comfortaa/700.css';

const SimpleLayout = () => {
    const theme = useTheme();

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
        </>
    );
};

export default SimpleLayout;
