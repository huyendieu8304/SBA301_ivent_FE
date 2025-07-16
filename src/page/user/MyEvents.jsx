import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Card,
    CardContent,
    Container,
    Typography,
    useTheme,
    Chip,
    TextField,
    Button
} from "@mui/material";
import { useAuth } from "../../context/AuthContext.jsx";
import eventApi from "../../api/service/eventApi.jsx";
import LoadingComponent from "../../component/LoadingComponent.jsx";
import TableComponent from "../../component/TableComponent.jsx";
import { formatVNDateFromISO } from "../../common/FormatFunction.jsx";

const MyEvents = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { id: accountId } = useAuth();

    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [eventName, setEventName] = useState("");

    useEffect(() => {
        if (accountId) {
            fetchEvents(eventName);
        }
    }, [accountId, page, size]);

    const fetchEvents = (name = "") => {
        setIsLoading(true);
        eventApi.getMyEvents(accountId, page, size, name.trim(), fetchSuccess, fetchFail);
    };

    const fetchSuccess = (data) => {
        const content = data?.content || [];
        setEvents(content);
        setTotalPages(data?.totalPages || 1);
        setIsLoading(false);
    };

    const fetchFail = (error) => {
        console.error("Failed to fetch events:", error);
        setIsLoading(false);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setPage(0); // reset to first page
        fetchEvents(eventName);
    };

    const handleClickRow = (event) => {
        navigate(`/organizer/event-detail/${event.row.id}`);
    };


    const columns = [
        {
            field: 'name',
            headerName: 'Tên sự kiện',
            width: 330,
            flex: 1,
            align: "center"
        },
        {
            field: 'province',
            headerName: 'Địa điểm',
            width: 260,
            flex: 1,
            align: "center"
        },
        {
            field: 'startTime',
            headerName: 'Ngày bắt đầu',
            width: 260,
            valueGetter: (params) => formatVNDateFromISO(params),
            flex: 1,
            align: "center"
        },
        {
            field: 'endTime',
            headerName: 'Ngày kết thúc',
            width: 260,
            valueGetter: (params) => formatVNDateFromISO(params),
            flex: 1,
            align: "center"
        },
        {
            field: 'createdAt',
            headerName: 'Ngày tạo',
            width: 260,
            valueGetter: (params) => formatVNDateFromISO(params),
            flex: 1,
            align: "center"
        },
        {
            field: 'status',
            headerName: 'Trạng thái',
            width: 160,
            flex: 1,
            align: "center",
            renderCell: (params) => (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Chip
                        label={params.value === "APPROVED" ? "Approved" : "Denied"}
                        sx={{
                            backgroundColor: params.value === "APPROVED"
                                ? theme.palette.primary.main
                                : theme.palette.error.main,
                            color: "white",
                            fontWeight: "bold"
                        }}
                    />
                </Box>
            )
        }
    ];

    return (
        <Container maxWidth="xl" sx={{ paddingTop: 4 }}>
            <Card sx={{ borderRadius: 2 }}>
                <CardContent>
                    <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
                        Sự kiện của tôi
                    </Typography>

                    <form onSubmit={handleSearchSubmit}>
                        <Box display="flex" alignItems="center" gap={2} mb={2}>
                            <TextField
                                label="Nhập tên sự kiện"
                                variant="outlined"
                                value={eventName}
                                onChange={(e) => setEventName(e.target.value)}
                                size="small"
                                sx={{ width: 300 }}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="medium"
                                sx={{ color: "white", fontWeight: "bold", textTransform: "none" }}
                            >
                                Tìm kiếm
                            </Button>
                        </Box>
                    </form>

                    <TableComponent
                        columns={columns}
                        data={events}
                        handleClickRow={handleClickRow}
                    />
                </CardContent>
            </Card>
            {isLoading && <LoadingComponent />}
        </Container>
    );
};

export default MyEvents;
