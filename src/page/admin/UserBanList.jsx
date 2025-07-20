import { useEffect, useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Container,
    Typography,
    TextField,
    Button,
    useTheme,
    Chip
} from "@mui/material";
import adminApi from "../../api/service/adminApi.jsx";
import LoadingComponent from "../../component/LoadingComponent.jsx";
import TableComponent from "../../component/TableComponent.jsx";
import {MESSAGE_TYPES, PAGE_SIZE_OPTIONS} from "../../common/Constant.jsx";
import Messages from "../../common/Message.jsx";
import { messageService } from "../../service/MessageService.jsx";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const UserBanList = () => {
    const theme = useTheme();
    const [data, setData] = useState(null);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(PAGE_SIZE_OPTIONS.at(1));
    const [isLoading, setIsLoading] = useState(false);
    const [keyword, setKeyword] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        setIsSearching(false);
        setIsLoading(true);
        adminApi.getUserAccounts(keyword, page, size, fetchSuccess, fetchFail);
    }, [isSearching, page, size]);

    const fetchSuccess = (res) => {
        setData(res);
        setPage(res.pageable.pageNumber);
        setSize(res.pageable.pageSize);
        setIsLoading(false);
    };

    const fetchFail = (err) => {
        console.error("Failed to fetch user accounts:", err);
        messageService.showMessage(Messages.MSG_E_00018, MESSAGE_TYPES.ERROR);
        setIsLoading(false);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setPage(0);
        setIsSearching(true);
    };

    const handlePaginationChange = (newPage, newSize) => {
        setPage(newPage);
        setSize(newSize);
        setIsSearching(true);
    };

    const handleBan = (accountId) => {
        setIsLoading(true);
        adminApi.banUser(
            accountId,
            () => {
                messageService.showMessage(Messages.MSG_I_00014, MESSAGE_TYPES.INFO);
                setIsSearching(true); // Trigger reload
                setIsLoading(false);
            },
            (err) => {
                console.error(err);
                messageService.showMessage(Messages.MSG_I_00015, MESSAGE_TYPES.ERROR);
                setIsLoading(false);
            }
        );
    };

    const columns = [
        { field: 'email', headerName: 'Email', width: 250, flex: 1 },
        { field: 'fullName', headerName: 'Họ tên', width: 200, flex: 1 },
        {
            field: 'status',
            headerName: 'Trạng thái',
            width: 160,
            flex: 1,
            renderCell: (params) => (
                <Chip
                    label={params.value}
                    sx={{
                        backgroundColor:
                            params.value === 'ACTIVE'
                                ? theme.palette.success.main
                                : theme.palette.error.main,
                        color: 'white',
                        fontWeight: 'bold'
                    }}
                />
            )
        },
        {
            field: 'action',
            headerName: '',
            width: 150,
            flex: 1,
            renderCell: (params) => (
                <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    disabled={params.row.status !== 'ACTIVE'}
                    onClick={() => handleBan(params.row.id)}
                >
                    Khóa tài khoản
                </Button>
            )
        }
    ];

    return (
        <Container maxWidth="xl" sx={{ paddingTop: 4 }}>
            <Card sx={{ borderRadius: 2 }}>
                <CardContent>
                    <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
                        Danh sách người dùng
                    </Typography>

                    <form onSubmit={handleSearchSubmit}>
                        <Box display="flex" alignItems="center" gap={2} mb={2}>
                            <TextField
                                label="Tìm kiếm theo email"
                                variant="outlined"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                size="small"
                                sx={{ width: 300 }}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="medium"
                                sx={{ color: "white", textTransform: 'none' }}
                            >
                                Tìm kiếm
                            </Button>
                        </Box>
                    </form>

                    <TableComponent
                        columns={columns}
                        rows={data?.content || []}
                        page={page}
                        pageSize={size}
                        totalRowCount={data?.totalElements || 0}
                        handlePaginationChange={handlePaginationChange}
                    />
                </CardContent>
            </Card>
            {isLoading && <LoadingComponent />}
        </Container>
    );
};

export default UserBanList;
