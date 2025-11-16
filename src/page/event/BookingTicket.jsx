import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import eventApi from "../../api/service/eventApi.jsx";
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Stack,
    Typography,
    useTheme
} from "@mui/material";
import MascotSvg from "../../component/svg/MascotSvg.jsx";
import LoadingComponent from "../../component/LoadingComponent.jsx";
import {CalendarToday, Place} from "@mui/icons-material";
import {formatDateTimeRange, formatMoney} from "../../common/FormatFunction.jsx";
import ListTicketType from "../../component/ListTicketType.jsx";
import paymentSettingApi from "../../api/service/paymentSettingApi.jsx";
import {messageService} from "../../service/MessageService.jsx";
import {MESSAGE_TYPES} from "../../common/Constant.jsx";

const BookingTicket = () => {
    const {eventId} = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [eventDetails, setEventDetails] = useState({});
    const [quantities, setQuantities] = useState({}); //so luong ve moi loai ma nguoi dung mua
    const navigate = useNavigate();
    const theme = useTheme();

    const selectedticketQuantity = Object.values(quantities).reduce((total, qty) => total + qty, 0);

    useEffect(() => {
        setIsLoading(true);
        eventApi.getEventAndTicketTypeDetails(
            eventId,
            getEventDetailsSuccess,
            getEventDetailsFailure
        )
    }, [])

    const getEventDetailsSuccess = (data) => {
        setEventDetails(data);
        setIsLoading(false);
    }

    const getEventDetailsFailure = (data) => {
        setIsLoading(false);
        navigate("/error", {
            state: {
                message: data.response.data.message,
                code: data.status,
            }
        })
    }

    const handlePayment = () => {
        const ticketTypeList = Object.entries(quantities).map(([ticketTypeId, quantity]) => ({
            ticketTypeId,
            quantity,
        }));
        setIsLoading(true);
        paymentSettingApi.payment({
            eventId,
            ticketTypeList,
        }, paymentSuccess, paymentFailure);
    }

    const paymentSuccess = (data) => {
        console.log(data);
        window.location.href = data.paymentUrl;
        setIsLoading(false);
    }

    const paymentFailure = (e) => {
        console.log(e);
        messageService.showMessage(e.response.data.message, MESSAGE_TYPES.ERROR);
        setIsLoading(false);
    }

    return (
        <>
            <Container maxWidth="xl" sx={{
                display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
                height: "fit-content",
            }}>
                <Card sx={{width: "fit-content", minWidth: "800px", height: "fit-content", borderRadius: "16px",}}>
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
                            <Typography variant="h4" component="div"
                                        sx={{
                                            fontWeight: "bold",
                                            color: "white",
                                            textAlign: "center",
                                            marginBottom: 2
                                        }}>
                                Chọn loại vé
                            </Typography>
                            <MascotSvg/>
                        </Stack>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            width: "100%"
                        }}>
                            <Typography variant="h6" color="primary" sx={{
                                fontWeight: "bold",
                                marginLeft: 3,
                                marginBottom: 2
                            }}>
                                {eventDetails.name}
                            </Typography>
                        </Box>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            width: "100%"
                        }}>
                            <Stack direction="row" alignItems="center" spacing={1}
                                   sx={{marginLeft: 3, marginBottom: 2}}>
                                <CalendarToday sx={{fontSize: 20, color: "#b0b0b0"}}/>
                                <Typography
                                    variant="body2"
                                    color="black"
                                    sx={{
                                        fontWeight: "bold",
                                    }}
                                >
                                    {eventDetails.startTime && eventDetails.endTime && (
                                        formatDateTimeRange(eventDetails.startTime, eventDetails.endTime)
                                    )}
                                </Typography>
                            </Stack>
                        </Box>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            width: "100%"
                        }}>
                            <Stack direction="row" alignItems="flex-start" spacing={1}
                                   sx={{marginLeft: 3, marginBottom: 2}}>
                                <Place sx={{fontSize: 20, color: "#b0b0b0", mt: 0.2}}/>
                                <Box>
                                    {eventDetails.isOnline ? (
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontWeight: "bold",
                                                mb: 0.5,
                                            }}
                                        >
                                            Online
                                        </Typography>
                                    ) : (
                                        <>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontWeight: "bold",
                                                    mb: 0.5,
                                                }}
                                            >
                                                {`${eventDetails.location}, ${eventDetails.ward && eventDetails.province && (`${eventDetails.ward}, ${eventDetails.province}`)}`}
                                            </Typography>
                                        </>
                                    )}
                                </Box>
                            </Stack>
                        </Box>
                        <ListTicketType types={eventDetails?.ticketTypes} quantities={quantities}
                                        setQuantities={setQuantities}/>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            width: "100%",
                            marginTop: 2,
                        }}>
                            <Stack direction="row" alignItems="center" spacing={1}
                                   sx={{marginLeft: 3, marginBottom: 2}}>
                                <Typography
                                    variant="body2"
                                    color="black"
                                    sx={{
                                        fontWeight: "bold",
                                    }}
                                >
                                    Tổng số vé đã chọn: {selectedticketQuantity}
                                </Typography>
                            </Stack>
                        </Box>
                        <Box sx={{textAlign: "center"}}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                sx={{
                                    fontWeight: "bold",
                                    minWidth: "150px",
                                    textTransform: "none",
                                    color: "white",
                                    mb: 3
                                }}
                                onClick={handlePayment}
                                disabled={selectedticketQuantity===0}
                            >
                                <Typography sx={{fontWeight: "bold", textAlign: "center"}}>
                                    Thanh toán {" "}
                                    {formatMoney(
                                        eventDetails?.ticketTypes?.reduce(
                                            (totalMoney, ticket) =>
                                                totalMoney + (quantities[ticket.id] ?? 0) * Number(ticket.price),
                                            0
                                        )
                                    )}đ
                                </Typography>
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
            {isLoading && <LoadingComponent/>}
        </>
    )
}
export default BookingTicket;