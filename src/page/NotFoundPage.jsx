import {Box, Button, Container, Stack, Typography} from "@mui/material";
import {useNavigate} from "react-router";
import {useAuth} from "../context/AuthContext.jsx";
import {ROLES} from "../common/Constant.jsx";

const NotFoundPage = () => {
    const navigate = useNavigate();
    const {authorities} = useAuth();


    const toHomePage = () => {
        if (authorities && authorities.length > 0 && authorities === ROLES.ADMIN) {
            navigate("/admin");
        } else {
            navigate("/");
        }
    }

    return (
        <>
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
                                onClick={toHomePage}>
                            <Typography variant="subtitle1" color="white"> Trang chủ </Typography>
                        </Button>
                    </Stack>
                </Stack>
            </Container>
        </>
    )
}

export default NotFoundPage;