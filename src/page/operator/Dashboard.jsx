import {useOutletContext} from "react-router";
import {useEffect, useState} from "react";
import {BarChart} from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import {Box, Card, CardContent, Container, Stack, Typography, useTheme} from "@mui/material";
import operatorApi from "../../api/service/operatorApi.jsx";
import LoadingComponent from "../../component/LoadingComponent.jsx";
import {messageService} from "../../service/MessageService.jsx";
import {MESSAGE_TYPES} from "../../common/Constant.jsx";

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
    const [provinceStatistic, setProvinceStatistic] = useState([]);
    const [statusStatistic, setStatusStatistic] = useState([]);
    const [monthStatistic, setMonthStatistic] = useState([]);
    const [categoryStatistic, setCategoryStatistic] = useState([]);

    useEffect(() => {
        setPageTitle("Dashboard");
        setIsLoading(true);
        operatorApi.getProvinceStatistic((data) => getDataSuccess(data, "province"), getDataFail);
        operatorApi.getStatusStatistic((data) => getDataSuccess(data, "status"), getDataFail);
        operatorApi.getMonthStatistic((data) => getDataSuccess(data, "month"), getDataFail);
        operatorApi.getCategoryStatistic((data) => getDataSuccess(data, "category"), getDataFail);
    }, []);

    const getDataSuccess = (data, type) => {
        setIsLoading(false);
        if (type === "province") {
            const filteredData = Array.isArray(data)
                ? data.filter(item => item.label != null)
                : [];
            setProvinceStatistic(filteredData);
        }
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
        if (type === "month") {
            const filteredData = Array.isArray(data)
                ? data.filter(item => item.label != null)
                : [];
            setMonthStatistic(getFullMonthData(filteredData));
        }
        if (type === "category") {
            const filteredData = Array.isArray(data)
                ? data.filter(item => item.label != null)
                    .map(item => ({
                        id: item.label,
                        value: item.count ?? 0,
                        label: item.label
                    }))
                : [];
            setCategoryStatistic(filteredData);
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
                                        xAxis={[{ scaleType: 'band', data: provinceStatistic.map(p => p.label) }]}
                                        series={[{ data: provinceStatistic.map(p => p.count), label: 'Số sự kiện' }]}
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
                                                data: monthStatistic,
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
                                            {data: categoryStatistic,},
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