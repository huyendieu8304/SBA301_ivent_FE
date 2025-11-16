import React, {useEffect, useRef, useState} from "react";
import eventApi from "../../api/service/./operatorApi.jsx";
import dayjs from "dayjs";
import {Box, Button, Card, CardContent, Chip, Container, TextField, Typography, useTheme} from "@mui/material";
import TableComponent from "../../component/TableComponent";
import LoadingComponent from "../../component/LoadingComponent";
import {useNavigate} from "react-router-dom";
import {PAGE_SIZE_OPTIONS} from "../../common/Constant.jsx";
import adminApi from "../../api/service/adminApi.jsx";

const AccountPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(PAGE_SIZE_OPTIONS.at(1));
    const [name, setName] = useState("");
    const theme = useTheme();
    const [isSearching, setIsSearching] = useState(false);
    const navigate = useNavigate();

    const columns = [
        { field: 'fullName', headerName: 'Họ tên', width: 200, flex: 1 },
        { field: 'email', headerName: 'Email', width: 250, flex: 1 },
        { field: 'phone', headerName: 'Số điện thoại', width: 200, flex: 1 },

        {
            field: 'gender',
            headerName: 'Giới tính',
            width: 200,
            flex: 1,
            renderCell: (params) => {
                const gender = params.value;
                return gender === 'Male' ? 'Nam' :
                    gender === 'Female' ? 'Nữ' : 'Khác';
            }
        },

        {
            field: 'role',
            headerName: 'Vai trò',
            width: 200,
            flex: 1,
            renderCell: (params) => {
                const role = params.value;
                return role === 'ROLE_ADMIN' ? 'Quản trị viên' :
                    role === 'ROLE_OPERATOR' ? 'Người kiểm duyệt' :
                        role === 'ROLE_USER' ? 'Người dùng' : role;
            }
        },

        {
            field: 'status',
            headerName: 'Trạng thái',
            width: 160,
            flex: 1,
            renderCell: (params) => {
                const status = params.value;
                const label = status === 'ACTIVE' ? 'Đang hoạt động' : 'Không hoạt động';
                const color = status === 'ACTIVE' ? theme.palette.success.main : theme.palette.error.main;
                return (
                    <Chip
                        label={label}
                        sx={{
                            backgroundColor: color,
                            color: 'white',
                            fontWeight: 'bold'
                        }}
                    />
                );
            }
        }
    ];



    useEffect(() => {
        setIsSearching(false);
        setIsLoading(true);
        adminApi.getAllAccount( page, size, name, getDataSuccess,getDataFail)
    }, [isSearching]);


    const getDataSuccess = (d) => {
        setData(d);
        setPage(d.pageable.pageNumber + 1);
        setSize(d.pageable.pageSize);
        setIsLoading(false);
    }

    const getDataFail = (error) => {
        console.error("error", error);
        setIsLoading(false);

        const message = error?.response?.data?.message || "Unknown error";
        const statusCode = error?.response?.status || 500;

        navigate("/error", {
            state: {
                message,
                code: statusCode,
            }
        });
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setPage(0);
        setSize(10);
        setIsSearching(true);
    };

    const handlePaginationChange = (newPage, newSize) => {
        setPage(newPage);
        setSize(newSize);
        setIsSearching(true);
    }

    return (
        <Container maxWidth="xl" sx={{paddingTop: 4}}>
            <Card sx={{borderRadius: 2}}>
                <CardContent>
                    <Typography variant="h5" sx={{fontWeight: "bold", marginBottom: 2}}>
                        Tất cả tài khoản
                    </Typography>

                    <form onSubmit={handleSearchSubmit}>
                        <Box display="flex" alignItems="center" gap={2} mb={2}>
                            <TextField label="Tìm theo tên" variant="outlined" value={name}
                                       onChange={(e) => setName(e.target.value)} size="small" sx={{width: 300}}/>
                            <Button type="submit" variant="contained" color="primary" size="medium"
                                    sx={{color: "white", textTransform: 'none'}}>
                                Tìm kiếm
                            </Button>
                        </Box>
                    </form>
                    <TableComponent columns={columns} rows={data?.content || []} page={page} pageSize={size}
                                    totalRowCount={data?.totalElements || 0}
                                    handlePaginationChange={handlePaginationChange}/>
                </CardContent>
            </Card>
            {isLoading && <LoadingComponent/>}
        </Container>
    );

};

export default AccountPage;
