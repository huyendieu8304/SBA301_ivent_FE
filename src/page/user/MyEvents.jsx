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
    Pagination
} from "@mui/material";
import { useAuth } from "../../context/AuthContext.jsx";
import eventApi from "../../api/service/eventApi.jsx";
import LoadingComponent from "../../component/LoadingComponent.jsx";
import dayjs from "dayjs";

const MyEvents = () => {
    const theme = useTheme();
    const { id: accountId, isAuthenticated } = useAuth();
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
    console.log("useEffect running - id:", accountId);
    if (accountId) {
        setIsLoading(true);
        eventApi.getMyEvents(accountId, page, size, fetchSuccess, fetchFail);
    } else {
        console.log("No accountId available yet.");
    }
}, [accountId, page, size]);


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

const formatDateTime = (isoString) => {
    return isoString ? dayjs(isoString).format("DD/MM/YYYY HH:mm") : "";
};

    return (
        <Container maxWidth="xl" sx={{ paddingTop: 4 }}>
            <Card sx={{ borderRadius: 2 }}>
                <CardContent>
                    <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
                        Sự kiện của tôi
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Tên sự kiện</TableCell>
                                    <TableCell>Địa điểm</TableCell>
                                    <TableCell>Ngày bắt đầu</TableCell>
                                    <TableCell>Ngày kết thúc</TableCell>
                                    <TableCell>Trạng thái</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {events.map((event) => (
                                    <TableRow key={event.id}>
                                        <TableCell>{event.name}</TableCell>
                                        <TableCell>{event.province}</TableCell>
                                        <TableCell>{formatDateTime(event.startTime)}</TableCell>
                                        <TableCell>{formatDateTime(event.endTime)}</TableCell>
                                        <TableCell>{event.status}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                <Pagination
                    count={totalPages}
                    page={page + 1}
                    onChange={(e, value) => setPage(value - 1)}
                    color="primary"
                />
                </Box>
                </CardContent>
            </Card>
            {isLoading && <LoadingComponent />}
        </Container>
    );
};

export default MyEvents;
