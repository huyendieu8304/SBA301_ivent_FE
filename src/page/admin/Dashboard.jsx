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
    const [statusStatistic, setStatusStatistic] = useState([]);
    const [paymentStatistic, setPaymentStatistic] = useState([]);

    useEffect(() => {
        setPageTitle("Dashboard");
        setIsLoading(true);
        adminApi.getRoleStatistic((data) => getDataSuccess(data, "role"), getDataFail);
        adminApi.getStatusAccountStatistic((data) => getDataSuccess(data, "status"), getDataFail);
        adminApi.getPaymentStatistic((data) => getDataSuccess(data, "payment"), getDataFail);
    }, []);

    const getDataSuccess = (data, type) => {
        setIsLoading(false);
        if (type === "status") {
            const filteredData = Array.isArray(data)
                ? data.filter(item => item.label != null)
                    .map(item => ({
                        id: item.label,
                        value: item.count ?? 0,
                        label: item.label
                    }))
                : [];
            setStatusStatistic(filteredData);
        }
        if (type === "payment") {
            const filteredData = Array.isArray(data)
                ? data.filter(item => item.label != null)
                    .map(item => ({
                        id: item.label,
                        value: item.count ?? 0,
                        label: item.label
                    }))
                : [];
            setPaymentStatistic(filteredData);
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
                                        Thống kê thanh toán
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