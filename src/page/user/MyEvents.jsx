import { useEffect, useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    useTheme,
    Pagination, Chip, TextField, Button
} from "@mui/material";
import { useAuth } from "../../context/AuthContext.jsx";
import eventApi from "../../api/service/eventApi.jsx";
import LoadingComponent from "../../component/LoadingComponent.jsx";
import dayjs from "dayjs";
import TableComponent from "../../component/TableComponent.jsx";



const MyEvents = () => {
    const theme = useTheme();
    const { id: accountId, isAuthenticated } = useAuth();
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [eventName, setEventName] = useState("");

    useEffect(() => {
    if (accountId) {
        fetchEvents("");
    } else {
        console.log("No accountId available yet.");
    }
}, [accountId, page, size]);

    const fetchEvents = (name = "") => {
        setIsLoading(true);
        eventApi.getMyEvents(accountId, page, size, name, fetchSuccess, fetchFail);
    };


    const handleSearchSubmit = (e) => {
        e.preventDefault();
        fetchEvents(eventName);
    };

    const columns = [
        { field: 'name', headerName: 'Tên sự kiện', width: 330, flex: 1, align: "center" },
        { field: 'province', headerName: 'Địa điểm', width: 260, flex: 1, align: "center"},
        { field: 'startTime', headerName: 'Ngày bắt đầu', width: 260, valueGetter: (params) => dayjs(params.value).format('DD/MM/YYYY HH:mm'), flex: 1, align: "center"},
        { field: 'endTime', headerName: 'Ngày kết thúc', width: 260, valueGetter: (params) => dayjs(params.value).format('DD/MM/YYYY HH:mm'), flex: 1, align: "center"},
        { field: 'createdAt', headerName: 'Ngày tạo', width: 260, valueGetter: (params) => dayjs(params.value).format('DD/MM/YYYY HH:mm'), flex: 1, align: "center"},
        { field: 'status', headerName: 'Trạng thái', width: 160, flex: 1, align: "center",
            renderCell: (params) => (
                <Box sx={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
                    {params.value === "APPROVED" ? (<Chip label="Approved" sx={{backgroundColor: theme.palette.primary.main, color: "white", fontWeight: "bold"}}/>) : (<Chip label="Denied" color={"red"} />)}
                </Box>
            )}

    ];

const fetchSuccess = (data) => {
    console.log("API response:", data);
    const eventsData = data?.data || data;
    const content = eventsData.content || eventsData; 
    setEvents(content);
    setTotalPages(eventsData.totalPages || 1);
    setIsLoading(false);
};


    const fetchFail = (error) => {
        console.error("Failed to fetch events:", error);
        setIsLoading(false);
    };



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
                        <Button type="submit" variant="contained" color="primary" size="medium" sx={{ color:"white", fontWeight: "bold" }}>
                            Tìm kiếm
                        </Button>
                    </Box>
                </form>



                <TableComponent columns={columns} data={events} handleClickRow={() => {}}/>
                </CardContent>
            </Card>
            {isLoading && <LoadingComponent />}
        </Container>
    );
};

export default MyEvents;
