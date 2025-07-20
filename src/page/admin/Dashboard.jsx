import {useOutletContext} from "react-router";
import {useEffect, useState} from "react";
import {BarChart} from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import {Box, Card, CardContent, Container, Stack, Typography, useTheme} from "@mui/material";
import adminApi from "../../api/service/adminApi.jsx";
import LoadingComponent from "../../component/LoadingComponent.jsx";
import {messageService} from "../../service/MessageService.jsx";
import {MESSAGE_TYPES} from "../../common/Constant.jsx";

function valueFormatter(value) {
    return `${value}mm`;
}

function getFullMonthData(months) {
    return Array.from({ length: 12 }, (_, i) => {
        const month = (i + 1).toString();
        const found = months.find(item => item.label === month);
        return found ? found.count : 0;
    });
}

const Dashboard = () => {
    const {setPageTitle} = useOutletContext();
    const theme = useTheme();
    const [isLoading, setIsLoading] = useState(false);
    const [roleStatistic, setRoleStatistic] = useState([]);
    const [statusStatistic, setStatusStatistic] = useState([]);
    const [organizerStatistic, setOrganizerStatistic] = useState([]);
    const [paymentStatistic, setPaymentStatistic] = useState([]);

    useEffect(() => {
        setPageTitle("Dashboard");
        setIsLoading(true);
        adminApi.getRoleStatistic((data) => getDataSuccess(data, "role"), getDataFail);
        adminApi.getStatusAccountStatistic((data) => getDataSuccess(data, "status"), getDataFail);
        adminApi.getOrganizerStatistic((data) => getDataSuccess(data, "organizer"), getDataFail);
        adminApi.getPaymentStatistic((data) => getDataSuccess(data, "payment"), getDataFail);
    }, []);

    const getDataSuccess = (data, type) => {
        setIsLoading(false);
        if(type === "role") {
            setRoleStatistic(data);
        }
        if(type === "status") {
            setStatusStatistic(data.map(item => ({id: item.label, value: item.count, label: item.label})));
        }
        if(type === "organizer") {
            setOrganizerStatistic(getFullMonthData(data));
        }
        if(type === "payment") {
            setPaymentStatistic(data.map(item => ({id: item.label, value: item.count, label: item.label})));
        }
    }

    const getDataFail = (e) => {
        setIsLoading(false);
        console.log(e);
        messageService.showMessage(e.response.data.message, MESSAGE_TYPES.ERROR);
    }

    return (
        <>
            <Container maxWidth="lg">
                <Stack direction="column" spacing={2}>
                    <Stack direction="row" spacing={2}>
                        <Box sx={{width: "50%"}}>
                            <Card variant="outlined">
                                <CardContent sx={{backgroundColor: 'white'}}>
                                    <Typography variant="h5" component="div"
                                                sx={{fontWeight: "bold", color: theme.palette.primary.main, textAlign: "center", marginBottom: 2}}>
                                        Thống kê tỉnh thành
                                    </Typography>
                                    <BarChart
                                        xAxis={[{ scaleType: 'band', data: roleStatistic.map(p => p.label) }]}
                                        series={[{ data: roleStatistic.map(p => p.count), label: 'Số sự kiện' }]}
                                        width={600}
                                        height={400}
                                    />
                                </CardContent>
                            </Card>
                        </Box>
                        <Box sx={{width: "50%"}}>
                            <Card variant="outlined">
                                <CardContent sx={{backgroundColor: 'white'}}>
                                    <Typography variant="h5" component="div"
                                                sx={{fontWeight: "bold", color: theme.palette.primary.main, textAlign: "center", marginBottom: 2}}>
                                        Thống kê theo tháng
                                    </Typography>
                                    <LineChart
                                        xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }]}
                                        series={[
                                            {
                                                data: organizerStatistic,
                                            },
                                        ]}
                                        height={400}
                                    />
                                </CardContent>
                            </Card>
                        </Box>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                        <Box sx={{width: "50%"}}>
                            <Card variant="outlined">
                                <CardContent sx={{backgroundColor: 'white'}}>
                                    <Typography variant="h5" component="div"
                                                sx={{fontWeight: "bold", color: theme.palette.primary.main, textAlign: "center", marginBottom: 2}}>
                                        Thống kê trạng thái
                                    </Typography>
                                    <PieChart
                                        series={[
                                            {data: statusStatistic,},
                                        ]}
                                        width={200}
                                        height={200}
                                    />
                                </CardContent>
                            </Card>
                        </Box>
                        <Box sx={{width: "50%"}}>
                            <Card variant="outlined">
                                <CardContent sx={{backgroundColor: 'white'}}>
                                    <Typography variant="h5" component="div"
                                                sx={{fontWeight: "bold", color: theme.palette.primary.main, textAlign: "center", marginBottom: 2}}>
                                        Thống kê danh mục
                                    </Typography>
                                    <PieChart
                                        series={[
                                            {data: paymentStatistic,},
                                        ]}
                                        width={200}
                                        height={200}
                                    />
                                </CardContent>
                            </Card>
                        </Box>
                    </Stack>
                </Stack>
            </Container>
            {isLoading && <LoadingComponent/>}
        </>
    )
}

export default Dashboard;