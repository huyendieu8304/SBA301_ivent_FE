import {Box, Button, Container, Stack, Typography, useTheme} from "@mui/material";
import {useNavigate} from "react-router";

const NotFoundPage = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const year = new Date().getFullYear();

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
                        <Typography variant="h3" color="white" sx={{fontWeight: "bold"}}>Trang không tồn
                            tại</Typography>
                        <Box
                            component="img"
                            src="https://salt.tkbcdn.com/ts/ds/8a/ba/3c/fb8a3fa84f82b5e4ae8b779ea1844997.png"
                            alt="404"
                            sx={{
                                width: "50%",
                                height: "auto",
                                objectFit: "cover",
                            }}
                        />
                        <Typography variant="subtitle1" color="white">
                            Trang bạn đang tìm kiếm có thể đã bị xóa, thay đổi tên, hoặc tạm thời không khả dụng.
                            Vui lòng quay về trang trước hoặc đi đến Trang chủ
                        </Typography>
                        <Stack direction="row" spacing={2}>
                            <Button variant="outlined" sx={{width: "200px", textTransform: "none"}}
                                    onClick={() => navigate(-1)}>
                                <Typography variant="subtitle1" color="white"> Quay về trang trước </Typography>
                            </Button>
                            <Button variant="contained" sx={{width: "200px", textTransform: "none"}}
                                    onClick={() => navigate("/")}>
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

export default NotFoundPage;