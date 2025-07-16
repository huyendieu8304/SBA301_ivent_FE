import { useEffect, useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Container,
    Typography,
    useTheme
} from "@mui/material";
import { useParams } from "react-router-dom";
import ticketApi from "../../api/service/ticketApi.jsx";
import LoadingComponent from "../../component/LoadingComponent.jsx";
import { formatDateTimeRange } from "../../common/FormatFunction.jsx";
import MascotSvg from "../../component/svg/MascotSvg.jsx";

const TicketDetail = () => {
    const { paymentId } = useParams();
    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);
    const theme = useTheme();

    useEffect(() => {
        if (paymentId) {
            ticketApi.getTicketDetail(paymentId, handleSuccess, handleError);
        }
    }, [paymentId]);

    const handleSuccess = (data) => {
        setTicket(data?.data || data);
        setLoading(false);
    };

    const handleError = (err) => {
        console.error("Error loading ticket detail", err);
        setLoading(false);
    };

    if (loading) return <LoadingComponent />;

    if (!ticket) {
        return (
            <Container maxWidth="sm" sx={{ paddingTop: 4, color: theme.palette.common.white, textAlign: "center" }}>
                <Typography variant="h6">Không tìm thấy vé.</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ paddingTop: 4, display: "flex", justifyContent: "center" }}>
            <Card sx={{ borderRadius: 2, border: `2px solid ${theme.palette.primary.main}`, padding: 2, width: "100%", maxWidth: 600 }}>
                <CardContent>
                    <Box
                        sx={{
                            border: `1px dashed ${theme.palette.grey[500]}`,
                            borderRadius: 2,
                            padding: 2
                        }}
                    >
                        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                            {/* Thông tin vé */}
                            <Box flex={1} pr={2}>
                                <Typography variant="subtitle2" color="text.secondary">
                                    [TICKET INFO]
                                </Typography>
                                <Typography variant="h6" fontWeight="bold">
                                    {ticket.eventName?.toUpperCase()}
                                </Typography>
                                <Typography variant="body2" mt={1}>
                                    🏛️ {ticket.eventLocation}
                                </Typography>
                                <Typography variant="body2">
                                    🕒 {formatDateTimeRange(ticket.eventStartTime, ticket.eventEndTime)}
                                </Typography>

                                <Box mt={3}>
                                    <Typography variant="body1" fontWeight="bold">
                                        Loại vé: {ticket.ticketTypeName}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            whiteSpace: "pre-line",
                                            wordBreak: "break-word",
                                            overflowWrap: "break-word",
                                        }}
                                    >
                                        Mô tả: {ticket.ticketDescription}
                                    </Typography>

                                    <Typography variant="body1">
                                        Số lượng: {ticket.quantity}
                                    </Typography>
                                    <Typography variant="body1" mt={1}>
                                        Tổng giá vé: {ticket.amount?.toLocaleString("vi-VN")} đ
                                    </Typography>
                                </Box>
                            </Box>

                            {/* Logo */}
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "flex-end",
                                    justifyContent: "flex-end",
                                    mt: "auto",
                                }}
                            >
                                <MascotSvg style={{ width: "100px", height: "auto" }} />
                            </Box>


                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Container>


    );
};

export default TicketDetail;
