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
import { useAuth } from "../../context/AuthContext.jsx";
import ticketApi from "../../api/service/ticketApi.jsx";
import LoadingComponent from "../../component/LoadingComponent.jsx";
import TableComponent from "../../component/TableComponent.jsx";
import {formatVNDateFromISO} from "../../common/FormatFunction.jsx";
import { useNavigate } from "react-router-dom";

const MyTickets = () => {
    const theme = useTheme();
    const { id: accountId } = useAuth();
    const [tickets, setTickets] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [eventName, setEventName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (accountId) {
            fetchTickets();
        }
    }, [accountId, page, size]);

    const fetchTickets = (name = "") => {
        setIsLoading(true);
        ticketApi.getMyTickets(accountId, page, size, name, fetchSuccess, fetchFail);
    };

    const fetchSuccess = (data) => {
        const ticketsData = data?.data || data;
        const content = ticketsData.content || ticketsData;
        setTickets(content);
        console.log("Fetched tickets:", content); // 👈 Kiểm tra ticketTypeId ở đây
        setTotalPages(ticketsData.totalPages || 1);
        setIsLoading(false);
    };

    const fetchFail = (error) => {
        console.error("Failed to fetch tickets:", error);
        setIsLoading(false);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        fetchTickets(eventName);
    };

    const handleViewDetail = (paymentId) => {
        navigate(`/detail/${paymentId}`);
    };

    const columns = [
        { field: 'ticketTypeName', headerName: 'Loại vé', width: 180, flex: 1 },
        { field: 'eventName', headerName: 'Tên sự kiện', width: 300, flex: 1 },
        { field: 'quantity', headerName: 'Số lượng', width: 100, flex: 1 },
        { field: 'amount', headerName: 'Tổng tiền (VNĐ)', width: 150, flex: 1, valueFormatter: (params) => params.value?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) || ''},
        { field: 'transactionStatus', headerName: 'Trạng thái thanh toán', width: 180, flex: 1, renderCell: (params) => (
                <Chip label={params.value} sx={{
                        backgroundColor: params.value === 'SUCCESSFUL'
                                ? theme.palette.success.main
                                : params.value === 'FAILED'
                                    ? theme.palette.error.main
                                    : theme.palette.warning.main,
                        color: 'white',
                        fontWeight: 'bold'
                    }}
                />
            )
        },
        {
            field: 'createdAt',
            headerName: 'Ngày mua',
            width: 220,
            flex: 1,
            valueGetter: (params) => formatVNDateFromISO(params)
        },
        {
            field: 'action',
            headerName: '',
            width: 150,
            flex: 1,
            renderCell: (params) => (
                <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => handleViewDetail(params.row.paymentId)}

                >
                    Xem chi tiết
                </Button>
            )
        }

    ];



    return (
        <Container maxWidth="xl" sx={{ paddingTop: 4 }}>
            <Card sx={{ borderRadius: 2 }}>
                <CardContent>
                    <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
                        Vé đã mua
                    </Typography>

                    <form onSubmit={handleSearchSubmit}>
                        <Box display="flex" alignItems="center" gap={2} mb={2}>
                            <TextField label="Tìm theo tên sự kiện" variant="outlined" value={eventName} onChange={(e) => setEventName(e.target.value)} size="small" sx={{ width: 300 }}/>
                            <Button type="submit" variant="contained" color="primary" size="medium" sx={{ color: "white", textTransform: 'none' }}>
                                Tìm kiếm
                            </Button>
                        </Box>
                    </form>

                    <TableComponent columns={columns} data={tickets} handleClickRow={() => {}}/>
                </CardContent>
            </Card>
            {isLoading && <LoadingComponent />}
        </Container>
    );
};

export default MyTickets;
