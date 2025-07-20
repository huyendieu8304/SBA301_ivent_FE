import {useEffect, useState} from "react";
import {
    Box,
    Card,
    CardContent,
    Container, Stack,
    Typography,
    useTheme
} from "@mui/material";
import {useParams} from "react-router-dom";
import ticketApi from "../../api/service/ticketApi.jsx";
import LoadingComponent from "../../component/LoadingComponent.jsx";
import {formatCurrency, formatDateTimeRange} from "../../common/FormatFunction.jsx";
import MascotSvg from "../../component/svg/MascotSvg.jsx";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const TicketDetail = () => {
    const {paymentId} = useParams();
    const [ticket, setTicket] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const theme = useTheme();

    useEffect(() => {
        if (paymentId) {
            setIsLoading(true);
            ticketApi.getTicketDetail(paymentId, handleSuccess, handleError);
        }
    }, [paymentId]);

    const handleSuccess = (data) => {
        setTicket(data?.data || data);
        setIsLoading(false);
    };

    const handleError = (err) => {
        console.error("Error loading ticket detail", err);
        setIsLoading(false);
    };

    return (<>
        <Container maxWidth="xl" sx={{
            display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
            height: "fit-content",
        }}>
            <Card sx={{width: "fit-content", minWidth: "600px", height: "fit-content", borderRadius: "16px"}}>
                <CardContent sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "0 !important"
                }}>
                    <Stack sx={{
                        width: "100%",
                        height: "80px",
                        marginBottom: "24px",
                        backgroundColor: theme.palette.primary.main,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "end"
                    }}>
                        <Typography variant="h5" component="div"
                                    sx={{fontWeight: "bold", color: "white", textAlign: "center", marginBottom: 2}}>
                            Thông tin vé
                        </Typography>
                        <MascotSvg/>
                    </Stack>
                    {ticket
                        ? (
                            <Stack direction="column" justifyContent="space-between" alignItems="flex-start"
                                   sx={{width: '90%'}}>
                                <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="flex-start"
                                       sx={{width: '100%', marginBottom: " 24px"}}>
                                    <Stack direction="column" gap={1} sx={{width: "60%"}}>
                                        <Typography variant="h6" fontWeight="bold" sx={{color: "#12B76A"}}>
                                            {ticket.eventName?.toUpperCase()}
                                        </Typography>
                                        <Stack direction="row" gap={1} justifyContent="flex-start" alignItems="center">
                                            <LocationOnIcon sx={{color: "#A4A7AE"}}/>
                                            <Typography variant="body2" sx={{margin: "0 !important"}}>
                                                {ticket.eventLocation}
                                            </Typography>
                                        </Stack>
                                        <Stack direction="row" gap={1} justifyContent="flex-start" alignItems="center">
                                            <CalendarMonthIcon sx={{color: "#A4A7AE"}}/>
                                            <Typography variant="body2" sx={{margin: "0 !important"}}>
                                                {formatDateTimeRange(ticket.eventStartTime, ticket.eventEndTime)}
                                            </Typography>
                                        </Stack>
                                        <Typography variant="body1" fontWeight="bold">
                                            Loại vé: {ticket.ticketTypeName}
                                        </Typography>
                                        <Typography variant="body1">
                                            Số lượng: {ticket.quantity}
                                        </Typography>
                                        <Typography variant="body1">
                                            Tổng giá vé: {formatCurrency(ticket.amount, "đ")}
                                        </Typography>
                                    </Stack>
                                    <Box
                                        component="img"
                                        src={ticket.qrUrl}
                                        alt="ticket qr"
                                        sx={{
                                            width: "40%",
                                            height: "auto",
                                            margin: "0 !important"
                                        }}
                                    />
                                </Stack>
                            </Stack>
                    )
                        : (
                            <Stack direction="column" justifyContent="space-between" alignItems="flex-start"
                                   sx={{width: '90%'}}>
                                <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="flex-start"
                                       sx={{width: '100%', marginBottom: " 24px"}}>
                                    <Stack direction="column" gap={1} sx={{width: "100%"}}>
                                        <Typography variant="h6" fontWeight="bold" sx={{color: "red", textAlign: "center"}}>
                                            Không tìm thấy vé
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </Stack>
                        )}
                </CardContent>
            </Card>
        </Container>
        {isLoading && <LoadingComponent/>}
    </>);
};

export default TicketDetail;
