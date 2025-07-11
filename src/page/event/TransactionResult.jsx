import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import paymentSettingApi from "../../api/service/paymentSettingApi.jsx";
import {
    Box,
    Button,
    Card,
    CardContent, Chip,
    Container,
    Paper,
    Stack, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow,
    Typography,
    useTheme
} from "@mui/material";
import MascotSvg from "../../component/svg/MascotSvg.jsx";
import {CalendarToday, Place} from "@mui/icons-material";
import {formatDateTimeRange, formatMoney} from "../../common/FormatFunction.jsx";
import ListTicketType from "../../component/ListTicketType.jsx";
import LoadingComponent from "../../component/LoadingComponent.jsx";
import {MESSAGE_TYPES, ROLES} from "../../common/Constant.jsx";
import {useNavigate} from "react-router";
import {messageService} from "../../service/MessageService.jsx";
import Messages from "../../common/Message.jsx";

const TransactionResult = () => {
    const [searchParams] = useSearchParams();
    const txnRefCode = searchParams.get("txnRefCode");
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const theme = useTheme();
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        paymentSettingApi.getPaymentDetails(txnRefCode, getDataSuccess, getDataFail)
    }, [txnRefCode]);

    const getDataSuccess = (d) => {
        setIsLoading(false);
        setData(d);
        if(d[0].transactionStatus === "FAILED"){
            messageService.showMessage(Messages.MSG_E_00016, MESSAGE_TYPES.ERROR);
        }
        if(d[0].transactionStatus === "SUCCESSFUL"){
            messageService.showMessage(Messages.MSG_I_00009, MESSAGE_TYPES.INFO);
        }
        if(d[0].transactionStatus === "PROCESSING"){
            messageService.showMessage(Messages.MSG_I_00010, MESSAGE_TYPES.INFO);
        }
    }

    const getDataFail = (e) => {
        setIsLoading(false);
        console.log(e);
        messageService.showMessage(e.response.data.message, MESSAGE_TYPES.ERROR);
    }

    return (<>
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
                            Kết quả thanh toán
                        </Typography>
                        <MascotSvg/>
                    </Stack>
                    <Typography variant="h5" component="div" color="primary"
                                sx={{
                                    fontWeight: "bold",
                                    textAlign: "center",
                                    marginBottom: 2
                                }}>
                        Sự kiện: {data[0]?.eventName}
                    </Typography>
                    <TableContainer component={Paper} sx={{width: "90%"}}>
                        <Table sx={{width: "100%"}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Tên vé</TableCell>
                                    <TableCell align="center">Số lượng</TableCell>
                                    <TableCell align="center">Giá tiền mỗi vé</TableCell>
                                    <TableCell align="center">Trạng thái giao dịch</TableCell>
                                    <TableCell align="center">Mã giao dịch</TableCell>
                                    <TableCell align="center">Mã QR</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell align="center" component="th" scope="row">
                                            {row.ticketTypeResponse.name}
                                        </TableCell>
                                        <TableCell align="center">{row.ticketQuantity}</TableCell>
                                        <TableCell align="center">{row.ticketTypeResponse.price}</TableCell>
                                        <TableCell align="center">
                                            <Chip
                                                sx={{
                                                    color: "white",
                                                    backgroundColor:
                                                        row.transactionStatus === "FAILED"
                                                            ? "#F04438"
                                                            : row.transactionStatus === "SUCCESSFUL"
                                                                ? "#12B76A"
                                                                : row.transactionStatus === "PROCESSING"
                                                                    ? "#F79009"
                                                                    : "inherit",
                                                }}
                                                label={row.transactionStatus === "FAILED"
                                                    ? "Thất bại"
                                                    : row.transactionStatus === "SUCCESSFUL"
                                                        ? "Thành công"
                                                        : row.transactionStatus === "PROCESSING"
                                                            ? "Chưa thanh toán"
                                                            : row.transactionStatus}
                                            />
                                        </TableCell>
                                        <TableCell align="center">{row.transactionId}</TableCell>
                                        <TableCell align="center">
                                            {row.qrCodeUrl &&
                                                <a href={row.qrCodeUrl} target="_blank" rel="noopener noreferrer">
                                                    Xem QR
                                                </a>
                                            }
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Stack direction="row" spacing={2} sx={{margin: "24px 0"}}>
                        <Button variant="contained" sx={{width: "200px", textTransform: "none"}}
                                onClick={() => navigate("/")}>
                            <Typography variant="subtitle1" color="white"> Trang chủ </Typography>
                        </Button>
                    </Stack>
                </CardContent>
            </Card>
        </Container>
        {isLoading && <LoadingComponent/>}
    </>)
}
export default TransactionResult;