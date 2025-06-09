import {Avatar, Box, Container, Stack, Toolbar, Typography, useTheme} from "@mui/material";
import MessageComponent from "../component/MessageComponent.jsx";
import {Outlet} from "react-router";


const SecondaryLayout = () => {
    const theme = useTheme();

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
                        <Stack direction="row" spacing={2} sx={{alignItems: "center", justifyContent: "center", width: "fit-content"}}>
                            <Avatar alt="ivent logo" src="/ivent_logo.png" sx={{height: "40px", width: "40px"}}/>
                            <Typography variant="h4" gutterBottom
                                        sx={{color: theme.palette.primary.main, fontWeight: "bold"}}>
                                ivent
                            </Typography>
                        </Stack>
                </Container>
            </Box>

            <Box sx={{ height: "87vh" , overflowY: "auto" }}>
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
                <Typography variant="body2" sx={{ color: "#027A48"}} gutterBottom>
                    © {year} Bản quyền thuộc công ty ivent
                </Typography>
            </Box>
            <MessageComponent/>
        </>
    );
};

export default SecondaryLayout;
