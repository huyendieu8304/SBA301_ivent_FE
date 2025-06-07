import {Link, Outlet} from "react-router";
import {Stack} from "@mui/material";
import MessageComponent from "./MessageComponent.jsx";

const Layout = () => {
    const pad = (num) => num.toString().padStart(2, '0');
    const today = new Date();
    const formattedDate = `${pad(today.getDate())}/${pad(today.getMonth() + 1)}/${today.getFullYear()}`;

    return (
        <>
            <header style={{height: "6.5vh"}}>
                <Stack direction="row" spacing={2}>
                    <div className="fw-bold" style={{width: "20%"}}>Logo</div>
                    <div className="flex-grow-1" style={{width: "65%"}}><h4>Quản lý khách hàng</h4></div>
                    <div style={{width: "10%"}}>
                        <Stack>
                            <div>Chào Admin</div>
                            <div>Ngày: {formattedDate}</div>
                        </Stack>
                    </div>
                </Stack>
            </header>

            <nav style={{height: "4vh"}}>
                <Stack direction="row" spacing={3}>
                    <Link to="/home">Trang chủ</Link>
                    <Link to="/manage">Danh sách khách hàng</Link>
                    <Link to="/add">Tạo mới khách hàng</Link>
                </Stack>
            </nav>

            <div style={{overflowY: "auto", height: "83vh", margin: "10px 0"}}>
                <main className="p-3">
                    <Outlet/>
                </main>
            </div>

            <footer style={{height: "7.5vh"}}>
                <Stack direction="column" spacing={1}>
                    <div>Giới thiệu | Hỗ trợ | Nghề nghiệp</div>
                    <Stack direction="horizontal" gap={3} style={{display: "flex", justifyContent: "space-between"}}>
                        <div>@2015, Bản Quyền Thuộc Công Ty ABC</div>
                        <div>Địa Chỉ: Khu Công Nghệ Cao Hòa Lạc</div>
                        <div>Liên Hệ: agent@fpt.edu.vn</div>
                    </Stack>
                </Stack>
            </footer>
            <MessageComponent/>
        </>
    );
};

export default Layout;
